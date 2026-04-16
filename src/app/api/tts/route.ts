import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'text is required' }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      console.error('TTS: ELEVENLABS_API_KEY is not set');
      return NextResponse.json({ error: 'TTS not configured', details: 'API key missing' }, { status: 500 });
    }

    const truncated = text.slice(0, 2000);

    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb', {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: truncated,
        model_id: 'eleven_v3',
        output_format: 'mp3_44100_128',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`TTS: ElevenLabs returned ${response.status}: ${errorText}`);
      return NextResponse.json(
        { error: 'TTS generation failed', status: response.status, details: errorText },
        { status: 500 }
      );
    }

    const audioBuffer = await response.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
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
