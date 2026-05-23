import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const AnimatedCounter = ({ value, label }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = Math.ceil(value / 100);
      const duration = 3000; // 3 seconds
      const intervalTime = duration / (value / increment);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          start = value;
          clearInterval(timer);
        }
        setCount(start);
      }, intervalTime);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <motion.h2
        className="text-5xl font-bold text-blue-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {count.toLocaleString()} {/* Formats number with commas */}
      </motion.h2>
      <p className="text-gray-400 text-lg">{label}</p>
    </div>
  );
};

export default AnimatedCounter;
