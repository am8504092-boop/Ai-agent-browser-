
import { GoogleGenAI } from '@google/genai';
import { AiAction } from '../types';
import { GEMINI_MODEL, SYSTEM_INSTRUCTION, RESPONSE_SCHEMA } from '../constants';

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getBrowserAction = async (prompt: string): Promise<AiAction> => {
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const jsonString = response.text.trim();
    const parsedAction = JSON.parse(jsonString) as AiAction;
    
    // Basic validation of the parsed object
    if (!parsedAction.action || !parsedAction.payload || !parsedAction.thought) {
      throw new Error("Invalid action format received from AI.");
    }
    
    return parsedAction;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
       throw new Error("Invalid API Key. Please check your environment variables.");
    }
    throw new Error("Failed to get action from Gemini API.");
  }
};
