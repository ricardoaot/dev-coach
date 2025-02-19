import { RadioInput } from "../atoms/RadioInput";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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

export interface UserAnswer {
  question: string;
  selectedOption: string;
  isCorrect: boolean;
}

interface QuestionFormContentProps {
  questionData: QuestionData;
  selectedOption: string | null;
  handleOptionChange: (option: string) => void;
}

export const QuestionFormContent: React.FC<QuestionFormContentProps> = ({
  questionData,
  selectedOption,
  handleOptionChange,
}) => {
  const markdownComponents: Components = {
    code: ({ className, children }) => {
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div">
          {String(children).trim()}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-gray-300 px-1.5 py-0.5 rounded font-mono text-sm text-sky-600">
          {children}
        </code>
      );
    },
  };

  return (
    <>
      <h1 className="mb-4 text-xl font-bold">
        <ReactMarkdown components={markdownComponents}>
          {questionData.question}
        </ReactMarkdown>
        <hr />
      </h1>
      {questionData.answer_options.map((option, index) => (
        <div key={index} className="flex items-start gap-2 mb-2">
          <div className="mt-1.5">
            <RadioInput
              option={option.option}
              selectedOption={selectedOption}
              onChange={handleOptionChange}
            />
          </div>
          <div className="flex-1">
            <ReactMarkdown components={markdownComponents}>
              {option.option}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  );
};
