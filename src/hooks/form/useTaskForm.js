import { useState, useEffect } from "react";

/**
 * Hook qui gère la logique et l’état d’un formulaire de tâche
 */
export default function useTaskForm(task, isOpen) {
  const [name, setName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("à faire");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("2025-09-10");
  const [duration, setDuration] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [dependencies, setDependencies] = useState([]);

  useEffect(() => {
    if (task) {
      setName(task.name || "");
      setAssignedTo(task.assignedTo || "");
      setStatus(task.status || "à faire");
      setType(task.type || "");
      setDescription(task.description || "");
      setStartDate(task.start || "2025-09-10");
      setDependencies(task.dependencies || []);

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
    setConfirmDelete(false);
  }, [task, isOpen]);

  const calculateEndDate = () => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + duration - 1);
    return end.toISOString().split("T")[0];
  };

  return {
    name,
    setName,
    assignedTo,
    setAssignedTo,
    status,
    setStatus,
    type,
    setType,
    description,
    setDescription,
    startDate,
    setStartDate,
    duration,
    setDuration,
    confirmDelete,
    setConfirmDelete,
    calculateEndDate,
    dependencies,
    setDependencies,
  };
}
