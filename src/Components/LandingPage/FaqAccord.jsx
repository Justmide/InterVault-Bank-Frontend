import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: 'What is InterVault Bank?', a: 'A modern bank offering credit, debit, and crypto services.' },
  { q: 'Is my money safe with InterVault?', a: 'Yes, we use bank-grade encryption and 24/7 monitoring.' },
  { q: 'How do I open a Bitcoin account?', a: 'You can register directly on our platform in minutes.' },
  { q: 'Does InterVault offer loan services?', a: 'Yes, we offer personal and business loans with low rates.' },
  { q: 'Can I access my account internationally?', a: 'Yes, our services are globally accessible.' },
  { q: 'Is there a mobile app?', a: 'Yes, available on both iOS and Android with full banking features.' },
  { q: 'How do I contact customer service?', a: 'Via live chat, email, or 24/7 helpline.' },
  { q: 'Does InterVault charge hidden fees?', a: 'No, we maintain full transparency in all our charges.' },
  { q: 'Can I link multiple accounts?', a: 'Yes, you can manage multiple accounts in one dashboard.' },
  { q: 'Is my crypto insured?', a: 'We offer optional crypto insurance for peace of mind.' },
];

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap lg:gap-8 md:gap-2 px-4 md:px-12 py-10 bg-gray-50">
      {/* Left - 6 FAQs */}
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQs About InterVault Bank</h2>
        {faqs.slice(0, 6).map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-xl p-4 shadow-sm">
            <button
              onClick={() => toggle(index)}
              className="flex justify-between items-center w-full text-left font-medium  text-gray-800 text-[15px] lg:text-[24px] md:text-[20px]"
            >
              <span>{faq.q}</span>
              <span className="text-xl font-bold text-red-600">
                {openIndex === index ? '-' : '+'}
              </span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 text-sm text-gray-600 leading-relaxed overflow-hidden"
                >
                  {faq.a}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Right - 4 FAQs */}
      <div className="w-full md:w-1/2 space-y-4 mt-8 md:mt-12">
        {faqs.slice(6).map((faq, index) => {
          const actualIndex = index + 6;
          return (
            <div key={actualIndex} className="border border-gray-200 rounded-xl p-4 shadow-sm">
              <button
                onClick={() => toggle(actualIndex)}
                className="flex justify-between items-center w-full text-left font-medium text-gray-800 text-[15px] lg:text-[24px] md:text-[20px]"
              >
                <span>{faq.q}</span>
                <span className="text-xl font-bold text-red-600">
                  {openIndex === actualIndex ? '-' : '+'}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === actualIndex && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-sm text-gray-600 leading-relaxed overflow-hidden"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqAccordion;
