"use client"

import React, { useState, useEffect } from "react";
import shuffle from "lodash/shuffle";
import Question from "./Question";
import Timer from "./Timer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Quiz = ({ data }) => {


  const router = useRouter()

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [progress, setProgress] = useState(0);
  const [quizzesTaken, setQuizzesTaken] = useState(0);
  const [quizzesLeft, setQuizzesLeft] = useState(data?.length);

  // Shuffle questions and initialize state when component mounts
  useEffect(() => {
    setQuestions(shuffle(data));
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizOver(false);
    setShowFeedback(false);
    setAnsweredQuestions([]);
    setProgress(0);
    setQuizzesTaken(0);
    setQuizzesLeft(data?.length);
  }, [data]);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex]?.answer) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect.");
    }
    setShowFeedback(true);
    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);

    // Move to the next question
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setIsQuizOver(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setShowFeedback(false);
      setProgress((prevProgress) => prevProgress + 1);
    }
  };

  const handleSkipQuestion = () => {
    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
    handleNextQuestion();
  };

  const handleTimeUp = () => {
    setIsQuizOver(true);
  };

  useEffect(() => {
    // Update quizzesTaken and quizzesLeft when questions change
    setQuizzesTaken(answeredQuestions.length);
    setQuizzesLeft(questions.length - answeredQuestions.length);
  }, [answeredQuestions, questions]);

  return (
    <div>
      <div className="w-2/3 gap-x-3 flex justify-between">
        <p>Quizzes taken: {quizzesTaken}</p>
        <p>Quizzes left: {quizzesLeft}</p>
      </div>
      {isQuizOver ? (
        <div className="grid gap-y-3">
          <h1>Quiz Over!</h1>
          <p>Your score: {score}</p>

          <Button
            className="bg-purple w-fit"
            onClick={() => router.push("/contest")}
          >
           Go home
          </Button>
        </div>
      ) : (
        <div className="w-full grid gap-x-5">
          <Timer timeLimit={120} handleTimeUp={handleTimeUp} />
          <div className="bg-gray-200 h-4 mb-4 w-5/6">
            <div
              className="bg-green-500 h-full w-4/5"
              style={{ width: `${(progress / questions.length) * 100}%` }}
            ></div>
          </div>
          <Question
            question={questions[currentQuestionIndex]?.question}
            answers={
              questions[currentQuestionIndex]
                ? [
                    questions[currentQuestionIndex]?.answer,
                    ...(questions[currentQuestionIndex]?.wrong_answers || []),
                  ]
                : []
            }
            handleAnswer={handleAnswer}
          />

          {showFeedback && <p>{feedback}</p>}
          <div className="w-full flex justify-end">

          <Button onClick={handleSkipQuestion} className="mr-2 mt-4 w-fit flex justify-end">
            Skip
          </Button>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
