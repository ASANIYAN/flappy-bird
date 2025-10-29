import {
  BIRD_HEIGHT,
  BIRD_LEFT,
  BIRD_RIGHT,
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
  const { gameState, setIsGameRunning, setIsGameOver, incrementScore } =
    useGameStateStore();

  const frameCountRef = useRef<number>(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const handleSpawnPipe = useCallback(() => {
    frameCountRef.current++;

    if (frameCountRef.current >= SPAWN_INTERVAL) {
      addPipe({
        id: `pipe-${Date.now()}`,
        x: 300,
        gapY: Math.random() * 400 + 100,
        passed: false,
      });
      frameCountRef.current = 0;
    }
  }, [addPipe]);

  const checkPipeCollision = (birdY: number, pipe: Pipe) => {
    // Bird boundaries

    const birdTop = birdY;
    const birdBottom = birdY + BIRD_HEIGHT;

    // Pipe boundaries
    const pipeLeft = pipe.x;
    const pipeRight = pipe.x + PIPE_WIDTH;

    // Gap boundaries
    const gapTop = pipe.gapY;
    const gapBottom = pipe.gapY + PIPE_GAP_SIZE;

    // Check horizontal overlap
    const hasHorizontalOverlap = BIRD_RIGHT > pipeLeft && BIRD_LEFT < pipeRight;

    if (!hasHorizontalOverlap) {
      return {
        hitTopPipe: false,
        hitBottomPipe: false,
        hasCollision: false,
        isApproachingFromSide: false,
      };
    }

    // Check vertical collisions
    const hitTopPipe = birdTop < gapTop;
    const hitBottomPipe = birdBottom > gapBottom;

    // Determine if approaching from side (more precise detection)
    const birdCenterX = BIRD_X + BIRD_WIDTH / 2;
    const pipeCenterX = pipe.x + PIPE_WIDTH / 2;
    const isApproachingFromSide = birdCenterX < pipeCenterX - PIPE_WIDTH / 4;

    return {
      hitTopPipe,
      hitBottomPipe,
      hasCollision: hitTopPipe || hitBottomPipe,
      isApproachingFromSide,
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
        let newY = prevBird.y + newVelocity;
        currentBirdY = newY;

        // Check for ground collision first
        if (newY >= GROUND_LEVEL) {
          collisionDetected = true;
          return { y: GROUND_LEVEL, velocity: 0 };
        }

        updatePipes((currentPipes) => {
          for (const pipe of currentPipes) {
            const birdRight = BIRD_X + BIRD_WIDTH;
            const birdLeft = BIRD_X;
            const pipeLeft = pipe.x;
            const pipeRight = pipe.x + PIPE_WIDTH;

            // If bird is horizontally overlapping with pipe
            if (birdRight > pipeLeft && birdLeft < pipeRight) {
              const gapTop = pipe.gapY;
              const gapBottom = pipe.gapY + PIPE_GAP_SIZE;

              // If bird would enter the top pipe area, constrain to gap top
              if (newY < gapTop) {
                newY = gapTop;
                collisionDetected = true;
              }
              // If bird would enter the bottom pipe area, constrain to gap bottom
              else if (newY + BIRD_HEIGHT > gapBottom) {
                newY = gapBottom - BIRD_HEIGHT;
                collisionDetected = true;
              }
            }
          }
          return currentPipes; // Return unchanged pipes
        });

        currentBirdY = newY;

        return { y: newY, velocity: collisionDetected ? 0 : newVelocity };
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
        let updatedPipes = activePipes;

        for (const pipe of activePipes) {
          // Only check pipes that haven't fully passed the bird yet
          const pipeRight = pipe.x + PIPE_WIDTH;

          if (pipeRight < BIRD_X) {
            // Pipe is completely behind the bird, skip collision check
            continue;
          }

          const collision = checkPipeCollision(currentBirdY, pipe);

          if (collision.hasCollision) {
            collisionDetected = true;

            // Since we already prevented penetration above, this handles edge cases
            if (collision.hitTopPipe) {
              if (collision.isApproachingFromSide) {
                // Bird hit side of top pipe - keep at current constrained position
                setBird({ y: currentBirdY, velocity: 0 });
              } else {
                // Hit from below - position at gap top
                setBird({ y: pipe.gapY, velocity: 0 });
              }
            } else if (collision.hitBottomPipe) {
              if (collision.isApproachingFromSide) {
                // Bird hit side of bottom pipe - keep at current constrained position
                setBird({ y: currentBirdY, velocity: 0 });
              } else {
                // Hit from above - position at gap bottom
                setBird({
                  y: pipe.gapY + PIPE_GAP_SIZE - BIRD_HEIGHT,
                  velocity: 0,
                });
              }
            }
            break; // Exit after first collision
          }

          if (BIRD_RIGHT > pipeRight && !pipe.passed) {
            incrementScore();
            updatedPipes = activePipes.map((p) =>
              p.id === pipe.id ? { ...p, passed: true } : p
            );
          }
        }

        // filters out off-screen pipes
        return updatedPipes;
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
    incrementScore,
  ]);
};

export default useGameStart;
