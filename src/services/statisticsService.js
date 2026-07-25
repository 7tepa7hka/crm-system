import { api } from "./api";

export async function getStatistics() {
  const users = await api.get("/users");

  const totalStudents = users.length;
  const paidCount = users.filter((u) => u.paid).length;
  const unpaidCount = totalStudents - paidCount;
  const income = paidCount * 500000;

  const groups = new Set(users.map((u) => u.group).filter(Boolean));
  const groupsCount = groups.size;

  const paidPercent = totalStudents
    ? Math.round((paidCount / totalStudents) * 100)
    : 0;
  const unpaidPercent = totalStudents
    ? Math.round((unpaidCount / totalStudents) * 100)
    : 0;

  return {
    totalStudents,
    paidCount,
    unpaidCount,
    income,
    groupsCount,
    paidPercent,
    unpaidPercent,
  };
}
