import captionStyles from "./captions.module.css";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Captions, Controls, Gesture, useMediaState } from "@vidstack/react";

import * as Buttons from "./helpers/buttons";
import * as Menus from "./helpers/menus";
import * as Sliders from "./helpers/sliders";
import { TimeGroup } from "./helpers/time-group";
import { PlayIcon } from "@vidstack/react/icons";

// Offset tooltips/menus/slider previews in the lower controls group so they're clearly visible.
const popupOffset = 30;

export interface VideoLayoutProps {
  thumbnails?: string;
  downloadUrl?: string;
}

export function VideoLayout({ thumbnails, downloadUrl }: VideoLayoutProps) {
  return (
    <>
      <Gestures />
      <Captions
        className={`${captionStyles.captions} absolute inset-0 bottom-2 z-10 select-none break-words opacity-0 transition-[opacity,bottom] duration-300 media-captions:opacity-100 media-controls:bottom-[85px] media-preview:opacity-0`}
      />
      <Controls.Root className="absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity media-controls:opacity-100">
        <Tooltip.Provider>
          <div className="flex-1" />
          <Controls.Group className="flex w-full items-center px-2">
            <Sliders.Time thumbnails={thumbnails} />
          </Controls.Group>
          <Controls.Group className="-mt-0.5 flex w-full items-center px-2 pb-2">
            <Buttons.SeekBackward
              tooltipAlign="start"
              tooltipOffset={popupOffset}
            />
            <Buttons.Play tooltipOffset={popupOffset} />
            <Buttons.SeekForward tooltipOffset={popupOffset} />
            <Buttons.Mute tooltipOffset={popupOffset} />
            <Sliders.Volume />
            <TimeGroup />
            <div className="flex-1" />
            <Buttons.PIP tooltipOffset={popupOffset} />
            {downloadUrl && (
              <Buttons.DownloadButton
                tooltipOffset={popupOffset}
                downloadUrl={downloadUrl}
              />
            )}
            <Menus.ElementsMenu
              offset={popupOffset}
              tooltipOffset={popupOffset}
            />
            <Buttons.Fullscreen
              tooltipAlign="end"
              tooltipOffset={popupOffset}
            />
          </Controls.Group>
        </Tooltip.Provider>
      </Controls.Root>
    </>
  );
}

function Gestures() {
  const isPlaying = useMediaState("playing");
  const isLoaded = useMediaState("canLoad");
  const isControlsVisible = useMediaState("controlsVisible");
  return (
    <>
      {(isPlaying || !isControlsVisible) && (
        <Gesture
          className="absolute left-0 top-0 z-30 block h-full w-full"
          event="pointerup"
          action="toggle:controls"
        />
      )}
      {isPlaying && (
        <Gesture
          className="absolute left-[33.33%] top-0 z-40 block h-full w-1/3"
          event="pointerup"
          action="pause"
        />
      )}
      {!isPlaying && isLoaded && (
        <Gesture
          className="absolute left-[calc(50%-1.5rem)] z-10 block aspect-square w-fit rounded-full border-[3px] bg-media-brand p-1 text-black"
          event="pointerup"
          action="play"
        >
          <PlayIcon className="h-10" />
        </Gesture>
      )}
      <Gesture
        className="absolute left-0 right-0 top-0 z-0 block h-full w-full"
        event="dblpointerup"
        action="toggle:fullscreen"
      />
      <Gesture
        className="absolute left-0 top-0 z-10 block h-full w-1/3"
        event="dblpointerup"
        action="seek:-10"
      />
      <Gesture
        className="absolute right-0 top-0 z-10 block h-full w-1/3"
        event="dblpointerup"
        action="seek:10"
      />
    </>
  );
}
