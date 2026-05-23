import React from "react";
import { motion } from "framer-motion";

const LightBeams = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Light Beam 1 */}
      <motion.div
        className="absolute top-0 left-1/3 w-1 h-full bg-orange-400 opacity-30 blur-xl"
        initial={{ y: "-100%" }}
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Light Beam 2 */}
      <motion.div
        className="absolute top-0 left-2/3 w-1 h-full bg-yellow-300 opacity-40 blur-xl"
        initial={{ y: "100%" }}
        animate={{ y: ["100%", "-100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Light Beam 3 */}
      <motion.div
        className="absolute top-0 left-1/5 w-1 h-full bg-orange-500 opacity-50 blur-xl"
        initial={{ y: "-100%" }}
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LightBeams;
