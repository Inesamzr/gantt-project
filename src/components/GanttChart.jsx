import { useState } from "react";
import TimeHeader from "./TimeHeader";
import TaskRow from "./TaskRow";

function GanttChart({
  tasks,
  assignedToFilter,
  statusFilter,
  typeFilter,
  onAddTask,
}) {
  const ganttStartDate = "2025-08-16";
  const ganttEndDate = "2025-09-30";

  const countWorkingDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    let count = 0;

    while (startDate <= endDate) {
      const day = startDate.getDay();
      if (day >= 1 && day <= 5) count++;
      startDate.setDate(startDate.getDate() + 1);
    }

    return count;
  };

  const totalDays = countWorkingDays(ganttStartDate, ganttEndDate);

  const [openedTasks, setOpenedTasks] = useState([]);

  const toggleTaskOpen = (taskId) => {
    setOpenedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const filteredTasks = tasks.filter((task) => {
    // filtre par assignation
    if (
      assignedToFilter.length > 0 &&
      !assignedToFilter.includes(task.assignedTo)
    )
      return false;

    // filtre par statut
    if (statusFilter.length > 0 && !statusFilter.includes(task.status))
      return false;

    // filtre par type
    if (typeFilter.length > 0 && !typeFilter.includes(task.type)) return false;

    // logique d'affichage liée aux tâches ouvertes
    if (!task.parent) return true;
    return task.parent.some((p) => openedTasks.includes(p));
  });

  return (
    <div className="overflow-x-auto text-sm custom-scrollbar">
      <div
        className="mx-auto"
        style={{
          maxWidth: `calc(40px + 600px + 40px * ${totalDays})`,
        }}
      >
        <div className="sticky top-0 z-30">
          <TimeHeader
            startDate={ganttStartDate}
            endDate={ganttEndDate}
            onAddTask={onAddTask}
          />{" "}
        </div>
        <div className="flex flex-col gap-y-[4px]">
          {filteredTasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              totalDays={totalDays}
              ganttStartDate={ganttStartDate}
              isOpen={openedTasks.includes(task.id)}
              toggleOpen={toggleTaskOpen}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GanttChart;
