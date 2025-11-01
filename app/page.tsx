"use client";

import { useCameraController } from "@/hooks/useCameraController";
import { useSceneProgress } from "@/hooks/useSceneProgress";
import { SketchfabBackground } from "./components/sketchfab";
import { Scene } from "./components/scene";

export default function WitchHouse() {
  const { handleApiReady } = useCameraController();
  const { scrollProgress, getActiveBlockIndex } = useSceneProgress();

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      <SketchfabBackground onApiReady={handleApiReady} />
      <Scene
        getActiveBlockIndex={getActiveBlockIndex}
        scrollProgress={scrollProgress}
      />
    </div>
  );
}
