import { CourseConfig, CourseId } from "@/types";
import { forestCourse } from "./forest";
import { beachCourse } from "./beach";
import { desertCourse } from "./desert";

export const COURSES: CourseConfig[] = [
  forestCourse,
  beachCourse,
  desertCourse,
];

export const COURSE_MAP: Record<CourseId, CourseConfig> = {
  forest: forestCourse,
  beach: beachCourse,
  desert: desertCourse,
};

export function getCourse(id: CourseId): CourseConfig {
  return COURSE_MAP[id] ?? forestCourse;
}

export function isCourseId(value: string | null): value is CourseId {
  return value === "forest" || value === "beach" || value === "desert";
}
