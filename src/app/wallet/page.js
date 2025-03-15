"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCoins } from "../../../context/CoinsContext";

const Wallet = () => {
  const router = useRouter()
  const { coins, setCoins } = useCoins();
  const [step, setStep] = useState('coupon'); // 'coupon' | 'upi' | 'confirmation'
  const [couponCode, setCouponCode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUserId(userId);
    } else {
      router.push('/');
    }
  }, );

  const validateUPI = (upi) => /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(upi);

  const handleNext = () => {
    if (couponCode.trim() === 'CHIRAG123') {
      setError('');
      setStep('upi');
    } else {
      setError('Invalid Coupon Code');
    }
  };

  const handleRedeem = async () => {
    if (!validateUPI(upiId.trim())) {
      setError('Enter a valid UPI ID');
      return;
    }

    setCoins(0);
    setStep('confirmation');

    

    try {
      const response = await fetch("/api/register/step-3", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          upiId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update UPI ID.');
      }

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error('Error updating UPI ID:', err);
      setError('An error occurred during redemption.');
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl p-8 space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-5xl font-bold text-white">Your Balance</h2>
          <p className="text-3xl font-bold text-primary">{coins}F Coins</p>
          <p className="text-xl text-gray-400">" 500 F Coins = 250₹ "</p>
        </div>

        {step === 'coupon' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-white">Coupon Code</label>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white 
                  placeholder-white/50 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:outline-none"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-primary text-white py-3 rounded-full font-bold 
                hover:bg-button-hover transition-colors duration-200"
            >
              Next
            </button>
          </motion.div>
        )}

        {step === 'upi' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-white">UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="Enter your UPI ID"
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white 
                  placeholder-white/50 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:outline-none"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <button
              onClick={handleRedeem}
              className="w-full bg-primary text-white py-3 rounded-full font-bold 
                hover:bg-button-hover transition-colors duration-200"
            >
              Redeem
            </button>
          </motion.div>
        )}

        {step === 'confirmation' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white">
            <p>Your Balance <strong>0F Coins</strong></p>
            <p>Your redemption request has been submitted.</p>
            <p>It will be processed within 24 hours.</p>
            <button
              onClick={() => router.push('/thank-you')}
              className="mt-4 bg-secondary text-white py-2 px-6 rounded-lg font-semibold 
                hover:bg-secondary-dark transition-all duration-200"
            >
              Close
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Wallet;
