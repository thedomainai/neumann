/**
 * src/features/dashboard/components/SummaryCards.tsx
 *
 * [Feature Component]
 * Summary Cards - ダッシュボード上部の統計カード
 */

'use client';

import { type FC, useMemo } from 'react';
import { AlertTriangle, TrendingDown, Target, BarChart3 } from 'lucide-react';
import type { KPITreeNode } from '@/domain/kpi/types';

export interface SummaryCardsProps {
  kpiData: KPITreeNode;
}

interface CardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  status?: 'critical' | 'warning' | 'healthy' | 'neutral';
}

const STATUS_STYLES: Record<NonNullable<CardProps['status']>, string> = {
  critical: 'bg-severity-critical-bg border-severity-critical-border text-severity-critical-text',
  warning: 'bg-severity-warning-bg border-severity-warning-border text-severity-warning-text',
  healthy: 'bg-severity-success-bg border-severity-success-border text-severity-success-text',
  neutral: 'bg-background-layer2 border-border-default text-foreground-primary',
};

const ICON_STYLES: Record<NonNullable<CardProps['status']>, string> = {
  critical: 'text-severity-critical-text',
  warning: 'text-severity-warning-text',
  healthy: 'text-severity-success-text',
  neutral: 'text-foreground-muted',
};

/**
 * 統計カード
 */
const StatCard: FC<CardProps> = ({ icon, label, value, subValue, status = 'neutral' }) => {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg border ${STATUS_STYLES[status]} transition-all hover:shadow-md`}>
      <div className={`p-2 rounded-lg bg-background-layer1/50 ${ICON_STYLES[status]}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-mono text-foreground-muted uppercase tracking-wide truncate">
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">{value}</span>
          {subValue && (
            <span className="text-xs text-foreground-muted">{subValue}</span>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * KPIツリーを再帰的に走査してノードを収集
 */
function collectNodes(node: KPITreeNode): KPITreeNode[] {
  const nodes = [node];
  if (node.children) {
    node.children.forEach(child => {
      nodes.push(...collectNodes(child));
    });
  }
  return nodes;
}

/**
 * Summary Cards コンポーネント
 */
export const SummaryCards: FC<SummaryCardsProps> = ({ kpiData }) => {
  const stats = useMemo(() => {
    const allNodes = collectNodes(kpiData);
    const leafNodes = allNodes.filter(n => !n.children);

    // ステータス別カウント
    const statusCounts = {
      critical: allNodes.filter(n => n.status === 'critical').length,
      warning: allNodes.filter(n => n.status === 'warning').length,
      healthy: allNodes.filter(n => n.status === 'healthy').length,
    };

    // 平均曖昧性スコア
    const avgAmbiguity = Math.round(
      allNodes.reduce((sum, n) => sum + (n.ambiguityScore || 0), 0) / allNodes.length
    );

    // 高曖昧性ノード (スコア > 30)
    const highAmbiguityNodes = allNodes.filter(n => (n.ambiguityScore || 0) > 30);

    return {
      totalNodes: allNodes.length,
      leafNodes: leafNodes.length,
      statusCounts,
      avgAmbiguity,
      highAmbiguityNodes: highAmbiguityNodes.length,
    };
  }, [kpiData]);

  // 全体の状態を決定
  const overallStatus = useMemo(() => {
    if (stats.statusCounts.critical > 0) return 'critical';
    if (stats.statusCounts.warning > 0) return 'warning';
    return 'healthy';
  }, [stats]);

  // 曖昧性レベルの状態
  const ambiguityStatus = useMemo(() => {
    if (stats.avgAmbiguity > 40) return 'critical';
    if (stats.avgAmbiguity > 20) return 'warning';
    return 'healthy';
  }, [stats]);

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <StatCard
        icon={<Target size={20} />}
        label="KPI Nodes"
        value={stats.totalNodes}
        subValue={`${stats.leafNodes} leaves`}
        status="neutral"
      />
      <StatCard
        icon={<AlertTriangle size={20} />}
        label="Critical Issues"
        value={stats.statusCounts.critical}
        subValue={`${stats.statusCounts.warning} warnings`}
        status={stats.statusCounts.critical > 0 ? 'critical' : stats.statusCounts.warning > 0 ? 'warning' : 'healthy'}
      />
      <StatCard
        icon={<BarChart3 size={20} />}
        label="Avg Ambiguity"
        value={stats.avgAmbiguity}
        subValue="/ 100"
        status={ambiguityStatus}
      />
      <StatCard
        icon={<TrendingDown size={20} />}
        label="High Risk"
        value={stats.highAmbiguityNodes}
        subValue="nodes > 30"
        status={stats.highAmbiguityNodes > 2 ? 'critical' : stats.highAmbiguityNodes > 0 ? 'warning' : 'healthy'}
      />
    </div>
  );
};

export default SummaryCards;
