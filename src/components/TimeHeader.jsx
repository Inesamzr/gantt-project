import { Icon } from "@iconify/react";
import { COLS, LEFT_WIDTH } from "../config/columns";
import useCalendar from "../hooks/useCalendar";

function TimeHeader({ startDate, endDate, onAddClick }) {
  const { days, weeks } = useCalendar(startDate, endDate);

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

        {/* En-tête des colonnes fixes */}
        <div
          className="flex items-center justify-between row-span-2 bg-primary-blue text-white font-semibold rounded-t-xl"
          style={{
            display: "grid",
            gridTemplateColumns: `${COLS.name}px ${COLS.assignee}px ${COLS.start}px ${COLS.duration}px ${COLS.actions}px`,
            gap: "4px",
          }}
        >
          <div className="h-8 flex items-center px-2">Nom</div>
          <div className="h-8 flex items-center">Assignée à</div>
          <div className="h-8 flex items-center">Date début</div>
          <div className="h-8 flex items-center">Durée</div>
          <div className="h-8 flex items-center justify-center pr-4">
            <button
              onClick={onAddClick}
              className="w-7 h-7 rounded-full bg-white text-primary-blue flex items-center justify-center"
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
            className="h-8 flex items-center justify-center bg-primary-blue text-white rounded-t-xl font-bold px-1 truncate"
            style={{ gridColumn: `span ${week.span}` }}
            title={week.label}
          >
            {week.label}
          </div>
        ))}

        {/* Jours */}
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
