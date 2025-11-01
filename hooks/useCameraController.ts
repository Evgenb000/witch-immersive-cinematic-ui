import { useEffect, useRef } from "react";
import { CAMERA_POSITIONS } from "@/constants/camera_positions";
import { interpolateCameraPosition } from "@/lib/lerp";
import { SketchfabAPI } from "@/types/sketchfab";

export function useCameraController() {
  const apiRef = useRef<SketchfabAPI | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);
  const smoothScrollRef = useRef<number>(0);
  const targetScrollRef = useRef<number>(0);

  const handleApiReady = (api: SketchfabAPI) => {
    apiRef.current = api;
    api.setCameraLookAt(
      CAMERA_POSITIONS[0].position,
      CAMERA_POSITIONS[0].target,
      0
    );
  };

  useEffect(() => {
    const updateCamera = () => {
      if (!apiRef.current) return;
      const now = Date.now();
      if (now - lastUpdateTimeRef.current < 50) {
        animationFrameRef.current = requestAnimationFrame(updateCamera);
        return;
      }

      lastUpdateTimeRef.current = now;
      const smoothFactor = 0.2;
      smoothScrollRef.current +=
        (targetScrollRef.current - smoothScrollRef.current) * smoothFactor;

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(
        Math.max(smoothScrollRef.current / totalHeight, 0),
        1
      );

      const totalPositions = CAMERA_POSITIONS.length;
      const exactPosition = progress * (totalPositions - 1);
      const currentIndex = Math.floor(exactPosition);
      const nextIndex = Math.min(currentIndex + 1, totalPositions - 1);
      const t = exactPosition - currentIndex;

      const interpolated = interpolateCameraPosition(
        CAMERA_POSITIONS[currentIndex],
        CAMERA_POSITIONS[nextIndex],
        t
      );

      apiRef.current.setCameraLookAt(
        interpolated.position,
        interpolated.target,
        0.1
      );

      if (Math.abs(targetScrollRef.current - smoothScrollRef.current) > 0.1) {
        animationFrameRef.current = requestAnimationFrame(updateCamera);
      }
    };

    const handleScroll = () => {
      targetScrollRef.current = window.scrollY;
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = requestAnimationFrame(updateCamera);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return { handleApiReady };
}
