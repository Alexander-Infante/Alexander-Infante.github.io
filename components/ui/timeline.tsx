"use client";
// Adapted from Aceternity UI: Timeline.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Timeline({ data }: { data: { key: string; title: ReactNode; content: ReactNode }[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.getBoundingClientRect().height));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 10%", "end 50%"] });
  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="w-full">
      <div ref={trackRef} className="relative mx-auto max-w-6xl pb-10">
        {data.map((item) => (
          <div key={item.key} className="flex justify-start pt-10 md:gap-10 md:pt-24">
            <div className="sticky top-32 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-black">
                <div className="h-4 w-4 rounded-full border border-neutral-700 bg-neutral-800" />
              </div>
              <div className="hidden md:block md:pl-20">{item.title}</div>
            </div>
            <div className="relative w-full pl-16 md:pl-4">
              {item.content}
            </div>
          </div>
        ))}
        <div
          aria-hidden
          style={{ height }}
          className="absolute top-0 left-8 w-[2px] overflow-hidden bg-linear-to-b from-transparent via-neutral-800 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: beamHeight, opacity: beamOpacity }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-linear-to-t from-violet-500 from-0% via-sky-400 via-10% to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
