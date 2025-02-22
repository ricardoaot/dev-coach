import { useCallback, useMemo, useState } from "react";
import QuestionExplanation from "../molecules/QuestionExplanation";
import { AnswerResult } from "../organisms/AnswerResult";
import { QuestionForm } from "../organisms/QuestionFormComponent";
import { QuestionData } from "../../interfaces/interfaces";
// import preguntas from "../../assets/preguntas_completas_react.json";
import Filters from "../organisms/Filters";
const QuizTemplate = () => {
  // const questionData: QuestionData[] = preguntas;
  const [showExplanation, setShowExplanation] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [questionData, setQuestionData] = useState<QuestionData[]>([]);
  const [currentQuestion, SetCurrentQuestion] = useState<QuestionData>();
  const memoizedQuestionData = useMemo(() => questionData, [questionData]);

  const getCurrentQuestion = (question: QuestionData) => {
    SetCurrentQuestion(question);
  };

  const correctAnswer = currentQuestion?.answerOptions.find(
    (r) => r.correctAnswer
  );
    // Recibe la data de `Filters`
    const handleDataChange = useCallback((data: QuestionData[]) => {
      if (JSON.stringify(data) !== JSON.stringify(questionData)) {
        console.log("me estoy ejecutando");
        setQuestionData(data);
      }
    }, [questionData]);
    
    console.log(questionData)
  return (
    <>
      <div className="flex flex-col w-full  sm:w-[500px] md:w-[500px] overflow-auto mx-4  gap-4">
        {/* { Filtros} */}
        <Filters onDataChange={handleDataChange}></Filters>

        {/* {componente form} */}

       {memoizedQuestionData && memoizedQuestionData.length > 0 ? (
          <QuestionForm
            setIsValid={setIsValid}
            questionData={questionData}
            getQuestion={getCurrentQuestion}
            showExplanation={showExplanation}
            setShowExplanation={setShowExplanation}
          />
        ) : (
          <p className="text-center text-gray-500">Selecciona un cuestionario para comenzar</p>
        )}

        {currentQuestion && (
          <>
            {/* {Feedback Answer} */}
            <div
              className={`mt-3 w-full transform transition-all duration-500 ease-in-out-out ${
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
