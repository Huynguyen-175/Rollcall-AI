import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are Rollcall AI, a concise real-time Teamfight Tactics coach. Analyze the supplied TFT screenshot and return only practical next actions for the current shop/board state. Mention uncertainty when the image is unclear. Use this exact format:
BUY: <champions or NONE>
SKIP: <champions or NONE>
SELL: <unit or NONE>
ROLL: <number or advice>
LEVEL: <advice>
WHY: <one short sentence>
STOP: <gold floor or condition>`;

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'OPENAI_API_KEY is not configured for this site yet.' }, { status: 503 });
  }

  const body = await request.json().catch(() => null) as { image?: string; mode?: 'normal' | 'fast' } | null;
  if (!body?.image || !body.image.startsWith('data:image/')) {
    return NextResponse.json({ error: 'Please upload a valid TFT screenshot.' }, { status: 400 });
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      max_output_tokens: body.mode === 'fast' ? 220 : 420,
      temperature: 0.2,
      input: [{ role: 'user', content: [
        { type: 'input_text', text: `${SYSTEM_PROMPT}\nMode: ${body.mode === 'fast' ? 'FAST — prioritize shop actions' : 'NORMAL — include a little reasoning'}` },
        { type: 'input_image', image_url: body.image, detail: body.mode === 'fast' ? 'low' : 'high' },
      ] }],
    }),
  });

  const payload = await response.json().catch(() => ({})) as { output_text?: string; error?: { message?: string } };
  if (!response.ok) {
    return NextResponse.json({ error: payload.error?.message || 'The vision model could not analyze this screenshot.' }, { status: 502 });
  }
  return NextResponse.json({ analysis: payload.output_text || 'No decision text was returned. Please try another screenshot.' });
}
