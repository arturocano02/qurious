import React from 'react';
import Confetti from 'react-confetti';
import { useQuiz } from '../store';

const ResultToast: React.FC = () => {
  const { state } = useQuiz();
  const perfect = state.score === state.questions.length;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {perfect && <Confetti numberOfPieces={200} recycle={false} />}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <p className="text-lg font-semibold text-center">
          You scored {state.score}/5!
        </p>
      </div>
    </div>
  );
};

export default ResultToast;
