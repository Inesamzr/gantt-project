import { Icon } from "@iconify/react";

function TaskRow({ task, totalDays, ganttStartDate, isOpen, toggleOpen }) {
  const start = new Date(task.start);
  const end = new Date(task.end);
  const ganttStart = new Date(ganttStartDate);
  const isSubtask = Array.isArray(task.parent) && task.parent.length > 0;
  const isSuptask = Array.isArray(task.children) && task.children.length > 0;

  const typeColors = {
    analyse: "var(--color-type-analyse)",
    conception: "var(--color-type-conception)",
    dev: "var(--color-type-dev)",
    revue: "var(--color-type-revue)",
    intégration: "var(--color-type-intégration)",
    test: "var(--color-type-test)",
    correctif: "var(--color-type-correctif)",
    recette: "var(--color-type-recette)",
    documentation: "var(--color-type-documentation)",
    formation: "var(--color-type-formation)",
    livraison: "var(--color-type-livraison)",
    maintenance: "var(--color-type-maintenance)",
  };

  const duration =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  function countWorkingDaysBetween(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let count = 0;

    while (start < end) {
      const day = start.getDay();
      if (day >= 1 && day <= 5) count++;
      start.setDate(start.getDate() + 1);
    }

    return count;
  }
  function getWorkingDays(startDate, totalDays) {
    const days = [];
    const current = new Date(startDate);

    while (days.length < totalDays) {
      const day = current.getDay();
      if (day >= 1 && day <= 5) {
        days.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }

    return days;
  }

  const workingDays = getWorkingDays(ganttStartDate, totalDays);

  return (
    <div className="flex">
      <div
        className="grid items-center mr-[4px]"
        style={{
          gridTemplateColumns: `40px 304px 150px 70px 80px`,
        }}
      >
        <div
          className={`h-8 flex items-center justify-center font-bold text-center ${
            isSubtask
              ? "text-primary-blue bg-white rounded-l-md"
              : "bg-primary-blue text-white rounded-l-md"
          }`}
          style={{ position: "sticky", left: 0, minWidth: "40px" }}
        >
          {task.id}
        </div>

        <div
          className={`h-8 bg-white flex items-center overflow-hidden truncate text-sm
    ${isSubtask ? "pl-10" : isSuptask ? "pl-2" : "px-2"}`}
        >
          {isSuptask && (
            <button onClick={() => toggleOpen(task.id)} className="mr-1">
              <Icon
                icon={isOpen ? "mdi:chevron-down" : "mdi:chevron-right"}
                className="text-primary-blue"
                width="16"
              />
            </button>
          )}

          {task.name}
        </div>

        <div className="h-8 bg-white flex items-center px-2 text-sm">
          {start.toLocaleDateString("fr-FR")}
        </div>

        <div className="h-8 bg-white flex items-center justify-center text-sm">
          {duration} j
        </div>

        <div className="h-8 bg-white flex items-center justify-center gap-2">
          <button title="Modifier">
            <Icon
              icon="mdi:pencil"
              width="20"
              className="text-primary-turquoise"
            />
          </button>
          <button title="Ajouter sous-tâche">
            <Icon
              icon="mdi:plus"
              width="20"
              className="text-primary-turquoise"
            />
          </button>
        </div>
      </div>

      <div
        className="relative grid gap-[4px]"
        style={{
          gridTemplateColumns: `repeat(${totalDays}, 40px)`,
        }}
      >
        {(() => {
          const offset = countWorkingDaysBetween(ganttStart, start);

          const endOffset = countWorkingDaysBetween(ganttStart, end);

          if (endOffset < 0 || offset > totalDays - 1) return null;

          const visibleOffset = Math.max(0, offset);
          const visibleDuration =
            Math.min(endOffset, totalDays - 1) - visibleOffset + 1;

          return (
            <div
              className="absolute h-5.5 top-[5px] flex items-center text-white text-xs font-semibold rounded-full px-2 overflow-hidden mx-[2px]"
              style={{
                left: `${visibleOffset * 44}px`,
                width: `${visibleDuration * 44 - 4 - 3}px`,
                backgroundColor:
                  typeColors[task.type] || "var(--color-primary-orange)",
                zIndex: 10,
              }}
              title={task.name}
            >
              <span className="truncate whitespace-nowrap">{task.name}</span>
            </div>
          );
        })()}

        {/* Fond du tableau */}
        {workingDays.map((day, i) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          day.setHours(0, 0, 0, 0);

          const isToday = day.getTime() === today.getTime();

          return (
            <div
              key={i}
              className={`h-8 ${
                isToday ? "bg-background-label" : "bg-white"
              } relative`}
            ></div>
          );
        })}
      </div>

      <div
        className="w-[80px] h-8 flex items-center justify-center ml-[4px] z-50 bg-white"
        style={{ position: "sticky", right: 0 }}
      >
        {task.status === "terminée" && (
          <div
            className="w-[40px] h-8 flex items-center justify-center"
            style={{ backgroundColor: "var(--status-bg-success)" }}
          >
            <Icon
              icon="el:ok-circle"
              className="text-[var(--status-primary-success)]"
              width="20"
            />
          </div>
        )}
        {task.status === "en cours" && (
          <div
            className="w-[40px] h-8 flex items-center justify-center"
            style={{ backgroundColor: "var(--status-bg-progress)" }}
          >
            <Icon
              icon="mdi:progress-check"
              className="text-[var(--status-primary-progress)]"
              width="24"
            />
          </div>
        )}
        {task.status === "à faire" && (
          <div
            className="w-[40px] h-8 flex items-center justify-center"
            style={{ backgroundColor: "var(--status-bg-todo)" }}
          >
            <Icon
              icon="tdesign:time"
              className="text-[var(--status-primary-todo)]"
              width="20"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskRow;
