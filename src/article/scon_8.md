---
date: 2019-04-02
description: '芝浦ばちゃ#8'
category:
 - 競プロ
 - AtCoder
---

# [芝浦ばちゃ#8](https://not-522.appspot.com/contest/5467071148195840)

## A - Garden
### 概要
 - $A \times B$の畑に, 幅1の道を2本引いた時の畑の面積を求めよ
### 解法
 - 畑を平行移動すれば, $(A-1) \times (B-1)$となることがわかる

### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;

int main(){
  int a,b; cin>>a>>b;
  cout<<(max(0, (a-1)*(b-1)))<<endl;
  return 0;
}
```

## B - Snake Toy
### 概要
 - 長さが$l_i$である棒が$N$本ある
 - この中から$K$本選んだ時の長さの総和の最大値を求めよ

### 解法
 - 大きい順に選べば良いのは自明
 - したがって, ソートして大きい方から$K$本選んだものの総和が答え

### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64

signed main() {
  int n,k; cin>>n>>k;
  vector<int> l(n);
  for(int i=0;i<n;++i) cin>>l[i];

  sort(l.begin(), l.end(), greater<int>());

  int ans = 0;
  for(int i=0;i<k;++i) {
    ans += l[i];
  }
  cout<<ans<<endl;
  return 0;
}
```

## C - Big Array
 - 問題文を読みましょうね(自戒の念)
### 概要
 - 「数$a_i$を$b_i$個入れる」というクエリが$N$回渡される
 - **この挿入操作後の数列において**, $K$番目に小さい数を求めよ
### 解法
 - $N$個のクエリを全部実行した時に, 何の数字がいくつあるかをメモしておけば良い
   - そうすれば, 前から$K$個数えるだけで解が出るので

### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64

signed main() {
  int n,k;cin>>n>>k;
  
  map<int,int> mp;
  for(int i=0;i<n;++i){
    int a,b; cin>>a>>b;
    mp[a] += b;
  }

  int cnt=0,ans=-1;
  for(auto &&mi: mp){
    cnt += mi.second;
    if(cnt >= k) {
      ans = mi.first;
      break;
    }
  }
  cout<<ans<<endl;

  return 0;
}

```

## D - Katana Thrower
### 概要
 - $N$本の$KATANA$があり, 次の攻撃ができる
   - $a_i$のダメージを与える.その後, 繰り返し使える.
   - $b_i$のダメージを与える.その後, 二度と使用できない.
 - この時, $H$のダメージを与える際の最小の攻撃回数を求めよ

### 解法
 - 少し考えると, 繰り返し使用する$KATANA$は1本だけストックしておけば良く, 他の$KATANA$は投げてしまって良いことがわかる。
   - 経験値効率の良いクエストに潜り続けて, 効率の悪いダンジョンは1回だけ石回収しに行くみたいな感じ(違います)

 - したがって, 解法は次のとおり
   - 繰り返し使用する$a_i$の最大値を取得する
   -  $b_i$を大きい順にソートする
   - $a_i$の最大値よりも大きいものだけを投げる
   - 投げ終わったら, 残りは$a_i$の最大値を与え続ける

 
### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64

signed main() {
  int n,h; cin>>n>>h;

  vector<int> b(n);
  int _max=0;
  for(int i=0;i<n;++i) {
    int p,q; cin>>p>>q;
    _max = max(_max,p);
    b[i] = q;
  }
 
  sort(b.begin(), b.end(), greater<int>());
  
  int ans=0, sm=0;
  for(int i=0;i<n;++i) {
    // 降るよりも効率の良いKATANAがあれば, 投げる
    if(b[i] > _max){
      sm += b[i];
      ++ans;
    }
    if(sm >= h) break;
  }
 
  // 投げた後に, ひたすら効率の良いKATANAを降り続ける
  if(sm < h) ans += (h-sm + _max-1)/_max;
  cout<<ans<<endl;
  return 0;
}
```

 - お疲れ様でした