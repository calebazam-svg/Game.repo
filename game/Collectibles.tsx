"use client";

import * as THREE from "three";
import { useRef, MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { CollectibleSpawn } from "@/types";
import { useGameStore } from "@/store/gameStore";

interface CollectiblesProps {
  items: CollectibleSpawn[];
  ballPosRef: MutableRefObject<THREE.Vector3>;
  onCollect: (kind: CollectibleSpawn["kind"]) => void;
}

const PICKUP_RADIUS = 1.2;

export function Collectibles({
  items,
  ballPosRef,
  onCollect,
}: CollectiblesProps) {
  const collected = useGameStore((s) => s.collected);
  const collect = useGameStore((s) => s.collect);

  return (
    <group>
      {items.map((item) =>
        collected[item.id] ? null : (
          <Collectible
            key={item.id}
            item={item}
            ballPosRef={ballPosRef}
            onPickup={() => {
              if (collect(item.id)) onCollect(item.kind);
            }}
          />
        )
      )}
    </group>
  );
}

function Collectible({
  item,
  ballPosRef,
  onPickup,
}: {
  item: CollectibleSpawn;
  ballPosRef: MutableRefObject<THREE.Vector3>;
  onPickup: () => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const pos = new THREE.Vector3(...item.position);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 2;
    ref.current.position.y =
      item.position[1] + Math.sin(performance.now() / 400) * 0.12;

    // Distance check against the ball (ignore vertical bob).
    const bp = ballPosRef.current;
    const dx = bp.x - item.position[0];
    const dz = bp.z - item.position[2];
    if (dx * dx + dz * dz < PICKUP_RADIUS * PICKUP_RADIUS) {
      onPickup();
    }
  });

  return (
    <group ref={ref} position={pos}>
      {item.kind === "coin" ? (
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.32, 0.32, 0.08, 20]} />
          <meshStandardMaterial
            color="#fcd34d"
            metalness={0.8}
            roughness={0.2}
            emissive="#a16207"
            emissiveIntensity={0.3}
          />
        </mesh>
      ) : (
        <mesh castShadow>
          <octahedronGeometry args={[0.34, 0]} />
          <meshStandardMaterial
            color="#22d3ee"
            metalness={0.5}
            roughness={0.1}
            emissive="#0891b2"
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </group>
  );
}
