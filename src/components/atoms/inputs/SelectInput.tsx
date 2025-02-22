import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  selected?: SelectOption | null;
  onChange: (option: SelectOption) => void;
  placeholder?: string;
}

const SelectInput: React.FC<SelectProps> = ({
  options,
  selected,
  onChange,
  placeholder = "Select an option...",
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // Filtrar opciones basadas en el texto ingresado
  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  const handleList = () => {
    setIsOpen((prev) => {
      return !prev;
    });
  };

  return (
    <Combobox value={selected} onChange={onChange}>
      <div className="flex flex-col w-full">
        <div className="relative w-full  rounded-lg border">
          <ComboboxButton
            onClick={handleList}
            className="relative w-full "
          >
            <ComboboxInput
              className="w-full text-sm md:text-base py-1 px-4 -ml-3"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(option: SelectOption) => option?.label || ""}
              placeholder={placeholder}
              onBlur={(e) => {
                e.preventDefault();
                setIsOpen(false)
              }}
            />

            <span
              className={` absolute inset-y-0 right-0 flex items-center mr-2 pointer-events-none transition-all ease-in-out duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <ChevronDownIcon className="size-4 text-gray-500" />
            </span>
          </ComboboxButton>

          <ComboboxOptions className="absolute z-10 w-full mt-1 overflow-auto bg-white border rounded-lg shadow-lg max-h-60 focus:outline-none">
            {filteredOptions.length === 0 ? (
              <div className="p-2 text-sm text-gray-500">No options found</div>
            ) : (
              filteredOptions.map((option, index) => (
                <ComboboxOption
                  key={index}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer select-none p-2 ${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center gap-2">
                      {selected && <CheckIcon className="w-4 h-4" />}
                      <span className={`${selected ? "font-bold " : ""}`}>
                        {option.label}
                      </span>
                    </div>
                  )}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </div>
      </div>
    </Combobox>
  );
};

export default SelectInput;
