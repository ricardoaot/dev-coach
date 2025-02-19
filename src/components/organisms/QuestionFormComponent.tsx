import { Form, Formik } from "formik";
import { QuestionData, UserAnswer } from "../molecules/QuestionForm";
import { QuestionFormContent } from "../molecules/QuestionForm";
import { Button } from "../atoms/Button";
import preguntas from "../../assets/preguntas_completas_react.json";
import { useState } from "react";

export const QuestionForm: React.FC = () => {
  const questionData: QuestionData[] = preguntas;

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
      const isCorrect = currentQuestion.answer_options.some((option) => option.correct_answer && option.option === selectedOption); // Lógica para determinar si la respuesta es correcta
      const newAnswer: UserAnswer = {
        question: currentQuestion.question,
        selectedOption,
        isCorrect,
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

  return (
    <Formik
      initialValues={{
        selectedOption: "",
      }}
      onSubmit={(values, { resetForm }) => {
        console.log("Respuesta guardada:", values.selectedOption);

        // Guarda la respuesta seleccionada
        handleOptionChange(values.selectedOption);

        // Limpia el formulario para la siguiente pregunta
        resetForm();

        // Avanza a la siguiente pregunta
        if(values.selectedOption === ""){
          alert("Debes seleccionar una respuesta para continuar");
          return;
        }
        handleNext();
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <div className="p-4 max-w-lg mx-auto border rounded shadow">
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
                className="bg-gray-500 text-white"
                onClick={handleSkip}
              >
                Skip
              </Button>

              <Button
                type="submit"
                className="bg-blue-500 text-white"
                disabled={!values.selectedOption}
              >
                {currentQuestionIndex < questionData.length - 1
                  ? "Guardar y Siguiente"
                  : "Finalizar"}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
