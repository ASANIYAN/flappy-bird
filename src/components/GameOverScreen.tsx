import { useGameStateStore } from "@/store/gameStateStore";
import { useBirdStore } from "@/store/birdStore";
import { usePipeStore } from "@/store/pipeStore";
import gameOverSvg from "@/assets/game-over.svg";
import startPng from "@/assets/start.png";

const GameOverScreen = () => {
  const { gameState, resetGame } = useGameStateStore();
  const { clearBirdState } = useBirdStore();
  const { clearPipes } = usePipeStore();

  const handleRestart = () => {
    resetGame();
    clearBirdState();
    clearPipes();
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="text-center space-y-8 animate-bounce-in">
        {/* Game Over Text */}
        <div className="animate-slide-down">
          <img
            src={gameOverSvg}
            alt="Game Over"
            className="w-64 h-auto mx-auto drop-shadow-lg"
          />
        </div>

        {/* Score Display */}
        <div className="bg-slate-700 bg-opacity-90 rounded-lg p-6 min-w-64 animate-slide-up">
          <div className="grid grid-cols-2 gap-8 text-white font-2p">
            <div className="text-center">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2">
                Score
              </h3>
              <p className="text-3xl font-bold">{gameState.score}</p>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2">
                Best
              </h3>
              <p className="text-3xl font-bold text-yellow-400">
                {gameState.highScore}
              </p>
            </div>
          </div>
        </div>

        {/* Play Again Button */}
        <div className="animate-fade-in-delayed">
          <button
            onClick={handleRestart}
            className="group relative transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <img
              src={startPng}
              alt="Play Again"
              className="w-20 h-20 drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-200"
            />
          </button>

          <p className="mt-4 text-white text-sm opacity-80 drop-shadow-sm">
            Tap to play again
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
