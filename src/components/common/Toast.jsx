import { Icon } from "@iconify/react";

function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-primary-blue text-white px-4 py-2 rounded shadow-lg z-[9999] animate-slideIn flex items-center gap-2">
      <Icon icon="el:ok-sign" width="20" className="text-white" />

      <span>{message}</span>

      <button
        onClick={onClose}
        className="ml-3 text-sm underline hover:text-gray-200"
      >
        Fermer
      </button>
    </div>
  );
}

export default Toast;
