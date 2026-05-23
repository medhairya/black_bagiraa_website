import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Counter = ({ value }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <motion.span ref={ref} animate={{ count: inView ? value : 0 }} transition={{ duration: 2 }}>
      {Math.floor(value)}
    </motion.span>
  );
};

const StatsSection = () => {
  const stats = [
    { label: "States", value: 4 },
    { label: "Cities", value: 65 },
    { label: "Districts / Talukas", value: 42 },
    { label: "Reached Shops", value: 27000, suffix: "+" },
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <motion.div 
          key={index} 
          className="stat-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <h2>
            <Counter value={stat.value} />{stat.suffix || ""}
          </h2>
          <p>{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsSection;
