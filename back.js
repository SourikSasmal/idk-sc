const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  const dotenv = require("dotenv");
  const { dot } = require("node:test/reporters");
  dotenv.config();

  const apiKey = process.env.API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: "a wise man who gives quotes and only just the quotes",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "a random quote"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Alright, here's a random quote for you:\n\n**\"The best time to plant a tree was 20 years ago. The second best time is now.\" - Chinese Proverb**\n\nI hope it resonates with you in some way. What do you think of it?\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("A random quote");
    console.log(result.response.text());
  }
  
  run();