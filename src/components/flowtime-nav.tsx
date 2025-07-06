import { NavigationMenu } from "@/components/ui/navigation-menu";
import SettingsEditor, {
  type settingsType,
} from "@/features/SettingsEditor/SettingsEditor";
import { ModeToggle } from "./mode-toggle";
import { IoHourglass } from "react-icons/io5";

export function FlowtimeNavigationMenu({ settings }: settingsType) {
  return (
    <NavigationMenu className="mb-10 max-w-none justify-between p-4 ">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r to-cerulean-800 from-cerulean-200 rounded-lg">
          <IoHourglass className="w-full h-full text-cerulean-50 p-2" />{" "}
        </div>
      </div>
      <div className="space-x-2">
        <ModeToggle />
        <SettingsEditor settings={settings} />
      </div>
    </NavigationMenu>
  );
}
