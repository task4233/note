---
date: 2019-02-15
description: 'ABC017-C'
category:
 - 競プロ
 - AtCoder
---

# [ABC017 C - ハイスコア](https://atcoder.jp/contests/abc017/tasks/abc017_3)
## 概要
$N$個の遺跡と$M$種類の宝石がある.  
遺跡$i$を探索すると, [$l_i$, $r_i$]の種類の宝石を$1$つずつ入手し, スコア$s_i$を獲得する.  
しかし, 全種類の宝石を入手すると, 獲得したスコアは$0$になる.  
このとき, 獲得できるスコアの最大値を求めよ.

## 解法
方針としては, 全体から必要のない部分を減じるという流れになる.  
これは, いもす法で解ける.  
まず, 全ての遺跡のスコア等を全て設定する.  
次に, いもすテーブルをシミュレーションして求める.  
最後に, そのテーブルの最小値を求めて, 全体から減じれば良い.

## 提出
[ABC017-C](https://atcoder.jp/contests/abc017/submissions/4262900)

以上.  
お疲れ様でした.  

セグ木でも解けるらしい.