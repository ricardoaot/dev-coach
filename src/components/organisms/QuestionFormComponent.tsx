import { Form, Formik } from "formik";
import { QuestionData, UserAnswer } from "../../interfaces/interfaces";
import { QuestionFormContent } from "../molecules/QuestionForm";
import { Button } from "../atoms/Button";
import preguntas from "../../assets/preguntas_completas_react.json";
import { useState } from "react";
import QuestionExplanation from "../molecules/QuestionExplanation";

export const QuestionForm: React.FC = () => {
  const questionData: QuestionData[] = preguntas;

  const [showExplanation, setShowExplanation] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Controla la pregunta actual
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({}); // Guarda las respuestas seleccionadas
  const [responses, setResponses] = useState<UserAnswer[]>([]);
  const handleOptionChange = (optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionId,
    }));
  };

  const handleNext = () => {
    const currentQuestion = questionData[currentQuestionIndex];
    const selectedOption = selectedOptions[currentQuestionIndex];

    if (selectedOption) {
      const isCorrect = currentQuestion.answerOptions.some(
        (option) => option.correctAnswer && option.option === selectedOption
      ); // Lógica para determinar si la respuesta es correcta
      const newAnswer: UserAnswer = {
        questionId: currentQuestion.questionId,
        selectedOption,
        isCorrect,
        createdAt: new Date(),
      };

      // Guardar la respuesta
      setResponses((prev) => [...prev, newAnswer]);
    }

    // Avanzar a la siguiente pregunta o procesar las respuestas finales
    if (currentQuestionIndex < questionData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Avanza a la siguiente pregunta
    } else {
      console.log("Respuestas finales:", responses);
      alert("Has completado todas las preguntas.");
    }
  };

  //   // Filtra solo las preguntas respondidas y verifica si la respuesta es correcta
  //   const responses: UserAnswer[] = questionData
  //     .map((question, index) => {
  //       if (selectedOptions[index]) {
  //         const isCorrect = selectedOptions[index] === ; // Verifica si la respuesta es correcta
  //         return {
  //           question: question.question,
  //           selectedOption: selectedOptions[index],
  //           isCorrect: isCorrect,
  //         };
  //       }
  //       return null; // No incluye preguntas no respondidas
  //     })
  //     .filter((response) => response !== null); // Elimina preguntas saltadas

  //   try {
  //     await axios.post("/api/saveResponses", responses);
  //     console.log("Respuestas guardadas en el servidor.");
  //   } catch (error) {
  //     console.error("Error al guardar respuestas:", error);
  //   }

  // };
  const currentQuestion = questionData[currentQuestionIndex];

  const handleSkip = () => {
    // Simplemente avanza a la siguiente pregunta sin guardar la respuesta actual
    if (currentQuestionIndex < questionData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("Has completado todas las preguntas.");
    }
  };

  const saveAnswer = (question: UserAnswer): void => {
    // Recuperar las respuestas guardadas como string desde localStorage
    const answerSaved = localStorage.getItem("respuestasUsuario");

    // Convertir el string JSON a un array de UserAnswer o inicializar como un array vacío
    const answers: UserAnswer[] = answerSaved
      ? (JSON.parse(answerSaved) as UserAnswer[])
      : [];

    // Agregar la nueva respuesta al array
    answers.push(question);

    // Guardar el array actualizado en localStorage
    localStorage.setItem("respuestasUsuario", JSON.stringify(answers));
  };
  return (
    <Formik
      initialValues={{
        selectedOption: "",
      }}
      enableReinitialize={true} // Esto permite que el formulario se reinicie cuando cambian las props
      onSubmit={(values, { resetForm }) => {
        // Agregamos resetForm a los parámetros
        if (values.selectedOption === "") {
          alert("Debes seleccionar una respuesta para continuar");
          return;
        }

        if (!showExplanation) {
          const correctAnswer = currentQuestion.answerOptions.find(
            (r) => r.correctAnswer === true
          );
          const isValid = values.selectedOption === correctAnswer?.option;
          console.log(isValid);
          // Guarda la respuesta seleccionada
          handleOptionChange(values.selectedOption);
          const newAnswer: UserAnswer = {
            questionId: currentQuestion.questionId,
            selectedOption: values.selectedOption,
            isCorrect: isValid,
            createdAt: new Date(),
          };
          saveAnswer(newAnswer);
          //* Primero mostramos la explicación
          setShowExplanation(true);
        } else {
          //* Ya se mostró la explicación, avanzamos a la siguiente pregunta
          setShowExplanation(false);
          resetForm(); // Reseteamos el formulario antes de pasar a la siguiente pregunta
          handleNext();
        }
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <div className="max-w-2xl p-4 mx-auto border rounded shadow">
          <Form onSubmit={handleSubmit}>
            <QuestionFormContent
              questionData={currentQuestion}
              selectedOption={values.selectedOption}
              handleOptionChange={(optionId: string) => {
                handleChange({
                  target: { name: "selectedOption", value: optionId },
                });
              }}
            />
            <div className="flex items-center gap-2 mt-4">
              <input
                type="radio"
                id="no-se"
                name="selectedOption"
                value="No sé"
                onChange={(e) => handleChange(e)}
                checked={values.selectedOption === "No sé"}
              />
              <label htmlFor="no-se">No sé</label>
            </div>
            <div className="flex justify-between mt-4">
              <Button
                type="button"
                className={`text-white bg-gray-500   ${
                  showExplanation
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
                onClick={handleSkip}
              >
                Skip
              </Button>
              <Button
                type="submit"
                className="text-white bg-blue-500"
                disabled={!values.selectedOption}
              >
                {showExplanation
                  ? currentQuestionIndex < questionData.length - 1
                    ? "Siguiente"
                    : "Finalizar"
                  : "Confirmar Respuesta"}
              </Button>
            </div>
          </Form>
          {showExplanation && (
            <div className="mt-3">
              <QuestionExplanation questionData={currentQuestion} />
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};
