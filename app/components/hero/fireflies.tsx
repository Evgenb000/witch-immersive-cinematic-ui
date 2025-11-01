"use client";
import { useEffect, useState } from "react";

type Particle = {
  size: number;
  top: number;
  left: number;
  opacity: number;
  duration: number;
};

export const Fireflies = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const initParticles = () => {
      setParticles(
        [...Array(20)].map(() => ({
          size: Math.random() * 3 + 1,
          top: Math.random() * 100,
          left: Math.random() * 100,
          opacity: Math.random() * 0.5 + 0.5,
          duration: Math.random() * 1 + 0.5,
        }))
      );
    };

    initParticles();
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute bg-yellow-400 rounded-full shadow-lg"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: `${p.top}%`,
            left: `${p.left}%`,
            opacity: p.opacity,
            filter: "blur(1px) brightness(1.5)",
            animation: `flicker ${p.duration}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};
