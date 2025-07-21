import React from 'react';
import Confetti from 'react-confetti';
import { useQuiz } from '../store';

const ResultToast: React.FC = () => {
  const { state } = useQuiz();
  const perfect = state.score === state.questions.length;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {perfect && <Confetti numberOfPieces={200} recycle={false} />}
      </div>
    </div>
  );
};

export default ResultToast;
