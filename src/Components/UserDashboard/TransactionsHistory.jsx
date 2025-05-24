import React, { useState } from "react";
import { motion } from "framer-motion";
import avatar from '../../assets/Images/avatar.png'; // your image

const TransactionsHistory = () => {
  const [transactions] = useState([
    { name: "Account creation", amount: 100, image: avatar },
    { name: "Apple music", amount: 0, image: avatar },
    { name: "Netflix", amount: 0, image: avatar },
    { name: "Paystack", amount: 0, image: avatar },
  ]);

  return (
    <div className=" w-full bg-white backdrop-blur-md lg:p-4 md:p-4 p-0 rounded-xl text-black">
      <p className="lg:text-start not-italic text-[20px] font-semibold text-black mb-4 lg:mt-[-10px] text-center mt-[20px]">
        Transactions History
      </p>

      <div className="space-y-4">
        {transactions.slice(0, 4).map((tx, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex items-center gap-3">
              <img src={tx.image} alt="avatar" className="w-10 h-10 rounded-full" />
              <p className="text-sm text-black font-semibold">{tx.name}</p>
            </div>
            <p className={`font-semibold ${tx.amount < 0 ? 'text-red-400' : 'text-green-400'}`}>
              {tx.amount < 0 ? `-$${Math.abs(tx.amount)}` : `$${tx.amount}`}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsHistory;
