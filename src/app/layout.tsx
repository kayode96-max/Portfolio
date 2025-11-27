import type { Metadata } from "next";
import { ThemeProvider } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio | Full Stack Developer",
  description: "A modern portfolio website showcasing my skills, projects, and experiences. Built with Next.js and synced with GitHub.",
  keywords: ["developer", "portfolio", "full stack", "web development", "react", "nextjs"],
  authors: [{ name: "Developer" }],
  openGraph: {
    title: "Portfolio | Full Stack Developer",
    description: "A modern portfolio website showcasing my skills, projects, and experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors font-sans"
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
