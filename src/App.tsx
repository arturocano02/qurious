import React, { useEffect } from 'react';
import QuestionCard from './components/QuestionCard';
import ProgressDots from './components/ProgressDots';
import ResultToast from './components/ResultToast';
import { QuizProvider, useQuiz } from './store';
import { fetchQuestions } from './api';

const Quiz: React.FC = () => {
  const { state, setQuestions } = useQuiz();

  useEffect(() => {
    if (state.loaded || state.questions.length) return;
    fetchQuestions().then(setQuestions);
  }, [state]);

  if (!state.loaded && !state.questions.length) return <p className="p-4">Loading...</p>;

  const currentQuestion = state.questions[state.current];

  if (!currentQuestion) return <ResultToast />;

  return (
    <div className="p-4">
      <ProgressDots />
      <QuestionCard question={currentQuestion} />
    </div>
  );
};

const App: React.FC = () => (
  <QuizProvider>
    <Quiz />
  </QuizProvider>
);

export default App;
