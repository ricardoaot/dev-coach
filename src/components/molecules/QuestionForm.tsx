import { RadioInput } from "../atoms/RadioInput";

interface AnswerOption {
    option: string;
    correct_answer: boolean;
  }

export interface QuestionData {
    question: string;
    explanation: string;
    question_level: string;
    question_last: string;
    topic: string;
    answer_options: AnswerOption[];
  }

  export interface UserAnswer{
    question:string;
    selectedOption:string;
    isCorrect : boolean;
  }


interface QuestionFormContentProps {
    questionData: QuestionData;
    selectedOption: string | null;
    handleOptionChange: (option: string) => void;
  }
  
export const QuestionFormContent: React.FC<QuestionFormContentProps> = ({ questionData, selectedOption, handleOptionChange }) => {
    return (
      <>
        <h1 className="text-xl font-bold mb-4">{questionData.question}</h1>
        {questionData.answer_options.map((option, index) => (
          <div key={index} className="mb-2">
            <RadioInput
              option={option.option}
              selectedOption={selectedOption}
              onChange={handleOptionChange}
            />
          </div>
        ))}
      </>
    );
  };