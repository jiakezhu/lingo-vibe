import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const { word, lang, customKey } = await req.json();

        if (!word || !lang) {
            return NextResponse.json({ error: "Missing word or lang" }, { status: 400 });
        }

        let apiKey = customKey || process.env.GOOGLE_API_KEY;

        let currentUsage = 0;
        const cookieHeader = req.headers.get("cookie");
        if (cookieHeader && !customKey) {
            const match = cookieHeader.match(/lingovibe_usage_count=(\d+)/);
            if (match) {
                currentUsage = parseInt(match[1], 10);
            }
        }

        // Check usage if using the default system key
        if (!customKey && currentUsage >= 2) {
            return NextResponse.json({ error: "Daily limit reached" }, { status: 429 });
        }

        if (!apiKey) {
            return NextResponse.json({ error: "No API key configured" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.7,
            }
        });

        const systemPrompt = `You are a cool, Gen-Z multi-lingual tutor.
The user wants to learn the word/phrase: "${word}" focusing on the target language: "${lang}".
Return ONLY a valid JSON object with the following strict structure. Do NOT wrap it in markdown blockquotes like \`\`\`json. 
Ensure the slang sentences and vibe checks are ultra-authentic, native-sounding, and culturally highly relevant. 
The vibe check MUST be in Simplified Chinese and feel like a friend chatting:
{
  "target_word": "The exact word/phrase translated into the target language",
  "trilingual_map": { 
    "en": "English translation", 
    "fr": "French translation", 
    "es": "Spanish translation" 
  },
  "chinese_def": "The meaning of the word in Simplified Chinese",
  "two_slang_sentences": [
    "Target language sentence 1 using the word (highly authentic slang/natural street vibe)",
    "Target language sentence 2 using the word (conversational and engaging)"
  ],
  "vibe_check_note": "A short, cool, informal usage tip in Chinese about how this word feels or is actually used in real life."
}`;

        const result = await model.generateContent(systemPrompt);
        const responseText = result.response.text();
        const content = JSON.parse(responseText);

        const response = NextResponse.json(content);

        // Increment cookie if we used the free tier
        if (!customKey) {
            response.cookies.set("lingovibe_usage_count", (currentUsage + 1).toString(), {
                maxAge: 60 * 60 * 24, // 24 hours
                httpOnly: true,
                path: "/",
            });
        }

        return response;
    } catch (err: any) {
        console.error("Chat API error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
