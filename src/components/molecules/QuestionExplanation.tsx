import ReactMarkdown from "react-markdown";
import MarkdownComponents from "../../helpers/MarkdownComponents";
import { QuestionExplanationProps } from "../../interfaces/interfaces";

const QuestionExplanation: React.FC<QuestionExplanationProps> = ({
  questionData,
  isValid
}) => {
  return (
    <>
      <hr />
      <h3 className="mb-5">{isValid ? "La Respuesta es Correcta ✅":"La Respuesta fue Incorrenta ❌"}  </h3>
      <h1 className="mb-4 text-xl font-bold">Explicación:</h1>
      <ReactMarkdown components={MarkdownComponents}>
        {questionData.explanation}
      </ReactMarkdown>
    </>
  );
};

export default QuestionExplanation;
