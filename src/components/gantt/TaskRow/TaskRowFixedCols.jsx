import { Icon } from "@iconify/react";
import { COLS } from "../../../config/columns";

function TaskRowFixedCols({
  task,
  rowNumber,
  start,
  duration,
  level,
  hasChildren,
  isOpen,
  toggleOpen,
  onViewDetails,
  onEdit,
  onAddChild,
}) {
  return (
    <div
      className="grid items-center mr-[4px]"
      style={{
        gridTemplateColumns: `${COLS.id}px ${COLS.name}px ${COLS.assignee}px ${COLS.start}px ${COLS.duration}px ${COLS.actions}px`,
      }}
    >
      {/* ID */}
      <div className="h-8 flex items-center justify-center font-bold bg-primary-blue text-white rounded-l-md">
        {rowNumber}
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

      {/* Assignée */}
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
          <Icon icon="mdi:eye" width="20" className="text-primary-turquoise" />
        </button>
        <button title="Modifier" onClick={() => onEdit(task)}>
          <Icon
            icon="mdi:pencil"
            width="20"
            className="text-primary-turquoise"
          />
        </button>
        <button title="Ajouter sous-tâche" onClick={() => onAddChild(task)}>
          <Icon icon="mdi:plus" width="22" className="text-primary-turquoise" />
        </button>
      </div>
    </div>
  );
}

export default TaskRowFixedCols;
