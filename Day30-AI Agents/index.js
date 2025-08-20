const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const readlineSync = require("readline-sync");

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const conversationHistory = [];
async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: conversationHistory,
  });
  return response.text;
}

async function chatting(params) {
  // weather
  async function getWeather(location) {
    const weatherInfo = [];
    for (const { city, date } of location) {
      if (date.toLowerCase() == "today") {
        const apiKey = process.env.WEATHER_API_KEY; // safely load from .env
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );
        const data = await response.json();
        weatherInfo.push(data);
      } else {
        const response = await fetch(
          `http://api.weatherapi.com/v1/future.json?key=${apiKey}&q=${city}&dt=${date}`
        );
        const data = await response.json();
        weatherInfo.push(data);
      }
    }
    return weatherInfo;
  }
  const userQues = readlineSync.question("How I can Help you-->  ");
  //   const prompt = `You are an AI agent, who will respond to me in JSON format onlu.
  // // Anlayze the user query and try to fetch city and date details from it,
  // // Date format should be in (yyyy-mm-dd) if user ask for future weather,If user ask for today weather, mark date as 'today' to fetch weather details , i already have some function which can fetch the weather details for me

  // // if you need weather information , use the below format
  // // Json format should look like below:

  // // {
  // // "weather_details_needed":true,
  // // "location":[{"city":"mumbai",date:"today"},{"city":"delhi",date:"2026-04-12"}]
  // // }

  // // Once you have the weather report details, respond me in JSON format only,

  // // Json format should look like below:

  // // {
  // // "weather_details_needed":false,
  // // "weather_report":"bhai delhi ka mousam toh bdhiya h , 18 degree tempratur hai , ghr pe pkodhe bna lo ,mja aayega khane me
  // // }

  // // User ask this question :${userQues}
  // // Strictly follow JSON format,respond only in JSON fromat
  // `;

  const prompt = `You are an AI agent. Always respond strictly in JSON format only.

🎯 Task:
Analyze the user query to extract **city** and **date** for weather-related questions.

📌 Rules:
1. Date format must be "yyyy-mm-dd" for specific dates (future or past).
2. If the query is about today's weather, set date as "today".
3. If no city is mentioned, set city as an empty string "".
4. If no date is mentioned, assume "today".
5. Never return anything except valid JSON.

⚡ Response Structures:

👉 If weather details are needed:
{
  "weather_details_needed": true,
  "location": [
    {"city": "<city_name>", "date": "<date>"}
  ]
}

👉 Once weather details are available (fetched externally), respond:
{
  "weather_details_needed": false,
  "weather_report": "<casual Hinglish weather report, e.g. 'Bhai delhi ka mousam bdhiya h, 18 degree hai, ghr pe pakode bna lo.'>"
}

❌ Do not output explanations, text, or code blocks. Only valid JSON.

📖 Examples:

User: "Aaj Mumbai ka weather kaisa hai?"
Output:
{
  "weather_details_needed": true,
  "location": [{"city": "mumbai", "date": "today"}]
}

User: "Kal Delhi ka mousam?"
Output:
{
  "weather_details_needed": true,
  "location": [{"city": "delhi", "date": "2025-08-21"}]
}

User: "Weather?"
Output:
{
  "weather_details_needed": true,
  "location": [{"city": "", "date": "today"}]
}

User question: ${userQues}
Return the result in JSON only.`;

  conversationHistory.push({
    role: "user",
    parts: [{ text: prompt }],
  });

  while (true) {
    let response = await main();
    conversationHistory.push({
      role: "model",
      parts: [{ text: response }], //string json
    });
    response = response.replace(/^```json\s*|```$/g, "").trim();
    const data = await JSON.parse(response);
    console.log(data); //js object

    if (data.weather_details_needed == false) {
      console.log(data.weather_report);
      break;
    }

    const weatherInformation = await getWeather(data.location);

    // Convert object → JSON string
    const weatherIn = JSON.stringify(weatherInformation);

    // Push into conversation history as plain text
    conversationHistory.push({
      role: "user",
      parts: [{ text: weatherIn }],
    });
  }
}
chatting();
