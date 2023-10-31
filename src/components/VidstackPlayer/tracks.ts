interface Track {
  src: string;
  label: string;
  kind: "subtitles" | "chapters";
  language: string;
  default?: boolean;
}
export const textTracks: Track[] = [
  // Subtitles
  // {
  //   src: "https://media-files.vidstack.io/sprite-fight/subs/english.vtt",
  //   label: "English",
  //   language: "en-US",
  //   kind: "subtitles",
  //   default: true,
  // },
  {
    src: "https://cc.2cdns.com/c3/8a/c38a03c614c4d51c4f35300622e1fc37/eng-3.vtt",
    label: "English",
    language: "en-US",
    kind: "subtitles",
    default: true,
  },
  // {
  //   src: "https://media-files.vidstack.io/sprite-fight/subs/spanish.vtt",
  //   label: "Spanish",
  //   language: "es-ES",
  //   kind: "subtitles",
  // },
  // // Chapters
  // {
  //   src: 'https://media-files.vidstack.io/sprite-fight/chapters.vtt',
  //   kind: 'chapters',
  //   language: 'en-US',
  //   default: true,
  // },
];
