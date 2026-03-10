import React from "react";
import { Card } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}) {
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600",
    green: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <Card className="p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div
          className={`p-2.5 rounded-xl ${colorMap[color] || colorMap.indigo}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
}
