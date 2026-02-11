/**
 * Audit Domain - Public Exports
 */

// Types
export type {
  AuditPatternType,
  SeverityLevel,
  AuditItemStatus,
  TextRange,
  AuditLocation,
  AuditItem,
  AuditResult,
  ScoreThresholds,
} from './types';

export {
  DEFAULT_SCORE_THRESHOLDS,
  PATTERN_SEVERITY_MAP,
  PATTERN_LABELS,
} from './types';

// Detector
export type { DetectionInput, DetectionResult } from './detector';
export {
  DETECTION_SYSTEM_PROMPT,
  buildDetectionPrompt,
  parseDetectionResponse,
  toAuditItem,
  toAuditItems,
} from './detector';

// Scorer
export {
  calculateScore,
  countByPattern,
  countBySeverity,
  buildAuditResult,
  getScoreStatus,
} from './scorer';
