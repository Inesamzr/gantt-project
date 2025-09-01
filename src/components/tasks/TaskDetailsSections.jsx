import { Icon } from "@iconify/react";
import StatusBadge from "../form/StatusSelect/StatusBadge";

export function TaskInfoSection({ task }) {
  return (
    <div>
      <h3 className="text-md font-semibold flex items-center gap-2 text-secondary-gray mb-2">
        <Icon icon="mdi:card-text-outline" width="20" />
        Infos principales
      </h3>
      <div className="space-y-1 pl-7">
        <p>
          <span className="font-semibold">ID :</span> {task.id}
        </p>
        <p>
          <span className="font-semibold">Nom :</span> {task.name}
        </p>
        <p>
          <span className="font-semibold">Assignée à :</span>{" "}
          {task.assignedTo || "—"}
        </p>
        <p>
          <span className="font-semibold">Type :</span>{" "}
          <span className="capitalize">{task.type}</span>
        </p>
      </div>
    </div>
  );
}

export function TaskDatesSection({ task }) {
  return (
    <div>
      <h3 className="text-md font-semibold flex items-center gap-2 text-secondary-gray mb-2">
        <Icon icon="mdi:calendar" width="20" />
        Dates
      </h3>
      <div className="space-y-1 pl-7 flex gap-6">
        <p>
          <span className="font-semibold">Début :</span>{" "}
          {new Date(task.start).toLocaleDateString("fr-FR")}
        </p>
        <p>
          <span className="font-semibold">Fin :</span>{" "}
          {new Date(task.end).toLocaleDateString("fr-FR")}
        </p>
      </div>
    </div>
  );
}

export function TaskStatusSection({ task }) {
  return (
    <div>
      <h3 className="text-md font-semibold flex items-center gap-2 text-secondary-gray mb-2">
        <Icon icon="mdi:checkbox-marked-circle-outline" width="20" />
        Statut
      </h3>
      <div className="pl-7">
        <StatusBadge status={task.status} />
      </div>
    </div>
  );
}

export function TaskDescriptionSection({ task }) {
  return (
    <div>
      <h3 className="text-md font-semibold flex items-center gap-2 text-secondary-gray mb-2">
        <Icon icon="mdi:text-long" width="20" />
        Description
      </h3>
      <p className="bg-gray-50 border rounded-md p-3 text-gray-700 whitespace-pre-line">
        {task.description || "Aucune description."}
      </p>
    </div>
  );
}

export function TaskChildrenSection({ task }) {
  if (!task.children || task.children.length === 0) return null;

  return (
    <div>
      <h3 className="text-md font-semibold flex items-center gap-2 text-secondary-gray mb-2">
        <Icon icon="mdi:subdirectory-arrow-right" width="20" />
        Sous-tâches
      </h3>
      <ul className="pl-7 space-y-1 list-disc">
        {task.children.map((child) => (
          <li key={child.id}>
            <span className="font-medium">{child.name}</span> –{" "}
            <StatusBadge status={child.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TaskDependenciesSection({ task, allTasks }) {
  if (!task.dependencies || task.dependencies.length === 0) return null;

  return (
    <div>
      <h3 className="text-md font-semibold flex items-center gap-2 text-secondary-gray mb-2">
        <Icon icon="mdi:link-variant" width="20" />
        Dépendances
      </h3>
      <ul className="pl-7 space-y-1 list-disc">
        {task.dependencies.map((depId) => {
          const depTask = allTasks?.find((t) => t.id === depId);
          return (
            <li key={depId}>
              {depTask ? (
                <>
                  <span className="font-medium">{depTask.name}</span> –{" "}
                  <StatusBadge status={depTask.status} />
                </>
              ) : (
                <span className="text-gray-500 italic">
                  Tâche #{depId} introuvable
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
