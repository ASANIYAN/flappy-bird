import { CONTAINER_HEIGHT, PIPE_GAP_SIZE, PIPE_WIDTH } from "@/lib/constants";
import type { Pipe } from "@/store/pipeStore";

type PipeProps = {
  pipe: Pipe;
};

const PipeItem = ({ pipe }: PipeProps) => {
  return (
    <>
      <section
        id={`pipe-${pipe.id}-top`}
        className="absolute bg-green-600 top-0"
        style={{
          border: "2px solid blue",
          height: `${pipe.gapY}px`,
          left: `${pipe.x}px`,
          width: `${PIPE_WIDTH}px`,
        }}
      />

      <section
        id={`pipe-${pipe.id}-bottom`}
        className="absolute bg-green-600 bottom-0"
        style={{
          border: "2px solid blue",
          left: `${pipe.x}px`,
          width: `${PIPE_WIDTH}px`,
          height: `${CONTAINER_HEIGHT - (pipe.gapY + PIPE_GAP_SIZE)}px`,
        }}
      />
    </>
  );
};

export default PipeItem;
