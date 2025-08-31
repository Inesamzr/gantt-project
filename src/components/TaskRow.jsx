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

  function countWorkingDaysBetween(startDate, endDate) {
    const s = new Date(startDate);
    const e = new Date(endDate);
    let count = 0;
    while (s < e) {
      const day = s.getDay();
      if (day >= 1 && day <= 5) count++;
      s.setDate(s.getDate() + 1);
    }
    return count;
  }

  function getWorkingDays(startDate, totalDays) {
    const days = [];
    const current = new Date(startDate);
    while (days.length < totalDays) {
      const day = current.getDay();
      if (day >= 1 && day <= 5) days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  }

  const workingDays = getWorkingDays(ganttStartDate, totalDays);

  return (
    <>
      {/* Ligne de la tâche */}
      <div className="flex">
        <div
          className="grid items-center mr-[4px]"
          style={{
            gridTemplateColumns: `40px 304px 150px 70px 80px`,
          }}
        >
          {/* Numéro de ligne */}
          <div
            className="h-8 flex items-center justify-center font-bold text-center bg-primary-blue text-white rounded-l-md"
            style={{ position: "sticky", left: 0, minWidth: "40px" }}
          >
            <p>{rowNumber}</p>
          </div>

          {/* Nom */}
          <div
            className={`h-8 bg-white flex items-center overflow-hidden truncate text-sm px-2`}
            style={{ paddingLeft: `${level * 20 + 8}px` }} // indentation enfants
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
            {task.name}
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
          <div className="h-8 bg-white flex items-center justify-center gap-2">
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
            <button
              title="Ajouter sous-tâche"
              onClick={() => onAddChild(task)} // ✅
            >
              <Icon
                icon="mdi:plus"
                width="20"
                className="text-primary-turquoise"
              />
            </button>
          </div>
        </div>

        {/* Barres dans le Gantt */}
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
                  zIndex: 2,
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
      </div>

      {/* Affichage récursif des enfants */}
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
              isOpen={isOpen}
              toggleOpen={toggleOpen}
              onEdit={onEdit}
              onViewDetails={onViewDetails}
              level={level + 1}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default TaskRow;
