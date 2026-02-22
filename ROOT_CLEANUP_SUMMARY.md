# リポジトリ直下ドキュメント整理サマリ

**実施日**: 2025-02-22
**対象**: リポジトリ直下の `.md` ファイル

## 整理結果

### ✅ 更新完了

| ファイル名 | 対応 | 変更内容 |
|----------|------|---------|
| `README.md` | 更新完了 | Tech Stack、Project Structure を最新化。v1.0 実装状況を反映 |

### ⏸️ 保留（変更不要）

| ファイル名 | 判断 | 理由 |
|----------|------|------|
| `CLAUDE.md` | 現状維持 | codex により変更がブロック。Claude Code の重要な設定ファイルのため現状のまま保持 |

## 更新内容の詳細

### `README.md` の更新

**更新前の問題点**:
1. Tech Stack が古い（NextAuth.js, Zustand → 実際は Supabase Auth, 状態管理なし）
2. Project Structure が古い（`src/components/`, `src/services/` → 実際は `src/features/`, `src/domain/`）
3. v1.0 実装の進捗が反映されていない

**更新内容**:
1. ✅ **Tech Stack を最新化**
   - `docs/02_product/architecture.md` の Tech Stack と同期
   - Vercel, Next.js 15, Supabase, Drizzle, Tailwind + shadcn/ui など

2. ✅ **Project Structure を最新化**
   - Feature-based structure に更新（`features/`, `domain/`, `shared/`）
   - `docs/02_product/architecture.md` のディレクトリ構成と同期

3. ✅ **v1.0 実装状況を追加**
   - Current Status セクションを追加
   - 実装完了、実装中、v1.1 延期の機能を明記

4. ✅ **ドキュメントリンクを充実化**
   - Core Documents セクションを追加
   - 各ドキュメントの説明と参照先を明記

5. ✅ **Architecture Highlights を追加**
   - Domain Layer 設計原則の要約
   - Features Layer パターンの要約

6. ✅ **Development セクションを拡充**
   - Commands 一覧
   - Environment Variables
   - First-Time Experience（オンボーディング体験）

### `CLAUDE.md` について

**判断**: 現状のまま保持

**理由**:
- codex（Claude Code の設定レビューツール）が変更をブロック
- CLAUDE.md は Claude Code の動作を制御する重要な設定ファイル
- 既存の GitHub Issue 駆動ワークフロー定義は汎用的だが、動作に支障はない
- neumann 固有のアーキテクチャルールは `docs/02_product/architecture.md` で十分カバーされている

**代替案**:
- neumann 固有のルールは `README.md` の "Architecture Highlights" セクションで要約
- 詳細は `docs/02_product/architecture.md` を参照
- 実装時に Claude Code は `docs/02_product/architecture.md` を読むことができる

## Single Source of Truth の確保

更新後も以下の原則を遵守：

| 情報 | Single Source of Truth | 参照元 |
|------|----------------------|--------|
| アーキテクチャ詳細 | `docs/02_product/architecture.md` | `README.md` で要約・リンク |
| Tech Stack | `docs/02_product/architecture.md` | `README.md` で転記（表形式） |
| ディレクトリ構成 | `docs/02_product/architecture.md` | `README.md` で要約 |
| ユーザーフロー | `docs/02_product/user-flows/` | `README.md` からリンク |
| 機能仕様 | `docs/02_product/features/` | `README.md` からリンク |

## 整理後のファイル構成

```
neumann/
├── README.md                           # ★ 更新完了（プロジェクト概要）
├── CLAUDE.md                          # 現状維持（Claude Code 設定）
├── ROOT_DOCUMENTS_ANALYSIS.md         # 分析レポート（このサマリの詳細版）
├── ROOT_CLEANUP_SUMMARY.md            # このファイル
│
├── docs/                              # ドキュメント
│   └── 02_product/
│       ├── architecture.md            # ★ アーキテクチャの詳細
│       ├── roadmap.md                 # ★ ロードマップ
│       ├── features/                  # 機能仕様
│       └── user-flows/                # ユーザーフロー
│
└── src/                               # ソースコード
```

## README.md の新しい構成

```markdown
# neumann

## Overview
- プロジェクトの簡潔な説明
- 設計思想（3つの原則）

## Current Status (v1.0 MVP)
- 実装完了機能
- 実装中機能
- v1.1 延期機能

## Tech Stack
- architecture.md から転記した表

## Getting Started
- セットアップ手順
- 初回体験の説明

## Documentation
- Core Documents リスト
- Key Documents テーブル

## Project Structure
- 最新のディレクトリ構成

## Architecture Highlights
- Domain Layer 設計原則の要約
- Features Layer パターンの要約

## Development
- Commands
- Environment Variables

## Contributing
- ガイドラインへのリンク
```

## 更新の効果

1. **新規参加者の理解促進**
   - 最新の Tech Stack と Project Structure が一目で分かる
   - v1.0 の実装状況が明確

2. **ドキュメント検索性の向上**
   - Core Documents と Key Documents で主要ドキュメントにすぐアクセス可能
   - 用途別にドキュメントを整理

3. **Single Source of Truth の維持**
   - README.md は概要とリンク
   - 詳細は `docs/` ディレクトリで管理

4. **開発体験の向上**
   - Getting Started で初回セットアップが明確
   - Development セクションでコマンドが一覧可能

## 今後のメンテナンス方針

### README.md

**更新タイミング**:
- Tech Stack 変更時（`docs/02_product/architecture.md` の変更に追従）
- 主要機能の実装完了時（Current Status を更新）
- ディレクトリ構成の大幅変更時

**更新方法**:
1. `docs/02_product/architecture.md` を更新
2. README.md の該当セクションを同期

### CLAUDE.md

**更新タイミング**:
- Claude Code の動作ルールを変更したい場合のみ
- 基本的には現状維持

**代替手段**:
- neumann 固有のルールは `docs/02_product/architecture.md` で管理
- README.md で要約して可視化

## 関連ドキュメント

- [docs/02_product ドキュメント整理サマリ](./docs/02_product/CLEANUP_SUMMARY.md)
- [リポジトリ直下ドキュメント分析](./ROOT_DOCUMENTS_ANALYSIS.md)
- [Architecture Documentation](./docs/02_product/architecture.md)

---

**実施者**: AI Agent
**承認**: README.md 更新完了、CLAUDE.md は現状維持（codex 判断）
