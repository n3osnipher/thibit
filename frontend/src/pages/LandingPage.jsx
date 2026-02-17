import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Search, CheckCircle2, BarChart3, Globe2, Zap, ArrowRight, Lock } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-lg z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">TruthCheck</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">
                GitHub
              </a>
              <button
                onClick={() => navigate('/detector')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all font-medium text-sm shadow-lg shadow-indigo-500/10"
              >
                Launch App
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
          <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">        
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.1] animate-slide-up">
              Verify news with <br />
              <span className="text-orange-600 bg-clip-text ">
                unmatched precision
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Advanced AI agents analyze content, cross-reference sources, and detect bias 
              to bring you the truth behind every headline.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <button
                onClick={() => navigate('/detector')}
                className="group px-8 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all font-medium text-lg shadow-xl shadow-indigo-500/20 flex items-center gap-2 hover:-translate-y-0.5"
              >
                Analyze Article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all font-medium text-lg flex items-center gap-2">
                <Shield className="w-4 h-4" />
                How it works
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-500 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>99.9% Analysis Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Powered by Llama 3</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Privacy-First Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Intelligence at scale</h2>
            <p className="text-lg text-slate-600 max-w-2xl">Our detection engine uses multiple layers of verification to ensure the highest accuracy possible.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 - Large */}
            <div className="md:col-span-2 bg-slate-50 rounded-2xl p-8 border border-slate-200/60 hover:border-indigo-200 transition-colors group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Real-time Analysis</h3>
              <p className="text-slate-600 mb-8 max-w-lg">
                Our engine processes articles in milliseconds, cross-referencing thousands of credible sources to validate claims and identify potential misinformation patterns immediately.
              </p>
              <div className="h-32 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">
                <div className="absolute inset-0 bg-linear-to-r from-indigo-500/5 to-purple-500/5"></div>
                {/* Abstract UI representation */}
                <div className="flex items-center gap-3 p-4 border-b border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="h-2 bg-slate-100 rounded-full w-3/4"></div>
                  <div className="h-2 bg-slate-100 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/60 hover:border-indigo-200 transition-colors group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Deep Source Audit</h3>
              <p className="text-slate-600">
                We investigate the domain authority, historical accuracy, and ownership of every news source.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/60 hover:border-indigo-200 transition-colors group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Bias Detection</h3>
              <p className="text-slate-600">
                Sophisticated NLP models detect emotional manipulation and political bias in writing.
              </p>
            </div>

            {/* Feature 4 - Large */}
            <div className="md:col-span-2 bg-slate-50 rounded-2xl p-8 border border-slate-200/60 hover:border-indigo-200 transition-colors group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lock className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Enterprise-Grade Security</h3>
              <p className="text-slate-600 mb-6">
                Your data is parsed securely. We use local proxies and privacy-focused LLMs to ensure your browsing habits remain private.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-violet-600 rounded-3xl -rotate-1 opacity-10 blur-2xl"></div>
          <div className="relative bg-slate-900 rounded-3xl p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to verify your first article?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
              Get instant clarity on any news piece. No sign-up required, 
              completely free to use.
            </p>
            <button
              onClick={() => navigate('/detector')}
              className="px-8 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all font-bold text-lg shadow-xl"
            >
              Analyze Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
              <Globe2 className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-900">TruthCheck</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Twitter</a>
            <a href="#" className="hover:text-slate-900 transition-colors">GitHub</a>
          </div>
          <p className="text-sm text-slate-400">© 2026 TruthCheck. Bruce Ominde.</p>
        </div>
      </footer>
    </div>
  );
}
