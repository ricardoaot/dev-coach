import { useFormik } from "formik";
import { QuestionData } from "../molecules/QuestionForm";
// import { QuestionFormContent } from "../molecules/QuestionForm";
import { Button } from "../atoms/Button";
import preguntas from "../../assets/preguntas_completas_react.json"
export const QuestionForm: React.FC = () => {
    const questionData: QuestionData[] = preguntas
  
    console.log(questionData)
    const formik = useFormik({
      initialValues: {
        selectedOption: "",
      },
      onSubmit: (values) => {
        console.log(values)
        // if (values.selectedOption === "No sé") {
        //   const unknownQuestion = {
        //     question: questionData.question,
        //     selectedOption: values.selectedOption,
        //   };
        //   saveUnknownQuestionsToFile([unknownQuestion]);
        // }
        // alert(`Seleccionaste: ${values.selectedOption}`);
      },
    });
  
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
      <div className="p-4 max-w-lg mx-auto border rounded shadow">
        <form onSubmit={formik.handleSubmit}>
          
          {/* <QuestionFormContent
            questionData={questionData}
            selectedOption={formik.values.selectedOption}
            handleOptionChange={(option) => formik.setFieldValue("selectedOption", option)}
          /> */}
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
  