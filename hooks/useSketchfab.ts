import { useEffect, useRef, useState } from "react";
import { SketchfabAPI } from "@/types/sketchfab";

export function useSketchfab(onApiReady: (api: SketchfabAPI) => void) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const apiRef = useRef<SketchfabAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    if (!iframeRef.current) return;

    const initSketchfab = () => {
      // @ts-expect-error-ignore-next-line
      const client = new window.Sketchfab("1.12.1", iframeRef.current!);

      client.init("c7dd3f813d054957ab85accdfd6e47fd", {
        success: (api: SketchfabAPI | null) => {
          if (!api) return console.error("Sketchfab API not found");

          api.start();
          api.addEventListener("viewerready", () => {
            console.log("Sketchfab viewer ready!");
            apiRef.current = api;
            initializedRef.current = true;

            apiRef.current.setPostProcessing(false);

            onApiReady(api);
            setLoading(false);
          });
        },
        error: () => console.error("Sketchfab API error"),
        autostart: 1,
        preload: 1,
        ui_infos: 0,
        ui_annotations: 0,
        ui_help: 0,
        ui_settings: 0,
        ui_fullscreen: 0,
        ui_hotkeys: 0,
        ui_loader: 0,
        ui_vr: 0,
        ui_ar: 0,
        ui_stop: 0,
        camera: 0,
        annotation: 0,
        annotations_visible: 0,
        dof_circle: 0,
        antialias: 0,
        dpr: 1,
      });
    };

    // @ts-expect-error-ignore-next-line
    if (!window.Sketchfab) {
      const script = document.createElement("script");
      script.src =
        "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";
      script.onload = initSketchfab;
      document.body.appendChild(script);
    } else {
      initSketchfab();
    }
  }, [onApiReady]);

  return { iframeRef, apiRef, loading };
}
