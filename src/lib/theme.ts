/**
 * src/lib/theme.ts
 * * [Library Layer]
 * neumann Design System - Refined Modern SaaS
 *
 * 設計哲学:
 * - 直感的: ユーザーの次のアクションが明確
 * - インタラクションドリブン: デザインがユーザーを導く
 * - 隠れたゲーミフィケーション: データ可視化で成長を実感
 *
 * カラーコンセプト:
 * - Warm Neutral Gray: 温かみのあるニュートラルな基調（Notion的）
 * - Modern Purple: 現代的でテック感のあるアクセント（Linear的）
 * - High Readability: 経営者向けの視認性重視
 *
 * 参考: Linear, Notion, Figma (2026 Design Trends)
 */

/**
 * 1. Primitive Colors (原子カラーパレット)
 * デザインシステムを構成する基礎的な色階調
 */
const PRIMITIVES = {
  // Warm Neutral Gray (Stone系): 温かみのあるニュートラル
  // Notionの失敗（視認性の低いGray）を避け、適度な温かみを持たせる
  gray: {
    50: '#fafaf9',   // 背景（Tailwind stone-50）
    100: '#f5f5f4',  // カード背景
    200: '#e7e5e4',  // ボーダー
    300: '#d6d3d1',  // 非アクティブ
    400: '#a8a29e',  // プレースホルダー
    500: '#78716c',  // アイコン
    600: '#57534e',  // サブテキスト
    700: '#44403c',  // -
    800: '#292524',  // サブテキスト（濃）
    900: '#1c1917',  // メインテキスト
    950: '#0c0a09',  // 最深テキスト
  },
  // Modern Purple (Violet系): 2026年トレンドのVibrant Purple
  // Linear的なモダンさとテック感を表現
  purple: {
    50: '#faf5ff',   // アクセント背景（極薄）
    100: '#f3e8ff',  // ホバー背景
    200: '#e9d5ff',  // アクセント薄
    300: '#d8b4fe',  // -
    400: '#c084fc',  // -
    500: '#8b5cf6',  // インタラクティブ default（Tailwind violet-500）
    600: '#7c3aed',  // ホバー
    700: '#6d28d9',  // アクティブ
    800: '#5b21b6',  // -
    900: '#4c1d95',  // -
    950: '#2e1065',  // 最深Purple
  },
  // Mono: 純粋な白と黒
  mono: {
    white: '#FFFFFF',
    black: '#000000',
  },
  // Semantic Signal Colors
  red: { 500: '#ef4444', 900: '#7f1d1d' },      // Critical/Error
  amber: { 500: '#f59e0b', 900: '#78350f' },    // Warning
  emerald: { 500: '#10b981', 900: '#064e3b' },  // Success
} as const;

/**
 * 2. Semantic Colors (意味的カラー定義)
 * UIコンポーネントが参照すべき色の役割定義
 * CSS変数を使用してテーマ切り替えに対応
 */
export const colors = {
  // 背景色 - CSS変数で動的に変更
  background: {
    base: 'var(--color-bg-base)',
    layer1: 'var(--color-bg-layer1)',
    layer2: 'var(--color-bg-layer2)',
    layer3: 'var(--color-bg-layer3)',
    elevated: 'var(--color-bg-elevated)',
  },

  // サイドバー専用カラー
  sidebar: {
    bg: 'var(--color-sidebar-bg)',
    text: 'var(--color-sidebar-text)',
    textActive: 'var(--color-sidebar-text-active)',
    hover: 'var(--color-sidebar-hover)',
    active: 'var(--color-sidebar-active)',
    border: 'var(--color-sidebar-border)',
  },

  // テキストカラー - CSS変数で動的に変更
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    muted: 'var(--color-text-muted)',
    inverse: 'var(--color-text-inverse)',
  },

  // アクセント（アクション）- CSS変数で動的に変更
  accent: {
    primary: 'var(--color-primary)',
    hover: 'var(--color-primary-hover)',
    active: 'var(--color-primary)',
    subtle: 'var(--color-primary-light)',
    text: 'var(--color-accent)',
  },

  // ボーダー - CSS変数で動的に変更
  border: {
    default: 'var(--color-border-default)',
    subtle: 'var(--color-border-subtle)',
    active: 'var(--color-border-active)',
  },

  // 状態・信号色 (Severity) - ライトテーマ用
  severity: {
    critical: {
      text: 'var(--color-critical-text)',
      bg: 'var(--color-critical-bg)',
      border: 'var(--color-critical-border)'
    },
    warning: {
      text: 'var(--color-warning-text)',
      bg: 'var(--color-warning-bg)',
      border: 'var(--color-warning-border)'
    },
    info: {
      text: 'var(--color-info-text)',
      bg: 'var(--color-info-bg)',
      border: 'var(--color-info-border)'
    },
    success: {
      text: 'var(--color-success-text)',
      bg: 'var(--color-success-bg)',
      border: 'var(--color-success-border)'
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
 *
 * @param severity - 'critical' | 'warning' | 'info' (SeverityLevel from domain)
 *                   'success' はUI専用（解決済み表示等）
 */
export function getSeverityStyles(severity: 'critical' | 'warning' | 'info' | 'success'): string {
  const map: Record<typeof severity, string> = {
    critical: 'text-severity-critical-text bg-severity-critical-bg border-severity-critical-border',
    warning: 'text-severity-warning-text bg-severity-warning-bg border-severity-warning-border',
    info: 'text-severity-info-text bg-severity-info-bg border-severity-info-border',
    success: 'text-severity-success-text bg-severity-success-bg border-severity-success-border',
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
    sidebar: colors.sidebar,
    foreground: colors.text,
    accent: colors.accent,
    border: colors.border,
    severity: colors.severity,

    // プリミティブも必要に応じて直接使えるようにする
    purple: PRIMITIVES.purple,
    gray: PRIMITIVES.gray,
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