
export const API_CONFIG = {
  // Groq API endpoint (OpenAI compatible)
  BASE_URL: 'https://api.groq.com/openai/v1/chat/completions',
  
  // Model to use for analysis (Updated to latest stable Llama 3.3)
  MODEL: 'llama-3.3-70b-versatile',
  
  // Maximum tokens for response
  MAX_TOKENS: 1000,
  
  // Timeout for API requests (milliseconds)
  TIMEOUT: 30000,
  
  // CORS Proxy for fetching article content
  PROXY_URL: 'https://api.allorigins.win/get?url=',
};

/**
 * Fetches article content using multiple CORS proxies (Waterfall strategy)
 * @param {string} url - The URL of the article
 * @returns {Promise<string>} - The article text content
 */
export async function fetchArticleContent(url) {
  const proxies = [
    // Priority 1: Local Backend (Most reliable, handles anti-bot)
    { url: (u) => `http://localhost:3001/api/fetch-article?url=${encodeURIComponent(u)}`, type: 'json' },
    // Priority 2: AllOrigins (Public proxy fallback)
    { url: (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`, type: 'json' },
    // Priority 3: Corsproxy.io (Direct HTML fallback)
    { url: (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`, type: 'text' }
  ];

  let lastError = null;

  for (const proxy of proxies) {
    try {
      console.log(`Trying proxy: ${proxy.url(url)}`); // Debug log
      const response = await fetch(proxy.url(url));
      
      if (!response.ok) {
        throw new Error(`Proxy status: ${response.status}`);
      }
      
      let htmlContent = '';
      if (proxy.type === 'json') {
        const data = await response.json();
        // Local backend returns { content: "..." }, AllOrigins returns { contents: "..." }
        htmlContent = data.content || data.contents;
      } else {
        htmlContent = await response.text();
      }

      if (!htmlContent || htmlContent.length < 500) {
        throw new Error('Content too short or empty');
      }

      return parseHtmlContent(htmlContent);
    } catch (error) {
      console.warn(`Proxy failed:`, error);
      lastError = error;
      // Continue to next proxy
    }
  }

  throw new Error(`Could not fetch article. Please use the "Paste Text" option. (Details: ${lastError?.message})`);
}

/**
 * Helper to parse HTML string into clean text
 */
function parseHtmlContent(html) {
  // Create a temporary DOM element to strip HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Remove scripts, styles, and other non-content elements
  const scripts = doc.querySelectorAll('script, style, nav, footer, header, aside, iframe, .ad, .advertisement');
  scripts.forEach(script => script.remove());
  
  // Get text content and clean it up
  const text = doc.body.textContent || "";
  return text.replace(/\s+/g, ' ').trim().substring(0, 15000); // Limit length
}

/**
 * Makes a request to the Groq API
 * @param {string} prompt - The prompt to send
 * @returns {Promise<Object>} - The API response
 */
export async function callGroqAPI(prompt) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error('Missing Groq API Key. Please check your .env file.');
  }

  try {
    const response = await fetch(API_CONFIG.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: API_CONFIG.MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert fact-checker and fake news detector. Analyze the provided article text JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: { type: "json_object" }, // Enforce JSON mode
        max_tokens: API_CONFIG.MAX_TOKENS,
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(`API request failed: ${response.status} ${err.error?.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Extracts text content from Groq/OpenAI response
 * @param {Object} response - The API response
 * @returns {string} - Extracted text content
 */
export function extractTextFromResponse(response) {
  return response.choices?.[0]?.message?.content || "";
}

/**
 * Parses JSON from the response
 * @param {string} text - The response text
 * @returns {Object} - Parsed JSON object
 */
export function parseJSONFromResponse(text) {
  try {
    // Clean up potential markdown formatting
    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("JSON Parse Error", e);
    throw new Error('Could not parse analysis results');
  }
}
