import {
  CONTAINER_HEIGHT,
  GROUND_HEIGHT,
  PIPE_GAP_SIZE,
  PIPE_WIDTH,
} from "@/lib/constants";
import top_pipe from "@/assets/top-pipe.svg";
import bottom_pipe from "@/assets/bottom-pipe.svg";
import type { Pipe } from "@/store/pipeStore";

type PipeProps = {
  pipe: Pipe;
};

const PipeItem = ({ pipe }: PipeProps) => {
  return (
    <>
      <div
        id={`pipe-${pipe.id}-top`}
        className="absolute top-0 overflow-hidden"
        style={{
          height: `${pipe.gapY}px`,
          left: `${pipe.x}px`,
          width: `${PIPE_WIDTH}px`,
        }}
      >
        <img
          src={top_pipe}
          alt="pipe top"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      <div
        id={`pipe-${pipe.id}-bottom`}
        className="absolute overflow-hidden"
        style={{
          left: `${pipe.x}px`,
          width: `${PIPE_WIDTH}px`,
          top: `${pipe.gapY + PIPE_GAP_SIZE}px`,
          height: `${
            CONTAINER_HEIGHT - GROUND_HEIGHT - (pipe.gapY + PIPE_GAP_SIZE)
          }px`,
        }}
      >
        <img
          src={bottom_pipe}
          alt="pipe bottom"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </>
  );
};

export default PipeItem;
