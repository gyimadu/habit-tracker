import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Lexend } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"

const lexend = Lexend({
    subsets: ["latin"],
    variable: "--font-lexend",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
    <html lang="en">
      <body
        className={`${lexend.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
