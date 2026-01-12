
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIComment = async (type: string, title: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `あなたはガンプラ基地の「司令官」です。
      診断結果が「${title}（タイプ${type}）」だったユーザーに対して、
      短く、熱く、ミリタリー調で激励のコメントを100文字以内で作成してください。
      「諸君」「任務」「戦力」などの言葉を使ってください。`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "諸君、さらなる高みを目指せ。ガンプラ道に終わりはない！";
  }
};
