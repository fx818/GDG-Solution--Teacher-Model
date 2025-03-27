"use client";

import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import { ArrowRight, Brain, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden">
      <Parallax
        blur={0}
        bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
        strength={200}
        className="min-h-screen"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        
        <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
            >
              <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-purple-400">The Future of Education is Here</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            >
              Transform Learning with AI-Powered Education
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-300 mb-12"
            >
              Experience personalized learning like never before with our advanced AI tutoring system.
              Get instant feedback, adaptive lessons, and 24/7 support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-600 text-white px-8 py-4 rounded-full flex items-center space-x-2 hover:bg-purple-700 transition-colors"
                >
                  <span>Student DashBoard</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link href="#features">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/20 transition-colors"
              >
                Teacher Assistant
              </motion.button>
              </Link>
            </motion.div> 
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <Stat number="50k+" label="Active Students" />
            <Stat number="95%" label="Success Rate" />
            <Stat number="24/7" label="AI Support" />
            <Stat number="100+" label="Subjects" />
          </motion.div>
        </div>
      </Parallax>
    </section>
  );
}

const Stat = ({ number, label }) => (
  <div>
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="text-3xl md:text-4xl font-bold text-purple-400 mb-2"
    >
      {number}
    </motion.div>
    <div className="text-gray-400">{label}</div>
  </div>
);