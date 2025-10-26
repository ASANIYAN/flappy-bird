import { CONTAINER_HEIGHT, CONTAINER_WIDTH } from "@/lib/constants";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section
      className="mx-auto w-full relative border border-black my-5 overflow-auto"
      style={{
        height: `${CONTAINER_HEIGHT}px`,
        maxWidth: `${CONTAINER_WIDTH}px`,
      }}
    >
      {children}
    </section>
  );
};

export default Layout;
