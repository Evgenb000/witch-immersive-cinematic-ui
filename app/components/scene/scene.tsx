import { CAMERA_POSITIONS } from "@/constants/camera_positions";
import React from "react";
import SceneContent from "./sceneContent";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/cn";

interface Props {
  getActiveBlockIndex: (scrollProgress: number) => number | null;
  scrollProgress: number;
}

export const Scene: React.FC<Props> = ({
  getActiveBlockIndex,
  scrollProgress,
}) => {
  const [showContent, setShowContent] = React.useState(true);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleShowContent = () => {
    setShowContent(!showContent);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        showContent
      ) {
        setShowContent(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showContent]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleShowContent}
        className="fixed top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
      >
        {showContent ? <Eye size={24} /> : <EyeOff size={24} />}
      </button>

      {CAMERA_POSITIONS.map((_, index) => (
        <div key={index} className="h-screen">
          <div className="fixed translate-y-40 inset-0 flex items-center justify-center">
            {getActiveBlockIndex(scrollProgress) !== null && (
              <div className="relative" ref={contentRef}>
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
