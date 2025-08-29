function TaskRow({ task, totalDays, ganttStartDate }) {
  const start = new Date(task.start);
  const end = new Date(task.end);
  const ganttStart = new Date(ganttStartDate); // ← reçue en prop

  return (
    <div
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

      {[...Array(totalDays)].map((_, i) => {
        const current = new Date(ganttStart);
        current.setDate(ganttStart.getDate() + i);

        const isInRange = current >= start && current <= end;

        return (
          <div
            key={i}
            className={`h-8 rounded ${
              isInRange ? "bg-primary-orange" : "bg-white"
            }`}
          ></div>
        );
      })}
    </div>
  );
}

export default TaskRow;
