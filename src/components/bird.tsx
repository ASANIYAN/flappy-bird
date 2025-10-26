import { useBirdStore } from "@/store/birdStore";
import { BIRD_HEIGHT, BIRD_WIDTH, BIRD_X } from "@/lib/constants";

const Bird = () => {
  const { bird } = useBirdStore();

  return (
    <div
      className="absolute bg-red-600 transition-transform duration-10000 z-50"
      style={{
        top: `${bird.y}px`,
        left: `${BIRD_X}px`,
        border: "2px solid black",
        width: `${BIRD_WIDTH}px`,
        height: `${BIRD_HEIGHT}px`,
        // transform: `rotate(${Math.min(bird.velocity * 3, 90)}deg)`,
      }}
    />
  );
};

export default Bird;
