import "./App.css";
import Bird from "./components/bird";
import PipeItem from "./components/pipe";
import useGameStart from "./hooks/useGameStart";
import useSpaceBarTap from "./hooks/useSpaceBarTap";
import Layout from "./layouts/layout";
import { usePipeStore } from "./store/pipeStore";

function App() {
  const { pipes } = usePipeStore();

  useGameStart();
  useSpaceBarTap();

  return (
    <Layout>
      <Bird />
      {pipes.map((pipe) => (
        <PipeItem key={pipe.id} pipe={pipe} />
      ))}
    </Layout>
  );
}

export default App;
