"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, BookOpen, Code, Calculator, Microscope } from "lucide-react";

export default function Classrooms() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="classrooms" className="py-20 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Explore Our Virtual Classrooms
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Dive into our specialized learning environments designed for different subjects
            and learning styles.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <ClassroomCard
            icon={<BookOpen />}
            title="Language Arts"
            description="Master reading, writing, and literature analysis"
            color="from-blue-600 to-purple-600"
          />
          <ClassroomCard
            icon={<Calculator />}
            title="Mathematics"
            description="From basic arithmetic to advanced calculus"
            color="from-purple-600 to-pink-600"
          />
          <ClassroomCard
            icon={<Code />}
            title="Computer Science"
            description="Learn programming and computational thinking"
            color="from-pink-600 to-red-600"
          />
          <ClassroomCard
            icon={<Microscope />}
            title="Sciences"
            description="Explore physics, chemistry, and biology"
            color="from-red-600 to-orange-600"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white px-8 py-4 rounded-full inline-flex items-center space-x-2 hover:bg-purple-700 transition-colors"
          >
            <span>View All Classrooms</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

const ClassroomCard = ({ icon, title, description, color }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group"
  >
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-6`}>
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-400 mb-6">{description}</p>
    <div className="flex items-center text-purple-400 group-hover:text-purple-300">
      <span>Learn more</span>
      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
    </div>
  </motion.div>
);