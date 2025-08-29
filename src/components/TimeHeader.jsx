import { Icon } from "@iconify/react";

function TimeHeader({ startDate, numberOfWeeks }) {
  const days = [];
  const weeks = [];
  const current = new Date(startDate);

  for (let w = 0; w < numberOfWeeks; w++) {
    const weekDays = [];

    for (let d = 0; d < 7; d++) {
      const dayOfWeek = current.getDay(); // 1 = lundi, ..., 5 = vendredi
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
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
      const firstDate = weekDays[0].date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
      });
      const lastDate = weekDays[weekDays.length - 1].date.toLocaleDateString(
        "fr-FR",
        {
          day: "2-digit",
          month: "short",
        }
      );

      weeks.push({
        label: `${firstDate} – ${lastDate}`,
        span: weekDays.length,
      });

      days.push(...weekDays);
    }
  }

  return (
    <div className="mb-[4px]">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `40px 600px repeat(${days.length}, 40px)`,
          gap: "4px",
        }}
      >
        {/* Case vide pour colonne ID */}
        <div className="row-span-2 bg-transparent"></div>

        <div
          className="flex items-center justify-between row-span-2 bg-primary-blue text-white font-semibold rounded-t-xl"
          style={{
            display: "grid",
            gridTemplateColumns: `300px 150px 58px 80px`,
            gap: "4px",
          }}
        >
          <div className="h-8 flex-1 items-center px-2 leading-non">Nom</div>
          <div className="h-8 flex items-center px-2 leading-none">
            Date début
          </div>
          <div className="h-8 flex items-center px-2 leading-none">Durée</div>
          <div className="h-8 flex items-center justify-end pr-4">
            <button
              className="w-6 h-6 rounded-full bg-white text-primary-blue text-sm font-bold flex items-center justify-center"
              title="Ajouter une tâche"
            >
              <Icon icon="mdi:plus" width="20" />
            </button>
          </div>
        </div>

        {weeks.map((week, i) => (
          <div
            key={i}
            className="h-8 flex items-center justify-center bg-primary-blue text-white rounded-t-xl font-bold"
            style={{ gridColumn: `span ${week.span}` }}
          >
            {week.label}
          </div>
        ))}

        {days.map((day) => (
          <div
            key={day.key}
            className="h-10 flex items-center justify-center rounded bg-background-label text-secondary-gray font-semibold"
          >
            {day.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeHeader;
