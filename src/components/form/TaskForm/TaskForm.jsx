import WarningModal from "../../common/WarningModal";
import TaskFormFields from "./TaskFormFields";
import { useTaskFormValidation } from "../../../hooks/form/useTaskFormValidation";

function TaskForm({ task, parentTask, form, onClose, onSave }) {
  const { warningMessage, setWarningMessage, handleSubmit } =
    useTaskFormValidation({ task, parentTask, form, onSave, onClose });

  return (
    <>
      {warningMessage ? (
        <WarningModal
          message={warningMessage}
          onClose={() => setWarningMessage("")}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          <TaskFormFields task={task} form={form} onClose={onClose} />
        </form>
      )}
    </>
  );
}

export default TaskForm;
