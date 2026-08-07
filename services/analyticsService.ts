"use server";

import clientPromise from "@/lib/mongodb";

const DB_NAME = process.env.MONGODB_DATABASE;
// Make sure this exactly matches what your tracking script uses
const COLLECTION_NAME = "page_views";

// Helper function to connect to the specific database
async function getDb() {
  const client = await clientPromise;
  if (!DB_NAME) throw new Error("MONGODB_DATABASE is not defined");
  return client.db(DB_NAME);
}

// Type definitions for the frontend return values
export interface DashboardMetrics {
  totalPageviews: number;
  uniqueVisitors: number;
  topPages: { path: string; views: number }[];
}

export interface RecentPageview {
  id: string;
  path: string;
  referrer: string;
  country: string;
  city: string;
  device: string;
  date: string;
}

/**
 * Fetch aggregated metrics for the top-level dashboard overview
 */
export async function getDashboardMetrics(
  daysBack: number = 7,
): Promise<DashboardMetrics> {
  try {
    const db = await getDb();

    // Calculate the start date based on days back
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);

    const pipeline = [
      {
        $match: {
          timestamp: { $gte: startDate }, // Unified to timestamp
        },
      },
      {
        $facet: {
          totalViews: [{ $count: "count" }],
          uniqueVisitors: [
            { $group: { _id: "$visitorId" } },
            { $count: "count" },
          ],
          topPages: [
            { $group: { _id: "$path", views: { $sum: 1 } } },
            { $sort: { views: -1 } },
            { $limit: 5 },
            { $project: { _id: 0, path: "$_id", views: 1 } },
          ],
        },
      },
    ];

    const result = await db
      .collection(COLLECTION_NAME)
      .aggregate(pipeline)
      .toArray();
    const rawData = result[0];

    return {
      totalPageviews: rawData.totalViews[0]?.count || 0,
      uniqueVisitors: rawData.uniqueVisitors[0]?.count || 0,
      topPages: rawData.topPages || [],
    };
  } catch (error) {
    console.error("Failed to fetch dashboard metrics:", error);
    throw new Error("Failed to fetch dashboard metrics from the database.");
  }
}

/**
 * Fetch a raw list of the most recent pageviews (for a data table feed)
 */
export async function getRecentPageviews(
  limit: number = 50,
): Promise<RecentPageview[]> {
  try {
    const db = await getDb();
    const views = await db
      .collection(COLLECTION_NAME)
      .find({})
      .sort({ timestamp: -1 }) // Unified to timestamp
      .limit(limit)
      .toArray();

    // Map MongoDB _id and format data for the frontend table
    return views.map((view) => {
      // Basic formatting for the device column based on screen width
      let device = "Desktop";
      if (view.screenWidth) {
        if (view.screenWidth < 768) device = "Mobile";
        else if (view.screenWidth < 1024) device = "Tablet";
      }

      // Format the timestamp into a readable date string
      const dateObj = new Date(view.timestamp || view.createdAt);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(dateObj);

      return {
        id: view._id.toString(),
        path: view.path || "/",
        referrer: view.referrer || view.referer || "Direct",
        country: view.country || "Unknown",
        city: view.city || "Unknown",
        device,
        date: formattedDate,
      };
    });
  } catch (error) {
    console.log("Failed to fetch recent pageviews:", error);
    throw new Error("Failed to fetch recent pageviews from the database.");
  }
}

// Inside services/analyticsService.ts

export async function getAnalyticsDashboard(timeRange: string) {
  try {
    const db = await getDb();
    const collection = db.collection(COLLECTION_NAME);

    const now = Date.now();
    let startDateMs = now;

    if (timeRange === "Last 7 Days") {
      startDateMs = now - 7 * 24 * 60 * 60 * 1000;
    } else if (timeRange === "This Quarter") {
      startDateMs = now - 90 * 24 * 60 * 60 * 1000;
    } else {
      startDateMs = now - 30 * 24 * 60 * 60 * 1000;
    }

    const matchStage = { $match: { createdAt: { $gte: startDateMs } } };

    // 1. Total Visits & Unique Visitors
    const totalVisitsCount = await collection.countDocuments({
      createdAt: { $gte: startDateMs },
    });

    const uniqueVisitorsArray = await collection.distinct("visitorId", {
      createdAt: { $gte: startDateMs },
    });
    const uniqueVisitorsCount = uniqueVisitorsArray.length;

    // 2. Global Session Stats (For your top Stat Cards)
    const sessionStats = await collection
      .aggregate([
        matchStage,
        {
          $group: {
            _id: "$sessionId",
            pageViews: { $sum: 1 },
            sessionStartTime: { $min: "$createdAt" },
            sessionEndTime: { $max: "$lastActiveAt" },
          },
        },
        {
          $project: {
            isBounce: { $cond: [{ $eq: ["$pageViews", 1] }, 1, 0] },
            sessionDuration: {
              $subtract: ["$sessionEndTime", "$sessionStartTime"],
            },
          },
        },
        {
          $group: {
            _id: null,
            totalSessions: { $sum: 1 },
            totalBounces: { $sum: "$isBounce" },
            avgSessionDuration: { $avg: "$sessionDuration" },
          },
        },
      ])
      .toArray();

    const globalStats = sessionStats[0] || {
      totalSessions: 1,
      totalBounces: 0,
      avgSessionDuration: 0,
    };
    const globalBounceRate = Math.round(
      (globalStats.totalBounces / Math.max(globalStats.totalSessions, 1)) * 100,
    );
    const globalAvgTimeSec = Math.round(
      (globalStats.avgSessionDuration || 0) / 1000,
    );

    const globalMins = Math.floor(globalAvgTimeSec / 60);
    const globalSecs = globalAvgTimeSec % 60;

    // 3. Top Pages (Authentic Page-Level Bounce & Time)
    const topPagesRaw = await collection
      .aggregate([
        matchStage,
        {
          $group: {
            _id: "$sessionId",
            views: {
              $push: {
                path: "$path",
                timeSpent: { $subtract: ["$lastActiveAt", "$createdAt"] },
              },
            },
            totalSessionViews: { $sum: 1 },
          },
        },
        { $unwind: "$views" },
        {
          $group: {
            _id: "$views.path",
            totalViews: { $sum: 1 },
            bounces: {
              $sum: { $cond: [{ $eq: ["$totalSessionViews", 1] }, 1, 0] },
            },
            avgTime: { $avg: "$views.timeSpent" },
          },
        },
        { $sort: { totalViews: -1 } },
        { $limit: 5 },
      ])
      .toArray();

    const topPages = topPagesRaw.map((page) => {
      const bounceRate = Math.round((page.bounces / page.totalViews) * 100);
      const avgTimeSecs = Math.round((page.avgTime || 0) / 1000);
      const mins = Math.floor(avgTimeSecs / 60);
      const secs = avgTimeSecs % 60;

      return {
        path: page._id || "/",
        views: page.totalViews.toLocaleString(),
        bounce: `${bounceRate}%`,
        time: `${mins}m ${secs}s`,
      };
    });

    // 4. Aggregate Devices
    const devicesRaw = await collection
      .aggregate([
        matchStage,
        { $group: { _id: "$userAgent", count: { $sum: 1 } } },
      ])
      .toArray();

    let desktop = 0,
      mobile = 0,
      tablet = 0;
    devicesRaw.forEach((d) => {
      const ua = (d._id || "").toLowerCase();
      if (ua.includes("mobi")) mobile += d.count;
      else if (ua.includes("tablet") || ua.includes("ipad")) tablet += d.count;
      else desktop += d.count;
    });

    const totalDevices = desktop + mobile + tablet || 1;
    const deviceBreakdown = [
      {
        device: "Desktop",
        share: Math.round((desktop / totalDevices) * 100),
        visits: desktop.toLocaleString(),
        color: "bg-indigo-400",
      },
      {
        device: "Mobile",
        share: Math.round((mobile / totalDevices) * 100),
        visits: mobile.toLocaleString(),
        color: "bg-cyan-400",
      },
      {
        device: "Tablet",
        share: Math.round((tablet / totalDevices) * 100),
        visits: tablet.toLocaleString(),
        color: "bg-emerald-400",
      },
    ];

    // 5. Aggregate Traffic Sources
    const referrersRaw = await collection
      .aggregate([
        matchStage,
        { $group: { _id: "$referrer", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ])
      .toArray();

    const topReferrers = referrersRaw.map((ref) => {
      const url = ref._id || "Direct";
      let source = "Direct";
      let type = "Direct Traffic";

      if (url.includes("google")) {
        source = "Google";
        type = "Organic Search";
      } else if (url.includes("linkedin")) {
        source = "LinkedIn";
        type = "Social";
      } else if (
        url.includes("twitter") ||
        url.includes("x.com") ||
        url.includes("t.co")
      ) {
        source = "Twitter";
        type = "Social";
      } else if (
        url.includes("facebook") ||
        url.includes("fb.com") ||
        url.includes("instagram")
      ) {
        source = "Meta";
        type = "Social"; // Broad catch for Facebook/IG traffic
      } else if (url !== "Direct") {
        try {
          source = new URL(url).hostname.replace("www.", "");
          type = "Referral";
        } catch (e) {
          console.log(e);
          source = url;
          type = "Referral";
        }
      }

      return {
        source,
        type,
        visits: ref.count.toLocaleString(),
        share: Math.round((ref.count / totalVisitsCount) * 100) || 0,
      };
    });

    // 6. Generate Chart Data
    const chartRaw = await collection
      .aggregate([
        matchStage,
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: { $toDate: "$createdAt" },
              },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    const chartData = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now - i * 24 * 60 * 60 * 1000);
      const year = d.getUTCFullYear();
      const month = String(d.getUTCMonth() + 1).padStart(2, "0");
      const day = String(d.getUTCDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;

      const dayData = chartRaw.find((c) => c._id === dateString);
      chartData.push(dayData ? dayData.count : 0);
    }

    // 7. Aggregate Top Locations (Countries)
    const locationsRaw = await collection
      .aggregate([
        matchStage,
        { $group: { _id: "$country", visits: { $sum: 1 } } },
        { $sort: { visits: -1 } },
        { $limit: 5 },
      ])
      .toArray();

    const topLocations = locationsRaw.map((loc) => ({
      country: loc._id && loc._id !== "Unknown" ? loc._id : "Unknown Region",
      visits: loc.visits.toLocaleString(),
      share: Math.round((loc.visits / Math.max(totalVisitsCount, 1)) * 100),
    }));

    // 8. Aggregate Top Cities
    const citiesRaw = await collection
      .aggregate([
        matchStage,
        { $group: { _id: "$city", visits: { $sum: 1 } } },
        { $sort: { visits: -1 } },
        { $limit: 6 }, // 6 looks perfect in a 2-column grid
      ])
      .toArray();

    const topCities = citiesRaw.map((loc) => ({
      city: loc._id && loc._id !== "Unknown" ? loc._id : "Unknown City",
      visits: loc.visits.toLocaleString(),
      share: Math.round((loc.visits / Math.max(totalVisitsCount, 1)) * 100),
    }));

    return {
      success: true,
      data: {
        totalVisits: totalVisitsCount.toLocaleString(),
        uniqueVisitors: uniqueVisitorsCount.toLocaleString(),
        globalAvgTime: `${globalMins}m ${globalSecs}s`, // Send global stats to frontend
        globalBounceRate: `${globalBounceRate}%`, // Send global stats to frontend
        topPages,
        deviceBreakdown,
        topReferrers,
        topLocations,
        topCities,
        chartData,
      },
    };
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return { success: false, data: null };
  }
}
