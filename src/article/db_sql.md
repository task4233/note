---
date: 2019-03-15
description: 'デスペめも -sql編-'
category: 
 - memo
 - デスペ
---

# 1章 SQL
# 03/15
## SELECT
 - 選択する句
### 射影と選択
 - 射影はcolumnを抜き出す
     - SELECT A1,A2,... FROM R
 - 選択はrowを抜き出す
     - SELECT * FROM R WHERE X 比較演算子 Y

### 選択項目リスト
 - 算術演算子
     - +,-.*,/を使用できる
 - 連結演算子
     - ||で要素を連結できる
 - 別名(相関名)の指定
     - AS句は省略可能
 - 重複の除去
     - SELECTの直後にDISTINCT句を入れる
 - NULL処理
     - COALESCE句を使用する
     - isNotNull?(a:b)とCOALESCE (a,b)が同義
 - 条件式(CASE文)
     - CASE WHEN 条件式 THEN 文 ELSE 文 END

### notes
 - COUNTはstd::mapのような感じ
 - NULLの時にカウントされない
 - SQLは3値論理(True/False/Unknown(不定))
## WHERE
 - 条件指定する句
### BETWEEN
 - 閉区間の範囲指定
 - BETWEEN A AND Bで[A,B]の閉区間となる
### IN
 - 値の完全一致
 - IN (A, B)で==A || ==Bと同義
### LIKE
 - 文字列の部分一致
 - %は*と同義(ワイルドカード)
 - _は任意の1文字

|記法|意味|
|:-:|:-:|
|`LIKE 'hoge%'`|前方一致検索|
|`LIKE '%hoge'`|後方一致検索|
|`LIKE '%hoge%'`|中間一致検索|

### NULL
 - ISNULLでNULLの抜き出し

### NOT
 - NOTで否定
 - `<>`はNOTと同義

## GROUP BY
 - 結果を集約する句
### 集約関数

|関数|補足|
|:-:|:-:|
|AVG(列名)|平均|
|MAX(列名)|最大値|
|MIN(列名)|最小値|
|SUM(列名)|総和|
|COUNT(\*)|行数を数える(std::map)|
|COUNT(DISTINCT 列名)|列名を指定して, その列の重複値を除く行数を求める|

### 使用例
#### 通常時
 - 年齢をグループ化して各年齢の人数合計を求める時は, 次のように書く

```sql
SELECT age, SUM(age) AS age_cnt
    FROM measured_data
    GROUP BY age
```
 - GROUP BYを使用する時, 次の値のみしかSELECTできない
     - GROUP BYの後に指定した列
     - 集約関数
     - 定数

#### HAVING句を使用する時
 - GROUP BYの結果に対してvalidationを指定したい場合は, HAVING句の後に条件式を指定する
 - 同じ年齢の人間が5人以上いる時のみ表示する時は, 次のように書く

```sql
SELECT age, SUM(age) AS age_cnt
    FROM measured_data
    GROUP BY age
    HAVING COUNT(*) >= 3
```

### ORDER BY
 - 整列する句
#### 使用例
 - 年齢をグループ化して各年齢の人数合計を求め, 年齢について降順で表示する時は, 次のように書く

```sql
SELECT age, SUM(age) AS age_cnt
    FROM measured_data
    GROUP BY age
    ORDER BY age DESC
```

 - 年齢をグループ化して各年齢の人数合計を求め, 年齢について昇順で表示する時は, 次のように書く

```sql
SELECT age, SUM(age) AS age_cnt
    FROM measured_data
    GROUP BY age
    ORDER BY age (ASC) -- ASCは省略可能
```

 - 年齢をグループ化して各年齢の人数合計を求め, 合計人数について昇順で表示する時は, 次のように書く

```sql
SELECT age, SUM(age) AS age_cnt
    FROM measured_data
    GROUP BY age
    ORDER BY 2 DESC -- SELECTで設定したもの内2番目(SUM(age))のこと
```

### 結合
#### 内部結合と外部結合
|名称|補足|
|:-:|:-:|
|内部結合|A AND B|
|左外部結合|A|
|右外部結合|B|
|全外部結合|A OR B|

#### 等結合と自然結合
 - いずれも, rowが同じ要素を結合する
 - 等結合は, そのままくっつける
 - 自然結合は, 同じ列を重複して表示しない
 - e.g.)
 - 以下の表を年齢で結合する時

|年齢|体重|
|:-:|:-:|
|10|40|
|11|50|
|12|55|


|年齢|足のサイズ|
|:-:|:-:|
|10|18|
|11|20|
|12|22|

 - 等結合の場合

|年齢|体重|年齢|足のサイズ|
|:-:|:-:|:-:|:-:|
|10|40|10|18|
|11|50|11|20|
|12|55|12|22|

 - 自然結合の場合

|年齢|体重|足のサイズ|
|:-:|:-:|:-:|
|10|40|18|
|11|50|20|
|12|55|22|

### 和・差・直積・積・商
 - 集合RとSについて考える
#### 和
 - R $\cup$ S
 - UNIONで和を表す
 - UNION ALLと書くと重複を許す

#### 差
 - R-S
 - EXCEPTで差を表す

#### 直積
 - R $\times$ S

#### 積
 - R $\cap$ S
 - INTERSECTで積を表す

#### 商
 - R $\div$ S
     - $\exists$ T, S $\times$ T = R $\Rightarrow$ R $\div$ S = Tと定義する
