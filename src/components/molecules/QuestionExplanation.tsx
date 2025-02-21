import ReactMarkdown from "react-markdown";
import MarkdownComponents from "../../helpers/MarkdownComponents";
import { QuestionExplanationProps } from "../../interfaces/interfaces";
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";
import { cleanText } from "../../helpers/cleanTextForTTS";

const QuestionExplanation: React.FC<QuestionExplanationProps> = ({
  questionData,
}) => {
  const { speakText, stopSpeaking, isSpeaking } = useSpeechSynthesis();

  return (
    <>
      <hr />
      <h1 className="mb-4 text-xl font-bold">Explicación:</h1>
      <ReactMarkdown components={MarkdownComponents}>
        {questionData.explanation}
      </ReactMarkdown>
      <div className="flex gap-2 mt-4">
        {isSpeaking ? (
          <button
            onClick={stopSpeaking}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            ⛔ Detener
          </button>
        ) : (
          <button
            onClick={() => speakText(cleanText(questionData.explanation))}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            🔊 Escuchar
          </button>
        )}
      </div>
    </>
  );
};

export default QuestionExplanation;
