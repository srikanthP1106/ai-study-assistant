function ProgressBar({ currentQuestion, totalQuestions }) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-300 mb-2">
        <span>
          Question {currentQuestion + 1} of {totalQuestions}
        </span>

        <span>{Math.round(progress)}%</span>
      </div>

      <div className="w-full bg-slate-600 rounded-full h-3">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;