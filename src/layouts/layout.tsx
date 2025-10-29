import { useGameStateStore } from "@/store/gameStateStore";
import { CONTAINER_HEIGHT, CONTAINER_WIDTH } from "@/lib/constants";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { gameState } = useGameStateStore();

  return (
    <section>
      <h1 className="text-2xl font-bold text-center">{gameState.score}</h1>

      <section
        className="mx-auto w-full relative border border-black my-5 overflow-auto"
        style={{
          height: `${CONTAINER_HEIGHT}px`,
          maxWidth: `${CONTAINER_WIDTH}px`,
        }}
      >
        {children}
      </section>
    </section>
  );
};

export default Layout;
