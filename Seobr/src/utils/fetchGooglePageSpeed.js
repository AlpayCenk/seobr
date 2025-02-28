import fetch from 'node-fetch';

export const fetchGooglePageSpeed = async (url) => {
  const apiUrl = `/api/analyze-seo?url=${url}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch SEO analysis');
  }
  const data = await response.json();
  return data;
};