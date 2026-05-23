import React from "react";
import { motion } from "framer-motion";

const MissionVisionHistory = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Our Story
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            From humble beginnings to becoming the King of Energy - discover the journey that powers Black Bagiraa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-600/20 to-yellow-600/20 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To energize and empower individuals across India with premium quality energy drinks that deliver unmatched performance, taste, and reliability. We strive to be the most trusted energy drink brand that fuels dreams and ambitions.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To become the undisputed leader in the energy drink market across India, recognized for innovation, quality, and the ability to energize millions of lives while maintaining the highest standards of excellence and customer satisfaction.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-600/20 to-yellow-600/20 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Our Values</h3>
              <p className="text-gray-300 leading-relaxed">
                Quality, Innovation, Customer Focus, and Integrity drive everything we do. We believe in delivering excellence in every can, building lasting relationships, and contributing positively to the communities we serve.
              </p>
            </div>
          </motion.div>
        </div>

        {/* History Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-white">Our Journey</h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-orange-500 to-yellow-500 h-full"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {/* 2020 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                viewport={{ once: true }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-gradient-to-r from-orange-600/20 to-transparent p-6 rounded-l-2xl border-l-4 border-orange-500">
                    <h4 className="text-xl font-bold text-orange-400 mb-2">2020 - The Beginning</h4>
                    <p className="text-gray-300">Founded in Vadodara, Gujarat with a vision to create India's most powerful energy drink. Started with a small team and big dreams.</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-black"></div>
                <div className="w-1/2 pl-8"></div>
              </motion.div>

              {/* 2021 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-500 rounded-full border-4 border-black"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-gradient-to-l from-yellow-600/20 to-transparent p-6 rounded-r-2xl border-r-4 border-yellow-500">
                    <h4 className="text-xl font-bold text-yellow-400 mb-2">2021 - Market Entry</h4>
                    <p className="text-gray-300">Launched our first product line and began distribution across Gujarat. Established strong partnerships with local retailers.</p>
                  </div>
                </div>
              </motion.div>

              {/* 2022 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                viewport={{ once: true }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-gradient-to-r from-orange-600/20 to-transparent p-6 rounded-l-2xl border-l-4 border-orange-500">
                    <h4 className="text-xl font-bold text-orange-400 mb-2">2022 - Regional Expansion</h4>
                    <p className="text-gray-300">Expanded to 4 states and 65 cities. Introduced new flavors and strengthened our brand presence across Western India.</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-black"></div>
                <div className="w-1/2 pl-8"></div>
              </motion.div>

              {/* 2023 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                viewport={{ once: true }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-500 rounded-full border-4 border-black"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-gradient-to-l from-yellow-600/20 to-transparent p-6 rounded-r-2xl border-r-4 border-yellow-500">
                    <h4 className="text-xl font-bold text-yellow-400 mb-2">2023 - Digital Revolution</h4>
                    <p className="text-gray-300">Launched our digital presence. Reached 48,000+ shops and became a household name in energy drinks.</p>
                  </div>
                </div>
              </motion.div>

              {/* 2024 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                viewport={{ once: true }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-gradient-to-r from-orange-600/20 to-transparent p-6 rounded-l-2xl border-l-4 border-orange-500">
                    <h4 className="text-xl font-bold text-orange-400 mb-2">2024 - Innovation Hub</h4>
                    <p className="text-gray-300">Introduced cutting-edge formulations and sustainable packaging. Established ourselves as the innovation leader in the energy drink industry.</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-black"></div>
                <div className="w-1/2 pl-8"></div>
              </motion.div>

              {/* 2025 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
                viewport={{ once: true }}
                className="relative flex items-center"
              >
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-500 rounded-full border-4 border-black"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-gradient-to-l from-yellow-600/20 to-transparent p-6 rounded-r-2xl border-r-4 border-yellow-500">
                    <h4 className="text-xl font-bold text-yellow-400 mb-2">2025 - The Future</h4>
                    <p className="text-gray-300">Continuing our mission to energize India with innovative products, expanded distribution, and unwavering commitment to quality and customer satisfaction.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionHistory; 