import { useBirdStore } from "@/store/birdStore";
import { useGameStateStore } from "@/store/gameStateStore";
import { useCallback, useEffect } from "react";

const useSpaceBarTap = () => {
  const { setBirdVelocity } = useBirdStore();
  const { setIsGameRunning, gameState } = useGameStateStore();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Space") {
        if (gameState.isGameRunning === false) {
          setIsGameRunning(true);
        }
        setBirdVelocity(-10);
      }
    },
    [gameState.isGameRunning, setBirdVelocity, setIsGameRunning]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};

export default useSpaceBarTap;
