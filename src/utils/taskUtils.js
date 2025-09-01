export function cycleStatus(task, onChangeStatus) {
  const order = ["à faire", "en cours", "terminée"];
  const currentIndex = order.indexOf(task.status);
  const nextStatus = order[(currentIndex + 1) % order.length];
  onChangeStatus({ ...task, status: nextStatus });
}
