import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BarChart3, CheckCircle2, ArrowUpRight, ArrowRight, Lock, Eye, ExternalLink, ShieldCheck, Globe2 } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="w-full bg-white border-b border-border-subtle sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-bold text-navy font-display italic">Thibit</span>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm font-medium text-slate-text hover:text-navy transition-colors uppercase tracking-wide">How it works</a>
              <a href="#sources" className="text-sm font-medium text-slate-text hover:text-navy transition-colors uppercase tracking-wide">Sources</a>
              <a href="#about" className="text-sm font-medium text-slate-text hover:text-navy transition-colors uppercase tracking-wide">About</a>
            </div>
            <button
              onClick={() => navigate('/detector')}
              className="px-6 py-2.5 bg-navy text-white rounded-full hover:bg-navy-light transition-colors font-semibold text-sm flex items-center gap-2 uppercase tracking-wide"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero — Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Main hero card */}
          <div className="lg:col-span-7 bg-ice rounded-3xl p-8 sm:p-12 flex flex-col justify-between min-h-[420px] relative overflow-hidden">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-border-subtle mb-8">
                <ShieldCheck className="w-3.5 h-3.5 text-navy" />
                <span className="text-xs font-semibold text-navy tracking-wide">AI-powered fact checking</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-navy leading-[1.05] tracking-tight uppercase mb-6">
                Verify news<br />
                before you<br />
                share it
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => navigate('/detector')}
                className="group px-8 py-3.5 bg-navy text-white rounded-full hover:bg-navy-light transition-all font-bold text-sm flex items-center gap-2 uppercase tracking-wider"
              >
                Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <p className="text-sm text-slate-text max-w-xs leading-relaxed">
                Paste any article or URL. AI cross-references sources, flags bias, and checks claims.
              </p>
            </div>
          </div>

          {/* Right column — stacked cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Stats card — enriched */}
            <div className="bg-navy rounded-3xl p-8 text-white flex-1 flex flex-col justify-between min-h-[240px]">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Credibility Engine</p>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-6xl font-black leading-none tracking-tight">3</span>
                  <span className="text-sm font-bold text-white/50 uppercase tracking-wide">Layers of<br />analysis</span>
                </div>
              </div>
              {/* Visual bars for each layer */}
              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider w-16">Source</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/60 rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider w-16">Bias</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/45 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider w-16">Claims</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/30 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/30 font-medium">Powered by Llama 3 · Updated in real time</p>
            </div>

            {/* Live status card */}
            <div className="bg-lavender rounded-3xl p-7 flex items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald rounded-full animate-pulse" />
                <span className="text-xs font-bold text-navy uppercase tracking-wider">Live</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-navy">Check any article in real time</p>
                <p className="text-xs text-navy-faded mt-0.5">No sign-up required · Free to use</p>
              </div>
              <button
                onClick={() => navigate('/detector')}
                className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white shrink-0 hover:bg-navy-light transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tags */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-wrap gap-2">
          {['Source Verification', 'Bias Detection', 'Claim Matching', 'Content Quality'].map((tag, i) => (
            <span key={i} className="px-4 py-2 border border-navy/20 rounded-full text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5 hover:bg-navy hover:text-white transition-all cursor-default">
              {tag} <ArrowUpRight className="w-3 h-3" />
            </span>
          ))}
        </div>
      </section>

      {/* Bento Feature Grid */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Feature 1 — tall */}
          <div className="bg-ice rounded-3xl p-8 card-lift md:row-span-2 flex flex-col justify-between min-h-[320px]">
            <div>
              <div className="w-12 h-12 bg-navy rounded-2xl flex items-center justify-center mb-6">
                <Search className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-navy uppercase tracking-wide mb-3">Source Verification</h3>
              <p className="text-sm text-slate-text leading-relaxed">
                We check the publishing domain's track record, ownership, and editorial standards against databases of credible outlets worldwide.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-navy/10">
              <p className="text-xs font-bold text-navy-faded uppercase tracking-wider">Checked against</p>
              <p className="text-2xl font-black text-navy mt-1">200+ <span className="text-sm font-bold text-navy-faded">outlets</span></p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-navy rounded-3xl p-8 card-lift text-white">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wide mb-3">Bias Analysis</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              NLP detects emotional manipulation, loaded language, and one-sided framing patterns.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-lavender rounded-3xl p-8 card-lift">
            <div className="w-12 h-12 bg-navy rounded-2xl flex items-center justify-center mb-6">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-navy uppercase tracking-wide mb-3">Claim Matching</h3>
            <p className="text-sm text-navy-faded leading-relaxed">
              Key factual claims are extracted and compared against reporting from multiple independent outlets.
            </p>
          </div>

          {/* Guide card */}
          <div className="bg-white rounded-3xl p-8 border border-border-subtle card-lift lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-navy uppercase tracking-wide mb-2">Your guide through every story</h3>
                <p className="text-sm text-slate-text leading-relaxed max-w-md">
                  Thibit doesn't tell you what to think. It surfaces evidence and lets you decide.
                </p>
              </div>
              <button
                onClick={() => navigate('/detector')}
                className="flex items-center gap-2 text-sm font-bold text-navy uppercase tracking-wider hover:text-navy-light transition-colors shrink-0"
              >
                Try it now <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sources Strip */}
      <section id="sources" className="bg-ice py-12 px-4 border-y border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy-faded text-center mb-8">
            Sources we cross-reference
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {['Reuters', 'Associated Press', 'BBC News', 'Al Jazeera', 'The Guardian', 'NPR', 'AFP', 'DW News'].map((source, i) => (
              <span key={i} className="text-sm font-bold text-navy/40 hover:text-navy transition-colors cursor-default uppercase tracking-wider">
                {source}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About / Trust Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-navy rounded-3xl p-10 text-white flex flex-col justify-between min-h-[360px]">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tight leading-tight mb-4">Built for<br />skeptics, not<br />believers</h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-sm">
                Every analysis includes both green flags and risk factors. We surface evidence and let you decide.
              </p>
            </div>
            <button
              onClick={() => navigate('/detector')}
              className="self-start mt-6 px-7 py-3 bg-white text-navy rounded-full font-bold text-sm uppercase tracking-wider hover:bg-lavender transition-colors flex items-center gap-2"
            >
              Learn more <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {[
              { icon: <Lock className="w-4 h-4" />, title: 'Privacy first', desc: 'Your data stays on our servers only during analysis — nothing stored, ever.' },
              { icon: <Globe2 className="w-4 h-4" />, title: 'Any language', desc: 'Works with English-language news articles, opinion pieces, and social posts.' },
              { icon: <ExternalLink className="w-4 h-4" />, title: 'No account needed', desc: 'Analyze by URL or paste text directly. No sign-up, no paywall.' },
            ].map((item, i) => (
              <div key={i} className="bg-ice rounded-3xl p-7 flex items-start gap-5 card-lift">
                <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center text-white shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy uppercase tracking-wide mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-text leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-lavender rounded-3xl p-12 sm:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy uppercase tracking-tight mb-4">
            Ready to check an article?
          </h2>
          <p className="text-navy-faded mb-8 max-w-md mx-auto text-sm">
            No sign-up, no paywall. Paste a URL or article text and get a result in seconds.
          </p>
          <button
            onClick={() => navigate('/detector')}
            className="px-10 py-4 bg-navy text-white rounded-full hover:bg-navy-light transition-all font-bold text-sm uppercase tracking-wider"
          >
            Start analyzing
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-subtle py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-lg font-bold text-navy font-display italic">Thibit</span>
          <div className="flex gap-8 text-sm text-slate-text">
            <a href="#" className="hover:text-navy transition-colors">Privacy</a>
            <a href="#" className="hover:text-navy transition-colors">Terms</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-navy transition-colors">GitHub</a>
          </div>
          <p className="text-xs text-slate-text">© 2026 Thibit. Bruce Ominde.</p>
        </div>
      </footer>
    </div>
  );
}
