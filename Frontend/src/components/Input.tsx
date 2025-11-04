type InputProps = {
  label: string;
  type?: string;
  icon: string;
  placeholder?: string;
  trailingIcon?: string;
  onTrailingClick?: () => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  label,
  type = "text",
  icon,
  placeholder,
  trailingIcon,
  onTrailingClick,
  value,
  onChange
}: InputProps) {
  const paddingRightClass = trailingIcon ? "pr-12" : "pr-4";

  return (
    <label className="flex flex-col flex-1">
      <p className="text-gray-700 text-sm font-medium pb-1.5">
        {label}
      </p>
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
          {icon}
        </span>

        <input
          type={type}
          placeholder={placeholder}
          value={value} // CLAVE
          onChange={onChange} // CLAVE
          className={`form-input w-full rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 border border-transparent bg-gray-100 h-14 placeholder:text-gray-400 pl-12 text-base transition duration-200 ${paddingRightClass}`}
        />

        {trailingIcon && (
          <button
            type="button"
            onClick={onTrailingClick}
            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-blue-600 transition duration-150"
          >
            <span className="material-symbols-outlined text-xl">{trailingIcon}</span>
          </button>
        )}
      </div>
    </label>
  );
}