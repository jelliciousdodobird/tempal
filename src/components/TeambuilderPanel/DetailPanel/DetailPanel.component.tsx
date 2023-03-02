"use client";

import clsx from "clsx";
import * as Slider from "@radix-ui/react-slider";
import { Switch, Tab } from "@headlessui/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { CustomTem, UpdateTem } from "../../../store/temteam-store";
import { EmptyPanel } from "../EmptyPanel/EmptyPanel.component";
import { ChangeEventHandler, useState } from "react";
import { clamp } from "../../../utils/utils";

const NICKNAME_LIMIT = 30;
const LEVEL_MIN = 1;
const LEVEL_MAX = 100;
const iconProps = {
  size: 16,
  stroke: 2.5,
};

type DetailPanelProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
};

export const DetailPanel = ({
  customTem,
  updateCustomTem,
}: DetailPanelProps) => {
  const { id, luma, nickname, name, level } = customTem;
  // we want the user to be able to clear in the number input without warnings about NaN and null
  // but we don't want to save "" or null or undefined or NaN in customTem.level
  // so we'll use lvlString to represent what the user SEES when they type
  // the actual value (type number) is still in customTem.level
  const [lvlString, setLvlString] = useState(String(level));

  const setLevel = (level: number) => updateCustomTem({ id, level });
  const setLuma = (luma: boolean) => updateCustomTem({ id, luma });
  const setNickname = (nickname: string) => updateCustomTem({ id, nickname });
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseInt(e.target.value);

    // validate the range:
    const validValue = clamp(value, LEVEL_MIN, LEVEL_MAX);

    // set what the user sees:
    setLvlString(String(validValue));

    // only commit the value if its not NaN
    if (!isNaN(value)) setLevel(validValue);
  };

  const nicknameId = "nickname for " + name;
  const levelId = "level for " + name;
  const hitLimit = nickname.length === NICKNAME_LIMIT;

  if (name === "") return <EmptyPanel />;
  return (
    <Tab.Panel className="flex flex-col gap-4 max-w-xs w-full" tabIndex={-1}>
      <h2 className="font-bold">Details</h2>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor={levelId} className="text-xs font-bold ml-1">
          Level
        </label>
        <div className="flex gap-4 w-full">
          <input
            id={levelId}
            type="number"
            min={LEVEL_MIN}
            max={LEVEL_MAX}
            value={lvlString}
            onChange={onInputChange}
            onBlur={() => setLvlString(String(level))}
            className="outline-none appearance-none rounded-lg px-3 h-10 w-14 text-center font-mono font-bold bg-neutral-800 text-neutral-400 focus:bg-white/10 focus:ring-1 ring-white/20"
          />
          <Slider.Root
            min={LEVEL_MIN}
            max={LEVEL_MAX}
            step={1}
            value={[parseInt(lvlString)]}
            onValueChange={(v) => setLvlString(String(v))} // change only the input as slider changes for performance reasons
            onValueCommit={(v) => setLevel(v[0])} // commit change once user stops interacting with slider
            className="relative flex items-center select-none touch-none w-full"
          >
            <Slider.Track className="rounded-full h-1 w-full bg-white/5">
              <Slider.Range className="h-full bg-blue-500/50" />
            </Slider.Track>
            <Slider.Thumb className="outline-none appearance-none flex rounded-full w-6 h-6 bg-white focus:ring-4 ring-white/20" />
          </Slider.Root>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4">
          <Switch.Group as="div" className="flex flex-col gap-2">
            <Switch.Label className="text-xs font-bold ml-1">Luma</Switch.Label>
            <div className="flex items-center h-full">
              <Switch
                checked={luma}
                type="button"
                className={clsx(
                  "flex rounded-full w-14 h-8 outline-none appearance-none border-2 border-neutral-800 p-[2px]",
                  "focus-visible:border-white/20 hover:border-white/20",
                  luma ? "justify-end" : "justify-start"
                )}
                onChange={setLuma}
              >
                <motion.span
                  layout
                  className={clsx(
                    "grid place-items-center rounded-full h-full aspect-square transition-[background-color,color] duration-500",
                    luma
                      ? "bg-emerald-700/50 text-emerald-500"
                      : "bg-red-700/50 text-red-500"
                  )}
                >
                  {luma ? (
                    <IconCheck {...iconProps} />
                  ) : (
                    <IconX {...iconProps} />
                  )}
                </motion.span>
              </Switch>
            </div>
          </Switch.Group>
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor={nicknameId}
              className="flex justify-between text-xs font-bold px-1"
            >
              <span className="">Nickname</span>
              <span
                className={clsx(hitLimit ? "text-red-600" : "text-neutral-500")}
              >{`${nickname.length}/${NICKNAME_LIMIT}`}</span>
            </label>
            <input
              id={nicknameId}
              maxLength={NICKNAME_LIMIT}
              type="text"
              className="outline-none appearance-none rounded-lg h-10 w-full px-3 bg-neutral-800 text-neutral-400 focus:bg-white/10 focus:ring-1 ring-white/20"
              value={nickname}
              onChange={(e) =>
                setNickname(e.target.value.slice(0, NICKNAME_LIMIT))
              }
            />
          </div>
        </div>
      </div>
    </Tab.Panel>
  );
};
