import { Icon } from "@iconify/react";

function TaskRow({ task, totalDays, ganttStartDate }) {
  const start = new Date(task.start);
  const end = new Date(task.end);
  const ganttStart = new Date(ganttStartDate);

  const duration =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <div className="flex">
      <div
        className="grid items-center mr-[4px]"
        style={{
          gridTemplateColumns: `40px 304px 150px 70px 80px`,
        }}
      >
        <div className="h-8 bg-primary-blue text-white font-bold text-center rounded-l-md flex items-center justify-center">
          {task.id}
        </div>

        <div className="h-8 bg-white flex items-center px-2 overflow-hidden truncate text-sm">
          {task.name}
        </div>

        <div className="h-8 bg-white flex items-center px-2 text-sm">
          {start.toLocaleDateString("fr-FR")}
        </div>

        <div className="h-8 bg-white flex items-center justify-center text-sm">
          {duration} j
        </div>

        <div className="h-8 bg-white flex items-center justify-center gap-2">
          <button title="Modifier">
            <Icon
              icon="mdi:pencil"
              width="20"
              className="text-primary-turquoise"
            />
          </button>
          <button title="Ajouter sous-tâche">
            <Icon
              icon="mdi:plus"
              width="20"
              className="text-primary-turquoise"
            />
          </button>
        </div>
      </div>

      <div
        className="grid gap-[4px]"
        style={{
          gridTemplateColumns: `repeat(${totalDays}, 40px)`,
        }}
      >
        {[...Array(totalDays)].map((_, i) => {
          const current = new Date(ganttStart);
          current.setDate(ganttStart.getDate() + i);

          const isInRange = current >= start && current <= end;

          return (
            <div
              key={i}
              className={`h-8 ${isInRange ? "bg-primary-orange" : "bg-white"}`}
            ></div>
          );
        })}
      </div>

      <div className="w-[80px] h-8 flex items-center justify-center ml-[4px]">
        {task.status === "terminée" && (
          <div className="w-[40px] h-8 bg-[#D1F3C4] flex items-center justify-center rounded-r">
            <Icon icon="el:ok-circle" className="text-green-600" width="20" />
          </div>
        )}
        {task.status === "en cours" && (
          <div className="w-[40px] h-8 bg-[#FFCAAD] flex items-center justify-center rounded-r">
            <Icon
              icon="mdi:progress-check"
              className="text-red-500"
              width="24"
            />
          </div>
        )}
        {task.status === "à faire" && (
          <div className="w-[40px] h-8 bg-gray-100 flex items-center justify-center rounded-r">
            <Icon icon="tdesign:time" className="text-gray-500" width="20" />
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskRow;
