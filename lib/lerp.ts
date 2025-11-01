export const lerp = (start: number, end: number, t: number): number => {
  return start + (end - start) * t;
};

export const interpolateCameraPosition = (
  pos1: { position: number[]; target: number[] },
  pos2: { position: number[]; target: number[] },
  t: number
): { position: number[]; target: number[] } => {
  return {
    position: [
      lerp(pos1.position[0], pos2.position[0], t),
      lerp(pos1.position[1], pos2.position[1], t),
      lerp(pos1.position[2], pos2.position[2], t),
    ],
    target: [
      lerp(pos1.target[0], pos2.target[0], t),
      lerp(pos1.target[1], pos2.target[1], t),
      lerp(pos1.target[2], pos2.target[2], t),
    ],
  };
};
