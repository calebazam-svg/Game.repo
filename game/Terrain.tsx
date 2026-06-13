"use client";

import { CourseConfig, Vec3 } from "@/types";

interface TerrainProps {
  course: CourseConfig;
  holePos: Vec3;
}

export function Terrain({ course, holePos }: TerrainProps) {
  return (
    <group>
      {/* Base ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color={course.groundColor} />
      </mesh>

      {/* Fairway runway down the middle */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, -5]}
        receiveShadow
      >
        <planeGeometry args={[14, 50]} />
        <meshStandardMaterial color={lighten(course.groundColor)} />
      </mesh>

      {/* Putting green around the hole */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[holePos[0], 0.02, holePos[2]]}
        receiveShadow
      >
        <circleGeometry args={[4, 32]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>
    </group>
  );
}

// Quick perceptual lighten of a hex color for the fairway accent.
function lighten(hex: string): string {
  const c = hex.replace("#", "");
  const n = parseInt(
    c.length === 3
      ? c
          .split("")
          .map((x) => x + x)
          .join("")
      : c,
    16
  );
  const r = Math.min(255, ((n >> 16) & 255) + 28);
  const g = Math.min(255, ((n >> 8) & 255) + 28);
  const b = Math.min(255, (n & 255) + 20);
  return `rgb(${r}, ${g}, ${b})`;
}
