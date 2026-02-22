# ドキュメント整理分析

**作成日**: 2025-02-22
**目的**: `/docs/02_product` 配下のドキュメント重複・不要ファイルの洗い出し

## エグゼクティブサマリ

- **削除推奨**: 2ファイル（`architecture-checklist.md`, `human-required-docs.md`）
- **統合推奨**: 0ファイル
- **保持**: 2ファイル（`architecture.md`, `roadmap.md`）
- **理由**: 実装フェーズに入り、Human承認待ちのチェックリスト系ドキュメントが陳腐化

## ドキュメント一覧と分析

### 1. `architecture-checklist.md`

**内容**:
- プロダクト実装に必要な項目チェックリスト
- `<!-- HUMAN: ... -->` コメント付きの承認待ち項目の列挙
- Tech Stack、Domain Layer、Features、UI/UX、AI設定、Data Model の定義状況

**現状**:
- 作成日: 2026-01-23（1ヶ月前）
- ステータス情報が古い（例: MVP機能仕様が「未定義」だが、実際には `features/FEATURES.md` で定義済み）
- Tech Stack は `architecture.md` で承認済み（DEC-005）
- 曖昧性検出パターンは `features/audit-patterns.md` で承認済み（DEC-007）

**重複・陳腐化の根拠**:
1. **`architecture.md` と重複**
   - Tech Stack、ディレクトリ構成、レイヤー設計、DB スキーマがすべて `architecture.md` に記載済み
   - `architecture.md` が vercel-stack v2 で承認済み（DEC-005）
2. **`human-required-docs.md` と重複**
   - Human承認待ち項目の整理表が `human-required-docs.md` に存在
3. **実装フェーズに入り不要**
   - v1.0 MVP の実装が開始され、機能仕様は `features/` ディレクトリで管理
   - チェックリスト形式は初期計画フェーズで有用だったが、実装フェーズでは詳細ドキュメントが優先

**判断**: ❌ **削除推奨**

**削除後の対応**:
- `architecture.md` を参照先として明記
- Human承認待ち項目は `human-required-docs.md` または `roadmap.md` で管理

### 2. `architecture.md`

**内容**:
- システムアーキテクチャの詳細定義
- Tech Stack、ディレクトリ構成、レイヤー設計、DB スキーマ、AI 統合、認証フロー、非機能要件

**現状**:
- vercel-stack ベースで再設計（v2）
- DEC-005 で承認済み
- 最終更新: 2026-01-22

**重複・陳腐化の有無**:
- なし。アーキテクチャの Single Source of Truth として機能

**判断**: ✅ **保持**

### 3. `human-required-docs.md`

**内容**:
- Human が定義・承認すべきドキュメントの整理表
- カテゴリ A（既存・定義済み）、B（既存・更新必要）、C（不足・作成必要）
- Human アクションリスト

**現状**:
- 作成日: 2026-01-22
- ステータス情報が古い（例: 曖昧性検出パターンが「Human作成が必要」だが、実際には承認済み）

**重複・陳腐化の根拠**:
1. **`roadmap.md` と重複**
   - MVP開発前に必要な項目は `roadmap.md` の Phase 1 マイルストーンで管理されている
   - 例: M1.1（曖昧性検出PoC）、M1.2（検出精度評価）、M1.3（CEO受容性検証）
2. **実装フェーズに入り不要**
   - 「Human承認待ち」のステータス管理は、実際には `features/` ディレクトリのステータス欄（Planning / Ready / Backlog）で管理されている
   - 例: `FEATURES.md` では各機能のステータスが明記されている
3. **決定事項は `05_decisions/` で記録**
   - Human承認が必要な意思決定は `05_decisions/decision-log.md` で記録
   - 承認済みの決定（DEC-001〜007）は既に記録されている

**判断**: ❌ **削除推奨**

**削除後の対応**:
- Human承認待ち項目は `roadmap.md` のマイルストーンで管理
- 決定事項は `05_decisions/` で記録
- ドキュメント作成優先度は `features/` のステータス欄で確認

### 4. `roadmap.md`

**内容**:
- Phase 0〜4 のロードマップ
- マイルストーン、成功指標、主要機能、リスク管理

**現状**:
- Phase 0 完了、Phase 1 進行中
- 最終更新: 2026-01-23

**重複・陳腐化の有無**:
- なし。プロジェクト全体のタイムラインと進捗管理の Single Source of Truth

**判断**: ✅ **保持**

**更新推奨**:
- Phase 1 の進捗状況を更新（M1.1 のステータスを「In Progress」→「Completed」など）
- v1.0 実装の開始を反映

## 整理方針

### 削除対象（2ファイル）

1. **`architecture-checklist.md`**
   - 削除先: `_archive/architecture-checklist-2026-01-23.md`
   - 削除理由: `architecture.md` と重複、実装フェーズで不要

2. **`human-required-docs.md`**
   - 削除先: `_archive/human-required-docs-2026-01-22.md`
   - 削除理由: `roadmap.md` と `features/` と重複、実装フェーズで不要

### 保持対象（2ファイル）

1. **`architecture.md`**
   - アーキテクチャの Single Source of Truth
   - 変更不要

2. **`roadmap.md`**
   - プロジェクトタイムラインの Single Source of Truth
   - 更新推奨: Phase 1 の進捗反映

## アーカイブ戦略

削除対象ファイルは完全削除せず、`_archive/` ディレクトリに移動する。

```
docs/02_product/
├── _archive/
│   ├── architecture-checklist-2026-01-23.md
│   └── human-required-docs-2026-01-22.md
├── architecture.md
├── roadmap.md
├── design-system/
├── features/
└── user-flows/
```

**アーカイブ理由**:
- 初期の意思決定プロセスの記録として価値がある
- 将来的な振り返りや監査で参照する可能性がある
- Git 履歴には残るが、ディレクトリ構造上は非表示にする

## 削除後のドキュメント参照先

削除するドキュメントの情報は以下で参照可能：

| 削除ドキュメント | 情報の参照先 |
|----------------|------------|
| `architecture-checklist.md` | `architecture.md` - アーキテクチャ詳細 |
| | `features/FEATURES.md` - 機能ステータス |
| | `roadmap.md` - マイルストーン管理 |
| `human-required-docs.md` | `roadmap.md` - Phase 別のタスク管理 |
| | `05_decisions/decision-log.md` - 承認済み決定 |
| | `features/FEATURES.md` - 機能ステータス |

## 次のアクション

1. `_archive/` ディレクトリを作成
2. `architecture-checklist.md` を `_archive/` に移動
3. `human-required-docs.md` を `_archive/` に移動
4. `roadmap.md` を更新（Phase 1 の進捗反映）
5. 関連ドキュメントの参照リンクを更新（必要に応じて）

## 判断根拠の要約

### なぜ `architecture-checklist.md` を削除するか

1. **重複**: `architecture.md` にすべての情報が含まれる
2. **陳腐化**: 作成日から1ヶ月経過し、ステータス情報が古い
3. **フェーズ移行**: 計画フェーズ → 実装フェーズに移行したため、チェックリスト形式が不要
4. **Single Source of Truth の原則**: `architecture.md` をアーキテクチャの唯一の情報源とする

### なぜ `human-required-docs.md` を削除するか

1. **重複**: `roadmap.md` と `features/` で同じ情報を管理
2. **陳腐化**: 作成日から1ヶ月経過し、ステータス情報が古い
3. **実装の進行**: 承認待ちタスクの多くが既に完了または進行中
4. **管理の一元化**: タスク管理は `roadmap.md` のマイルストーンで統一

## 補足

削除するドキュメントは初期の計画フェーズで有用だったが、実装フェーズに入った現在では以下の理由で不要：

- **情報の鮮度**: ステータス情報を常に最新に保つコストが高い
- **Single Source of Truth**: 複数のドキュメントで同じ情報を管理するとメンテナンスコストが増大
- **フェーズの変化**: 計画フェーズでは「何が必要か」のチェックリストが有用だが、実装フェーズでは「何を実装するか」の詳細仕様が重要

実装フェーズでは以下のドキュメントが主要な情報源：

- `architecture.md` - アーキテクチャ設計
- `features/FEATURES.md` - 機能仕様と実装ステータス
- `roadmap.md` - タイムラインとマイルストーン
- `05_decisions/` - 意思決定の記録
