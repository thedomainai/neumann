# ドキュメント整理サマリ（2025-02-22）

## 実施内容

`/docs/02_product` 配下のドキュメント整理を実施しました。

### アーカイブしたドキュメント（2ファイル）

| ファイル名 | 移動先 | 削除理由 |
|----------|--------|---------|
| `architecture-checklist.md` | `_archive/architecture-checklist-2026-01-23.md` | `architecture.md` と重複、実装フェーズで不要 |
| `human-required-docs.md` | `_archive/human-required-docs-2026-01-22.md` | `roadmap.md` と `features/` と重複、実装フェーズで不要 |

### 保持したドキュメント（2ファイル）

| ファイル名 | 理由 | 更新内容 |
|----------|------|---------|
| `architecture.md` | アーキテクチャの Single Source of Truth | 変更なし |
| `roadmap.md` | プロジェクトタイムラインの Single Source of Truth | v1.0 MVP 実装開始を反映 |

## アーカイブポリシー

削除対象ファイルは完全削除せず、`_archive/` ディレクトリに移動しました。
- 初期の意思決定プロセスの記録として価値がある
- 将来的な振り返りや監査で参照する可能性がある
- Git 履歴には残るが、ディレクトリ構造上は非表示にする

## 削除後のドキュメント参照先

アーカイブしたドキュメントの情報は、以下の現行ドキュメントで参照可能です：

| アーカイブドキュメント | 情報の参照先 |
|---------------------|------------|
| `architecture-checklist.md` | `architecture.md` - アーキテクチャ詳細<br>`features/FEATURES.md` - 機能ステータス<br>`roadmap.md` - マイルストーン管理 |
| `human-required-docs.md` | `roadmap.md` - Phase 別のタスク管理<br>`../05_decisions/decision-log.md` - 承認済み決定<br>`features/FEATURES.md` - 機能ステータス |

## 整理の根拠

### なぜ整理が必要だったか

1. **フェーズの変化**: 計画フェーズ → 実装フェーズに移行
2. **情報の重複**: 同じ情報が複数のドキュメントで管理され、メンテナンスコストが増大
3. **ステータスの陳腐化**: 作成日から1ヶ月経過し、ステータス情報が古い
4. **Single Source of Truth の原則**: 各情報に対して唯一の情報源を明確化

### 削除判断の基準

1. **重複**: 他のドキュメントに同じ情報が存在する
2. **陳腐化**: ステータス情報が古く、更新コストが高い
3. **フェーズ不適合**: 現在のフェーズ（実装）で不要な形式（チェックリスト）
4. **Single Source of Truth**: より適切な管理先が存在する

## 現在のドキュメント構造

```
docs/02_product/
├── _archive/                           # アーカイブ（非参照）
│   ├── README.md
│   ├── architecture-checklist-2026-01-23.md
│   └── human-required-docs-2026-01-22.md
│
├── architecture.md                     # ★ アーキテクチャの Single Source of Truth
├── roadmap.md                          # ★ タイムラインの Single Source of Truth
├── document-cleanup-analysis.md        # 整理分析（このファイルの詳細版）
├── CLEANUP_SUMMARY.md                  # このファイル
│
├── design-system/                      # デザインシステム
│   ├── README.md
│   ├── accessibility.md
│   ├── colors.md
│   └── ...
│
├── features/                           # ★ 機能仕様の Single Source of Truth
│   ├── README.md
│   ├── FEATURES.md                    # 機能一覧・詳細仕様
│   ├── USER_STORIES.md                # ユーザーストーリー
│   └── audit-patterns.md              # 曖昧性検出パターン仕様
│
└── user-flows/                         # ★ ユーザーフローの Single Source of Truth
    ├── README.md
    ├── gap-analysis.md                # ユーザーフローと実装の齟齬分析
    ├── v1-ceo-daily-flow.md
    ├── v1-manager-response-flow.md
    └── v1-onboarding-flow.md
```

## 主要ドキュメントの役割

| ドキュメント | 役割 | 更新頻度 |
|------------|------|---------|
| `architecture.md` | Tech Stack、ディレクトリ構成、レイヤー設計、DB スキーマ | 低（アーキテクチャ変更時） |
| `roadmap.md` | フェーズ、マイルストーン、成功指標、リリーススケジュール | 中（マイルストーン達成時） |
| `features/FEATURES.md` | 機能一覧、詳細仕様、ステータス、Feature Flags | 高（実装進行中） |
| `features/USER_STORIES.md` | ユーザーストーリー、受け入れ条件、優先度 | 低（要件確定後は変更少） |
| `user-flows/` | 画面遷移、ユーザー体験、成功指標 | 中（UX 改善時） |

## 今後のドキュメント管理方針

1. **Single Source of Truth を遵守**
   - 各情報に対して唯一の情報源を明確にする
   - 重複情報は参照リンクで対応

2. **ステータス管理の一元化**
   - タスク管理: `roadmap.md` のマイルストーン
   - 機能ステータス: `features/FEATURES.md`
   - 意思決定: `../05_decisions/decision-log.md`

3. **アーカイブポリシー**
   - 不要になったドキュメントは `_archive/` に移動
   - 完全削除はしない（履歴として保持）

4. **更新頻度に応じた管理**
   - 高頻度更新: `features/FEATURES.md`（実装ステータス）
   - 中頻度更新: `roadmap.md`（マイルストーン）、`user-flows/`（UX改善）
   - 低頻度更新: `architecture.md`（アーキテクチャ変更時のみ）

---

**実施日**: 2025-02-22
**実施者**: AI Agent
**承認**: 自動整理（重複・陳腐化ドキュメントのアーカイブ）
