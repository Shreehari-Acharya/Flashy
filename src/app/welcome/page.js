"use client"
import React from 'react';
import { motion } from 'framer-motion';

const Welcome = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 max-w-2xl"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white animate-glow font-avenir">
          Welcome to Flashly
        </h1>
        <p className="text-xl text-text-secondary leading-relaxed font-avenir">
          Your journey begins now! Stay tuned for upcoming features.
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

export default Welcome;
