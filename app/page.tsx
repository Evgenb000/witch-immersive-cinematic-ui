"use client";

import { useSceneProgress } from "@/hooks/useSceneProgress";
import { Scene } from "./components/scene";
import { useCameraController } from "@/hooks/useCameraController";
import { useSketchfab } from "@/hooks/useSketchfab";
import { useEffect, useState } from "react";
import { Hero } from "./components/hero";
import { ambient } from "@/utils/sounds";

export default function WitchHouse() {
  const { handleApiReady } = useCameraController();
  const { scrollProgress, getActiveBlockIndex } = useSceneProgress();
  const { iframeRef, loading } = useSketchfab(handleApiReady);
  const [entrance, setEntrance] = useState(false);
  const [ambientToggle, setAmbientToggle] = useState(false);

  useEffect(() => {
    if (ambientToggle) ambient.play();
    else ambient.stop();
  }, [ambientToggle]);

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 w-full h-full z-0">
        <iframe
          ref={iframeRef}
          id="api-frame"
          title="Stylized Witch's Room"
          className="w-full h-full border-0 pointer-events-none"
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
        />
      </div>

      <Hero
        loading={loading}
        setEntrance={setEntrance}
        setAmbientToggle={setAmbientToggle}
      />

      {!loading && entrance && (
        <Scene
          getActiveBlockIndex={getActiveBlockIndex}
          scrollProgress={scrollProgress}
        />
      )}
    </div>
  );
}
