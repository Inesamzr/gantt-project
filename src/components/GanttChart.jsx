import tasks from "../data/tasks";

function GanttChart() {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <p>
            Du {task.start} au {task.end} — Assigné à {task.assignedTo}
          </p>
        </div>
      ))}
    </div>
  );
}

export default GanttChart;
