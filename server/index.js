import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Backend is working!");
});
app.get("/models", async (req, res) => {
  try {
    const models = await ai.models.list();

    const names = [];

    for await (const model of models) {
      names.push(model.name);
    }

    res.json(names);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/generate", async (req, res) => {
  try {
    const { notes } = req.body;

    const prompt = `
You are an AI Study Assistant.

Study Notes:
${notes}

Return ONLY valid JSON.

Use this exact format:

{
  "summary": "short summary",

  "flashcards":[
    {
      "question":"...",
      "answer":"..."
    }
  ],

  "quiz":[
    {
      "question":"...",
      "options":[
        "...",
        "...",
        "...",
        "..."
      ],
      "correctAnswer":"..."
    }
  ]
}

Rules:

- summary should be short.
- Create exactly 5 flashcards.
- Create exactly 5 quiz questions.
- Every quiz question must have 4 options.
- correctAnswer must exactly match one option.
- Do not write markdown.
- Do not wrap JSON inside triple backticks.
- Return only JSON.
`;

let aiResponse;

for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    

    aiResponse = await ai.models.generateContent({
  model: "gemini-3.5-flash",
  contents: prompt,
});

    
    break;

  } catch (error) {

    if (error.status === 503 && attempt < 3) {

      console.log("Gemini is busy...");
      
      console.log("Retrying in 2 seconds...");

      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

    } else {

      throw error;

    }
  }
}


    

    const text = aiResponse.candidates[0].content.parts[0].text;


let generatedStudyKit;

try {
  generatedStudyKit = JSON.parse(text);

} catch {
  return res.status(500).json({
    success: false,
    message:
      " AI returned malformed JSON. Please try again.",
  });
}

res.json({
  success: true,
  result: generatedStudyKit,
});
  } catch (error) {
  console.error("========== FULL ERROR ==========");
  console.error(error);
  console.error("Status:", error.status);
  console.error("Message:", error.message);
  console.error("Stack:", error.stack);

  let status = 500;
  let message = "Something went wrong. Please try again.";

  if (error.status === 429) {
    status = 429;
    message =
      "Gemini API daily quota exceeded. Please try again later.";
  } else if (error.status === 503) {
    status = 503;
    message =
      "Gemini AI is busy. Please try again in a few minutes.";
  } else if (error instanceof SyntaxError) {
    status = 500;
    message =
      "AI returned malformed JSON. Please try again.";
  }

  return res.status(status).json({
    success: false,
    message,
  });
}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});