/**
 * src/features/editor/hooks/useScoreHistory.ts
 *
 * [Feature Hook]
 * useScoreHistory - スコア履歴管理Hook
 *
 * レポート品質スコアの推移を localStorage で管理し、
 * 前回比表示のためのデータを提供する。
 */

import { useEffect, useState, useCallback } from 'react';

export interface ScoreHistoryEntry {
  date: string; // ISO 8601 date string (YYYY-MM-DD)
  score: number;
  timestamp: number; // Unix timestamp (for sorting)
}

export interface UseScoreHistoryReturn {
  previousScore: number | null;
  scoreDiff: number | null;
  history: ScoreHistoryEntry[];
  recordScore: (score: number) => void;
}

const STORAGE_KEY = 'neumann_score_history';
const MAX_HISTORY_SIZE = 52; // 1年分（週次）

/**
 * スコア履歴を管理するHook
 *
 * @param currentScore - 現在のスコア
 * @returns スコア履歴データと記録関数
 *
 * @example
 * ```tsx
 * const { previousScore, scoreDiff, recordScore } = useScoreHistory(85);
 * // previousScore: 70, scoreDiff: +15
 * ```
 */
export function useScoreHistory(currentScore: number): UseScoreHistoryReturn {
  const [history, setHistory] = useState<ScoreHistoryEntry[]>([]);

  // localStorage から履歴を読み込み
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ScoreHistoryEntry[];
        setHistory(parsed);
      }
    } catch (error) {
      console.error('Failed to load score history:', error);
    }
  }, []);

  // 前回のスコアと差分を計算
  const previousScore = history.length > 0 ? history[history.length - 1].score : null;
  const scoreDiff = previousScore !== null ? currentScore - previousScore : null;

  /**
   * 新しいスコアを履歴に記録
   */
  const recordScore = useCallback((score: number) => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const timestamp = Date.now();

    setHistory((prev) => {
      // 今日の記録が既にある場合は更新、なければ追加
      const existingIndex = prev.findIndex((entry) => entry.date === today);
      let newHistory: ScoreHistoryEntry[];

      if (existingIndex >= 0) {
        // 既存の記録を更新
        newHistory = [
          ...prev.slice(0, existingIndex),
          { date: today, score, timestamp },
          ...prev.slice(existingIndex + 1),
        ];
      } else {
        // 新規追加
        newHistory = [...prev, { date: today, score, timestamp }];
      }

      // 最大サイズを超えた場合は古いものから削除
      if (newHistory.length > MAX_HISTORY_SIZE) {
        newHistory = newHistory.slice(newHistory.length - MAX_HISTORY_SIZE);
      }

      // localStorage に保存
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error('Failed to save score history:', error);
      }

      return newHistory;
    });
  }, []);

  return {
    previousScore,
    scoreDiff,
    history,
    recordScore,
  };
}
