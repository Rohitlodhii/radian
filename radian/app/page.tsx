import Features from "@/components/core/feature";
import Hero from "@/components/core/Hero";
import Language from "@/components/core/language";
import Navbar from "@/components/core/Navbar";
import VideoPlayer from "@/components/core/player";
import System from "@/components/core/system";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-[1400px] mx-auto w-full h-full border-l border-r border-primary/40 ">
      <Navbar/>
      <Hero/>
      <VideoPlayer/>
      <Language/>
      <Features/>
      <System/>
    </div>
  );
}
