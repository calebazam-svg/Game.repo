"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Golfer } from "./Golfer";
import { HatStyle } from "@/types";

interface GolferPreviewProps {
  shirtColor: string;
  hatStyle: HatStyle;
  ballSkin: string;
}

export function GolferPreview({
  shirtColor,
  hatStyle,
  ballSkin,
}: GolferPreviewProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.4, 4], fov: 45 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} />
      <group position={[0, -0.9, 0]}>
        <Golfer shirtColor={shirtColor} hatStyle={hatStyle} />
        {/* Ball on the ground showing the chosen skin */}
        <mesh position={[0.7, 0.35, 0.6]}>
          <sphereGeometry args={[0.35, 24, 24]} />
          <meshStandardMaterial color={ballSkin} roughness={0.35} />
        </mesh>
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.4}
          scale={6}
          blur={2.2}
          far={3}
        />
      </group>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
