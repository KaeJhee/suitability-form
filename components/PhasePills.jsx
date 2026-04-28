"use client";

import { motion } from "framer-motion";

/**
 * Clickable phase navigation. Renders one pill per phase.
 *  - Current phase is highlighted
 *  - Completed/visited phases are clickable to jump back
 *  - Future phases (not yet visited) are disabled
 *
 * Props:
 *  - current: 1-based current phase index
 *  - phases: [{ key, label }] in display order
 *  - maxReached: highest phase the user has been on (controls forward jump-ability)
 *  - onJump: (phaseNum) => void  // 1-based
 */
export default function PhasePills({ current, phases, maxReached, onJump }) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
        {phases.map((p, idx) => {
          const phaseNum = idx + 1;
          const isCurrent = phaseNum === current;
          const isReached = phaseNum <= maxReached;
          const isClickable = isReached && !isCurrent;

          return (
            <button
              key={p.key}
              type="button"
              onClick={() => isClickable && onJump(phaseNum)}
              disabled={!isClickable}
              className={`relative px-2.5 md:px-3 py-1.5 rounded-full text-[11px] md:text-xs font-semibold transition-all border
                ${
                  isCurrent
                    ? "bg-ghost-accent text-white border-ghost-accent shadow-md cursor-default"
                    : isClickable
                    ? "bg-ghost-800 text-gray-300 border-ghost-700 hover:bg-ghost-700 hover:text-white hover:border-ghost-accent cursor-pointer"
                    : "bg-ghost-900 text-gray-600 border-ghost-800 cursor-not-allowed"
                }
              `}
              aria-current={isCurrent ? "step" : undefined}
              aria-label={`Phase ${phaseNum}: ${p.label}${isClickable ? " (click to revisit)" : ""}`}
            >
              <span className="flex items-center gap-1.5">
                <span
                  className={`text-[9px] md:text-[10px] font-bold opacity-70`}
                >
                  {phaseNum}
                </span>
                <span>{p.label}</span>
              </span>
              {isCurrent && (
                <motion.span
                  layoutId="phase-pill-underline"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-ghost-accent"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
