
import React from 'react';
import { Question, DiagnosisType } from '../types';

interface QuizViewProps {
  question: Question;
  currentIdx: number;
  total: number;
  onAnswer: (type: DiagnosisType) => void;
  onBack: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ question, currentIdx, total, onAnswer, onBack }) => {
  const progress = ((currentIdx + 1) / total) * 100;

  return (
    <div className="military-border bg-gray-900/90 p-6 md:p-10 rounded-sm shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-mono text-orange-500 font-bold tracking-widest">
          QUESTION {String(currentIdx + 1).padStart(2, '0')} / {total}
        </span>
        <button 
          onClick={onBack}
          className="text-[10px] text-gray-500 hover:text-orange-500 underline underline-offset-4"
        >
          PREV STEP
        </button>
      </div>

      <div className="w-full h-1 bg-gray-800 mb-8 rounded-full overflow-hidden">
        <div 
          className="h-full bg-orange-500 transition-all duration-300 shadow-[0_0_10px_#f97316]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <h2 className="text-xl md:text-2xl font-bold mb-10 text-white leading-relaxed">
        {question.text}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(option.type)}
            className="group relative flex items-center p-4 bg-gray-800 hover:bg-orange-600/20 border border-gray-700 hover:border-orange-500 rounded transition-all text-left overflow-hidden"
          >
            <span className="mr-4 w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gray-700 group-hover:bg-orange-500 group-hover:text-black font-mono font-bold rounded text-sm transition-colors">
              {idx + 1}
            </span>
            <span className="text-gray-200 group-hover:text-white font-medium">
              {option.text}
            </span>
            <div className="absolute right-0 bottom-0 p-1 opacity-0 group-hover:opacity-20">
              <svg className="w-12 h-12 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizView;
