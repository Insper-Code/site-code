import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import clsx from 'clsx';

interface Option {
  value: string;
  label: string;
}

interface SimpleSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SimpleSelect: React.FC<SimpleSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...'
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={containerRef} className="relative w-fit bg-white rounded-sm">
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="w-fit flex items-center justify-between border-2 border-[#3773B5] rounded-sm px-3 py-2 gap-6 bg-none text-sm font-medium text-[#3773B5] focus:outline-none hover:ring-1 hover:cursor-pointer"
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <FiChevronDown
          className={clsx(
            'text-xl text-[#3773B5] transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white shadow-lg">
          {options.map(opt => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-[#3773B5]/10"
            >
              <span>{opt.label}</span>
              {value === opt.value && (
                <FiCheck className="text-xl text-[#3773B5]" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SimpleSelect;
