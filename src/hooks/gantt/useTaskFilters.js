import { useMemo } from "react";

/**
 * Hook qui applique les filtres (assignation, statut, type)
 * et gère l’affichage conditionnel des sous-tâches
 * selon que leurs parents sont ouverts ou non.
 */
export default function useTaskFilters(
  tasks,
  { assignedToFilter, statusFilter, typeFilter, openedTasks }
) {
  return useMemo(() => {
    let filtered = tasks.filter((task) => {
      if (
        assignedToFilter.length > 0 &&
        !assignedToFilter
          .map((v) => v.toLowerCase())
          .includes((task.assignedTo || "").toLowerCase())
      )
        return false;

      if (
        statusFilter.length > 0 &&
        !statusFilter
          .map((v) => v.toLowerCase())
          .includes((task.status || "").toLowerCase())
      )
        return false;

      if (
        typeFilter.length > 0 &&
        !typeFilter
          .map((v) => v.toLowerCase())
          .includes((task.type || "").toLowerCase())
      )
        return false;

      // Si le parent est fermé, ne pas afficher la sous-tâche
      if (!task.parent) return true;
      return task.parent.some((p) => openedTasks.includes(p));
    });

    return [...filtered].sort((a, b) => new Date(a.start) - new Date(b.start));
  }, [tasks, assignedToFilter, statusFilter, typeFilter, openedTasks]);
}
