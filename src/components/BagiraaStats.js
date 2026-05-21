import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const BagiraaStats = () => {
  const statsData = {
    states: 4,
    cities: 65,
    districts: 42,
    shops: 35000,
  };

  const barData = {
    labels: ["States", "Cities", "Districts", "Shops"],
    datasets: [
      {
        label: "Bagiraa Reach",
        data: [statsData.states, statsData.cities, statsData.districts, statsData.shops],
        backgroundColor: ["#ff4500", "#ffa500", "#ffcc00", "#32cd32"],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["States", "Cities", "Districts", "Shops"],
    datasets: [
      {
        data: [statsData.states, statsData.cities, statsData.districts, statsData.shops],
        backgroundColor: ["#ff4500", "#ffa500", "#ffcc00", "#32cd32"],
      },
    ],
  };

  return (
    <div className="text-center py-10 bg-black text-white">
      <h2 className="text-3xl font-bold mb-6">Bagiraa Expansion Stats</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-80">
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="w-80">
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default BagiraaStats;
