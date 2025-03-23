"use client";

import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import { useInView } from "react-intersection-observer";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WhyUs from "@/components/WhyUs";
import Classrooms from "@/components/Classrooms";
import ChatSection from "@/components/ChatSection";
import VirtualClassSection from "@/components/TourSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] text-white overflow-hidden">
      <Navbar />
      <Hero/>
      <Features />
      <WhyUs />
      <Classrooms />
      <ChatSection />
      <VirtualClassSection/>
      <Footer/>
    </main>
  );
}