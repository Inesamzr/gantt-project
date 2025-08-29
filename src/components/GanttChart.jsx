import tasks from "../data/tasks";
import TimeHeader from "./TimeHeader";
import TaskRow from "./TaskRow";

function GanttChart() {
  const numberOfWeeks = 4;
  const totalDays = numberOfWeeks * 5;
  const ganttStartDate = "2025-08-18";

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
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              totalDays={totalDays}
              ganttStartDate={ganttStartDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GanttChart;
