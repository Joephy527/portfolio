import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DynamicActionBar } from "@/components/nav/DynamicActionBar";
import { GridBackground } from "@/components/ui/GridBackground";
import { SideAccents } from "@/components/ui/SideAccents";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yoseph Ephrem Kifle | Software Engineer",
  description:
    "Portfolio of Yoseph Ephrem Kifle, a Software Engineer building production systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-bg transition-colors duration-300">
        <ThemeProvider>
          <GridBackground />
          <SideAccents />
          <div className="fixed top-5 right-5 md:right-8 z-50">
            <ThemeToggle />
          </div>
          {children}
          <DynamicActionBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
