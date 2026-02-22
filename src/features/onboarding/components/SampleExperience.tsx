/**
 * src/features/onboarding/components/SampleExperience.tsx
 *
 * [Feature Component]
 * サンプル体験画面 - サンプルデータでの価値体験
 */

'use client';

import { type FC, useState } from 'react';
import { DashboardView } from '@/features/dashboard';
import { EditorView, AuditPanel, useAuditLog } from '@/features/editor';
import type { ViewType } from '@/shared/components';
import type { KPITreeNode } from '@/domain/kpi/types';
import type { AuditResult } from '@/domain/audit/types';

/**
 * サンプルKPIデータ（問題あり状態）
 */
const SAMPLE_KPI_DATA: KPITreeNode = {
  id: 'root',
  label: 'FY2025 全社売上目標',
  value: '82%',
  status: 'warning',
  owner: 'CEO',
  ambiguityScore: 12,
  children: [
    {
      id: 'sales',
      label: '新規受注額 (ARR)',
      value: '76%',
      status: 'critical',
      owner: 'VP of Sales',
      ambiguityScore: 45,
      children: [
        {
          id: 'ent_sales',
          label: 'Enterprise Sales',
          value: '65%',
          status: 'critical',
          owner: 'M. Tanaka',
          ambiguityScore: 68,
          isTarget: true,
        },
      ],
    },
  ],
};

/**
 * サンプルレポートコンテンツ
 */
const SAMPLE_REPORT_CONTENT = `# Enterprise Sales 週次報告

## 進捗状況
今週は全体的に厳しい状況が続いている。

## 見込み案件
A社については、概ね順調に進んでおり、来月には受注できる見込み。`;

/**
 * サンプル監査結果
 */
const SAMPLE_AUDIT_RESULT: AuditResult = {
  reportId: 'sample-001',
  items: [
    {
      id: '1',
      pattern: 'shallow_analysis',
      severity: 'critical',
      message: '要因分析が定性的すぎます。「厳しい」を定量化してください。',
      rationale: '定性的な表現のみで、具体的な数値や比較データがありません。',
      suggestion: '例: 商談化率の前月比増減などを提示',
      location: {
        range: { start: 4, end: 4, text: '今週は全体的に厳しい状況が続いている。' },
      },
      status: 'open',
      detectedAt: new Date(),
    },
    {
      id: '2',
      pattern: 'lack_of_quantification',
      severity: 'warning',
      message: '「概ね順調」の定義が不明瞭です。受注確率(%)を記載してください。',
      rationale: '「順調」は主観的な表現であり、客観的な評価基準が示されていません。',
      suggestion: '例: Phase 4, Probability 80%',
      location: {
        range: { start: 7, end: 7, text: 'A社については、概ね順調に進んでおり' },
      },
      status: 'open',
      detectedAt: new Date(),
    },
  ],
  score: 45,
  patternCounts: {
    shallow_analysis: 1,
    missing_coverage: 0,
    lack_of_quantification: 1,
    unclear_action: 0,
    fact_interpretation_mixing: 0,
  },
  auditedAt: new Date(),
  status: 'completed',
};

export interface SampleExperienceProps {
  onComplete: () => void;
}

export const SampleExperience: FC<SampleExperienceProps> = ({ onComplete }) => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [hasResolvedIssue, setHasResolvedIssue] = useState(false);

  const auditLog = useAuditLog(SAMPLE_AUDIT_RESULT);

  const warningLines = auditLog.allItems
    .filter((item) => item.status === 'open')
    .map((item) => item.location.range.start);

  const handleLineClick = (lineNumber: number) => {
    setSelectedLine(lineNumber);
  };

  // 最初の指摘を解決したら完了ボタンを表示
  const handleResolve = () => {
    setHasResolvedIssue(true);
  };

  return (
    <div className="h-screen flex flex-col bg-background-base">
      {/* Progress Header */}
      <div className="bg-accent-subtle border-b border-accent-primary/30 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-accent-text">
              オンボーディング中
            </span>
            <span className="text-xs text-foreground-muted">
              {currentView === 'dashboard' ? 'ステップ 1/2: ダッシュボード確認' : 'ステップ 2/2: 問題の解消'}
            </span>
          </div>
          {hasResolvedIssue && (
            <button
              onClick={onComplete}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-severity-success-bg text-severity-success-text border border-severity-success-border hover:shadow-md transition-all"
            >
              体験完了 - 次へ
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {currentView === 'dashboard' && (
          <DashboardView kpiData={SAMPLE_KPI_DATA} onNavigate={setCurrentView} />
        )}
        {currentView === 'editor' && (
          <EditorView
            fileName="Enterprise_Sales_Weekly.md"
            owner="M. Tanaka"
            content={SAMPLE_REPORT_CONTENT}
            ambiguityPercent={100 - auditLog.score}
            warningLines={warningLines}
            selectedLine={selectedLine}
            onLineClick={handleLineClick}
            sidePanel={
              <div className="h-full flex flex-col">
                <div className="p-4 bg-accent-subtle border-b border-accent-primary/30">
                  <p className="text-sm text-accent-text">
                    💡 右の指摘から1つ選んで「解決済みにする」を押してみましょう
                  </p>
                </div>
                <div className="flex-1 overflow-hidden">
                  <AuditPanel
                    auditLog={{
                      ...auditLog,
                      resolve: (id) => {
                        auditLog.resolve(id);
                        handleResolve();
                      },
                    }}
                    title="NEUMANN_AUDIT_LOG"
                    className="h-full rounded-none border-0"
                  />
                </div>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

export default SampleExperience;
