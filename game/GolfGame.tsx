"use client";

import * as THREE from "three";
import { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { CourseConfig, CollectibleSpawn, HatStyle } from "@/types";
import { useGameStore } from "@/store/gameStore";
import { usePlayerStore } from "@/store/playerStore";
import { Terrain } from "./Terrain";
import { Decorations } from "./Decorations";
import { Ball } from "./Ball";
import { Golfer } from "./Golfer";
import { HoleFlag } from "./HoleFlag";
import { AimIndicator } from "./AimIndicator";
import { Collectibles } from "./Collectibles";
import { CameraRig } from "./CameraRig";

export function GolfGame({ course }: { course: CourseConfig }) {
  const ballPosRef = useRef(new THREE.Vector3());
  const aimOrigin = useRef(new THREE.Vector3());

  const holeIndex = useGameStore((s) => s.holeIndex);
  const shotState = useGameStore((s) => s.shotState);
  const aimAngle = useGameStore((s) => s.aimAngle);
  const completeHole = useGameStore((s) => s.completeHole);
  const pushToast = useGameStore((s) => s.pushToast);

  const customization = usePlayerStore((s) => s.customization);
  const addRewards = usePlayerStore((s) => s.addRewards);
  const recordHoleComplete = usePlayerStore((s) => s.recordHoleComplete);

  const hole = course.holes[holeIndex] ?? course.holes[0];

  // Place the aim origin at the tee when the hole changes.
  useEffect(() => {
    aimOrigin.current.set(...hole.tee);
    ballPosRef.current.set(...hole.tee);
  }, [hole.tee]);

  // Keep aim origin synced with where the ball rests.
  const onRest = useCallback((pos: THREE.Vector3) => {
    aimOrigin.current.copy(pos);
  }, []);

  const onCollect = useCallback(
    (kind: CollectibleSpawn["kind"]) => {
      if (kind === "coin") {
        addRewards({ coins: 25, xp: 5 });
        pushToast("+25 🪙", "reward");
      } else {
        addRewards({ coins: 50, xp: 20 });
        pushToast("Gem! +50 🪙 +20 XP", "reward");
      }
    },
    [addRewards, pushToast]
  );

  const onHoleComplete = useCallback(() => {
    const { strokes } = useGameStore.getState();
    const par = hole.par;
    const holeInOne = strokes === 1;

    let coins = 40;
    let xp = 50;

    // Performance bonus relative to par.
    const diff = par - strokes;
    if (diff > 0) {
      coins += diff * 20;
      xp += diff * 25;
    }
    if (holeInOne) {
      coins += 100;
      xp += 100;
    }

    addRewards({ coins, xp });
    recordHoleComplete({ holeInOne });
    pushToast(
      holeInOne
        ? `HOLE IN ONE! +${coins} 🪙`
        : `Hole complete! +${coins} 🪙 +${xp} XP`,
      "success"
    );
    completeHole();
  }, [hole.par, addRewards, recordHoleComplete, pushToast, completeHole]);

  const themeBg = useMemo(() => themeBackground(course.theme), [course.theme]);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 8, 22], fov: 55 }}
      gl={{ antialias: true }}
      style={{ background: themeBg }}
    >
      <fog attach="fog" args={[themeBg, 40, 90]} />
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[12, 18, 8]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={60}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <Sky
        distance={450000}
        sunPosition={[12, 18, 8]}
        turbidity={course.theme === "desert" ? 8 : 2}
        rayleigh={course.theme === "beach" ? 1 : 2}
      />
      {/* Soft fill light from below to lift shadows (replaces HDR env). */}
      <hemisphereLight args={[themeBg, course.groundColor, 0.5]} />

      <Terrain course={course} holePos={hole.hole} />
      <Decorations items={course.decorations} />
      <HoleFlag position={hole.hole} />

      {/* Golfer stands just behind the ball's resting point. */}
      <GolferAtBall ballPosRef={ballPosRef} customization={customization} />

      <AimIndicator
        origin={aimOrigin.current}
        angle={aimAngle}
        power={0}
        color={customization.trailColor}
        visible={shotState === "aiming"}
      />

      <Ball
        key={`${course.id}-${holeIndex}`}
        tee={hole.tee}
        holePos={hole.hole}
        skin={customization.ballSkin}
        trailColor={customization.trailColor}
        ballPosRef={ballPosRef}
        onRest={onRest}
        onHoleComplete={onHoleComplete}
      />

      <Collectibles
        items={hole.collectibles}
        ballPosRef={ballPosRef}
        onCollect={onCollect}
      />

      <CameraRig ballPosRef={ballPosRef} />
    </Canvas>
  );
}

function GolferAtBall({
  ballPosRef,
  customization,
}: {
  ballPosRef: React.MutableRefObject<THREE.Vector3>;
  customization: { shirtColor: string; hatStyle: HatStyle };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const aimAngle = useGameStore((s) => s.aimAngle);
  const shotState = useGameStore((s) => s.shotState);

  // Position the golfer beside the ball, facing the aim direction.
  // Updated via a ref callback each render is too costly; use a frame hook.
  useFollowBall(groupRef, ballPosRef, aimAngle);

  return (
    <group ref={groupRef} visible={shotState !== "rolling"}>
      <Golfer
        shirtColor={customization.shirtColor}
        hatStyle={customization.hatStyle}
      />
    </group>
  );
}

function useFollowBall(
  groupRef: React.RefObject<THREE.Group | null>,
  ballPosRef: React.MutableRefObject<THREE.Vector3>,
  aimAngle: number
) {
  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const bp = ballPosRef.current;
    // Stand to the side of the ball, perpendicular to the aim line.
    const sideX = Math.cos(aimAngle) * 0.9;
    const sideZ = Math.sin(aimAngle) * 0.9;
    g.position.set(bp.x + sideX, 0, bp.z + sideZ);
    g.rotation.y = aimAngle;
  });
}

function themeBackground(theme: CourseConfig["theme"]): string {
  switch (theme) {
    case "beach":
      return "#7dd3fc";
    case "desert":
      return "#fcd9a8";
    default:
      return "#9fd3ff";
  }
}
