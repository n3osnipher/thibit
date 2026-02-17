# API Documentation

Complete guide to the Groq API integration and backend proxy in the Fake News Detector.

## Overview

This application uses the **Groq API** (Llama 3.3 70B) to analyze news articles for credibility. To bypass CORS and handle anti-bot protections, it uses a dedicated Node.js/Express backend as a proxy.

## Backend API (Proxy)

The frontend communicates with a local backend to fetch article content.

### Fetch Article Content

`GET http://localhost:3001/api/fetch-article?url={URL}`

**Response Structure:**

```json
{
  "source": "https://example.com/article",
  "content": "Full article text content...",
  "title": "Article Title"
}
```

## AI Analysis (Groq API)

The analysis is performed by sending article text to the Groq API using an OpenAI-compatible interface.

### Endpoint

`POST https://api.groq.com/openai/v1/chat/completions`

### Authentication

1. Get an API key from: [https://console.groq.com/keys](https://console.groq.com/keys)
2. Add to `frontend/.env`:
   ```env
   VITE_GROQ_API_KEY=gsk_...
   ```

### Request Structure

```json
{
  "model": "llama-3.3-70b-versatile",
  "messages": [
    {
      "role": "system",
      "content": "You are an expert fact-checker..."
    },
    {
      "role": "user",
      "content": "Analyze the provided article text..."
    }
  ],
  "response_format": { "type": "json_object" }
}
```

## Configuration (src/config/api.js)

```javascript
export const API_CONFIG = {
  BASE_URL: "https://api.groq.com/openai/v1/chat/completions",
  MODEL: "llama-3.3-70b-versatile",
  MAX_TOKENS: 1000,
  TIMEOUT: 30000,
};
```

## Waterfall Strategy

Fetching content follows this priority:

1. **Local Backend**: High reliability, mimics real browser.
2. **AllOrigins Proxy**: Public CORS proxy fallback.
3. **Corsproxy.io**: Second public fallback.
4. **Manual Input**: Final fallback if all network methods fail.

## Troubleshooting

### "Content Fetch Error"

- Ensure the backend is running: `cd backend && npm run dev`.
- Check if the source website blocks most scrapers.
- Use the **"Paste Text"** tab to manually input the article content.

### "API Error"

- Verify `VITE_GROQ_API_KEY` in `frontend/.env`.
- Check [Groq Status](https://status.groq.com/) for service outages.

---

**Questions?** Check the main [README.md](README.md) or Groq's official documentation.
