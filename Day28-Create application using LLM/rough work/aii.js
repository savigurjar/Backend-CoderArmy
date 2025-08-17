const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    // contents: "hello ji",
    contents: [
        // history
      {
        role: "user",
        parts: [{ text: "hii gemini how are you?" }],
      },
      {
        role: "model",
        parts: [{ text: "i'm good what about you?" }],
      },
      {
        role:"user",
        parts:[{text:"explain how good are you?"}]
      }
    ],
  });
  console.log(response.text);
}

main();
