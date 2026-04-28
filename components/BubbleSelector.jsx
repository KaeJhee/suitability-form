"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import InfoModal from "./InfoModal";
import { definitions } from "@/lib/definitions";

/**
 * Floating bubble selector with non-overlapping grid layout and info popovers.
 *
 * - Tap bubble body: select / deselect
 * - Tap ⓘ badge: open detail modal
 * - Hover bubble (desktop): "Click ⓘ for details" hint
 *
 * Props:
 *  - options: [{ id, label, color }]
 *  - selected: array of selected ids
 *  - onToggle: (id) => void
 *  - height: container height in px
 */
export default function BubbleSelector({
  options,
  selected,
  onToggle,
  height = 480,
}) {
  const [infoId, setInfoId] = useState(null);
  const [hoverId, setHoverId] = useState(null);

  const layout = useMemo(() => {
    const n = options.length;
    if (n === 0) return [];

    const assumedWidth = 768;
    const aspect = assumedWidth / height;

    let bestCols = 1;
    let bestRows = n;
    let bestScore = Infinity;
    for (let cols = 1; cols <= n; cols++) {
      const rows = Math.ceil(n / cols);
      const gridAspect = cols / rows;
      const score = Math.abs(gridAspect - aspect);
      if (score < bestScore) {
        bestScore = score;
        bestCols = cols;
        bestRows = rows;
      }
    }

    const cellW = 100 / bestCols;
    const cellH = 100 / bestRows;
    const cellPxW = (assumedWidth * cellW) / 100;
    const cellPxH = (height * cellH) / 100;
    const cellMin = Math.min(cellPxW, cellPxH);
    const bubbleSize = Math.max(64, Math.min(120, cellMin * 0.7));
    const maxDrift = cellMin * 0.12;

    const prng = (i, salt) => {
      const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    return options.map((_, i) => {
      const col = i % bestCols;
      const row = Math.floor(i / bestCols);
      const isLastRow = row === bestRows - 1;
      const itemsInRow = isLastRow ? n - row * bestCols : bestCols;
      const rowOffset = isLastRow ? ((bestCols - itemsInRow) * cellW) / 2 : 0;

      const centerX = rowOffset + col * cellW + cellW / 2;
      const centerY = row * cellH + cellH / 2;
      const jitterX = (prng(i, 1) - 0.5) * cellW * 0.15;
      const jitterY = (prng(i, 2) - 0.5) * cellH * 0.15;

      return {
        left: centerX + jitterX,
        top: centerY + jitterY,
        size: bubbleSize,
        driftX: maxDrift * (0.6 + prng(i, 3) * 0.4),
        driftY: maxDrift * (0.6 + prng(i, 4) * 0.4),
        duration: 4 + prng(i, 5) * 3,
        delay: prng(i, 6) * 1.5,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.length, height]);

  const activeDefinition = infoId ? definitions[infoId] : null;
  const activeColor = infoId ? options.find((o) => o.id === infoId)?.color : null;

  return (
    <>
      <div
        className="relative w-full bg-ghost-950 border border-ghost-700 rounded-xl overflow-hidden"
        style={{ height }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.15), transparent 50%), radial-gradient(circle at 70% 70%, rgba(212,175,55,0.08), transparent 50%)",
          }}
        />

        {options.map((opt, i) => {
          const isSelected = selected.includes(opt.id);
          const isHovered = hoverId === opt.id;
          const pos = layout[i];
          if (!pos) return null;
          const hasDefinition = !!definitions[opt.id];

          return (
            <motion.div
              key={opt.id}
              className="absolute"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                width: pos.size,
                height: pos.size,
                marginLeft: -pos.size / 2,
                marginTop: -pos.size / 2,
              }}
              animate={{
                x: [0, pos.driftX, -pos.driftX, 0],
                y: [0, -pos.driftY, pos.driftY, 0],
              }}
              transition={{
                x: {
                  duration: pos.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: pos.delay,
                },
                y: {
                  duration: pos.duration * 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: pos.delay,
                },
              }}
              onMouseEnter={() => setHoverId(opt.id)}
              onMouseLeave={() => setHoverId(null)}
            >
              {/* Selection bubble (the main button) */}
              <motion.button
                type="button"
                onClick={() => onToggle(opt.id)}
                className={`absolute inset-0 rounded-full flex items-center justify-center text-center font-semibold text-white text-sm select-none cursor-pointer ${
                  isSelected ? "bubble-glow" : ""
                }`}
                style={{
                  backgroundColor: isSelected ? opt.color : `${opt.color}55`,
                  border: `2px solid ${isSelected ? "#fff" : opt.color}`,
                  padding: "0 8px",
                }}
                animate={{ scale: isSelected ? 1.08 : 1 }}
                transition={{ scale: { duration: 0.25 } }}
                whileHover={{ scale: isSelected ? 1.12 : 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="leading-tight drop-shadow pointer-events-none">
                  {opt.label}
                </span>
              </motion.button>

              {/* Info icon button (top-right of bubble) */}
              {hasDefinition && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setInfoId(opt.id);
                  }}
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-ghost-900 border border-ghost-700 text-gray-300 flex items-center justify-center text-[11px] font-bold hover:bg-ghost-accent hover:text-white hover:border-ghost-accent transition-colors shadow-md z-10"
                  aria-label={`More info about ${opt.label}`}
                >
                  i
                </button>
              )}

              {/* Hover hint (desktop only — desktop has hover, mobile shows the i icon directly) */}
              {isHovered && hasDefinition && (
                <motion.div
                  className="hidden md:block absolute left-1/2 -translate-x-1/2 -bottom-7 px-2 py-1 rounded-md bg-ghost-900 border border-ghost-700 text-[10px] text-gray-300 whitespace-nowrap pointer-events-none shadow-lg z-20"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  Tap <span className="text-ghost-accent font-semibold">i</span> for details
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {/* Selection counter — only counts ids in *this* container */}
        <div className="absolute bottom-3 right-3 bg-ghost-900/80 backdrop-blur-sm border border-ghost-700 px-3 py-1.5 rounded-full text-xs text-gray-300">
          {selected.filter((id) => options.some((o) => o.id === id)).length} selected
        </div>
      </div>

      {/* Info modal portal */}
      <InfoModal
        isOpen={!!infoId}
        onClose={() => setInfoId(null)}
        definition={activeDefinition}
        color={activeColor}
      />
    </>
  );
}
