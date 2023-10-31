import type { Config } from "tailwindcss";

import vidstack from "@vidstack/react/tailwind.cjs";
import tailwindScrollbar from "tailwind-scrollbar";
import {nextui} from "@nextui-org/react";

const config: Config = {darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "media-brand": "rgb(var(--media-brand) / <alpha-value>)",
        "media-focus": "rgb(var(--media-focus) / <alpha-value>)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    vidstack({
      prefix: "media",
    }),
    nextui(),
    tailwindScrollbar({ nocompatible: true }),
    customVariants,
  ],
};
4;

function customVariants({
  addVariant,
  matchVariant,
}: {
  addVariant: (name: string, variants: string[]) => void;
  matchVariant: (name: string, callback: (value: string) => string) => void;
}) {
  matchVariant("parent-data", (value: string) => `.parent[data-${value}] > &`);

  addVariant("hocus", ["&:hover", "&:focus-visible"]);
  addVariant("group-hocus", [".group:hover &", ".group:focus-visible &"]);
}

export default config;