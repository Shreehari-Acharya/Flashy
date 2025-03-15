"use client"
import React from 'react';
import { motion } from 'framer-motion';

const ThankYou = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      {/* Logo on the Top Left */}
      <div className="absolute top-6 left-6 text-2xl font-bold text-white font-avenir">
        Flashly
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 max-w-2xl"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white animate-glow font-avenir">
          Thank You for Pre-Registering!
        </h1>
        <p className="text-xl text-text-secondary leading-relaxed font-avenir">
          We appreciate your interest. Stay tuned for exciting updates!
        </p>
      </motion.div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-primary/20 
        blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-secondary/20 
        blur-3xl animate-float-delayed"></div>
    </main>
  );
};

export default ThankYou;
