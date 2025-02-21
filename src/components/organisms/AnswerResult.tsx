import { FC } from "react";

interface FeedbackProps {
  isValid: boolean;
  answer: string;
}

export const AnswerResult: FC<FeedbackProps> = ({ isValid, answer }) => {
  return (
    <div className="mb-5">
      <h3 className="text-lg font-semibold">
        {isValid
          ? "La Respuesta es Correcta ✅"
          : "La Respuesta fue Incorrecta ❌"}
      </h3>
      <p className="text-gray-600">{`La Respuesta correcta era: ${answer}`}</p>
    </div>
  );
};
