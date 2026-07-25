import { api } from "./api";

export function getUsers() {
  return api.get("/users");
}

export function createUser(user) {
  return api.post("/users", user);
}

export function deleteUser(id) {
  return api.delete(`/users/${id}`);
}

export function updateUser(id, data) {
  return api.patch(`/users/${id}`, data);
}
