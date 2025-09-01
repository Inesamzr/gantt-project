import TaskRowFixedCols from "./TaskRowFixedCols";
import TaskRowBar from "./TaskRowBar";
import TaskRowStatus from "./TaskRowStatus";

function TaskRow({
  task,
  totalDays,
  rowNumber,
  ganttStartDate,
  openedTasks,
  toggleOpen,
  onEdit,
  onViewDetails,
  onAddChild,
  onChangeStatus,
  registerPosition,
  refreshKey,
  level = 0,
}) {
  const isOpen = openedTasks.includes(task.id);
  const start = new Date(task.start);
  const end = new Date(task.end);
  const ganttStart = new Date(ganttStartDate);
  const hasChildren = task.children && task.children.length > 0;

  const duration =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <>
      <div className="flex">
        <TaskRowFixedCols
          task={task}
          rowNumber={rowNumber}
          start={start}
          duration={duration}
          level={level}
          hasChildren={hasChildren}
          isOpen={isOpen}
          toggleOpen={toggleOpen}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
          onAddChild={onAddChild}
        />

        <TaskRowBar
          task={task}
          ganttStart={ganttStart}
          start={start}
          end={end}
          totalDays={totalDays}
          registerPosition={registerPosition}
          refreshKey={refreshKey}
        />

        <TaskRowStatus task={task} onChangeStatus={onChangeStatus} />
      </div>

      {hasChildren && isOpen && (
        <div className="flex flex-col gap-y-[4px]">
          {task.children.map((child, idx) => (
            <TaskRow
              key={child.id}
              task={child}
              rowNumber={`${rowNumber}.${idx + 1}`}
              totalDays={totalDays}
              ganttStartDate={ganttStartDate}
              openedTasks={openedTasks}
              toggleOpen={toggleOpen}
              onEdit={onEdit}
              onViewDetails={onViewDetails}
              onAddChild={onAddChild}
              onChangeStatus={onChangeStatus}
              registerPosition={registerPosition}
              refreshKey={refreshKey}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default TaskRow;
