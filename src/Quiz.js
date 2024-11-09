import React, { useState, useEffect } from "react";
import questions from "./data";
import Result from "./Result";
import "./Quiz.css";

// Fisher-Yates Shuffle Algorithm
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    // Shuffle questions on component load
    setQuizQuestions(shuffleArray(questions));
  }, []);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="quiz">
      {showResult ? (
        <Result score={score} total={quizQuestions.length} />
      ) : (
        <div>
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <h2>{quizQuestions[currentQuestion]?.questionText}</h2>
          {quizQuestions[currentQuestion]?.answerOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerOptionClick(option.isCorrect)}
            >
              {option.answerText}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
