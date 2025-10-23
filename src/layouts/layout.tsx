type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section className="mx-auto w-full max-w-100 h-150 relative border border-black my-5">
      {children}
    </section>
  );
};

export default Layout;
