import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Globe2, 
  FileText, 
  TrendingUp, 
  ArrowLeft, 
  Search, 
  RefreshCw,
  Info,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { callGroqAPI, fetchArticleContent, extractTextFromResponse, parseJSONFromResponse } from '../config/api';

export default function DetectorPage() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('url'); // 'url' or 'text'
  const [textInput, setTextInput] = useState('');

  const analyzeArticle = async () => {
    let textToAnalyze = '';
    let sourceUrl = '';

    if (activeTab === 'url') {
      if (!url.trim()) {
        setError('Please enter a valid URL');
        return;
      }
      try {
        new URL(url);
        sourceUrl = url;
      } catch {
        setError('Please enter a valid URL (must include http:// or https://)');
        return;
      }
    } else {
      if (!textInput.trim() || textInput.length < 50) {
        setError('Please paste more text (at least 50 characters)');
        return;
      }
      textToAnalyze = textInput;
      sourceUrl = 'Manual Input';
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      if (activeTab === 'url') {
        try {
          textToAnalyze = await fetchArticleContent(url);
        } catch (fetchErr) {
          throw new Error(`${fetchErr.message}. The site might be blocking automated access. Try the "Paste Text" option.`);
        }
      }
      
      if (!textToAnalyze || textToAnalyze.length < 100) {
        throw new Error('Insufficient content extracted. Try pasting the text manually.');
      }

      const prompt = `Analyze this news article for credibility based on the following text:
      
      TEXT: "${textToAnalyze.substring(0, 8000)}..."
      
      SOURCE: ${sourceUrl}
      
      Please provide a detailed, critical analysis in this exact JSON format:
      {
        "credibilityScore": <number 0-100>,
        "verdict": "<CREDIBLE|QUESTIONABLE|LIKELY_FAKE>",
        "sourceReliability": "<HIGH|MEDIUM|LOW|UNKNOWN>",
        "sourceName": "<inferred source name>",
        "positiveIndicators": ["<indicator1>", "<indicator2>"],
        "negativeIndicators": ["<indicator1>", "<indicator2>"],
        "contentQuality": "<assessment>",
        "recommendations": "<recommendations>",
        "summary": "<brief summary>"
      }`;

      const response = await callGroqAPI(prompt);
      const responseText = extractTextFromResponse(response);
      const analysis = parseJSONFromResponse(responseText);
      setResult(analysis);

    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'Verification failed. Please check your connection or try manual input.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading && !e.shiftKey) {
      e.preventDefault();
      analyzeArticle();
    }
  };

  const resetAnalysis = () => {
    setUrl('');
    setTextInput('');
    setResult(null);
    setError('');
  };

  const getVerdictStyles = (verdict) => {
    switch (verdict) {
      case 'CREDIBLE': return { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: <CheckCircle2 className="w-5 h-5" /> };
      case 'QUESTIONABLE': return { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', icon: <AlertTriangle className="w-5 h-5" /> };
      case 'LIKELY_FAKE': return { text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200', icon: <XCircle className="w-5 h-5" /> };
      default: return { text: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200', icon: <Info className="w-5 h-5" /> };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 w-full bg-white/70 backdrop-blur-lg z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors py-2"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm font-medium">Dashboard</span>
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-slate-900 rounded flex items-center justify-center">
                <Globe2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">TruthCheck</span>
            </div>

            <div className="w-20 hidden sm:block"></div> {/* Spacer */}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Workspace Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">News Credibility Analysis</h1>
          <p className="text-slate-500">Provide an article URL or paste text to perform a deep credibility audit.</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          {/* Tabs */}
          <div className="flex bg-slate-50/50 p-1 border-b border-slate-200">
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'url' 
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => { setActiveTab('url'); setError(''); }}
            >
              Article URL
            </button>
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'text' 
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => { setActiveTab('text'); setError(''); }}
            >
              Direct Text
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'url' ? (
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="https://www.nytimes.com/..."
                    className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition-all"
                    disabled={loading}
                  />
                </div>
                <div className="flex items-center justify-end">
                  
                  <button
                    onClick={analyzeArticle}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 disabled:bg-slate-200 disabled:text-slate-500 transition-all font-semibold shadow-lg shadow-slate-900/10 active:scale-95"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    {loading ? 'Analyzing...' : 'Analyze Now'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Paste the full article content here for a comprehensive audit..."
                  className="block w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none min-h-60 resize-none transition-all"
                  disabled={loading}
                />
                <button
                  onClick={analyzeArticle}
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 disabled:bg-slate-200 disabled:text-slate-500 transition-all font-semibold"
                >
                  {loading ? 'Processing...' : 'Audit Text'}
                </button>
              </div>
            )}

            {error && (
              <div className="mt-6 flex items-start gap-3 p-4 bg-rose-50 border border-rose-100 rounded-xl animate-fade-in">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <p className="text-sm text-rose-700 leading-relaxed font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Loading Overlay Styles & Logic (Skeleton or Spinner) */}
        {loading && (
          <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-16 text-center animate-pulse">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-8 h-8 text-slate-300 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Analyzing Credibility</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Cross-referencing claims and auditing source reputation with Llama 3 agents...</p>
          </div>
        )}

        {/* Results Workspace */}
        {result && !loading && (
          <div className="space-y-6 animate-slide-up">
            {/* Main Score & Verdict */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                 <div className="flex items-start justify-between mb-8">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Detection Result</span>
                      <h2 className="text-3xl font-bold text-slate-900">{result.sourceName || 'Unknown Source'}</h2>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-tight ${getVerdictStyles(result.verdict).bg} ${getVerdictStyles(result.verdict).text} ${getVerdictStyles(result.verdict).border}`}>
                      {getVerdictStyles(result.verdict).icon}
                      {result.verdict.replace('_', ' ')}
                    </div>
                 </div>

                 <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-500 px-1 uppercase tracking-tight">
                      <span>Credibility Confidence</span>
                      <span>{result.credibilityScore}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ease-out rounded-full ${result.credibilityScore > 70 ? 'bg-emerald-500' : result.credibilityScore > 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                        style={{ width: `${result.credibilityScore}%` }}
                      ></div>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col justify-center items-center text-center">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">Reliability</span>
                 <div className={`text-4xl font-black mb-2 ${result.sourceReliability === 'HIGH' ? 'text-emerald-600' : result.sourceReliability === 'MEDIUM' ? 'text-amber-600' : 'text-rose-600'}`}>
                    {result.sourceReliability}
                 </div>
                 <p className="text-xs text-slate-400 font-medium">Domain Trust Rating</p>
              </div>
            </div>

            {/* Analysis Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Positive Indicators */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900">Green Flags</h3>
                </div>
                <ul className="space-y-4">
                  {result.positiveIndicators?.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed border-l-2 border-emerald-100 pl-4 py-0.5">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Negative Indicators */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center text-rose-600">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900">Risk Factors</h3>
                </div>
                <ul className="space-y-4">
                  {result.negativeIndicators?.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed border-l-2 border-rose-100 pl-4 py-0.5">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Detailed Insights */}
            <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <FileText className="w-24 h-24" />
               </div>
               <div className="relative z-10">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-4">Deep Insight Summary</h3>
                  <p className="text-slate-300 leading-relaxed text-lg mb-6">{result.summary}</p>
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-indigo-300" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Quality Audit</p>
                        <p className="text-sm font-semibold">{result.contentQuality}</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Actionable Recommendations</h3>
              <p className="text-slate-600 leading-relaxed italic border-l-4 border-indigo-500 pl-6 py-2">
                "{result.recommendations}"
              </p>
            </div>

            {/* CTA */}
            <div className="flex justify-center pt-8">
               <button
                  onClick={resetAnalysis}
                  className="px-10 py-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-bold shadow-xl shadow-slate-900/10 flex items-center gap-3 active:scale-95"
               >
                  Audit New Article
                  <ChevronRight className="w-5 h-5" />
               </button>
            </div>
          </div>
        )}

      
      </main>
    </div>
  );
}

