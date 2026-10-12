# 0001. ADR で設計判断を記録する

- Status: Accepted
- Date: 2026-10-13

## Context

このリポジトリには、コードを読んでも理由が分からない判断がいくつかある（例: Cloudflare の apex を proxied にしない理由、ブログを別サイトに分けた理由）。個人サイトで変更頻度は低く、時間が空いてから触ると、過去の判断を忘れて同じ検討や同じ事故を繰り返しやすい。

## Decision

- 設計判断を ADR として `adr/` に残す。
- 形式は Michael Nygard の "Documenting Architecture Decisions"（2011）の Context / Decision / Consequences を基本に、検討した他案を残す `Alternatives` 節を足したもの（`template.md`）。
- ファイル名は `NNNN-kebab-case-title.md`。4 桁の連番。ケースはリポジトリ内の既存ファイル（`apple-touch-icon-*.png` など）に合わせて kebab-case に統一する。
- 日本語で書く。
- `Accepted` になった ADR は本文を書き換えない。判断を変えるときは新しい ADR を書き、古い方の Status を `Superseded by [NNNN](...)` にする。誤字やリンク切れの修正は例外とする。
- 対象は「後から理由を聞かれそうな判断」。依存の minor 更新のような自明な変更には書かない。

## Alternatives

- **`src/adr/` に置いてサイトで公開する**: 判断の過程を見せられるが、ナビ構成と i18n の対象が増える。GitHub 上で読めれば十分なので見送った。公開したくなったら `src/` 配下へ移せばよい。
- **`docs/adr/` に置く**: `docs/` は VitePress のビルド出力（`.gitignore` 済み）なので使えない。
- **MADR に完全準拠する**: Decision Drivers や選択肢ごとの Pros / Cons まで書くと、個人サイトの判断には重い。必要な ADR だけ節を足せばよい。
- **adr-tools などの CLI を入れる**: 連番を手で振る手間は小さく、依存を増やすほどではない。

## Consequences

- 判断の理由が Git の履歴とは別に、まとまって残る。
- ADR を書く手間が増える。対象を「後から理由を聞かれそうな判断」に絞って抑える。
- 過去の判断（VuePress → VitePress 移行、ブログの分離、Cloudflare の DNS 設定）は、別途書き起こす。
