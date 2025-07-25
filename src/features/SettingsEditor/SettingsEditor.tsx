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
import type useSettings from "./hooks/useSettings";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { SoundEffect } from "../Stopwatch/useSoundEffect";

export type Settings = ReturnType<typeof useSettings>;

export type settingsType = {
  settings: Settings;
};

export default function SettingsEditor({ settings }: settingsType) {
  const [open, setOpen] = useState(false);

  const saveSettings = () => {
    const draftSettings = {
      breakTimeDivisor: settings.draftBreakTimeDivisor,
      soundEffect: settings.draftSoundEffect,
      taskSectionVisible: settings.taskSectionVisible,
    };
    localStorage.setItem("flowtime_settings", JSON.stringify(draftSettings));
    settings.setBreakTimeDivisor(settings.draftBreakTimeDivisor);
    settings.setSoundEffect(settings.draftSoundEffect);
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
            <DialogDescription className="mb-4"></DialogDescription>
          </DialogHeader>
          <Label className="font-semibold">Breaks</Label>
          <div className="flex mb-4">
            <div className="flex items-center">
              <p className="mr-2"> Break Time = Focus Time ÷</p>
              <Input
                id="breakTimeDivisor"
                name="breakTimeDivisor"
                value={settings.draftBreakTimeDivisor}
                min={1}
                onChange={(e) =>
                  settings.setDraftBreakTimeDivisor(e.target.valueAsNumber)
                }
                type="number"
                className="w-16"
              />
            </div>
          </div>
          <Label className="font-semibold mb-4">Sound effect</Label>
          <div className="mb-4">
            <RadioGroup
              defaultValue={settings.draftSoundEffect}
              onValueChange={(value) =>
                settings.setDraftSoundEffect(value as SoundEffect)
              }
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="simple_chime" id="r1" />
                <Label htmlFor="r1">Simple chime</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="digital_watch_alarm" id="r2" />
                <Label htmlFor="r2">Digital watch alarm</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="egg_timer" id="r3" />
                <Label htmlFor="r3">Egg timer</Label>
              </div>
            </RadioGroup>
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
