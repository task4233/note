---
date: 2019-03-14
description: 'ABC049-D'
tags:
 - 競プロ
 - AtCoder
---

# [ABC049 D - 連結](https://atcoder.jp/contests/abc049/tasks/arc065_b)
## 概要
$N$個の都市と$K$本の道路と$L$本の鉄道が伸びている.  
$i$本目の道路は$p_i$と$q_i$番目の都市を, $j$本目の鉄道は$r_i$と$s_i$番目の鉄道を結んでいる.  

全ての都市について, 道路と鉄道の両方で連結している都市の数を求めよ.

 - $2 \leq N \leq 2 \times 10^5$
 - $1 \leq K, L \leq 10^5$

## 解法
 - 連結かつ制約からUnion-Findを使いそう
 - roadとtrainでUnion-Find木を作る
 - どうやって全ての都市について, 道路と鉄道の両方で連結しているかを確認するんだ?
 - ~~~~~~~~~~~20分経過~~~~~~~~~~~~~~~~
 - editorialを見る
 - 道路と鉄道のpairでカウントするらしい
 - なぜそうなった?
 - [これでした](https://youtu.be/jvAX9Z7beLg?t=1456)
 - 言い換えると, 道路と鉄道で同じ根を持つ時に, 道路と鉄道の両方で連結していると言えるから

## 提出
[ABC049-D](https://atcoder.jp/contests/abc049/submissions/4573097)

# ref.
 - [ABC049](https://img.atcoder.jp/arc065/editorial.pdf)