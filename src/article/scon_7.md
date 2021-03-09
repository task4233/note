---
date: 2019-04-01
description: '芝浦ばちゃ#7'
category:
 - 競プロ
 - AtCoder
---

# [芝浦ばちゃ#7](https://not-522.appspot.com/contest/5711986826412032)

## A - CODEFESTIVAL 2016
### 概要
 - 文字列sの前半4文字と後半8文字の間に半角スペースを1つ挿入して出力せよ

### 解法
 - や　る　だ　け
   - 3文字目と4文字目の間にスペースを出力するだけ

### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;

int main(){
  string s;cin>>s;
  for(int i=0;i<s.size();++i){
    cout<<s[i];
    if(i==3) cout<<" ";
  }
  cout<<endl;
  return 0;
}
```

## B - Touitsu
### 概要
 - 文字列$A,B,C$を, 次の操作で全て同じにする時の操作の最小値を求めよ
   - 文字列$A,B,C$の$i$文字目を任意の文字に変更する

### 解法
 - $i$文字目に対して, 文字列$A,B,C$が何であるかを確認する
   - `A[i] == B[i] == C[i]`ならば変更する必要はない
     - この時の操作回数は0
   - `A[i] == B[i] || A[i] == C[i] || B[i] == C[i]`ならば, 仲間はずれの1文字を変更すれば良い
     - この時の操作回数は1
   - それ以外は, 2文字変更して1文字に統合すれば良い
     - この時の操作回数は2
 - 以上の考察をコードに落とし込めば良い

### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64

signed main() {
  int n;cin>>n;
  string a,b,c; cin>>a>>b>>c;

  int ans = 0;
  for(int i=0;i<n;++i) {
    char ai=a[i],bi=b[i],ci=c[i];
    if (ai==bi && bi==ci) ;// 操作する必要なし
    else if(ai==bi || ai==ci || bi==ci) ++ans;
    else ans += 2;
  }

  cout<<ans<<endl;
  return 0;
}
```

## C - AtCoDeerくんと選挙速報 / AtCoDeer and Election Report
 - 無限にバグらせた
### 概要
 - 高橋くんと青木くんの票の比が$n$回与えられる
 - $n$回目の高橋くんと青木くんの票として考えられるものの最小値を求めよ
 - ただし, 次の制約を満たす
   - 最初に見た時には, 両者に少なくとも1票は入っていた
   - 票が減ることはない

### 解法
> 今高橋くんに$A$票, 青木くんに$B$票入っていて, 次に満たすべき比率が$x:y$だとすると, $A \leq nx \land B \leq ny$になるような最小のnを取れれば, 次にありうる最小の得票数は, $nx, ny$であることがわかります。

 - このような$n$は, $A/x$の切り上げと$B/y$の切り上げの最大値である
   - なぜなら, $A/x$の切り上げと$B/y$の切り上げが値として最小であり,かつ両方の票を減らさないようにするためには, 最大値をとればよいから
 - したがって, $n-1$回このような$n$を求めて票を更新していけばよい


### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64

signed main() {
  int n;cin>>n;
  int s,t;
  cin>>s>>t;
  for(int i=0;i<n-1;++i){
    int p,q;cin>>p>>q;
    // 切り上げは, {割る数-1}を加えてから割れば求められる
    int tmp = max((s+p-1)/p, (t+q-1)/q);
    s=tmp*p;
    t=tmp*q;
  }
  cout<<s+t<<endl;
  return 0;
}

```

## D - Candy Distribution
### 概要
 - $N$個の箱があり, $i$番目の箱には$A[i]$個のお菓子が入っている
 - 次の条件を満たす$(l,r)$の組の総数を求めよ
   - $A[l]+A[l+1]+...+A[r]$は$M$の倍数

### 解法
 - しゃくとり法かと思いきや違った
 - 連続区間なので, 累積和を取って$mod M$で分類してあげればよい
   - なぜなら, $mod M$が等しい要素間の和は$M$の倍数になるため
   - e.g.) 次の数列に対して, M=5の時を考える
   - a = {5 1 2 4 5 2 1}
   - 累積和 = {5 6 8 12 17 19 20}
   - 累積和 mod M = {0 1 3 2 2 4 0}
   - したがって, 0:2つ, 1:1つ, 3:1つ, 2:2つ, 4:1つという具合に分類できる
   - ここで, 1つ目の0と2つ目の0までの区間の和は$M$の倍数になっていることがわかる
     - ただし, 0に関しては0自身で$M$の倍数になりうることに留意したい
   - 同様に, 1つ目の2と2つ目の2までの区間の和も$M$の倍数になっていることがわかる
 - 以上の考察により, 区間の左端の選び方と右端の選び方で`{1+要素数-1}*{要素数-1}/2`の和で解が導出できる
   - ただし, `mod M = 0`に関しては要素1つで条件を満たせるので`{1+要素数}*{要素数}/2`にする必要がある
 
### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64

signed main() {
  int n,m;cin>>n>>m;
  vector<int> a(n),sm(n+1,0);

  for(int i=0;i<n;++i) {
    cin>>a[i];
    // mod Mで累積和をとる
    a[i]%=m;
    (sm[i+1] += sm[i] + a[i]) %= m;
  }

  // mod Mで分類してカウント
  map<int,int> mp;
  for(int i=0;i<n;++i) ++mp[sm[i+1]];

  int ans = 0;
  for(auto &&mi: mp){
    // 要素が0の時は別
    if(mi.first==0){
      ans += max((1+mi.second)*mi.second/2, 0LL);
    }else{
      ans += max((1+mi.second-1)*(mi.second-1)/2, 0LL);
    }
  }
  cout<<ans<<endl;
  
  return 0;
}
```

 - お疲れ様でした