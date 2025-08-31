import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { persons, taskTypes } from "../data/tasks";
import StatusSelect from "./StatusSelect";
import CustomSelect from "./CustomSelect";

function TaskModal({ isOpen, onClose, onSave, task }) {
  const [name, setName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("à faire");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("2025-09-10");
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    if (task) {
      setName(task.name || "");
      setAssignedTo(task.assignedTo || "");
      setStatus(task.status || "à faire");
      setType(task.type || "");
      setDescription(task.description || "");
      setStartDate(task.start || "2025-09-10");

      const d =
        Math.ceil(
          (new Date(task.end) - new Date(task.start)) / (1000 * 60 * 60 * 24)
        ) + 1;
      setDuration(d > 0 ? d : 1);
    } else {
      setName("");
      setAssignedTo("");
      setStatus("à faire");
      setType("");
      setDescription("");
      setStartDate("2025-09-10");
      setDuration(1);
    }
  }, [task, isOpen]);
  if (!isOpen) return null;

  const calculateEndDate = () => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + duration - 1);
    return end.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task, // conserve l'id si on édite
      id: task ? task.id : Date.now(),
      name,
      assignedTo,
      status,
      type,
      description,
      start: startDate,
      end: calculateEndDate(),
    };
    onSave(updatedTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]">
      <div className="bg-white rounded-md shadow-lg w-[700px] relative">
        {/* Header coloré */}
        <div className="flex items-center justify-between px-6 py-3 bg-primary-blue text-white rounded-t-md">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Icon
              icon="mdi:plus"
              width="22"
              className="text-primary-turquoise"
            />
            {task ? "Modifier la tâche" : "Ajout d'une tâche"}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <Icon icon="akar-icons:cross" width="20" />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Nom */}
          <div>
            <label className="block text-sm mb-1 font-bold">
              Nom<span className="text-primary-orange">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-blue"
              placeholder="Nom de la tâche"
              required
            />
          </div>

          {/* Assignation + État */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-1">
                Assignation
              </label>
              <CustomSelect
                options={persons.map((p) => p.name)}
                allowEmpty={true}
                emptyLabel="Vide"
                value={assignedTo}
                onChange={setAssignedTo}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                État<span className="text-primary-orange">*</span>
              </label>
              <StatusSelect
                value={status}
                onChange={setStatus}
                defaultValue="à faire"
              />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-bold mb-1">
              Type de tâche
            </label>
            <CustomSelect
              options={taskTypes.map(
                (t) => t.charAt(0).toUpperCase() + t.slice(1)
              )}
              allowEmpty={true}
              emptyLabel="Vide"
              value={type}
              onChange={setType}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-blue"
              rows="3"
            />
          </div>

          {/* Période */}
          <div>
            <label className="block text-sm font-bold mb-1">
              Date de début<span className="text-primary-orange">*</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-blue"
                required
              />

              {/* Durée */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setDuration((d) => Math.max(1, d - 1))}
                  className="px-1 py-1 rounded-full hover:bg-primary-orange bg-primary-blue"
                >
                  <Icon icon="mdi:minus" width="20" className="text-white" />
                </button>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) =>
                    setDuration(Math.max(1, Number(e.target.value)))
                  }
                  className="w-16 text-center border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={() => setDuration((d) => d + 1)}
                  className="px-1 py-1 rounded-full hover:bg-primary-orange bg-primary-blue"
                >
                  <Icon icon="mdi:plus" width="20" className="text-white" />
                </button>
              </div>

              <span className="text-gray-500 text-sm">
                Jours ({calculateEndDate()})
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between gap-3 pt-4">
            <div className="flex justify-start gap-3">
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
      </div>
    </div>
  );
}

export default TaskModal;
