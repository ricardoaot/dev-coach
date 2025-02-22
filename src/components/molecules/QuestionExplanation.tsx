import ReactMarkdown from "react-markdown";
import MarkdownComponents from "../../helpers/MarkdownComponents";
import { QuestionExplanationProps } from "../../interfaces/interfaces";

const QuestionExplanation: React.FC<QuestionExplanationProps> = ({
  questionData,
}) => {
  return (
    <>
      <div className="border rounded-md py-4">
        <h1 className="mb-4 px-4 text-xl font-bold ">
          Explicación:
        </h1>
        <ReactMarkdown className={"px-4"} components={MarkdownComponents}>
          {questionData.explanation}
        </ReactMarkdown>
      </div>
    </>
  );
};

export default QuestionExplanation;
