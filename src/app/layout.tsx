import "@/styles/globals.css";
// Next
import { headers } from "next/headers";
import type { Metadata } from "next";

// Providers
import { TRPCReactProvider } from "@/trpc/react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "My Anime",
  description: "My Anime is a site to watch anime.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className="min-h-screen w-full">
        <Providers>
          <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}
