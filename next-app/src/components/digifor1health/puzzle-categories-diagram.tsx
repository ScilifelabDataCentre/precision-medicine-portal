"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { useCallback } from "react";

/** Colors from tailwind.config.ts — keep in sync with the theme palette */
const COLORS = {
  primary: "#045c64",
  info: "#491f53",
  primaryLight: "#0e7e88",
  infoLight: "#6e3d7a",
} as const;

interface PuzzlePiece {
  label: string;
  textLines: string[];
  path: string;
  fill: string;
  anchorId: string;
  textX: number;
  textY: number;
  fontSize: number;
  slideFrom: { x: number; y: number };
}

const pieces: PuzzlePiece[] = [
  {
    label: "Vision & Strategy",
    textLines: ["Vision", "& Strategy"],
    path: "M 0,0 L 200,0 L 200,78 A 22,22 0 0,1 200,122 L 200,200 L 118,200 A 22,22 0 0,1 82,200 L 0,200 Z",
    fill: COLORS.primary,
    anchorId: "category-vision-strategy",
    textX: 90,
    textY: 90,
    fontSize: 21,
    slideFrom: { x: -20, y: -20 },
  },
  {
    label: "Collaboration & Governance",
    textLines: ["Collaboration", "& Governance"],
    path: "M 200,0 L 400,0 L 400,200 L 318,200 A 22,22 0 0,1 282,200 L 200,200 L 200,122 A 22,22 0 0,0 200,78 L 200,0 Z",
    fill: COLORS.info,
    anchorId: "category-collaboration-governance",
    textX: 310,
    textY: 90,
    fontSize: 21,
    slideFrom: { x: 20, y: -20 },
  },
  {
    label: "Implementation & Infrastructure",
    textLines: ["Implementation", "& Infrastructure"],
    path: "M 0,200 L 82,200 A 22,22 0 0,0 118,200 L 200,200 L 200,278 A 22,22 0 0,1 200,322 L 200,400 L 0,400 Z",
    fill: COLORS.primaryLight,
    anchorId: "category-implementation-infrastructure",
    textX: 90,
    textY: 310,
    fontSize: 21,
    slideFrom: { x: -20, y: 20 },
  },
  {
    label: "Systemic Change & Resources",
    textLines: ["Systemic Change", "& Resources"],
    path: "M 200,200 L 282,200 A 22,22 0 0,0 318,200 L 400,200 L 400,400 L 200,400 L 200,322 A 22,22 0 0,0 200,278 L 200,200 Z",
    fill: COLORS.infoLight,
    anchorId: "category-systemic-change-resources",
    textX: 312,
    textY: 310,
    fontSize: 19,
    slideFrom: { x: 20, y: 20 },
  },
];

const springTransition: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 18,
};

export default function PuzzleCategoriesDiagram() {
  const shouldReduceMotion = useReducedMotion();

  const handlePieceClick = useCallback(
    (anchorId: string) => {
      document
        .getElementById(anchorId)
        ?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    },
    [shouldReduceMotion],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, anchorId: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handlePieceClick(anchorId);
      }
    },
    [handlePieceClick],
  );

  return (
    <figure className="my-8 flex flex-col items-center">
      <div
        role="group"
        aria-label="Four interlocking puzzle pieces representing the key message categories. Click any piece to jump to its key messages."
      >
        <p className="sr-only">
          The four categories — Vision &amp; Strategy, Collaboration &amp;
          Governance, Implementation &amp; Infrastructure, and Systemic Change
          &amp; Resources — are visualized as interlocking puzzle pieces,
          emphasizing their interconnected nature. Click any piece to jump to
          its key messages.
        </p>

        <svg
          viewBox="-4 -4 408 408"
          className="w-full max-w-md h-auto"
          aria-hidden="true"
        >
          {pieces.map((piece, i) => (
            <motion.g
              key={piece.anchorId}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      x: piece.slideFrom.x,
                      y: piece.slideFrom.y,
                    }
              }
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { ...springTransition, delay: i * 0.12 }
              }
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              tabIndex={0}
              role="button"
              aria-label={`View ${piece.label} key messages`}
              onClick={() => handlePieceClick(piece.anchorId)}
              onKeyDown={(e) => handleKeyDown(e, piece.anchorId)}
              className="cursor-pointer rounded-sm outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary"
            >
              <path
                d={piece.path}
                fill={piece.fill}
                stroke="white"
                strokeWidth={4}
                strokeLinejoin="round"
              />
              <text
                x={piece.textX}
                y={piece.textY}
                fill="white"
                fontSize={piece.fontSize}
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  pointerEvents: "none",
                  fontFamily: "var(--font-lato), sans-serif",
                }}
              >
                <tspan x={piece.textX} dy="-0.65em">
                  {piece.textLines[0]}
                </tspan>
                <tspan x={piece.textX} dy="1.3em">
                  {piece.textLines[1]}
                </tspan>
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      <figcaption className="mt-2 text-sm text-muted-foreground text-center">
        The four key message categories of DIGIfor1healthSE
      </figcaption>
    </figure>
  );
}
