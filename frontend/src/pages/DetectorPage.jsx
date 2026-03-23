import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  TrendingUp, 
  ArrowLeft, 
  Search, 
  RefreshCw,
  Info,
  ChevronRight,
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
  const [activeTab, setActiveTab] = useState('url');
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
      case 'CREDIBLE': return { text: 'text-emerald', bg: 'bg-emerald-light', border: 'border-emerald/20', icon: <CheckCircle2 className="w-5 h-5" /> };
      case 'QUESTIONABLE': return { text: 'text-amber-accent', bg: 'bg-amber-light', border: 'border-amber-accent/20', icon: <AlertTriangle className="w-5 h-5" /> };
      case 'LIKELY_FAKE': return { text: 'text-rose-accent', bg: 'bg-rose-light', border: 'border-rose-accent/20', icon: <XCircle className="w-5 h-5" /> };
      default: return { text: 'text-navy-faded', bg: 'bg-ice', border: 'border-border-subtle', icon: <Info className="w-5 h-5" /> };
    }
  };

  const getScoreColor = (score) => {
    if (score > 70) return 'bg-emerald';
    if (score > 40) return 'bg-amber-accent';
    return 'bg-rose-accent';
  };

  const getReliabilityColor = (rel) => {
    if (rel === 'HIGH') return 'text-emerald';
    if (rel === 'MEDIUM') return 'text-amber-accent';
    return 'text-rose-accent';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 w-full bg-white border-b border-border-subtle z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 text-slate-text hover:text-navy transition-colors py-2"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm font-semibold uppercase tracking-wide">Back</span>
            </button>
            
            <span className="text-xl font-bold text-navy tracking-tight font-display italic">Thibit</span>

            <div className="w-16 hidden sm:block" />
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-navy tracking-tight uppercase mb-2">Credibility Analysis</h1>
          <p className="text-slate-text text-sm">Provide an article URL or paste text to perform a deep credibility audit.</p>
        </div>

        {/* Input Section */}
        <div className="bg-ice rounded-3xl overflow-hidden mb-8">
          {/* Tabs */}
          <div className="flex p-1.5 bg-lavender/50">
            <button
              className={`flex-1 py-2.5 px-4 text-sm font-bold rounded-2xl transition-all uppercase tracking-wide ${
                activeTab === 'url' 
                  ? 'bg-white text-navy shadow-sm' 
                  : 'text-navy-faded hover:text-navy'
              }`}
              onClick={() => { setActiveTab('url'); setError(''); }}
            >
              Article URL
            </button>
            <button
              className={`flex-1 py-2.5 px-4 text-sm font-bold rounded-2xl transition-all uppercase tracking-wide ${
                activeTab === 'text' 
                  ? 'bg-white text-navy shadow-sm' 
                  : 'text-navy-faded hover:text-navy'
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
                    <Search className="h-5 w-5 text-navy-faded" />
                  </div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="https://www.reuters.com/..."
                    className="block w-full pl-12 pr-4 py-4 bg-white border border-border-subtle rounded-2xl text-charcoal placeholder:text-navy-faded/50 focus:ring-2 focus:ring-navy/15 focus:border-navy outline-none transition-all text-sm"
                    disabled={loading}
                  />
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={analyzeArticle}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-navy text-white rounded-full hover:bg-navy-light disabled:bg-border-subtle disabled:text-slate-text transition-all font-bold text-sm uppercase tracking-wider active:scale-[0.97]"
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
                  placeholder="Paste the full article content here..."
                  className="block w-full px-4 py-4 bg-white border border-border-subtle rounded-2xl text-charcoal placeholder:text-navy-faded/50 focus:ring-2 focus:ring-navy/15 focus:border-navy outline-none min-h-60 resize-none transition-all text-sm"
                  disabled={loading}
                />
                <button
                  onClick={analyzeArticle}
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-navy text-white rounded-full hover:bg-navy-light disabled:bg-border-subtle disabled:text-slate-text transition-all font-bold text-sm uppercase tracking-wider"
                >
                  {loading ? 'Processing...' : 'Audit Text'}
                </button>
              </div>
            )}

            {error && (
              <div className="mt-6 flex items-start gap-3 p-4 bg-rose-light border border-rose-accent/10 rounded-2xl animate-fade-in">
                <AlertCircle className="w-5 h-5 text-rose-accent shrink-0" />
                <p className="text-sm text-rose-accent leading-relaxed font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-ice rounded-3xl border-2 border-dashed border-lavender-dark p-16 text-center animate-pulse">
            <div className="w-16 h-16 bg-lavender rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-7 h-7 text-navy-faded animate-spin" />
            </div>
            <h3 className="text-lg font-bold text-navy mb-2 uppercase tracking-wide">Analyzing Credibility</h3>
            <p className="text-sm text-navy-faded max-w-sm mx-auto">Cross-referencing claims and auditing source reputation...</p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-5 animate-slide-up">
            {/* Score + Verdict */}
            <div className="grid md:grid-cols-3 gap-5">
              <div className="md:col-span-2 bg-ice rounded-3xl p-8">
                 <div className="flex items-start justify-between mb-8">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-navy-faded mb-2 block">Detection Result</span>
                      <h2 className="text-3xl font-bold text-navy uppercase tracking-tight">{result.sourceName || 'Unknown Source'}</h2>
                    </div>
                    <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-tight ${getVerdictStyles(result.verdict).bg} ${getVerdictStyles(result.verdict).text} ${getVerdictStyles(result.verdict).border}`}>
                      {getVerdictStyles(result.verdict).icon}
                      {result.verdict.replace('_', ' ')}
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-navy-faded uppercase tracking-tight px-1">
                      <span>Credibility Confidence</span>
                      <span>{result.credibilityScore}%</span>
                    </div>
                    <div className="h-2.5 bg-lavender rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ease-out rounded-full ${getScoreColor(result.credibilityScore)}`}
                        style={{ width: `${result.credibilityScore}%` }}
                      />
                    </div>
                 </div>
              </div>

              <div className="bg-navy rounded-3xl p-8 flex flex-col justify-center items-center text-center text-white">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4 block">Reliability</span>
                 <div className={`text-4xl font-black mb-2 ${result.sourceReliability === 'HIGH' ? 'text-emerald' : result.sourceReliability === 'MEDIUM' ? 'text-amber-accent' : 'text-rose-accent'}`}>
                    {result.sourceReliability}
                 </div>
                 <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Domain Trust</p>
              </div>
            </div>

            {/* Indicators */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-ice rounded-3xl p-7">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-9 h-9 bg-emerald rounded-xl flex items-center justify-center text-white">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-navy uppercase tracking-wide text-sm">Green Flags</h3>
                </div>
                <ul className="space-y-3">
                  {result.positiveIndicators?.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-charcoal leading-relaxed border-l-2 border-emerald/25 pl-4 py-0.5">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-ice rounded-3xl p-7">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-9 h-9 bg-rose-accent rounded-xl flex items-center justify-center text-white">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-navy uppercase tracking-wide text-sm">Risk Factors</h3>
                </div>
                <ul className="space-y-3">
                  {result.negativeIndicators?.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-charcoal leading-relaxed border-l-2 border-rose-accent/25 pl-4 py-0.5">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Deep Insight */}
            <div className="bg-navy rounded-3xl p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                 <FileText className="w-24 h-24" />
               </div>
               <div className="relative z-10">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Deep Insight Summary</h3>
                 <p className="text-white/70 leading-relaxed text-base mb-6">{result.summary}</p>
                 <div className="pt-6 border-t border-white/10 flex items-center gap-3">
                   <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                     <TrendingUp className="w-5 h-5 text-white/60" />
                   </div>
                   <div>
                     <p className="text-[10px] uppercase font-bold text-white/30 tracking-wider">Quality Audit</p>
                     <p className="text-sm font-semibold">{result.contentQuality}</p>
                   </div>
                 </div>
               </div>
            </div>

            {/* Recommendations */}
            <div className="bg-ice rounded-3xl p-8">
              <h3 className="text-sm font-bold text-navy uppercase tracking-wide mb-4 pb-4 border-b border-navy/10">Recommendations</h3>
              <p className="text-slate-text leading-relaxed italic border-l-4 border-navy pl-6 py-2 text-sm">
                "{result.recommendations}"
              </p>
            </div>

            {/* Reset CTA */}
            <div className="flex justify-center pt-6">
               <button
                 onClick={resetAnalysis}
                 className="px-10 py-4 bg-navy text-white rounded-full hover:bg-navy-light transition-all font-bold text-sm uppercase tracking-wider flex items-center gap-3 active:scale-[0.97]"
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
