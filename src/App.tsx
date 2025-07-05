import Timer from "./features/Stopwatch/Stopwatch";
import { ThemeProvider } from "@/components/theme-provider";
import Tasks from "./features/Tasks/Tasks";
import useSettings from "./features/SettingsEditor/hooks/useSettings";
import { FlowtimeNavigationMenu } from "./components/flowtime-nav";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

function App() {
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
            <div className="flex flex-col container p-4 bg-secondary rounded-lg border max-w-lg mb-8">
              <Timer settings={settings} />
              <div className="flex justify-center">
                {settings.taskSectionVisible ? (
                  <FaRegEyeSlash onClick={() => handleHideTaskSection()} />
                ) : (
                  <FaRegEye onClick={() => handleHideTaskSection()} />
                )}
              </div>
              {settings.taskSectionVisible && <Tasks />}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
