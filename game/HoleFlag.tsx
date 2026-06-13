"use client";

import { Vec3 } from "@/types";

export function HoleFlag({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      {/* Cup: a dark recessed disc */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.45, 24]} />
        <meshStandardMaterial color="#0b1120" />
      </mesh>
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.42, 0.5, 24]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>

      {/* Pole */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 2.8, 8]} />
        <meshStandardMaterial color="#f1f5f9" />
      </mesh>

      {/* Flag */}
      <mesh position={[0.42, 2.45, 0]} castShadow>
        <planeGeometry args={[0.8, 0.5]} />
        <meshStandardMaterial color="#ef4444" side={2} />
      </mesh>
    </group>
  );
}
