"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

const Congratulations = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFFC00] flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2 
          }}
          className="mx-auto mb-8 bg-white rounded-full p-4 w-20 h-20 flex items-center justify-center"
        >
          <Check className="w-12 h-12 text-[#007AFF]" strokeWidth={3} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold text-gray-900 font-avenir">
            Congratulations!
          </h1>
          <p className="text-xl text-gray-800 font-avenir">
            You've received 500F Coins
          </p>

          <button
            onClick={() => router.push('/welcome')}
            className="mt-8 w-full max-w-xs mx-auto bg-[#007AFF] text-white py-3.5 px-8 
              rounded-full font-bold text-base hover:bg-[#0066CC] transition-colors 
              duration-200 button-press font-avenir block"
          >
            Continue
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Congratulations;
