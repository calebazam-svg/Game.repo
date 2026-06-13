import { Club } from "@/types";

// Club roster. Higher loft = steeper launch and more height but less roll.
// powerFactor scales the base launch velocity from the power meter.
export const CLUBS: Club[] = [
  { id: "driver", name: "Driver", shortName: "DR", loft: 14, powerFactor: 1.6 },
  { id: "iron", name: "Iron", shortName: "IR", loft: 26, powerFactor: 1.2 },
  { id: "wedge", name: "Wedge", shortName: "WG", loft: 42, powerFactor: 0.85 },
  { id: "putter", name: "Putter", shortName: "PT", loft: 0, powerFactor: 0.45 },
];

export const DEFAULT_CLUB_ID = "iron";

export function getClub(id: string): Club {
  return CLUBS.find((c) => c.id === id) ?? CLUBS[1];
}
