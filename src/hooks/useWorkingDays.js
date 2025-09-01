export default function useWorkingDays(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  let count = 0;

  while (startDate <= endDate) {
    const day = startDate.getDay();
    if (day >= 1 && day <= 5) count++;
    startDate.setDate(startDate.getDate() + 1);
  }

  return count;
}
