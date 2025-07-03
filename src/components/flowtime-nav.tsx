import { NavigationMenu } from "@/components/ui/navigation-menu";
import SettingsEditor, {
  type settingsType,
} from "@/features/SettingsEditor/SettingsEditor";
import { ModeToggle } from "./mode-toggle";

export function FlowtimeNavigationMenu({ settings }: settingsType) {
  return (
    <NavigationMenu className="mb-20 max-w-none justify-between p-4 ">
      <h1 className="text-3xl font-bold font-mono">Flowtime</h1>
      <div className="space-x-2">
        <ModeToggle />
        <SettingsEditor settings={settings} />
      </div>
    </NavigationMenu>
  );
}
