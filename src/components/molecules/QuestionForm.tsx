import { RadioInput } from "../atoms/inputs/RadioInput";
import ReactMarkdown from "react-markdown";
import MarkdownComponents from "../../helpers/MarkdownComponents";
import { QuestionFormContentProps } from "../../interfaces/interfaces";
import { useMemo } from "react";

export const QuestionFormContent: React.FC<QuestionFormContentProps> = ({
  questionData,
  selectedOption,
  handleOptionChange,
}) => {
    // Mezclar las opciones aleatoriamente con useMemo para evitar remezclado en cada render
    const shuffledOptions = useMemo(() => {
      return [...questionData.answerOptions].sort(() => Math.random() - 0.5);
    }, [questionData]);
  return (
    <>
      <h1 className="mb-4 text-xl font-bold">
        <ReactMarkdown components={MarkdownComponents}>
          {questionData.question}
        </ReactMarkdown>
        <hr />
      </h1>
      {shuffledOptions.map((option, index) => (
        <div key={index} className="flex items-start gap-2 mb-2">
          <div className="mt-1.5">
            <RadioInput
              option={option.option}
              selectedOption={selectedOption}
              onChange={handleOptionChange}
            />
          </div>
          <div className="w-full overflow-x-auto ">
            <ReactMarkdown  components={MarkdownComponents}>
              {option.option}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  );
};
