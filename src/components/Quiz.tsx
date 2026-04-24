import { useState, useCallback, useEffect } from 'react';
import type { Question, QuizResult, QuizMode } from '../types';
import type { Lang } from '../i18n';
import { t } from '../i18n';
import examData from '../data/az900-exam.json';

const categories = [...new Set((examData as Question[]).map(q => q.category))].sort();

export default function Quiz({ results, addResult, modeFilter, lang }: { results: QuizResult[]; addResult: (r: QuizResult) => void; modeFilter: QuizMode | null; lang: Lang }) {
  const [mode, setMode] = useState<QuizMode>(modeFilter === 'exam' ? 'exam' : 'drill');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [quizActive, setQuizActive] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (modeFilter === 'exam') {
      setMode('exam');
      startQuizWithMode('exam');
    }
  }, [modeFilter]);

  const currentQuestion: Question = questions[currentIndex] || { id: 0, category: '', question: '', options: [], explanation: '', hint: '' };

  const buildQuestions = useCallback((qMode: QuizMode, cat: string): Question[] => {
    const all = examData as Question[];
    const filtered = cat === 'All' ? all : all.filter(q => q.category === cat);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    if (qMode === 'drill') {
      return shuffled.slice(0, 10);
    } else if (qMode === 'exam') {
      return shuffled.slice(0, 40);
    } else {
      const wrongIds = new Set(results.filter(r => !r.correct).map(r => r.questionId));
      const reviewQs = shuffled.filter(q => wrongIds.has(q.id));
      return reviewQs.length > 0 ? reviewQs.slice(0, 20) : shuffled.slice(0, 20);
    }
  }, [results]);

  const resetState = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowHint(false);
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
  }, []);

  const startQuizWithMode = useCallback((qMode: QuizMode) => {
    const qs = buildQuestions(qMode, selectedCategory);
    setQuestions(qs);
    resetState();
    setQuizActive(true);
  }, [buildQuestions, selectedCategory, resetState]);

  const startQuiz = useCallback(() => {
    startQuizWithMode(mode);
  }, [startQuizWithMode, mode]);

  const handleAnswer = useCallback((optionIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
    const isCorrect = currentQuestion.options[optionIndex].correct;
    setScore(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));
    addResult({
      questionId: currentQuestion.id,
      correct: isCorrect,
      category: currentQuestion.category,
      timestamp: Date.now(),
    });
  }, [selectedAnswer, currentQuestion, addResult]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowHint(false);
    } else {
      setShowResult(true);
    }
  }, [currentIndex, questions.length]);

  const finishQuiz = useCallback(() => {
    setQuizActive(false);
  }, []);

  const allQuestions = examData as Question[];

  if (!quizActive) {
    return (
      <div className="space-y-6">
        <div className="bg-dark-surface rounded-xl p-6 border border-dark-border">
          <h2 className="text-lg font-semibold text-gold mb-1">{t(lang, 'quiz.setup.title')}</h2>
          <p className="text-sm text-dark-muted mb-4">{t(lang, 'quiz.setup.subtitle')}</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-dark-muted mb-2">{t(lang, 'quiz.setup.category')}</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-3 py-1.5 rounded-lg text-sm ${selectedCategory === 'All' ? 'bg-gold text-dark-bg' : 'bg-dark-card text-dark-text'}`}
                >
                  {t(lang, 'quiz.setup.all')} ({allQuestions.length})
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm ${selectedCategory === cat ? 'bg-gold text-dark-bg' : 'bg-dark-card text-dark-text'}`}
                  >
                    {cat} ({allQuestions.filter(q => q.category === cat).length})
                  </button>
                ))}
              </div>
            </div>

            {!modeFilter && (
              <div>
                <label className="block text-sm text-dark-muted mb-2">{t(lang, 'quiz.setup.mode')}</label>
                <div className="flex gap-2 flex-wrap">
                  {([
                    { key: 'drill' as QuizMode, label: t(lang, 'quiz.mode.drill') },
                    { key: 'exam' as QuizMode, label: t(lang, 'quiz.mode.exam') },
                    { key: 'review' as QuizMode, label: t(lang, 'quiz.mode.review') },
                  ]).map(m => (
                    <button
                      key={m.key}
                      onClick={() => setMode(m.key)}
                      className={`px-4 py-2 rounded-lg text-sm ${mode === m.key ? 'bg-gold-dark text-white' : 'bg-dark-card text-dark-text'}`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={startQuiz}
            className="mt-6 w-full py-3 bg-gold hover:bg-gold-dark text-dark-bg font-semibold rounded-xl transition-colors"
          >
            {modeFilter === 'exam' ? t(lang, 'quiz.start.exam') : t(lang, 'quiz.start')} ({(() => {
              const filtered = selectedCategory === 'All' ? allQuestions : allQuestions.filter(q => q.category === selectedCategory);
              const count = mode === 'exam' ? Math.min(40, filtered.length) : mode === 'review' ? Math.min(20, filtered.length) : Math.min(10, filtered.length);
              return count;
            })()} {t(lang, 'quiz.questions')})
          </button>
        </div>

        {/* Category accuracy */}
        <div className="bg-dark-surface rounded-xl p-6 border border-dark-border">
          <h3 className="text-sm font-semibold text-dark-muted mb-3">{t(lang, 'quiz.category.perf')}</h3>
          <div className="space-y-2">
            {categories.map(cat => {
              const catResults = results.filter(r => r.category === cat);
              const correct = catResults.filter(r => r.correct).length;
              const total = catResults.length;
              if (total === 0) return null;
              return (
                <div key={cat} className="flex items-center justify-between">
                  <span className="text-sm">{cat}</span>
                  <span className={`text-sm font-medium ${correct / total >= 0.8 ? 'text-green-400' : correct / total >= 0.6 ? 'text-gold' : 'text-red-400'}`}>
                    {correct}/{total} ({Math.round(correct / total * 100)}%)
                  </span>
                </div>
              );
            })}
            {results.length === 0 && <p className="text-sm text-dark-muted">{t(lang, 'quiz.no.results')}</p>}
          </div>
        </div>
      </div>
    );
  }

  const isLastQuestion = currentIndex >= questions.length - 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-dark-muted">{currentQuestion.category}</span>
          <span className="text-sm text-gold">Q{currentIndex + 1}/{questions.length}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-dark-muted">{t(lang, 'quiz.score')}: {score.correct}/{score.total}</span>
          {!showResult && (
            <button onClick={finishQuiz} className="text-xs text-dark-muted hover:text-dark-text">
              {t(lang, 'quiz.end')}
            </button>
          )}
        </div>
      </div>

      <div className="w-full h-1.5 bg-dark-card rounded-full overflow-hidden">
        <div
          className="h-full bg-gold rounded-full transition-all"
          style={{ width: `${((currentIndex + (showExplanation ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {!showResult ? (
        <div className="bg-dark-surface rounded-xl p-6 border border-dark-border space-y-6">
          <p className="text-lg leading-relaxed">{currentQuestion.question}</p>

          {currentQuestion.hint && !showExplanation && (
            <div className="flex justify-end">
              <button
                onClick={() => setShowHint(prev => !prev)}
                className="px-3 py-1.5 rounded-lg text-sm bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 border border-blue-800/50 transition-colors"
              >
                {showHint ? t(lang, 'quiz.hide.hint') : t(lang, 'quiz.hint')}
              </button>
            </div>
          )}

          {showHint && currentQuestion.hint && (
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800/40">
              <p className="text-sm">
                <span className="font-semibold text-blue-400">{t(lang, 'quiz.hint.label')}</span>
                <span className="text-dark-text">{currentQuestion.hint}</span>
              </p>
            </div>
          )}

          <div className="space-y-3">
            {currentQuestion.options.map((opt, i) => {
              const isCorrect = opt.correct;
              const isSelected = selectedAnswer === i;
              let bg = 'bg-dark-card hover:bg-dark-border';
              if (showExplanation) {
                if (isCorrect) bg = 'bg-green-900/40 border-green-500';
                else if (isSelected && !isCorrect) bg = 'bg-red-900/40 border-red-500';
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={showExplanation}
                  className={`w-full text-left px-4 py-3 rounded-xl border border-transparent ${bg} transition-colors`}
                >
                  <span className="mr-2 text-dark-muted font-medium">{String.fromCharCode(65 + i)}.</span>
                  {opt.text}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="bg-dark-card rounded-lg p-4 border border-gold/30">
              <p className="text-sm">
                <span className="font-semibold text-gold">{t(lang, 'quiz.explanation')}</span>
                <span className="text-dark-text">{currentQuestion.explanation}</span>
              </p>
            </div>
          )}

          {showExplanation && (
            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-gold hover:bg-gold-dark text-dark-bg font-semibold rounded-xl transition-colors"
            >
              {isLastQuestion ? t(lang, 'quiz.view.results') : t(lang, 'quiz.next')}
            </button>
          )}
        </div>
      ) : (
        <div className="bg-dark-surface rounded-xl p-8 border border-dark-border text-center space-y-4">
          <div className="text-5xl font-bold text-gold">
            {score.correct}/{score.total}
          </div>
          <p className="text-lg">
            {score.correct / score.total >= 0.9
              ? t(lang, 'quiz.result.outstanding')
              : score.correct / score.total >= 0.75
                ? t(lang, 'quiz.result.good')
                : score.correct / score.total >= 0.6
                  ? t(lang, 'quiz.result.decent')
                  : t(lang, 'quiz.result.keep')}
          </p>
          <p className="text-sm text-dark-muted">
            {t(lang, 'quiz.passing.score')}{Math.round((score.correct / score.total) * 1000)}
          </p>
          <div className="flex gap-3 justify-center pt-4">
            <button
              onClick={() => setQuizActive(false)}
              className="px-6 py-3 bg-dark-card hover:bg-dark-border text-dark-text rounded-xl transition-colors"
            >
              {t(lang, 'quiz.back.setup')}
            </button>
            <button
              onClick={startQuiz}
              className="px-6 py-3 bg-gold hover:bg-gold-dark text-dark-bg font-semibold rounded-xl transition-colors"
            >
              {t(lang, 'quiz.try.again')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
