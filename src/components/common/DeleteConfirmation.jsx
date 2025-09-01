import { Icon } from "@iconify/react";

function DeleteConfirmation({ onCancel, onConfirm }) {
  return (
    <div className="p-6 space-y-4">
      <p className="flex items-center justify-center text-primary-blue font-semibold text-lg">
        <Icon icon="icon-park-outline:attention" width="24" className="mr-2" />
        Voulez-vous vraiment supprimer cette tâche ?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onCancel}
          className="flex items-center gap-1 px-3 py-2 bg-annuler text-white rounded hover:bg-gray-400 font-semibold"
        >
          <Icon icon="material-symbols:cancel" width="20" />
          Annuler
        </button>
        <button
          onClick={onConfirm}
          className="flex items-center gap-1 px-3 py-2 bg-error text-white rounded hover:bg-red-600 font-semibold"
        >
          <Icon icon="mdi:trash" width="20" />
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
