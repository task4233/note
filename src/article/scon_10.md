---
date: 2019-04-05
description: '芝浦ばちゃ#10'
tags:
 - 競プロ
---

# [芝浦ばちゃ#10](https://not-522.appspot.com/contest/5140397881819136)

## A - Programming Education
### 概要
 - `1`の時, `Hello World`を出力せよ
 - `2`の時, `A+B`を出力せよ

### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;

int main(){
  int n; cin>>n;
  if(n==1) cout<<"Hello World"<<endl;
  else {
    int a,b; cin>>a>>b;
    cout<<a+b<<endl;
  }
  return 0;
}
```

## A - Digits Sum
### 概要
 - 2つの正整数$A,B$の和$N$が与えられる
 - $A, B$の各桁の和の合計として考えられる最小値を求めよ

### 解法
 - 制約が10^5程度なので, 全ての$A+B=N$となるような$A,B$に対して全探索が可能
 - したがって, その中の最小値を求めればよい

### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64

int getSum(int n){
  int res = 0;
  string s = to_string(n);
  for(auto &&si: s){
    res += si-'0';
  }
  return res;
}

signed main() {
  int n; cin>>n;

  int ans = 1LL<<30;
  for(int i=1;i<=(n/2)+1;++i){
    ans = min(ans, getSum(i) + getSum(n-i));
  }
  cout<<ans<<endl;
  return 0;
}
```

## C - Train Ticket
### 概要
 - $A op1 B op2 C op3 D = 7$となるようなop1〜3の組を探し, 求めよ
 - op1〜3は, `+`または`-`とする

### 解法
 - op1〜3を全探索すれば良い
 - 色々書き方はあるが, 話題に出たbit全探索で書いてみる
   - bit全探索は, iビット目が立っているか否かを調べれば良い
 - 一部[ぺぺさんのコード](https://atcoder.jp/contests/abc079/submissions/4823902)を参考にした

::: tip bit全探索の判定

 - 次のどちらの記法も使用可能
   - (1<<i) & bit
   - (bit>>i) & 1
 - 個人的には, 2つ目をお勧めしたい
   - なぜなら(1<<i)は, i>29の時オーバーフローして正しく判定されない時があるため
   - (1LL<<i)と書けば良い話ではあるが
:::


### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64
constexpr int INF = 1LL<<60;

signed main() {
  string s; cin>>s;
  
  for(int bit=0;bit<(1<<3);++bit){
    int res = s[0]-'0';
    for(int i=0;i<3;++i){
      // iビット目が立っている時は+1, 立っていない時は-1をかけることで, +-としている
      res += ((bit>>i)&1?+1:-1) * (s[i+1]-'0');
    }
    if (res == 7) {
       // 解ができた時は出力
       cout<<s[0];
       for(int i=0;i<3;++i){
         // この書き方でもok
         cout<<(bit&(1<<i)?"+":"-")<<s[i+1];
       }
       cout<<"=7"<<endl;
       return 0;
    }
  }
  return 0;
}
```

## D - Decayed Bridges
### 概要
 - $N$個の島と$M$本の橋がある
 - $i$本目の橋は島$a_i$と$b_i$を結ぶ
 - 

### 解法
 - [editorial](https://img.atcoder.jp/yahoo-procon2017-qual/editorial.pdf)に沿って書いていく

 - 検索ワードを$|T|$とすると, 検索結果に出るか否かは次のように言い換えられる
   - サイト$v$が検索結果に出るとき, $S_v$の先頭$|T|$文字は$T$である

::: tip e.g.)
 - $T$ = "ab"の時, サイト$S_v$ = "abcde"が挙げられる
 - この時, $S_v$の先頭($|T|$=2)文字は, "ab"である
:::

   - サイト$v$が検索結果に出ないとき, $S_v$の先頭$|T|$文字は$T$でない

::: tip e.g.)
 - $T$ = "ab"の時, サイト$S_v$ = "adcde"が挙げられる
 - この時, $S_v$の先頭($|T|$=2)文字は, "ab"ではない
:::
 
 - ここで, 検索に出したいサイトを$r$とすると, 先ほどの条件を用いると以下のように言い換えられる
   - $S_r$が$T$を含む
     - これは, 先ほどの考察により分かる
   
   - サイト$v$を検索結果に出したいとき, $S_v$と$S_r$の共通接頭辞が$T$を含む

::: tip e.g.)
 - $T$ = "ab"の時, $S_r$ = "abcd"が挙げられる
 - ここで, $S_v$を"abcc"とすると, $S_v$と$S_r$の共通接頭辞は"abc"である
 - 共通接頭辞"abc"は"ab"を含んでいるので, $|T|$ = "ab"の時にサイト$S_v$は検索結果に表示される
:::

   - サイト$v$を検索結果に出したくないとき, $S_v$と$S_r$の共通接頭辞が$T$を含まない

::: tip e.g.)
 - $T$ = "ab"の時, $S_r$ = "abcd"が挙げられる
 - ここで, $S_v$を"accc"とすると, $S_v$と$S_r$の共通接頭辞は"a"である
 - 共通接頭辞"a"は"ab"を含んでいないので, $|T|$ = "ab"の時にサイト$S_v$は検索結果に表示されない
:::

 - 以上の考察により, $r$以外のサイト$v$について$S_v$と$S_r$の共通接頭辞の長さを$|L_v|$とする

::: tip e.g.)
 - $S_r$ = "abcd, $S_v$ = "abbd"の時, 共通接頭辞は"ab"である
 - したがって, $L_v$ = 2である
:::

 - すると, 条件はつぎのように言い換えられる
   - $S_r$が$T$を含む
     - これは, 先ほどの考察で触れた

   - サイト$v$を検索結果に出したいとき, $|L_v| \geq |T|$

::: tip e.g.)
 - $T$ = "ab", $S_r$ = "abcd"とする
 - $S_v$を検索結果に出したい時, $S_v$としては"abc"や"ab", "abcdefg"などが挙げられる
 - これらの文字列の特徴として, $L_v \geq |T|$であることがわかる
   - $S_v$ = "abc"の時, $L_v = 3 \geq 2$
   - $S_v$ = "ab"の時, $L_v = 2 \geq 2$
   - $S_v$ = "abcdefg"の時, $L_v = 4 \geq 2$
:::

   - サイト$v$を検索結果に出したくないとき, $|L_v| < |T|$

::: tip e.g.)
 - $T$ = "ab", $S_r$ = "abcd"とする
 - $S_v$を検索結果に出したい時, $S_v$としては"adc"や"a", "adcdefg"などが挙げられる
 - これらの文字列の特徴として, $L_v \geq |T|$であることがわかる
   - $S_v$ = "adc"の時, $L_v = 1 < 2$
   - $S_v$ = "a"の時, $L_v = 1 < 2$
   - $S_v$ = "adcdefg"の時, $L_v = 1 < 2$
:::

 - 以上の考察より, 検索結果に出したいサイトの$L_i$の最小値を$show\_min$,検索結果に出したくないサイトの$L_i$の最大値を$hide\_max$とすると, $T$の条件は次のようになる
   - $S_r$が$T$を含む
   - $hide\_max < |T| \leq show\_min$

 - これを実装すればよい

### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64

signed main() {
  int n,k;cin>>n>>k;
  // 0で初期化
  vector<int> a(n,0);
  int r;
  for(int i=0;i<k;++i) {
    cin>>r;
    // 表示したいものは1にする
    a[--r] = 1;
  }
  vector<string> s(n);
  for(int i=0;i<n;++i) cin>>s[i];

  // S_rが含まれているもののうち, 最大のものを求める
  string ans=s[r];
  for(int i=0;i<n;++i) {
    if(!a[i]) continue;
    int cnt = 0;
    for(int j=0;j<min(ans.size(), s[i].size());++j) {
      if(ans[j]==s[i][j]) ++cnt;
      else break;
    }
    // substrで再代入せずともresizeでおk
    ans.resize(cnt);
  }

  // S_rが含まれていないもののうち, 最大のものを求める
  int hide_max = -1;
  for(int i=0;i<n;++i) {
    if(a[i]) continue;
    int cnt = 0;
    // forループの条件より, hide_max < ans.size()が保証される
    for(int j=0;j<min(ans.size(), s[i].size());++j) {
      if(ans[j]==s[i][j]) ++cnt;
      else break;
    }
    hide_max = max(hide_max, cnt);
  }

  // hide_max ==show_mnとなった時, 条件を満たさない
  if(hide_max == ans.size()){
    cout<<-1<<endl;
  }else{
    // hide_maxが1度も更新されずhide_max=-1の時は, substr(0,0), すなわち空文字が出力される
    cout<<ans.substr(0,hide_max+1)<<endl;
  }

  return 0;
}
```

 - お疲れ様でした