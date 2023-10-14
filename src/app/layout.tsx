import "@/styles/globals.css";
// Next
import type { Metadata } from "next";

// Providers
import { TRPCProvider } from "@/providers/TRPCProvider";

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
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
