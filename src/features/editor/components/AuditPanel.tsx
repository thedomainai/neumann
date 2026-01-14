/**
 * src/features/editor/components/AuditPanel.tsx
 *
 * [Feature Component]
 * AuditPanel - 曖昧性指摘パネル
 *
 * Hooksを利用して描画のみに専念するUIコンポーネント。
 * ビジネスロジックは useAuditLog に委譲。
 */

'use client';

import { type FC, useState } from 'react';
import { getSeverityStyles, getScoreColor } from '@/lib/theme';
import { PATTERN_LABELS, type AuditItem } from '@/domain/audit/types';
import { type UseAuditLogReturn } from '../hooks/useAuditLog';

/**
 * AuditPanel Props
 */
export interface AuditPanelProps {
  /** useAuditLog から取得した状態と操作 */
  auditLog: UseAuditLogReturn;
  /** パネルのタイトル */
  title?: string;
  /** クラス名 */
  className?: string;
}

/**
 * 曖昧性指摘パネル
 *
 * @example
 * ```tsx
 * const auditLog = useAuditLog(result);
 * return <AuditPanel auditLog={auditLog} />;
 * ```
 */
export const AuditPanel: FC<AuditPanelProps> = ({
  auditLog,
  title = '曖昧性チェック',
  className = '',
}) => {
  const { items, openCount, score, filter, setFilter, dismiss, resolve, isProcessing } =
    auditLog;

  return (
    <div
      className={`flex flex-col h-full bg-background-layer2 rounded-lg border border-border-default ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border-default">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-medium text-foreground-primary">{title}</h2>
          {openCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-severity-critical-bg text-severity-critical-text border border-severity-critical-border">
              {openCount}
            </span>
          )}
        </div>
        <ScoreBadge score={score} />
      </div>

      {/* Filter */}
      <div className="flex gap-2 p-3 border-b border-border-default">
        <FilterButton
          active={filter.status === 'open'}
          onClick={() => setFilter({ ...filter, status: 'open' })}
        >
          未解決
        </FilterButton>
        <FilterButton
          active={filter.status === 'all'}
          onClick={() => setFilter({ ...filter, status: 'all' })}
        >
          すべて
        </FilterButton>
        <FilterButton
          active={filter.status === 'resolved'}
          onClick={() => setFilter({ ...filter, status: 'resolved' })}
        >
          解決済み
        </FilterButton>
      </div>

      {/* Loading Overlay */}
      {isProcessing && (
        <div className="px-3 py-2 bg-accent-subtle border-b border-border-default">
          <div className="flex items-center gap-2 text-xs text-accent-text">
            <LoadingSpinner />
            <span>処理中...</span>
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {items.length === 0 ? (
          <EmptyState status={filter.status} />
        ) : (
          items.map((item) => (
            <AuditItemCard
              key={item.id}
              item={item}
              onDismiss={(reason) => dismiss(item.id, reason)}
              onResolve={() => resolve(item.id)}
              disabled={isProcessing}
            />
          ))
        )}
      </div>
    </div>
  );
};

/**
 * スコアバッジ
 */
const ScoreBadge: FC<{ score: number }> = ({ score }) => {
  const color = getScoreColor(score);

  return (
    <div
      className="flex items-center gap-2 px-3 py-1 rounded-full"
      style={{ backgroundColor: `${color}20` }}
    >
      <span className="text-sm font-medium" style={{ color }}>
        {score}
      </span>
      <span className="text-xs text-foreground-secondary">/ 100</span>
    </div>
  );
};

/**
 * フィルターボタン
 */
const FilterButton: FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-md transition-colors ${
        active
          ? 'bg-accent-primary text-foreground-inverse'
          : 'bg-background-layer3 text-foreground-secondary hover:text-foreground-primary'
      }`}
    >
      {children}
    </button>
  );
};

/**
 * ローディングスピナー
 */
const LoadingSpinner: FC = () => (
  <svg
    className="w-3 h-3 animate-spin"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * 空状態
 */
const EmptyState: FC<{ status?: string }> = ({ status }) => {
  const message =
    status === 'open'
      ? '未解決の指摘はありません'
      : status === 'resolved'
        ? '解決済みの指摘はありません'
        : '指摘はありません';

  return (
    <div className="flex flex-col items-center justify-center py-12 text-foreground-muted">
      <svg
        className="w-12 h-12 mb-3 opacity-50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-sm">{message}</p>
    </div>
  );
};

/**
 * 監査項目カード
 */
const AuditItemCard: FC<{
  item: AuditItem;
  onDismiss: (reason: string) => void;
  onResolve: () => void;
  disabled?: boolean;
}> = ({ item, onDismiss, onResolve, disabled }) => {
  const [showDismissInput, setShowDismissInput] = useState(false);
  const [dismissReason, setDismissReason] = useState('');

  const severityStyles = getSeverityStyles(item.severity);
  const isOpen = item.status === 'open';

  const handleDismiss = () => {
    if (dismissReason.trim()) {
      onDismiss(dismissReason.trim());
      setShowDismissInput(false);
      setDismissReason('');
    }
  };

  const handleCancel = () => {
    setShowDismissInput(false);
    setDismissReason('');
  };

  return (
    <div
      className={`p-3 rounded-lg border transition-colors ${
        isOpen
          ? 'bg-background-layer3 border-border-default hover:border-border-active'
          : 'bg-background-layer2 border-border-subtle opacity-60'
      } ${disabled ? 'pointer-events-none opacity-50' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className={`flex items-center gap-2 px-2 py-0.5 rounded text-xs font-medium border ${severityStyles}`}>
          {PATTERN_LABELS[item.pattern]}
        </div>
        {item.status !== 'open' && (
          <span className="text-xs text-foreground-muted">
            {item.status === 'resolved' ? '解決済み' : '却下'}
          </span>
        )}
      </div>

      {/* Message */}
      <p className="text-sm text-foreground-primary mb-2">{item.message}</p>

      {/* Rationale (if exists) */}
      {item.rationale && (
        <p className="text-xs text-foreground-secondary mb-2 pl-3 border-l-2 border-border-default">
          {item.rationale}
        </p>
      )}

      {/* Suggestion */}
      <p className="text-xs text-accent-text mb-3 pl-3 border-l-2 border-accent-primary">
        {item.suggestion}
      </p>

      {/* Actions */}
      {isOpen && !showDismissInput && (
        <div className="flex gap-2">
          <button
            onClick={onResolve}
            disabled={disabled}
            className="px-3 py-1 text-xs font-medium rounded bg-severity-success-bg text-severity-success-text border border-severity-success-border hover:shadow-sm transition-colors disabled:opacity-50"
          >
            解決済み
          </button>
          <button
            onClick={() => setShowDismissInput(true)}
            disabled={disabled}
            className="px-3 py-1 text-xs font-medium rounded bg-background-elevated text-foreground-secondary border border-border-default hover:text-foreground-primary transition-colors disabled:opacity-50"
          >
            却下
          </button>
        </div>
      )}

      {/* Dismiss Reason Input */}
      {isOpen && showDismissInput && (
        <div className="space-y-2">
          <input
            type="text"
            value={dismissReason}
            onChange={(e) => setDismissReason(e.target.value)}
            placeholder="却下理由を入力（必須）"
            className="w-full px-3 py-1.5 text-xs rounded bg-background-layer1 border border-border-default text-foreground-primary placeholder:text-foreground-muted focus:outline-none focus:border-accent-primary"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleDismiss();
              if (e.key === 'Escape') handleCancel();
            }}
          />
          <div className="flex gap-2">
            <button
              onClick={handleDismiss}
              disabled={!dismissReason.trim() || disabled}
              className="px-3 py-1 text-xs font-medium rounded bg-severity-warning-bg text-severity-warning-text border border-severity-warning-border hover:shadow-sm transition-colors disabled:opacity-50"
            >
              却下する
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-xs font-medium rounded bg-background-elevated text-foreground-secondary hover:text-foreground-primary transition-colors"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}

      {/* Dismissed Reason Display */}
      {item.status === 'dismissed' && item.dismissReason && (
        <p className="text-xs text-foreground-muted mt-2">
          却下理由: {item.dismissReason}
        </p>
      )}
    </div>
  );
};

export default AuditPanel;
