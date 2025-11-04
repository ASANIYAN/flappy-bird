import "./App.css";
import Bird from "./components/bird";
import PipeItem from "./components/pipe";
// import DebugInfo from "./components/DebugInfo";
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
      {/* <DebugInfo /> */}
    </Layout>
  );
}

export default App;
