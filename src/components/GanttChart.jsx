import { useState, useRef, useCallback } from "react";
import { ganttConfig } from "../config/gantt";
import useTaskFilters from "../hooks/useTaskFilters";
import useWorkingDays from "../hooks/useWorkingDays";
import { addChildRecursive } from "../hooks/useTaskHierarchy";

import TimeHeader from "./TimeHeader";
import TaskRow from "./TaskRow/TaskRow";
import TaskModal from "./TaskModal";
import TaskDetailsModal from "./TaskDetailsModal";
import DependenciesLayer from "./TaskRow/DependenciesLayer";

function GanttChart({
  tasks,
  assignedToFilter,
  statusFilter,
  typeFilter,
  onAddTask,
}) {
  const [openedTasks, setOpenedTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [parentForChild, setParentForChild] = useState(null);
  const [detailsTask, setDetailsTask] = useState(null);
  const [taskPositions, setTaskPositions] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const canvasRef = useRef(null);

  const registerPosition = useCallback((taskId, rect) => {
    const base = canvasRef.current?.getBoundingClientRect();
    if (!base) return;
    setTaskPositions((prev) => ({
      ...prev,
      [taskId]: {
        x: rect.left - base.left,
        y: rect.top - base.top,
        width: rect.width,
        height: rect.height,
      },
    }));
  }, []);

  const toggleTaskOpen = (taskId) => {
    setOpenedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
    setRefreshKey((k) => k + 1);
  };

  const openAddModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const openAddChildModal = (parentTask) => {
    setTaskToEdit(null);
    setParentForChild(parentTask);
    setIsModalOpen(true);
  };

  const handleSaveTask = (task) => {
    if (task._delete) {
      onAddTask({ ...task, action: "delete" });
    } else if (parentForChild) {
      const newChild = { ...task, id: Date.now(), children: [] };
      const updatedTasks = addChildRecursive(
        tasks,
        parentForChild.id,
        newChild
      );
      onAddTask({ action: "replaceAll", tasks: updatedTasks });
    } else {
      onAddTask(task);
    }
    setIsModalOpen(false);
    setTaskToEdit(null);
    setParentForChild(null);
  };

  const filteredTasks = useTaskFilters(tasks, {
    assignedToFilter,
    statusFilter,
    typeFilter,
    openedTasks,
  });

  const totalDays = useWorkingDays(ganttConfig.startDate, ganttConfig.endDate);

  return (
    <div className="overflow-x-auto text-sm custom-scrollbar">
      <div
        className="mx-auto"
        style={{
          maxWidth: `calc(40px + 730px + 40px * ${totalDays})`,
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-30">
          <TimeHeader
            startDate={ganttConfig.startDate}
            endDate={ganttConfig.endDate}
            onAddClick={openAddModal}
          />
        </div>

        <div ref={canvasRef} className="relative">
          <div className="flex flex-col gap-y-[4px]">
            {filteredTasks.map((task, index) => (
              <TaskRow
                key={task.id}
                task={task}
                rowNumber={index + 1}
                totalDays={totalDays}
                ganttStartDate={ganttConfig.startDate}
                openedTasks={openedTasks}
                toggleOpen={toggleTaskOpen}
                onEdit={() => openEditModal(task)}
                onAddChild={openAddChildModal}
                onChangeStatus={onAddTask}
                onViewDetails={(task) => setDetailsTask(task)}
                registerPosition={registerPosition}
                refreshKey={refreshKey}
              />
            ))}
          </div>
          <DependenciesLayer
            tasks={filteredTasks}
            taskPositions={taskPositions}
          />
        </div>
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={taskToEdit}
        parentTask={parentForChild}
      />
      <TaskDetailsModal
        isOpen={!!detailsTask}
        task={detailsTask}
        allTasks={tasks}
        onClose={() => setDetailsTask(null)}
      />
    </div>
  );
}

export default GanttChart;
