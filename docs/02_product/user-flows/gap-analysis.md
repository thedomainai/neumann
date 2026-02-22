# ユーザーフローと実装の齟齬分析

**作成日**: 2025-02-22
**対象**: v1.0 MVP

## エグゼクティブサマリ

ユーザーフロードキュメント (`docs/02_product/user-flows/`) と実装 (`src/features/`) を比較した結果、以下の齟齬が確認されました：

- **重大な齟齬**: 2件（オンボーディングフロー未実装、ダッシュボードステータスが動的でない）
- **軽微な齟齬**: 3件（ドキュメント化されていない実装機能）
- **適合している機能**: CEO Daily Flow の主要機能（ダッシュボード、エディタ、Audit Panel）

## 重大な齟齬

### 1. オンボーディングフローが未実装

**ドキュメント**: `v1-onboarding-flow.md`

**記載内容**:
- ~~Google SSO ログイン~~（v1.1 に延期）
- ウェルカム画面（「Digital COO」の価値提案）
- サンプルデータ体験フロー
- 次ステップ案内（資料インポート、チーム招待）

**実装の現状**:
- ~~オンボーディング関連のページが存在しない~~
- ~~`src/app/page.tsx` は直接ダッシュボードを表示~~
- ログイン機能が未実装（v1.1 に延期）
- ~~初回ユーザー向けのウェルカム画面が存在しない~~

**影響度**: **High**

**✅ 対応完了 (2025-02-22)**:
1. ✅ `/onboarding` ページを作成
2. ⏸️ Google SSO は v1.1 に延期（localStorage で初回判定を実装）
3. ✅ サンプルデータを用いた体験フローを実装
4. ✅ 初回アクセス時に `/onboarding` へリダイレクトするロジックを追加

**実装ファイル**:
- `src/features/onboarding/components/` - オンボーディングコンポーネント群
- `src/app/onboarding/page.tsx` - オンボーディングページ
- `src/app/page.tsx` - 初回判定ロジック

### 2. ダッシュボードのステータス表示が動的でない

**ドキュメント**: `v1-ceo-daily-flow.md`

**記載内容**:
```
STATUS: [HEALTHY/DEGRADED/CRITICAL] | AMBIGUITY LEVEL: [%]

- STATUS: HEALTHY → 緑バッジ、問題なし
- STATUS: DEGRADED → 黄バッジ、警告あり
- STATUS: CRITICAL → 赤バッジ、即時対応が必要
```

**実装の現状**:
```tsx
// DashboardView.tsx - 動的算出に変更
const systemHealth = useMemo(() => calculateSystemHealth(kpiData), [kpiData]);
STATUS: {systemHealth.status} | AMBIGUITY LEVEL: {systemHealth.ambiguityLevel}%
```

**問題点**:
- ~~ステータスが固定値（`DEGRADED`）でハードコードされている~~
- ~~Ambiguity Level が `HIGH` という定性的な値で固定されている~~
- ~~KPI データに基づく動的な算出ロジックが実装されていない~~

**影響度**: **High**

**✅ 対応完了 (2025-02-22)**:
1. ✅ KPI Tree データからシステム全体のステータスを算出するロジックを実装
   - `src/domain/kpi/utils.ts` に `calculateSystemHealth()` を追加
   - Critical ノードが1つでもあれば → `CRITICAL`
   - Warning ノードが1つでもあれば → `DEGRADED`
   - すべて Healthy なら → `HEALTHY`
2. ✅ Ambiguity Level を数値（%）で表示
   - 全ノードの ambiguityScore の平均を算出
3. ✅ ステータスに応じた色分け（green/yellow/red）を実装
   - `getSystemStatusColor()` と `getAmbiguityLevelColor()` を追加

**実装ファイル**:
- `src/domain/kpi/utils.ts` - ステータス算出ロジック
- `src/features/dashboard/components/DashboardView.tsx` - 動的表示を実装

## 軽微な齟齬

### 3. データエントリー画面がドキュメント化されていない

**実装の現状**:
- ~~`src/features/settings/components/DataEntryView.tsx` が存在~~
- ~~Sidebar のナビゲーションから `data-entry` ビューにアクセス可能~~

**ドキュメントの現状**:
- v1.0 のユーザーフローには記載なし
- v1.0 スコープ決定では「レポートインポート」は含まない（v1.1以降）とされている

**影響度**: **Low**

**✅ 対応完了 (2025-02-22)**:
- v1.0 には含めないと判断（詳細: `docs/05_decisions/v1.0-scope-clarification.md`）
- Sidebar から `data-entry` を削除
- 実装は保持し、v1.1 で有効化予定

### 4. RUN_LINTER ボタンがドキュメント化されていない

**実装の現状**:
```tsx
// EditorView.tsx - 環境変数で制御
const showLinterButton = process.env.NEXT_PUBLIC_ENABLE_LINTER_BUTTON === 'true';
```

**ドキュメントの現状**:
- CEO Daily Flow には記載なし
- 曖昧性検知は「完了している（モック or 自動検知済み）」という前提条件として記載されている

**影響度**: **Low**

**✅ 対応完了 (2025-02-22)**:
- 開発モードでのみ表示すると判断（詳細: `docs/05_decisions/v1.0-scope-clarification.md`）
- `NEXT_PUBLIC_ENABLE_LINTER_BUTTON=true` でのみ表示
- v1.0 では非表示（Zero Latency 原則に忠実）

### 5. 設定画面の詳細機能がドキュメント化されていない

**実装の現状**:
- ~~KPI定義の追加・編集・削除ボタン~~
- ~~オーナーの追加・編集・削除ボタン~~
- ~~階層的な KPI 表示（親子関係）~~

**ドキュメントの現状**:
- v1.0 スコープ決定には「設定画面」の記載なし
- CEO Daily Flow には Settings への言及なし

**影響度**: **Low**

**✅ 対応完了 (2025-02-22)**:
- v1.0 には含めないと判断（詳細: `docs/05_decisions/v1.0-scope-clarification.md`）
- Sidebar から `settings` を削除
- 実装は保持し、v1.1 で有効化予定

## 適合している機能

以下の機能は、ドキュメントと実装が適合しています：

### CEO Daily Flow

| 機能 | ドキュメント | 実装 | 状態 |
|------|-------------|------|------|
| KPI Logic Tree | ✅ | ✅ `DashboardView.tsx` | ✅ 適合 |
| Critical Anomalies リスト | ✅ | ✅ `DashboardView.tsx` | ✅ 適合 |
| エディタビュー | ✅ | ✅ `EditorView.tsx` | ✅ 適合 |
| Audit Panel | ✅ | ✅ `AuditPanel.tsx` | ✅ 適合 |
| 解決済み/却下アクション | ✅ | ✅ `AuditPanel.tsx` | ✅ 適合 |
| 警告行のハイライト | ✅ | ✅ `EditorView.tsx` | ✅ 適合 |
| Ambiguity スコア表示 | ✅ | ✅ `EditorView.tsx` | ✅ 適合 |

### Manager Response Flow

v1.0 では手動運用とされているため、実装の必要なし。✅ 適合

## 推奨される対応優先順位

### Priority 1: 重大な齟齬（MVP の価値提供に直結） ✅ 完了

1. ✅ **ダッシュボードステータスの動的化** (影響度: High, 工数: Medium)
   - ✅ システム全体のステータスを KPI データから算出
   - ✅ Ambiguity Level を数値（%）で表示
   - ✅ 色分けロジックを実装

2. ✅ **オンボーディングフロー実装** (影響度: High, 工数: High)
   - ✅ 初回ユーザー体験の設計実装
   - ⏸️ Google SSO 認証（v1.1 に延期、localStorage で代替）
   - ✅ サンプルデータ体験フロー

### Priority 2: スコープ明確化（ドキュメントと実装の整合性） ✅ 完了

3. ✅ **データエントリー画面のスコープ決定** (影響度: Low, 工数: Low)
   - ✅ v1.1 に延期すると決定
   - ✅ Sidebar から削除、実装は保持

4. ✅ **RUN_LINTER の必要性判断** (影響度: Low, 工数: Low)
   - ✅ 開発モードでのみ表示と判断
   - ✅ 環境変数で制御を実装

5. ✅ **設定画面のスコープ決定** (影響度: Low, 工数: Low)
   - ✅ v1.1 に延期すると決定
   - ✅ Sidebar から削除、実装は保持

## 対応完了サマリ（2025-02-22）

すべての Priority 1 と Priority 2 の対応が完了しました。

### 完了した実装

1. **ダッシュボードステータスの動的化**
   - `src/domain/kpi/utils.ts` に算出ロジックを実装
   - DashboardView で動的表示を実装

2. **オンボーディングフロー**
   - `/onboarding` ページを実装
   - WelcomeScreen, SampleExperience, NextSteps を実装
   - 初回アクセス判定ロジックを追加

3. **v1.0 スコープの明確化**
   - data-entry と settings を Sidebar から削除（v1.1 に延期）
   - RUN_LINTER を環境変数で制御
   - 判断根拠を `docs/05_decisions/v1.0-scope-clarification.md` に記録

### 次のアクション

1. ~~**重大な齟齬の修正**を優先的に実施~~ ✅ 完了
2. ~~**スコープ明確化**のために、ステークホルダー（Human）と議論~~ ✅ 完了
3. 実装のビルド・動作確認
4. v1.0 の成功指標（朝の確認時間 < 2分、初回完了率 > 80%）を計測可能な状態にする

## 備考

本分析は、v1.0 MVP のスコープに基づいています。今後、v1.1 以降の機能追加に伴い、再度齟齬分析を実施することを推奨します。
