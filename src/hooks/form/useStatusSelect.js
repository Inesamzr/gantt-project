import { useState, useEffect } from "react";
import { statuses } from "../../data/tasks";

/**
 * Hook qui gère la logique de sélection d’un statut
 */
export function useStatusSelect(value, defaultValue = "à faire") {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    setSelected(value || statuses[0]);
  }, [value]);

  const toggleOpen = () => setOpen((prev) => !prev);

  const selectStatus = (s, onChange) => {
    setSelected(s);
    setOpen(false);
    if (onChange) onChange(s);
  };

  return { open, selected, toggleOpen, selectStatus, setOpen };
}
