'use client';

import { useState, useEffect, useRef } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  formatk?: boolean;
}

/**
 * Starts at the final value so the server-rendered HTML (what Google and
 * no-JS visitors see) shows the real number, e.g. "10+ Years", not "0+".
 * When the counter scrolls into view it animates up from 0 once.
 */
export default function Counter({ end, duration = 2000, suffix = "", formatk = false }: CounterProps) {
  const [count, setCount] = useState(end);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    let frame = 0;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // easeOutExpo for smooth deceleration
      const easing = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easing * end));

      if (progress < 1) {
        frame = window.requestAnimationFrame(step);
      } else {
        setCount(end); // Ensure we end exactly at 'end'
      }
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [hasStarted, end, duration]);

  let displayValue: string | number = count;
  if (formatk && count >= 1000) {
    displayValue = (count / 1000).toFixed(1).replace('.0', '') + 'K';
  }

  return <span ref={ref}>{displayValue}{suffix}</span>;
}
