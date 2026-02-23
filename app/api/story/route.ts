import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const { words, customKey } = await req.json();

        if (!words || words.length === 0) {
            return NextResponse.json({ error: "No words provided" }, { status: 400 });
        }

        let apiKey = customKey || process.env.GOOGLE_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "No API key configured" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.8,
            }
        });

        const wordsList = words.join(", ");

        const systemPrompt = `You are a creative writer for a language learning app.
The user wants a short, engaging, 3-4 sentence story set in a specific vibrant city (like Paris, Madrid, Tokyo, etc.) that naturally uses ALL of the following words contextually accurately: ${wordsList}.
Ensure the story is emotionally immersive and not just a robotic list of sentences.
Return ONLY a valid JSON object with this exact structure. Do NOT wrap it in markdown blockquotes like \`\`\`json:
{
  "title": "A fun title for the story in the target language (e.g. Un Día en Madrid)",
  "content": "The actual story in the target language using the provided words.",
  "translation": "The full English translation of the story."
}`;

        const result = await model.generateContent(systemPrompt);
        const responseText = result.response.text();
        const content = JSON.parse(responseText);

        return NextResponse.json(content);
    } catch (err: any) {
        console.error("Story API error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
