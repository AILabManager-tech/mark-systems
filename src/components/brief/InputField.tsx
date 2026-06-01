import { cn } from "@/lib/utils";

interface InputFieldProps {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}

/* Champ texte réutilisable du brief (label + input + erreur). */
export function InputField({
  id,
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-text-primary"
      >
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-sm border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary",
          error ? "border-red-500/60" : "border-surface-border",
        )}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
