import { api } from "./api";

export async function getStatistics() {
  const users = await api.get("/users");

  const totalStudents = users.length;
  const paidCount = users.filter((u) => u.paid).length;
  const unpaidCount = totalStudents - paidCount;
  const income = paidCount * 500000;

  const groupsMap = {};
  users.forEach((u) => {
    if (!u.group) return;
    groupsMap[u.group] = (groupsMap[u.group] || 0) + 1;
  });
  const groupsBreakdown = Object.entries(groupsMap).map(([group, count]) => ({
    group,
    count,
  }));
  const groupsCount = groupsBreakdown.length;

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
    groupsBreakdown,
    paidPercent,
    unpaidPercent,
  };
}
