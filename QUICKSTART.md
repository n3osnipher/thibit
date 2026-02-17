# Quick Start Guide

Get your Fake News Detector running in 5 minutes!

## Prerequisites

- **Node.js 18+** ([Download](https://nodejs.org/))
- **Groq API Key** ([Get it here](https://console.groq.com/))
- **Terminal/Command Prompt**

## Step-by-Step Setup

### 1. Install Dependencies

You must install packages for both the backend and the frontend.

```bash
# In the project root:

# Backend dependencies
cd backend && npm install

# Frontend dependencies
cd ../frontend && npm install
```

### 2. Configure API Key

Create a `.env` file in the `frontend` folder:

```env
VITE_GROQ_API_KEY=your_actual_key_here
```

### 3. Start the Application

You need two terminal windows:

**Terminal 1 (Backend):**

```bash
cd backend && npm run dev
```

**Terminal 2 (Frontend):**

```bash
cd frontend && npm run dev
```

### 4. Test the Application

1. Open your browser to `http://localhost:5173`.
2. Paste a news article URL (e.g., from NYTimes, BBC, Reuters).
3. Click **"Analyze"**.
4. View the AI-powered credibility report!

## Common Commands

```bash
# Backend
npm run start    # Start production server
npm run dev      # Start development server (auto-reload)

# Frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Troubleshooting

- **Backend not running**: Ensure you're in the `backend` folder and ran `npm install`.
- **API Key error**: Check `frontend/.env` name and variable prefix (`VITE_`).
- **Port Conflict**: If port 3001 or 5173 are busy, Vite/Express will notify you.

---

**Happy coding! 🚀**
