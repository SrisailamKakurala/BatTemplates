import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";

interface Props {
  osDistribution: Record<string, number>;
}

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFC"];

const OsDistributionPieChart: React.FC<Props> = ({ osDistribution }) => {
  const data = Object.entries(osDistribution).map(([os, count]) => ({
    name: os,
    value: count,
  }));

  return (
    <div className="border-4 border-primary p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-primary mb-4 text-center">OS Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" align="center" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OsDistributionPieChart;
