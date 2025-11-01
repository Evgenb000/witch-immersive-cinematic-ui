export interface SketchfabAPI {
  addEventListener: (event: string, callback: (index?: number) => void) => void;
  getCameraLookAt: (
    callback: (err: unknown, camera: CameraData) => void
  ) => void;
  setCameraLookAt: (
    position: number[],
    target: number[],
    duration: number,
    callback?: () => void
  ) => void;
  setShowWatermark: (show: boolean) => void;
  start: () => void;
  setShowAnnotations: (show: boolean) => void;
  setPostProcessing: (enabled: boolean) => void;
}

export interface CameraData {
  position: number[];
  target: number[];
}

export interface Annotation {
  index: number;
  name: string;
  position: [number, number, number];
  eye: [number, number, number];
  target: [number, number, number];
  title?: string;
  content?: {
    raw?: string;
    rendered?: string;
  };
}
