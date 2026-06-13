"use client";

import { Decoration } from "@/types";

export function Decorations({ items }: { items: Decoration[] }) {
  return (
    <group>
      {items.map((d) => (
        <group
          key={d.id}
          position={d.position}
          rotation={[0, d.rotation ?? 0, 0]}
          scale={d.scale ?? 1}
        >
          <DecorationMesh kind={d.kind} />
        </group>
      ))}
    </group>
  );
}

function DecorationMesh({ kind }: { kind: Decoration["kind"] }) {
  switch (kind) {
    case "tree":
      return <Tree />;
    case "palm":
      return <Palm />;
    case "cactus":
      return <Cactus />;
    case "rock":
      return <Rock />;
    case "bush":
      return <Bush />;
    case "dune":
      return <Dune />;
    case "water":
      return <Water />;
    default:
      return null;
  }
}

function Tree() {
  return (
    <group>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.26, 1.4, 8]} />
        <meshStandardMaterial color="#7c4a1e" />
      </mesh>
      <mesh position={[0, 2, 0]} castShadow>
        <coneGeometry args={[1.1, 1.6, 9]} />
        <meshStandardMaterial color="#2f9e44" />
      </mesh>
      <mesh position={[0, 2.8, 0]} castShadow>
        <coneGeometry args={[0.8, 1.3, 9]} />
        <meshStandardMaterial color="#37b24d" />
      </mesh>
      <mesh position={[0, 3.5, 0]} castShadow>
        <coneGeometry args={[0.5, 1, 9]} />
        <meshStandardMaterial color="#40c057" />
      </mesh>
    </group>
  );
}

function Palm() {
  const fronds = Array.from({ length: 6 });
  return (
    <group>
      <mesh position={[0, 1.4, 0]} rotation={[0, 0, 0.08]} castShadow>
        <cylinderGeometry args={[0.14, 0.22, 2.8, 8]} />
        <meshStandardMaterial color="#a67c52" />
      </mesh>
      <group position={[0, 2.8, 0]}>
        {fronds.map((_, i) => (
          <mesh
            key={i}
            rotation={[0.5, (i / fronds.length) * Math.PI * 2, 0]}
            position={[0, 0, 0]}
            castShadow
          >
            <coneGeometry args={[0.22, 1.6, 4]} />
            <meshStandardMaterial color="#2f9e44" />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 2.75, 0]}>
        <sphereGeometry args={[0.24, 8, 8]} />
        <meshStandardMaterial color="#b08968" />
      </mesh>
    </group>
  );
}

function Cactus() {
  return (
    <group>
      <mesh position={[0, 1, 0]} castShadow>
        <capsuleGeometry args={[0.28, 1.6, 6, 12]} />
        <meshStandardMaterial color="#2b8a3e" />
      </mesh>
      <mesh position={[0.4, 1.2, 0]} rotation={[0, 0, -0.6]} castShadow>
        <capsuleGeometry args={[0.13, 0.7, 5, 10]} />
        <meshStandardMaterial color="#2f9e44" />
      </mesh>
      <mesh position={[-0.4, 0.9, 0]} rotation={[0, 0, 0.6]} castShadow>
        <capsuleGeometry args={[0.13, 0.6, 5, 10]} />
        <meshStandardMaterial color="#2f9e44" />
      </mesh>
    </group>
  );
}

function Rock() {
  return (
    <mesh position={[0, 0.45, 0]} castShadow>
      <dodecahedronGeometry args={[0.7, 0]} />
      <meshStandardMaterial color="#8d99ae" flatShading />
    </mesh>
  );
}

function Bush() {
  return (
    <group position={[0, 0.3, 0]}>
      <mesh castShadow>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#2f9e44" flatShading />
      </mesh>
      <mesh position={[0.35, 0.05, 0.1]} castShadow>
        <icosahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color="#37b24d" flatShading />
      </mesh>
      <mesh position={[-0.3, 0, 0.15]} castShadow>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#40c057" flatShading />
      </mesh>
    </group>
  );
}

function Dune() {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <sphereGeometry args={[3, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color="#e9b949" />
    </mesh>
  );
}

function Water() {
  return (
    <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[1, 32]} />
      <meshStandardMaterial
        color="#1d9bf0"
        transparent
        opacity={0.8}
        metalness={0.3}
        roughness={0.1}
      />
    </mesh>
  );
}
