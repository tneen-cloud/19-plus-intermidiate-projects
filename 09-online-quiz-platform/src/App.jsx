import { useState } from 'react'
import './App.css'

function App() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correct: 2
    },
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correct: 1
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correct: 1
    }
  ]

  const handleAnswer = (index) => {
    setSelectedAnswer(index)
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setQuizStarted(false)
    }
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
  }

  if (!quizStarted) {
    return (
      <div className="quiz-app">
        <h1>Online Quiz Platform</h1>
        <div className="start-screen">
          <p>Test your knowledge with {questions.length} questions!</p>
          <button onClick={() => setQuizStarted(true)}>Start Quiz</button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  return (
    <div className="quiz-app">
      <div className="quiz-header">
        <div>Question {currentQuestion + 1} of {questions.length}</div>
        <div>Score: {score}</div>
      </div>
      <div className="question-card">
        <h2>{question.question}</h2>
        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option ${
                selectedAnswer === index
                  ? index === question.correct
                    ? 'correct'
                    : 'wrong'
                  : selectedAnswer !== null && index === question.correct
                  ? 'correct'
                  : ''
              }`}
              onClick={() => !selectedAnswer && handleAnswer(index)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
        {selectedAnswer !== null && (
          <button onClick={nextQuestion} className="next-btn">
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}
      </div>
      {!quizStarted && (
        <div className="result">
          <h2>Quiz Complete!</h2>
          <p>Your score: {score} / {questions.length}</p>
          <button onClick={resetQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  )
}

export default App

