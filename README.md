# note

[task4233.dev](https://task4233.dev/) のポートフォリオサイトです。


## Description
プロフィール / Publications / Employments / Awards 等を載せたシングルページのポートフォリオサイト。

## Features

- [VitePress 1.x](https://vitepress.dev/) を利用
- GitHub Pages へのデプロイ
- GitHub Actions を用いた master push 連動の自動デプロイ

## Requirement
- Node `>=22.18 <23` (`package.json` の `engines` で指定)
- yarn 4 (corepack 経由)
- [package.json](https://github.com/task4233/note/blob/master/package.json) に必要パッケージは載っています。


## Installation
```bash
git clone https://github.com/task4233/note/
cd note
corepack enable
corepack yarn install
corepack yarn dev
```

## Author

[@task4233](https://x.com/task4233)
