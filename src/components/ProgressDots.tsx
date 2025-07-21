import React from 'react';
import { useQuiz } from '../store';

const ProgressDots: React.FC = () => {
  const { state } = useQuiz();
  return (
    <div className="flex justify-center space-x-2 my-4">
      {state.questions.map((_, idx) => (
        <div
          key={idx}
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressDots;
