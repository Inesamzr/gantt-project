import { useEffect, useState } from "react";
import { tasks } from "../../data/tasks";

/**
 * Hook qui gère la liste des tâches avec persistance dans localStorage
 * et propose une fonction pour ajouter, mettre à jour ou supprimer une tâche.
 */
export default function useTasks(showToast) {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTaskList(JSON.parse(stored));
    } else {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setTaskList(tasks);
    }
  }, []);

  const handleAddOrUpdateTask = (newTask) => {
    if (newTask.action === "delete") {
      setTaskList((prev) => {
        const updated = prev.filter((t) => t.id !== newTask.id);
        localStorage.setItem("tasks", JSON.stringify(updated));
        showToast("Tâche supprimée");
        return updated;
      });
    } else if (newTask.action === "replaceAll") {
      setTaskList(newTask.tasks);
      localStorage.setItem("tasks", JSON.stringify(newTask.tasks));
      showToast("Tâche mise à jour");
    } else {
      setTaskList((prev) => {
        const exists = prev.some((t) => t.id === newTask.id);
        let updated;
        if (exists) {
          updated = prev.map((t) =>
            t.id === newTask.id ? { ...t, ...newTask } : t
          );
        } else {
          updated = [...prev, newTask];
          showToast("Tâche ajoutée");
        }
        updated = updated.sort((a, b) => new Date(a.start) - new Date(b.start));
        localStorage.setItem("tasks", JSON.stringify(updated));
        return updated;
      });
    }
  };

  return { taskList, handleAddOrUpdateTask };
}
