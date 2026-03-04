import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
import Navbar from "@/components/Navbar";
import LightRays from "@/components/LightRays";
import PostHogProvider from './PostHogProvider'
import connectToDatabase from '@/lib/mongodb';

const connection = await connectToDatabase();

const SchibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted_grotesk",
=======
import Navbar from "@/components/Navbar";
import LightRays from "@/components/LightRays";
import PostHogProvider from './PostHogProvider'

const SchibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted_grotesk",

  subsets: ["latin"],
});

const MartianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevEvent",
  description: "The Hub for Every Dev Event You Mustn't miss",
};

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${SchibstedGrotesk.variable} ${MartianMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PostHogProvider />
        <Navbar />
        <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
          <LightRays 
          raysOrigin="top-center-offset"
          raysColor="#5dfeca"
          raysSpeed={0.5}
          lightSpread={0.9}
          followMouse={true}
          mouseInfluence={0.02}
          noiseAmount={0.0}
          distortion={0.01}
          />
        </div>
        {children}</body>
    </html>
  );
}
