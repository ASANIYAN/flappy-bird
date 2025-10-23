import { useBirdStore } from "@/store/birdStore";
import { useGameStateStore } from "@/store/gameStateStore";
import { useEffect, useRef } from "react";

const GRAVITY = 0.6;

const useGameStart = () => {
  const { setBird } = useBirdStore();
  const { gameState } = useGameStateStore();
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!gameState.isGameRunning) return;

    const gameLoop = () => {
      setBird((prevBird) => {
        const newVelocity = prevBird.velocity + GRAVITY;
        console.log(newVelocity, "new velocity");

        const newY = prevBird.y + newVelocity;
        // console.log("Frame:", { y: newY, velocity: newVelocity });
        return { y: newY, velocity: newVelocity };
      });

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState.isGameRunning, setBird]);
};

export default useGameStart;
