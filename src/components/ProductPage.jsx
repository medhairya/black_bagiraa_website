import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import can from "../assets/can.png";
import energySimple from "../assets/energy-simple.png";
import energyWatermelon from "../assets/energy-watermelon.png";
import energyCoffee from "../assets/energy-coffee.png";
import jeera from "../assets/jeera.png";
import pineapple from "../assets/pineapple.png";
import orange from "../assets/orange.png";

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "energy", name: "Energy Drinks" },
    { id: "soft-drinks", name: "Carbonated Soft Drinks" },
    { id: "water", name: "Packaged Drinking Water" },
  ];

  const products = [
    {
      id: 1,
      name: "Classic Can",
      category: "energy",
      image: can,
      description: "Premium energy drink with natural caffeine",
      price: "₹45",
      variants: ["250 ml"],
    },
    {
      id: 2,
      name: "Classic",
      category: "energy",
      image: energySimple,
      description: "Classic energy drink with powerful caffeine blend",
      price: "₹40",
      variants: ["200 ml"],
    },
    {
      id: 3,
      name: "Coffee Smoke",
      category: "energy",
      image: energyCoffee,
      description: "Coffee-infused energy drink with smoky notes",
      price: "₹50",
      variants: ["200 ml"],
    },
    {
      id: 4,
      name: "Watermelon",
      category: "energy",
      image: energyWatermelon,
      description: "Refreshing watermelon flavored energy drink",
      price: "₹45",
      variants: ["200 ml"],
    },
    {
      id: 5,
      name: "Jeera Masala",
      category: "soft-drinks",
      image: jeera,
      description: "Traditional jeera with masala spices carbonated drink",
      price: "₹35",
      variants: ["200 ml"],
    },
    {
      id: 6,
      name: "Orange Ginger",
      category: "soft-drinks",
      image: orange,
      description: "Tangy orange with ginger carbonated beverage",
      price: "₹40",
      variants: ["200 ml"],
    },
    {
      id: 7,
      name: "Pineapple Masala",
      category: "soft-drinks",
      image: pineapple,
      description: "Tropical pineapple with masala spices carbonated drink",
      price: "₹40",
      variants: ["200 ml"],
    },
    {
      id: 8,
      name: "Packaged Drinking Water",
      category: "water",
      image: can,
      description: "Pure, clean drinking water packaged for convenience",
      price: "₹15",
      variants: ["200 ml"],
    },
  ];

  const filteredProducts = products.filter(product => {
    return selectedCategory === "all" || product.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Black Bagiraa" className="w-10 h-10" />
              <span className="text-2xl font-bold text-amber-800">
                Black Bagiraa 
              </span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <a href="/#our-story" className="text-amber-700 hover:text-amber-900 transition-colors">About</a>
              <a href="/#contact-section" className="text-amber-700 hover:text-amber-900 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold mb-6 text-amber-900"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-amber-700 max-w-3xl mx-auto mb-12"
          >
            Discover the complete range of Black Bagiraa beverages designed to energize your life with authentic flavors and premium quality
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-white/80 text-amber-800 hover:bg-amber-50 border border-amber-200"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white/90 backdrop-blur-sm border border-amber-200 rounded-2xl p-6 hover:border-amber-400 transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
              >
                <div className="relative mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.price}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-amber-700 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <span
                        key={variant}
                        className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm border border-amber-200"
                      >
                        {variant}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🍹</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">No products found</h3>
              <p className="text-amber-700">Try adjusting your filters to see more products</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="/logo.png" alt="Black Bagiraa" className="w-8 h-8" />
                <span className="text-xl font-bold text-amber-100">
                  Black Bagiraa
                </span>
              </div>
              <p className="text-amber-200">Energizing lives with authentic flavors and premium quality beverages.</p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Our Brands</h4>
              <ul className="space-y-2 text-amber-200">
                <li><a href="#" className="hover:text-amber-100 transition-colors">Energy Drinks</a></li>
                <li><a href="#" className="hover:text-amber-100 transition-colors">Carbonated Soft Drinks</a></li>
                <li><a href="#" className="hover:text-amber-100 transition-colors">Packaged Drinking Water</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-amber-200">
                <li><a href="/#our-story" className="hover:text-amber-100 transition-colors">About Us</a></li>
                <li><a href="/#contact-section" className="hover:text-amber-100 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-amber-100 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-amber-100 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-amber-200">
                <li><a href="https://www.youtube.com/@Black_Bagiraa" target="_blank" rel="noopener noreferrer" className="hover:text-amber-100 transition-colors">YouTube</a></li>
                <li><a href="https://www.instagram.com/blackbagiraa" target="_blank" rel="noopener noreferrer" className="hover:text-amber-100 transition-colors">Instagram</a></li>
                <li><a href="https://www.facebook.com/blackbagiraaenergydrink" target="_blank" rel="noopener noreferrer" className="hover:text-amber-100 transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-amber-700 mt-8 pt-8 text-center text-amber-200">
            <p>&copy; 2024 Black Bagiraa. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage; 