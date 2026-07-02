type QuestionCardProps = {
  question: string;
  options: string[];
  selectedOption?: string;
  onSelect: (option: string) => void;
  answer?: string;
  role: "take" | "view";
};

export default function QuizQuestion({
  question,
  options,
  selectedOption,
  onSelect,
  answer,
  role,
}: QuestionCardProps) {
  return (
    <div className="p-5 rounded-md max-w-2xl">
      <h2 className="text-lg font-semibold mb-6">{question}</h2>
      <div className="flex flex-col gap-5">
        {options.map((option) => {
          const isSelected =
            role === "take"
              ? selectedOption === option
              : option === selectedOption;

          const isCorrectAnswer = option === answer;
          const isStudentWrongAnswer =
            role === "view" &&
            option === selectedOption &&
            selectedOption !== answer;

          let optionStyle = "";
          if (role === "view") {
            if (isCorrectAnswer) {
              optionStyle = "text-green-600 font-bold";
            } else if (isStudentWrongAnswer) {
              optionStyle = "text-red-600 font-bold";
            }
          }

          return (
            <label
              key={option}
              className={`flex items-center gap-3 cursor-pointer ${optionStyle}`}
            >
              <input
                type="radio"
                name={question}
                checked={isSelected}
                onChange={() => {
                  if (role === "take") onSelect(option);
                }}
                disabled={role === "view"}
                className={`w-5 h-5 ${
                  role === "view"
                    ? isCorrectAnswer
                      ? "accent-green-600"
                      : isStudentWrongAnswer
                        ? "accent-red-600"
                        : "accent-gray-400"
                    : "accent-blue-600"
                }`}
              />
              <span className="font-semibold">{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
