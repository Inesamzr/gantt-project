function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-primary-blue text-white px-4 py-2 rounded shadow-lg z-[9999] animate-slideIn">
      {message}
      <button
        onClick={onClose}
        className="ml-2 text-sm underline hover:text-gray-200"
      >
        Fermer
      </button>
    </div>
  );
}

export default Toast;
