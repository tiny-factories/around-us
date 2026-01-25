'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Species, ICONIC_TAXON_EMOJI, IconicTaxon } from '@/lib/types';

interface ChatInterfaceProps {
  selectedSpecies?: Species | null;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatInterface({ selectedSpecies }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with species info when selectedSpecies changes
  useEffect(() => {
    if (selectedSpecies && messages.length === 0) {
      const emoji = ICONIC_TAXON_EMOJI[selectedSpecies.iconicTaxon as IconicTaxon] || '🔬';
      const welcomeMessage = `I see you're interested in the ${selectedSpecies.commonName} (${selectedSpecies.name}). 
I can help you learn more about this species - its habitat, behavior, identification tips, and more. What would you like to know?`;
      
      setMessages([
        {
          role: 'assistant',
          content: welcomeMessage,
        },
      ]);
    } else if (!selectedSpecies && messages.length > 0) {
      // Clear messages when no species is selected
      setMessages([]);
    }
  }, [selectedSpecies]);

  const handleSend = async () => {
    if (!input.trim() || loading || !selectedSpecies) return;

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
          speciesData: selectedSpecies,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.content }]);
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
    <div className="absolute right-4 top-4 bottom-4 w-[400px] bg-white border border-black shadow-lg z-50 pointer-events-auto flex flex-col">
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
            Click on a species observation to start chatting
          </p>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && selectedSpecies ? (
          <div className="text-center py-8">
            <p className="text-xs text-gray-600 uppercase tracking-wide">
              Ask me anything about this species!
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs text-gray-600 uppercase tracking-wide">
              Select a species observation to learn more
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => (
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
          ))
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
      {selectedSpecies && (
        <div className="p-6 border-t border-black">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about this species..."
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
      )}
    </div>
  );
}
