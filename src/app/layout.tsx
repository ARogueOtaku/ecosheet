import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecosheet",
  description:
    "A personal economy app I create to help me track my Monthly cash and also learn NextJS App router and Server Actions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased md:w-3/4 lg:w-1/2 m-auto h-screen p-2 text-xs md:text-sm lg:text-base`}
      >
        {children}
      </body>
    </html>
  );
}
