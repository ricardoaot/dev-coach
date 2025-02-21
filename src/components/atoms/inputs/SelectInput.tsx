import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

interface SelectOption {
  id: string | number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  selected: SelectOption | null;
  onChange: (option: SelectOption) => void;
  placeholder?: string;
}

const SelectInput: React.FC<SelectProps> = ({ options, selected, onChange, placeholder = "Select an option..." }) => {
  const [query, setQuery] = useState("");

  // Filtrar opciones basadas en el texto ingresado
  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox value={selected} onChange={onChange}>
      <div className="relative">
        <ComboboxInput
          className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(option: SelectOption) => option?.label || ""}
          placeholder={placeholder}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronUpDownIcon className="w-5 h-5 text-gray-500" />
        </ComboboxButton>

        <ComboboxOptions className="absolute z-10 w-full mt-1 overflow-auto bg-white border rounded-lg shadow-lg max-h-60 focus:outline-none">
          {filteredOptions.length === 0 ? (
            <div className="p-2 text-sm text-gray-500">No options found</div>
          ) : (
            filteredOptions.map((option) => (
              <ComboboxOption
                key={option.id}
                value={option}
                className={({ active }) =>
                  `cursor-pointer select-none p-2 ${
                    active ? "bg-blue-500 text-white" : "text-gray-900"
                  }`
                }
              >
                {({ selected, active }) => (
                  <div className="flex items-center gap-2">
                    {selected && <CheckIcon className="w-4 h-4" />}
                    <span className={`${selected ? "font-bold" : ""}`}>
                      {option.label}
                    </span>
                  </div>
                )}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};

export default SelectInput;
