import * as Tooltip from "@radix-ui/react-tooltip";
import {
  CaptionButton,
  FullscreenButton,
  isTrackCaptionKind,
  MuteButton,
  PIPButton,
  PlayButton,
  SeekButton,
  useMediaState,
} from "@vidstack/react";
import {
  DownloadIcon,
  SeekBackward10Icon,
  SeekForward10Icon,
} from "@vidstack/react/icons";
import {
  Minimize as FullscreenExitIcon,
  Maximize as FullscreenIcon,
  VolumeX as MuteIcon,
  PauseIcon,
  PictureInPictureIcon as PictureInPictureExitIcon,
  PictureInPicture2 as PictureInPictureIcon,
  PlayIcon,
  SubtitlesIcon,
  Volume2 as VolumeHighIcon,
  Volume1 as VolumeLowIcon,
} from "lucide-react";

export interface MediaButtonProps {
  tooltipSide?: Tooltip.TooltipContentProps["side"];
  tooltipAlign?: Tooltip.TooltipContentProps["align"];
  tooltipOffset?: number;
}

export const buttonClass =
  "group ring-media-focus relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 focus-visible:ring-4 aria-disabled:hidden";

export const tooltipClass =
  "animate-out fade-out slide-out-to-bottom-2 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in data-[state=delayed-open]:slide-in-from-bottom-4 z-10 rounded-sm bg-black/90 px-2 py-0.5 text-sm font-medium text-white parent-data-[open]:hidden";

export function Play({
  tooltipOffset = 0,
  tooltipSide = "top",
  tooltipAlign = "center",
}: MediaButtonProps) {
  const isPaused = useMediaState("paused");
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PlayButton className={buttonClass}>
          {isPaused ? (
            <PlayIcon className="h-7 w-7 translate-x-px" />
          ) : (
            <PauseIcon className="h-7 w-7" />
          )}
        </PlayButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={tooltipClass}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        {isPaused ? "Play" : "Pause"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Mute({
  tooltipOffset = 0,
  tooltipSide = "top",
  tooltipAlign = "center",
}: MediaButtonProps) {
  const volume = useMediaState("volume"),
    isMuted = useMediaState("muted");
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <MuteButton className={buttonClass}>
          {isMuted || volume == 0 ? (
            <MuteIcon className="h-7 w-7" />
          ) : volume < 0.5 ? (
            <VolumeLowIcon className="h-7 w-7" />
          ) : (
            <VolumeHighIcon className="h-7 w-7" />
          )}
        </MuteButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={tooltipClass}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        {isMuted ? "Unmute" : "Mute"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Caption({
  tooltipOffset = 0,
  tooltipSide = "top",
  tooltipAlign = "center",
}: MediaButtonProps) {
  const track = useMediaState("textTrack"),
    isOn = track && isTrackCaptionKind(track);
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <CaptionButton className={buttonClass}>
          <SubtitlesIcon
            className={`h-7 w-7 ${!isOn ? "text-white/60" : ""}`}
          />
        </CaptionButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={tooltipClass}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        {isOn ? "Closed-Captions Off" : "Closed-Captions On"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function PIP({
  tooltipOffset = 0,
  tooltipSide = "top",
  tooltipAlign = "center",
}: MediaButtonProps) {
  const isActive = useMediaState("pictureInPicture");
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PIPButton className={buttonClass}>
          {isActive ? (
            <PictureInPictureExitIcon className="h-7 w-7" />
          ) : (
            <PictureInPictureIcon className="h-7 w-7" />
          )}
        </PIPButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={tooltipClass}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        {isActive ? "Exit PIP" : "Enter PIP"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Fullscreen({
  tooltipOffset = 0,
  tooltipSide = "top",
  tooltipAlign = "center",
}: MediaButtonProps) {
  const isActive = useMediaState("fullscreen");
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <FullscreenButton className={buttonClass}>
          {isActive ? (
            <FullscreenExitIcon className="h-7 w-7" />
          ) : (
            <FullscreenIcon className="h-7 w-7" />
          )}
        </FullscreenButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={tooltipClass}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        {isActive ? "Exit Fullscreen" : "Enter Fullscreen"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function SeekForward({
  tooltipOffset = 0,
  tooltipSide = "top",
  tooltipAlign = "center",
}: MediaButtonProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <SeekButton className={buttonClass} seconds={10}>
          <SeekForward10Icon className="h-7 w-7" />
        </SeekButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={tooltipClass}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        Seek Forward 10s
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function SeekBackward({
  tooltipOffset = 0,
  tooltipSide = "top",
  tooltipAlign = "center",
}: MediaButtonProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <SeekButton className={buttonClass} seconds={-10}>
          <SeekBackward10Icon className="h-7 w-7" />
        </SeekButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={tooltipClass}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        Seek Backward 10s
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function DownloadButton({
  tooltipOffset = 0,
  tooltipSide = "top",
  tooltipAlign = "center",
  downloadUrl,
}: MediaButtonProps & { downloadUrl: string }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <a href={downloadUrl} target="_blank" className={buttonClass}>
          <DownloadIcon className="h-7 w-7" />
        </a>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={tooltipClass}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        Download
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
