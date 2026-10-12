# 0002. VitePress locales で日本語ロケールを追加する

- Status: Accepted
- Date: 2026-10-13

## Context

- ポートフォリオ（`src/index.md`）は英語のみ。日本語の読者向けに日本語版を用意したい。
- 一方で `config.ts` は `lang: 'ja-JP'` で UI ラベルも日本語だったため、英語の本文が `<html lang="ja-JP">` で配信されていた。
- 配信は GitHub Pages の静的ホスティング。手前の Cloudflare は、apex を proxied にすると GitHub Pages の証明書更新が失敗する（2026-08-09 の 526 障害）ため、DNS only で運用している。つまりリクエストヘッダ（`Accept-Language`）を読んで出し分けられる場所がない。
- 既存の URL（`/`、`/card`）は LinkedIn などの外部から貼られている。
- `src/index.md` は GitHub の Web UI から直接編集されることが多い。

## Decision

- VitePress 標準の `locales` を使う。**英語を root（`/`）のまま残し、日本語を `/ja/` に追加する。** root の `lang` は `en-US`、ja は `ja-JP`。
- 言語の選択は、ナビの言語切替による**手動選択のみ**とする。
- 日本語版は `src/ja/` に Markdown を別ファイルで持つ。データを共通化する仕組みは作らない。
- 日本語版でも `##` 見出しは英語のままにする。アンカー（`#links` など）と nav のリンクを両言語で共通にするため。
- 書籍・登壇のタイトルは、リンク先に載っている原題を使い、英題から翻訳しない。原題が見つからないものは英語のまま残す。
- 対になるページが無い場合は、そのページの言語切替を表示しない。
  - `transformPageData` で、対になるファイルが存在する locale を `frontmatter.availableLocales` に入れる。
  - default theme 内部の `useLangs`（`composables/langs.js`）を Vite の alias で `theme/locale-links.ts` に差し替え、`availableLocales` に無い locale を言語切替から外す。
- `transformHead` で、`og:title` / `og:description` / `og:url` / `og:locale`（`og:locale:alternate`）と `hreflang`（`en` / `ja` / `x-default`）をページごとに出す。`description` は locale ごとに設定する（ja: 「気楽に、でも怠けずに。」）。
- en と ja のずれは `scripts/check-i18n-parity.mjs` で検知する。見出しの並びと、各見出しの下にあるトップレベルの項目数を比べ、CI（`.github/workflows/i18n.yml`）で push / PR ごとに実行する。

## Alternatives

- **B. ja を root にし、英語を `/en/` に移す**: `/` の中身が変わり、外部リンクと検索インデックスがずれる。GitHub Pages ではサーバー側のリダイレクトが書けない。
- **C. 1 ページ内で JS により表示言語を切り替える**: 検索エンジンが日本語版を別ページとして扱えず、`hreflang` も付けられない。
- **D. `Accept-Language` で自動リダイレクトする（却下）**: サーバー側では、上記のとおり読める場所がない。Cloudflare で実装するには apex を proxied にする必要があり、証明書更新の問題が再発する。クライアント側（`navigator.languages`）で実装すると、表示のちらつき、クローラ、共有リンク、英語を見たい人への強制、という問題が出る。
- **日本語版の案内バナー（保留）**: root を `navigator.languages` に `ja` を含むブラウザで開いたとき、「日本語版があります」と出す。URL もインデックスも変わらない無難な案だが、今は必要性が低いので見送り、必要になったら別途入れる。
- **コンテンツをデータ（YAML/TS）に切り出し、Vue コンポーネントで両言語を描画する**: ずれは構造的に防げるが、年数回の更新に対しては仕組みが重く、Markdown を Web UI で直接編集できなくなる。
- **言語切替を CSS で隠す**: default theme の内部クラス名に依存する点は alias と同じで、そのうえ `hreflang` などとの整合をページ単位で取れない。

## Consequences

- 既存の URL は変わらない。英語ページが正しく `lang="en-US"` で配信されるようになる。
- 内容を更新するときは `src/` と `src/ja/` の両方を変える必要がある。片方だけ変えると CI が落ちて気づける。ただし CI はデプロイを止めないので、気づいた時点で直す運用になる。また、項目の数が同じまま文言だけが変わった場合は検知できない。
- `useLangs` の差し替えは VitePress の内部構成（1.6.4 時点の `composables/langs.js`）に依存する。更新でパスや実装が変わると alias が当たらなくなり、標準の挙動（対のないページでも言語切替が出て、リンク先が 404 になる）に戻る。表示が壊れるわけではない。VitePress を更新したら、片方の言語にしかないページで言語切替が出ないことを確認する。
- 404 ページは VitePress の仕様で 1 つしか生成されず、root（英語）の文言で表示される。
