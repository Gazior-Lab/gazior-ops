import { Lead, LeadStatus } from "@/types/leads";

/**
 * Custom business logic to derive a lead's status dynamically
 */
export function calculateLeadStatus(
  lead: Lead,
  rawCreatedAt: Date | string | number,
): LeadStatus {
  // Rule 1: Instant disqualification based on budget
  if (lead.budget === "<10k" || lead.budget === "not-sure") {
    return "Unqualified";
  }

  // Rule 2: Cold Outreach assumes we have already reached out
  if (lead.source === "Cold Outreach") {
    return "Contacted";
  }

  // Rule 3: Time-based triage
  // Use the raw database timestamp, NOT the formatted "Today" string
  if (rawCreatedAt) {
    let leadDate: Date;

    // Safely parse the raw date regardless of how MongoDB returns it
    if (rawCreatedAt instanceof Date) {
      leadDate = rawCreatedAt;
    } else if (
      typeof rawCreatedAt === "number" ||
      /^\d+$/.test(rawCreatedAt.toString())
    ) {
      leadDate = new Date(parseInt(rawCreatedAt.toString(), 10));
    } else {
      leadDate = new Date(rawCreatedAt);
    }

    if (!isNaN(leadDate.getTime())) {
      const now = new Date();
      const hoursDifference =
        (now.getTime() - leadDate.getTime()) / (1000 * 60 * 60);

      if (hoursDifference <= 48) {
        return "New";
      }
    }
  }

  // Fallback: If it passed the budget check and is older than 48 hours
  return "Evaluating";
}

/**
 * Formats a raw timestamp into a human-readable relative string
 */
export function formatLeadDate(timestamp: string | number | Date): string {
  if (!timestamp) return "Unknown";

  let date: Date;

  // Handle MongoDB native Date objects, numeric strings (Date.now()), or ISO strings
  if (timestamp instanceof Date) {
    date = timestamp;
  } else if (
    typeof timestamp === "number" ||
    /^\d+$/.test(timestamp.toString())
  ) {
    date = new Date(parseInt(timestamp.toString(), 10));
  } else {
    date = new Date(timestamp);
  }

  // Guard against invalid dates
  if (isNaN(date.getTime())) return "Unknown";

  const now = new Date();

  // Reset times to midnight to accurately compare pure days
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  // Calculate difference in days
  const diffDays = Math.round(
    (today.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Format: "Today, 09:24 AM"
  if (diffDays === 0) {
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `Today, ${timeStr}`;
  }

  // Format: "Yesterday"
  if (diffDays === 1) {
    return "Yesterday";
  }

  // Format: "Oct 24" (or "Oct 24, 2025" if from a previous year)
  const isCurrentYear = date.getFullYear() === now.getFullYear();
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: isCurrentYear ? undefined : "numeric",
  });
}
