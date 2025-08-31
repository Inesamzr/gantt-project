import { useState } from "react";
import TimeHeader from "./TimeHeader";
import TaskRow from "./TaskRow";
import TaskModal from "./TaskModal";
import TaskDetailsModal from "./TaskDetailsModal";

function GanttChart({
  tasks,
  assignedToFilter,
  statusFilter,
  typeFilter,
  onAddTask,
}) {
  const ganttStartDate = "2025-08-16";
  const ganttEndDate = "2025-09-30";
  const [openedTasks, setOpenedTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [parentForChild, setParentForChild] = useState(null);
  const [detailsTask, setDetailsTask] = useState(null);

  const toggleTaskOpen = (taskId) => {
    setOpenedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const openAddModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  // ouvrir en mode édition
  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  // ajouter une sous-tâche
  const openAddChildModal = (parentTask) => {
    setTaskToEdit(null);
    setParentForChild(parentTask);
    setIsModalOpen(true);
  };

  // fonction récursive pour insérer un enfant dans le bon parent
  function addChildRecursive(tasks, parentId, newChild) {
    return tasks.map((t) => {
      if (t.id === parentId) {
        return {
          ...t,
          children: [...(t.children || []), newChild],
        };
      }
      if (t.children && t.children.length > 0) {
        return {
          ...t,
          children: addChildRecursive(t.children, parentId, newChild),
        };
      }
      return t;
    });
  }

  const handleSaveTask = (task) => {
    if (task._delete) {
      onAddTask({ ...task, action: "delete" });
    } else if (parentForChild) {
      const newChild = { ...task, id: Date.now(), children: [] };
      // passe l’ID du parent à la fonction récursive
      const updatedTasks = addChildRecursive(
        tasks,
        parentForChild.id,
        newChild
      );
      onAddTask({ action: "replaceAll", tasks: updatedTasks }); // ⚡️ propager la nouvelle liste
    } else {
      onAddTask(task); // ajout / édition normale
    }
    setIsModalOpen(false);
    setTaskToEdit(null);
    setParentForChild(null);
  };

  let filteredTasks = tasks.filter((task) => {
    if (
      assignedToFilter.length > 0 &&
      !assignedToFilter
        .map((v) => v.toLowerCase())
        .includes((task.assignedTo || "").toLowerCase())
    )
      return false;

    if (
      statusFilter.length > 0 &&
      !statusFilter
        .map((v) => v.toLowerCase())
        .includes((task.status || "").toLowerCase())
    )
      return false;

    if (
      typeFilter.length > 0 &&
      !typeFilter
        .map((v) => v.toLowerCase())
        .includes((task.type || "").toLowerCase())
    )
      return false;

    if (!task.parent) return true;
    return task.parent.some((p) => openedTasks.includes(p));
  });

  filteredTasks = [...filteredTasks].sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );

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
            onAddClick={openAddModal}
          />
        </div>
        <div className="flex flex-col gap-y-[4px]">
          {filteredTasks.map((task, index) => (
            <TaskRow
              key={task.id}
              task={task}
              rowNumber={index + 1}
              totalDays={totalDays}
              ganttStartDate={ganttStartDate}
              openedTasks={openedTasks}
              toggleOpen={toggleTaskOpen}
              onEdit={() => openEditModal(task)}
              onAddChild={openAddChildModal}
              onViewDetails={(task) => setDetailsTask(task)}
            />
          ))}
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={taskToEdit}
        parentTask={parentForChild} // pour préremplir le parent si on ajoute une sous-tâche
      />

      <TaskDetailsModal
        isOpen={!!detailsTask}
        task={detailsTask}
        onClose={() => setDetailsTask(null)}
      />
    </div>
  );
}

export default GanttChart;
