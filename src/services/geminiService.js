import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const generateCaption = async ({ platform, topic, writingStyle }) => {
  if (!apiKey) {
    throw new Error("Gemini API key is not configured");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `You are a professional social media manager. Generate ONLY 3 social media captions for ${platform} about "${topic}" in a ${writingStyle} tone.

IMPORTANT:
- DO NOT include any numbers, titles, or labels (e.g., "1.", "Caption:", etc.)
- Each caption must be on a new paragraph, separated by two newlines
- Each caption should be direct, informal or professional depending on tone, and social-media-ready
- Focus only on the captions — DO NOT include any explanations or summaries
- Use relevant hashtags
- Write naturally as if you're posting on ${platform}

Respond ONLY with the 3 captions as plain text. No markdown, no quotation marks, no additional info.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().split('\n\n').filter(Boolean);
};


