// components/ClassroomScene.jsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Suspense } from "react";
import ClassroomModel from "./ClassroomModel";
import TeacherModel from "./TeacherModel";

export default function ClassroomScene({ questionText, currentAction , teacherPosition, teacherRotation}) {
  return (
    <Canvas camera={{ fov: 50, position: [5, 3, -95] }} className="w-full h-full">
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      <Suspense fallback={null}>
        <ClassroomModel />
        <TeacherModel actionName={currentAction} position={teacherPosition} rotation={teacherRotation} />
        {questionText && (
            <Text
              position={[0, 130, 65]} // Adjust this to match your board's placement
              rotation={[0, Math.PI, 0]}  // Rotate 180° on Y-axis so it faces the board
              fontSize={0.7}
              color="#FFFFFF"
              maxWidth={15}
              textAlign="center"
              anchorX="center"
              anchorY="center"
            >
              {questionText}
            </Text>
        )}
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={4}
        maxDistance={8}
        maxPolarAngle={Math.PI / 2}
        target={[0, 125, 45]} // Focus on the blackboard.
        enableDamping={true}
        dampingFactor={0.1}
      />
    </Canvas>
  );
}
