import { Form, Formik } from "formik";
import { QuestionData } from "../molecules/QuestionForm";
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

  const handleOptionChange = (optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questionData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Avanza a la siguiente pregunta
    } else {
      console.log("Respuestas finales:", selectedOptions); // Procesa respuestas al finalizar
      alert("Has completado todas las preguntas.");
    }
  };

  const currentQuestion = questionData[currentQuestionIndex];

  // if (values.selectedOption === "No sé") {
  //   const unknownQuestion = {
  //     question: values.question,
  //     selectedOption: values.selectedOption,
  //   };
  //   saveUnknownQuestionsToFile([unknownQuestion]);
  // }
  // alert(`Seleccionaste: ${values.selectedOption}`);

  // const saveUnknownQuestionsToFile = (questions: { question: string; selectedOption: string }[]) => {
  //   const fileData = JSON.stringify(questions, null, 2);
  //   const blob = new Blob([fileData], { type: "application/json" });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "unknown_questions.json";
  //   link.click();
  // };

  return (
    <Formik
      initialValues={{
        selectedOption: "",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ isSubmitting }) => (
        <div className="max-w-lg p-4 mx-auto border rounded shadow">
          <Form>
            <QuestionFormContent
              questionData={currentQuestion}
              selectedOption={selectedOptions[currentQuestionIndex] || ""}
              handleOptionChange={handleOptionChange}
            />
            <div className="flex justify-center space-x-4">
              <Button type="submit" className="mt-4 text-white bg-blue-500">
                Guardar
              </Button>
              <Button
                type="button"
                className="mt-4 text-white bg-blue-500"
                disabled={isSubmitting}
                onClick={handleNext}
              >
                {currentQuestionIndex < questionData.length - 1
                  ? "Siguiente"
                  : "Finalizar"}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
