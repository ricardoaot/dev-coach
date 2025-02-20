import { RadioInput } from "../atoms/RadioInput";
import ReactMarkdown from "react-markdown";
import MarkdownComponents from "../../helpers/MarkdownComponents";
import { QuestionFormContentProps } from "../../interfaces/interfaces";

export const QuestionFormContent: React.FC<QuestionFormContentProps> = ({
  questionData,
  selectedOption,
  handleOptionChange,
}) => {
  return (
    <>
      <h1 className="mb-4 text-xl font-bold">
        <ReactMarkdown components={MarkdownComponents}>
          {questionData.question}
        </ReactMarkdown>
        <hr />
      </h1>
      {questionData.answerOptions.map((option, index) => (
        <div key={index} className="flex items-start gap-2 mb-2">
          <div className="mt-1.5">
            <RadioInput
              option={option.option}
              selectedOption={selectedOption}
              onChange={handleOptionChange}
            />
          </div>
          <div className="flex-1">
            <ReactMarkdown components={MarkdownComponents}>
              {option.option}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  );
};
