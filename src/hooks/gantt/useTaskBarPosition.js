import { useEffect, useRef } from "react";
import { countWorkingDaysBetween } from "./useWorkingDaysTaskRow";

/**
 * Hook qui calcule la position et la visibilité d’une barre de tâche
 * dans le diagramme de Gantt, et enregistre ses coordonnées à l’écran.
 */
export function useTaskBarPosition({
  task,
  ganttStart,
  start,
  end,
  totalDays,
  registerPosition,
  refreshKey,
}) {
  const barRef = useRef(null);

  const offset = countWorkingDaysBetween(ganttStart, start);
  const endOffset = countWorkingDaysBetween(ganttStart, end);

  // recalculer et enregistrer les coordonnées après rendu
  useEffect(() => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    registerPosition(task.id, {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    });
  }, [task.id, registerPosition, refreshKey]);

  if (endOffset < 0 || offset > totalDays - 1) {
    return { barRef, isVisible: false, visibleOffset: 0, visibleDuration: 0 };
  }

  const visibleOffset = Math.max(0, offset);
  const visibleDuration =
    Math.min(endOffset, totalDays - 1) - visibleOffset + 1;

  return { barRef, isVisible: true, visibleOffset, visibleDuration };
}
