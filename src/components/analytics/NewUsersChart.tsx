import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface NewUsersChartProps {
  newUsersPerDay: Record<string, number>;
}

const NewUsersChart: React.FC<NewUsersChartProps> = ({ newUsersPerDay }) => {
  const labels = Object.keys(newUsersPerDay);
  const dataValues = Object.values(newUsersPerDay);

  const data = {
    labels,
    datasets: [
      {
        label: "New Users",
        data: dataValues,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderWidth: 2,
        pointRadius: 5,
        tension: 0.4, // Smooth line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow full-width scaling
    scales: {
      x: {
        ticks: {
          maxRotation: 0, // Prevents rotation
          autoSkip: false, // Ensures all labels show
          font: {
            size: 10, // Adjust font size to fit labels
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 border-4 border-primary rounded-lg shadow-lg w-full h-[400px]">
      <h2 className="text-lg text-primary font-semibold mb-2">New Users Per Day</h2>
      <div className="h-[90%] w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default NewUsersChart;
