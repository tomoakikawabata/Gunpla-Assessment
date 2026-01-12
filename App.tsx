
import React, { useState, useEffect, useCallback } from 'react';
import { AppState, DiagnosisType, ResultContent } from './types';
import { QUESTIONS, RESULTS } from './constants';
import HomeView from './components/HomeView';
import QuizView from './components/QuizView';
import ResultView from './components/ResultView';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.HOME);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<DiagnosisType[]>([]);
  const [result, setResult] = useState<ResultContent | null>(null);

  // Direct access via URL query ?t=A
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('t') as DiagnosisType;
    if (type && RESULTS[type]) {
      setResult(RESULTS[type]);
      setState(AppState.RESULT);
    }
  }, []);

  const handleStart = () => {
    console.log('event: start_click');
    setAnswers([]);
    setCurrentQuestion(0);
    setState(AppState.QUIZ);
  };

  const handleAnswer = (type: DiagnosisType) => {
    console.log(`event: answer_selected (Q${currentQuestion + 1}, ${type})`);
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setAnswers(prev => prev.slice(0, -1));
    } else {
      setState(AppState.HOME);
    }
  };

  const calculateResult = (finalAnswers: DiagnosisType[]) => {
    const counts: Record<DiagnosisType, number> = { A: 0, B: 0, C: 0, D: 0 };
    finalAnswers.forEach(ans => counts[ans]++);

    // Determine max score, priority A > B > C > D
    const winner = (['A', 'B', 'C', 'D'] as DiagnosisType[]).reduce((a, b) => 
      counts[a] >= counts[b] ? a : b
    );

    const resultData = RESULTS[winner];
    setResult(resultData);
    setState(AppState.RESULT);
    console.log(`event: result_view (${winner})`);
    
    // Save to local storage
    localStorage.setItem('last_gunpla_diagnosis', winner);
  };

  const handleReset = () => {
    setState(AppState.HOME);
    setResult(null);
    setAnswers([]);
    setCurrentQuestion(0);
    // Clear URL query without refreshing
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="scanline"></div>
      
      <div className="w-full max-w-lg z-10">
        {state === AppState.HOME && (
          <HomeView onStart={handleStart} />
        )}

        {state === AppState.QUIZ && (
          <QuizView 
            question={QUESTIONS[currentQuestion]}
            currentIdx={currentQuestion}
            total={QUESTIONS.length}
            onAnswer={handleAnswer}
            onBack={handleBack}
          />
        )}

        {state === AppState.RESULT && result && (
          <ResultView 
            result={result} 
            onReset={handleReset} 
          />
        )}
      </div>

      <footer className="mt-8 text-xs text-gray-500 font-mono tracking-widest text-center">
        &copy; 2025 OU-NO-DOUKUTSU HOBBY DIV. <br/>
        ALL SYSTEMS OPERATIONAL
      </footer>
    </div>
  );
};

export default App;
