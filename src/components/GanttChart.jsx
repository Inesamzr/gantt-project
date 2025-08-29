import { useState } from "react";
import tasks from "../data/tasks";
import TimeHeader from "./TimeHeader";
import TaskRow from "./TaskRow";

function GanttChart() {
  const numberOfWeeks = 4;
  const totalDays = numberOfWeeks * 5;
  const ganttStartDate = "2025-08-18";
  const [openedTasks, setOpenedTasks] = useState([]);

  const toggleTaskOpen = (taskId) => {
    setOpenedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  return (
    <div className="overflow-x-auto text-sm">
      <div
        className="mx-auto"
        style={{
          maxWidth: `calc(40px + 600px + 40px * ${totalDays})`,
        }}
      >
        <TimeHeader startDate={ganttStartDate} numberOfWeeks={numberOfWeeks} />

        <div className="flex flex-col gap-y-[4px]">
          {tasks
            .filter((task) => {
              // Montrer les parents
              if (!task.parent) return true;

              // Montrer les enfants seulement si leur parent est ouvert
              return task.parent.some((p) => openedTasks.includes(p));
            })
            .map((task) => (
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
