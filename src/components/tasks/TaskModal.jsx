import { Icon } from "@iconify/react";
import useTaskForm from "../../hooks/form/useTaskForm";
import TaskForm from "../form/TaskForm/TaskForm";
import DeleteConfirmation from "../common/DeleteConfirmation";

function TaskModal({ isOpen, onClose, onSave, task, parentTask }) {
  const form = useTaskForm(task, isOpen);

  if (!isOpen) return null;

  const handleDelete = () => {
    onSave({ ...task, _delete: true });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]">
      <div className="bg-white rounded-md shadow-lg w-[700px] relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-primary-blue text-white rounded-t-md">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Icon
              icon="mdi:plus"
              width="22"
              className="text-primary-turquoise"
            />
            {task
              ? "Modifier la tâche"
              : parentTask
              ? `Ajout d’une sous-tâche à "${parentTask.name}"`
              : "Ajout d’une tâche"}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <Icon icon="akar-icons:cross" width="20" />
          </button>
        </div>

        {form.confirmDelete ? (
          <DeleteConfirmation
            onCancel={() => form.setConfirmDelete(false)}
            onConfirm={handleDelete}
          />
        ) : (
          <TaskForm
            task={task}
            parentTask={parentTask}
            form={form}
            onClose={onClose}
            onSave={onSave}
          />
        )}
      </div>
    </div>
  );
}

export default TaskModal;
