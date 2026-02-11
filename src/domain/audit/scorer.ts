/**
 * src/domain/audit/scorer.ts
 *
 * [Domain Layer]
 * Quality Score Calculator
 *
 * Calculates overall quality score based on detected ambiguity patterns.
 * The scoring algorithm penalizes different patterns with different weights.
 */

import {
  AuditItem,
  AuditResult,
  AuditPatternType,
  SeverityLevel,
} from './types';

/**
 * Weight for each severity level
 * Higher weight = more penalty to score
 */
const SEVERITY_WEIGHTS: Record<SeverityLevel, number> = {
  critical: 15,
  warning: 8,
  info: 3,
};

/**
 * Base penalty per pattern type
 * Some patterns are considered more severe than others
 */
const PATTERN_BASE_PENALTY: Record<AuditPatternType, number> = {
  shallow_analysis: 1.2, // Multiplier on top of severity
  missing_coverage: 1.1,
  lack_of_quantification: 1.0,
  unclear_action: 1.0,
  fact_interpretation_mixing: 1.3, // Most severe - mixing opinions with facts
};

/**
 * Maximum penalty cap to prevent score going negative
 */
const MAX_PENALTY = 100;

/**
 * Calculate the quality score based on detected audit items
 *
 * Score starts at 100 and is reduced by penalties for each issue.
 * The final score is clamped between 0 and 100.
 *
 * @param items - Array of detected audit items
 * @returns Quality score from 0 to 100
 */
export function calculateScore(items: AuditItem[]): number {
  if (items.length === 0) {
    return 100;
  }

  // Calculate total penalty
  let totalPenalty = 0;

  for (const item of items) {
    // Only count open items
    if (item.status !== 'open') {
      continue;
    }

    const severityWeight = SEVERITY_WEIGHTS[item.severity];
    const patternMultiplier = PATTERN_BASE_PENALTY[item.pattern];

    totalPenalty += severityWeight * patternMultiplier;
  }

  // Cap the penalty
  totalPenalty = Math.min(totalPenalty, MAX_PENALTY);

  // Calculate final score
  const score = Math.max(0, Math.min(100, 100 - totalPenalty));

  return Math.round(score);
}

/**
 * Count items by pattern type
 */
export function countByPattern(
  items: AuditItem[]
): Record<AuditPatternType, number> {
  const counts: Record<AuditPatternType, number> = {
    shallow_analysis: 0,
    missing_coverage: 0,
    lack_of_quantification: 0,
    unclear_action: 0,
    fact_interpretation_mixing: 0,
  };

  for (const item of items) {
    counts[item.pattern]++;
  }

  return counts;
}

/**
 * Count items by severity level
 */
export function countBySeverity(
  items: AuditItem[]
): Record<SeverityLevel, number> {
  const counts: Record<SeverityLevel, number> = {
    critical: 0,
    warning: 0,
    info: 0,
  };

  for (const item of items) {
    counts[item.severity]++;
  }

  return counts;
}

/**
 * Build a complete AuditResult from items
 */
export function buildAuditResult(
  reportId: string,
  items: AuditItem[]
): AuditResult {
  return {
    reportId,
    items,
    score: calculateScore(items),
    patternCounts: countByPattern(items),
    auditedAt: new Date(),
    status: 'completed',
  };
}

/**
 * Get score status based on thresholds
 */
export function getScoreStatus(
  score: number,
  thresholds = { good: 80, acceptable: 60 }
): 'healthy' | 'warning' | 'critical' {
  if (score >= thresholds.good) {
    return 'healthy';
  }
  if (score >= thresholds.acceptable) {
    return 'warning';
  }
  return 'critical';
}
