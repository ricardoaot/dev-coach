import { useFormik } from "formik";
import { QuestionData } from "../molecules/QuestionForm";
import { QuestionFormContent } from "../molecules/QuestionForm";
import { Button } from "../atoms/Button";
export const QuestionForm: React.FC = () => {
    const questionData: QuestionData = {
      question: "¿Qué es React?",
      explanation:
        "**React es una biblioteca de JavaScript de código abierto para construir interfaces de usuario.** Está basada en la componetización de la UI: la interfaz se divide en componentes independientes, que contienen su propio estado. Cuando el estado de un componente cambia, React vuelve a renderizar la interfaz.\n\nEsto hace que React sea una herramienta muy útil para construir interfaces complejas, ya que permite dividir la interfaz en piezas más pequeñas y reutilizables.\n\nFue creada en 2011 por Jordan Walke, un ingeniero de software que trabajaba en Facebook y que quería simplificar la forma de crear interfaces de usuario complejas.\n\nEs una biblioteca muy popular y es usada por muchas empresas como Facebook, Netflix, Airbnb, Twitter, Instagram, etc.\n\nEnlaces de interés:\n\n- [Curso de React.js](https://midu.link/react)\n- [Documentación oficial de React en Español](https://es.reactjs.org/)\n- [Introduction to React.js de Facebook (2013)](https://www.youtube.com/watch?v=XxVg_s8xAms)\n- [Documentación oficial de React actualizada](https://beta.reactjs.org/) en inglés\n\n**[⬆ Volver a índice](#índice)**\n\n---",
      question_level: "Principiante",
      question_last: "regular",
      topic: "React web",
      answer_options: [
        {
          option:
            "**React es una biblioteca de JavaScript de código abierto para construir interfaces de usuario",
          correct_answer: true,
        },
        {
          option: "Es un método para mejorar la velocidad de la aplicación.",
          correct_answer: false,
        },
        {
          option: "Un estándar de JavaScript para manipular la UI.",
          correct_answer: false,
        },
        {
          option: "Una herramienta exclusiva de React Native.",
          correct_answer: false,
        },
        {
          option: "No sé",
          correct_answer: false,
        },
      ],
    };
  
    const formik = useFormik({
      initialValues: {
        selectedOption: "",
      },
      onSubmit: (values) => {
        if (values.selectedOption === "No sé") {
          const unknownQuestion = {
            question: questionData.question,
            selectedOption: values.selectedOption,
          };
          saveUnknownQuestionsToFile([unknownQuestion]);
        }
        alert(`Seleccionaste: ${values.selectedOption}`);
      },
    });
  
    const saveUnknownQuestionsToFile = (questions: { question: string; selectedOption: string }[]) => {
      const fileData = JSON.stringify(questions, null, 2);
      const blob = new Blob([fileData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "unknown_questions.json";
      link.click();
    };
  
    return (
      <div className="p-4 max-w-lg mx-auto border rounded shadow">
        <form onSubmit={formik.handleSubmit}>
          <QuestionFormContent
            questionData={questionData}
            selectedOption={formik.values.selectedOption}
            handleOptionChange={(option) => formik.setFieldValue("selectedOption", option)}
          />
          <Button
            type="submit"
            className="mt-4 bg-blue-500 text-white"
          >
            Enviar
            </Button>
        </form>
      </div>
    );
  };
  