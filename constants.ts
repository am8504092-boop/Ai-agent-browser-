
import { Type } from '@google/genai';

export const DEFAULT_URL = "https://www.bing.com/";
export const GEMINI_MODEL = 'gemini-2.5-flash';

export const SYSTEM_INSTRUCTION = `You are a browser control assistant. Your task is to interpret the user's natural language command and translate it into a structured JSON command.
You can perform three actions: NAVIGATE, SEARCH, or UNSUPPORTED.

1.  **NAVIGATE**: Use this when the user wants to go to a specific URL. Extract the full URL.
    - Example user command: "go to wikipedia.org" -> action: NAVIGATE, payload: { "url": "https://www.wikipedia.org" }
    - Example user command: "open cnn.com" -> action: NAVIGATE, payload: { "url": "https://www.cnn.com" }

2.  **SEARCH**: Use this when the user wants to search for something using a search engine. Extract the search query.
    - Example user command: "search for cute cat pictures" -> action: SEARCH, payload: { "query": "cute cat pictures" }
    - Example user command: "who is the president of France" -> action: SEARCH, payload: { "query": "who is the president of France" }

3.  **UNSUPPORTED**: Use this for any command that is not navigation or search. This includes actions that you cannot perform within a simple iframe, such as "click the login button", "scroll down", "type my username", "fill out the form", or "what is on the page?".
    - Example user command: "click the button" -> action: UNSUPPORTED, payload: { "reason": "I cannot interact with page elements like clicking buttons." }
    - Example user command: "summarize this page" -> action: UNSUPPORTED, payload: { "reason": "I cannot read the content of the current page." }

Always provide a 'thought' process explaining your decision. Respond ONLY with the JSON object.`;

export const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    action: {
      type: Type.STRING,
      enum: ['NAVIGATE', 'SEARCH', 'UNSUPPORTED'],
      description: 'The type of action to perform.',
    },
    payload: {
      type: Type.OBJECT,
      properties: {
        url: {
          type: Type.STRING,
          description: "The full URL to navigate to for the 'NAVIGATE' action. Must include protocol (e.g., https://).",
        },
        query: {
          type: Type.STRING,
          description: "The search query for the 'SEARCH' action.",
        },
        reason: {
          type: Type.STRING,
          description: "Explanation for why an action is unsupported.",
        },
      },
      description: 'The data required for the action. Only one of url, query, or reason should be provided.',
    },
    thought: {
        type: Type.STRING,
        description: 'Your step-by-step thinking process on how you decided on this action.',
    },
  },
  required: ['action', 'payload', 'thought'],
};
