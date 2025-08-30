import { useState } from "react";
import { Icon } from "@iconify/react";

function Dropdown({ label, options, value = [], onChange }) {
  const [open, setOpen] = useState(false);

  const toggleOption = (id) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="relative">
      {/* Bouton principal */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1 rounded-md bg-white shadow hover:bg-gray-50 min-w-[180px] text-left"
      >
        {open ? (
          <Icon icon="mdi:chevron-up" width="20" />
        ) : (
          <Icon icon="mdi:chevron-down" width="20" />
        )}
        <span className="truncate">
          {value.length > 0 ? `${value.length} sélectionné(s)` : label}
        </span>
      </button>

      {/* Menu déroulant */}
      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded shadow-lg z-50 max-h-60 overflow-y-auto">
          <div
            onClick={() => {
              onChange([]); // reset
              setOpen(false);
            }}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-500 text-sm"
          >
            Réinitialiser
          </div>
          {options.map((opt) => (
            <label
              key={opt.id || opt}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={value.includes(opt.id || opt)}
                onChange={() => toggleOption(opt.id || opt)}
              />
              {opt.name || opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
