import { useGameStateStore } from "@/store/gameStateStore";
import { useBirdStore } from "@/store/birdStore";
import { usePipeStore } from "@/store/pipeStore";
import titleSvg from "@/assets/title.svg";
import startPng from "@/assets/start.png";

const StartScreen = () => {
  const { startGame } = useGameStateStore();
  const { clearBirdState } = useBirdStore();
  const { clearPipes } = usePipeStore();

  const handleStart = () => {
    clearBirdState();
    clearPipes();
    startGame();
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/20 animate-fade-in">
      <div className="text-center space-y-8 animate-float">
        {/* Title */}
        <div className="animate-slide-down">
          <img
            src={titleSvg}
            alt="Flappy Bird"
            className="w-80 h-auto mx-auto drop-shadow-lg"
          />
        </div>

        {/* Play Button */}
        <div className="animate-slide-up">
          <button
            onClick={handleStart}
            className="group relative transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <img
              src={startPng}
              alt="Start Game"
              className="w-24 h-24 drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-200"
            />
          </button>

          {/* Instructions */}
          <div className="mt-6 space-y-2 text-white text-center animate-fade-in-delayed">
            <p className="text-lg font-semibold drop-shadow-md">Tap to Play</p>
            <p className="text-sm opacity-80 drop-shadow-sm">
              Press SPACE or tap anywhere to flap
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
