"use client";
import React from "react";
import { Sparkles, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCoins } from "../context/CoinsContext";

export default function Header() {
  const router = useRouter();
  const { coins } = useCoins();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-8 h-8 text-primary animate-pulse text-blue-500" />
          <span className="text-2xl font-bold text-white font-heading">
            Flashly
          </span>
        </div>
        <div className="flex items-center space-x-4">
          {coins !== null && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => router.push("/wallet")} 
              className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full
                hover:bg-white/20 transition-colors duration-200"
            >
              <Wallet className="w-5 h-5 text-primary" />
              <span className="text-white font-medium">{coins}F</span>
            </motion.button>
          )}
            <button
              onClick={() => router.push("/login")} 
              className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium 
                transition-all duration-300 hover:bg-button-hover hover:scale-105 
                hover:shadow-[0_0_20px_rgba(110,58,255,0.5)] active:scale-95"
            >
              Pre-Register
            </button>
        </div>
      </div>
    </header>
  );
}
