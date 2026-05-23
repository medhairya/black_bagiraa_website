import React from "react";
import { motion } from "framer-motion";
import bgVideo from "./assets/bg_for_upcomingproducts.mp4";

const UpcomingProducts = () => {
  return (
    <motion.div
      className="relative w-full my-12 py-16 md:py-20 px-4 md:px-6 overflow-visible"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      
      {/* Optional: Overlay for better text readability (can be adjusted or removed) */}
      <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>

      {/* Fruits and Leaves Arrangement - Surrounding the box */}
      <div className="relative z-10 flex items-center justify-center min-h-[300px] md:min-h-[350px]">
        
        {/* Fruits and Leaves positioned around the box */}
        {/* Top Left - Mango */}
        <motion.div
          className="absolute top-[-20px] left-[5%] md:left-[10%] z-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            className="text-4xl md:text-5xl lg:text-6xl"
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, 3, -3, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            🥭
          </motion.div>
        </motion.div>

        {/* Top Right - Guava */}
        <motion.div
          className="absolute top-[-20px] right-[5%] md:right-[10%] z-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            className="text-4xl md:text-5xl lg:text-6xl"
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, -3, 3, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            🍈
          </motion.div>
        </motion.div>

        {/* Left Side - Cut Guava */}
        <motion.div
          className="absolute left-[-30px] md:left-[-40px] top-1/2 -translate-y-1/2 z-0"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            className="text-5xl md:text-6xl lg:text-7xl"
            animate={{ 
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🍈
          </motion.div>
        </motion.div>

        {/* Right Side - Cut Guava */}
        <motion.div
          className="absolute right-[-30px] md:right-[-40px] top-1/2 -translate-y-1/2 z-0"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.div
            className="text-5xl md:text-6xl lg:text-7xl"
            animate={{ 
              rotate: [0, -5, 5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            🍈
          </motion.div>
        </motion.div>

        {/* Bottom Left - Mango */}
        <motion.div
          className="absolute bottom-[-20px] left-[8%] md:left-[12%] z-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div
            className="text-4xl md:text-5xl lg:text-6xl"
            animate={{ 
              y: [0, 8, 0],
              rotate: [0, -3, 3, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            🥭
          </motion.div>
        </motion.div>

        {/* Bottom Right - Mango */}
        <motion.div
          className="absolute bottom-[-20px] right-[8%] md:right-[12%] z-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.div
            className="text-4xl md:text-5xl lg:text-6xl"
            animate={{ 
              y: [0, 8, 0],
              rotate: [0, 3, -3, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          >
            🥭
          </motion.div>
        </motion.div>

        {/* Leaves scattered around */}
        <motion.div
          className="absolute top-[10%] left-[15%] z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="text-3xl md:text-4xl">🍃</div>
        </motion.div>

        <motion.div
          className="absolute top-[20%] right-[18%] z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <div className="text-3xl md:text-4xl">🍃</div>
        </motion.div>

        <motion.div
          className="absolute bottom-[15%] left-[20%] z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="text-3xl md:text-4xl">🍃</div>
        </motion.div>

        <motion.div
          className="absolute bottom-[25%] right-[15%] z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <div className="text-3xl md:text-4xl">🍃</div>
        </motion.div>

        {/* Central Translucent Message Box */}
        <div className="relative z-20 flex items-center justify-center">
          <motion.div
            className="relative bg-white/20 backdrop-blur-md rounded-3xl border-2 border-white/80 shadow-2xl px-8 md:px-12 lg:px-16 py-10 md:py-12 lg:py-14"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Message Content */}
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-3 drop-shadow-lg">
                Upcoming Beverages
              </h3>
              <p className="text-black/95 text-lg md:text-xl lg:text-2xl font-medium mb-4 drop-shadow-md">
                Exciting new flavors coming soon!
              </p>
              <motion.div
                className="flex items-center justify-center gap-2 text-black font-bold text-xl md:text-2xl lg:text-3xl drop-shadow-md"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span>Stay Tuned</span>
                <span className="text-2xl md:text-3xl">→</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default UpcomingProducts;

