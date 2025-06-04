import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
    <html lang="en" className={poppins.variable}>
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
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
