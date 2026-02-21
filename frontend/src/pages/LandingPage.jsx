import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Search, CheckCircle2, BarChart3, Globe2, ArrowRight, Lock, ExternalLink } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-teal-100 selection:text-teal-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-stone-900 tracking-tight">TruthCheck</span>
            </div>
            <div className="flex items-center gap-5">
              <a href="#how-it-works" className="text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors hidden sm:block">
                How it works
              </a>
              <button
                onClick={() => navigate('/detector')}
                className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium text-sm"
              >
                Open App
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-teal-700 mb-4 tracking-wide uppercase animate-fade-in">
              Free &amp; open-source verification tool
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 mb-6 tracking-tight leading-[1.1] animate-slide-up">
              Don't share it until<br />you've checked it.
            </h1>

            <p className="text-lg text-stone-500 mb-10 max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Paste any article or URL. Our AI cross-references sources, 
              flags bias, and checks claims — in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-start animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <button
                onClick={() => navigate('/detector')}
                className="group px-7 py-3.5 bg-teal-700 text-white rounded-xl hover:bg-teal-800 transition-all font-medium text-base flex items-center gap-2"
              >
                Analyze an article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <a
                href="#how-it-works"
                className="px-7 py-3.5 text-stone-600 hover:text-stone-900 transition-colors font-medium text-base"
              >
                See how it works ↓
              </a>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm text-stone-400 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <span>Powered by Llama 3</span>
              <span className="w-1 h-1 rounded-full bg-stone-300"></span>
              <span>Privacy-first</span>
              <span className="w-1 h-1 rounded-full bg-stone-300"></span>
              <span>Free to use</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-stone-900 mb-3">How it works</h2>
            <p className="text-stone-500 max-w-lg">Three layers of analysis run on every article you submit.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col">
              <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center mb-5">
                <Search className="w-5 h-5 text-teal-700" />
              </div>
              <h3 className="text-base font-semibold text-stone-900 mb-2">Source verification</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                We check the publishing domain's track record, ownership, and editorial standards against known databases.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col">
              <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center mb-5">
                <BarChart3 className="w-5 h-5 text-teal-700" />
              </div>
              <h3 className="text-base font-semibold text-stone-900 mb-2">Bias analysis</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Natural language processing detects emotional manipulation, loaded language, and one-sided framing in the text.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col">
              <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center mb-5">
                <CheckCircle2 className="w-5 h-5 text-teal-700" />
              </div>
              <h3 className="text-base font-semibold text-stone-900 mb-2">Claim cross-referencing</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Key factual claims are extracted and compared against reporting from multiple independent outlets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Detail Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">Built for skeptics, not believers</h2>
              <p className="text-stone-500 leading-relaxed mb-6">
                TruthCheck doesn't tell you what to think. It surfaces evidence — source reputation, 
                writing quality, factual consistency — and lets you decide. Every analysis includes 
                both green flags and risk factors.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-stone-600">
                  <Lock className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />
                  <span>Your data stays on our servers only during analysis — nothing stored</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-stone-600">
                  <Globe2 className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />
                  <span>Works with any English-language news article or opinion piece</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-stone-600">
                  <ExternalLink className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />
                  <span>Analyze by URL or paste text directly — no account required</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-100 mb-4">
                <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                <span className="text-xs text-stone-400 ml-2 font-mono">truthcheck analysis</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Credibility</span>
                  <span className="text-xs font-bold text-emerald-600">82%</span>
                </div>
                <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-stone-50 rounded-lg p-3">
                    <p className="text-[10px] font-semibold text-stone-400 uppercase mb-1">Source</p>
                    <p className="text-sm font-semibold text-stone-800">Reuters</p>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-3">
                    <p className="text-[10px] font-semibold text-stone-400 uppercase mb-1">Verdict</p>
                    <p className="text-sm font-semibold text-emerald-700">Credible</p>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-[10px] font-semibold text-stone-400 uppercase mb-2">Flags</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-md font-medium">Verified source</span>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-md font-medium">Neutral tone</span>
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs rounded-md font-medium">Single-source claim</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-teal-700 rounded-2xl p-10 sm:p-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to check an article?
            </h2>
            <p className="text-teal-100 mb-8 max-w-md mx-auto">
              No sign-up, no paywall. Paste a URL or article text and get a credibility report in seconds.
            </p>
            <button
              onClick={() => navigate('/detector')}
              className="px-8 py-3.5 bg-white text-teal-800 rounded-xl hover:bg-teal-50 transition-colors font-semibold text-base"
            >
              Start analyzing
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-teal-700 rounded flex items-center justify-center">
              <Shield className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-stone-900">TruthCheck</span>
          </div>
          <div className="flex gap-8 text-sm text-stone-400">
            <a href="#" className="hover:text-stone-700 transition-colors">Privacy</a>
            <a href="#" className="hover:text-stone-700 transition-colors">Terms</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-stone-700 transition-colors">GitHub</a>
          </div>
          <p className="text-sm text-stone-400">© 2026 TruthCheck. Bruce Ominde.</p>
        </div>
      </footer>
    </div>
  );
}
