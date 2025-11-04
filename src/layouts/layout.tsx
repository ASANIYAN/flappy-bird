import { useGameStateStore } from "@/store/gameStateStore";
import {
  CONTAINER_HEIGHT,
  CONTAINER_WIDTH,
  GROUND_HEIGHT,
} from "@/lib/constants";
import groundImage from "@/assets/ground.png";
import backgroundImage from "@/assets/background.png";
import StartScreen from "@/components/StartScreen";
import GameOverScreen from "@/components/GameOverScreen";
import { useState, useEffect } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { gameState } = useGameStateStore();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      const padding = 40;
      const availableWidth = window.innerWidth - padding;
      const availableHeight = window.innerHeight - padding;

      // Calculates scale based on available space, but never exceed 1x
      const scaleX = availableWidth / CONTAINER_WIDTH;
      const scaleY = availableHeight / CONTAINER_HEIGHT;
      const newScale = Math.min(scaleX, scaleY, 1);

      setScale(newScale);
    };

    calculateScale();

    window.addEventListener("resize", calculateScale);

    return () => {
      window.removeEventListener("resize", calculateScale);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 px-5 py-2.5">
      <section className="flex items-center justify-center">
        <section
          className="relative overflow-hidden bg-white shadow-lg"
          style={{
            width: `${CONTAINER_WIDTH}px`,
            height: `${CONTAINER_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          {/* Score display inside game area */}
          {!gameState.showStartScreen && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
              <h1 className="text-3xl font-bold text-center text-white drop-shadow-lg font-2p">
                {gameState.score}
              </h1>
            </div>
          )}

          {children}

          {/* Start Screen */}
          {gameState.showStartScreen && <StartScreen />}

          {/* Game Over Screen */}
          {gameState.isGameOver && <GameOverScreen />}

          <img
            src={groundImage}
            alt="ground"
            className="absolute left-0 w-full pointer-events-none z-10"
            style={{
              bottom: 0,
              height: `${GROUND_HEIGHT}px`,
              objectFit: "cover",
            }}
          />
        </section>
      </section>
    </section>
  );
};

export default Layout;
