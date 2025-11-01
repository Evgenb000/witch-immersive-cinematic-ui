import { useEffect, useRef } from "react";
import { SketchfabAPI } from "@/types/sketchfab";

export function useSketchfab(onApiReady: (api: SketchfabAPI) => void) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const apiRef = useRef<SketchfabAPI | null>(null);

  useEffect(() => {
    const initSketchfab = () => {
      const iframe = iframeRef.current;
      // @ts-expect-error-ignore-next-line
      const client = new window.Sketchfab("1.12.1", iframe);

      client.init("c7dd3f813d054957ab85accdfd6e47fd", {
        success: (api: SketchfabAPI | null) => {
          if (!api) {
            console.error("Sketchfab API not found");
            return;
          }

          api.start();
          api.addEventListener("viewerready", () => {
            console.log("Sketchfab viewer ready!");
            apiRef.current = api;
            onApiReady(api);
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
      });
    };

    const script = document.createElement("script");
    script.src = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";
    script.onload = initSketchfab;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [onApiReady]);

  return { iframeRef };
}
