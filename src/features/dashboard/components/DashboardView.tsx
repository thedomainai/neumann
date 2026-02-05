/**
 * src/features/dashboard/components/DashboardView.tsx
 *
 * [Feature Component]
 * ダッシュボードビュー - KPI Logic Tree と Anomalies を表示
 * Summary Cards、フィルター、検索機能を含む
 */

'use client';

import { type FC, useState, useMemo } from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { TreeNode } from './TreeNode';
import { SummaryCards } from './SummaryCards';
import { TreeFilter, filterKPITree, countFilteredNodes, type StatusFilter } from './TreeFilter';
import type { KPITreeNode } from '@/domain/kpi/types';
import type { ViewType } from '@/shared/components';

export interface DashboardViewProps {
  kpiData: KPITreeNode;
  onNavigate: (view: ViewType) => void;
}

export const DashboardView: FC<DashboardViewProps> = ({
  kpiData,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // フィルター済みのツリーデータ
  const filteredData = useMemo(() => {
    return filterKPITree(kpiData, searchQuery, statusFilter);
  }, [kpiData, searchQuery, statusFilter]);

  // フィルター後のノード数
  const filteredCount = useMemo(() => {
    return countFilteredNodes(filteredData);
  }, [filteredData]);

  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-2xl font-light text-foreground-primary mb-1 flex items-center">
          <Activity className="mr-3 text-accent-text" />
          System Observability
        </h2>
        <p className="text-foreground-muted text-sm font-mono">
          STATUS: <span className="text-severity-warning-text">DEGRADED</span> | AMBIGUITY
          LEVEL: HIGH
        </p>
      </header>

      {/* Summary Cards */}
      <SummaryCards kpiData={kpiData} />

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        {/* KPI Logic Tree */}
        <div className="col-span-8 bg-background-layer2 border border-border-default rounded-lg p-4 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-border-subtle">
            <h3 className="text-sm font-mono text-foreground-secondary">
              LOGIC TREE VIEW
            </h3>
            <div className="flex space-x-4 items-center">
              <div className="flex space-x-2 items-center">
                <span className="w-2 h-2 rounded-full bg-severity-critical-text" />
                <span className="text-[10px] text-foreground-muted">CRITICAL</span>
              </div>
              <div className="flex space-x-2 items-center">
                <span className="w-2 h-2 rounded-full bg-severity-warning-text" />
                <span className="text-[10px] text-foreground-muted">WARNING</span>
              </div>
              <div className="flex space-x-2 items-center">
                <span className="w-2 h-2 rounded-full bg-severity-success-text" />
                <span className="text-[10px] text-foreground-muted">HEALTHY</span>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <TreeFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            resultCount={filteredCount}
          />

          {/* Tree Content */}
          <div className="flex-1 overflow-y-auto">
            {filteredData ? (
              <TreeNode
                data={filteredData}
                onSelect={(node) => {
                  if (node.isTarget) onNavigate('editor');
                }}
              />
            ) : (
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="text-sm">No matching nodes found</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}
                  className="mt-2 text-xs text-accent-text hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Alerts & Insights */}
        <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-background-layer2 border border-border-default rounded-lg p-4 flex-1 overflow-y-auto">
            <h3 className="text-sm font-mono text-foreground-secondary mb-4">
              CRITICAL ANOMALIES
            </h3>
            <div className="space-y-3">
              {/* Critical Alert */}
              <div
                className="p-3 rounded-lg cursor-pointer transition-all group bg-severity-critical-bg border border-severity-critical-border hover:shadow-md hover:scale-[1.01]"
                onClick={() => onNavigate('editor')}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-mono text-severity-critical-text">
                    VP of Sales / Ent Sales
                  </span>
                  <ArrowRight className="w-3 h-3 text-severity-critical-text opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-foreground-primary mb-2">
                  売上見込みの根拠において、事実と解釈の混同率が45%を超えています。
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-severity-critical-border text-severity-critical-text px-1.5 py-0.5 rounded font-medium">
                    FACT_MIXING
                  </span>
                </div>
              </div>

              {/* Warning Alert */}
              <div className="p-3 rounded-lg transition-all bg-severity-warning-bg border border-severity-warning-border hover:shadow-md hover:scale-[1.01] cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-mono text-severity-warning-text">
                    PdM Group / Product Quality
                  </span>
                </div>
                <p className="text-sm text-foreground-primary mb-2">
                  品質報告に数値データが欠落しています。
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-severity-warning-border text-severity-warning-text px-1.5 py-0.5 rounded font-medium">
                    DATA_MISSING
                  </span>
                </div>
              </div>

              {/* Info Alert */}
              <div className="p-3 rounded-lg transition-all bg-severity-info-bg border border-severity-info-border hover:shadow-md hover:scale-[1.01] cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-mono text-severity-info-text">
                    K. Suzuki / Onboarding
                  </span>
                </div>
                <p className="text-sm text-foreground-primary mb-2">
                  進捗報告が良好です。詳細を確認してください。
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-severity-info-border text-severity-info-text px-1.5 py-0.5 rounded font-medium">
                    REVIEW
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
