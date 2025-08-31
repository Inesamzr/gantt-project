import { Icon } from "@iconify/react";

function TaskRow({
  task,
  totalDays,
  rowNumber,
  ganttStartDate,
  openedTasks,
  toggleOpen,
  onEdit,
  onViewDetails,
  onAddChild,
  level = 0,
}) {
  const COLS = {
    id: 40,
    name: 300,
    assignee: 170,
    start: 150,
    duration: 70,
    actions: 83,
  };

  const isOpen = openedTasks.includes(task.id);
  const start = new Date(task.start);
  const end = new Date(task.end);
  const ganttStart = new Date(ganttStartDate);
  const hasChildren = task.children && task.children.length > 0;

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

  function countWorkingDaysBetween(sDate, eDate) {
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

  function getWorkingDays(sDate, total) {
    const out = [];
    const cur = new Date(sDate);
    while (out.length < total) {
      const day = cur.getDay();
      if (day >= 1 && day <= 5) out.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return out;
  }

  const workingDays = getWorkingDays(ganttStartDate, totalDays);

  return (
    <>
      <div className="flex">
        {/* Colonnes fixes */}
        <div
          className="grid items-center mr-[4px]"
          style={{
            gridTemplateColumns: `${COLS.id}px ${COLS.name}px ${COLS.assignee}px ${COLS.start}px ${COLS.duration}px ${COLS.actions}px`,
          }}
        >
          {/* # */}
          <div
            className="h-8 flex items-center justify-center font-bold text-center bg-primary-blue text-white rounded-l-md"
            style={{ position: "sticky", left: 0, minWidth: `${COLS.id}px` }}
          >
            <p>{rowNumber}</p>
          </div>

          {/* Nom */}
          <div
            className="h-8 bg-white flex items-center overflow-hidden truncate text-sm px-2"
            style={{ paddingLeft: `${level * 20 + 8}px` }}
            title={task.name}
          >
            {hasChildren && (
              <button onClick={() => toggleOpen(task.id)} className="mr-1">
                <Icon
                  icon={isOpen ? "mdi:chevron-down" : "mdi:chevron-right"}
                  className="text-primary-blue"
                  width="16"
                />
              </button>
            )}
            <span className="truncate">{task.name}</span>
          </div>

          {/* Assignée à */}
          <div className="h-8 bg-white flex items-center px-2 text-sm truncate">
            {task.assignedTo || "—"}
          </div>

          {/* Date début */}
          <div className="h-8 bg-white flex items-center px-2 text-sm">
            {start.toLocaleDateString("fr-FR")}
          </div>

          {/* Durée */}
          <div className="h-8 bg-white flex items-center justify-center text-sm">
            {duration} j
          </div>

          {/* Actions */}
          <div className="h-8 bg-white flex items-center justify-end gap-2">
            <button title="Voir détails" onClick={() => onViewDetails(task)}>
              <Icon
                icon="mdi:eye"
                width="20"
                className="text-primary-turquoise"
              />
            </button>
            <button title="Modifier" onClick={() => onEdit(task)}>
              <Icon
                icon="mdi:pencil"
                width="20"
                className="text-primary-turquoise"
              />
            </button>
            <button title="Ajouter sous-tâche" onClick={() => onAddChild(task)}>
              <Icon
                icon="mdi:plus"
                width="22"
                className="text-primary-turquoise"
              />
            </button>
          </div>
        </div>

        {/* Grille des jours */}
        <div
          className="relative grid gap-[4px]"
          style={{ gridTemplateColumns: `repeat(${totalDays}, 40px)` }}
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
                  left: `${visibleOffset * 44}px`, // 40px cell + 4px gap
                  width: `${visibleDuration * 44 - 7}px`,
                  backgroundColor:
                    typeColors[task.type] || "var(--color-primary-orange)",
                }}
                title={task.name}
              >
                <span className="truncate whitespace-nowrap">{task.name}</span>
              </div>
            );
          })()}

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
                }`}
              />
            );
          })}
        </div>

        {/* Badge statut à droite (inchangé) */}
        <div
          className="w-[80px] h-8 flex items-center justify-center ml-[4px] z-3 bg-white"
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

      {/* Enfants */}
      {hasChildren && isOpen && (
        <div className="flex flex-col gap-y-[4px]">
          {task.children.map((child, idx) => (
            <TaskRow
              key={child.id}
              task={child}
              rowNumber={`${rowNumber}.${idx + 1}`}
              totalDays={totalDays}
              ganttStartDate={ganttStartDate}
              openedTasks={openedTasks}
              toggleOpen={toggleOpen}
              onEdit={onEdit}
              onViewDetails={onViewDetails}
              onAddChild={onAddChild}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default TaskRow;
