import { useState, useEffect } from "react";
import { CONTAINER_HEIGHT, CONTAINER_WIDTH } from "@/lib/constants";

const DebugInfo = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const padding = 40;
      const availableWidth = width - padding;
      const availableHeight = height - padding;

      const scaleX = availableWidth / CONTAINER_WIDTH;
      const scaleY = availableHeight / CONTAINER_HEIGHT;
      const newScale = Math.min(scaleX, scaleY, 1);

      setWindowSize({ width, height });
      setScale(newScale);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="fixed top-2 right-2 bg-black bg-opacity-75 text-white text-xs p-2 rounded z-50 font-mono">
      <div>
        Window: {windowSize.width}×{windowSize.height}
      </div>
      <div>
        Game: {CONTAINER_WIDTH}×{CONTAINER_HEIGHT}
      </div>
      <div>Scale: {scale.toFixed(2)}x</div>
    </div>
  );
};

export default DebugInfo;
