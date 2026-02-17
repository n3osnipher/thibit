# Detailed Setup Guide

Complete instructions for installing, configuring, and running the Fake News Detector.

## 📦 Project Overview

The system consists of two parts:

1. **Frontend**: A React application built with Vite and Tailwind CSS.
2. **Backend**: A Node.js Express server that acts as a proxy for scraping article content.

## 🛠 Prerequisites

Ensure you have the following installed:

- **Node.js (v18 or higher)**: [https://nodejs.org/](https://nodejs.org/)
- **npm** (included with Node.js)
- A **Groq API Key**: [https://console.groq.com/](https://console.groq.com/)

---

## 🏗 Installation

### 1. Clone & Navigate

```bash
cd fake-news-detector
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

---

## 🔑 Configuration

### Environment Variables

The application requires an API key in the frontend to communicate with Groq.

1. In the `frontend` directory, create a `.env` file.
2. Add your key:
   ```env
   VITE_GROQ_API_KEY=gsk_your_key_here
   ```

_(Optional) The backend also supports a `.env` file for port configuration, but defaults to 3001 if omitted._

---

## 🚀 Running the App

### Development Mode (Recommended)

Requires two terminal sessions.

**Terminal 1: Backend Scraper**

```bash
cd backend
npm run dev
```

_Port: 3001_

**Terminal 2: Frontend App**

```bash
cd frontend
npm run dev
```

_Port: 5173_

---

## 📁 Folder Structure

```
.
├── backend/
│   ├── src/index.js       # Scraper logic
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── config/api.js  # API & Proxy logic
│   │   ├── pages/         # UI Components
│   │   └── main.jsx       # Entry point
│   └── package.json
└── README.md
```

## 🐛 Troubleshooting

### Proxy Errors

If you see "Failed to fetch article":

- Verify the backend is running on `http://localhost:3001`.
- Check if the article URL is publicly accessible.

### API Issues

If analysis fails with an API error:

- Ensure `VITE_GROQ_API_KEY` is correctly set in `frontend/.env`.
- Check your Groq usage limits.

### Styling Not Loading

- If Tailwind styles are missing, ensure you ran `npm install` in the `frontend` folder.
- Restart the development server.

---

## 🚢 Deployment

### Frontend (e.g., Vercel / Netlify)

- Build the app: `cd frontend && npm run build`.
- Deploy the `dist` folder.
- **IMPORTANT**: You must also host the backend proxy somewhere (e.g., Render, Railway) and update `frontend/src/config/api.js` with the production backend URL.

---

**Built with ❤️ using React and Groq AI**
