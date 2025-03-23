"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { Center } from "@react-three/drei";
import Link from "next/link";
import Cartoon from "./Cartoon";

// TeacherModel component loads the .glb file and manages animations
function TeacherModel({ playAnimation, selectedAnimation ,size}) {
  // Load model and animations
  const { scene, animations } = useGLTF("/CartoonTeacher.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (playAnimation && animations && animations.length > 0) {
      // Use the provided animation or default to the first one in the file
      const animName = selectedAnimation || animations[0].name;
      if (actions[animName]) {
        actions[animName].reset().play();
      }
    } else if (animations) {
      // Stop all animations when not playing
      animations.forEach((anim) => {
        if (actions[anim.name]) {
          actions[anim.name].stop();
        }
      });
    }
  }, [playAnimation, selectedAnimation, actions, animations]);

  // Increase the size by setting a larger scale (adjust as needed)
  return <Center><primitive object={scene} scale={[size,size,size]} /></Center>
}

export default function VirtualClassSection() {
  const [playAnimation, setPlayAnimation] = useState(true);
  const [selectedAnimation, setSelectedAnimation] = useState("");

  const toggleAnimation = () => {
    setPlayAnimation((prev) => !prev);
  };

  return (
    <section className="py-20 bg-black ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Side: 3D Teacher Model with Animation Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-96 md:h-[500px] relative"
          >
            <Canvas>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={4} />
              <Cartoon
                playAnimation={playAnimation}
                selectedAnimation={selectedAnimation}
                size={3}
                position={[0, -1, 0]} 
              />
              <OrbitControls enableZoom={false} />
            </Canvas>
            
          </motion.div>

          {/* Right Side: Text & Button */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "cursive" }}
            >
              Have a sneak peek into our virtual classrooms
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Experience an immersive learning environment where education meets
              innovation.
            </p>
            <Link href="/virtual-class"><motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 transition-colors"
            >
              Begin the Journey
            </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
