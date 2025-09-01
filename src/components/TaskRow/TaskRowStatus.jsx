import { Icon } from "@iconify/react";
import { cycleStatus } from "../../utils/taskUtils";

function TaskRowStatus({ task, onChangeStatus }) {
  return (
    <div
      className="w-[80px] h-8 flex items-center justify-center ml-[4px] bg-white cursor-pointer"
      style={{ position: "sticky", right: 0 }}
      onClick={() => cycleStatus(task, onChangeStatus)}
      title="Changer le statut"
    >
      {task.status === "terminée" && (
        <div
          className="w-[40px] h-8 flex items-center justify-center rounded"
          style={{ backgroundColor: "var(--status-bg-success)" }}
        >
          <Icon
            icon="el:ok-circle"
            className="text-[var(--status-primary-success)]"
            width="20"
          />
        </div>
      )}
      {task.status === "en cours" && (
        <div
          className="w-[40px] h-8 flex items-center justify-center rounded"
          style={{ backgroundColor: "var(--status-bg-progress)" }}
        >
          <Icon
            icon="mdi:progress-check"
            className="text-[var(--status-primary-progress)]"
            width="24"
          />
        </div>
      )}
      {task.status === "à faire" && (
        <div
          className="w-[40px] h-8 flex items-center justify-center rounded"
          style={{ backgroundColor: "var(--status-bg-todo)" }}
        >
          <Icon
            icon="tdesign:time"
            className="text-[var(--status-primary-todo)]"
            width="20"
          />
        </div>
      )}
    </div>
  );
}

export default TaskRowStatus;
