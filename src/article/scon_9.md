---
date: 2019-04-03
description: '芝浦ばちゃ#9'
category:
 - 競プロ
 - AtCoder
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
   - e.g.)
   - `abcb`に1度の操作を加えると
   - `bbb`にすることができる
     - `a` $\rightarrow$ `b` (`abcb`の`b`を1つずらして持ってきた($i+1$文字目を採用))
     - `b` $\rightarrow$ `b` (`abcb`の`b`をそのまま持ってきた($i$文字目を採用))
     - `c` $\rightarrow$ `b` (`abcb`の`b`を1つずらして持ってきた($i+1$文字目を採用))

### 解法
 - 制約が `|s|≦100`とゆるゆるなので, 全探索したくなります(なります)
 - **全探索** とは, 具体的にa〜zの26文字全てで条件が満たせるかを **全** て **探索** することです


### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64

signed main() {
  string s; cin>>s;
  vector<int> cnt(26,0);
  REP(i,s.size()){
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
 - 工事中...

### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64

signed main() {
  // Now Loading...
}
```

 - お疲れ様でした