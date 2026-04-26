import type { QuizConfig } from '../core/types';

export const quizConfig: QuizConfig = {
  id: 'az900-exam',
  title: 'AZ-900',
  description: 'Microsoft Azure Fundamentals 問題集',
  passLine: 70,
  examQuestions: 60,
  examTimeLimit: 60,
  categories: [
    { id: 'cloud-concepts', name: 'Cloud Concepts', label: 'Cloud Concepts', icon: '☁️', file: () => import('./questions').then(m => m.allQuestions.filter(q => q.category === 'cloud-concepts')) },    { id: 'core-services', name: 'Azure Core Services', label: 'Azure Core Services', icon: '🧩', file: () => import('./questions').then(m => m.allQuestions.filter(q => q.category === 'core-services')) },    { id: 'compute', name: 'Azure Compute', label: 'Azure Compute', icon: '🖥️', file: () => import('./questions').then(m => m.allQuestions.filter(q => q.category === 'compute')) },    { id: 'storage', name: 'Azure Storage', label: 'Azure Storage', icon: '🗄️', file: () => import('./questions').then(m => m.allQuestions.filter(q => q.category === 'storage')) },    { id: 'networking', name: 'Azure Networking', label: 'Azure Networking', icon: '🌐', file: () => import('./questions').then(m => m.allQuestions.filter(q => q.category === 'networking')) },    { id: 'identity', name: 'Identity & Security', label: 'Identity & Security', icon: '🔑', file: () => import('./questions').then(m => m.allQuestions.filter(q => q.category === 'identity')) },    { id: 'governance', name: 'Governance', label: 'Governance', icon: '📋', file: () => import('./questions').then(m => m.allQuestions.filter(q => q.category === 'governance')) },    { id: 'cost', name: 'Cost Management', label: 'Cost Management', icon: '💰', file: () => import('./questions').then(m => m.allQuestions.filter(q => q.category === 'cost')) },    { id: 'monitoring', name: 'Monitoring', label: 'Monitoring', icon: '📊', file: () => import('./questions').then(m => m.allQuestions.filter(q => q.category === 'monitoring')) },    { id: 'solutions', name: 'Azure Solutions', label: 'Azure Solutions', icon: '🧠', file: () => import('./questions').then(m => m.allQuestions.filter(q => q.category === 'solutions')) }
  ],
  termsFile: () => import('./terms').then(m => m.terms),
};
