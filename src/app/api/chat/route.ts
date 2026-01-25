import { NextRequest, NextResponse } from 'next/server';

// Map taxon names to IconicTaxon values
const TAXON_MAP: Record<string, string> = {
  'mammal': 'Mammalia',
  'mammals': 'Mammalia',
  'mammalia': 'Mammalia',
  'bird': 'Aves',
  'birds': 'Aves',
  'aves': 'Aves',
  'plant': 'Plantae',
  'plants': 'Plantae',
  'plantae': 'Plantae',
  'insect': 'Insecta',
  'insects': 'Insecta',
  'insecta': 'Insecta',
  'reptile': 'Reptilia',
  'reptiles': 'Reptilia',
  'reptilia': 'Reptilia',
  'amphibian': 'Amphibia',
  'amphibians': 'Amphibia',
  'amphibia': 'Amphibia',
  'spider': 'Arachnida',
  'spiders': 'Arachnida',
  'arachnida': 'Arachnida',
  'mollusk': 'Mollusca',
  'mollusks': 'Mollusca',
  'mollusca': 'Mollusca',
  'fish': 'Actinopterygii',
  'actinopterygii': 'Actinopterygii',
  'fungus': 'Fungi',
  'fungi': 'Fungi',
};

// Map month names to numbers
const MONTH_MAP: Record<string, number> = {
  'january': 1, 'jan': 1,
  'february': 2, 'feb': 2,
  'march': 3, 'mar': 3,
  'april': 4, 'apr': 4,
  'may': 5,
  'june': 6, 'jun': 6,
  'july': 7, 'jul': 7,
  'august': 8, 'aug': 8,
  'september': 9, 'sep': 9, 'sept': 9,
  'october': 10, 'oct': 10,
  'november': 11, 'nov': 11,
  'december': 12, 'dec': 12,
};

// Parse query to extract filter intent
function parseFilterQuery(query: string, currentFilters: { taxon?: string; month?: number }): {
  taxon?: string;
  month?: number;
  year?: number;
} {
  const lowerQuery = query.toLowerCase();
  const filters: { taxon?: string; month?: number; year?: number } = {};

  // Extract taxon
  for (const [key, value] of Object.entries(TAXON_MAP)) {
    if (lowerQuery.includes(key)) {
      filters.taxon = value;
      break;
    }
  }

  // Extract month
  for (const [key, value] of Object.entries(MONTH_MAP)) {
    if (lowerQuery.includes(key)) {
      filters.month = value;
      break;
    }
  }

  // Extract year (4-digit year)
  const yearMatch = lowerQuery.match(/\b(19|20)\d{2}\b/);
  if (yearMatch) {
    filters.year = parseInt(yearMatch[0]);
  }

  // Check for "all" or "everything" to reset taxon filter
  if (lowerQuery.includes('all') || lowerQuery.includes('everything') || lowerQuery.includes('show all')) {
    filters.taxon = 'all';
  }

  return filters;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, speciesData, currentFilters, coordinates } = await request.json();

    // Get Anthropic API key from environment
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    // Get the last user message to check for filter queries
    const lastMessage = messages[messages.length - 1];
    const isFilterQuery = lastMessage?.role === 'user' && 
      (lastMessage.content.toLowerCase().includes('show') || 
       lastMessage.content.toLowerCase().includes('filter') ||
       lastMessage.content.toLowerCase().includes('near me') ||
       lastMessage.content.toLowerCase().includes('around here') ||
       lastMessage.content.toLowerCase().includes('in this') ||
       lastMessage.content.toLowerCase().includes('what') && !speciesData);

    // Parse filter query if it's a filter request
    let filterActions: Array<{ type: string; value: string | number }> = [];
    if (isFilterQuery && currentFilters) {
      const parsedFilters = parseFilterQuery(lastMessage.content, currentFilters);
      
      if (parsedFilters.taxon !== undefined && parsedFilters.taxon !== currentFilters.taxon) {
        filterActions.push({ type: 'taxon', value: parsedFilters.taxon });
      }
      
      if (parsedFilters.month !== undefined && parsedFilters.month !== currentFilters.month) {
        filterActions.push({ type: 'month', value: parsedFilters.month });
      }
      
      if (parsedFilters.year !== undefined) {
        filterActions.push({ type: 'year', value: parsedFilters.year });
      }
    }

    // Build system message
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
    } else {
      systemMessage += `\n\nYou can help users filter species observations by:
- Type: mammals, birds, plants, insects, reptiles, amphibians, spiders, mollusks, fish, fungi
- Time: specific months (January-December) or years (e.g., 2024)
- Location: "near me" or "around here" refers to the user's current location

When a user asks to filter (e.g., "show me mammals near me" or "what birds in June"), 
acknowledge that you're applying the filter and the map will update automatically.`;
    }

    // Add filter context if applicable
    if (currentFilters) {
      systemMessage += `\n\nCurrent filters:
- Taxon: ${currentFilters.taxon || 'all'}
- Month: ${currentFilters.month ? new Date(2000, currentFilters.month - 1).toLocaleString('en-US', { month: 'long' }) : 'all'}`;
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
    let content = data.content?.[0]?.text || 'Sorry, I could not generate a response.';

    // If we detected filter actions, enhance the response
    if (filterActions.length > 0) {
      const taxonAction = filterActions.find(a => a.type === 'taxon');
      const monthAction = filterActions.find(a => a.type === 'month');
      
      if (taxonAction || monthAction) {
        let filterMessage = 'I\'ll update the filters for you. ';
        if (taxonAction && taxonAction.value !== 'all') {
          const taxonLabels: Record<string, string> = {
            'Mammalia': 'mammals',
            'Aves': 'birds',
            'Plantae': 'plants',
            'Insecta': 'insects',
            'Reptilia': 'reptiles',
            'Amphibia': 'amphibians',
            'Arachnida': 'spiders',
            'Mollusca': 'mollusks',
            'Actinopterygii': 'fish',
            'Fungi': 'fungi',
          };
          filterMessage += `Showing ${taxonLabels[taxonAction.value as string] || taxonAction.value} `;
        } else if (taxonAction && taxonAction.value === 'all') {
          filterMessage += 'Showing all species types ';
        }
        
        if (monthAction) {
          const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
          filterMessage += `for ${monthNames[(monthAction.value as number) - 1]}`;
        }
        
        filterMessage += '. The map will update automatically.';
        content = filterMessage + '\n\n' + content;
      }
    }

    return NextResponse.json({ 
      content,
      filterActions: filterActions.length > 0 ? filterActions : undefined,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
