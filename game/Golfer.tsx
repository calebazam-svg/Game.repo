"use client";

import { HatStyle } from "@/types";

interface GolferProps {
  shirtColor: string;
  hatStyle: HatStyle;
  /** Show the club in the golfer's hands. */
  holdingClub?: boolean;
}

const SKIN = "#e8b98c";
const PANTS = "#1e293b";
const HAT_COLOR = "#0f172a";

/** A small, friendly low-poly golfer. */
export function Golfer({
  shirtColor,
  hatStyle,
  holdingClub = true,
}: GolferProps) {
  return (
    <group>
      {/* Legs */}
      <mesh position={[-0.16, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 12]} />
        <meshStandardMaterial color={PANTS} />
      </mesh>
      <mesh position={[0.16, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 12]} />
        <meshStandardMaterial color={PANTS} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <capsuleGeometry args={[0.32, 0.5, 6, 16]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>

      {/* Arms */}
      <mesh
        position={[-0.34, 1.1, 0.12]}
        rotation={[0.2, 0, 0.5]}
        castShadow
      >
        <capsuleGeometry args={[0.09, 0.5, 4, 10]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>
      <mesh position={[0.34, 1.1, 0.12]} rotation={[0.2, 0, -0.5]} castShadow>
        <capsuleGeometry args={[0.09, 0.5, 4, 10]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.62, 0]} castShadow>
        <sphereGeometry args={[0.26, 20, 20]} />
        <meshStandardMaterial color={SKIN} />
      </mesh>

      <Hat style={hatStyle} />

      {holdingClub && (
        <group position={[0.42, 0.95, 0.32]} rotation={[0.35, 0, -0.25]}>
          {/* Shaft */}
          <mesh position={[0, -0.45, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 1.1, 8]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Head of club */}
          <mesh position={[0.05, -1, 0.05]} castShadow>
            <boxGeometry args={[0.18, 0.1, 0.08]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.2} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function Hat({ style }: { style: HatStyle }) {
  if (style === "none") return null;

  if (style === "visor") {
    return (
      <group position={[0, 1.78, 0]}>
        <mesh position={[0, 0, 0.18]} rotation={[0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.5, 0.04, 0.28]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>
        <mesh>
          <torusGeometry args={[0.27, 0.04, 8, 24]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>
      </group>
    );
  }

  if (style === "bucket") {
    return (
      <group position={[0, 1.8, 0]}>
        <mesh position={[0, 0.04, 0]} castShadow>
          <cylinderGeometry args={[0.27, 0.3, 0.22, 20]} />
          <meshStandardMaterial color={HAT_COLOR} />
        </mesh>
        <mesh position={[0, -0.06, 0]} castShadow>
          <cylinderGeometry args={[0.42, 0.42, 0.04, 24]} />
          <meshStandardMaterial color={HAT_COLOR} />
        </mesh>
      </group>
    );
  }

  // cap
  return (
    <group position={[0, 1.8, 0]}>
      <mesh position={[0, 0.05, 0]} castShadow>
        <sphereGeometry args={[0.28, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={HAT_COLOR} />
      </mesh>
      <mesh position={[0, 0.02, 0.26]} rotation={[0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.32, 0.04, 0.22]} />
        <meshStandardMaterial color={HAT_COLOR} />
      </mesh>
    </group>
  );
}
