/**
 * src/features/editor/components/FactCard.tsx
 *
 * [Feature Component]
 * FactCard - AI が取得した情報を表示するカード
 *
 * Autonomous Fact Gathering 機能の一部。
 * 曖昧性解消に必要なデータを視覚的に提示する。
 */

'use client';

import { type FC } from 'react';

export interface FactData {
  /** データソース名 */
  source: string;
  /** データソースアイコン（絵文字） */
  icon?: string;
  /** ラベル（「商談化率」「ARR」等） */
  label: string;
  /** 前回の値 */
  previousValue?: string;
  /** 現在の値 */
  currentValue: string;
  /** 差分（「-15pt」「+25%」等） */
  diff?: string;
  /** 差分の方向（増加/減少） */
  diffDirection?: 'up' | 'down' | 'neutral';
}

export interface FactCardProps {
  /** 取得したデータ */
  data: FactData;
  /** コピーボタンのコールバック */
  onCopy?: (text: string) => void;
}

/**
 * AI が取得した情報を表示するカード
 *
 * @example
 * ```tsx
 * <FactCard
 *   data={{
 *     source: 'KPI実績値',
 *     icon: '📊',
 *     label: '商談化率',
 *     previousValue: '25%',
 *     currentValue: '10%',
 *     diff: '-15pt',
 *     diffDirection: 'down',
 *   }}
 *   onCopy={(text) => navigator.clipboard.writeText(text)}
 * />
 * ```
 */
export const FactCard: FC<FactCardProps> = ({ data, onCopy }) => {
  const { source, icon = '📊', label, previousValue, currentValue, diff, diffDirection } = data;

  const handleCopy = () => {
    // 前月比の文字列を生成
    let text = currentValue;
    if (previousValue && diff) {
      text = `${label}: ${previousValue} → ${currentValue} (${diff})`;
    }
    onCopy?.(text);
  };

  return (
    <div className="p-4 bg-accent-subtle rounded-lg border-2 border-accent-primary/30">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium text-accent-text">
          データソース: {source}
        </span>
      </div>

      {/* Data Display */}
      <div className="space-y-2">
        <div className="text-sm font-bold text-foreground-primary">{label}:</div>

        {previousValue && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-foreground-muted">前回:</span>
            <span className="font-mono text-foreground-secondary">{previousValue}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          <span className="text-foreground-muted">現在:</span>
          <span className="font-mono font-bold text-foreground-primary">{currentValue}</span>
        </div>

        {diff && diffDirection && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground-muted">差分:</span>
            <span
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                diffDirection === 'up'
                  ? 'bg-severity-success-bg text-severity-success-text'
                  : diffDirection === 'down'
                    ? 'bg-severity-warning-bg text-severity-warning-text'
                    : 'bg-background-layer3 text-foreground-muted'
              }`}
            >
              {diffDirection === 'up' ? '↗' : diffDirection === 'down' ? '↘' : '→'}
              <span>{diff}</span>
            </span>
          </div>
        )}
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="mt-3 w-full px-3 py-2 text-sm font-medium rounded-lg bg-accent-primary text-foreground-inverse hover:bg-accent-primary/90 active:scale-[0.98] transition-all"
      >
        値をコピー
      </button>
    </div>
  );
};

/**
 * 複数の FactCard をまとめて表示するコンテナ
 */
export const FactCardList: FC<{ facts: FactData[]; onCopy?: (text: string) => void }> = ({
  facts,
  onCopy,
}) => {
  if (facts.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="text-sm font-bold text-accent-text flex items-center gap-2">
        <span>💡</span>
        <span>AI が関連情報を取得しました:</span>
      </div>
      {facts.map((fact, index) => (
        <FactCard key={index} data={fact} onCopy={onCopy} />
      ))}
    </div>
  );
};

export default FactCard;
