import { useBirdStore } from "@/store/birdStore";
import { useGameStateStore } from "@/store/gameStateStore";
import { useCallback, useEffect } from "react";

const useSpaceBarTap = () => {
  const { setBirdVelocity } = useBirdStore();
  const { setIsGameRunning, gameState, startGame } = useGameStateStore();

  const handleAction = useCallback(() => {
    if (gameState.showStartScreen) {
      startGame();
    } else if (gameState.isGameRunning === false && !gameState.isGameOver) {
      setIsGameRunning(true);
    } else if (gameState.isGameRunning) {
      setBirdVelocity(-10);
    }
  }, [
    gameState.showStartScreen,
    gameState.isGameRunning,
    gameState.isGameOver,
    setBirdVelocity,
    setIsGameRunning,
    startGame,
  ]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        handleAction();
      }
    },
    [handleAction]
  );

  const handleClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      handleAction();
    },
    [handleAction]
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      handleAction();
    },
    [handleAction]
  );

  useEffect(() => {
    // Keyboard events
    window.addEventListener("keydown", handleKeyDown);

    // Mouse events
    window.addEventListener("click", handleClick);

    // Touch events for mobile
    window.addEventListener("touchstart", handleTouchStart, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [handleKeyDown, handleClick, handleTouchStart]);
};

export default useSpaceBarTap;
