export default function Input({ label, id, error, ...props }) {
  const labelClass = `block text-dark text-sm font-medium mb-2 ${
    error ? "border-red-500" : "border-gray-300"
  }`;
  const inputClass = "border-2 border-secondary rounded-[10px] p-2 w-full";

  return (
    <div className="control no-margin mb-4">
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <input id={id} className={inputClass} {...props} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
