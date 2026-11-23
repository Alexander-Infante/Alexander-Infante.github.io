"use client";
// Adapted from Aceternity UI: Text Hover Effect.
import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";

export function TextHoverEffect({ text, viewBoxWidth = 600 }: { text: string; viewBoxWidth?: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [mask, setMask] = useState({ cx: "50%", cy: "50%" });
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !hovered) return;
    const r = svg.getBoundingClientRect();
    setMask({ cx: `${((cursor.x - r.left) / r.width) * 100}%`, cy: `${((cursor.y - r.top) / r.height) * 100}%` });
  }, [cursor, hovered]);

  const common = {
    x: "50%",
    y: "50%",
    textAnchor: "middle" as const,
    dominantBaseline: "middle" as const,
    fontSize: 72,
    className: "font-display fill-transparent font-bold",
  };

  return (
    <svg
      ref={svgRef}
      width="100%"
      viewBox={`0 0 ${viewBoxWidth} 100`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
      role="img"
      aria-label={text}
    >
      <defs>
        <linearGradient id={`${id}-grad`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={viewBoxWidth} y2="0">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="35%" stopColor="#818cf8" />
              <stop offset="65%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#22d3ee" />
            </>
          )}
        </linearGradient>
        <motion.radialGradient
          id={`${id}-reveal`}
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={mask}
          transition={{ duration: 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={`${id}-mask`}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${id}-reveal)`} />
        </mask>
      </defs>
      <text {...common} strokeWidth={0.6} stroke="#3f3f46" style={{ opacity: hovered ? 0.7 : 0 }}>
        {text}
      </text>
      <motion.text
        {...common}
        strokeWidth={0.6}
        stroke="#525252"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        whileInView={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        viewport={{ once: true }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
      <text {...common} strokeWidth={1.4} stroke={`url(#${id}-grad)`} mask={`url(#${id}-mask)`}>
        {text}
      </text>
    </svg>
  );
}
