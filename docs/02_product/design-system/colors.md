# Color System

neumannのカラーシステム。Design Tokensとして定義。

## Design Philosophy

- **直感的**: ユーザーの次のアクションが明確
- **インタラクションドリブン**: デザインがユーザーを導く
- **隠れたゲーミフィケーション**: データ可視化で成長を実感

カラーコンセプト:
- **Warm Neutral Gray** (Stone系): 温かみのあるニュートラルな基調（Notion的）
- **Modern Purple** (Violet系): 現代的でテック感のあるアクセント（Linear的）
- **High Readability**: 経営者向けの視認性重視

参考: Linear, Notion, Figma (2026 Design Trends)

## Color Palette

### Primary Colors (Modern Purple)

| Token | Name | Hex | RGB | 用途 |
|-------|------|-----|-----|------|
| `--color-purple-950` | Deep Purple | `#2e1065` | 46, 16, 101 | 最深Purple |
| `--color-purple-900` | Purple 900 | `#4c1d95` | 76, 29, 149 | - |
| `--color-purple-800` | Purple 800 | `#5b21b6` | 91, 33, 182 | - |
| `--color-purple-700` | Purple 700 | `#6d28d9` | 109, 40, 217 | アクティブ |
| `--color-purple-600` | Purple 600 | `#7c3aed` | 124, 58, 237 | ホバー |
| `--color-purple-500` | Purple 500 | `#8b5cf6` | 139, 92, 246 | **ブランドカラー** |
| `--color-purple-400` | Purple 400 | `#c084fc` | 192, 132, 252 | - |
| `--color-purple-300` | Purple 300 | `#d8b4fe` | 216, 180, 254 | アクセント薄 |
| `--color-purple-200` | Purple 200 | `#e9d5ff` | 233, 213, 255 | アクセント薄 |
| `--color-purple-100` | Purple 100 | `#f3e8ff` | 243, 232, 255 | ホバー背景 |
| `--color-purple-50` | Purple 50 | `#faf5ff` | 250, 245, 255 | アクセント背景（極薄） |

### Neutral Colors (Warm Gray)

| Token | Name | Hex | RGB | 用途 |
|-------|------|-----|-----|------|
| `--color-gray-950` | Black Gray | `#0c0a09` | 12, 10, 9 | 最深テキスト |
| `--color-gray-900` | Gray 900 | `#1c1917` | 28, 25, 23 | **本文テキスト** |
| `--color-gray-800` | Gray 800 | `#292524` | 41, 37, 36 | サブテキスト（濃） |
| `--color-gray-700` | Gray 700 | `#44403c` | 68, 64, 60 | - |
| `--color-gray-600` | Gray 600 | `#57534e` | 87, 83, 78 | サブテキスト |
| `--color-gray-500` | Gray 500 | `#78716c` | 120, 113, 108 | アイコン |
| `--color-gray-400` | Gray 400 | `#a8a29e` | 168, 162, 158 | プレースホルダー |
| `--color-gray-300` | Gray 300 | `#d6d3d1` | 214, 211, 209 | 非アクティブ |
| `--color-gray-200` | Gray 200 | `#e7e5e4` | 231, 229, 228 | ボーダー |
| `--color-gray-100` | Gray 100 | `#f5f5f4` | 245, 245, 244 | カード背景 |
| `--color-gray-50` | Gray 50 | `#fafaf9` | 250, 250, 249 | **サーフェス背景** |
| `--color-white` | White | `#FFFFFF` | 255, 255, 255 | **メイン背景** |

### Semantic Colors

| Token | Name | Hex | 用途 |
|-------|------|-----|------|
| `--color-emerald-900` | Emerald Dark | `#064e3b` | - |
| `--color-emerald-500` | Emerald | `#10b981` | 成功、改善 |
| `--color-amber-900` | Amber Dark | `#78350f` | - |
| `--color-amber-500` | Amber | `#f59e0b` | 警告、注意 |
| `--color-red-900` | Red Dark | `#7f1d1d` | - |
| `--color-red-500` | Red | `#ef4444` | エラー、危険 |

### Data Visualization Colors

| Token | Hex | 用途 |
|-------|-----|------|
| `--color-chart-1` | `#8b5cf6` | プライマリデータ（Purple） |
| `--color-chart-2` | `#3b82f6` | セカンダリデータ（Blue） |
| `--color-chart-3` | `#10b981` | ポジティブ（Emerald） |
| `--color-chart-4` | `#f59e0b` | 中間（Amber） |
| `--color-chart-5` | `#ef4444` | ネガティブ（Red） |
| `--color-chart-6` | `#ec4899` | 補助1（Pink） |
| `--color-chart-7` | `#f97316` | 補助2（Orange） |

## Semantic Token Mapping

### Background

```css
--bg-primary:     var(--color-white);        /* メイン背景 */
--bg-secondary:   var(--color-gray-50);      /* カード、サーフェス */
--bg-tertiary:    var(--color-gray-100);     /* ホバー、選択 */
--bg-inverse:     var(--color-gray-900);     /* フッター、反転 */
```

### Text

```css
--text-primary:   var(--color-gray-900);     /* 本文 */
--text-secondary: var(--color-gray-600);     /* 副次 */
--text-tertiary:  var(--color-gray-400);     /* 補足 */
--text-disabled:  var(--color-gray-300);     /* 非活性 */
--text-inverse:   var(--color-white);        /* 暗い背景上 */
--text-link:      var(--color-purple-500);   /* リンク */
```

### Border

```css
--border-default: var(--color-gray-200);     /* 通常ボーダー */
--border-strong:  var(--color-gray-300);     /* 強調ボーダー */
--border-focus:   var(--color-purple-500);   /* フォーカス */
```

## Usage Guidelines

### 背景色の使い分け

```
┌─────────────────────────────────────────────┐
│ Sidebar (--bg-secondary: Gray-50)           │
├─────────────────────────────────────────────┤
│                                             │
│  ┌───────────────┐  ┌───────────────┐      │
│  │ Card          │  │ Card          │      │
│  │ (White)       │  │ (White)       │      │
│  └───────────────┘  └───────────────┘      │
│                                             │
│  Main Content Area (--bg-secondary: Gray-50)│
│                                             │
└─────────────────────────────────────────────┘
```

### ステータス色の使用

| 状態 | 前景色 | 背景色 | 使用場面 |
|------|--------|--------|----------|
| Success | `--color-emerald-500` | `rgba(16, 185, 129, 0.1)` | 保存完了、品質スコア高 |
| Warning | `--color-amber-500` | `rgba(245, 158, 11, 0.1)` | 要注意、中程度の問題 |
| Error | `--color-red-500` | `rgba(239, 68, 68, 0.1)` | エラー、重大な問題 |
| Info | `--color-purple-500` | `rgba(139, 92, 246, 0.1)` | 情報、ヒント |

### 品質スコアの色分け

```
80-100: Emerald (#10b981)  Excellent
60-79:  Amber   (#f59e0b)  Good
0-59:   Red     (#ef4444)  Needs Improvement
```

## Contrast Ratios (WCAG 2.1)

| 組み合わせ | コントラスト比 | レベル |
|-----------|---------------|--------|
| Gray 900 on White | 16.1:1 | AAA |
| Gray 600 on White | 7.2:1 | AAA |
| Gray 400 on White | 3.9:1 | AA (Large) |
| Purple 500 on White | 4.6:1 | AA |
| Emerald 500 on White | 3.4:1 | AA (Large) |
| Red 500 on White | 4.5:1 | AA |

## CSS Variables (Tailwind Config)

```typescript
// tailwind.config.ts
const colors = {
  purple: {
    950: '#2e1065',
    900: '#4c1d95',
    800: '#5b21b6',
    700: '#6d28d9',
    600: '#7c3aed',
    500: '#8b5cf6',
    400: '#c084fc',
    300: '#d8b4fe',
    200: '#e9d5ff',
    100: '#f3e8ff',
    50: '#faf5ff',
  },
  gray: {
    950: '#0c0a09',
    900: '#1c1917',
    800: '#292524',
    700: '#44403c',
    600: '#57534e',
    500: '#78716c',
    400: '#a8a29e',
    300: '#d6d3d1',
    200: '#e7e5e4',
    100: '#f5f5f4',
    50: '#fafaf9',
  },
  emerald: {
    900: '#064e3b',
    500: '#10b981',
  },
  amber: {
    900: '#78350f',
    500: '#f59e0b',
  },
  red: {
    900: '#7f1d1d',
    500: '#ef4444',
  },
};
```

## Dark Mode (Future)

現時点ではLight Mode のみサポート。
Dark Mode対応時は以下のマッピングを使用：

| Light | Dark |
|-------|------|
| `--bg-primary` (white) | gray-900 |
| `--bg-secondary` (gray-50) | gray-800 |
| `--text-primary` (gray-900) | gray-100 |
| `--border-default` (gray-200) | gray-700 |

**ステータス**: ✅ 更新完了（Refined Modern SaaS）
**最終更新**: 2026-02-23
