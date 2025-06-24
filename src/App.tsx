import Timer from "./features/Stopwatch/Stopwatch";
// import type { TaskType } from "./Task";
import Tasks from "./features/Tasks/Tasks";

function App() {
  return (
    <>
      <h1 className="text-4xl font-bold">Flowtime</h1>
      <Timer />
      <Tasks></Tasks>
    </>
  );
}

export default App;
