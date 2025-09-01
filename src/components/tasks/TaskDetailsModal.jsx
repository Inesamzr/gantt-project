import { Icon } from "@iconify/react";
import {
  TaskInfoSection,
  TaskDatesSection,
  TaskStatusSection,
  TaskDescriptionSection,
  TaskChildrenSection,
  TaskDependenciesSection,
} from "./TaskDetailsSections";

function TaskDetailsModal({ isOpen, onClose, task, allTasks }) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]">
      <div className="bg-white rounded-md shadow-lg w-[700px] relative">
        {/* Header */}
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
          <TaskInfoSection task={task} />
          <TaskDatesSection task={task} />
          <TaskStatusSection task={task} />
          <TaskDescriptionSection task={task} />
          <TaskDependenciesSection task={task} allTasks={allTasks} />
          <TaskChildrenSection task={task} />

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
