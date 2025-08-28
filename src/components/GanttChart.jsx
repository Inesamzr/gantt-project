import tasks from "../data/tasks";
import TimeHeader from "./TimeHeader";

function GanttChart() {
  const numberOfWeeks = 4;
  const totalDays = numberOfWeeks * 5;

  return (
    <div className="overflow-x-auto text-sm">
      <div
        className="mx-auto"
        style={{
          maxWidth: `calc(40px + 600px + 40px * ${totalDays})`,
        }}
      >
        <TimeHeader startDate="2025-08-18" numberOfWeeks={numberOfWeeks} />

        <div className="flex flex-col gap-y-[4px]">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="grid items-center"
              style={{
                gridTemplateColumns: `40px 600px repeat(${totalDays}, 40px)`,
                gap: "4px",
              }}
            >
              <div className="h-8 bg-primary-blue text-white font-bold text-center rounded-l-md flex items-center justify-center">
                {task.id}
              </div>

              <div className="p-2 h-8 bg-white truncate border-r border-gray-200">
                {task.name}
              </div>

              {[...Array(totalDays)].map((_, i) => (
                <div key={i} className="h-8 bg-white"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GanttChart;
