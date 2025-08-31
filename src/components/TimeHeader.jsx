import { Icon } from "@iconify/react";

function TimeHeader({ startDate, endDate, onAddClick }) {
  const COLS = {
    id: 40,
    name: 300,
    assignee: 170,
    start: 150,
    duration: 70,
    actions: 80,
  };

  const LEFT_WIDTH =
    COLS.name + COLS.assignee + COLS.start + COLS.duration + COLS.actions;

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
      const firstDate = weekDays[0].date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
      });
      const lastDate = weekDays[weekDays.length - 1].date.toLocaleDateString(
        "fr-FR",
        { day: "2-digit", month: "short" }
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
          gridTemplateColumns: `40px ${LEFT_WIDTH}px repeat(${days.length}, 40px)`,
          gap: "4px",
        }}
      >
        {/* Colonne ID (vide, collée à gauche) */}
        <div className="row-span-2 bg-transparent" />

        {/* En-tête des colonnes fixes (Nom, Assignée à, Date début, Durée, +) */}
        <div
          className="flex items-center justify-between row-span-2 bg-primary-blue text-white font-semibold rounded-t-xl"
          style={{
            display: "grid",
            gridTemplateColumns: `${COLS.name}px ${COLS.assignee}px ${COLS.start}px ${COLS.duration}px ${COLS.actions}px`,
            gap: "4px",
          }}
        >
          <div className="h-8 flex items-center px-2 leading-non">Nom</div>
          <div className="h-8 flex items-center px-2 leading-non">
            Assignée à
          </div>
          <div className="h-8 flex items-center px-2 leading-non">
            Date début
          </div>
          <div className="h-8 flex items-center px-2 leading-non">Durée</div>
          <div className="h-8 flex items-center justify-center pr-4">
            <button
              onClick={onAddClick}
              className="w-7 h-7 rounded-full bg-white text-primary-blue text-sm font-bold flex items-center justify-center"
              title="Ajouter une tâche"
            >
              <Icon icon="mdi:plus" width="20" />
            </button>
          </div>
        </div>

        {/* Semaines */}
        {weeks.map((week, i) => (
          <div
            key={i}
            className="h-8 flex items-center justify-center bg-primary-blue text-white rounded-t-xl font-bold"
            style={{ gridColumn: `span ${week.span}` }}
          >
            {week.label}
          </div>
        ))}

        {/* Jours (LUN..VEN) */}
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
