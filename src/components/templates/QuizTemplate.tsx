import { useState } from "react";
import QuestionExplanation from "../molecules/QuestionExplanation";
import { AnswerResult } from "../organisms/AnswerResult";
import { QuestionForm } from "../organisms/QuestionFormComponent";
import { QuestionData } from "../../interfaces/interfaces";
import preguntas from "../../assets/preguntas_completas_react.json";
const QuizTemplate = () => {
  const questionData: QuestionData[] = preguntas;
  const [showExplanation, setShowExplanation] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [currentQuestion, SetCurrentQuestion] = useState<QuestionData>();

  const getCurrentQuestion = (question: QuestionData) => {
    SetCurrentQuestion(question);
  };

  const correctAnswer = currentQuestion?.answerOptions.find(
    (r) => r.correctAnswer
  );
  return (
    <>
      <div className="flex flex-col w-full lg:w-[700px] overflow-auto mx-4 h-screen gap-4">
        {/* { Filtros} */}
        <div>Filtros q todavia no estan XD</div>

        {/* {componente form} */}
        <QuestionForm
          setIsValid={setIsValid}
          questionData={questionData}
          getQuestion={getCurrentQuestion}
          showExplanation={showExplanation}
          setShowExplanation={setShowExplanation}
        />

        {currentQuestion && (
          <>
            {/* {Feedback Answer} */}
            <div
              className={`mt-3  transform transition-all duration-500 ease-in-out-out ${
                showExplanation
                  ? "opacity-100 translate-y-0  pointer-events-auto"
                  : "opacity-0 -translate-y-4 h-0 pointer-events-none"
              }`}
            >
              <AnswerResult answer={correctAnswer?.option} isValid={isValid} />

              {/* {Explanation} */}

              <QuestionExplanation questionData={currentQuestion} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default QuizTemplate;
