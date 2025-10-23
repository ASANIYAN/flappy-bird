import { useBirdStore } from "@/store/birdStore";

const Bird = () => {
  const { bird } = useBirdStore();

  return (
    <div
      className="w-9 h-6 absolute left-1/5 bg-red-600 transition-transform duration-10000"
      style={{
        top: `${bird.y}px`,
        transform: `rotate(${Math.min(bird.velocity * 3, 90)}deg)`, // rotate based on velocity
      }}
    />
  );
};

export default Bird;
