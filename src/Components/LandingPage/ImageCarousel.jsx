import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import creditcard from "../../assets/Images/girl-holding-cards.jpg";
import debitcards from "../../assets/Images/cardimg2.jpg";
import bitcoin from "../../assets/Images/bitcoin.jpg";

const slides = [
  {
    image: creditcard,
    title: "💳 Credit Card",
    text: "Build credit, enjoy rewards, and make purchases securely with our trusted credit card options.",
  },
  {
    image: debitcards,
    title: "🏧 Debit Card",
    text: "Spend directly from your account with secure and convenient access to your money 24/7.",
  },
  {
    image: bitcoin,
    title: "🏦 Bitcoin Account",
    text: "Manage your everyday cryptocurrency transactions effortlessly with our flexible crypto account services.",
  },
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden shadow-xl">
      <AnimatePresence>
        <motion.img
          key={slides[current].image}
          src={slides[current].image}
          alt={slides[current].title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 text-white">
        <motion.h2
          key={slides[current].title}
          className="text-2xl md:text-4xl font-bold mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {slides[current].title}
        </motion.h2>
        <motion.p
          key={slides[current].text}
          className="max-w-2xl  md:text-lg italic"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {slides[current].text}
        </motion.p>
      </div>
    </div>
  );
}
