import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file inside backend root
dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); //Allows frontend to access backend
app.use(express.json());

// Helper to determine if a URL is valid
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

app.get('/api/fetch-article', async (req, res) => {
  const { url } = req.query;
  // Scraping logic
  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid or missing URL parameter' });
  }

  try {
    console.log(`Fetching: ${url}`);
    
    // Mimic a real browser to avoid some bot detection
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 10000 // 10 second timeout
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Remove unwanted elements
    $('script, style, nav, footer, header, aside, iframe, .ad, .advertisement, .cookie-banner').remove();

    // Extract text from the body
    // Prefer article tag if available, otherwise body
    let content = $('article').text();
    if (content.length < 500) {
      content = $('main').text();
    }
    if (content.length < 500) {
      content = $('body').text();
    }

    // Clean up whitespace
    const cleanText = content.replace(/\s+/g, ' ').trim();

    if (cleanText.length < 200) {
       return res.status(422).json({ error: 'Could not extract enough meaningful text from this URL.' });
    }

    res.json({ 
      source: url,
      content: cleanText.substring(0, 15000), // Limit length for API
      title: $('title').text().trim() 
    });

  } catch (error) {
    console.error('Fetch error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch article', 
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy running on http://localhost:${PORT}`);
});
