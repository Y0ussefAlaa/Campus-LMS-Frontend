import { createContext, useContext, useState } from "react";

type Question = {
  text: string;
  options: string[];
  correctAnswer: string;
  points: number;
};

export type Quiz = {
  courseId: string;
  title: string;
  dueDate: string;
  timeLimit: number;
  questionsNumber: number;
  questions: Question[];
};

type QuizContextType = {
  quiz: Quiz | null;
  setQuiz: React.Dispatch<React.SetStateAction<Quiz | null>>;
};

const QuizContext = createContext<QuizContextType | null>(null);

export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  return (
    <QuizContext.Provider value={{ quiz, setQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQuiz = () => {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("useQuiz must be used inside QuizProvider");
  }

  return context;
};
