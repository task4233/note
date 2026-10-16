# 0003. アクセス解析を Universal Analytics から GA4 に移行する

- Status: Accepted
- Date: 2026-10-17

## Context

- `config.ts` の `head` に gtag.js を直書きし、UA のプロパティ（`UA-134364564-2`）に送っていた。Universal Analytics は 2023-07 にデータ処理を止めており、それ以降このサイトのアクセスは計測されていない。スクリプトの読み込みと送信だけが残っていた。
- 日本語ロケール（`/ja/`、ADR 0002）を足したので、`/` と `/ja/` のどちらが読まれているかを知りたい。
- サイトは VitePress の SPA。初回表示のあとのページ遷移（`/` ↔ `/ja/`、`/card` など）は `history.pushState` で行われ、HTML は読み直されない。
- 配信は GitHub Pages の静的ホスティング（手前の Cloudflare は apex を DNS only で運用。ADR 0002 参照）。サーバー側でタグを差し込める場所はない。
- VitePress 1.x には analytics 用の設定項目がなく、公式ドキュメントも `head` に gtag.js を書く方法を案内している。

## Decision

- GA4 のプロパティを新しく作り、その Web データストリームの Measurement ID（`G-` から始まる）に送る。UA の ID は削除する。
- タグは従来どおり `config.ts` の `head` に gtag.js の標準スニペットで入れる。ID は `GA_MEASUREMENT_ID` 定数に直書きする（ID は HTML に出る公開値なので秘匿しない）。
- タグは `vitepress build`（`NODE_ENV === 'production'`）のときだけ出す。`yarn dev` のアクセスを計測に混ぜないため。ID が空のときも出さない。
- GA の利用規約（Privacy の条項）に従い、プライバシーポリシー（`/privacy`、`/ja/privacy`）を置き、Cookie の利用と Google Analytics の利用・データの扱いを開示する。Google の「How Google uses information from sites or apps that use our services」へリンクする。全ページのフッターからリンクする。
- SPA 内の遷移は、GA4 の拡張計測「ブラウザの履歴イベントに基づくページの変更」に任せ、ルーターにフックを足さない。ロケールは `page_location`（`/ja/` で始まるか）で見分ける。

## Alternatives

- **`router.onAfterRouteChanged` で `page_view` を手で送る**: `send_page_view: false` と組み合わせれば送信を完全に制御できるが、拡張計測と二重計上しないための設定をコードと GA 側の両方で揃える必要がある。ページ数が少ないサイトでは拡張計測で足りる。
- **Google Tag Manager を挟む**: タグを GTM 側で増減できるが、送るのは GA4 だけなので管理対象が増えるだけになる。
- **GA 以外（Cloudflare Web Analytics、Plausible など）**: Cloudflare Web Analytics は proxied でなくても JS ビーコンで使えるが、過去の UA と同じ Google アカウントで見られる GA4 を優先した。必要になったら別途検討する。
- **ID を環境変数（GitHub Actions の変数）から渡す**: 公開値なので隠す意味がなく、Web UI からの編集で build 設定まで追う必要が出る。

## Consequences

- GA4 の Measurement ID を入れてデプロイした時点から計測が再開する。UA の過去データは GA4 に引き継がれない。
- データストリームの拡張計測で「ブラウザの履歴イベントに基づくページの変更」を切ると、初回表示以外のページ遷移が計測されなくなる。
- `yarn preview`（ビルド結果をローカルで配信）は production ビルドなので計測される。必要なら GA4 側でホスト名 `localhost` を除外する。
- 新しく Google のサービスにデータを送るわけではない（UA と同じ gtag.js / `googletagmanager.com`）。
- 計測の設定（送るデータ、使うサービス）を変えたら、プライバシーポリシーも更新する。
