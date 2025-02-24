import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface RolesPieChartProps {
  rolesDistribution: Record<string, number>;
}

const RolesPieChart: React.FC<RolesPieChartProps> = ({ rolesDistribution }) => {
  const labels = Object.keys(rolesDistribution);
  const dataValues = Object.values(rolesDistribution);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: ["#FF0000", "#2196F3", "#4CAF50"],
      },
    ],
  };

  return (
    <div className="p-4 border-4 border-primary rounded-lg shadow-lg">
      <h2 className="text-lg text-primary font-semibold mb-2">Role Distribution</h2>
      <Pie options={{ plugins: { legend: { position: "right" } } }} data={data} />
    </div>
  );
};

export default RolesPieChart;
