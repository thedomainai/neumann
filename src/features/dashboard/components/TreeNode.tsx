/**
 * src/features/dashboard/components/TreeNode.tsx
 *
 * [Feature Component]
 * KPIツリーノード - 階層的なKPI構造を表示
 * プログレスバー、アニメーション、接続線を含む
 */

'use client';

import { type FC, useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronDown, AlertTriangle, User } from 'lucide-react';
import type { KPITreeNode as KPITreeNodeType } from '@/domain/kpi/types';

export interface TreeNodeProps {
  data: KPITreeNodeType;
  level?: number;
  isLast?: boolean;
  onSelect: (node: KPITreeNodeType) => void;
}

const BORDER_COLORS: Record<KPITreeNodeType['status'], string> = {
  critical: 'border-l-severity-critical-text',
  warning: 'border-l-severity-warning-text',
  healthy: 'border-l-severity-success-text',
};

const VALUE_COLORS: Record<KPITreeNodeType['status'], string> = {
  critical: 'text-severity-critical-text',
  warning: 'text-severity-warning-text',
  healthy: 'text-severity-success-text',
};

const PROGRESS_COLORS: Record<KPITreeNodeType['status'], string> = {
  critical: 'bg-severity-critical-text',
  warning: 'bg-severity-warning-text',
  healthy: 'bg-severity-success-text',
};

const STATUS_BG: Record<KPITreeNodeType['status'], string> = {
  critical: 'bg-severity-critical-bg/30',
  warning: 'bg-severity-warning-bg/30',
  healthy: 'bg-severity-success-bg/30',
};

/**
 * 値から数値を抽出（例: "82%" -> 82, "1.2%" -> 1.2, "N/A" -> null）
 */
function extractNumericValue(value: string): number | null {
  const match = value.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
}

/**
 * プログレスバーコンポーネント
 */
const ProgressBar: FC<{ value: number; status: KPITreeNodeType['status'] }> = ({ value, status }) => {
  const [width, setWidth] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // アニメーション用の遅延
    const timer = setTimeout(() => setWidth(Math.min(value, 100)), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="h-1.5 w-full bg-background-layer3 rounded-full overflow-hidden">
      <div
        ref={progressRef}
        className={`h-full rounded-full transition-all duration-500 ease-out ${PROGRESS_COLORS[status]}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

/**
 * 曖昧性スコアバッジ
 */
const AmbiguityBadge: FC<{ score: number }> = ({ score }) => {
  const status = score > 40 ? 'critical' : score > 20 ? 'warning' : 'healthy';
  const statusStyle = {
    critical: 'bg-severity-critical-bg text-severity-critical-text border-severity-critical-border',
    warning: 'bg-severity-warning-bg text-severity-warning-text border-severity-warning-border',
    healthy: 'bg-severity-success-bg text-severity-success-text border-severity-success-border',
  };

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-mono ${statusStyle[status]}`}>
      <AlertTriangle size={10} />
      <span>AMB: {score}</span>
    </div>
  );
};

export const TreeNode: FC<TreeNodeProps> = ({ data, level = 0, isLast = false, onSelect }) => {
  const [expanded, setExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | 'auto'>('auto');

  const borderClass = BORDER_COLORS[data.status];
  const valueClass = VALUE_COLORS[data.status];
  const statusBg = STATUS_BG[data.status];

  const numericValue = extractNumericValue(data.value);
  const hasChildren = data.children && data.children.length > 0;

  // 展開/折りたたみのアニメーション用
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [data.children]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <div className={`relative ${level > 0 ? 'ml-6' : ''}`}>
      {/* 接続線 - 親ノードからの縦線 */}
      {level > 0 && (
        <div
          className={`absolute left-[-12px] top-0 w-px bg-border-subtle ${isLast ? 'h-6' : 'h-full'}`}
          style={{ height: isLast ? '24px' : '100%' }}
        />
      )}

      {/* 接続線 - 横線 */}
      {level > 0 && (
        <div className="absolute left-[-12px] top-6 w-3 h-px bg-border-subtle" />
      )}

      {/* ノード本体 */}
      <div
        className={`
          relative flex flex-col p-3 mb-2 rounded-lg cursor-pointer
          transition-all duration-200 ease-out
          border-l-3 ${borderClass}
          ${data.isTarget
            ? 'bg-background-layer1 border border-border-active shadow-md ring-1 ring-accent-primary/20'
            : `${statusBg} border border-transparent hover:border-border-default hover:shadow-sm`
          }
          ${isHovered ? 'transform scale-[1.01]' : ''}
        `}
        onClick={() => onSelect(data)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ヘッダー行 */}
        <div className="flex items-center gap-2">
          {/* Expand/Collapse Toggle */}
          <button
            className={`
              p-1 rounded transition-all duration-200
              ${hasChildren
                ? 'text-foreground-muted hover:text-foreground-primary hover:bg-background-layer3'
                : 'text-transparent cursor-default'
              }
            `}
            onClick={handleToggle}
            disabled={!hasChildren}
          >
            {hasChildren ? (
              expanded ? (
                <ChevronDown size={14} className="transition-transform duration-200" />
              ) : (
                <ChevronRight size={14} className="transition-transform duration-200" />
              )
            ) : (
              <span className="w-[14px] h-[14px] block" />
            )}
          </button>

          {/* メインコンテンツ */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center gap-2">
              <span className="font-mono text-sm font-medium text-foreground-primary truncate">
                {data.label}
              </span>
              <span className={`font-mono text-sm font-bold ${valueClass} shrink-0`}>
                {data.value}
              </span>
            </div>
          </div>
        </div>

        {/* プログレスバー（数値がある場合） */}
        {numericValue !== null && (
          <div className="mt-2 ml-7">
            <ProgressBar value={numericValue} status={data.status} />
          </div>
        )}

        {/* メタ情報 */}
        <div className="flex justify-between items-center mt-2 ml-7">
          <div className="flex items-center gap-1 text-xs text-foreground-muted">
            <User size={12} />
            <span>{data.owner}</span>
          </div>
          {data.ambiguityScore > 10 && (
            <AmbiguityBadge score={data.ambiguityScore} />
          )}
        </div>

        {/* ターゲットインジケータ */}
        {data.isTarget && (
          <div className="absolute right-2 top-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-accent-primary text-foreground-inverse">
              TARGET
            </span>
          </div>
        )}
      </div>

      {/* 子ノード */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${expanded ? 'opacity-100' : 'opacity-0 max-h-0'}
        `}
        style={{
          maxHeight: expanded ? `${contentHeight === 'auto' ? 2000 : contentHeight}px` : 0,
        }}
      >
        <div ref={contentRef}>
          {hasChildren &&
            data.children!.map((child, index) => (
              <TreeNode
                key={child.id}
                data={child}
                level={level + 1}
                isLast={index === data.children!.length - 1}
                onSelect={onSelect}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TreeNode;
