# Fake News Detector - AI-Powered News Credibility Analysis

A modern, AI-powered web application that analyzes news articles for credibility and trustworthiness. Built with React, Vite, and the **Groq API (Llama 3.3)**.

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

- `/frontend`: React + Vite + Tailwind CSS (Vercel-style UI).
- `/backend`: Node.js + Express + Cheerio (URL-parsing proxy for bypassing CORS).

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v18+)
- Groq API Key (from [Groq Console](https://console.groq.com/))

### 2. Installation

Install dependencies in both folders:

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 3. Configuration

Add your Groq API key to `/frontend/.env`:

```env
VITE_GROQ_API_KEY=your_key_here
```

### 4. Running the Application

You must start both the backend and the frontend:

**Terminal 1 (Backend):**

```bash
cd backend && npm run dev
```

_Wait for: `Backend proxy running on http://localhost:3001`_

**Terminal 2 (Frontend):**

```bash
cd frontend && npm run dev
```

_Wait for: `Local: http://localhost:5173`_

Visit `http://localhost:5173` to start analyzing.

## 📁 Project Structure

```
fake-news-detector/
├── backend/
│   ├── src/
│   │   └── index.js         # Express server & content scraper
│   ├── .env                 # Backend environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── config/
│   │   │   └── api.js       # API configuration and utilities
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   └── DetectorPage.jsx
│   │   ├── App.jsx          # Main app component with routing
│   │   └── main.jsx         # Entry point
│   ├── .env                 # Frontend environment variables
│   └── package.json
└── README.md                # This file
```

## 🔑 API Configuration

### Groq AI API

This application uses the **Groq API (Llama 3.3)** for AI-powered analysis.

1. **Get an API Key**
   - Sign up at [Groq Console](https://console.groq.com/)
   - Create a new API key

2. **Set Up Environment Variables**
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_GROQ_API_KEY=your_api_key_here
   ```

## 🔧 How It Works

### Analysis Process

1. **Content Fetching**: The system first attempts to fetch article content via the local backend proxy.
2. **Waterfall Strategy**: If the backend fails, it falls back to public CORS proxies or manual input.
3. **AI Analysis**: The extracted text is sent to the Groq API (Llama 3.3) for analysis.
4. **Scoring**: Analyzes multiple factors (Source reputation, writing style, factual accuracy, bias) to generate a credibility score (0-100).

## 💻 Usage

1. **Enter a URL**: Paste any news article URL on the Detector page.
2. **Analyze**: Click the "Analyze" button.
3. **Manual Input**: If a URL fails to fetch, switch to the "Paste Text" tab.
4. **View Results**: See a detailed breakdown of the article's trustworthiness.

## 🛡 Technologies Used

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, React Router.
- **Backend**: Node.js, Express, Axios, Cheerio.
- **AI**: Groq (Llama 3.3 70B).

## 🐛 Troubleshooting

### Common Issues

#### 1. "Failed to fetch article"

- Ensure the **backend** is running on port 3001.
- Try the "Paste Text" option if the website has aggressive anti-bot protections.

#### 2. API Key Error

- Ensure your `.env` file is in the `frontend` folder and the variable is named `VITE_GROQ_API_KEY`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React and Groq AI**
