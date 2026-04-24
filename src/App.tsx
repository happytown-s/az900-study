import { useState, useEffect } from 'react';
import type { TabName, QuizResult } from './types';
import type { Lang } from './i18n';
import { t } from './i18n';
import Quiz from './components/Quiz';
import Progress from './components/Progress';

const LANG_KEY = 'az900-lang';

function loadLang(): Lang {
  try {
    const raw = localStorage.getItem(LANG_KEY);
    if (raw === 'ja') return 'ja';
  } catch { /* noop */ }
  return 'en';
}

const STORAGE_KEY = 'az900-results';

function loadResults(): QuizResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveResults(results: QuizResult[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

export default function App() {
  const [tab, setTab] = useState<TabName>('quiz');
  const [results, setResults] = useState<QuizResult[]>(loadResults);
  const [lang, setLang] = useState<Lang>(loadLang);

  useEffect(() => {
    saveResults(results);
  }, [results]);

  const addResult = (r: QuizResult) => {
    setResults(prev => [...prev, r]);
  };

  const clearResults = () => {
    setResults([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'ja' : 'en'));
  };

  const tabs: { key: TabName; label: string }[] = [
    { key: 'quiz', label: t(lang, 'tab.quiz') },
    { key: 'exam', label: t(lang, 'tab.exam') },
    { key: 'progress', label: t(lang, 'tab.progress') },
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text">
      <header className="bg-dark-surface border-b border-dark-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gold">{t(lang, 'app.title')}</h1>
            <button
              onClick={toggleLang}
              className="px-2 py-0.5 rounded text-xs font-medium bg-dark-card text-dark-muted hover:text-dark-text border border-dark-border transition-colors"
            >
              {t(lang, 'lang.toggle')}
            </button>
          </div>
          <nav className="flex gap-1">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  tab === t.key
                    ? 'bg-gold text-dark-bg'
                    : 'text-dark-muted hover:text-dark-text hover:bg-dark-card'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {tab === 'quiz' && <Quiz results={results} addResult={addResult} modeFilter={null} lang={lang} />}
        {tab === 'exam' && <Quiz results={results} addResult={addResult} modeFilter="exam" lang={lang} />}
        {tab === 'progress' && <Progress results={results} onClear={clearResults} lang={lang} />}
      </main>
    </div>
  );
}
