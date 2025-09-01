import { typeColors } from "../../config/colors";
import { getWorkingDays } from "../../hooks/useWorkingDaysTaskRow";
import { useTaskBarPosition } from "../../hooks/useTaskBarPosition";

function TaskRowBar({
  task,
  ganttStart,
  start,
  end,
  totalDays,
  registerPosition,
  refreshKey,
}) {
  const workingDays = getWorkingDays(ganttStart, totalDays);

  const { barRef, isVisible, visibleOffset, visibleDuration } =
    useTaskBarPosition({
      task,
      ganttStart,
      start,
      end,
      totalDays,
      registerPosition,
      refreshKey,
    });

  if (!isVisible) return null;

  return (
    <div
      className="relative grid gap-[4px]"
      style={{ gridTemplateColumns: `repeat(${totalDays}, 40px)` }}
    >
      {/* Barre de la tâche */}
      <div
        ref={barRef}
        className="absolute h-5.5 top-[5px] flex items-center text-white text-xs font-semibold rounded-full px-2 overflow-hidden mx-[2px]"
        style={{
          left: `${visibleOffset * 44}px`,
          width: `${visibleDuration * 44 - 7}px`,
          backgroundColor:
            typeColors[task.type] || "var(--color-primary-orange)",
        }}
        title={task.name}
      >
        <span className="truncate whitespace-nowrap">{task.name}</span>
      </div>

      {/* Colonnes de jours */}
      {workingDays.map((day, i) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        day.setHours(0, 0, 0, 0);
        const isToday = day.getTime() === today.getTime();
        return (
          <div
            key={i}
            className={`h-8 ${isToday ? "bg-background-label" : "bg-white"}`}
          />
        );
      })}
    </div>
  );
}

export default TaskRowBar;
