function TaskRow({ task, totalDays, ganttStartDate }) {
  const start = new Date(task.start);
  const end = new Date(task.end);
  const ganttStart = new Date(ganttStartDate);

  // 🧮 Calcul de la durée
  const duration =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <div
      className="grid items-center"
      style={{
        gridTemplateColumns: `40px 300px 150px 58px 80px repeat(${totalDays}, 40px)`,
        gap: "4px",
      }}
    >
      {/* 🆔 ID */}
      <div className="h-8 bg-primary-blue text-white font-bold text-center rounded-l-md flex items-center justify-center">
        {task.id}
      </div>

      {/* 🧾 Nom */}
      <div className="h-8 bg-white flex items-center px-2 overflow-hidden truncate text-sm">
        {task.name}
      </div>

      {/* 🗓 Date de début */}
      <div className="h-8 bg-white flex items-center px-2 text-sm">
        {start.toLocaleDateString("fr-FR")}
      </div>

      {/* 📅 Durée */}
      <div className="h-8 bg-white flex items-center justify-center text-sm">
        {duration} j
      </div>

      {/* ➕ Case vide pour action */}
      <div className="h-8 bg-white"></div>

      {/* 📆 Jours du Gantt */}
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
