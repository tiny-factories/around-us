import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages, speciesData } = await request.json();

    // Get Anthropic API key from environment
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    // Build system message with species context
    let systemMessage = `You are a helpful assistant that provides information about wildlife species. 
You help users learn about species they encounter in nature, answer questions about identification, 
behavior, habitat, and conservation.`;

    if (speciesData) {
      systemMessage += `\n\nCurrent species context:
- Common Name: ${speciesData.commonName}
- Scientific Name: ${speciesData.name}
- Taxon: ${speciesData.iconicTaxon}
- Observation Count: ${speciesData.observationCount}
${speciesData.wikipediaUrl ? `- Wikipedia: ${speciesData.wikipediaUrl}` : ''}`;
    }

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: systemMessage,
        messages: messages.map((msg: { role: string; content: string }) => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Anthropic API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from AI' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Extract the text content from the response
    const content = data.content?.[0]?.text || 'Sorry, I could not generate a response.';

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
