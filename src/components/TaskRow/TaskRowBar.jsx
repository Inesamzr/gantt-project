import { useEffect, useRef } from "react";
import { typeColors } from "../../config/colors";
import {
  countWorkingDaysBetween,
  getWorkingDays,
} from "../../hooks/useWorkingDaysTaskRow";

function TaskRowBar({
  task,
  ganttStart,
  start,
  end,
  totalDays,
  registerPosition,
  refreshKey,
}) {
  const barRef = useRef(null);
  const workingDays = getWorkingDays(ganttStart, totalDays);
  const offset = countWorkingDaysBetween(ganttStart, start);
  const endOffset = countWorkingDaysBetween(ganttStart, end);

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

  if (endOffset < 0 || offset > totalDays - 1) return null;

  const visibleOffset = Math.max(0, offset);
  const visibleDuration =
    Math.min(endOffset, totalDays - 1) - visibleOffset + 1;

  return (
    <div
      className="relative grid gap-[4px]"
      style={{ gridTemplateColumns: `repeat(${totalDays}, 40px)` }}
    >
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
