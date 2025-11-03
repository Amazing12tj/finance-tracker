import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function SummaryChart({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "₦",
        data: [income, expense],
        backgroundColor: ["#00E676", "#FF5252"],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `₦${ctx.raw.toFixed(2)}` } },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="card">
      <h3>Income vs Expense Chart</h3>
      <Bar data={data} options={options} />
    </div>
  );
}
