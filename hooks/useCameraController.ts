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
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const smoothCursorRef = useRef({ x: 0, y: 0 });

  const handleApiReady = (api: SketchfabAPI) => {
    apiRef.current = api;
    api.setCameraLookAt(
      CAMERA_POSITIONS[0].position,
      CAMERA_POSITIONS[0].target,
      0
    );
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      cursorPosRef.current = { x, y };
    };

    const updateCamera = () => {
      if (!apiRef.current) return;
      const now = Date.now();
      if (now - lastUpdateTimeRef.current < 50) {
        animationFrameRef.current = requestAnimationFrame(updateCamera);
        return;
      }

      lastUpdateTimeRef.current = now;
      const smoothFactor = 0.15;
      smoothScrollRef.current +=
        (targetScrollRef.current - smoothScrollRef.current) * smoothFactor;
      smoothCursorRef.current.x +=
        (cursorPosRef.current.x - smoothCursorRef.current.x) * 0.1;
      smoothCursorRef.current.y +=
        (cursorPosRef.current.y - smoothCursorRef.current.y) * 0.1;

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

      const dir = [
        interpolated.target[0] - interpolated.position[0],
        interpolated.target[1] - interpolated.position[1],
        interpolated.target[2] - interpolated.position[2],
      ];

      const offsetFactor = 0.3;

      const newTarget = [
        interpolated.position[0] +
          dir[0] -
          smoothCursorRef.current.y * offsetFactor * Math.abs(dir[0]),
        interpolated.position[1] +
          dir[1] -
          smoothCursorRef.current.x * offsetFactor * Math.abs(dir[1]),
        interpolated.position[2] + dir[2],
      ];

      apiRef.current.setCameraLookAt(interpolated.position, newTarget, 0.1);

      animationFrameRef.current = requestAnimationFrame(updateCamera);
    };

    const handleScroll = () => {
      targetScrollRef.current = window.scrollY;
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateCamera);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return { handleApiReady };
}
