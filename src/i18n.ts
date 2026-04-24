export type Lang = 'en' | 'ja';

const messages: Record<Lang, Record<string, string>> = {
  en: {
    // App header
    'app.title': 'AZ-900 Study',
    'tab.quiz': 'Quiz',
    'tab.exam': 'Practice Exam',
    'tab.progress': 'Progress',
    'lang.toggle': 'JA',

    // Quiz setup
    'quiz.setup.title': 'Quiz Setup',
    'quiz.setup.subtitle': 'Microsoft Azure Fundamentals (AZ-900) Practice',
    'quiz.setup.category': 'Category',
    'quiz.setup.all': 'All',
    'quiz.setup.mode': 'Mode',
    'quiz.mode.drill': 'Drill (10 Qs)',
    'quiz.mode.exam': 'Exam (40 Qs)',
    'quiz.mode.review': 'Review (20 Qs)',
    'quiz.start': 'Start',
    'quiz.start.exam': 'Start Practice Exam',
    'quiz.questions': 'questions',

    // Category performance (setup screen)
    'quiz.category.perf': 'Category Performance',
    'quiz.no.results': 'No quiz results yet.',

    // Quiz in-progress
    'quiz.score': 'Score',
    'quiz.end': 'End Quiz',
    'quiz.hint': 'Hint',
    'quiz.hide.hint': 'Hide Hint',
    'quiz.hint.label': 'Hint: ',
    'quiz.explanation': 'Explanation: ',
    'quiz.next': 'Next Question',
    'quiz.view.results': 'View Results',

    // Quiz results
    'quiz.result.outstanding': 'Outstanding! You are well prepared for the AZ-900 exam!',
    'quiz.result.good': 'Good progress! Keep studying to reach the passing score.',
    'quiz.result.decent': 'Decent start. Review the explanations carefully.',
    'quiz.result.keep': 'Keep practicing! Focus on your weak areas.',
    'quiz.passing.score': 'Passing score for AZ-900 is 700/1000. Your estimated score: ',
    'quiz.back.setup': 'Back to Setup',
    'quiz.try.again': 'Try Again',

    // Progress
    'progress.total': 'Total Questions',
    'progress.correct': 'Correct',
    'progress.accuracy': 'Accuracy',
    'progress.streak': 'Current Streak',
    'progress.estimated': 'Estimated AZ-900 Score',
    'progress.range': 'Range: 0-1000 | Passing: 700',
    'progress.excellent': 'Excellent! You are consistently scoring above the passing threshold.',
    'progress.good.work': 'Good work! Focus on weak categories to boost your score.',
    'progress.keep.practicing': 'Keep practicing. Review explanations for missed questions.',
    'progress.foundation': 'Build a strong foundation with more practice on each domain.',
    'progress.breakdown': 'Category Breakdown',
    'progress.no.data': 'No data',
    'progress.recent.trend': 'Recent Trend (Last 50)',
    'progress.improving': 'Improving!',
    'progress.needs.attention': 'Needs attention',
    'progress.steady': 'Steady',
    'progress.clear': 'Clear All Progress Data',
  },
  ja: {
    // App header
    'app.title': 'AZ-900',
    'tab.quiz': 'クイズ',
    'tab.exam': '模擬試験',
    'tab.progress': '進捗',
    'lang.toggle': 'EN',

    // Quiz setup
    'quiz.setup.title': 'クイズ設定',
    'quiz.setup.subtitle': 'Microsoft Azure Fundamentals (AZ-900)',
    'quiz.setup.category': 'カテゴリ',
    'quiz.setup.all': '全て',
    'quiz.setup.mode': 'モード',
    'quiz.mode.drill': 'ドリル (10問)',
    'quiz.mode.exam': '本番 (40問)',
    'quiz.mode.review': '復習 (20問)',
    'quiz.start': '開始',
    'quiz.start.exam': '模擬試験を開始',
    'quiz.questions': '問',

    // Category performance (setup screen)
    'quiz.category.perf': 'カテゴリ別正答率',
    'quiz.no.results': 'まだ結果がありません。',

    // Quiz in-progress
    'quiz.score': '得点',
    'quiz.end': '終了',
    'quiz.hint': 'ヒント',
    'quiz.hide.hint': 'ヒントを隠す',
    'quiz.hint.label': 'ヒント: ',
    'quiz.explanation': '解説: ',
    'quiz.next': '次の問題',
    'quiz.view.results': '結果を見る',

    // Quiz results
    'quiz.result.outstanding': '素晴らしい! AZ-900試験の準備は万端です!',
    'quiz.result.good': '順調です! 合格点に向けて勉強を続けましょう。',
    'quiz.result.decent': 'まずまずのスタート。解説を丁寧に復習しましょう。',
    'quiz.result.keep': '引き続き練習しましょう! 苦手分野を集中して。',
    'quiz.passing.score': 'AZ-900合格点は700/1000点。推定スコア: ',
    'quiz.back.setup': '設定に戻る',
    'quiz.try.again': 'もう一度',

    // Progress
    'progress.total': '総問題数',
    'progress.correct': '正解数',
    'progress.accuracy': '正答率',
    'progress.streak': '連続正解',
    'progress.estimated': '推定AZ-900スコア',
    'progress.range': '範囲: 0-1000 | 合格: 700',
    'progress.excellent': '素晴らしい! 安定して合格ラインを上回っています。',
    'progress.good.work': 'よく頑張っています! 苦手カテゴリを克服しましょう。',
    'progress.keep.practicing': '練習を続けましょう。間違えた問題の解説を見直してください。',
    'progress.foundation': '各ドメインをもっと練習して基礎を固めましょう。',
    'progress.breakdown': 'カテゴリ別内訳',
    'progress.no.data': 'データなし',
    'progress.recent.trend': '最近の傾向 (直近50問)',
    'progress.improving': '上昇中!',
    'progress.needs.attention': '要注意',
    'progress.steady': '安定',
    'progress.clear': '進捗データを全てクリア',
  },
};

export function t(lang: Lang, key: string): string {
  return messages[lang]?.[key] ?? messages.en[key] ?? key;
}
