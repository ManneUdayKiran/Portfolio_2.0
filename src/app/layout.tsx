import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SmoothScroll from "@/components/smooth-scroll";

export const metadata: Metadata = {
  title: "Uday Kiran | Full Stack Developer & Creative Coder",
  description:
    "Portfolio of Uday Kiran - Full Stack Developer specializing in high-performance web applications, modern UI/UX, and creative engineering.",
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
