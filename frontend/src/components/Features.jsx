"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Brain, Target, Clock, Users, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-black to-purple-900/20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Revolutionary Features to Assist Teachers
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the power of AI-driven education with our cutting-edge features
            designed to enhance teacher efficiency and student engagement.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
        <Link href={"/test-generate"}>
          <FeatureCard
            icon={<Brain />}
            title="Test Generation"
            description="AI-powered system that helps analyse and generate tests on the basis of provided content."
            variants={itemVariants}
          />
        </Link>
        <Link href={"/quiz"}>
          <FeatureCard
            icon={<Target />}
            title="Quiz Generation and Tracking"
            description="AI-powered system that helps generate and track quizzes on the basis of provided content."
            variants={itemVariants}
          />
        </Link>
        <Link href={"/plague"}>
          <FeatureCard
            icon={<Clock />}
            title="Plagiarism Detection"
            description="AI-powered system that helps detect plagiarism in provided content."
            variants={itemVariants}
          />
        </Link>
        <Link href="/pdf-chat">
          <FeatureCard
            icon={<Users />}
            title="Chat with a pdf"
            description="Engage in dynamic learning sessions with real-time intractions with the uploaded pdf."
            variants={itemVariants}
          />
        </Link>
        <Link href="/url-chat">
          <FeatureCard
            icon={<Sparkles />}
            title="Chat with a url"
            description="Engage in dynamic learning sessions with real-time intractions with the uploaded url."
            variants={itemVariants}
          />
        </Link>
        <Link href="/doubt-engine">
          <FeatureCard
            icon={<BookOpen />}
            title="24/7 Doubt Engine"
            description="AI-powered system that helps provide instant answers to your doubts."
            variants={itemVariants}
          />
        </Link>
        </motion.div>
      </div>
    </section>
  );
}

const FeatureCard = ({ icon, title, description, variants }) => (
  <motion.div
    variants={variants}
    className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-colors"
  >
    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-500 mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);