import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useQuiz } from '../store';
import { Question } from '../types';

const shuffle = (arr: string[]) => arr.sort(() => Math.random() - 0.5);

const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  const { selectAnswer } = useQuiz();
  const [options, setOptions] = useState<string[]>([]);
  const [chosen, setChosen] = useState<string | null>(null);

  useEffect(() => {
    setOptions(shuffle([question.correct_answer, ...question.incorrect_answers]));
    setChosen(null);
  }, [question]);

  const handle = (opt: string) => {
    if (chosen) return;
    setChosen(opt);
    setTimeout(() => selectAnswer(opt), 1500);
  };

  const correct = chosen && question.correct_answer === chosen;

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto relative"
      initial={{ rotateY: 0 }}
      animate={{ rotateY: chosen ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="space-y-4" style={{ backfaceVisibility: 'hidden' }}>
        <h2 className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: question.question }} />
        <div className="grid gap-2">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => handle(opt)}
              className={`border rounded-md p-2 text-left transition-colors ${
                chosen
                  ? opt === question.correct_answer
                    ? 'bg-green-200'
                    : opt === chosen
                    ? 'bg-red-200'
                    : 'opacity-50'
                  : 'hover:bg-blue-100'
              }`}
              dangerouslySetInnerHTML={{ __html: opt }}
            />
          ))}
        </div>
      </div>
      {chosen && (
        <div
          className="absolute inset-0 flex flex-col justify-center items-center space-y-2"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <p className="text-3xl">{correct ? '✅' : '❌'}</p>
          {!correct && (
            <p className="text-center text-sm">Correct answer: {question.correct_answer}</p>
          )}
          <p className="text-center text-xs">{question.fact}</p>
        </div>
      )}
    </motion.div>
  );
};

export default QuestionCard;
