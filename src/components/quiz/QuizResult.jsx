function QuizResult({ score, totalQuestions }) {
  const percentage = Math.round((score / totalQuestions) * 100);

  let message = "";
  let emoji = "";

  if (percentage >= 90) {
    emoji = "🏆";
    message = "Excellent!";
  } else if (percentage >= 70) {
    emoji = "🎉";
    message = "Great Job!";
  } else if (percentage >= 50) {
    emoji = "👍";
    message = "Good Effort!";
  } else {
    emoji = "📚";
    message = "Keep Practicing!";
  }

  return (
    <div className="bg-slate-800 rounded-xl p-8 text-center">

      <h2 className="text-4xl font-bold text-green-400 mb-6">
        🎉 Quiz Completed
      </h2>

      <p className="text-2xl mb-4">
        Your Score
      </p>

      <h1 className="text-6xl font-bold text-white">
        {score} / {totalQuestions}
      </h1>

      <p className="text-2xl text-blue-400 mt-6">
        {percentage}%
      </p>

      <p className="text-3xl mt-6">
        {emoji} {message}
      </p>

    </div>
  );
}

export default QuizResult;