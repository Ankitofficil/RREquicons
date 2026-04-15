"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-in";
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "none";
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const initial: Record<string, { opacity: string; transform: string }> = {
    "fade-up": { opacity: "0", transform: "translateY(40px)" },
    "fade-in": { opacity: "0", transform: "none" },
    "slide-left": { opacity: "0", transform: "translateX(-40px)" },
    "slide-right": { opacity: "0", transform: "translateX(40px)" },
    "scale-in": { opacity: "0", transform: "scale(0.92)" },
  };

  const style = initial[animation] || initial["fade-up"];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
