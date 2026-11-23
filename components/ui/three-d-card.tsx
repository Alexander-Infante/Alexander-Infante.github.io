"use client";
// Adapted from Aceternity UI: 3D Card Effect.
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const MouseEnterContext = createContext(false);

export function CardContainer({
  children,
  className,
  containerClassName,
  maxTilt = 8,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 2 * maxTilt;
    const y = ((e.clientY - top) / height - 0.5) * 2 * -maxTilt;
    ref.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  }

  function onLeave() {
    setEntered(false);
    if (ref.current) ref.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  }

  return (
    <MouseEnterContext.Provider value={entered}>
      <div className={cn("flex items-center justify-center", containerClassName)} style={{ perspective: "1200px" }}>
        <div
          ref={ref}
          onMouseEnter={() => setEntered(true)}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className={cn("relative flex items-center justify-center transition-all duration-200 ease-linear", className)}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]", className)}>{children}</div>;
}

export function CardItem({
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
}: {
  children: ReactNode;
  className?: string;
  translateX?: number;
  translateY?: number;
  translateZ?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const entered = useContext(MouseEnterContext);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.transform = entered
      ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      : "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
  }, [entered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <div ref={ref} className={cn("w-fit transition duration-200 ease-linear", className)}>
      {children}
    </div>
  );
}
