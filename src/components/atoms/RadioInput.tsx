
interface RadioButtonProps {
    option: string;
    selectedOption: string | null;
    onChange: (option: string) => void;
  }
  
export const RadioInput: React.FC<RadioButtonProps> = ({ option, selectedOption, onChange }) => {
    return (
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          name="answer"
          value={option}
          onChange={() => onChange(option)}
          checked={selectedOption === option}
          className="form-radio"
        />
        <span>{option}</span>
      </label>
    );
  };
  