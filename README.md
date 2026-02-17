# fake-news-detector-ai

📰 Fake News Detector AI

An AI-powered web application that analyzes online news articles and evaluates their credibility using large language model reasoning.

This system extracts article content from URLs, processes it using advanced AI models, and returns structured credibility analysis including risk indicators, reliability assessment, and recommendations.

🎯 Project Overview

Misinformation spreads faster than verification. Traditional fake news detection systems rely heavily on static machine learning datasets and binary classification models.

This project takes a different approach.

Instead of simply labeling an article as "fake" or "real", the system performs contextual analysis using a Large Language Model and returns structured JSON output including:

Credibility Score (0–100)

Verdict Classification

Source Reliability Assessment

Positive Indicators

Negative Indicators

Content Quality Evaluation

Recommendations

The result is explainable AI-based credibility auditing rather than black-box labeling.

🏗️ System Architecture

The application follows a three-tier architecture:

User (Browser)
↓
React Frontend
↓
Node.js + Express Backend
↓
Groq API (Llama 3.3 Model)

Flow:

User enters article URL or pastes text.

Backend extracts article content using web scraping.

Cleaned content is sent to the AI API.

AI returns structured JSON analysis.

Frontend renders credibility insights.

🔍 How It Works
1️⃣ Article Extraction

The backend fetches the HTML content using Axios and parses it using Cheerio.
Scripts, styles, and irrelevant elements are removed before extracting meaningful text.

2️⃣ AI Prompt Engineering

A structured prompt instructs the AI model to:

Analyze credibility signals

Score reliability

Identify bias indicators

Return strictly formatted JSON output

3️⃣ Structured Output Rendering

The system parses the AI response and displays:

Credibility score

Verdict (Likely Real / Suspicious / Likely Fake)

Key positive and negative indicators

Recommendations

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/yourusername/fake-news-detector-ai.git
cd fake-news-detector-ai

2️⃣ Install Backend Dependencies
cd server
npm install

3️⃣ Install Frontend Dependencies
cd client
npm install

4️⃣ Environment Variables

Create a .env file inside the backend folder:

GROQ_API_KEY=your_api_key_here
PORT=5000

5️⃣ Run Backend
npm run dev

6️⃣ Run Frontend
npm run dev
