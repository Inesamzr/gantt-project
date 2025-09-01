import { Icon } from "@iconify/react";

function WarningModal({ message, onClose }) {
  return (
    <div className="p-6 space-y-4">
      <p className="flex items-center justify-center text-primary-blue font-semibold text-lg">
        <Icon icon="material-symbols:cancel" width="24" className="mr-2" />
        {message}
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onClose}
          className="flex items-center gap-1 px-3 py-2 bg-primary-blue text-white rounded hover:bg-primary-turquoise font-semibold"
        >
          <Icon icon="mdi:close-circle" width="20" />
          Fermer
        </button>
      </div>
    </div>
  );
}

export default WarningModal;
