/**
 * src/features/onboarding/components/WelcomeScreen.tsx
 *
 * [Feature Component]
 * ウェルカム画面 - オンボーディングの最初の画面
 */

'use client';

import { type FC } from 'react';

export interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-base">
      <div className="max-w-2xl w-full px-6">
        {/* Logo & Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-primary mb-6">
            <span className="text-2xl text-foreground-inverse">🔵</span>
          </div>
          <h1 className="text-4xl font-light text-foreground-primary mb-4">
            NEUMANN へようこそ
          </h1>
          <p className="text-xl text-foreground-secondary">
            経営の曖昧さを排除する、あなたの Digital COO
          </p>
        </div>

        {/* Value Proposition */}
        <div className="bg-background-layer1 rounded-2xl border border-border-default p-8 mb-8">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent-subtle flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground-primary mb-2">
                  Observability
                </h3>
                <p className="text-foreground-secondary">
                  確認しなくても大丈夫と分かる。ダッシュボードで組織の健全性が一目瞭然。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent-subtle flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground-primary mb-2">
                  Zero Latency
                </h3>
                <p className="text-foreground-secondary">
                  聞く前にファクトが揃っている。異常があれば要因まで分解済み。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent-subtle flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground-primary mb-2">
                  Trusted Bad Cop
                </h3>
                <p className="text-foreground-secondary">
                  AI が自動で曖昧さを指摘。あなたは判断に専念できます。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-medium rounded-xl bg-accent-primary text-foreground-inverse hover:bg-accent-hover transition-colors shadow-lg hover:shadow-xl"
          >
            サンプルで始める
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <p className="mt-4 text-sm text-foreground-muted">
            データ準備不要。3分で価値を体験できます。
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
