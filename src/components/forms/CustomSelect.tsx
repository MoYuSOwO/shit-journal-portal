import React, { useEffect, useRef, useState } from 'react';

export interface CustomSelectOption {
  value: string;
  label: string;
  emoji?: string;
}

interface CustomSelectProps {
  ariaLabel: string;
  className?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  size?: 'sm' | 'md' | 'lg';
  value: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  ariaLabel,
  className = '',
  disabled = false,
  onChange,
  options,
  size = 'lg',
  value,
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const selectedOption = options.find(option => option.value === value) ?? options[0];
  const triggerClass = size === 'sm'
    ? 'ui-select-trigger ui-select-trigger-sm'
    : size === 'md'
      ? 'ui-select-trigger ui-select-trigger-md'
      : 'ui-select-trigger ui-select-trigger-lg';
  const panelClass = size === 'sm'
    ? 'ui-select-panel ui-select-panel-sm'
    : size === 'md'
      ? 'ui-select-panel ui-select-panel-md'
      : 'ui-select-panel ui-select-panel-lg';
  const scrollClass = size === 'sm'
    ? 'ui-select-scroll ui-select-scroll-sm scrollbar-subtle'
    : size === 'md'
      ? 'ui-select-scroll ui-select-scroll-md scrollbar-subtle'
      : 'ui-select-scroll ui-select-scroll-lg scrollbar-subtle';
  const optionClass = size === 'sm'
    ? 'ui-select-option ui-select-option-sm'
    : size === 'md'
      ? 'ui-select-option ui-select-option-md'
      : 'ui-select-option ui-select-option-lg';
  const iconClass = size === 'sm' ? 'text-base' : size === 'md' ? 'text-[17px]' : 'text-[18px]';

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`.trim()}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={selectedOption?.label ?? ariaLabel}
        disabled={disabled}
        onClick={() => {
          if (!disabled) setOpen(prev => !prev);
        }}
        className={triggerClass}
      >
        <span className="truncate">{selectedOption?.label}</span>
        <span
          aria-hidden="true"
          className={`material-symbols-outlined ml-3 shrink-0 text-gray-500 transition-transform ${iconClass} ${
            open ? 'rotate-180' : ''
          }`}
        >
          expand_more
        </span>
      </button>

      {open && (
        <div className={panelClass}>
          <div role="listbox" aria-label={ariaLabel} className={scrollClass}>
            {options.map(option => {
              const isActive = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`${optionClass} ${isActive ? 'ui-select-option-active' : ''}`}
                >
                  {option.emoji && (
                    <span aria-hidden="true" className={`${size === 'sm' ? 'text-sm' : 'text-base'} leading-none`}>
                      {option.emoji}
                    </span>
                  )}
                  <span aria-hidden="true" className={`${size === 'sm' ? 'text-sm' : 'text-base'} leading-none ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    ✓
                  </span>
                  <span className="truncate">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
