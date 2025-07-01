import Timer from "./features/Stopwatch/Stopwatch";
// import type { TaskType } from "./Task";
import Tasks from "./features/Tasks/Tasks";
import SettingsEditor from "./features/SettingsEditor/SettingsEditor";

import useSettings from "./features/SettingsEditor/hooks/useSettings";

function App() {
  const settings = useSettings();
  return (
    <>
      <h1 className="text-4xl font-bold font-mono">Flowtime</h1>
      <Timer settings={settings} />
      <Tasks />
      <SettingsEditor settings={settings} />
    </>
  );
}

export default App;
