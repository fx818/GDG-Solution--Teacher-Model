// // app/page.jsx
// "use client";

// import { useState } from "react";
// import dynamic from "next/dynamic";

// // Dynamically import the 3D scene so it only loads on the client.
// const ClassroomScene = dynamic(
//   () => import("@/components/ClassroomScene"),
//   { ssr: false }
// );

// export default function HomePage() {
//   const [question, setQuestion] = useState("");
//   const [currentAction, setCurrentAction] = useState("Animation");

//   const handleAskQuestion = () => {
//     // Set a sample question – you can extend this to let the user input a custom question.
//     const newQuestion = "What is the capital of France?";
//     setQuestion(newQuestion);
//     setCurrentAction("Animation");
//     // After a delay (adjust the duration to match your speaking animation length), revert back to idle.
//     setTimeout(() => {
//       setQuestion("");
//     }, 5000);
//   };

//   return (
//     <div className="relative w-full h-screen bg-gray-100">
//       <ClassroomScene questionText={question} currentAction={currentAction} />
//       <div className="absolute bottom-5 w-full flex justify-center">
//         <button
//           onClick={handleAskQuestion}
//           className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 shadow-lg"
//         >
//           Ask a Question
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import the 3D scene so it only loads on the client.
const ClassroomScene = dynamic(() => import("@/components/ClassroomScene"), { ssr: false });

export default function HomePage() {
  // Lecture text that appears on the board
  const [lectureText, setLectureText] = useState("");
  // Teacher action for animations
  const [currentAction, setCurrentAction] = useState("Animation");
  // Teacher position and rotation for movement
  const [teacherPosition, setTeacherPosition] = useState([20, 0, 300]);
  const [teacherRotation, setTeacherRotation] = useState([0, Math.PI, 0]);
  // Demo lecture state
  const [demoRunning, setDemoRunning] = useState(false);

  // Dummy lecture lines to stream onto the board
  const lectureLines = [
    "Today we're going to learn about the basics of Artificial Intelligence.",
    "AI aims to create systems that simulate human intelligence.",
    "We achieve this using algorithms, particularly machine learning, which lets computers learn from data.",
    "Deep learning, a subset of AI, employs neural networks for complex tasks.",
    "It's about teaching computers to recognize patterns, solve problems, and understand language.",
    "This field is rooted in mathematics and data analysis.",
    "AI holds immense potential across industries, but we must consider its ethical implications.",
    "Thank you for your attention."
  ];
  

  // Refs for intervals and time tracking
  const lectureIndexRef = useRef(0);
  const lectureIntervalRef = useRef(null);
  const movementIntervalRef = useRef(null);
  const elapsedRef = useRef(0); // elapsed time in ms for movement cycle

  // Start the demo lecture
  const startDemoLecture = () => {
    setDemoRunning(true);
    setCurrentAction("Animation");
    setLectureText("");
    lectureIndexRef.current = 0;
    elapsedRef.current = 0;

    // Movement: use a 20-second cycle
    // Phase A (0-10 sec): turn left and move right; Phase B (10-20 sec): turn right and move left.
    movementIntervalRef.current = setInterval(() => {
      elapsedRef.current += 100;
      const t = elapsedRef.current % 20000; // cycle period = 20,000ms (20 sec)
      
      if (t < 10000) {
        // Phase A: Teacher will turn left and walk to the right
        if (t < 2000) {
          // 0-2000ms: Rotate from forward ([0, Math.PI, 0]) to left ([0, Math.PI/2, 0])
          const progress = t / 2000;
          const angle = Math.PI - progress * (Math.PI / 2); // from Math.PI to Math.PI/2
          setTeacherRotation([0, angle, 0]);
          setTeacherPosition([20, 0, 300]); // hold initial position during rotation
        } else if (t < 8000) {
          // 2000ms-8000ms: Walk phase: move from x = 20 to x = 100
          setTeacherRotation([0, Math.PI / 2, 0]); // face left
          const progress = (t - 2000) / 6000; // from 0 to 1
          const newX = 20 + progress * 80; // x from 20 to 100
          setTeacherPosition([newX, 0, 300]);
        } else {
          // 8000ms-10000ms: Rotate back to forward (Math.PI)
          const progress = (t - 8000) / 2000;
          const angle = (Math.PI / 2) + progress * (Math.PI / 2); // from Math.PI/2 to Math.PI
          setTeacherRotation([0, angle, 0]);
          setTeacherPosition([100, 0, 300]); // hold final walking position
        }
      } else {
        // Phase B: Teacher will turn right and walk to the left
        if (t < 12000) {
          // 10000-12000ms: Rotate from forward ([0, Math.PI, 0]) to right ([0, 3*Math.PI/2, 0])
          const progress = (t - 10000) / 2000;
          const angle = Math.PI + progress * (Math.PI / 2); // from Math.PI to 3*Math.PI/2
          setTeacherRotation([0, angle, 0]);
          setTeacherPosition([100, 0, 300]); // hold position during rotation
        } else if (t < 18000) {
          // 12000-18000ms: Walk phase: move from x = 100 to x = 20
          setTeacherRotation([0, (3 * Math.PI) / 2, 0]); // face right
          const progress = (t - 12000) / 6000; // from 0 to 1
          const newX = 100 - progress * 80; // x from 100 back to 20
          setTeacherPosition([newX, 0, 300]);
        } else {
          // 18000-20000ms: Rotate back to forward (Math.PI)
          const progress = (t - 18000) / 2000;
          const angle = (3 * Math.PI) / 2 - progress * (Math.PI / 2); // from 3*Math.PI/2 to Math.PI
          setTeacherRotation([0, angle, 0]);
          setTeacherPosition([20, 0, 300]); // reset to starting position
        }
      }
    }, 100);

    // Stream lecture text every 4000ms.
    lectureIntervalRef.current = setInterval(() => {
      if (lectureIndexRef.current < lectureLines.length) {
        setLectureText((prev) => prev + " " + lectureLines[lectureIndexRef.current]);
        lectureIndexRef.current++;
      } else {
        clearInterval(lectureIntervalRef.current);
      }
    }, 5500);
  };

  // Stop the demo lecture
  const stopDemoLecture = () => {
    setDemoRunning(false);
    setCurrentAction("Animation");
    setLectureText("");
    clearInterval(movementIntervalRef.current);
    clearInterval(lectureIntervalRef.current);
    elapsedRef.current = 0;
    setTeacherPosition([20, 0, 300]);
    setTeacherRotation([0, Math.PI, 0]);
  };

  return (
    <div className="relative w-full h-screen bg-gray-100">
      {/* Background audio for lecture */}
      {demoRunning && (
        <audio src="/audio/lecture_demo.mp3" autoPlay className="hidden" />
      )}
      <ClassroomScene
        questionText={lectureText}
        currentAction={currentAction}
        teacherPosition={teacherPosition}
        teacherRotation={teacherRotation}
      />
      <div className="absolute bottom-5 w-full flex justify-center">
        {demoRunning ? (
          <button
            onClick={stopDemoLecture}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 shadow-lg"
          >
            End Demo Lecture
          </button>
        ) : (
          <button
            onClick={startDemoLecture}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 shadow-lg"
          >
            Start a Demo Lecture
          </button>
        )}
      </div>
    </div>
  );
}
