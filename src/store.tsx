import React, { useState, useEffect, createContext, useContext } from 'react';
import { Question } from './types';

interface QuizState {
  questions: Question[];
  current: number;
  score: number;
  answers: string[];
  loaded: boolean;
}

const QuizContext = createContext<{
  state: QuizState;
  selectAnswer: (answer: string) => void;
  setQuestions: (qs: Question[]) => void;
}>({} as any);

export const useQuiz = () => useContext(QuizContext);

const todayKey = () => new Date().toISOString().slice(0, 10);

const loadStored = (): QuizState => {
  const raw = localStorage.getItem('qurious-' + todayKey());
  if (raw) return JSON.parse(raw);
  return { questions: [], current: 0, score: 0, answers: [], loaded: false };
};

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<QuizState>(loadStored());

  useEffect(() => {
    localStorage.setItem('qurious-' + todayKey(), JSON.stringify(state));
  }, [state]);

  const selectAnswer = (answer: string) => {
    if (!state.questions[state.current]) return;
    const correct = state.questions[state.current].correct_answer === answer;
    setState(s => ({
      ...s,
      score: correct ? s.score + 1 : s.score,
      answers: [...s.answers, answer],
      current: s.current + 1
    }));
  };

  const setQuestions = (qs: Question[]) => {
    setState({ questions: qs, current: 0, score: 0, answers: [], loaded: true });
  };

  return (
    <QuizContext.Provider value={{ state, selectAnswer, setQuestions }}>
      {children}
    </QuizContext.Provider>
  );
};
