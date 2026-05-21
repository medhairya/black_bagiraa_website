import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const INDIA_TOPO_JSON = "https://cdn.jsdelivr.net/npm/@svg-maps/india@latest/india.topo.json";

const statsData = {
  states: 4,
  cities: 100,
  districts: 250,
  shops: 35000,
};

const barData = {
  labels: ["States", "Cities", "Districts", "Shops"],
  datasets: [
    {
      label: "Bagiraa Reach",
      data: [statsData.states, statsData.cities, statsData.districts, statsData.shops],
      backgroundColor: ["#ff4500", "#ffa500", "#ffcc00", "#32cd32"],
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

const stateVideos = {
  Gujarat: "videoID1",
  Maharashtra: "videoID2",
  Rajasthan: "videoID3",
  Karnataka: "videoID4",
};

const BagiraaStatsMap = () => {
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
      <h2 className="text-3xl font-bold mt-10 mb-6">Bagiraa in India</h2>
      <div className="flex justify-center">
        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 800 }}>
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={stateVideos[geo.properties.name] ? "#ffcc00" : "#ccc"}
                  stroke="#fff"
                  onClick={() => {
                    const videoId = stateVideos[geo.properties.name];
                    if (videoId) {
                      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
};

export default BagiraaStatsMap;
