import fetch from 'node-fetch';

export const fetchPexelsImages = async (query) => {
  const apiUrl = `/api/fetch-images?query=${query}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }
  const data = await response.json();
  return data;
};