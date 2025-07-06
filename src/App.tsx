import Timer from "./features/Stopwatch/Stopwatch";
import { ThemeProvider } from "@/components/theme-provider";
import Tasks, { type TaskType } from "./features/Tasks/Tasks";
import useSettings from "./features/SettingsEditor/hooks/useSettings";
import { FlowtimeNavigationMenu } from "./components/flowtime-nav";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useState } from "react";
import { PiTarget } from "react-icons/pi";

function App() {
  const focusedTaskState = useState<TaskType | null>(null);
  const [focusedTask] = focusedTaskState;
  const settings = useSettings();

  function handleHideTaskSection() {
    settings.setTaskSectionVisible(!settings.taskSectionVisible);
    settings.updateTaskVisibility();
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="max-w-4xl mx-auto">
        <FlowtimeNavigationMenu settings={settings} />
        <div className="container max-w-4xl mx-auto">
          <div className="mx-4 flex flex-col items-center">
            <div
              className={`flex items-center container p-4 bg-cerulean-50 dark:bg-cerulean-200 rounded-lg max-w-lg mb-2 text-cerulean-950 ${
                !focusedTask && "invisible"
              }`}
            >
              <PiTarget
                className="mr-2 text-cerulean-400 dark:text-cerulean-600"
                size={22}
              />
              {focusedTask?.name}
            </div>
            <div className="flex flex-col container p-4 bg-secondary rounded-lg border max-w-lg mb-8">
              <Timer settings={settings} />
              <div className="flex justify-center">
                {settings.taskSectionVisible ? (
                  <FaRegEyeSlash onClick={() => handleHideTaskSection()} />
                ) : (
                  <FaRegEye onClick={() => handleHideTaskSection()} />
                )}
              </div>

              <Tasks focusedTaskState={focusedTaskState} settings={settings} />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
