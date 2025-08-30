import { useState } from "react";
import { Icon } from "@iconify/react";

function CustomSelect({ options, allowEmpty = false, emptyLabel = "Vide" }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(allowEmpty ? "" : options[0]);

  return (
    <div className="relative w-full">
      {/* Bouton principal */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full h-10 border border-gray-300 rounded px-3 bg-white"
      >
        <span>{selected === "" ? emptyLabel : selected}</span>
        <Icon icon="mdi:chevron-down" width="18" />
      </button>

      {/* Menu déroulant */}
      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded shadow-lg z-50 overflow-hidden">
          {allowEmpty && (
            <div
              onClick={() => {
                setSelected("");
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {emptyLabel}
            </div>
          )}
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
