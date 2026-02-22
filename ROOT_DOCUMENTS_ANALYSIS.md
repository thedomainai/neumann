# リポジトリ直下ドキュメント分析

**作成日**: 2025-02-22
**対象**: リポジトリ直下の `.md` ファイル

## 現状ファイル一覧

| ファイル名 | 用途 | 現状 | 判断 |
|----------|------|------|------|
| `CLAUDE.md` | Claude Code の動作設定 | 内容が古い | 更新必要 |
| `README.md` | プロジェクト概要 | 内容が古い | 更新必要 |

## 詳細分析

### 1. `CLAUDE.md`

**現在の内容**:
- GitHub Issue駆動の自動ワークフロー定義
- Issue作成 → ブランチ作成 → 実装 → PR作成の自動化

**問題点**:
1. **プロジェクト固有性の欠如**
   - 汎用的な GitHub 自動化ワークフローになっている
   - neumann プロジェクト固有のコーディング規約やアーキテクチャルールが記載されていない
2. **実際の運用と不一致**
   - neumann では GitHub Issue駆動の開発を行っていない
   - タスク管理は `docs/02_product/roadmap.md` と Claude Code の TaskCreate/TaskUpdate で行っている
3. **重複**
   - Git ルールは `~/.claude/rules/git-safety.md` で定義済み
   - Conventional Commits は既にグローバルルールに含まれる

**更新方針**:
- neumann プロジェクト固有の内容に書き換え
- アーキテクチャルール（domain 層の設計原則など）を追加
- GitHub Issue駆動の部分は削除または Optional に変更

### 2. `README.md`

**現在の内容**:
- プロジェクト概要
- Tech Stack
- Getting Started
- Project Structure

**問題点**:
1. **Tech Stack が古い**
   - 記載: NextAuth.js, Zustand
   - 実際: Supabase Auth, 状態管理ライブラリは未使用（React の useState のみ）
   - `docs/02_product/architecture.md` の Tech Stack と不一致
2. **Project Structure が古い**
   - 記載: `src/components/`, `src/services/`, `src/store/`
   - 実際: `src/features/`, `src/domain/`, `src/shared/`, `src/lib/`
   - `docs/02_product/architecture.md` のディレクトリ構成と不一致
3. **v1.0 実装の進捗が反映されていない**
   - オンボーディングフロー、ダッシュボード、エディタビューの実装が完了している
   - User Flows のドキュメントへのリンクがない

**更新方針**:
- Tech Stack を `docs/02_product/architecture.md` と同期
- Project Structure を最新のディレクトリ構成に更新
- v1.0 の実装状況を反映
- 主要ドキュメントへのリンクを充実化

## 更新後のドキュメント構成

### `CLAUDE.md` - neumann プロジェクトメモリ

**新しい構成**:
```markdown
# neumann - Claude Code Project Memory

## Project Overview
(neumann の概要)

## Architecture Principles
(domain 層の設計原則、レイヤー分離ルールなど)

## Coding Conventions
(neumann 固有のコーディング規約)

## Development Workflow
(タスク管理、コミット規約など)

## File Structure
(最新のディレクトリ構成)

## Key Documents
(主要ドキュメントへのリンク)
```

### `README.md` - プロジェクト概要

**新しい構成**:
```markdown
# neumann

## Overview
(簡潔な概要)

## Current Status
(v1.0 実装状況)

## Tech Stack
(architecture.md と同期)

## Getting Started
(セットアップ手順)

## Documentation
(docs/ へのリンク)

## Project Structure
(最新のディレクトリ構成)
```

## 更新優先度

### 高優先度: `README.md`

**理由**:
- 外部公開される可能性がある
- プロジェクトの第一印象を決める
- Tech Stack の不一致が混乱を招く

**対応**:
1. Tech Stack を `architecture.md` から引用
2. Project Structure を最新化
3. v1.0 実装状況を追加
4. ドキュメントリンクを充実化

### 中優先度: `CLAUDE.md`

**理由**:
- Claude Code の内部動作設定
- 外部公開されない
- 現状でも大きな問題はないが、最適化の余地あり

**対応**:
1. neumann 固有のアーキテクチャルールを追加
2. GitHub Issue駆動の部分を削除または Optional 化
3. domain 層の設計原則を明記
4. 最新のディレクトリ構成に更新

## Single Source of Truth の原則

更新後も以下の原則を遵守：

| 情報 | Single Source of Truth | 参照先 |
|------|----------------------|--------|
| アーキテクチャ詳細 | `docs/02_product/architecture.md` | `README.md`, `CLAUDE.md` から参照 |
| Tech Stack | `docs/02_product/architecture.md` | `README.md` で要約 |
| ディレクトリ構成 | `docs/02_product/architecture.md` | `README.md`, `CLAUDE.md` で要約 |
| ユーザーフロー | `docs/02_product/user-flows/` | `README.md` からリンク |
| 機能仕様 | `docs/02_product/features/` | `README.md` からリンク |

## 次のアクション

1. `README.md` を更新（高優先度）
   - Tech Stack を `architecture.md` と同期
   - Project Structure を最新化
   - v1.0 実装状況を追加

2. `CLAUDE.md` を更新（中優先度）
   - neumann 固有のルールに書き換え
   - アーキテクチャ原則を追加
   - GitHub Issue駆動の部分を整理

3. 一貫性チェック
   - `architecture.md` との整合性確認
   - リンク切れチェック
