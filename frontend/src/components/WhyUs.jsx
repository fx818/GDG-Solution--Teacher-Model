"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle } from "lucide-react";

export default function WhyUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="flex justify-center items-center py-20 bg-black px-4 md:px-20">
      {/* Outer wrapper with animated border */}
      <div className="relative inline-block p-[0.85px]">
        {/* Animated border overlay */}
        <div className="absolute inset-0 rounded-2xl p-[2px] animate-border pointer-events-none" />
        {/* Actual content container */}
        <div className="relative bg-black rounded-2xl p-4">
          <section id="why-us" className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent" />

            <div className="container mx-auto px-4 relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                    Why Choose Our AI Tutor?
                  </h2>
                  <p className="text-lg text-gray-400 mb-8">
                    We combine cutting-edge AI technology with proven educational
                    methods to deliver an unmatched learning experience.
                  </p>

                  <div className="space-y-6">
                    <BenefitItem>
                      Advanced AI algorithms that understand your unique learning style
                    </BenefitItem>
                    <BenefitItem>
                      Personalized feedback and progress tracking in real-time
                    </BenefitItem>
                    <BenefitItem>
                      Flexible learning schedule that fits your lifestyle
                    </BenefitItem>
                    <BenefitItem>
                      Comprehensive subject coverage with expert-verified content
                    </BenefitItem>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 transition-colors"
                  >
                    Start Your Journey
                  </motion.button>
                </motion.div>

                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
                      alt="Students learning"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold">Success Rate</h3>
                        <p className="text-gray-400 text-sm">95% student satisfaction</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Custom CSS for animated border */}
      <style jsx>{`
        @keyframes borderAnimation {
          0% {
            background-position: 0% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-border {
          background: linear-gradient(
            90deg,
            transparent,
            #ffffff,
            transparent
          );
          background-size: 200% auto;
          animation: borderAnimation 4s linear infinite;
        }
      `}</style>
    </div>
  );
}

const BenefitItem = ({ children }) => (
  <div className="flex items-center space-x-3">
    <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0" />
    <span className="text-gray-300">{children}</span>
  </div>
);
