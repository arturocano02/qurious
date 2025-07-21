import { writeFile, mkdir } from 'fs/promises';
import fetch from 'cross-fetch';
import { Question } from '../src/types.js';

const today = new Date().toISOString().slice(0, 10);
const dir = new URL(`../public/daily/`, import.meta.url);

async function main() {
  await mkdir(dir, { recursive: true });
  const res = await fetch('https://opentdb.com/api.php?amount=5&category=24&type=multiple&encode=url3986');
  const json = await res.json();
  let questions: Question[] = json.results.map((q: any) => ({
    question: decodeURIComponent(q.question),
    correct_answer: decodeURIComponent(q.correct_answer),
    incorrect_answers: q.incorrect_answers.map((a: string) => decodeURIComponent(a)),
    difficulty: q.difficulty,
  }));
  const hardIdx = questions.findIndex(q => q.difficulty === 'hard');
  if (hardIdx > 0) {
    const [hardQ] = questions.splice(hardIdx, 1);
    questions.unshift(hardQ);
  }
  await writeFile(new URL(`${today}.json`, dir), JSON.stringify(questions, null, 2));
  console.log('Saved', today);
}

main();
