export function countWorkingDaysBetween(sDate, eDate) {
  const s = new Date(sDate);
  const e = new Date(eDate);
  let count = 0;
  while (s < e) {
    const day = s.getDay();
    if (day >= 1 && day <= 5) count++;
    s.setDate(s.getDate() + 1);
  }
  return count;
}

export function getWorkingDays(startDate, total) {
  const out = [];
  const cur = new Date(startDate);
  while (out.length < total) {
    const day = cur.getDay();
    if (day >= 1 && day <= 5) out.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}
