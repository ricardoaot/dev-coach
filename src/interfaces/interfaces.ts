export interface QuestionData {
  questionId: string;
  question: string;
  explanation: string;
  questionLevel: string;
  questionLast: string;
  topic: string;
  answerOptions: AnswerOption[];
}

export interface AnswerOption {
  option: string;
  correctAnswer: boolean;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
  createdAt: Date;
}

export interface QuestionExplanationProps {
  questionData: QuestionData;
  isValid:boolean;
}

export interface QuestionFormContentProps {
  questionData: QuestionData;
  selectedOption: string | null;
  handleOptionChange: (option: string) => void;
}
