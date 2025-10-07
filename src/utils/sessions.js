// src/utils/sessions.js

export const forexSessions = [
  { name: "Sydney", open: 22, close: 6 },
  { name: "Tokyo", open: 0, close: 9 },
  { name: "London", open: 8, close: 17 },
  { name: "New York", open: 13, close: 22 },
];

// Convert hours to India time (IST = UTC + 5.5)
export function getCurrentSessionStatus() {
  const now = new Date();
  const hourUTC = now.getUTCHours();
  const hourIST = (hourUTC + 5.5 + 24) % 24;

  const openSessions = forexSessions.filter((s) =>
    s.open < s.close
      ? hourIST >= s.open && hourIST < s.close
      : hourIST >= s.open || hourIST < s.close
  );

  const overlap = openSessions.length > 1;

  return {
    time: now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }),
    openSessions,
    overlap,
  };
}