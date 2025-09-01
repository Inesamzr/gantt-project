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
