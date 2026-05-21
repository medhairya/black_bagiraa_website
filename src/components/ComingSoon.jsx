import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaTimes, FaBell } from 'react-icons/fa';
import logo from '../assets/logo.png';

const ComingSoon = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the email to your backend
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gray-900 rounded-2xl p-8 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes size={20} />
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <motion.img
            src={logo}
            alt="Bagiraa Logo"
            className="w-24 h-24 mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          />
        </div>

        {/* Content */}
        <div className="text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              🛒 Shop Coming Soon!
            </h2>
            <p className="text-gray-400 mb-6">
              Our online store is under construction. Be the first to know when we launch!
            </p>
          </motion.div>

          {/* Email Signup */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                required
              />
              <FaBell className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <motion.button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaShoppingCart />
              <span>Get Notified</span>
            </motion.button>
          </motion.form>

          {/* Success Message */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-green-600 bg-opacity-20 border border-green-500 rounded-lg"
            >
              <p className="text-green-400 text-sm">
                ✅ Thanks! We'll notify you when the shop launches.
              </p>
            </motion.div>
          )}

          {/* Features Preview */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-3"
          >
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm">Exclusive online deals</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm">Fast nationwide delivery</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm">Limited edition flavors</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ComingSoon; 