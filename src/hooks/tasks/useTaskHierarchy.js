/**
 * Ajoute récursivement une sous-tâche à la liste des tâches,
 * en l’insérant dans le bon parent identifié par son id.
 */
export function addChildRecursive(tasks, parentId, newChild) {
  return tasks.map((t) => {
    if (t.id === parentId) {
      return { ...t, children: [...(t.children || []), newChild] };
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
