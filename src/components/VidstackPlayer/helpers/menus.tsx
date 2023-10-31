import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  Menu,
  useCaptionOptions,
  useMediaPlayer,
  usePlaybackRateOptions,
  useVideoQualityOptions,
} from "@vidstack/react";
import {
  ChevronRightIcon,
  PlaybackSpeedCircleIcon,
  SettingsIcon,
  SettingsMenuIcon,
} from "@vidstack/react/icons";
import { CheckCircle, CircleIcon, SubtitlesIcon } from "lucide-react";

import { buttonClass, tooltipClass } from "./buttons";

export interface MenuProps {
  side?: DropdownMenu.MenuContentProps["side"];
  align?: DropdownMenu.MenuContentProps["align"];
  offset?: DropdownMenu.MenuContentProps["sideOffset"];
  tooltipSide?: Tooltip.TooltipContentProps["side"];
  tooltipAlign?: Tooltip.TooltipContentProps["align"];
  tooltipOffset?: number;
}

// We can reuse this class for other menus.
const menuClass =
  "animate-out fade-out z-[9999] slide-in-from-bottom-4 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-out-to-bottom-2 flex max-h-[325px] min-w-[260px] flex-col rounded-md border border-white/10 bg-black/95 px-1 font-sans text-[15px] font-medium outline-none backdrop-blur-sm duration-300 relative overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-thumb-rounded-md";
const subMenuClass =
  "flex rounded-md sticky top-0 duration-300 items-center w-full px-1.5 my-1 py-2 transition hover:bg-white/10 bg-black z-[9999]";

export function ElementsMenu({
  side = "top",
  align = "end",
  offset = 0,
  tooltipSide = "top",
  tooltipAlign = "center",
  tooltipOffset = 0,
}: MenuProps) {
  const player = useMediaPlayer();
  const captionOptions = useCaptionOptions();
  const captionHint = captionOptions.selectedTrack?.label ?? "Off";
  const qualityOptions = useVideoQualityOptions();
  const qualityHint =
    qualityOptions.find((item) => item.selected)?.label ?? "Auto";
  const playbackRateOptions = usePlaybackRateOptions();
  const playbackRateHint =
    playbackRateOptions.find((item) => item.selected)?.label ?? "Normal";
  return (
    <DropdownMenu.Root>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <DropdownMenu.Trigger aria-label="Settings" className={buttonClass}>
            <SettingsIcon className="h-7 w-7" />
          </DropdownMenu.Trigger>
        </Tooltip.Trigger>
        <Tooltip.Content
          className={tooltipClass}
          side={tooltipSide}
          align={tooltipAlign}
          sideOffset={tooltipOffset}
        >
          Settings
        </Tooltip.Content>
      </Tooltip.Root>
      <DropdownMenu.Content
        className={menuClass}
        side={side}
        align={align}
        sideOffset={offset}
        collisionBoundary={player?.el}
      >
        {/* Speed */}
        {playbackRateOptions.length > 1 && (
          <Menu.Root>
            <Menu.Button className={subMenuClass}>
              <PlaybackSpeedCircleIcon className="mr-1.5 h-5 w-5 translate-y-px" />
              Speed
              <span className="ml-auto flex text-sm text-white/50">
                {playbackRateHint} <ChevronRightIcon className="w-4" />
              </span>
            </Menu.Button>
            <Menu.Content>
              <Menu.RadioGroup className="flex w-full flex-col">
                {playbackRateOptions.map(({ label, value, select }) => (
                  <Radio
                    value={value}
                    onSelect={select}
                    key={value}
                    isSelected={label === playbackRateHint}
                  >
                    {label}
                  </Radio>
                ))}
              </Menu.RadioGroup>
            </Menu.Content>
          </Menu.Root>
        )}
        {/* Quality */}
        {qualityOptions.length > 1 && (
          <Menu.Root>
            <Menu.Button className={subMenuClass}>
              <SettingsMenuIcon className="mr-1.5 h-5 w-5 translate-y-px" />
              Quality
              <span className="ml-auto flex text-sm text-white/50">
                {qualityHint} <ChevronRightIcon className="w-4" />
              </span>
            </Menu.Button>
            <Menu.Content>
              <Menu.RadioGroup className="flex w-full flex-col">
                {qualityOptions.map(({ label, value, select, bitrateText }) => (
                  <Radio
                    value={value}
                    onSelect={select}
                    key={value}
                    isSelected={label === qualityHint}
                  >
                    {label}
                    <span className="flex text-sm text-white/50">
                      {bitrateText}
                    </span>
                  </Radio>
                ))}
              </Menu.RadioGroup>
            </Menu.Content>
          </Menu.Root>
        )}
        {/* Caption */}
        {captionOptions.length > 1 && (
          <Menu.Root>
            <Menu.Button className={subMenuClass}>
              <SubtitlesIcon className="mr-1.5 h-5 w-5 translate-y-px" />
              Captions
              <span className="ml-auto flex text-sm text-white/50">
                {captionHint} <ChevronRightIcon className="w-4" />
              </span>
            </Menu.Button>
            <Menu.Content>
              <Menu.RadioGroup className="flex w-full flex-col">
                {captionOptions.map(({ label, value, select }) => (
                  <Radio
                    value={value}
                    onSelect={select}
                    key={value}
                    isSelected={label === captionHint}
                  >
                    {label}
                  </Radio>
                ))}
              </Menu.RadioGroup>
            </Menu.Content>
          </Menu.Root>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function Radio({
  children,
  isSelected,
  ...props
}: Menu.RadioProps & { isSelected: boolean }) {
  return (
    <Menu.Radio
      className="group relative flex w-full cursor-pointer select-none items-center justify-start rounded-sm p-2.5 text-sm outline-none ring-media-focus data-[focus]:ring-[3px] hocus:bg-white/10"
      {...props}
    >
      {isSelected ? (
        <CheckCircle className="h-4 w-4 text-media-brand" />
      ) : (
        <CircleIcon className="h-4 w-4 text-white" />
      )}
      <span className="ml-2 flex w-full justify-between">{children}</span>
    </Menu.Radio>
  );
}
