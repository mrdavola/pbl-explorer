import { NextRequest, NextResponse } from 'next/server';

const MODEL = 'gemini-3.1-flash-tts-preview';
const VOICE = 'Kore';
const SAMPLE_RATE = 24000;

// Wrap raw 16-bit PCM mono in a WAV container so browsers can play it.
function pcmToWav(pcm: Buffer, sampleRate: number): Buffer {
  const bitsPerSample = 16;
  const channels = 1;
  const byteRate = (sampleRate * channels * bitsPerSample) / 8;
  const blockAlign = (channels * bitsPerSample) / 8;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'text is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('TTS: GEMINI_API_KEY is not set');
      return NextResponse.json({ error: 'TTS not configured' }, { status: 500 });
    }

    const truncated = text.slice(0, 2000);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: truncated }] }],
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } },
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`TTS: Gemini returned ${response.status}: ${errorText}`);
      return NextResponse.json(
        { error: 'TTS generation failed', status: response.status, details: errorText },
        { status: 500 }
      );
    }

    const json = await response.json();
    const b64 = json?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!b64) {
      console.error('TTS: Gemini response missing audio data', JSON.stringify(json).slice(0, 500));
      return NextResponse.json({ error: 'TTS response missing audio' }, { status: 500 });
    }

    const pcm = Buffer.from(b64, 'base64');
    const wav = pcmToWav(pcm, SAMPLE_RATE);

    return new NextResponse(new Uint8Array(wav), {
      headers: {
        'Content-Type': 'audio/wav',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err) {
    console.error('TTS: Unexpected error', err);
    return NextResponse.json(
      { error: 'TTS unexpected error', details: String(err) },
      { status: 500 }
    );
  }
}
