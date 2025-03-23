import React, { useState, useEffect } from "react";
// import ReactConfetti from "react-confetti";
import { Trophy, ChevronRight, RotateCcw } from "lucide-react";

export default function QuizPlayer({ questions, onClose }) {
  console.log(questions,"ghhh")
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (showResults && score === questions.length) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showResults, score, questions.length]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    // console.log(selectedAnswer.trim()===questions[currentQuestion].answer.split(":")[1].trim())
    if (selectedAnswer.trim()===questions[currentQuestion].answer.split(":")[1].trim()) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || null);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setAnswers([]);
  };

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        {/* {showConfetti && <ReactConfetti />} */}
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <div className="text-center">
            <Trophy className={`w-16 h-16 mx-auto mb-4 ${percentage === 100 ? 'text-yellow-500' : 'text-gray-400'}`} />
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Quiz Complete!</h2>
            <p className="text-4xl font-bold mb-2 text-gray-900">{percentage}%</p>
            <p className="text-gray-600 mb-6">
              You got {score} out of {questions.length} questions correct
            </p>
            <div className="space-y-3">
              <button
                onClick={resetQuiz}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Try Again</span>
              </button>
              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-900">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <p className="text-gray-800">Score: {score}</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-6">
        {Object.keys(questions[currentQuestion]).filter(key => key.startsWith('question')).map(key => (
                              <p key={key} className="font-medium text-gray-800 mb-4">{questions[currentQuestion][key]}</p>
                            ))}
        </h3>

        <div className="space-y-3 mb-8">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                selectedAnswer === option
                  ? "bg-indigo-600 text-white shadow-lg scale-[1.02]"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-300 ${
              selectedAnswer
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <span>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
