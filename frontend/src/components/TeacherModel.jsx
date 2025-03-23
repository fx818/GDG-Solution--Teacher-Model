// components/TeacherModel.jsx
"use client";

import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";

export default function TeacherModel({ actionName, ...props }) {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/teacher.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions || !actionName) return;
    // Stop any currently playing actions.
    console.log("Available actions:", Object.keys(actions));
    Object.values(actions).forEach((action) => action.stop());
    const newAction = actions[actionName];
    if (newAction) {
      newAction.reset().fadeIn(0.2).play();
    }
  }, [actionName, actions]);

  return (
    <primitive
    ref={group}
    object={scene}
    scale={[75, 75, 75]}
    position={props.position || [20, 0, 300]}
    rotation={props.rotation || [0, Math.PI, 0]}
    {...props}
  />
  );
}
