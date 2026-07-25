import { api } from "./api";

export function getLessons() {
  return api.get("/lessons");
}

export function getStudentsBySubject(subjectName) {
  return api.get(`/users?subject=${encodeURIComponent(subjectName)}`);
}
