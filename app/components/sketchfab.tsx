"use client";

import { useSketchfab } from "@/hooks/useSketchfab";
import { SketchfabAPI } from "@/types/sketchfab";

type Props = {
  onApiReady: (api: SketchfabAPI) => void;
};

export function SketchfabBackground({ onApiReady }: Props) {
  const { iframeRef } = useSketchfab(onApiReady);

  return (
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
  );
}
