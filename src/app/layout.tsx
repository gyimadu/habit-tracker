import type { Metadata } from "next";
import "./globals.css";
import { Lexend } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"

const lexend = Lexend({
    subsets: ["latin"],
    variable: "--font-lexend",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
    display: "swap",
    preload: true,
    fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "My Habit Tracker",
  description: "habits.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lexend.variable}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${lexend.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
