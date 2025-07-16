import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    });

    const result = await geminiRes.json();

    if (result.error) {
      console.error("Gemini error:", result.error);
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    const reply = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    return NextResponse.json({
      response: reply || "🤖 Gemini Flash didn't respond.",
    });

  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
