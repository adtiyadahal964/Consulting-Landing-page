'use client';

import { KeyboardEvent, useEffect, useId, useRef, useState } from 'react';

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type AnimatedSelectProps = {
  name: string;
  value: string;
  placeholder: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  required?: boolean;
  invalid?: boolean;
  labelledBy: string;
  describedBy?: string;
};

export default function AnimatedSelect({
  name,
  value,
  placeholder,
  options,
  onChange,
  required = false,
  invalid = false,
  labelledBy,
  describedBy,
}: AnimatedSelectProps) {
  const generatedId = useId().replace(/:/g, '');
  const listboxId = `${name}-${generatedId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const firstEnabledIndex = Math.max(0, options.findIndex((option) => !option.disabled));
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex >= 0 ? selectedIndex : firstEnabledIndex);

  useEffect(() => {
    function handleOutsidePointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener('pointerdown', handleOutsidePointer);
    return () => document.removeEventListener('pointerdown', handleOutsidePointer);
  }, []);

  useEffect(() => {
    if (!open) return;
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : firstEnabledIndex);
  }, [firstEnabledIndex, open, selectedIndex]);

  function moveActive(direction: 1 | -1) {
    let nextIndex = activeIndex;
    for (let step = 0; step < options.length; step += 1) {
      nextIndex = (nextIndex + direction + options.length) % options.length;
      if (!options[nextIndex].disabled) {
        setActiveIndex(nextIndex);
        return;
      }
    }
  }

  function selectOption(index: number) {
    const option = options[index];
    if (!option || option.disabled) return;
    onChange(option.value);
    setActiveIndex(index);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setActiveIndex(selectedIndex >= 0 ? selectedIndex : firstEnabledIndex);
      } else {
        moveActive(event.key === 'ArrowDown' ? 1 : -1);
      }
      return;
    }

    if (!open) return;
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      const enabled = options
        .map((option, index) => ({ option, index }))
        .filter(({ option }) => !option.disabled);
      setActiveIndex(event.key === 'Home' ? enabled[0].index : enabled[enabled.length - 1].index);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectOption(activeIndex);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Tab') {
      setOpen(false);
    }
  }

  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null;
  const activeOptionId = open ? `${listboxId}-option-${activeIndex}` : undefined;

  return (
    <div ref={rootRef} className="dropdown-root">
      <select
        className="sr-only"
        name={name}
        value={value}
        required={required}
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => onChange(event.currentTarget.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
        ))}
      </select>

      <button
        ref={buttonRef}
        type="button"
        className="dropdown-trigger"
        data-field-name={name}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={activeOptionId}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        aria-invalid={invalid}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
      >
        <span className={selectedOption ? 'dropdown-value' : 'dropdown-placeholder'}>
          {selectedOption?.label ?? placeholder}
        </span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className="dropdown-chevron" data-open={open}>
          <path d="m5.5 7.5 4.5 4.5 4.5-4.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      </button>

      <div
        id={listboxId}
        role="listbox"
        aria-labelledby={labelledBy}
        aria-hidden={!open}
        className="dropdown-menu"
        data-open={open}
      >
        {options.map((option, index) => {
          const selected = option.value === value;
          const active = index === activeIndex;
          return (
            <button
              id={`${listboxId}-option-${index}`}
              key={option.value}
              type="button"
              role="option"
              aria-selected={selected}
              disabled={option.disabled}
              tabIndex={-1}
              className="dropdown-option"
              data-active={active}
              data-selected={selected}
              onPointerMove={() => !option.disabled && setActiveIndex(index)}
              onClick={() => selectOption(index)}
            >
              <span>{option.label}</span>
              {selected && (
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m4.5 10 3.2 3.2 7.8-7.8" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
