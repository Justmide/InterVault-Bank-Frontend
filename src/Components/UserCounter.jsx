import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const UserCounter = () => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const maxCount = 500;

  useEffect(() => {
    if (inView && count === 0) {
      let current = 0;
      const interval = setInterval(() => {
        current += 5;
        if (current >= maxCount) {
          current = maxCount;
          clearInterval(interval);
        }
        setCount(current);
      }, 20);
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      className="w-full bg-gray-50 py-16 flex flex-col items-center text-center px-4"
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-bold text-gray-800"
      >
        Over{" "}
        <span className="text-red-600">
          {count}
          <span className="text-lg align-top">M+</span>
        </span>{" "}
        users joined us since we started
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-gray-600 text-sm md:text-base mt-4 max-w-xl"
      >
        We’re trusted by millions of customers around the world. Be part of our growing family today.
      </motion.p>
    </section>
  );
};

export default UserCounter;
