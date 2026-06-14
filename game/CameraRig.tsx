"use client";

import * as THREE from "three";
import { useRef, type ComponentRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface CameraRigProps {
  ballPosRef: MutableRefObject<THREE.Vector3>;
}

/**
 * Third-person orbit camera. The orbit target smoothly follows the ball,
 * while the user retains full orbit/zoom control.
 */
export function CameraRig({ ballPosRef }: CameraRigProps) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);

  useFrame(() => {
    if (!controls.current) return;
    const target = controls.current.target as THREE.Vector3;
    // Ease the orbit target toward the ball position.
    target.lerp(
      new THREE.Vector3(
        ballPosRef.current.x,
        ballPosRef.current.y + 0.5,
        ballPosRef.current.z
      ),
      0.08
    );
    controls.current.update();
  });

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      minDistance={4}
      maxDistance={22}
      minPolarAngle={0.2}
      maxPolarAngle={Math.PI / 2 - 0.05}
      enableDamping
      dampingFactor={0.1}
    />
  );
}
