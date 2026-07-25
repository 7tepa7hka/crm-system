import { api } from "./api";

export async function getDashboardStats() {
  const users = await api.get("/users");

  const totalUsers = users.length;
  const paidCount = users.filter((u) => u.paid).length;
  const income = paidCount * 500000;
  const newRegistrations = Math.min(totalUsers, 3);

  return {
    totalUsers,
    income,
    activeStudents: paidCount,
    newRegistrations,
  };
}
