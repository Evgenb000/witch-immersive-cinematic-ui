import { useEffect, useState } from "react";
import { SCENE_POSITIONS } from "@/constants/scene_positions";

export function useSceneProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getActiveBlockIndex = (progress: number): number | null => {
    for (let i = 0; i < SCENE_POSITIONS.length; i++) {
      const [start, end] = SCENE_POSITIONS[i];
      if (progress >= start && progress <= end) return i;
    }
    return null;
  };

  return { scrollProgress, getActiveBlockIndex };
}
