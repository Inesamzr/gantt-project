import { Icon } from "@iconify/react";

const statusStyles = {
  "à faire": {
    bg: "bg-[var(--status-bg-todo)] text-[var(--status-primary-todo)]",
    dot: "bg-[var(--status-primary-todo)]",
  },
  "en cours": {
    bg: "bg-[var(--status-bg-progress)] text-[var(--status-primary-progress)]",
    dot: "bg-[var(--status-primary-progress)]",
  },
  terminée: {
    bg: "bg-[var(--status-bg-success)] text-[var(--status-primary-success)]",
    dot: "bg-[var(--status-primary-success)]",
  },
};

function TaskDetailsModal({ isOpen, onClose, task }) {
  if (!isOpen || !task) return null;

  const styleFor = (s) =>
    statusStyles[s] || {
      bg: "bg-gray-100 text-gray-600",
      dot: "bg-gray-400",
    };

  const renderStatus = (s) => (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-sm rounded-full ${
        styleFor(s).bg
      }`}
    >
      <span className={`w-2.5 h-2.5 rounded-full ${styleFor(s).dot}`} />
      {s}
    </span>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]">
      <div className="bg-white rounded-md shadow-lg w-[700px] relative">
        {/* Header coloré */}
        <div className="flex items-center justify-between px-6 py-3 bg-primary-blue text-white rounded-t-md">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Icon
              icon="mdi:information"
              width="22"
              className="text-primary-turquoise"
            />
            Détails de la tâche
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <Icon icon="akar-icons:cross" width="20" />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-6 space-y-5">
          {/* Section Infos principales */}
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

          {/* Section Dates */}
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

          {/* Section Statut */}
          <div>
            <h3 className="text-md font-semibold flex items-center gap-2 text-secondary-gray mb-2">
              <Icon icon="mdi:checkbox-marked-circle-outline" width="20" />
              Statut
            </h3>
            <div className="pl-7">{renderStatus(task.status)}</div>
          </div>

          {/* Section Description */}
          <div>
            <h3 className="text-md font-semibold flex items-center gap-2 text-secondary-gray mb-2">
              <Icon icon="mdi:text-long" width="20" />
              Description
            </h3>
            <p className="bg-gray-50 border rounded-md p-3 text-gray-700 whitespace-pre-line">
              {task.description || "Aucune description."}
            </p>
          </div>

          {/* Section Sous-tâches */}
          {task.children && task.children.length > 0 && (
            <div>
              <h3 className="text-md font-semibold flex items-center gap-2 text-secondary-gray mb-2">
                <Icon icon="mdi:subdirectory-arrow-right" width="20" />
                Sous-tâches
              </h3>
              <ul className="pl-7 space-y-1 list-disc">
                {task.children.map((child) => (
                  <li key={child.id}>
                    <span className="font-medium">{child.name}</span> –{" "}
                    {renderStatus(child.status)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bouton fermer */}
          <div className="flex justify-end pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-turquoise transition font-semibold flex items-center gap-2"
            >
              <Icon icon="mdi:close-circle" width="20" />
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;
