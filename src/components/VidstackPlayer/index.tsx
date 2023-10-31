"use client";
import "@vidstack/react/player/styles/base.css";

import { useRef } from "react";

import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Track,
  // type MediaCanPlayDetail,
  // type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  // type MediaProviderChangeEvent,
} from "@vidstack/react";

import { VideoLayout } from "./video-layout";
// import { textTracks } from "./tracks";

export default function VidStackPlayer({
  urls,
  downloadUrl,
}: {
  urls: string[];
  downloadUrl?: string;
}) {
  const player = useRef<MediaPlayerInstance>(null);

  // useEffect(() => {
  //   // Subscribe to state updates.
  //   return player.current!.subscribe(({ paused, viewType }) => {
  //     // console.log('is paused?', '->', paused);
  //     // console.log('is audio view?', '->', state.viewType === 'audio');
  //   });
  // }, []);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    // nativeEvent: MediaProviderChangeEvent,
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  // function onCanPlay(
  //   detail: MediaCanPlayDetail,
  //   nativeEvent: MediaCanPlayEvent,
  // ) {
  //   console.log("can play", detail, nativeEvent);
  //   // ...
  // }

  return (
    <MediaPlayer
      className="aspect-video w-full overflow-hidden rounded-md font-sans text-white ring-media-focus data-[focus]:ring-4"
      // title="Sprite Fight"
      crossorigin
      src={urls[0]}
      onProviderChange={onProviderChange}
      // onCanPlay={onCanPlay}
      ref={player}
    >
      <MediaProvider>
        {/* <Poster
          className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
          src="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=1200"
          alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
        /> */}
        {urls.map((url, i) => (
          <source src={url} key={i} />
        ))}
        {/* {textTracks.map((track) => (
          <Track {...track} key={track.src} />
        ))} */}
      </MediaProvider>

      <VideoLayout downloadUrl={downloadUrl} />
    </MediaPlayer>
  );
}
