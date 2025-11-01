"use client";

import { useSceneProgress } from "@/hooks/useSceneProgress";
import { Scene } from "./components/scene";
import { useCameraController } from "@/hooks/useCameraController";
import { useSketchfab } from "@/hooks/useSketchfab";
import { useState } from "react";
import { Hero } from "./components/hero";

export default function WitchHouse() {
  const { handleApiReady } = useCameraController();
  const { scrollProgress, getActiveBlockIndex } = useSceneProgress();
  const { iframeRef, loading } = useSketchfab(handleApiReady);
  const [entrance, setEntrance] = useState(false);

  console.log("loading", loading);
  console.log("entrance", entrance);

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 w-full h-full z-0">
        <iframe
          ref={iframeRef}
          id="api-frame"
          title="Stylized Witch's Room"
          className="w-full h-full border-0"
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
        />
      </div>

      <Hero loading={loading} setEntrance={setEntrance} />

      {loading
        ? null
        : entrance && (
            <Scene
              getActiveBlockIndex={getActiveBlockIndex}
              scrollProgress={scrollProgress}
            />
          )}
    </div>
  );
}
