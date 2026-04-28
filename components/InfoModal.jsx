"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

/**
 * Modal overlay showing detailed information for a single bubble option.
 *
 * Props:
 *  - isOpen: boolean
 *  - onClose: () => void
 *  - definition: { name, category, description, note } | null
 *  - color: hex string for the accent line
 */
export default function InfoModal({ isOpen, onClose, definition, color }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    // Lock body scroll while modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && definition && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal card */}
          <motion.div
            className="relative w-full max-w-md bg-ghost-900 border border-ghost-700 rounded-xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.92, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent bar */}
            <div
              className="h-1 w-full"
              style={{ backgroundColor: color || "#6366f1" }}
            />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-ghost-accent mb-1">
                    {definition.category}
                  </div>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {definition.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 -mt-1 -mr-1 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-ghost-800 transition-colors"
                  aria-label="Close"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-200 leading-relaxed mb-4">
                {definition.description}
              </p>

              {/* Note (optional) */}
              {definition.note && (
                <div className="bg-ghost-800 border border-ghost-700 rounded-lg p-3 text-xs text-gray-300 leading-relaxed">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Note
                  </div>
                  {definition.note}
                </div>
              )}

              {/* Compliance footer */}
              <p className="mt-4 text-[10px] text-gray-600 leading-relaxed">
                Information shown is for educational purposes and reflects the asset
                category, not a recommendation. Suitability is determined in
                consultation with your advisor.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
