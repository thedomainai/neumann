/**
 * src/domain/audit/detector.ts
 *
 * [Domain Layer]
 * Ambiguity Detection Engine
 *
 * This module contains the core logic for detecting ambiguity patterns
 * in weekly meeting reports. It is UI-independent and designed to be
 * portable to Python in the future.
 */

import {
  AuditItem,
  AuditPatternType,
  AuditLocation,
  PATTERN_SEVERITY_MAP,
} from './types';

/**
 * Raw detection result from LLM analysis
 */
export interface DetectionResult {
  pattern: AuditPatternType;
  message: string;
  rationale: string;
  suggestion: string;
  startIndex: number;
  endIndex: number;
  matchedText: string;
}

/**
 * Input for the ambiguity detection
 */
export interface DetectionInput {
  /** The report text to analyze */
  text: string;
  /** Optional context about the report */
  context?: {
    kpiName?: string;
    reporterRole?: string;
    reportPeriod?: string;
  };
}

/**
 * System prompt for Claude to detect ambiguity patterns
 */
export const DETECTION_SYSTEM_PROMPT = `You are an expert at detecting ambiguity in weekly meeting reports. Your role is to identify specific patterns of unclear thinking that prevent CEOs from making informed decisions.

## Your Task
Analyze the given report text and identify ALL instances of the following 5 ambiguity patterns:

### Pattern Definitions

1. **shallow_analysis** (浅い分析)
   - Definition: Issues not decomposed to atomic level
   - Example: Reporting "sales missed target" without breaking down WHY (pricing? volume? segment?)
   - Severity: CRITICAL

2. **missing_coverage** (カバレッジ不足)
   - Definition: MECE principle violated - incomplete coverage of topics
   - Example: Reporting on 2 of 3 initiatives without mentioning the third
   - Severity: CRITICAL

3. **lack_of_quantification** (定量化不足)
   - Definition: Missing numbers, using vague qualitative language
   - Example: "Improving", "going well", "some progress" without specific metrics
   - Severity: WARNING

4. **unclear_action** (アクション不明確)
   - Definition: Actions without clear Who/What/When
   - Example: "Will address this issue" without specifying owner, action, or deadline
   - Severity: WARNING

5. **fact_interpretation_mixing** (事実と解釈の混同)
   - Definition: Subjective opinions presented as facts
   - Example: "Client was positive about the proposal" without objective evidence
   - Severity: CRITICAL

## Output Format
Respond with a JSON array of detected issues. Each issue must have:
- pattern: One of the 5 pattern types
- message: Brief summary of the problem (in Japanese)
- rationale: Why this is problematic (in Japanese)
- suggestion: A clarifying question to resolve the ambiguity (in Japanese)
- startIndex: Character index where the issue starts
- endIndex: Character index where the issue ends
- matchedText: The exact text that triggered this detection

If no issues are found, return an empty array: []

## Important Rules
- Be thorough but precise - only flag genuine ambiguities
- Focus on actionable issues that would prevent CEO decision-making
- Provide specific, helpful suggestions as clarifying questions
- Match the exact text positions in the input`;

/**
 * User prompt template for detection
 */
export function buildDetectionPrompt(input: DetectionInput): string {
  let prompt = `## Report Text to Analyze\n\`\`\`\n${input.text}\n\`\`\`\n`;

  if (input.context) {
    prompt += '\n## Context\n';
    if (input.context.kpiName) {
      prompt += `- KPI: ${input.context.kpiName}\n`;
    }
    if (input.context.reporterRole) {
      prompt += `- Reporter Role: ${input.context.reporterRole}\n`;
    }
    if (input.context.reportPeriod) {
      prompt += `- Period: ${input.context.reportPeriod}\n`;
    }
  }

  prompt += '\n## Instructions\nAnalyze the report and return detected ambiguity patterns as JSON.';

  return prompt;
}

/**
 * Parse LLM response into DetectionResult array
 */
export function parseDetectionResponse(response: string): DetectionResult[] {
  // Extract JSON from response (handle markdown code blocks)
  let jsonStr = response;
  const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  try {
    const parsed = JSON.parse(jsonStr);
    if (!Array.isArray(parsed)) {
      return [];
    }

    // Validate and normalize each result
    return parsed
      .filter((item): item is DetectionResult => {
        return (
          typeof item === 'object' &&
          item !== null &&
          typeof item.pattern === 'string' &&
          typeof item.message === 'string' &&
          typeof item.rationale === 'string' &&
          typeof item.suggestion === 'string' &&
          typeof item.startIndex === 'number' &&
          typeof item.endIndex === 'number' &&
          typeof item.matchedText === 'string'
        );
      })
      .map((item) => ({
        pattern: item.pattern as AuditPatternType,
        message: item.message,
        rationale: item.rationale,
        suggestion: item.suggestion,
        startIndex: item.startIndex,
        endIndex: item.endIndex,
        matchedText: item.matchedText,
      }));
  } catch {
    console.error('Failed to parse detection response:', response);
    return [];
  }
}

/**
 * Convert DetectionResult to AuditItem
 */
export function toAuditItem(
  result: DetectionResult,
  reportId: string
): AuditItem {
  const location: AuditLocation = {
    range: {
      start: result.startIndex,
      end: result.endIndex,
      text: result.matchedText,
    },
  };

  return {
    id: crypto.randomUUID(),
    pattern: result.pattern,
    severity: PATTERN_SEVERITY_MAP[result.pattern],
    message: result.message,
    rationale: result.rationale,
    suggestion: result.suggestion,
    location,
    status: 'open',
    detectedAt: new Date(),
  };
}

/**
 * Convert multiple DetectionResults to AuditItems
 */
export function toAuditItems(
  results: DetectionResult[],
  reportId: string
): AuditItem[] {
  return results.map((result) => toAuditItem(result, reportId));
}
