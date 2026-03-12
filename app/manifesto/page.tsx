"use client";

import React from "react";
import Layout from "@/components/Layout";

const manifestoPoints = [
  {
    title: "Innovation First",
    description:
      "We prioritize creative solutions and experiment boldly to solve complex problems.",
  },
  {
    title: "Collaboration Over Ego",
    description:
      "Every idea counts. We grow stronger when we share knowledge and support each other.",
  },
  {
    title: "Quality & Excellence",
    description:
      "We aim for exceptional quality in every project, codebase, and design we touch.",
  },
  {
    title: "Transparency & Trust",
    description:
      "Open communication and honesty are at the core of our team culture.",
  },
  {
    title: "Continuous Learning",
    description:
      "We embrace curiosity, learn constantly, and share insights within the team.",
  },
];

const DashboardManifesto = () => {
  return (
    <Layout currentPageName="Team Manifesto">
      <div className="p-6 lg:p-12 bg-gray-50 min-h-[calc(100vh-4rem)] space-y-10">
        {/* Dashboard hero */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 md:p-12 shadow-lg text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            Gazior R&D Lab Manifesto
          </h1>
          <p className="text-indigo-100 text-base md:text-lg max-w-2xl mx-auto">
            Our guiding principles define how we work, create, and grow
            together. Every team member can read and get inspired.
          </p>
        </div>

        {/* Manifesto cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {manifestoPoints.map((point, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {point.title}
              </h2>
              <p className="text-gray-500 flex-1">{point.description}</p>
            </div>
          ))}
        </div>

        {/* Motivational CTA */}
        <div className="text-center">
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Together, we shape the future of innovation at Gazior. Every member
            is empowered, every voice matters.
          </p>
          <button className="px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
            Embrace the Manifesto
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardManifesto;
