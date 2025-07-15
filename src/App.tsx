import Stopwatch from "./features/Stopwatch/Stopwatch";
import { ThemeProvider } from "@/components/theme-provider";
import Tasks, { type TaskType } from "./features/Tasks/Tasks";
import useSettings from "./features/SettingsEditor/hooks/useSettings";
import { FlowtimeNavigationMenu } from "./components/flowtime-nav";
import { FaRegEyeSlash, FaRegEye, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import { PiTarget } from "react-icons/pi";
import { FaGithub } from "react-icons/fa";
import { Button } from "./components/ui/button";

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
      <div className="min-h-svh sm:min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center px-4">
          <div className="max-w-4xl w-full">
            <FlowtimeNavigationMenu settings={settings} />
            <div className="container max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
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
                  <Stopwatch settings={settings} />
                  <div className="flex justify-center">
                    {settings.taskSectionVisible ? (
                      <FaRegEyeSlash onClick={() => handleHideTaskSection()} />
                    ) : (
                      <FaRegEye onClick={() => handleHideTaskSection()} />
                    )}
                  </div>
                  <Tasks
                    focusedTaskState={focusedTaskState}
                    settings={settings}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center mb-8 space-x-4 items-center space-y-4">
          <a
            href="https://www.producthunt.com/products/simple-flowmodoro-timer?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-simple&#0045;flowmodoro&#0045;timer"
            target="_blank"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=992883&theme=light&t=1752564522837"
              alt="Simple&#0032;Flowmodoro&#0032;Timer - A&#0032;simple&#0032;timer&#0032;app&#0032;to&#0032;help&#0032;you&#0032;achieve&#0032;&#0038;&#0032;maintain&#0032;flow&#0032;state | Product Hunt"
              width="250"
              height="54"
              className="block dark:hidden"
            />
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=992883&theme=dark&t=1752564522837"
              alt="Simple&#0032;Flowmodoro&#0032;Timer - A&#0032;simple&#0032;timer&#0032;app&#0032;to&#0032;help&#0032;you&#0032;achieve&#0032;&#0038;&#0032;maintain&#0032;flow&#0032;state | Product Hunt"
              width="250"
              height="54"
              className="hidden dark:block"
            />
          </a>
          <a
            target="_blank"
            href="https://github.com/tomdeabreucodes/flowmodorotimer"
          >
            <Button
              className="cursor-pointer"
              aria-description="Star the repo on GitHub"
            >
              <FaGithub />
              Star <FaRegStar />
            </Button>
          </a>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
