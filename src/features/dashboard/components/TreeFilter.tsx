/**
 * src/features/dashboard/components/TreeFilter.tsx
 *
 * [Feature Component]
 * TreeFilter - ツリーのフィルター・検索コントロール
 */

'use client';

import { type FC } from 'react';
import { Search, Filter, X } from 'lucide-react';
import type { KPITreeNode } from '@/domain/kpi/types';

export type StatusFilter = 'all' | 'critical' | 'warning' | 'healthy';

export interface TreeFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
  resultCount?: number;
}

const STATUS_OPTIONS: { value: StatusFilter; label: string; color: string }[] = [
  { value: 'all', label: 'All', color: 'bg-foreground-muted' },
  { value: 'critical', label: 'Critical', color: 'bg-severity-critical-text' },
  { value: 'warning', label: 'Warning', color: 'bg-severity-warning-text' },
  { value: 'healthy', label: 'Healthy', color: 'bg-severity-success-text' },
];

/**
 * フィルターボタン
 */
const FilterButton: FC<{
  active: boolean;
  onClick: () => void;
  color: string;
  children: React.ReactNode;
}> = ({ active, onClick, color, children }) => (
  <button
    onClick={onClick}
    className={`
      inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full
      transition-all duration-200
      ${active
        ? 'bg-background-layer1 text-foreground-primary border-2 border-border-active shadow-sm'
        : 'bg-background-layer3 text-foreground-secondary border-2 border-transparent hover:border-border-default'
      }
    `}
  >
    <span className={`w-2 h-2 rounded-full ${color}`} />
    {children}
  </button>
);

export const TreeFilter: FC<TreeFilterProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  resultCount,
}) => {
  return (
    <div className="flex flex-col gap-3 mb-4 p-4 bg-background-layer2 rounded-lg border border-border-default">
      {/* 検索バー */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search KPI nodes..."
          className="
            w-full pl-10 pr-10 py-2 text-sm
            bg-background-layer1 border border-border-default rounded-lg
            text-foreground-primary placeholder:text-foreground-muted
            focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20
            transition-all duration-200
          "
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground-muted hover:text-foreground-primary transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* フィルターとカウンター */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-foreground-muted" />
          <div className="flex gap-2">
            {STATUS_OPTIONS.map((option) => (
              <FilterButton
                key={option.value}
                active={statusFilter === option.value}
                onClick={() => onStatusFilterChange(option.value)}
                color={option.color}
              >
                {option.label}
              </FilterButton>
            ))}
          </div>
        </div>

        {resultCount !== undefined && (
          <span className="text-xs text-foreground-muted font-mono">
            {resultCount} node{resultCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * KPIツリーをフィルタリングするユーティリティ関数
 */
export function filterKPITree(
  node: KPITreeNode,
  searchQuery: string,
  statusFilter: StatusFilter
): KPITreeNode | null {
  const searchLower = searchQuery.toLowerCase();

  // 現在のノードがフィルター条件に一致するか
  const matchesSearch = searchQuery === '' ||
    node.label.toLowerCase().includes(searchLower) ||
    node.owner.toLowerCase().includes(searchLower);

  const matchesStatus = statusFilter === 'all' || node.status === statusFilter;

  // 子ノードをフィルタリング
  const filteredChildren = node.children
    ?.map((child) => filterKPITree(child, searchQuery, statusFilter))
    .filter((child): child is KPITreeNode => child !== null);

  // 自身がマッチするか、子ノードにマッチがある場合は保持
  const hasMatchingChildren = filteredChildren && filteredChildren.length > 0;
  const selfMatches = matchesSearch && matchesStatus;

  if (selfMatches || hasMatchingChildren) {
    return {
      ...node,
      children: filteredChildren,
    };
  }

  return null;
}

/**
 * フィルター後のノード数をカウント
 */
export function countFilteredNodes(node: KPITreeNode | null): number {
  if (!node) return 0;
  let count = 1;
  if (node.children) {
    node.children.forEach((child) => {
      count += countFilteredNodes(child);
    });
  }
  return count;
}

export default TreeFilter;
