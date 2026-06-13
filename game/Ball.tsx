"use client";

import * as THREE from "three";
import { useRef, useEffect, MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Trail } from "@react-three/drei";
import { Vec3 } from "@/types";
import { useGameStore } from "@/store/gameStore";
import { getClub } from "./clubs";
import { PHYSICS, computeLaunchVelocity, terrainHeight } from "./physics";

interface BallProps {
  tee: Vec3;
  holePos: Vec3;
  skin: string;
  trailColor: string;
  ballPosRef: MutableRefObject<THREE.Vector3>;
  onRest: (pos: THREE.Vector3) => void;
  onHoleComplete: () => void;
}

export function Ball({
  tee,
  holePos,
  skin,
  trailColor,
  ballPosRef,
  onRest,
  onHoleComplete,
}: BallProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const velocity = useRef(new THREE.Vector3());
  const position = useRef(new THREE.Vector3(...tee));
  const lastShotState = useRef<string>("aiming");
  const sinking = useRef(false);

  const shotState = useGameStore((s) => s.shotState);
  const setShotState = useGameStore((s) => s.setShotState);

  // Reset ball to tee whenever the hole (tee) changes.
  useEffect(() => {
    position.current.set(...tee);
    velocity.current.set(0, 0, 0);
    sinking.current = false;
    ballPosRef.current.copy(position.current);
    if (meshRef.current) meshRef.current.position.copy(position.current);
  }, [tee, ballPosRef]);

  useFrame((_, rawDelta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const delta = Math.min(rawDelta, 1 / 30); // clamp to avoid tunneling

    const store = useGameStore.getState();

    // Detect a newly launched shot.
    if (shotState === "rolling" && lastShotState.current !== "rolling") {
      const club = getClub(store.clubId);
      velocity.current.copy(
        computeLaunchVelocity(store.shotPower, store.aimAngle, club)
      );
    }
    lastShotState.current = shotState;

    if (sinking.current) {
      // Animate the ball dropping into the cup.
      position.current.lerp(
        new THREE.Vector3(holePos[0], -0.4, holePos[2]),
        Math.min(1, delta * 6)
      );
      mesh.position.copy(position.current);
      ballPosRef.current.copy(position.current);
      return;
    }

    if (shotState !== "rolling") {
      // Idle on the tee/lie.
      ballPosRef.current.copy(position.current);
      return;
    }

    // Integrate physics.
    const v = velocity.current;
    const p = position.current;
    const ground = terrainHeight(p.x, p.z) + PHYSICS.ballRadius;
    const airborne = p.y > ground + 0.01;

    if (airborne) {
      v.y -= PHYSICS.gravity * delta;
      v.x *= 1 - PHYSICS.airDrag * delta;
      v.z *= 1 - PHYSICS.airDrag * delta;
    } else {
      // Rolling: apply ground friction to the horizontal velocity.
      const friction = PHYSICS.groundFriction * delta;
      const horiz = Math.hypot(v.x, v.z);
      if (horiz > 0) {
        const newHoriz = Math.max(0, horiz - friction);
        const scale = newHoriz / horiz;
        v.x *= scale;
        v.z *= scale;
      }
    }

    p.addScaledVector(v, delta);

    // Ground collision / bounce.
    if (p.y < ground) {
      p.y = ground;
      if (v.y < 0) {
        v.y = -v.y * PHYSICS.bounceDamping;
        v.x *= 0.85;
        v.z *= 0.85;
        if (v.y < 1.5) v.y = 0; // settle small bounces
      }
    }

    // Keep ball within the playable bounds (soft walls).
    const b = PHYSICS.worldBound;
    if (Math.abs(p.x) > b) {
      p.x = THREE.MathUtils.clamp(p.x, -b, b);
      v.x *= -0.4;
    }
    if (Math.abs(p.z) > b) {
      p.z = THREE.MathUtils.clamp(p.z, -b, b);
      v.z *= -0.4;
    }

    // Hole detection.
    const dx = p.x - holePos[0];
    const dz = p.z - holePos[2];
    const distToHole = Math.hypot(dx, dz);
    const speed = v.length();
    if (
      distToHole < PHYSICS.holeRadius &&
      speed < PHYSICS.holeCaptureSpeed &&
      p.y <= ground + 0.05
    ) {
      sinking.current = true;
      mesh.position.copy(p);
      ballPosRef.current.copy(p);
      onHoleComplete();
      return;
    }

    // Resting check.
    const onGround = p.y <= ground + 0.02;
    if (onGround && speed < PHYSICS.rollThreshold) {
      v.set(0, 0, 0);
      p.y = ground;
      mesh.position.copy(p);
      ballPosRef.current.copy(p);
      setShotState("aiming");
      onRest(p.clone());
      return;
    }

    // Spin the ball roughly in the travel direction.
    mesh.position.copy(p);
    mesh.rotation.x += v.z * delta * 0.5;
    mesh.rotation.z -= v.x * delta * 0.5;
    ballPosRef.current.copy(p);
  });

  return (
    <Trail
      width={1.4}
      length={5}
      color={new THREE.Color(trailColor)}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef} castShadow position={tee}>
        <sphereGeometry args={[PHYSICS.ballRadius, 24, 24]} />
        <meshStandardMaterial
          color={skin}
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>
    </Trail>
  );
}
