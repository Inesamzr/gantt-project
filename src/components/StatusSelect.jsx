import { useState } from "react";
import { Icon } from "@iconify/react";
import { statuses } from "../data/tasks";

const statusStyles = {
  "à faire": {
    bg: "bg-[var(--status-bg-todo)] text-[var(--status-primary-todo)]",
    dot: "bg-[var(--status-primary-todo)]",
  },
  "en cours": {
    bg: "bg-[var(--status-bg-progress)] text-[var(--status-primary-progress)]",
    dot: "bg-[var(--status-primary-progress)]",
  },
  terminée: {
    bg: "bg-[var(--status-bg-success)] text-[var(--status-primary-success)]",
    dot: "bg-[var(--status-primary-success)]",
  },
};

function StatusSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(statuses[0]);

  const styleFor = (s) =>
    statusStyles[s] || {
      bg: "bg-gray-100 text-gray-600",
      dot: "bg-gray-400",
    };

  const renderLabel = (s) => (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-sm rounded-full ${
        styleFor(s).bg
      }`}
    >
      <span className={`w-2.5 h-2.5 rounded-full ${styleFor(s).dot}`} />
      {s}
    </span>
  );

  return (
    <div className="relative">
      {/* Bouton principal */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full border border-gray-300 rounded px-3 py-2 bg-white"
      >
        {renderLabel(selected)}
        <Icon icon="mdi:chevron-down" width="18" />
      </button>

      {/* Menu déroulant */}
      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded shadow-lg z-50 overflow-hidden">
          {statuses.map((s) => (
            <div
              key={s}
              onClick={() => {
                setSelected(s);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {renderLabel(s)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusSelect;
