import Timer from "./features/Stopwatch/Stopwatch";
import { ThemeProvider } from "@/components/theme-provider";
import Tasks from "./features/Tasks/Tasks";

import useSettings from "./features/SettingsEditor/hooks/useSettings";
import { FlowtimeNavigationMenu } from "./components/flowtime-nav";

function App() {
  const settings = useSettings();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="container max-w-4xl mx-auto">
        <FlowtimeNavigationMenu settings={settings} />
        <div className="mx-4 flex flex-col items-center">
          <div className="flex flex-col container p-4 bg-secondary rounded-lg border max-w-lg">
            <Timer settings={settings} />
            <Tasks />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
