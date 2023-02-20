"use client";

import { Dialog, RadioGroup } from "@headlessui/react";
import { IconChevronsUp, IconPlus } from "@tabler/icons-react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";
import { useHasMounted } from "../../hooks/useHasMounted";
import { TemTeam, useTemTeamsStore } from "../../store/temteam-store";
import { SelectActiveTeamMenu } from "../SelectActiveTeamMenu/SelectActiveTeamMenu.component";
import { TemPortrait } from "../TemPortrait/TemPortrait.component";

type AddTemProps = {
  temName: string;
};

export const AddTemToTeamButton = ({ temName }: AddTemProps) => {
  const mounted = useHasMounted();
  const [menuOpen, setMenuOpen] = useState(false);
  const [slot, setSlot] = useState(0);
  const { addToTeamOnSlot, activeTeamId, teams, setActiveTeamId, addTemTeam } =
    useTemTeamsStore();

  if (!mounted) return <>skeleton</>;

  // derived state:
  const activeTeam = teams.find(({ id }) => id === activeTeamId);

  const close = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((v) => !v);
  const changeActiveTeam = (team: TemTeam) => setActiveTeamId(team.id);
  const submit = () => {
    addToTeamOnSlot(temName, slot);
    close();
  };

  return (
    <>
      <button
        type="button"
        className="sticky top-20 grid place-items-center rounded-full h-12 w-12 bg-green-500 text-green-100"
        onClick={toggleMenu}
      >
        <IconPlus />
      </button>

      <Dialog open={menuOpen} onClose={close} className="relative">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px]"
          aria-hidden="true"
        />
        {/* The actual panel */}
        <div className="fixed inset-0 pt-8 grid place-items-center">
          <Dialog.Panel
            className={clsx(
              "relative flex flex-col gap-6 bg-neutral-800/60 backdrop-blur-md rounded-xl overflow-hiddenzz p-6",
              "min-w-[20rem] h-min"
            )}
          >
            {!activeTeam && (
              <span className="text-xs text-red-500">
                Please select or create a team below:
              </span>
            )}
            <SelectActiveTeamMenu
              value={activeTeam}
              options={teams}
              onChange={changeActiveTeam}
              addToOptions={addTemTeam}
            />
            {activeTeam && (
              <>
                <RadioGroup
                  value={slot}
                  onChange={setSlot}
                  className="flex flex-col gap-4"
                >
                  <RadioGroup.Label className="text-xs text-neutral-500 uppercase font-bold">
                    Choose a slot
                  </RadioGroup.Label>
                  <div className="flex gap-2">
                    {activeTeam.team.map((tem, i) => (
                      <RadioGroup.Option
                        value={i}
                        key={tem.id}
                        className="outline-none appearance-none cursor-pointer"
                      >
                        {({ checked }) => (
                          <div className={clsx("flex flex-col gap-2")}>
                            <span className="relative">
                              {checked && (
                                <span className="absolute inset-[-3px] rounded-full border border-emerald-500" />
                              )}
                              <TemPortrait size="M" customTem={tem} />
                            </span>
                            {checked && (
                              <motion.span
                                layoutId="selector"
                                className="flex flex-col justify-center items-center"
                              >
                                <IconChevronsUp
                                  className="animate-bounce text-emerald-500"
                                  stroke={1}
                                />
                                <span className="relative">
                                  <span className="absolute inset-[-4px] rounded-full border border-emerald-500" />
                                  <TemPortrait
                                    bgColor="bg-neutral-500/50"
                                    size="M"
                                    temName={temName}
                                  />
                                </span>
                                {/* <span className="rounded-full ring-2 ring-offset-[3px] ring-green-500 ring-offset-neutral-800">
                                  <TemPortrait
                                    bgColor="bg-green-500/30"
                                    size="M"
                                    temName={temName}
                                  />
                                </span> */}
                              </motion.span>
                            )}
                          </div>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
                <button
                  type="button"
                  className={clsx(
                    "mt-4 px-4 h-12 rounded-xl bg-gradient-to-r from-emerald-500 via-green-600 to-indigo-500",
                    "font-bold text-sm uppercase"
                  )}
                  onClick={submit}
                >
                  Finish Adding!
                </button>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
