function DependenciesLayer({ tasks, taskPositions }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
      {tasks.flatMap((task) =>
        (task.dependencies || []).map((depId) => {
          const from = taskPositions[depId];
          const to = taskPositions[task.id];
          if (!from || !to) return null;

          const startX = from.x + from.width;
          const startY = from.y + from.height / 2;
          const endX = to.x;
          const endY = to.y + to.height / 2;

          return (
            <path
              key={`${depId}->${task.id}`}
              d={`M${startX},${startY} C${startX + 40},${startY} ${
                endX - 40
              },${endY} ${endX},${endY}`}
              stroke="orange"
              strokeWidth={2.5}
              fill="none"
              markerEnd="url(#arrowhead)"
            />
          );
        })
      )}

      <defs>
        <marker
          id="arrowhead"
          markerWidth="4"
          markerHeight="4"
          refX="4"
          refY="2"
          orient="auto"
        >
          <polygon points="0 0, 4 2, 0 4" fill="orange" />
        </marker>
      </defs>
    </svg>
  );
}

export default DependenciesLayer;
