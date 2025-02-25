import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface LineChartProps {
  dailyActivity: Record<string, number>; // { "2025-02-23": 24, "2025-02-24": 7 }
}

const LineChartComponent: React.FC<LineChartProps> = ({ dailyActivity }) => {
  // Convert dailyActivity object to an array and keep only the past 30 days
  const today = new Date();
  const last30Days = new Date(today);
  last30Days.setDate(today.getDate() - 30); // Get date 30 days ago

  const data = Object.entries(dailyActivity)
    .map(([date, count]) => ({ date, count }))
    .filter((entry) => new Date(entry.date) >= last30Days) // Keep only last 30 days
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort by date ascending

  return (
    <div className="flex flex-col">
      <h2 className="text-primaryHover mt-5 text-xl font-bold mb-4">Daily Activity (Last 30 Days)</h2>
      <ResponsiveContainer className="mt-5 px-3" width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" strokeOpacity={0.5} />
          <XAxis
            dataKey="date"
            angle={-45} // Rotate labels to prevent overlap
            textAnchor="end"
            height={60} // More space for labels
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: "#1e1e2f", color: "#fff", borderRadius: "8px" }} />
          <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;