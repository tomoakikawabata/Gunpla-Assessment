
export type DiagnosisType = 'A' | 'B' | 'C' | 'D';

export interface Option {
  text: string;
  type: DiagnosisType;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface ResultContent {
  id: DiagnosisType;
  title: string;
  summary: string;
  strengths: string;
  pitfalls: string;
  next: string;
  share: string;
  icon: string;
}

export enum AppState {
  HOME = 'HOME',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT'
}
