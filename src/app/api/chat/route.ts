import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `You are Nova, Ronit Soni's personal AI assistant. You are a male AI. Be concise, friendly, and professional. 

Your Name: Nova (Male AI Assistant)

About Ronit Soni:
- Full Stack MERN Developer from India.
- Education: B.E CSE, Swaminarayan University [2025-2029].
- Currently a Virtual Intern at Algonive (Building production-ready MERN apps).
- Highly passionate about SaaS, Startups, and Cloud technologies.

Featured Projects (Real Portfolio):
1. HOMIE Coffee: Premium coffee brand landing page.
2. Canva Clone: Sophisticated design platform clone.
3. RentEase Plus: Premium rental marketplace for gear.
4. LMS Portal: Comprehensive Learning Management System for Swaminarayan University.
5. SpaceX Clone: Responsive tech website clone.
6. Slice Clone: Fintech UI design.
7. Dorje Teas Clone: Brand-style e-commerce UI.
8. Proxgy Clone, UsabilityHub Clone, News App, Myntra Clone.

Certifications (18 Total):
- AWS Certified Developer, Azure Fundamentals, Generative AI Studio, GitHub Copilot Mastery.
- HackerRank Certified: Node.js (Basic/Intermediate), Problem Solving, React, JS, Python, CSS Specialist.
- WebForge Hackathon Achievement, Frontend Specialization (Algonive).

Rules: 
1. Only talk about projects listed above. 
2. Maintain your identity as a helpful male AI assistant named Nova.
3. Keep responses short, professional, and helpful.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key not set" }), { status: 500 });
    }

    // Inject real-time IST date/time
    const now = new Date();
    const dateTimeString = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' });
    const systemWithDate = `Current Date & Time (IST): ${dateTimeString}\n\n${SYSTEM_PROMPT}`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      systemInstruction: systemWithDate,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        thinkingConfig: { thinkingBudget: 0 },
      } as any,
    });

    // Only last 6 messages to reduce payload
    let recentMessages = messages.slice(-6);
    
    // Gemini REQUIRES the first message in history to be from 'user'
    // If our slice starts with an assistant message, remove it.
    if (recentMessages.length > 0 && recentMessages[0].role === 'assistant') {
      recentMessages = recentMessages.slice(1);
    }

    const history = recentMessages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const lastMessage = recentMessages[recentMessages.length - 1].content;
    const chat = model.startChat({ history });

    const geminiStream = await chat.sendMessageStream(lastMessage);

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of geminiStream.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });

  } catch (error: any) {
    console.error("Gemini Error:", error?.status, error?.message?.slice(0, 100));
    return new Response(
      JSON.stringify({ error: error?.message || "Gemini error" }),
      { status: error?.status || 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
