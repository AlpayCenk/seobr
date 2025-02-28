import fetch from 'node-fetch';

export const fetchOpenAIContent = async (prompt) => {
  const response = await fetch('/api/generate-content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });
  if (!response.ok) {
    throw new Error('Failed to generate content');
  }
  const data = await response.json();
  return data;
};