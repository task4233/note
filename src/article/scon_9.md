---
date: 2019-04-04
description: '芝浦ばちゃ#9'
tags:
 - 競プロ
---

# [芝浦ばちゃ#9](https://not-522.appspot.com/contest/5140556057411584)

## A - 居合を終え、青い絵を覆う / UOIAUAI
### 概要
 - 英小文字cがvowel(a/i/u/e/o)ならばvowel,そうでなければconsonantを出力せよ 

### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;

int main(){
  char c; cin>>c;
  switch(c){
  case 'a':
  case 'i':
  case 'u':
  case 'e':
  case 'o':
    cout<<"vowel"<<endl;
    break;
  default:
    cout<<"consonant"<<endl;
    break;
  }
  return 0;
}
```

## B - Not Found
### 概要
 - 文字列$S$に含まれない英小文字のうち, 辞書式最小のものを出力せよ
 - そのような英小文字が存在しない場合は, `None`を出力せよ

### 解法
 - 26文字の英小文字(a〜z)について, 数え上げれば良い
 - その後, 1回以上使われた文字の存在を確認すればよい

### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64

signed main() {
  string s; cin>>s;
  vector<int> cnt(26,0);
  for(auto &&si: s){
    ++cnt[si-'a'];
  }

  for(int i=0;i<26;++i){
    if(cnt[i]>0) continue;
    // 文字コードで'a'からiだけずれている英小文字を出力
    printf("%c\n", 'a'+i);
    return 0;
  }
  cout<<"None"<<endl;
  return 0;
}
```

## A - Shrinking
### 概要
 - 英小文字からなる文字列$s$が与えられる
 - 次の操作をして$s$が単一の文字のみからなるようにする時の, 最小の操作回数を求めよ
   - 長さ$N$の文字列$t$を長さ$N-1$の文字列$t'$に変更する
   - この時, $t'$の$i$文字目は, $t$の$i, i+1$文字目のどちらかである

::: tip e.g.)
 - `abcb`に1度の操作を加えると
 - `bbb`にすることができる
   - `a` $\rightarrow$ `b` (`abcb`の`b`を1つずらして持ってきた($i+1$文字目を採用))
   - `b` $\rightarrow$ `b` (`abcb`の`b`をそのまま持ってきた($i$文字目を採用))
   - `c` $\rightarrow$ `b` (`abcb`の`b`を1つずらして持ってきた($i+1$文字目を採用))
:::

### 解法
 - 制約が `|s|≦100`とゆるゆるなので, 全探索したくなります(なります)
 - **全探索** とは, 具体的にa〜zの26文字全てで条件が満たせるかを **全** て **探索** することです


### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64
constexpr int INF = 1LL<<60;

signed main() {
  string s; cin>>s;
  vector<int> cnt(26,0);
  for(int i=0;i<s.size();++i){
    // 出現する文字数をカウント
    ++cnt[s[i]-'a'];
  }
 
  int ans = INF;
  for(int i=0;i<26;++i){
    // 出現しなかった文字はスルー
    if(!cnt[i]) continue;

    string cpy_s = s;
    int cnt = 0;

    // breakを含んでいるので, 兵庫県警には捕まりません
    while(true){
      // 全ての文字が同じ文字の時はbreak
      if(string(cpy_s.size(), cpy_s[0])==cpy_s) break;

      // i文字目かi+1文字目に'a'+iがあれば, それに変更(操作)
      for(int j=0;j<cpy_s.size();++j){
        if(cpy_s[j+1]=='a'+i || cpy_s[j]=='a'+i) cpy_s[j]='a'+i;
      }
      // 末尾を削除
      cpy_s.pop_back();
      ++cnt;
    }
    ans = min(ans,cnt);
  }
  cout<<ans<<endl;
}
```

## C - 検索
### 概要
 - $N$個の文字列$S_i$が与えられる
 - 文字列$T$で **検索** すると, $S_i$の中から先頭$|T|$文字が一致している文字列が検索結果として得られる
 - $A_1$, $A_2$, ..., $A_k$番目の文字列だけを検索結果として得たい時,  そのような検索文字列$|T|$が存在するか判定し, 存在する場合は長さが最小のものを求めよ

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