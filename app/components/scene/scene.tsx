"use client";

import React, { useState } from "react";
import { CAMERA_POSITIONS } from "@/constants/camera_positions";
import SceneContent from "./sceneContent";
import { Eye, EyeOff, Volume1, Volume2, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";
import { playSound } from "@/utils/sounds";
import { sceneSounds } from "@/constants/scene";
import { useSoundStore } from "@/store/useSoundStore";

interface Props {
  getActiveBlockIndex: (scrollProgress: number) => number | null;
  scrollProgress: number;
}

export const Scene: React.FC<Props> = ({
  getActiveBlockIndex,
  scrollProgress,
}) => {
  const [showContent, setShowContent] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const previousScene = React.useRef<number | null>(null);

  const increaseVolume = useSoundStore((state) => state.increaseVolume);
  const decreaseVolume = useSoundStore((state) => state.decreaseVolume);

  const handleToggleButtons = () => {
    setShowButtons((prev) => !prev);
  };

  React.useEffect(() => {
    const activeScene = getActiveBlockIndex(scrollProgress);
    if (
      activeScene !== null &&
      activeScene !== previousScene.current &&
      sceneSounds[activeScene + 1]
    ) {
      Object.values(sceneSounds).forEach((sound) => sound.stop());
      playSound(sceneSounds[activeScene + 1]);
      previousScene.current = activeScene;
    }
  }, [scrollProgress, getActiveBlockIndex]);

  return (
    <div className="relative">
      <div
        className={cn(
          "fixed top-4 right-4 flex flex-col gap-2 transform translate-x-[80%] hover:translate-x-[60%] transition-transform duration-300 z-50",
          showButtons && "translate-x-[60%]"
        )}
      >
        <button
          onClick={handleToggleButtons}
          className="bg-white/20 hover:bg-white/40 rounded-l-lg p-2 cursor-pointer w-20"
          title={showButtons ? "Hide buttons" : "Show buttons"}
        >
          <ChevronLeft
            size={24}
            className={
              showButtons
                ? "rotate-180 transition-transform"
                : "transition-transform"
            }
          />
        </button>

        {showButtons && (
          <div className="flex flex-col gap-2 mt-2 w-10 translate-x-[00%]">
            <button
              onClick={increaseVolume}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-colors"
              title="Increase volume"
            >
              <Volume2 />
            </button>
            <button
              onClick={decreaseVolume}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-colors"
              title="Decrease volume"
            >
              <Volume1 />
            </button>
            <button
              onClick={() => setShowContent((p) => !p)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
              title={showContent ? "Hide scene content" : "Show scene content"}
            >
              {showContent ? <Eye size={24} /> : <EyeOff size={24} />}
            </button>
          </div>
        )}
      </div>

      {CAMERA_POSITIONS.map((_, index) => (
        <div key={index} className="h-[300vh]">
          <div className="fixed translate-y-40 inset-0 flex items-center justify-center">
            {getActiveBlockIndex(scrollProgress) !== null && (
              <div className="relative">
                <SceneContent
                  current={getActiveBlockIndex(scrollProgress)!}
                  className={cn(showContent ? "opacity-100" : "opacity-0")}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
