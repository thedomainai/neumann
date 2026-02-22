# neumann

経営の曖昧さを排除する、あなたの Digital COO

## Overview

neumann は、週次レポートや定例資料から曖昧性を自動検出し、マネージャーに具体化を促すことで、経営陣への報告品質を向上させる AI アシスタントです。

**設計思想**:
- **Observability**: 確認しなくても大丈夫と分かる
- **Zero Latency**: 聞く前にファクトが揃っている
- **Trusted Bad Cop**: AI が自動で曖昧さを指摘（CEO は判断のみ）

## Current Status (v1.0 MVP)

**実装完了** (2025-02-22):
- ✅ オンボーディングフロー（ウェルカム画面、サンプル体験、次ステップ案内）
- ✅ ダッシュボード（動的ステータス表示、KPI Logic Tree、Critical Anomalies）
- ✅ エディタビュー（レポート表示、警告行ハイライト、Ambiguity スコア）
- ✅ Audit Panel（曖昧性指摘表示、解決済み/却下アクション、フィルタリング）

**実装中**:
- 🟡 曖昧性検出エンジン（バックエンド統合）
- 🟡 認証（Google SSO）
- 🟡 データベース統合（Supabase）

**v1.1 以降に延期**:
- データエントリー画面
- 設定画面（KPI定義管理、オーナー管理）
- レポートインポート（Google Docs/Slides/Notion）

詳細: [User Flow Gap Analysis](./docs/02_product/user-flows/gap-analysis.md)

## Tech Stack

| Category | Technology | Notes |
|----------|------------|-------|
| **Hosting** | Vercel | Edge Functions, Preview Deployments |
| **Framework** | Next.js 15 (App Router) | RSC, Server Actions, Turbopack |
| **AI** | Vercel AI SDK v5 | `@ai-sdk/anthropic`, Claude Sonnet 4 |
| **Database** | Supabase PostgreSQL | Managed, RLS support |
| **ORM** | Drizzle | Type-safe, migrations |
| **Auth** | Supabase Auth | Google OAuth, RLS integration |
| **Styling** | Tailwind CSS + shadcn/ui | Design system, accessibility |
| **Validation** | Zod | Schema sharing (API ↔ Client) |
| **Testing** | Vitest + Playwright | Unit + E2E |
| **CI/CD** | GitHub Actions | lint, test, deploy |
| **Monitoring** | Sentry + Vercel Analytics | Error tracking, performance |

詳細: [Architecture Documentation](./docs/02_product/architecture.md)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd neumann

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev

# Open http://localhost:3000
```

### First-Time Experience

初回アクセス時は自動的にオンボーディングフローが表示されます：
1. ウェルカム画面で価値提案を確認
2. サンプルデータでダッシュボード体験
3. 曖昧性指摘を「解決済み」にして Quick Win 達成

再度オンボーディングを体験する場合は、localStorage をクリア：
```javascript
localStorage.removeItem('neumann_onboarding_completed')
```

## Documentation

詳細なドキュメントは [`docs/`](./docs/) を参照してください：

### Core Documents

- **[Vision](./docs/00_vision/)** - プロジェクトビジョン、設計原則
- **[Concept](./docs/01_concept/)** - ペルソナ、課題定義、ソリューション仮説
- **[Product](./docs/02_product/)** - プロダクト仕様、アーキテクチャ、ユーザーフロー
  - [Architecture](./docs/02_product/architecture.md) - システムアーキテクチャ詳細
  - [User Flows](./docs/02_product/user-flows/) - v1.0 ユーザーフロー定義
  - [Features](./docs/02_product/features/) - 機能仕様、ユーザーストーリー
  - [Design System](./docs/02_product/design-system/) - デザインシステム
- **[Validation](./docs/03_validation/)** - 仮説検証、PoC
- **[Business](./docs/04_business/)** - ビジネスモデル、市場分析
- **[Decisions](./docs/05_decisions/)** - 意思決定記録（DEC-001〜）

### Key Documents

| Document | Description |
|----------|-------------|
| [Architecture](./docs/02_product/architecture.md) | Tech Stack、ディレクトリ構成、レイヤー設計、DB スキーマ |
| [Roadmap](./docs/02_product/roadmap.md) | Phase 別のマイルストーン、成功指標 |
| [User Flows](./docs/02_product/user-flows/) | CEO Daily Flow, Manager Response Flow, Onboarding Flow |
| [Features](./docs/02_product/features/FEATURES.md) | 機能一覧、詳細仕様、ステータス |
| [Design Principles](./docs/00_vision/principles.md) | 5つの設計原則、トレードオフ |

## Project Structure

```
neumann/
├── docs/                       # ドキュメント（★詳細はこちら）
│   ├── 00_vision/             # Vision, Mission, Principles
│   ├── 01_concept/            # Personas, Problem, Solution
│   ├── 02_product/            # Architecture, Features, User Flows
│   ├── 03_validation/         # Experiments, PoC
│   ├── 04_business/           # Business Model, Market Analysis
│   └── 05_decisions/          # Decision Log (DEC-001~)
│
├── src/                       # ソースコード
│   ├── app/                   # Next.js App Router
│   │   ├── onboarding/        # オンボーディングページ
│   │   └── page.tsx           # ダッシュボード（メインページ）
│   │
│   ├── features/              # 機能ドメイン（★Feature-based）
│   │   ├── dashboard/         # ダッシュボード
│   │   ├── editor/            # エディタビュー
│   │   ├── onboarding/        # オンボーディング
│   │   └── settings/          # 設定（v1.1）
│   │
│   ├── domain/                # ビジネスロジック（★CORE）
│   │   ├── audit/             # 曖昧性検出エンジン
│   │   ├── intervention/      # 自律介入
│   │   └── kpi/               # KPI Tree モデル
│   │
│   ├── shared/                # 共有リソース
│   │   └── components/        # UI コンポーネント
│   │
│   ├── lib/                   # ユーティリティ・設定
│   │   ├── ai/                # AI SDK 設定、プロンプト
│   │   ├── supabase/          # Supabase クライアント
│   │   └── db/                # Drizzle ORM
│   │
│   ├── schemas/               # Zod スキーマ
│   └── types/                 # 型定義
│
├── .claude/                   # Claude Code 設定
│   ├── rules/                 # コーディングルール
│   └── settings.json          # Hooks 設定
│
├── CLAUDE.md                  # Claude Code プロジェクトメモリ
└── README.md                  # このファイル
```

詳細: [Architecture Documentation](./docs/02_product/architecture.md)

## Architecture Highlights

### Domain Layer 設計原則

`domain/` 層は neumann のビジネスコアであり、**将来的な移植性を確保**するため以下を遵守：

1. **React/Next.js に依存しない**
   - hooks, useState, useEffect 等を使わない
   - 純粋関数として実装

2. **外部サービスに直接依存しない**
   - LLM API の呼び出しは `lib/ai/` 経由で抽象化

3. **入出力が明確**
   - 引数と返り値の型を明示
   - 副作用を持たない

詳細: [Architecture - Domain Layer](./docs/02_product/architecture.md#レイヤー設計原則)

### Features Layer パターン

各 feature は以下の構造を持つ：

```
features/[feature-name]/
├── components/          # UI コンポーネント
│   ├── [ComponentName].tsx
│   └── index.ts
├── actions.ts          # Server Actions (mutations)
└── index.ts            # Public exports
```

詳細: [Architecture - Features Layer](./docs/02_product/architecture.md#features-層の設計ルール)

## Development

### Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run linter (Biome)
npm run format           # Format code (Biome)
npm run type-check       # TypeScript type checking

# Testing
npm run test             # Run unit tests (Vitest)
npm run test:e2e         # Run E2E tests (Playwright)
npm run test:watch       # Watch mode

# Database
npm run db:push          # Push schema changes
npm run db:studio        # Open Drizzle Studio
npm run db:migrate       # Run migrations
```

### Environment Variables

必要な環境変数は `.env.example` を参照してください。

主要な環境変数：
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anon Key
- `ANTHROPIC_API_KEY`: Claude API Key
- `NEXT_PUBLIC_ENABLE_LINTER_BUTTON`: RUN_LINTER ボタンの表示制御（開発用）

## Contributing

詳細な開発ガイドラインは以下を参照：

- [Coding Standards](./.claude/rules/coding-standards.md)
- [Git Workflow](./.claude/rules/git-workflow.md)
- [Architecture Guide](./docs/02_product/architecture.md)

## License

Private - All Rights Reserved

---

**Project Status**: 🟡 Phase 2 (v1.0 MVP 実装中)
**Last Updated**: 2025-02-22
**Documentation**: [docs/](./docs/)
