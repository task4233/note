---
date: 2019-02-04
description: 'ABC117のDの桁DPについて'
tags:
 - 競プロ
---

# [ABC117 D - XXOR](https://atcoder.jp/contests/abc117/tasks/abc117_d)
## 概要
$N$個の非負整数$A_1, A_2, ..., A_n$および$K$が与えられる.  
$0$以上$K$以下の整数$X$に対して, $f(X) = (X xor A_1) + ... + (X xor A_n)$としたとき, $f$の最大値を求めよ.

## 解法
桁DPで解く.  
```
dp[i][j] := 上位iビットまで見た時に, k以下であることが(j?確定:未確定)であるときの最大値
```

その上で, 上位(i+1)ビット目から上位(i)ビット目の遷移を考える.  
### 1. 確定状態から確定状態
この遷移は, 遷移元が既に確定状態に入っているため, Xのiビット目として0と1のどちらが来ても必ず確定状態のままである.  
したがって, 0と1の両方を比較して値が大きくなる方を選択して遷移すれば良い.  

```cpp
dp[i][1] = max(dp[i][1], dp[i+1][1] + (1<<i)*max(num, n-num));
```

### 2. 未確定状態から確定状態
この遷移は, 遷移元が未確定状態に入っているため, kのiビット目が1の時にXのiビット目として0が来なければならない.  
したがって, Xのiビット目が0となる$\Longleftrightarrow$Aのiビット目で1が立っている方に遷移させれば良い.

```cpp
if (k & (1<<i)) {
  dp[i][1] = max(dp[i][1], dp[i+1][0] + (1<<i)*num;
}
```

### 3. 未確定状態から未確定状態
この遷移になるものは2種類ある.  
1種類目は, `kのiビット目が0`かつ`Xのiビット目が0`のとき.  
2種類目は, `kのiビット目が1`かつ`Xのiビット目が1`のとき.  

#### 1) `kのiビット目が0`かつ`Xのiビット目が0`のとき
Xのiビット目が0となる$\Longleftrightarrow$Aのiビット目で1が立っている
```cpp
if (!(k & (1<<i))) {
  dp[i][0] = max(dp[i][0], dp[i+1][0] + (1<<i)*num;
}
```

#### 2) `kのiビット目が1`かつ`Xのiビット目が1`のとき
Xのiビット目が1となる$\Longleftrightarrow$Aのiビット目で0が立っている
```cpp
if (k & (1<<i)) {
  dp[i][0] = max(dp[i][0], dp[i+1][0] + (1<<i)*(n-num);
}
```

以上より, 遷移をまとめると以下のようになる.
```cpp
dp[i][1] = max(dp[i][1], dp[i+1][1] + (1<<i)*max(num, n-num));
if (k & (1<<i)){
  dp[i][1] = max(dp[i][1], dp[i+1][0] + (1<<i)*num);
  dp[i][0] = max(dp[i][0], dp[i+1][0] + (1<<i)*(n-num));
} else {
  dp[i][0] = max(dp[i][0], dp[i+1][0] + (1<<i)*num);
}
```

桁DPの遷移は実装できたので, あとは残りの部分を実装するだけ.

```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = int64_t;
#define int int64

// dp[i][j] := ibit目まで見てそこまでの値がk未満で(0:ない, 1:ある)時の最大値
int dp[60][2];

signed main(){
  int n,k;
  cin >> n >> k;
  vector< int > a(n);
  for(int i=0; i<n; ++i) cin >> a[i];
  memset(dp, -1, sizeof(dp));

  dp[45][0] = 0;
  for(int bi=44; bi>=0; --bi){
    int on_bit_num = 0;
    for(int ai=0; ai<n; ++ai){
      if((a[ai] >> bi) & 1) ++on_bit_num;
    }

    int digit = (1LL << bi);
    if(dp[bi+1][1] >= 0){
      dp[bi][1] = max(dp[bi][1], dp[bi+1][1] + digit * max(on_bit_num, n-on_bit_num));
    }     
    if(dp[bi+1][0] >= 0){
      if ((k >> bi) & 1){
        dp[bi][1] = max(dp[bi][1], dp[bi+1][0] + digit * on_bit_num);
        dp[bi][0] = max(dp[bi][0], dp[bi+1][0] + digit * (n-on_bit_num));
      } else {
        dp[bi][0] = max(dp[bi][0], dp[bi+1][0] + digit * on_bit_num);
      }     
    }
  }

  int ans = max(dp[0][0], dp[0][1]);
  cout << ans << endl;
  return 0;
}


```

以上.  
ほとんどけんちょんさんの記事を参考にしました.  
お疲れ様でした.

# 参考資料
 - [Editorial](https://img.atcoder.jp/abc117/editorial.pdf)
 - [AtCoder ABC 117 D - XXOR (400 点)](http://drken1215.hatenablog.com/entry/2019/02/03/224200)
 - [桁DP入門](https://pekempey.hatenablog.com/entry/2015/12/09/000603)