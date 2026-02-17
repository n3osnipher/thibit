# Fake News Detector - AI-Powered News Credibility Analysis

A modern, AI-powered web application that analyzes news articles for credibility and trustworthiness. Built with React, Vite, and the Groq API (Llama 3.3).

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Configuration](#api-configuration)
- [How It Works](#how-it-works)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Deep Source Audit**: Investigates domain authority and historical accuracy.
- **Bias Detection**: Detects emotional manipulation and political slant.
- **Reliable URL Fetching**: Uses a private local proxy to bypass anti-bot protections.
- **Manual Input Fallback**: Allows pasting text directly if a URL cannot be fetched.
- **Modern UI**: Clean, responsive design with real-time analysis visualization.

## 🏗 Architecture

The project is split into two main components:

- `/frontend`: React + Vite + Tailwind CSS
- `/backend`: Node.js + Express + Cheerio (URL-parsing proxy for bypassing CORS)

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v18+)
- Groq API Key (from https://console.groq.com/)

### 2. Installation

Install dependencies in both folders:

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
3. Configuration
Add your Groq API key to /frontend/.env:

VITE_GROQ_API_KEY=your_key_here
4. Running the Application
You must start both the backend and the frontend.

Terminal 1 (Backend):

cd backend && npm run dev
Wait for: Backend proxy running on http://localhost:3001

Terminal 2 (Frontend):

cd frontend && npm run dev
Wait for: Local: http://localhost:5173

Visit http://localhost:5173 to start analyzing.

📁 Project Structure
fake-news-detector/
├── backend/
│   ├── src/
│   │   └── index.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── config/
│   │   │   └── api.js
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   └── DetectorPage.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
└── README.md
🔑 API Configuration
Groq AI API
This application uses the Groq API (Llama 3.3) for AI-powered analysis.

Sign up at https://console.groq.com/

Create a new API key

Add it to your frontend .env file

🔧 How It Works
Content Fetching: Backend proxy extracts article content.

Fallback Strategy: Falls back to manual input if extraction fails.

AI Analysis: Extracted text is sent to Groq (Llama 3.3).

Scoring: Generates a credibility score (0–100) based on source, bias, and content analysis.

💻 Usage
Paste a news article URL.

Click "Analyze".

If fetching fails, use the "Paste Text" option.

View detailed credibility insights.

🛡 Technologies Used
Frontend: React 18, Vite, Tailwind CSS, React Router

Backend: Node.js, Express, Axios, Cheerio

AI: Groq (Llama 3.3 70B)

🐛 Troubleshooting
Failed to fetch article
Ensure backend is running on port 3001.

Use manual input if the site blocks scraping.

API Key Error
Ensure .env is inside the frontend folder.

Confirm variable name is VITE_GROQ_API_KEY.

🤝 Contributing
Pull requests are welcome.

📄 License
MIT License

Built with React and Groq AI


---

Now run:

```bash
git add README.md
git commit -m "Resolved merge conflict - kept local version"
git push