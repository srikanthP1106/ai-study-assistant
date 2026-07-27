import { useState } from "react";
import ProgressBar from "./ProgressBar";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";

function Quiz({ quiz }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  console.log("Quiz component rendered");
console.log("Current Question:", currentQuestion);
console.log("Quiz Length:", quiz.length);

  const current = quiz[currentQuestion];

  const handleSubmit = () => {
    if (!selectedOption) {
      alert("Please select an answer.");
      return;
    }

    if (selectedOption === current.correctAnswer) {
      setScore(score + 1);
    }

    setShowAnswer(true);
  };

  const handleNext = () => {
    if (currentQuestion + 1 < quiz.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
      setShowAnswer(false);
    } else {
      setShowAnswer(false);
      setCurrentQuestion(quiz.length);
    }
  };

  if (currentQuestion === quiz.length) {
    return (
      <QuizResult
        score={score}
        totalQuestions={quiz.length}
      />
    );
  }

  return (
    <div className="bg-slate-700 rounded-xl p-6 mt-8">

      <ProgressBar
        currentQuestion={currentQuestion}
        totalQuestions={quiz.length}
      />

      <QuizQuestion
        question={current}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        showAnswer={showAnswer}
        onSubmit={handleSubmit}
        onNext={handleNext}
      />

      <p className="mt-6 text-green-400 font-semibold">
         Score: {score}
      </p>

    </div>
  );
}

export default Quiz;