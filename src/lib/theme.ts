/**
 * src/lib/theme.ts
 * * [Library Layer]
 * Midnight Logic - neumann デザインシステム基盤
 *
 * neumannの設計思想「曖昧性の完全排除」を視覚的に表現する
 * ダークテーマベースのデザインシステム。
 *
 * コンセプト:
 * - Electric Indigo: 知性と深淵を表すブランドカラー
 * - True Black: 曖昧さを許さない漆黒の背景
 * - High Contrast: 論理構造を浮き上がらせる
 */

/**
 * 1. Primitive Colors (原子カラーパレット)
 * デザインシステムを構成する基礎的な色階調
 */
const PRIMITIVES = {
  // Electric Indigo: 知性、深淵、AI
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1', // Base
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },
  // Carbon Slate: 無機質、堅牢、構造
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  // Mono: 完全な白と黒
  mono: {
    white: '#FFFFFF',
    black: '#0D0D0D',
  },
  // Signal Colors
  red: { 500: '#ef4444', 900: '#7f1d1d' },    // Critical
  amber: { 500: '#f59e0b', 900: '#78350f' },  // Warning
  emerald: { 500: '#10b981', 900: '#064e3b' },// Success
} as const;

/**
 * 2. Semantic Colors (意味的カラー定義)
 * UIコンポーネントが参照すべき色の役割定義
 */
export const colors = {
  // 背景色
  background: {
    base: PRIMITIVES.mono.black,        // アプリケーション全体の背景（漆黒）
    layer1: PRIMITIVES.slate[950],      // サイドバー、エディタ背景
    layer2: PRIMITIVES.slate[900],      // カード、パネル背景
    layer3: PRIMITIVES.slate[800],      // ホバー状態
    elevated: PRIMITIVES.slate[800],    // モーダル、ドロップダウン
  },

  // テキストカラー
  text: {
    primary: PRIMITIVES.slate[50],      // 本文、見出し
    secondary: PRIMITIVES.slate[400],   // 補足、メタデータ
    muted: PRIMITIVES.slate[600],       // 無効、プレースホルダー
    inverse: PRIMITIVES.mono.black,     // 反転色（ボタンテキスト等）
  },

  // アクセント（アクション）
  accent: {
    primary: PRIMITIVES.indigo[500],
    hover: PRIMITIVES.indigo[400],
    active: PRIMITIVES.indigo[600],
    subtle: PRIMITIVES.indigo[900],     // 背景に敷く薄いアクセント
    text: PRIMITIVES.indigo[300],
  },

  // ボーダー
  border: {
    default: PRIMITIVES.slate[800],     // 区切り線
    subtle: PRIMITIVES.slate[900],
    active: PRIMITIVES.indigo[500],     // フォーカス時
  },

  // 状態・信号色 (Severity)
  severity: {
    critical: {
      text: '#f87171', // Red-400
      bg: '#450a0a',   // Red-950 (Alpha調整用)
      border: '#991b1b' // Red-800
    },
    warning: {
      text: '#fbbf24', // Amber-400
      bg: '#451a03',   // Amber-950
      border: '#92400e' // Amber-800
    },
    info: {
      text: '#60a5fa', // Blue-400
      bg: '#172554',   // Blue-950
      border: '#1e40af' // Blue-800
    },
    success: {
      text: '#34d399', // Emerald-400
      bg: '#022c22',   // Emerald-950
      border: '#065f46' // Emerald-800
    }
  }
} as const;

/**
 * タイポグラフィ
 * コードのような規律を感じさせるフォント選定
 */
export const typography = {
  fontFamily: {
    sans: '"Inter", "Hiragino Sans", "Noto Sans JP", sans-serif',
    mono: '"JetBrains Mono", "Source Code Pro", monospace', // 重要: 監査ログやエディタで使用
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
  },
  fontWeight: {
    light: '300',      // 見出し用（洗練された印象）
    normal: '400',
    medium: '500',
    bold: '700',
  },
} as const;

/**
 * スペーシング
 */
export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  6: '1.5rem',
  8: '2rem',
  12: '3rem',
  16: '4rem',
} as const;

/**
 * ユーティリティ関数: 重要度に応じたTailwindクラス名を返す
 * (動的なスタイル適用に使用)
 */
export function getSeverityStyles(severity: 'critical' | 'warning' | 'info' | 'success') {
  const map = {
    critical: 'text-red-400 bg-red-950/30 border-red-900/50',
    warning: 'text-amber-400 bg-amber-950/30 border-amber-900/50',
    info: 'text-blue-400 bg-blue-950/30 border-blue-900/50',
    success: 'text-emerald-400 bg-emerald-950/30 border-emerald-900/50',
  };
  return map[severity];
}

/**
 * ユーティリティ関数: スコアに応じた色コードを返す
 * (Progress Bar等の描画用)
 */
export function getScoreColor(score: number): string {
  if (score >= 80) return PRIMITIVES.emerald[500];
  if (score >= 60) return PRIMITIVES.amber[500];
  return PRIMITIVES.red[500];
}

/**
 * Tailwind CSS Config Extension
 * tailwind.config.ts に展開して使用
 */
export const tailwindThemeExtend = {
  colors: {
    // セマンティックカラーを展開
    background: colors.background,
    foreground: colors.text,
    accent: colors.accent,
    border: colors.border,
    
    // プリミティブも必要に応じて直接使えるようにする
    indigo: PRIMITIVES.indigo,
    slate: PRIMITIVES.slate,
  },
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSize,
  fontWeight: typography.fontWeight,
  spacing,
  // アニメーション定義 (Midnight Logic特有の「整う」動き)
  animation: {
    'fade-in': 'fadeIn 0.2s ease-out forwards',
    'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    'shimmer': 'shimmer 2s infinite',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0', transform: 'translateY(5px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    shimmer: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' },
    }
  }
} as const;