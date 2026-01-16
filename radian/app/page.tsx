"use client"

import Features from "@/components/core/feature";
import Hero from "@/components/core/Hero";
import Language from "@/components/core/language";
import Navbar from "@/components/core/Navbar";
import FooterTwo from "@/components/core/newfooter";
import VideoPlayer from "@/components/core/player";
import System from "@/components/core/system";

export default function Home() {
  return (
    <div className="max-w-350 mx-auto w-full h-full border-l border-r border-primary/40 overflow-hidden ">
      <Navbar/>
      <Hero/>
     
      <Language/>
      <Features/>
      <System/>
      <FooterTwo/>
    </div>
  );
}
