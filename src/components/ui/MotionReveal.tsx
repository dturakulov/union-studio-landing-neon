"use client";

import React, { useEffect, useRef, useState } from "react";

interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

export function MotionReveal({
  children,
  className = "",
  delayMs = 0,
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ? true
      : false,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || visible || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function AnimatedMetric({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState<string>(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return value;
    }
    return match ? `0${suffix}` : value;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId = 0;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry?.isIntersecting || started) return;
        started = true;
        observer.disconnect();

        const duration = 900;
        const startTime = performance.now();
        const step = (now: number) => {
          const t = Math.max(0, Math.min(1, (now - startTime) / duration));
          const eased = 1 - Math.pow(1 - t, 3);
          const current = Math.max(0, Math.round(target * eased));
          setDisplay(`${current}${suffix}`);
          if (t < 1) {
            rafId = requestAnimationFrame(step);
          }
        };
        rafId = requestAnimationFrame(step);
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [match, target, suffix]);

  return <span ref={ref}>{display}</span>;
}
