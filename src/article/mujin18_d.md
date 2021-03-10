---
date: 2019-04-21
description: 'Mujin18 うほょじご'
tags:
 - 競プロ
---

# Mujin 18 D うほょじご

## 問題
 - [D - うほょじご](https://atcoder.jp/contests/mujin-pc-2018/tasks/mujin_pc_2018_d)

## 解法
 - $(x,y)$の組で操作を無限に続けられる $\Longleftrightarrow$ いつか$(x,y)$の状態に戻ってくる
 - 制約が$0 \leq x \leq 999$であることに注目
 - 状態を全部追うことが可能っぽい
   - 一応, $rev(x)$の制約も同様に$0 \leq rev(x) \leq 999$なので
 - したがって全ての状態($0 \leq x \leq 999$)で状態を回してみれば良い
 