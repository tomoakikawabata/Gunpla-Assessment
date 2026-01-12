
import { Question, ResultContent } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "新しいキットを買ったら最初にやることは？",
    options: [
      { text: "すぐ組む", type: 'A' },
      { text: "まず塗装プランを考える", type: 'B' },
      { text: "箱を棚に“保管”する", type: 'C' },
      { text: "箱絵を眺めて撮影構図を妄想", type: 'D' }
    ]
  },
  {
    id: 2,
    text: "組み立てのスピード感は？",
    options: [
      { text: "休日で一気に完成まで", type: 'A' },
      { text: "乾燥待ち前提で時間をかける", type: 'B' },
      { text: "別キットも並行", type: 'C' },
      { text: "途中でも“映える瞬間”を撮る", type: 'D' }
    ]
  },
  {
    id: 3,
    text: "一番テンションが上がる瞬間は？",
    options: [
      { text: "形になった時", type: 'A' },
      { text: "トップコートで化けた時", type: 'B' },
      { text: "箱が増えて小隊が組める時", type: 'C' },
      { text: "写真が映えた時", type: 'D' }
    ]
  },
  {
    id: 4,
    text: "苦手（やりたくない）のは？",
    options: [
      { text: "デカール/シール貼り", type: 'A' },
      { text: "ゲート処理を雑にすること", type: 'B' },
      { text: "箱の整理/在庫管理", type: 'C' },
      { text: "机の片付け/撮影準備", type: 'D' }
    ]
  },
  {
    id: 5,
    text: "仕上げで一番こだわるのは？",
    options: [
      { text: "とにかく完成", type: 'A' },
      { text: "表面処理と質感", type: 'B' },
      { text: "小隊/陣営の統一感", type: 'C' },
      { text: "ポージングと背景/小物", type: 'D' }
    ]
  },
  {
    id: 6,
    text: "作業BGMは？",
    options: [
      { text: "無音で集中", type: 'A' },
      { text: "作業用BGM/ラジオ", type: 'B' },
      { text: "配信を流しつつ別作業も", type: 'C' },
      { text: "映画/アニメで世界観没入", type: 'D' }
    ]
  },
  {
    id: 7,
    text: "買い物の基準は？",
    options: [
      { text: "直感。今週末これ組む", type: 'A' },
      { text: "表現したい色/改造素材", type: 'B' },
      { text: "限定/再販/レア度", type: 'C' },
      { text: "写真で映えるシルエット/武装", type: 'D' }
    ]
  },
  {
    id: 8,
    text: "SNSに上げるなら？",
    options: [
      { text: "完成の一枚", type: 'A' },
      { text: "工程と技法メモ", type: 'B' },
      { text: "箱の山 or 小隊集合", type: 'C' },
      { text: "世界観写真", type: 'D' }
    ]
  }
];

export const RESULTS: Record<string, ResultContent> = {
  A: {
    id: 'A',
    title: "スピード素組みアタッカー",
    summary: "完成が正義。組むほど強い。",
    strengths: "短期間で完成数が増え達成感が続く",
    pitfalls: "シール/ゲートがストレスで放置しがち",
    next: "仕上げを1つ足すなら「つや消しトップコート」",
    share: "私のガンプラタイプは【スピード素組みアタッカー】！完成が正義🫡 あなたは何タイプ？ #王の洞窟診断 #ガンプラ",
    icon: "🫡"
  },
  B: {
    id: 'B',
    title: "こだわり塗装クラフター",
    summary: "仕上げが魂。完成は“作品”の始まり。",
    strengths: "化け方が段違いで人に見せたくなる",
    pitfalls: "工程が増え完成まで辿り着けないことも",
    next: "まずは「部分塗装＋トップコート」から",
    share: "私のガンプラタイプは【こだわり塗装クラフター】！質感命💎 あなたは何タイプ？ #王の洞窟診断 #ガンプラ",
    icon: "💎"
  },
  C: {
    id: 'C',
    title: "コレクター司令官",
    summary: "積みプラは戦力。棚は基地。",
    strengths: "再販/限定に強くラインナップが強い",
    pitfalls: "積みが増え罪悪感が出る",
    next: "「積み1箱→完成1体」の交換ルール",
    share: "私のガンプラタイプは【コレクター司令官】！積みは戦力📦 あなたは何タイプ？ #王の洞窟診断 #ガンプラ",
    icon: "📦"
  },
  D: {
    id: 'D',
    title: "撮影・魅せ組みディレクター",
    summary: "作るのは“見せるため”。世界観で勝つ。",
    strengths: "SNSで伸びやすく“おぉ…”を作れる",
    pitfalls: "撮影準備が重く投稿が億劫に",
    next: "「斜め45度＋逆光1灯」固定で撮る",
    share: "私のガンプラタイプは【撮影・魅せ組みディレクター】！映えが正義📸 あなたは何タイプ？ #王の洞窟診断 #ガンプラ",
    icon: "📸"
  }
};
