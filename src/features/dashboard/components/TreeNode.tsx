/**
 * src/features/dashboard/components/TreeNode.tsx
 *
 * [Feature Component]
 * KPIツリーノード - Compact Nested Layout
 * Figma Layer Panel 風の階層表現
 */

'use client';

import { type FC, useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Badge } from '@/shared/components';
import type { KPITreeNode as KPITreeNodeType } from '@/domain/kpi/types';

export interface TreeNodeProps {
  data: KPITreeNodeType;
  level?: number;
  onSelect: (node: KPITreeNodeType) => void;
}

const STATUS_BORDER: Record<KPITreeNodeType['status'], string> = {
  critical: 'border-l-red-500',
  warning: 'border-l-amber-500',
  healthy: 'border-l-emerald-500',
};

const STATUS_VALUE: Record<KPITreeNodeType['status'], string> = {
  critical: 'text-red-500',
  warning: 'text-amber-500',
  healthy: 'text-emerald-500',
};

const STATUS_BADGE: Record<KPITreeNodeType['status'], 'critical' | 'warning' | 'success'> = {
  critical: 'critical',
  warning: 'warning',
  healthy: 'success',
};

// Level に応じたスタイル
const LEVEL_STYLES = {
  0: {
    border: 'border-2',
    shadow: 'shadow-md',
    padding: 'p-4',
    borderColor: 'border-gray-300',
    hoverShadow: 'hover:shadow-lg',
    labelSize: 'text-base',
    labelWeight: 'font-display font-semibold',
  },
  1: {
    border: 'border',
    shadow: 'shadow-sm',
    padding: 'p-3',
    borderColor: 'border-gray-200',
    hoverShadow: 'hover:shadow-md',
    labelSize: 'text-sm',
    labelWeight: 'font-display font-semibold',
  },
  2: {
    border: 'border',
    shadow: 'shadow-none',
    padding: 'p-2',
    borderColor: 'border-gray-200',
    hoverShadow: 'hover:shadow-sm',
    labelSize: 'text-sm',
    labelWeight: 'font-medium',
  },
};

export const TreeNode: FC<TreeNodeProps> = ({ data, level = 0, onSelect }) => {
  const [expanded, setExpanded] = useState(true);

  const borderClass = STATUS_BORDER[data.status];
  const valueClass = STATUS_VALUE[data.status];
  const badgeVariant = STATUS_BADGE[data.status];
  const levelStyle = LEVEL_STYLES[Math.min(level, 2) as 0 | 1 | 2];

  return (
    <div className={level === 0 ? '' : 'mt-2'}>
      {/* Card */}
      <div
        className={`
          bg-white rounded-lg
          ${levelStyle.border}
          ${levelStyle.borderColor}
          ${levelStyle.shadow}
          ${levelStyle.padding}
          ${levelStyle.hoverShadow}
          border-l-4 ${borderClass}
          cursor-pointer
          transition-all duration-150
          ${data.isTarget ? 'ring-2 ring-purple-500/30' : ''}
          hover:border-purple-500
        `}
        onClick={() => onSelect(data)}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          {/* Left: Label & Owner */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {/* Expand/Collapse */}
              {data.children && (
                <button
                  className="text-foreground-muted hover:text-foreground-primary transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(!expanded);
                  }}
                >
                  {expanded ? (
                    <ChevronDown size={16} className="transition-transform" />
                  ) : (
                    <ChevronRight size={16} className="transition-transform" />
                  )}
                </button>
              )}

              {/* Label */}
              <span className={`${levelStyle.labelSize} ${levelStyle.labelWeight} text-foreground-primary truncate`}>
                {data.label}
              </span>
            </div>

            {/* Owner */}
            <div className="flex items-center gap-2 ml-6">
              <span className="text-xs text-foreground-muted">{data.owner}</span>

              {/* Ambiguity Score Badge */}
              {data.ambiguityScore > 10 && (
                <Badge variant="warning" showIcon={false}>
                  AMB {data.ambiguityScore}
                </Badge>
              )}
            </div>
          </div>

          {/* Right: Value & Status */}
          <div className="flex flex-col items-end gap-1">
            <span className={`font-mono text-xl font-semibold ${valueClass}`}>
              {data.value}
            </span>
            <Badge variant={badgeVariant} showIcon={false}>
              {data.status.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Children (Nested Cards) */}
        {expanded && data.children && data.children.length > 0 && (
          <div className="mt-3 space-y-2">
            {data.children.map((child) => (
              <TreeNode
                key={child.id}
                data={child}
                level={level + 1}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeNode;
