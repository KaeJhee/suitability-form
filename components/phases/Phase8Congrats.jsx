"use client";

import { motion } from "framer-motion";

export default function Phase8Congrats({ formData }) {
  const firstName = (formData.fullName || "").split(" ")[0] || "there";

  return (
    <div className="text-center py-8">
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-ghost-accent to-indigo-600 flex items-center justify-center mb-6 shadow-lg"
        style={{ boxShadow: "0 0 40px rgba(99, 102, 241, 0.5)" }}
      >
        <motion.svg
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-12 h-12 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
        </motion.svg>
      </motion.div>

      {/* Confetti dots */}
      <div className="relative h-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: "50%",
              top: -20,
              backgroundColor: ["#6366f1", "#d4af37", "#10b981", "#ec4899"][i % 4],
            }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: (Math.random() - 0.5) * 400,
              y: Math.random() * 200 + 50,
              opacity: 0,
            }}
            transition={{ duration: 1.5, delay: 0.7 + i * 0.05 }}
          />
        ))}
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl md:text-4xl font-bold text-white mb-3"
      >
        Welcome aboard, {firstName}.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-gray-300 text-lg max-w-xl mx-auto mb-8"
      >
        Your suitability profile has been submitted. An advisor from Ghost Strategies
        will reach out within 1 business day to schedule your consultation.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="inline-block px-6 py-4 rounded-lg bg-ghost-800 border border-ghost-700 text-left max-w-md mx-auto"
      >
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
          Confirmation sent to
        </div>
        <div className="text-white font-semibold">{formData.email}</div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-xs text-gray-600 mt-10"
      >
        You can safely close this window.
      </motion.p>
    </div>
  );
}
