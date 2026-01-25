'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Species, ICONIC_TAXON_EMOJI, IconicTaxon, Coordinates } from '@/lib/types';

interface ChatInterfaceProps {
  selectedSpecies?: Species | null;
  selectedTaxon?: IconicTaxon | 'all';
  selectedMonth?: number;
  coordinates?: Coordinates | null;
  onTaxonChange?: (taxon: IconicTaxon | 'all') => void;
  onMonthChange?: (month: number) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface FilterAction {
  type: 'taxon' | 'month' | 'year';
  value: IconicTaxon | 'all' | number;
}

// Generate contextual prompt suggestions based on species data
function generatePromptSuggestions(species: Species): string[] {
  const prompts: string[] = [];
  const taxon = species.iconicTaxon as IconicTaxon;

  // Seasonal/migration questions (especially relevant for birds and some mammals)
  if (taxon === 'Aves' || taxon === 'Mammalia') {
    prompts.push('When is this species usually around here?');
    prompts.push('Does this species migrate? Where does it go?');
  } else {
    prompts.push('When is this species most active in this area?');
  }

  // Habitat questions
  prompts.push('What habitat does this species prefer?');

  // Behavior questions
  if (taxon === 'Aves') {
    prompts.push('What does this bird eat?');
    prompts.push('What does this bird sound like?');
  } else if (taxon === 'Mammalia') {
    prompts.push('What does this mammal eat?');
    prompts.push('Is this species nocturnal or diurnal?');
  } else if (taxon === 'Plantae') {
    prompts.push('When does this plant bloom?');
    prompts.push('What conditions does this plant need to grow?');
  } else if (taxon === 'Insecta') {
    prompts.push('What is the lifecycle of this insect?');
  }

  // Identification questions
  prompts.push('How can I identify this species?');

  // Conservation/local presence
  if (species.observationCount > 0) {
    prompts.push(`Why are there ${species.observationCount} observations nearby?`);
  }

  // General questions
  prompts.push('Tell me interesting facts about this species');

  return prompts.slice(0, 6); // Limit to 6 prompts
}

// Generate general prompt suggestions when no species is selected
function generateGeneralPromptSuggestions(): string[] {
  return [
    'Show me what mammals are near me',
    'What birds can I see in this area?',
    'Show me plants observed in June',
    'What insects are around here?',
    'Show me observations from 2024',
    'What can I find nearby?',
  ];
}

export function ChatInterface({ 
  selectedSpecies, 
  selectedTaxon = 'all',
  selectedMonth,
  coordinates,
  onTaxonChange,
  onMonthChange 
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [promptSuggestions, setPromptSuggestions] = useState<string[]>([]);
  const [showPrompts, setShowPrompts] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (!isInitialized) {
      if (selectedSpecies) {
        const emoji = ICONIC_TAXON_EMOJI[selectedSpecies.iconicTaxon as IconicTaxon] || '🔬';
        const welcomeMessage = `I see you're interested in the ${selectedSpecies.commonName} (${selectedSpecies.name}). 
I can help you learn more about this species - its habitat, behavior, identification tips, and more. What would you like to know?`;
        
        setMessages([
          {
            role: 'assistant',
            content: welcomeMessage,
          },
        ]);
        
        // Generate prompt suggestions
        const prompts = generatePromptSuggestions(selectedSpecies);
        setPromptSuggestions(prompts);
        setShowPrompts(true);
      } else {
        // Show general welcome message when no species is selected
        const welcomeMessage = `Hi! I can help you explore species observations in your area. 
You can ask me to filter by type (like mammals, birds, plants) or by time (specific months or years). 
Try asking "show me what mammals are near me" or "what birds can I see in June"?`;
        
        setMessages([
          {
            role: 'assistant',
            content: welcomeMessage,
          },
        ]);
        
        // Generate general prompt suggestions
        const prompts = generateGeneralPromptSuggestions();
        setPromptSuggestions(prompts);
        setShowPrompts(true);
      }
      setIsInitialized(true);
    }
  }, [selectedSpecies, isInitialized]);

  // Update messages when species changes (but keep conversation history)
  useEffect(() => {
    if (isInitialized && selectedSpecies && messages.length > 0) {
      const emoji = ICONIC_TAXON_EMOJI[selectedSpecies.iconicTaxon as IconicTaxon] || '🔬';
      const welcomeMessage = `I see you're interested in the ${selectedSpecies.commonName} (${selectedSpecies.name}). 
I can help you learn more about this species - its habitat, behavior, identification tips, and more. What would you like to know?`;
      
      // Only update if we don't already have a message about this species
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.content.includes(selectedSpecies.commonName)) {
        setMessages([
          {
            role: 'assistant',
            content: welcomeMessage,
          },
        ]);
        
        const prompts = generatePromptSuggestions(selectedSpecies);
        setPromptSuggestions(prompts);
        setShowPrompts(true);
      }
    }
  }, [selectedSpecies, isInitialized, messages.length]);

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
    // Don't hide prompts here - let them stay visible until message is sent
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    // Add user message
    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: userMessage },
    ];
    setMessages(newMessages);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
          speciesData: selectedSpecies || null,
          currentFilters: {
            taxon: selectedTaxon,
            month: selectedMonth,
          },
          coordinates: coordinates || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Handle filter actions if present
      if (data.filterActions && Array.isArray(data.filterActions)) {
        data.filterActions.forEach((action: FilterAction) => {
          if (action.type === 'taxon' && onTaxonChange) {
            onTaxonChange(action.value as IconicTaxon | 'all');
          } else if (action.type === 'month' && onMonthChange) {
            onMonthChange(action.value as number);
          } else if (action.type === 'year' && onMonthChange) {
            // For year queries, we'll need to handle this differently
            // For now, we'll just acknowledge it in the response
          }
        });
      }
      
      setMessages([...newMessages, { role: 'assistant', content: data.content }]);
      setShowPrompts(false); // Hide prompts after first message is sent
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const emoji = selectedSpecies
    ? ICONIC_TAXON_EMOJI[selectedSpecies.iconicTaxon as IconicTaxon] || '🔬'
    : '';

  return (
    <div className="absolute right-4 top-4 bottom-4 w-[400px] bg-white border border-black shadow-sm z-50 pointer-events-auto flex flex-col rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-black">
        <h2 className="text-xs font-medium uppercase tracking-wider text-black mb-1">
          Species AI
        </h2>
        {selectedSpecies ? (
          <div className="mt-4 flex items-start gap-3">
            {selectedSpecies.photoUrl ? (
              <div className="w-16 h-16 relative bg-gray-100 border border-black overflow-hidden shrink-0">
                <Image
                  src={selectedSpecies.photoUrl}
                  alt={selectedSpecies.commonName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 border border-black shrink-0 text-2xl">
                {emoji}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium uppercase tracking-wide text-black truncate">
                {selectedSpecies.commonName}
              </p>
              <p className="text-xs text-gray-600 italic truncate mt-0.5">
                {selectedSpecies.name}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-600 uppercase tracking-wide mt-2">
            Ask me to filter species by type or time
          </p>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs text-gray-600 uppercase tracking-wide">
              {selectedSpecies ? 'Ask me anything about this species!' : 'Ask me to filter species by type or time'}
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 border border-black ${
                    msg.role === 'user'
                      ? 'bg-black text-white'
                      : 'bg-white text-black'
                  }`}
                >
                  <p className="text-xs leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
            {/* Show prompt suggestions after welcome message */}
            {showPrompts && promptSuggestions.length > 0 && messages.length === 1 && (
              <div className="space-y-2 mt-2">
                <p className="text-xs text-gray-600 uppercase tracking-wide mb-3">
                  Try asking:
                </p>
                <div className="flex flex-col gap-2">
                  {promptSuggestions.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePromptClick(prompt)}
                      className="text-left px-4 py-2.5 border border-black bg-white text-black
                               text-xs hover:bg-black hover:text-white
                               transition-colors cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-black p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black animate-pulse" />
                <div className="w-2 h-2 bg-black animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-black animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-black">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={selectedSpecies ? "Ask about this species..." : "Ask to filter species..."}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-black bg-white text-black text-xs
                     placeholder-gray-500 uppercase tracking-wide focus:outline-none
                     focus:ring-2 focus:ring-black disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="px-6 py-2 bg-black text-white border border-black
                     text-xs font-medium uppercase tracking-wide hover:bg-white hover:text-black
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
