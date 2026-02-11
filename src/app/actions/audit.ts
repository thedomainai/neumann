'use server';

/**
 * src/app/actions/audit.ts
 *
 * Server Action for Ambiguity Detection
 * Integrates with Claude API to analyze reports
 */

import Anthropic from '@anthropic-ai/sdk';
import {
  DetectionInput,
  DetectionResult,
  DETECTION_SYSTEM_PROMPT,
  buildDetectionPrompt,
  parseDetectionResponse,
  toAuditItems,
} from '@/domain/audit/detector';
import { buildAuditResult } from '@/domain/audit/scorer';
import { AuditResult } from '@/domain/audit/types';

// Initialize Anthropic client
const anthropic = new Anthropic();

/**
 * Analyze a report for ambiguity patterns
 *
 * @param text - The report text to analyze
 * @param context - Optional context about the report
 * @returns AuditResult with detected issues and score
 */
export async function analyzeReport(
  text: string,
  context?: DetectionInput['context']
): Promise<AuditResult> {
  const reportId = crypto.randomUUID();

  // Handle empty input
  if (!text.trim()) {
    return buildAuditResult(reportId, []);
  }

  try {
    const input: DetectionInput = { text, context };
    const userPrompt = buildDetectionPrompt(input);

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: DETECTION_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    // Extract text content from response
    const textContent = response.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      console.error('No text content in response');
      return buildAuditResult(reportId, []);
    }

    // Parse detection results
    const detectionResults: DetectionResult[] = parseDetectionResponse(
      textContent.text
    );

    // Convert to audit items
    const auditItems = toAuditItems(detectionResults, reportId);

    // Build and return result
    return buildAuditResult(reportId, auditItems);
  } catch (error) {
    console.error('Audit analysis failed:', error);

    // Return failed result
    return {
      reportId,
      items: [],
      score: 0,
      patternCounts: {
        shallow_analysis: 0,
        missing_coverage: 0,
        lack_of_quantification: 0,
        unclear_action: 0,
        fact_interpretation_mixing: 0,
      },
      auditedAt: new Date(),
      status: 'failed',
    };
  }
}

/**
 * Quick validation - check if text has potential issues
 * (Lighter weight check for real-time feedback)
 */
export async function quickValidate(
  text: string
): Promise<{ hasIssues: boolean; issueCount: number }> {
  if (!text.trim() || text.length < 50) {
    return { hasIssues: false, issueCount: 0 };
  }

  const result = await analyzeReport(text);

  return {
    hasIssues: result.items.length > 0,
    issueCount: result.items.length,
  };
}
