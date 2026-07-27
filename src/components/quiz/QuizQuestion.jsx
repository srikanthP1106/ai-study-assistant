function QuizQuestion({
  question,
  selectedOption,
  setSelectedOption,
  showAnswer,
  onSubmit,
  onNext,
}) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">
         {question.question}
      </h3>

      {question.options.map((option, index) => {
        let optionStyle =
          "block w-full text-left bg-slate-600 hover:bg-slate-500 rounded-lg p-4 mb-3 cursor-pointer transition";

        if (showAnswer) {
          if (option === question.correctAnswer) {
            optionStyle =
              "block w-full text-left bg-green-600 rounded-lg p-4 mb-3";
          } else if (
            option === selectedOption &&
            selectedOption !== question.correctAnswer
          ) {
            optionStyle =
              "block w-full text-left bg-red-600 rounded-lg p-4 mb-3";
          }
        }

        return (
          <label key={index} className={optionStyle}>
            <input
              type="radio"
              name="quizOption"
              value={option}
              checked={selectedOption === option}
              disabled={showAnswer}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="mr-3"
            />

            {option}
          </label>
        );
      })}

      {!showAnswer ? (
        <button
          onClick={onSubmit}
          className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
        >
          Submit Answer
        </button>
      ) : (
        <button
          onClick={onNext}
          className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
        >
          Next Question →
        </button>
      )}
    </div>
  );
}

export default QuizQuestion;