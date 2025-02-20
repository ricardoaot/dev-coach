import ReactMarkdown from "react-markdown";
import MarkdownComponents from "../../helpers/MarkdownComponents";
import { QuestionExplanationProps } from "../../interfaces/interfaces";

const QuestionExplanation: React.FC<QuestionExplanationProps> = ({
  questionData,
}) => {
  return (
    <>
      <hr />
      <h1 className="mb-4 text-xl font-bold">Explicación:</h1>
      <ReactMarkdown components={MarkdownComponents}>
        {questionData.explanation}
      </ReactMarkdown>
    </>
  );
};

export default QuestionExplanation;
