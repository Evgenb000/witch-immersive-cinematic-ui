"use client";

import { scenes } from "@/constants/scene";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface Props {
  current: number;
  className?: string;
}

export default function SceneContent({ current, className }: Props) {
  const scene = scenes[current];
  const lines = useMemo(() => scene?.text.split("\n") ?? [], [scene]);

  if (!scene) return null;

  return (
    <div className={cn(className)}>
      <motion.div
        key={scene.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "relative mx-auto max-w-3xl rounded-2xl bg-black/70 backdrop-blur-sm border border-white/10 p-8 shadow-[0_0_25px_-5px_rgba(120,80,200,0.3)] space-y-6 text-gray-100"
        )}
      >
        <motion.h2
          className="text-4xl font-bold tracking-wide text-purple-300 drop-shadow-[0_0_10px_rgba(180,100,255,0.6)] text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {scene.title}
        </motion.h2>

        <div className="max-w-2xl mx-auto leading-relaxed space-y-4">
          {lines.map((line, i) => {
            const isAuthor = line.startsWith("[Автор]");
            const isWitch = line.startsWith("[Ведьма]");
            const isRaven = line.startsWith("[Ворон]");
            const isCat =
              line.startsWith("[Кот]") || line.startsWith("[Кошка]");

            let color = "text-gray-300";
            let glow = "";
            if (isWitch) {
              color = "text-pink-300";
              glow = "drop-shadow-[0_0_8px_rgba(255,150,200,0.5)]";
            } else if (isRaven) {
              color = "text-indigo-300";
              glow = "drop-shadow-[0_0_8px_rgba(150,150,255,0.4)]";
            } else if (isCat) {
              color = "text-amber-300";
              glow = "drop-shadow-[0_0_8px_rgba(255,200,120,0.4)]";
            } else if (isAuthor) {
              color = "text-gray-400 italic";
              glow = "opacity-70";
            }

            const clean = line.replace(/^\[.*?\]\s*/, "");

            return (
              <motion.p
                key={i}
                className={`${color} ${glow} whitespace-pre-line text-lg font-light`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.2, duration: 0.6 }}
              >
                {clean}
              </motion.p>
            );
          })}
        </div>

        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl bg-linear-to-t from-purple-500/5 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5 }}
        />
      </motion.div>
    </div>
  );
}
