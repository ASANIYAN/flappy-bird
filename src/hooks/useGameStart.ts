import {
  BIRD_HEIGHT,
  BIRD_WIDTH,
  BIRD_X,
  GRAVITY,
  GROUND_LEVEL,
  PIPE_GAP_SIZE,
  PIPE_SPEED,
  PIPE_WIDTH,
  SPAWN_INTERVAL,
} from "@/lib/constants";
import { useBirdStore } from "@/store/birdStore";
import { useGameStateStore } from "@/store/gameStateStore";
import { usePipeStore, type Pipe } from "@/store/pipeStore";
import { useCallback, useEffect, useRef } from "react";

const useGameStart = () => {
  const { setBird } = useBirdStore();
  const { updatePipes, addPipe } = usePipeStore();

  const frameCountRef = useRef<number>(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const { gameState, setIsGameRunning, setIsGameOver } = useGameStateStore();

  const handleSpawnPipe = useCallback(() => {
    frameCountRef.current++;

    if (frameCountRef.current >= SPAWN_INTERVAL) {
      addPipe({
        id: `pipe-${Date.now()}`,
        x: 400,
        gapY: Math.random() * 400 + 100, // Random between 100-500
        passed: false,
      });
      frameCountRef.current = 0;
    }
  }, [addPipe]);

  const checkPipeCollision = (birdY: number, pipe: Pipe) => {
    // Bird boundaries
    const birdLeft = BIRD_X;
    const birdRight = BIRD_X + BIRD_WIDTH;
    const birdTop = birdY;
    const birdBottom = birdY + BIRD_HEIGHT;

    // Pipe boundaries
    const pipeLeft = pipe.x;
    const pipeRight = pipe.x + PIPE_WIDTH;

    // Gap boundaries
    const gapTop = pipe.gapY;
    const gapBottom = pipe.gapY + PIPE_GAP_SIZE;

    // Check horizontal overlap
    const isOverlapping =
      birdLeft < pipeRight - 10 && birdRight > pipeLeft + 10;

    if (!isOverlapping) {
      return { hitTopPipe: false, hitBottomPipe: false, hasCollision: false };
    }

    // Check which pipe was hit
    const hitTopPipe = birdTop < gapTop;
    const hitBottomPipe = birdBottom > gapBottom;

    return {
      hitTopPipe,
      hitBottomPipe,
      hasCollision: hitTopPipe || hitBottomPipe,
    };
  };

  useEffect(() => {
    if (!gameState.isGameRunning) return;

    const gameLoop = () => {
      let collisionDetected: boolean = false;
      let currentBirdY: number = 0;

      handleSpawnPipe();

      setBird((prevBird) => {
        const newVelocity = prevBird.velocity + GRAVITY;
        const newY = prevBird.y + newVelocity;
        currentBirdY = newY;

        if (newY >= GROUND_LEVEL) {
          collisionDetected = true;
          return { y: GROUND_LEVEL, velocity: 0 };
        }

        return { y: newY, velocity: newVelocity };
      });

      updatePipes((prevPipes) => {
        const movedPipes = prevPipes.map((pipe) => ({
          ...pipe,
          x: pipe.x + PIPE_SPEED,
        }));

        const activePipes = movedPipes.filter((pipe) => {
          const pipeRight = pipe.x + PIPE_WIDTH;
          return pipeRight > BIRD_X; // Remove when pipe's right edge passes bird's left edge
        });

        for (const pipe of activePipes) {
          // Only check pipes that haven't fully passed the bird yet
          const pipeRight = pipe.x + PIPE_WIDTH;

          if (pipeRight < BIRD_X) {
            // Pipe is completely behind the bird, skip collision check
            continue;
          }

          const collision = checkPipeCollision(currentBirdY, pipe);

          if (collision.hitTopPipe || collision.hitBottomPipe) {
            console.log("FALSE COLLISION DEBUG:", {
              pipeId: pipe.id,
              pipeX: pipe.x,
              pipeGapY: pipe.gapY,
              birdX: BIRD_X,
              birdY: currentBirdY,
              birdRight: BIRD_X + BIRD_WIDTH,
              pipeLeft: pipe.x,
              pipeRight: pipe.x + PIPE_WIDTH,
              isOverlapping:
                BIRD_X + BIRD_WIDTH > pipe.x && BIRD_X < pipe.x + PIPE_WIDTH,
            });
          }

          if (collision.hitTopPipe) {
            collisionDetected = true;
            setBird({
              y: pipe.gapY - BIRD_HEIGHT,
              velocity: 0,
            });
          } else if (collision.hitBottomPipe) {
            collisionDetected = true;
            setBird({
              y: pipe.gapY + PIPE_GAP_SIZE,
              velocity: 0,
            });
          }
        }

        // filters out off-screen pipes
        return activePipes;
      });

      if (collisionDetected) {
        setIsGameOver(true);
        setIsGameRunning(false);
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    gameState.isGameRunning,
    setBird,
    setIsGameOver,
    setIsGameRunning,
    updatePipes,
    handleSpawnPipe,
  ]);
};

export default useGameStart;
