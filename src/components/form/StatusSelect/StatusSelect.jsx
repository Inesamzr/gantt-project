import { Icon } from "@iconify/react";
import { statuses } from "../../../data/tasks";
import { useStatusSelect } from "../../../hooks/form/useStatusSelect";
import StatusLabel from "./StatusBadge";

function StatusSelect({ value, onChange, defaultValue = "à faire" }) {
  const { open, selected, toggleOpen, selectStatus } = useStatusSelect(
    value,
    defaultValue
  );

  return (
    <div className="relative">
      {/* Bouton principal */}
      <button
        type="button"
        onClick={toggleOpen}
        className="flex items-center justify-between w-full h-10 border border-gray-300 rounded px-3 bg-white"
      >
        <StatusLabel status={selected} />
        <Icon icon="mdi:chevron-down" width="18" />
      </button>

      {/* Menu déroulant */}
      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded shadow-lg z-50 overflow-hidden">
          {statuses.map((s) => (
            <div
              key={s}
              onClick={() => selectStatus(s, onChange)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              <StatusLabel status={s} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusSelect;
