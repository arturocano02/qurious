import fetch from 'cross-fetch';
import { Question } from './types';

const format = (data: any): Question[] =>
  data.results.map((q: any) => ({
    question: decodeURIComponent(q.question),
    correct_answer: decodeURIComponent(q.correct_answer),
    incorrect_answers: q.incorrect_answers.map((a: string) => decodeURIComponent(a)),
    difficulty: q.difficulty,
  }));

export const fetchQuestions = async (): Promise<Question[]> => {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const res = await fetch(`/daily/${today}.json`);
    if (res.ok) return (await res.json()) as Question[];
  } catch {}

  const res = await fetch(
    'https://opentdb.com/api.php?amount=5&category=24&type=multiple&encode=url3986'
  );
  const json = await res.json();
  const questions = format(json);
  const hardIdx = questions.findIndex(q => q.difficulty === 'hard');
  if (hardIdx > 0) {
    const [hardQ] = questions.splice(hardIdx, 1);
    questions.unshift(hardQ);
  }
  return questions;
};
