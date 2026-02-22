/**
 * src/domain/audit/fact-gathering.ts
 *
 * [Domain Layer]
 * Autonomous Fact Gathering - 自律的な情報収集
 *
 * 曖昧性を解消するために必要なファクトを推論し、取得する。
 * v1.1 ではモックデータを返す。v1.2 で実際の外部連携を実装予定。
 */

import type { AuditItem } from './types';
import type { FactData } from '@/features/editor/components/FactCard';

/**
 * ルールベース推論エンジン（モック版）
 *
 * 曖昧性パターンとメッセージ内容から、関連するファクトを推論する。
 *
 * @param item - 曖昧性検出結果
 * @returns 関連するファクトのリスト
 *
 * @example
 * ```ts
 * const facts = inferFactsFromAmbiguity({
 *   pattern: 'LQ',
 *   message: '「全体的に厳しい」は曖昧です',
 *   context: '全体的に厳しい状況です',
 * });
 * // => [{ source: 'KPI実績値', label: '商談化率', ... }]
 * ```
 */
export function inferFactsFromAmbiguity(item: AuditItem): FactData[] {
  // context は item.location.range.text から取得（該当箇所のテキスト）
  const context = (item.location?.range?.text || '').toLowerCase();
  const message = item.message.toLowerCase();

  // ルール1: 商談化率が言及されている場合
  if (
    context.includes('厳しい') ||
    context.includes('商談') ||
    message.includes('商談化率')
  ) {
    return [
      {
        source: 'KPI実績値',
        icon: '📊',
        label: '商談化率',
        previousValue: '25%',
        currentValue: '10%',
        diff: '-15pt',
        diffDirection: 'down',
      },
    ];
  }

  // ルール2: 順調・進捗が言及されている場合
  if (context.includes('順調') || context.includes('進捗') || context.includes('進んで')) {
    return [
      {
        source: 'CRM（デモ）',
        icon: '💼',
        label: '案件フェーズ',
        currentValue: 'Phase 4 (Selection)',
        previousValue: 'Phase 3 (Evaluation)',
        diff: '+1 phase',
        diffDirection: 'up',
      },
      {
        source: 'CRM（デモ）',
        icon: '💼',
        label: '受注確度',
        currentValue: '80%',
        previousValue: '60%',
        diff: '+20pt',
        diffDirection: 'up',
      },
    ];
  }

  // ルール3: ARR・売上が言及されている場合
  if (context.includes('arr') || context.includes('売上') || context.includes('伸び')) {
    return [
      {
        source: 'KPI実績値',
        icon: '📊',
        label: 'ARR',
        previousValue: '$1.2M',
        currentValue: '$1.5M',
        diff: '+25%',
        diffDirection: 'up',
      },
    ];
  }

  // ルール4: チャーンが言及されている場合
  if (context.includes('チャーン') || context.includes('解約')) {
    return [
      {
        source: 'KPI実績値',
        icon: '📊',
        label: 'チャーンレート',
        previousValue: '5.2%',
        currentValue: '3.8%',
        diff: '-1.4pt',
        diffDirection: 'up', // チャーンは下がると良い
      },
    ];
  }

  // ルール5: ユーザー数が言及されている場合
  if (
    context.includes('ユーザー') ||
    context.includes('顧客') ||
    context.includes('アクティブ')
  ) {
    return [
      {
        source: 'KPI実績値',
        icon: '📊',
        label: 'アクティブユーザー数',
        previousValue: '1,200',
        currentValue: '1,450',
        diff: '+20.8%',
        diffDirection: 'up',
      },
    ];
  }

  // デフォルト: 定量性不足の場合は一般的な KPI を提示
  if (item.pattern === 'LQ') {
    return [
      {
        source: 'KPI実績値',
        icon: '📊',
        label: '目標達成率',
        currentValue: '85%',
        previousValue: '90%',
        diff: '-5pt',
        diffDirection: 'down',
      },
    ];
  }

  // 該当するルールがない場合は空配列
  return [];
}

/**
 * ファクトをテキスト形式に変換（コピー用）
 *
 * @param fact - ファクトデータ
 * @returns テキスト形式の文字列
 *
 * @example
 * ```ts
 * const text = formatFactAsText({
 *   label: '商談化率',
 *   previousValue: '25%',
 *   currentValue: '10%',
 *   diff: '-15pt',
 * });
 * // => "商談化率: 25% → 10% (-15pt)"
 * ```
 */
export function formatFactAsText(fact: FactData): string {
  if (fact.previousValue && fact.diff) {
    return `${fact.label}: ${fact.previousValue} → ${fact.currentValue} (${fact.diff})`;
  }
  return `${fact.label}: ${fact.currentValue}`;
}
