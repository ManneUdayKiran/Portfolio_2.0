// "use client"
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./styles.css";
import { ThemeProvider } from "@/components/theme-provider";
import SmoothScroll from "@/components/smooth-scroll";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Developer Portfolio - Interactive 3D Experience",
  description:
    "An advanced developer portfolio featuring stunning 3D visuals and smooth animations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <SmoothScroll />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
