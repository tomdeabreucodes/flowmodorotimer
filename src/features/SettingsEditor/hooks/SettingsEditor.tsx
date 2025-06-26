import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FaCog } from "react-icons/fa";
import type useSettings from "../useSettings";

export type Settings = ReturnType<typeof useSettings>;

export type settingsType = {
  settings: Settings;
};

export default function SettingsEditor({ settings }: settingsType) {
  const [open, setOpen] = useState(false);

  const saveSettings = () => {
    localStorage.setItem(
      "flowtime_settings",
      JSON.stringify(settings.draftBreakTimeDivisor)
    );
    settings.setBreakTimeDivisor(settings.draftBreakTimeDivisor);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Open settings">
          <FaCog />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={saveSettings}>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex">
            <div className="flex">
              <Label htmlFor="name-1" className="mr-2">
                {" "}
                Break Time = Focus Time ÷
              </Label>
              <Input
                id="breakTimeDivisor"
                name="breakTimeDivisor"
                value={settings.draftBreakTimeDivisor}
                onChange={(e) =>
                  settings.setDraftBreakTimeDivisor(e.target.valueAsNumber)
                }
                type="number"
                className="w-16"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
