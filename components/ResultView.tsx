
import React, { useState, useEffect, useRef } from 'react';
import { ResultContent } from '../types';
import { getAIComment } from '../services/geminiService';

interface ResultViewProps {
  result: ResultContent;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, onReset }) => {
  const [aiComment, setAiComment] = useState<string>("司令官からの通信を待機中...");
  const [isLoadingAi, setIsLoadingAi] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchComment = async () => {
      const comment = await getAIComment(result.id, result.title);
      setAiComment(comment);
      setIsLoadingAi(false);
    };
    fetchComment();
  }, [result]);

  const handleShareX = () => {
    console.log('event: share_click');
    const url = encodeURIComponent(window.location.origin + window.location.pathname + `?t=${result.id}`);
    const text = encodeURIComponent(result.share);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleDownload = () => {
    console.log('event: download_click');
    // Simple canvas approach to generate a visual card
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Military Border
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Title & Type
    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 30px Arial';
    ctx.fillText('GUNPLA TYPE DIAGNOSIS RESULT', 60, 80);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 80px sans-serif';
    ctx.fillText(result.title, 60, 200);

    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 40px sans-serif';
    ctx.fillText(`TYPE ${result.id}`, 60, 270);

    // Content
    ctx.fillStyle = '#d1d5db';
    ctx.font = '32px sans-serif';
    const lines = [
      `Summary: ${result.summary}`,
      `Strengths: ${result.strengths}`,
      `Next Step: ${result.next}`,
    ];
    lines.forEach((line, i) => {
      ctx.fillText(line, 60, 350 + (i * 50));
    });

    // Branding
    ctx.fillStyle = '#4b5563';
    ctx.font = '24px monospace';
    ctx.fillText('POWERED BY 王の洞窟', canvas.width - 320, canvas.height - 60);

    // Download
    const link = document.createElement('a');
    link.download = `gunpla_diagnosis_${result.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-6 animate-in zoom-in duration-500">
      <div 
        ref={cardRef}
        className="military-border bg-gray-900 p-6 rounded-sm shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <span className="text-4xl">{result.icon}</span>
          <div className="bg-orange-500 text-black font-black px-2 py-1 text-xl rounded">
            {result.id}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-orange-500 font-mono text-xs font-bold tracking-[0.3em] mb-1">
            DIAGNOSIS RESULT
          </h3>
          <h2 className="text-3xl font-black text-white leading-tight">
            {result.title}
          </h2>
        </div>

        <div className="space-y-4 mb-8">
          <section className="bg-black/40 p-3 border-l-2 border-white rounded">
            <h4 className="text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-wider">Summary</h4>
            <p className="text-sm font-bold text-gray-100">{result.summary}</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <section className="bg-green-950/20 p-3 border-l-2 border-green-500 rounded">
              <h4 className="text-[10px] text-green-500 font-bold mb-1 uppercase">Strengths</h4>
              <p className="text-xs text-gray-300">{result.strengths}</p>
            </section>
            <section className="bg-red-950/20 p-3 border-l-2 border-red-500 rounded">
              <h4 className="text-[10px] text-red-500 font-bold mb-1 uppercase">Pitfalls</h4>
              <p className="text-xs text-gray-300">{result.pitfalls}</p>
            </section>
          </div>

          <section className="bg-orange-500/10 p-3 border border-orange-500/30 rounded">
            <h4 className="text-[10px] text-orange-500 font-bold mb-1 uppercase">Next Step</h4>
            <p className="text-xs text-orange-300 font-bold">🎯 {result.next}</p>
          </section>
        </div>

        <div className="bg-gray-800/80 p-4 rounded border border-gray-700 relative">
          <div className="absolute -top-3 left-4 bg-gray-900 px-2 text-[10px] font-mono text-orange-500">
            AI COMMANDER BRIEFING
          </div>
          <p className="text-sm italic text-gray-200 leading-relaxed">
            {isLoadingAi ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></span>
                受信中...
              </span>
            ) : aiComment}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleShareX}
          className="w-full bg-[#1DA1F2] hover:bg-[#1991db] text-white font-bold py-4 rounded flex items-center justify-center gap-2 transition transform active:scale-95"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
          Xで診断結果をシェア
        </button>

        <button
          onClick={handleDownload}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded flex items-center justify-center gap-2 text-sm transition"
        >
          結果を画像として保存
        </button>

        <button
          onClick={onReset}
          className="w-full border border-gray-600 hover:border-orange-500 text-gray-400 hover:text-orange-500 font-bold py-3 rounded text-sm transition"
        >
          もう一度診断する
        </button>
      </div>

      <div className="bg-orange-600/10 p-6 rounded-sm border-2 border-dashed border-orange-600/30 text-center">
        <h4 className="text-orange-500 font-black mb-2">諸君へ、次の任務だ。</h4>
        <p className="text-xs text-gray-300 mb-4">
          「王の洞窟」で理想の機体を探し、<br/>
          この診断結果を引用ポストで報告せよ！
        </p>
        <a 
          href="https://twitter.com/intent/tweet?text=王の洞窟でキットを探してきます！" 
          target="_blank"
          className="inline-block bg-orange-600 text-black px-6 py-2 rounded font-black text-sm animate-bounce"
        >
          作戦本部に報告（引用RT）
        </a>
      </div>
    </div>
  );
};

export default ResultView;
