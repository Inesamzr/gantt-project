import { statusStyles } from "../../../config/statusStyles";

function StatusBadge({ status }) {
  const style = statusStyles[status] || {
    bg: "bg-gray-100 text-gray-600",
    dot: "bg-gray-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-sm rounded-full ${style.bg}`}
    >
      <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

export default StatusBadge;
