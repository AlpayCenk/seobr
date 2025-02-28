import axios from 'axios';

export default async function handler(req, res) {
  const { url, keyword } = req.body;

  try {
    // 1. Google PageSpeed-Analyse
    const pagespeed = await axios.get(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${process.env.GOOGLE_API_KEY}`
    );

    // 2. KI-Content mit OpenAI
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `Erstelle 5 Blog-Ideen für das Keyword "${keyword}" mit SEO-Tipps für Anfänger.`
        }]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // 3. Bilder von Pexels
    const pexelsResponse = await axios.get(
      `https://api.pexels.com/v1/search?query=${keyword}&per_page=3`,
      { headers: { Authorization: process.env.PEXELS_API_KEY } }
    );

    // Ergebnis zurückgeben
    res.status(200).json({
      score: pagespeed.data.lighthouseResult.categories.performance.score * 100,
      content: openaiResponse.data.choices[0].message.content.split('\n'),
      images: pexelsResponse.data.photos.map(photo => photo.src.medium)
    });

  } catch (error) {
    res.status(500).json({ error: "Analyse fehlgeschlagen 😢" });
  }
}