"use client";

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import PdfViewer from '@/components/pdfView';

// Dynamically import the heavyweight components to ensure they load after initial render
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const Features = dynamic(() => import('@/components/Features'), { ssr: false });
const WhyUs = dynamic(() => import('@/components/WhyUs'), { ssr: false });
const Classrooms = dynamic(() => import('@/components/Classrooms'), { ssr: false });
const ChatSection = dynamic(() => import('@/components/ChatSection'), { ssr: false });
const VirtualClassSection = dynamic(() => import('@/components/TourSection'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

// Simple loading component
const SimpleLoading = () => (
  <div className="flex items-center justify-center h-screen bg-[#0a0a0a] text-white">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">AI Tutor</h1>
      <p className="text-xl">Loading amazing content...</p>
    </div>
  </div>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <SimpleLoading />;
  }

  return (
    <main className="bg-[#0a0a0a] text-white overflow-hidden">
      <Navbar />
      <Suspense fallback={<SimpleLoading />}>
        <Hero/>
        <Features />
        <WhyUs />
        <Classrooms />
        <ChatSection />
        <VirtualClassSection/>
        <Footer/>
        {/* <PdfViewer/> */}
      </Suspense>
    </main>
  );
}