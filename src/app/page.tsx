'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, type ViewType } from '@/shared/components';
import { DashboardView } from '@/features/dashboard';
import { EditorView, AuditPanel, useAuditLog } from '@/features/editor';
import type { KPITreeNode } from '@/domain/kpi/types';
import type { AuditResult } from '@/domain/audit/types';

/**
 * モックデータ: KPI Tree
 */
const KPI_TREE_DATA: KPITreeNode = {
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
        {
          id: 'smb_sales',
          label: 'SMB Sales',
          value: '92%',
          status: 'healthy',
          owner: 'S. Sato',
          ambiguityScore: 5,
        },
      ],
    },
    {
      id: 'churn',
      label: '解約率 (Churn)',
      value: '1.2%',
      status: 'warning',
      owner: 'VP of CS',
      ambiguityScore: 24,
      children: [
        {
          id: 'onboarding',
          label: 'Onboarding Success',
          value: '88%',
          status: 'healthy',
          owner: 'K. Suzuki',
          ambiguityScore: 8,
        },
        {
          id: 'product_bug',
          label: 'Product Quality',
          value: 'N/A',
          status: 'warning',
          owner: 'PdM Group',
          ambiguityScore: 35,
        },
      ],
    },
  ],
};

/**
 * モックデータ: レポートコンテンツ
 */
const INITIAL_REPORT_CONTENT = `# Enterprise Sales 週次報告 (2025-10-12)

## 進捗状況
今週は全体的に厳しい状況が続いている。
主な要因としては、競合他社の攻勢が強まっていることと、
季節性の要因で顧客の反応が鈍いことが挙げられる。

## 見込み案件
A社については、概ね順調に進んでおり、来月には受注できる見込み。
B社は担当者が忙しそうで連絡がつきにくいが、引き続きフォローする。
C社はロストの可能性が高い。

## 来週の予定
チーム全体で気合いを入れ直し、架電数を増やしてリカバリーを図る。
既存顧客へのアップセルも検討中。`;

/**
 * モックデータ: 監査結果
 * AuditResult 型を使用し、useAuditLog と連携
 */
const MOCK_AUDIT_RESULT: AuditResult = {
  reportId: 'ent-sales-weekly-001',
  items: [
    {
      id: '1',
      pattern: 'shallow_analysis',
      severity: 'critical',
      message: '要因分析が定性的すぎます。「厳しい」「攻勢」「反応が鈍い」を定量化してください。',
      rationale: '定性的な表現のみで、具体的な数値や比較データがありません。',
      suggestion: '例: 競合A社の値引き率、商談化率の前月比増減などを提示',
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
      message: '「概ね順調」「見込み」の定義が不明瞭です。フェーズ定義と受注確率(%)を記載してください。',
      rationale: '「順調」は主観的な表現であり、客観的な評価基準が示されていません。',
      suggestion: '例: Phase 4 (Selection), Probability 80%',
      location: {
        range: { start: 9, end: 9, text: 'A社については、概ね順調に進んでおり' },
      },
      status: 'open',
      detectedAt: new Date(),
    },
    {
      id: '3',
      pattern: 'unclear_action',
      severity: 'critical',
      message: '「気合い」「リカバリー」はアクションではありません。Who/When/Whatに分解してください。',
      rationale: 'アクションプランとして具体性に欠け、実行可能性が判断できません。',
      suggestion: '例: メンバー3名が、金曜日までに、休眠リスト50件に対し架電を行う',
      location: {
        range: { start: 14, end: 14, text: 'チーム全体で気合いを入れ直し' },
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
    unclear_action: 1,
    fact_interpretation_mixing: 0,
  },
  auditedAt: new Date(),
  status: 'completed',
};

export default function Home() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  // 初回アクセス判定
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasCompletedOnboarding = localStorage.getItem('neumann_onboarding_completed');
      if (!hasCompletedOnboarding) {
        router.push('/onboarding');
      } else {
        setIsReady(true);
      }
    }
  }, [router]);

  // AuditPanel 用の Hook
  const auditLog = useAuditLog(MOCK_AUDIT_RESULT);

  // 警告がある行番号の配列を生成
  const warningLines = useMemo(() => {
    return auditLog.allItems
      .filter((item) => item.status === 'open')
      .map((item) => item.location.range.start);
  }, [auditLog.allItems]);

  // 行クリック時のハンドラー
  const handleLineClick = (lineNumber: number) => {
    setSelectedLine(lineNumber);
  };

  // オンボーディングチェック中はローディング表示
  if (!isReady) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-base">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-primary mb-4 animate-pulse">
            <span className="text-xl text-foreground-inverse">🔵</span>
          </div>
          <p className="text-foreground-muted">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background-base text-foreground-primary overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {currentView === 'dashboard' && (
          <DashboardView kpiData={KPI_TREE_DATA} onNavigate={setCurrentView} />
        )}
        {currentView === 'editor' && (
          <EditorView
            fileName="Enterprise_Sales_Weekly.md"
            owner="M. Tanaka"
            content={INITIAL_REPORT_CONTENT}
            ambiguityPercent={100 - auditLog.score}
            warningLines={warningLines}
            selectedLine={selectedLine}
            onLineClick={handleLineClick}
            sidePanel={
              <AuditPanel
                auditLog={auditLog}
                title="NEUMANN_AUDIT_LOG"
                className="h-full rounded-none border-0"
              />
            }
          />
        )}
      </main>
    </div>
  );
}
