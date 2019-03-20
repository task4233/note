---
date: 2019-03-20
description: 'デスペめも -H30 午後2編-'
category: 
 - memo
 - デスペ
---

# デスペ H30 午後2

# 03/20
## H30 午後2-1
## NOT NULL制約の表記
 - 次のような表現を用いる場合, NOT NULL制約が必要
   - 指定は必須
   - 自動的に設定される
   - 〜のいずれか
     - 「〜を指定しなければならない」が省略されていると考えれば良い
 - 次のような表現を用いる場合, NOT NULL制約が不必要
   - 任意
   - 登録後, 別のタイミングで記録する
     - 登録時はNULLの可能性が高い
     - 次で触れるCRUDのUが指定されているとき
## CRUD表
 - C(Create), R(Reference), U(Update), D(Delete)のこと
## 格納長の計算
 - NOT NULL制約がある場合, NULLフラグが追加されることが多い
 - 大抵はRDBMSの仕様で定義されている
 - NULLフラグはNOT NULL制約のある列にのみ追加される
## テーブル定義表の索引
 - 次の3種類がある
  - P(Primary Key)
  - NU(Not Unique)
  - U(Unique)

 