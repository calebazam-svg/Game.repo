"use client";

import * as THREE from "three";
import { useMemo } from "react";

interface AimIndicatorProps {
  origin: THREE.Vector3;
  angle: number;
  power: number;
  color: string;
  visible: boolean;
}

/** A ground arrow showing aim direction; length scales with charged power. */
export function AimIndicator({
  origin,
  angle,
  power,
  color,
  visible,
}: AimIndicatorProps) {
  const length = 2 + power * 6;

  const dots = useMemo(() => Array.from({ length: 6 }), []);

  if (!visible) return null;

  return (
    <group position={[origin.x, 0.06, origin.z]} rotation={[0, angle, 0]}>
      {dots.map((_, i) => {
        const t = (i + 1) / dots.length;
        return (
          <mesh
            key={i}
            position={[0, 0, -t * length]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <circleGeometry args={[0.08 + t * 0.06, 12]} />
            <meshBasicMaterial color={color} transparent opacity={0.4 + t * 0.5} />
          </mesh>
        );
      })}
      {/* Arrowhead */}
      <mesh position={[0, 0.01, -length]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.28, 0.6, 3]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}
