import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export interface QuestionData {
  questionId: string;
  question: string;
  explanation: string;
  questionLevel: string;
  questionLast: string;
  topic: string;
  answerOptions: AnswerOption[];
}

interface AnswerOption {
  option: string;
  correctAnswer: boolean;
}

interface QuestionExplanationProps {
  questionData: QuestionData;
}

const QuestionExplanation: React.FC<QuestionExplanationProps> = ({
  questionData,
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
      <hr />
      <h1 className="mb-4 text-xl font-bold">Explicación:</h1>
      <ReactMarkdown components={markdownComponents}>
        {questionData.explanation}
      </ReactMarkdown>
    </>
  );
};

export default QuestionExplanation;
