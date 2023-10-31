// import { useEffect, useState } from "react";

import * as Slider from "@radix-ui/react-slider";
import {
  // formatTime,
  // Thumbnail,
  TimeSlider,
  useMediaRemote,
  useMediaState,
  // useSliderPreview,
} from "@vidstack/react";

export function Volume() {
  const volume = useMediaState("volume"),
    canSetVolume = useMediaState("canSetVolume"),
    remote = useMediaRemote();

  if (!canSetVolume) return null;

  return (
    <Slider.Root
      className="group relative inline-flex h-10 w-full max-w-[80px] cursor-pointer touch-none select-none items-center outline-none"
      value={[volume * 100]}
      onValueChange={([value]: [number]) => {
        remote.changeVolume(value / 100);
      }}
    >
      <Slider.Track className="relative h-[5px] w-full rounded-sm bg-white/20">
        <Slider.Range className="absolute h-full rounded-sm bg-media-brand will-change-[width]" />
      </Slider.Track>
      <Slider.Thumb
        aria-label="Volume"
        className="block h-[15px] w-[15px] rounded-full border border-[#cacaca] bg-white opacity-0 outline-none ring-white/40 transition-opacity will-change-[left] focus:opacity-100 focus:ring-4 group-hocus:opacity-100"
      />
    </Slider.Root>
  );
}

export interface TimeSliderProps {
  thumbnails?: string;
}

// export function Time({ thumbnails }: TimeSliderProps) {
//   const time = useMediaState("currentTime"),
//     canSeek = useMediaState("canSeek"),
//     duration = useMediaState("duration"),
//     seeking = useMediaState("seeking"),
//     bufferEnd = useMediaState("bufferedEnd"),
//     remote = useMediaRemote(),
//     step = (1 / duration) * 100;
//   const [value, setValue] = useState(0);
//   const { previewRootRef, previewRef, previewValue } = useSliderPreview({
//       clamp: true,
//       offset: 6,
//       orientation: "horizontal",
//     }),
//     previewTime = (previewValue / 100) * duration;

//   const [buffered, setBuffered] = useState(0);

//   // Keep slider value in-sync with playback.
//   useEffect(() => {
//     if (seeking) return;
//     setValue((time / duration) * 100);
//   }, [time, duration, seeking]);

//   useEffect(() => {
//     setBuffered((bufferEnd / duration) * 100);
//   }, [bufferEnd, duration]);

//   return (
//     <>
//       <Slider.Root
//         className="group absolute inline-flex h-9 w-[calc(100%-1rem)] cursor-pointer touch-none select-none items-center outline-none"
//         value={[buffered]}
//         disabled
//         step={Number.isFinite(step) ? step : 1}
//       >
//         <Slider.Track className="relative h-[5px] w-full rounded-sm bg-white/10">
//           <Slider.Range className="absolute h-full rounded-sm bg-white/40 will-change-[width]" />
//         </Slider.Track>
//       </Slider.Root>
//       <Slider.Root
//         className="group relative inline-flex h-9 w-full cursor-pointer touch-none select-none items-center outline-none"
//         value={[value]}
//         disabled={!canSeek}
//         step={Number.isFinite(step) ? step : 1}
//         ref={previewRootRef}
//         onValueChange={([value]: [number]) => {
//           if (!value) return;
//           setValue(value);
//           remote.seeking((value / 100) * duration);
//         }}
//         onValueCommit={([value]: [number]) => {
//           if (!value) return;
//           remote.seek((value / 100) * duration);
//         }}
//       >
//         <Slider.Track className="relative h-[5px] w-full rounded-sm">
//           <Slider.Range className="absolute h-full rounded-sm bg-media-brand will-change-[width]" />
//         </Slider.Track>

//         <Slider.Thumb
//           aria-label="Current Time"
//           className="block h-[15px] w-[15px] rounded-full border border-[#cacaca] bg-white opacity-0 outline-none ring-white/40 transition-opacity will-change-[left] focus:opacity-100 focus:ring-4 group-hocus:opacity-100"
//         />

//         {/* Preview */}
//         <div
//           className="absolute flex flex-col items-center opacity-0 transition-opacity duration-200 will-change-[left] data-[visible]:opacity-100"
//           ref={previewRef}
//         >
//           {thumbnails ? (
//             <Thumbnail.Root
//               src={thumbnails}
//               time={previewTime}
//               className="mb-2 block h-[var(--thumbnail-height)] max-h-[160px] min-h-[80px] w-[var(--thumbnail-width)] min-w-[120px] max-w-[180px] overflow-hidden border border-white bg-black"
//             >
//               <Thumbnail.Img />
//             </Thumbnail.Root>
//           ) : null}
//           <span className="text-[13px]">{formatTime(previewTime)}</span>
//         </div>
//       </Slider.Root>
//     </>
//   );
// }

export function Time({ thumbnails }: TimeSliderProps) {
  return (
    <TimeSlider.Root className="time-slider group relative mx-[7.5px] inline-flex h-10 w-full cursor-pointer touch-none select-none items-center outline-none">
      <TimeSlider.Chapters className="relative flex h-full w-full items-center rounded-[1px]">
        {(cues, forwardRef) =>
          cues.map((cue) => (
            <div
              className="last-child:mr-0 relative mr-0.5 flex h-full w-full items-center rounded-[1px]"
              style={{ contain: "layout style" }}
              key={cue.startTime}
              ref={forwardRef}
            >
              <TimeSlider.Track className="relative z-0 h-[5px] w-full rounded-sm bg-white/30 ring-media-focus group-data-[focus]:ring-[3px]">
                <TimeSlider.TrackFill className="absolute h-full w-[var(--chapter-fill)] rounded-sm bg-media-brand will-change-[width]" />
                <TimeSlider.Progress className="absolute z-10 h-full w-[var(--chapter-progress)] rounded-sm bg-white/50 will-change-[width]" />
              </TimeSlider.Track>
            </div>
          ))
        }
      </TimeSlider.Chapters>

      <TimeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity will-change-[left] group-data-[active]:opacity-100 group-data-[dragging]:ring-4" />

      <TimeSlider.Preview className="flex flex-col items-center opacity-0 transition-opacity duration-200 data-[visible]:opacity-100">
        {thumbnails ? (
          <TimeSlider.Thumbnail.Root
            src={thumbnails}
            className="block h-[var(--thumbnail-height)] max-h-[160px] min-h-[80px] w-[var(--thumbnail-width)] min-w-[120px] max-w-[180px] overflow-hidden border border-white bg-black"
          >
            <TimeSlider.Thumbnail.Img />
          </TimeSlider.Thumbnail.Root>
        ) : null}

        <TimeSlider.ChapterTitle className="mt-2 text-sm" />

        <TimeSlider.Value className="text-[13px]" />
      </TimeSlider.Preview>
    </TimeSlider.Root>
  );
}
