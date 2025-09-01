export default function useCalendar(startDate, endDate) {
  const days = [];
  const weeks = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    const weekDays = [];
    for (let d = 0; d < 7 && current <= end; d++) {
      const dow = current.getDay(); // 1..5 = LUN..VEN
      if (dow >= 1 && dow <= 5) {
        weekDays.push({
          key: current.toISOString(),
          label: current
            .toLocaleDateString("fr-FR", { weekday: "short" })
            .toUpperCase(),
          date: new Date(current),
        });
      }
      current.setDate(current.getDate() + 1);
    }

    if (weekDays.length > 0) {
      const firstDate = weekDays[0].date;
      const lastDate = weekDays[weekDays.length - 1].date;

      // Label long (29 août – 02 sept.)
      const longLabel = `${firstDate.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
      })} – ${lastDate.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
      })}`;

      // Label court (29–30)
      const shortLabel = `${firstDate.getDate()}–${lastDate.getDate()}`;

      weeks.push({
        label: weekDays.length <= 2 ? shortLabel : longLabel,
        span: weekDays.length,
      });
      days.push(...weekDays);
    }
  }

  return { days, weeks };
}
