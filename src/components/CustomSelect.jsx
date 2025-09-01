import { Icon } from "@iconify/react";
import { useCustomSelect } from "../hooks/useCustomSelect";
import CustomSelectOption from "./CustomSelectOption";

function CustomSelect({
  options,
  allowEmpty = false,
  emptyLabel = "Vide",
  value,
  onChange,
}) {
  const { open, selected, toggleOpen, handleSelect } = useCustomSelect({
    value,
    options,
    allowEmpty,
    emptyLabel,
    onChange,
  });

  return (
    <div className="relative w-full">
      {/* Bouton principal */}
      <button
        type="button"
        onClick={toggleOpen}
        className="flex items-center justify-between w-full h-10 border border-gray-300 rounded px-3 bg-white"
      >
        <span>{selected === "" ? emptyLabel : selected}</span>
        <Icon icon="mdi:chevron-down" width="18" />
      </button>

      {/* Menu déroulant */}
      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded shadow-lg z-50 overflow-hidden">
          {allowEmpty && (
            <CustomSelectOption
              value=""
              label={emptyLabel}
              onSelect={handleSelect}
            />
          )}
          {options.map((opt) => (
            <CustomSelectOption
              key={opt}
              value={opt}
              label={opt}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
