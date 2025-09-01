import { useState } from "react";

/**
 * Hook qui gère la validation et la soumission du formulaire de tâche
 */
export function useTaskFormValidation({
  task,
  parentTask,
  form,
  onSave,
  onClose,
}) {
  const [warningMessage, setWarningMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const childStart = new Date(form.startDate);
    const childEnd = new Date(form.calculateEndDate());

    if (parentTask) {
      const parentStart = new Date(parentTask.start);
      const parentEnd = new Date(parentTask.end);

      if (childStart < parentStart || childEnd > parentEnd) {
        setWarningMessage(
          `La sous-tâche doit être comprise entre le ${parentStart.toLocaleDateString(
            "fr-FR"
          )} et le ${parentEnd.toLocaleDateString("fr-FR")}`
        );
        return;
      }
    }

    const updatedTask = {
      ...task,
      id: task ? task.id : Date.now(),
      name: form.name,
      assignedTo: form.assignedTo,
      status: form.status,
      type: form.type,
      description: form.description,
      start: form.startDate,
      end: form.calculateEndDate(),
      dependencies: form.dependencies,
    };

    onSave(updatedTask);

    // Vérif localStorage
    const stored = JSON.parse(localStorage.getItem("tasks") || "[]");
    const exists = stored.some((t) => t.id === updatedTask.id);
    if (!exists) {
      setWarningMessage(
        "⚠️ Le diagramme n'est pas à jour : pensez à rafraîchir ou à vérifier la sauvegarde."
      );
      return;
    }

    onClose();
  };

  return { warningMessage, setWarningMessage, handleSubmit };
}
