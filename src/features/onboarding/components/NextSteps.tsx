/**
 * src/features/onboarding/components/NextSteps.tsx
 *
 * [Feature Component]
 * 次ステップ案内画面 - オンボーディング完了後の案内
 */

'use client';

import { type FC } from 'react';

export interface NextStepsProps {
  onSkip: () => void;
}

export const NextSteps: FC<NextStepsProps> = ({ onSkip }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-base">
      <div className="max-w-3xl w-full px-6">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-severity-success-bg border-2 border-severity-success-border mb-6">
            <svg className="w-8 h-8 text-severity-success-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-light text-foreground-primary mb-4">
            素晴らしい！最初の曖昧性を解消しました
          </h1>
          <p className="text-lg text-foreground-secondary">
            NEUMANN の価値を体験いただきました。次のステップに進みましょう。
          </p>
        </div>

        {/* Next Steps */}
        <div className="space-y-4 mb-8">
          {/* Step 1: Import Data */}
          <div className="bg-background-layer1 rounded-xl border border-border-default p-6 hover:border-border-active transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-subtle flex items-center justify-center">
                <span className="text-lg font-bold text-accent-text">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-foreground-primary mb-2">
                  あなたの資料をインポート
                </h3>
                <p className="text-foreground-secondary mb-4">
                  Google Slides / Notion / Markdown 形式のレポートをインポートして、実際のデータで NEUMANN を使い始めましょう。
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 text-sm font-medium rounded-lg bg-background-layer2 text-foreground-secondary border border-border-default hover:border-border-active transition-colors">
                    Google Slides から
                  </button>
                  <button className="px-4 py-2 text-sm font-medium rounded-lg bg-background-layer2 text-foreground-secondary border border-border-default hover:border-border-active transition-colors">
                    Notion から
                  </button>
                  <button className="px-4 py-2 text-sm font-medium rounded-lg bg-background-layer2 text-foreground-secondary border border-border-default hover:border-border-active transition-colors">
                    Markdown ファイル
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Invite Team */}
          <div className="bg-background-layer1 rounded-xl border border-border-default p-6 hover:border-border-active transition-colors opacity-60">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-background-layer2 flex items-center justify-center">
                <span className="text-lg font-bold text-foreground-muted">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-foreground-primary mb-2">
                  チームメンバーを招待
                  <span className="ml-2 px-2 py-1 text-xs font-medium rounded bg-background-layer3 text-foreground-muted">
                    v1.1 で対応予定
                  </span>
                </h3>
                <p className="text-foreground-secondary">
                  レポート担当者を招待して、チーム全体で NEUMANN を活用しましょう。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onSkip}
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-medium rounded-xl bg-accent-primary text-foreground-inverse hover:bg-accent-hover transition-colors shadow-lg hover:shadow-xl"
          >
            ダッシュボードへ
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <p className="mt-4 text-sm text-foreground-muted">
            後で設定することもできます
          </p>
        </div>
      </div>
    </div>
  );
};

export default NextSteps;
