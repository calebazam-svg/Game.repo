import * as THREE from "three";
import { Club } from "@/types";

// Tunable constants for the arcade-realistic ball physics.
export const PHYSICS = {
  gravity: 22, // m/s^2 (exaggerated for snappy arcs)
  ballRadius: 0.35,
  maxLaunchSpeed: 26, // m/s at full power with a 1.0 powerFactor
  groundFriction: 1.9, // velocity decay while rolling (per second)
  airDrag: 0.16, // light air resistance
  bounceDamping: 0.45, // velocity kept after a ground bounce
  rollThreshold: 0.35, // speed below which a rolling ball stops
  holeRadius: 0.9, // capture radius of the cup
  holeCaptureSpeed: 9, // max speed at which the ball can drop in
  worldBound: 30, // half-size of the playable square
} as const;

/**
 * Compute the initial launch velocity for a shot.
 * @param power 0..1 from the power meter
 * @param aimAngle radians around the Y axis (0 = -Z forward)
 * @param club selected club controlling loft + power
 */
export function computeLaunchVelocity(
  power: number,
  aimAngle: number,
  club: Club
): THREE.Vector3 {
  const speed = power * club.powerFactor * PHYSICS.maxLaunchSpeed;
  const loftRad = THREE.MathUtils.degToRad(club.loft);

  const horizontal = speed * Math.cos(loftRad);
  const vertical = speed * Math.sin(loftRad);

  // Forward is -Z. aimAngle rotates around Y.
  const dirX = Math.sin(aimAngle);
  const dirZ = -Math.cos(aimAngle);

  return new THREE.Vector3(
    dirX * horizontal,
    Math.max(vertical, club.loft === 0 ? 0 : vertical),
    dirZ * horizontal
  );
}

/** Flat-ground sampling. Returns the terrain height at a world XZ. */
export function terrainHeight(_x: number, _z: number): number {
  // Phase 1 keeps a flat green; the hook exists for future undulating terrain.
  return 0;
}
