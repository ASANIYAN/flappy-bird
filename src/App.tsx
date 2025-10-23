import "./App.css";
import Bird from "./components/bird";
import useGameStart from "./hooks/useGameStart";
import useSpaceBarTap from "./hooks/useSpaceBarTap";
import Layout from "./layouts/layout";

function App() {
  useGameStart();
  useSpaceBarTap();

  return (
    <Layout>
      <Bird />
    </Layout>
  );
}

export default App;
