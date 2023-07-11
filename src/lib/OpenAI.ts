import { OpenAI } from "langchain/llms/openai";

const model = new OpenAI({
    modelName: 'gpt-4',
    openAIApiKey: process.env.REACT_APP_OPEN_AI_KEY,
    temperature: 0.6,
});

export default model;