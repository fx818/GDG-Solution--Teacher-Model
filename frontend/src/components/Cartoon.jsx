import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Center } from "@react-three/drei";

export default function Cartoon({ playAnimation, selectedAnimation, size = 2, ...props }) {
  const group = useRef();
  const { scene, animations } = useGLTF("/CartoonTeacher.glb");
  const { actions } = useAnimations(animations, scene);

  // Force the model's scale to match the desired size.
  useEffect(() => {
    if (scene) {
      scene.scale.set(size, size, size);
    }
  }, [scene, size]);

  useEffect(() => {
    if (playAnimation && animations && animations.length > 0) {
      const animName = selectedAnimation || animations[0].name;
      if (actions[animName]) {
        actions[animName].reset().play();
      }
    } else if (animations) {
      animations.forEach((anim) => {
        if (actions[anim.name]) {
          actions[anim.name].stop();
        }
      });
    }
  }, [playAnimation, selectedAnimation, actions, animations]);

  return <primitive object={scene} {...props} />;
}
