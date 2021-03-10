---
date: 2019-03-28
description: '芝浦ばちゃ#4'
tags:
 - 競プロ
 - AtCoder
---

# [芝浦ばちゃ#4](https://not-522.appspot.com/contest/5733926744096768)

## A - ABC333
### 概要
 - 整数$A, B$が与えられた時に, $A \times B \times C$が奇数となるような$C$が存在するか判定せよ

### 解法
 - 少し考えると, $A,B,C$の積が奇数 $\Longleftrightarrow$ $A,B,C$は全てが奇数である
 - したがって, $A$と$B$が両方奇数の時は`Yes`, それ以外は`No`

### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64

signed main() {
  int a,b;
  cin>>a>>b;
  bool ok = (a%2 && b%2);
  cout<<(ok?"Yes":"No")<<endl;
  return 0;
}

```

## B - AtCoDeerくんとボール色塗り / Painting Balls with AtCoDeer
### 概要
 - $N$個のボールを$K$種類の色で塗る
 - 隣り合ったボールは異なっていなければならない
 - この時の塗り方は何通りあるか求めよ

### 解法
 - 端のボールの塗り方が$K$通り, その隣のボールの塗り方は$K-1$通り, その隣も$K-1$通り, (以下略)
 - したがって, 塗り方は$K * (K-1) * ...$としていけば求められる

### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64

signed main() {
  int n,k; cin>>n>>k;
  int ans = k;
  for(int i=0;i<n-1;++i) {
    ans *= (k-1);
  }
  cout<<ans<<endl;
  return 0;
}
```

## C - pushpush
### 概要
 - 長さ$N$の数列$a$が与えられて, $n$回つぎの操作を行った後にできる数列$b$を求めよ
   - $i$番目の要素を数列bの末尾に追加する
   - 追加した後に数列$b$を逆向きにする

### 解法
 - 愚直に操作をすると, $O(n^2)$になる
 - すこし考えると, $i$が奇数の時には末尾に, $i$が偶数の時には先頭に追加すればよいことがわかる
 - ただし, 操作する回数nが奇数の時は出力する数列が逆向きになっているので注意

### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64

vector<int> ans;
signed main() {
  int n;cin>>n;
  deque<int> q;
  for(int i=0;i<n;++i) {
    int a;cin>>a;
    if(i%2) {
      q.push_front(a);
    }else{
      q.push_back(a);
    }
  }

  for_each(q.begin(), q.end(), [](int x){
                                 ans.push_back(x);
                               });
  
  if(n%2==1) reverse(ans.begin(),ans.end());
  
  bool isFirst = true;
  for(int i=0;i<n;++i){
    if(isFirst) isFirst = false;
    else cout<<" ";
    cout<<ans[i];
  }
  cout<<endl;
  
  return 0;
}
```

## D - Match Matching
### 概要
 - $N$本のマッチを使って作れる整数の最大値を求めよ
 - ただし, 数字 1,2,3,4,5,6,7,8,9 を1つ作るには、それぞれちょうど 2,5,5,4,5,6,3,7,6 本のマッチ棒を使う

### 解法
 - 典型的なDP
 - 考え方はつぎの通り

1. 「$N$本のマッチを使って作れる整数の最大値」を求めたい

2. 仮に$1$という数字を使用する時,   
「$N-1$本のマッチを使って作れる最大値」が分かれば,  
「$N$本のマッチを使って作れる整数の最大値」も求められるはず

3. さらに$1$という数字を使用する場合,  
「$N-2$本のマッチを使って作れる最大値」が分かれば,   
「$N-1$本のマッチを使って作れる整数の最大値」と「$N$本のマッチを使って作れる最大値」も求められるはず

4. これを何回も繰り返すと,   
「$0$本のマッチを使って作れる最大値(これは当然0)」が分かれば,   
「$0$〜$N$本のマッチを使って作れる最大値」がわかるはず!
 
 - この上で, DPテーブルをつぎのように定義する
```
dp[i] := ちょうどi本のマッチを使って作れる整数の最大値(文字列)
```

 - すると, DPの遷移はつぎのようになる
``` 
dp[i] = max(dp[i], 足したい数字 + dp[i-{足したい数字を作るための本数}])
```
   - ただし, 文字列で比較するので自分でmax関数の代わりを作る必要がある
   - この部分の実装は, 過去のABCのB問題で出題されているので解いてみると良いかも
     - [B - Comparison](https://atcoder.jp/contests/abc059/tasks)

### 提出コード
```cpp
#include <bits/stdc++.h>
using namespace std;
using int64 = long long;
#define int int64

string dp[10101];
int cost[10] = {10101010101,2,5,5,4,5,6,3,7,6};


bool check(string p, string q){
  if(p.size()==q.size()) return p>q;
  return p.size() > q.size();
}

signed main() {
  int n,m;cin>>n>>m;
  vector<int> a(m);
  for(int i=0;i<m;++i) cin>>a[i];

  // 降順にソート
  sort(a.begin(), a.end());
  reverse(a.begin(), a.end());
  
  fill_n(dp,10101,"0");
  dp[0] = "";
  for(int i=0;i<=n;++i){
    for(int j=0;j<m;++j){

      if(i-cost[a[j]]>=0){
        if(dp[i-cost[a[j]]]=="0") continue;

        string tmp = to_string(a[j]) + dp[i-cost[a[j]]];
        // 新しく作った整数が元のものより大きかったら更新
        if(check(tmp, dp[i])) {
          dp[i] = tmp;
        }
      }
    }
  }

  string ans = dp[n];
  cout<<ans<<endl;
  
  return 0;
}
```

# References
 - [芝浦ばちゃ#4](https://not-522.appspot.com/contest/5733926744096768)
 - [std::deque - C++日本語リファレンス](https://cpprefjp.github.io/reference/deque/deque.html)
