/**
 * src/domain/kpi/utils.ts
 *
 * [Domain Layer]
 * KPI Tree ドメイン - ユーティリティ関数
 *
 * KPI ツリーからシステム全体のステータスと曖昧性レベルを算出する。
 */

import type { KPITreeNode, KPIStatus } from './types';

/**
 * システム全体のステータス
 */
export type SystemStatus = 'CRITICAL' | 'DEGRADED' | 'HEALTHY';

/**
 * システム全体の健全性情報
 */
export interface SystemHealth {
  /** システム全体のステータス */
  status: SystemStatus;
  /** 曖昧性レベル（パーセンテージ、0-100） */
  ambiguityLevel: number;
  /** Critical なノードの数 */
  criticalCount: number;
  /** Warning なノードの数 */
  warningCount: number;
  /** Healthy なノードの数 */
  healthyCount: number;
}

/**
 * KPI ツリーからシステム全体の健全性を算出する
 *
 * @param root - KPI ツリーのルートノード
 * @returns システム全体の健全性情報
 *
 * @example
 * ```ts
 * const health = calculateSystemHealth(kpiTreeData);
 * console.log(health.status); // "CRITICAL" | "DEGRADED" | "HEALTHY"
 * console.log(health.ambiguityLevel); // 45
 * ```
 */
export function calculateSystemHealth(root: KPITreeNode): SystemHealth {
  const stats = collectTreeStats(root);

  // システム全体のステータスを決定
  let status: SystemStatus;
  if (stats.criticalCount > 0) {
    status = 'CRITICAL';
  } else if (stats.warningCount > 0) {
    status = 'DEGRADED';
  } else {
    status = 'HEALTHY';
  }

  // 曖昧性レベルを算出（全ノードの平均）
  const ambiguityLevel =
    stats.totalNodes > 0
      ? Math.round(stats.totalAmbiguity / stats.totalNodes)
      : 0;

  return {
    status,
    ambiguityLevel,
    criticalCount: stats.criticalCount,
    warningCount: stats.warningCount,
    healthyCount: stats.healthyCount,
  };
}

/**
 * ツリー統計情報
 */
interface TreeStats {
  criticalCount: number;
  warningCount: number;
  healthyCount: number;
  totalNodes: number;
  totalAmbiguity: number;
}

/**
 * KPI ツリーの統計情報を再帰的に収集する
 */
function collectTreeStats(node: KPITreeNode): TreeStats {
  // 現在のノードの統計
  const stats: TreeStats = {
    criticalCount: node.status === 'critical' ? 1 : 0,
    warningCount: node.status === 'warning' ? 1 : 0,
    healthyCount: node.status === 'healthy' ? 1 : 0,
    totalNodes: 1,
    totalAmbiguity: node.ambiguityScore,
  };

  // 子ノードの統計を再帰的に収集
  if (node.children) {
    for (const child of node.children) {
      const childStats = collectTreeStats(child);
      stats.criticalCount += childStats.criticalCount;
      stats.warningCount += childStats.warningCount;
      stats.healthyCount += childStats.healthyCount;
      stats.totalNodes += childStats.totalNodes;
      stats.totalAmbiguity += childStats.totalAmbiguity;
    }
  }

  return stats;
}

/**
 * システムステータスに対応する色クラスを取得
 */
export function getSystemStatusColor(status: SystemStatus): string {
  switch (status) {
    case 'CRITICAL':
      return 'text-severity-critical-text';
    case 'DEGRADED':
      return 'text-severity-warning-text';
    case 'HEALTHY':
      return 'text-severity-success-text';
  }
}

/**
 * 曖昧性レベルに対応する色クラスを取得
 */
export function getAmbiguityLevelColor(level: number): string {
  if (level >= 50) {
    return 'text-severity-critical-text';
  } else if (level >= 30) {
    return 'text-severity-warning-text';
  } else {
    return 'text-severity-success-text';
  }
}
