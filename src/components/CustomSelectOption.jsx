function CustomSelectOption({ label, value, onSelect }) {
  return (
    <div
      onClick={() => onSelect(value)}
      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
    >
      {label}
    </div>
  );
}

export default CustomSelectOption;
