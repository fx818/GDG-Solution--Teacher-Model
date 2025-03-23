// components/ClassroomModel.jsx
"use client";

import { useGLTF } from "@react-three/drei";

export default function ClassroomModel(props) {
  const gltf = useGLTF("/models/classroom.glb");
  return <primitive object={gltf.scene} {...props} />;
}
