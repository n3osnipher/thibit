<div align="center">

# 🔍 Fake News Detector

**AI-powered news credibility analysis using Llama 3.3 70B**

Instantly verify the trustworthiness of any news article with deep source auditing, bias detection, and credibility scoring — all powered by state-of-the-art large language models.

[![Version](https://img.shields.io/badge/version-1.0.0-0d6efd.svg)](https://github.com/sniphern3o/fake-news-detector-ai)
[![License](https://img.shields.io/badge/license-MIT-10b981.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-6366f1.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-18-61dafb.svg)](https://react.dev)

</div>

---

## 📸 Screenshots

<div align="center">
<table>
  <tr>
    <td align="center"><strong>Landing Page</strong></td>
    <td align="center"><strong>Detector Interface</strong></td>
  </tr>
  <tr>
    <td><img src="Screenshots/Fake News Detector - AI-Powered Credibility Analysis - Brave 2_22_2026 1_59_37 AM.png" width="400" /></td>
    <td><img src="Screenshots/Fake News Detector - AI-Powered Credibility Analysis - Brave 2_22_2026 1_59_45 AM.png" width="400" /></td>
  </tr>
  <tr>
    <td align="center"><strong>URL Analysis</strong></td>
    <td align="center"><strong>Credibility Results</strong></td>
  </tr>
  <tr>
    <td><img src="Screenshots/Fake News Detector - AI-Powered Credibility Analysis - Brave 2_22_2026 2_00_13 AM.png" width="400" /></td>
    <td><img src="Screenshots/Fake News Detector - AI-Powered Credibility Analysis - Brave 2_22_2026 2_01_24 AM.png" width="400" /></td>
  </tr>
</table>
</div>

---

## ✨ Key Features

| Feature                    | Description                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------- |
| 🧠 **AI-Powered Analysis** | Uses Groq's Llama 3.3 70B model for deep credibility assessment                    |
| 🔗 **URL Analysis**        | Paste any article URL — the backend proxy fetches and parses content automatically |
| 📝 **Manual Text Input**   | Paste article text directly as a fallback when URL fetching isn't possible         |
| 🏛️ **Source Auditing**     | Investigates domain authority, publication history, and track record               |
| ⚖️ **Bias Detection**      | Identifies emotional manipulation, loaded language, and political slant            |
| 📊 **Credibility Scoring** | Generates a 0–100 credibility score with detailed category breakdowns              |
| 🎨 **Modern UI**           | Sleek, responsive interface built with React and Tailwind CSS                      |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                     Frontend                        │
│          React 18 · Vite · Tailwind CSS             │
│                                                     │
│  ┌──────────┐    ┌──────────────┐   ┌────────────┐  │
│  │ Landing  │───▶│   Detector   │──▶│  Results   │  │
│  │  Page    │    │    Page      │   │  Display   │  │
│  └──────────┘    └──────┬───────┘   └────────────┘  │
└─────────────────────────┼───────────────────────────┘
                          │
              ┌───────────┼───────────┐
              ▼                       ▼
   ┌────────────────────┐  ┌───────────────────┐
   │   Backend Proxy    │  │   Groq API        │
   │   Node.js/Express  │  │   Llama 3.3 70B   │
   │   :3001            │  │                   │
   └────────────────────┘  └───────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18 or higher
- **Groq API Key** — get one free at [console.groq.com](https://console.groq.com/)

### 1. Clone the repository

```bash
git clone https://github.com/sniphern3o/fake-news-detector-ai.git
cd fake-news-detector-ai
```

### 2. Install dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 3. Configure environment variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### 4. Start the application

Open **two terminals** and run:

```bash
# Terminal 1 — Backend
cd backend && npm run dev
# ✓ Backend proxy running on http://localhost:3001
```

```bash
# Terminal 2 — Frontend
cd frontend && npm run dev
# ✓ App available at http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser and start analyzing.

---

## 📁 Project Structure

```
fake-news-detector/
├── backend/
│   ├── src/
│   │   └── index.js          # Express proxy server
│   ├── .env                   # Backend environment config
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── config/
│   │   │   └── api.js         # API configuration & prompts
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   └── DetectorPage.jsx
│   │   ├── App.jsx            # Root component & routing
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── .env                   # Frontend environment config
│   └── package.json
├── Screenshots/               # App screenshots
├── API.md                     # Full API documentation
├── SETUP.md                   # Detailed setup guide
├── QUICKSTART.md              # Quick start reference
└── README.md
```

---

## ⚙️ How It Works

1. **Input** — User provides a news article via URL or pasted text.
2. **Content Extraction** — The backend proxy fetches and parses the article using Axios and Cheerio, bypassing CORS and anti-bot protections.
3. **AI Analysis** — The extracted content is sent to Groq's Llama 3.3 70B model with a specialized fact-checking prompt.
4. **Credibility Report** — The AI returns a structured JSON response with a credibility score (0–100), bias indicators, source reliability metrics, and detailed reasoning.

> If the URL fetch fails, the app gracefully falls back to manual text input — so analysis is always possible.

---

## �️ Tech Stack

| Layer        | Technologies                                                   |
| ------------ | -------------------------------------------------------------- |
| **Frontend** | React 18, Vite 6, Tailwind CSS 4, React Router 6, Lucide Icons |
| **Backend**  | Node.js, Express, Axios, Cheerio                               |
| **AI / LLM** | Groq API — Llama 3.3 70B Versatile                             |

---

## 🐛 Troubleshooting

<details>
<summary><strong>"Failed to fetch article"</strong></summary>

- Make sure the backend is running on port `3001`.
- Some websites actively block scraping — use the **Paste Text** tab instead.
</details>

<details>
<summary><strong>"API Key Error"</strong></summary>

- Ensure `.env` exists inside the `frontend/` directory.
- The variable must be named exactly `VITE_GROQ_API_KEY`.
- Restart the frontend dev server after changing `.env`.
</details>

<details>
<summary><strong>CORS errors</strong></summary>

- The backend proxy handles CORS — make sure it's running before the frontend.
- Check that the frontend is pointing to `http://localhost:3001`.
</details>

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "Add amazing feature"`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ using React, Groq AI, and Llama 3.3</sub>
</div>
