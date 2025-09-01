import { useState, useEffect } from "react";

/**
 * Hook qui gère la logique de sélection personnalisée
 */
export function useCustomSelect({
  value,
  options,
  allowEmpty,
  //emptyLabel,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(allowEmpty ? "" : options[0]);

  useEffect(() => {
    setSelected(value || (allowEmpty ? "" : options[0]));
  }, [value, options, allowEmpty]);

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleSelect = (val) => {
    setSelected(val);
    setOpen(false);
    if (onChange) onChange(val);
  };

  return { open, selected, toggleOpen, handleSelect, setOpen };
}
