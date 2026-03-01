"use client";

import { cn } from "@/lib/utils";

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  help?: string;
  disabled?: boolean;
}

export function TextField({ id, label, value, onChange, placeholder, required, error, help, disabled }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-text-primary">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-describedby={error ? `${id}-error` : help ? `${id}-help` : undefined}
        className={cn(
          "w-full rounded-sm border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary",
          error ? "border-red-500/60" : "border-surface-border",
          disabled && "opacity-50"
        )}
      />
      {help && !error && <p id={`${id}-help`} className="mt-1 text-xs text-text-tertiary">{help}</p>}
      {error && <p id={`${id}-error`} className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface TextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}

export function TextAreaField({ id, label, value, onChange, placeholder, rows = 4 }: TextAreaFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-text-primary">{label}</label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full resize-none rounded-sm border border-surface-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary"
      />
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export function SelectField({ id, label, value, onChange, options, placeholder, required, error }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-text-primary">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-sm border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary",
          error ? "border-red-500/60" : "border-surface-border"
        )}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface CheckboxGroupProps {
  label: string;
  options: readonly string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  error?: string;
  help?: string;
}

export function CheckboxGroup({ label, options, selected, onChange, error, help }: CheckboxGroupProps) {
  function toggle(opt: string) {
    onChange(
      selected.includes(opt)
        ? selected.filter((s) => s !== opt)
        : [...selected, opt]
    );
  }

  return (
    <div>
      <p className="mb-3 text-sm font-medium text-text-primary">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={cn(
              "rounded-sm border px-3 py-1.5 text-xs transition-colors",
              selected.includes(opt)
                ? "border-accent bg-accent/10 text-accent"
                : "border-surface-border bg-surface text-text-secondary hover:border-text-tertiary"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      {help && !error && <p className="mt-2 text-xs text-text-tertiary">{help}</p>}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface ToggleFieldProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
}

export function ToggleField({ label, value, onChange, yesLabel = "Oui", noLabel = "Non" }: ToggleFieldProps) {
  return (
    <div className="flex items-center justify-between rounded-sm border border-surface-border bg-surface px-4 py-3">
      <span className="text-sm text-text-primary">{label}</span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={cn(
            "rounded-sm px-3 py-1 text-xs transition-colors",
            value ? "bg-accent text-white" : "bg-surface-light text-text-secondary"
          )}
        >
          {yesLabel}
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={cn(
            "rounded-sm px-3 py-1 text-xs transition-colors",
            !value ? "bg-accent text-white" : "bg-surface-light text-text-secondary"
          )}
        >
          {noLabel}
        </button>
      </div>
    </div>
  );
}
