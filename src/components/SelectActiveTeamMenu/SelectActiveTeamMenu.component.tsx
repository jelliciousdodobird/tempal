import clsx from "clsx";
import { Menu } from "@headlessui/react";
import { IconPlus, IconSelector } from "@tabler/icons-react";
import { TemPortrait } from "../TemPortrait/TemPortrait.component";
import { TemTeam } from "../../store/temteam-store";

type SelectProps = {
  label?: string;
  value: TemTeam | null | undefined;
  options: TemTeam[];
  onChange: (team: TemTeam) => void;
  addToOptions: (toTop?: boolean) => void;
};

export const SelectActiveTeamMenu = ({
  value,
  options,
  onChange,
  addToOptions,
}: SelectProps) => {
  return (
    <Menu as="div" className="flex flex-col gap-1">
      <Menu.Button className="flex justify-between items-center rounded-md pl-4 pr-1 bg-neutral-800 min-h-[3rem]">
        <span className="text-neutral-500 font-bold">
          {value ? value.teamName : "No team selected."}
        </span>
        <IconSelector className="text-neutral-500" />
      </Menu.Button>
      <div className="relative">
        <Menu.Items
          className={clsx(
            "flex flex-col rounded-md bg-neutral-800 backdrop-blur-md py-2",
            "absolute z-10 w-full max-h-[17.5rem]  shadow-lg",
            "bg-neutral-800",
            "outline-none appearance-none"
          )}
        >
          <ul className="overflow-y-auto overflow-x-hidden custom-scrollbar-tiny">
            {options.map((team) => (
              <li
                key={team.id}
                className={clsx("flex justify-between w-full flex-1")}
              >
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => onChange(team)}
                      type="button"
                      className={clsx(
                        "flex flex-col gap-2 px-5 py-4 w-full outline-none appearance-none",
                        "focus-visible:ring-2 ring-red-500 focus-visible:ring-offset-2 ring-offset-blue-500",
                        active ? "bg-neutral-700/30" : "bg-transparent"
                      )}
                    >
                      <span className="text-sm text-neutral-500 font-medium text-left">
                        {team.teamName}
                      </span>
                      <span className="flex gap-2">
                        {team.team.map((tem) => (
                          <TemPortrait
                            size="S"
                            bgColor="bg-neutral-600/50"
                            key={tem.id}
                            customTem={tem}
                          />
                        ))}
                      </span>
                    </button>
                  )}
                </Menu.Item>
              </li>
            ))}
            <li className="px-3 py-4">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={clsx(
                      "flex items-center gap-2 px-4 rounded-xl min-h-[3rem] font-bold text-green-500 ring-2 ring-offset-2",
                      active
                        ? "bg-green-900/60 ring-green-900/80 ring-offset-neutral-800"
                        : "bg-green-900/50 ring-green-900/0 ring-offset-neutral-900/0"
                    )}
                    onClick={() => addToOptions()}
                  >
                    <span>Create New Team</span>
                  </button>
                )}
              </Menu.Item>
            </li>
          </ul>
        </Menu.Items>
      </div>
    </Menu>
  );
};
