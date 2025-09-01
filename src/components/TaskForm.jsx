import { Icon } from "@iconify/react";
import { persons, taskTypes } from "../data/tasks";
import StatusSelect from "./StatusSelect";
import CustomSelect from "./CustomSelect";

function TaskForm({ task, parentTask, form, onClose, onSave }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      id: task ? task.id : Date.now(),
      name: form.name,
      assignedTo: form.assignedTo,
      status: form.status,
      type: form.type,
      description: form.description,
      start: form.startDate,
      end: form.calculateEndDate(),
    };
    onSave(updatedTask);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-6">
      {/* Nom */}
      <div>
        <label className="block text-sm mb-1 font-bold">
          Nom<span className="text-primary-orange">*</span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => form.setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-blue"
          placeholder="Nom de la tâche"
          required
        />
      </div>

      {/* Assignation + État */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold mb-1">Assignation</label>
          <CustomSelect
            options={persons.map((p) => p.name)}
            allowEmpty
            emptyLabel="Vide"
            value={form.assignedTo}
            onChange={form.setAssignedTo}
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">
            État<span className="text-primary-orange">*</span>
          </label>
          <StatusSelect
            value={form.status}
            onChange={form.setStatus}
            defaultValue="à faire"
          />
        </div>
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-bold mb-1">Type de tâche</label>
        <CustomSelect
          options={taskTypes.map((t) => t.charAt(0).toUpperCase() + t.slice(1))}
          allowEmpty
          emptyLabel="Vide"
          value={form.type}
          onChange={form.setType}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-bold mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => form.setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-blue"
          rows="3"
        />
      </div>

      {/* Date + Durée */}
      <div>
        <label className="block text-sm font-bold mb-1">
          Date de début<span className="text-primary-orange">*</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => form.setStartDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-blue"
            required
          />

          {/* Durée */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => form.setDuration((d) => Math.max(1, d - 1))}
              className="px-1 py-1 rounded-full hover:bg-primary-orange bg-primary-blue"
            >
              <Icon icon="mdi:minus" width="20" className="text-white" />
            </button>
            <input
              type="number"
              value={form.duration}
              onChange={(e) =>
                form.setDuration(Math.max(1, Number(e.target.value)))
              }
              className="w-16 text-center border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => form.setDuration((d) => d + 1)}
              className="px-1 py-1 rounded-full hover:bg-primary-orange bg-primary-blue"
            >
              <Icon icon="mdi:plus" width="20" className="text-white" />
            </button>
          </div>

          <span className="text-gray-500 text-sm">
            Jours ({form.calculateEndDate()})
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between gap-3 pt-4">
        <div className="flex gap-3">
          {task && (
            <button
              type="button"
              onClick={() => form.setConfirmDelete(true)}
              className="flex items-center gap-1 px-3 py-2 bg-error text-white rounded hover:bg-red-600 font-semibold"
            >
              <Icon icon="mdi:trash" width="20" />
              Supprimer
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-2 bg-annuler text-white rounded hover:bg-gray-400 font-semibold"
          >
            <Icon icon="material-symbols:cancel" width="20" />
            Annuler
          </button>
        </div>

        <button
          type="submit"
          className="flex items-center gap-1 px-3 py-2 bg-success text-white rounded hover:bg-green-600 font-semibold"
        >
          <Icon icon="el:ok-sign" width="20" />
          Sauvegarder
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
