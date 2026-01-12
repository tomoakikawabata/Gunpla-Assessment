
import React from 'react';

interface HomeViewProps {
  onStart: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onStart }) => {
  return (
    <div className="military-border bg-gray-900/80 p-8 rounded-sm shadow-2xl backdrop-blur-sm text-center">
      <div className="mb-6 flex justify-center">
        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
          <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
          </svg>
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black mb-2 text-white italic tracking-tighter">
        模活タイプ<span className="text-orange-500">診断</span>
      </h1>
      
      <p className="text-orange-500 font-bold mb-6 tracking-widest text-sm uppercase">
        Identify Your Modeler Soul
      </p>

      <div className="bg-black/50 p-4 mb-8 text-left border-l-4 border-orange-500 rounded">
        <p className="text-sm leading-relaxed text-gray-300">
          戦場（作業デスク）は人によって様々だ。<br/>
          諸君の製作パターンから、最適な「スタイル」を特定する。<br/>
          全8問のブリーフィングに応答せよ。
        </p>
      </div>

      <button
        onClick={onStart}
        className="w-full bg-orange-600 hover:bg-orange-500 text-black font-black py-4 rounded shadow-lg transform transition active:scale-95 uppercase tracking-widest text-xl"
      >
        MISSION START
      </button>

      <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-500 font-mono">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
        DATABASE CONNECTED: 王の洞窟
      </div>
    </div>
  );
};

export default HomeView;
