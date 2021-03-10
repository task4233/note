---
date: 2019-02-14
description: 'ABC116-C'
tags:
 - 競プロ
 - AtCoder
---

# [ABC116 C - Grand Garden](https://atcoder.jp/contests/abc116/tasks/abc116_c)
## 概要
最初に高さ$0$の花が$N$本ある。
今, この$N$本の花の高さを$h[i]$にしたい.
「水やり」の操作が以下のように定義される時, 最小の水やりの回数を求めよ.

## 解法
まず制約を確認すると, $N$も$h_i$も最大値が$10^2$なので, $O(N^4)$程度までループで間に合いそうなことが分かる.

テストケースを手でごにょごにょすると, $1 2 2 1$のように単調増加・単調減少の数字列に関して, その最大値を減じれば良いことが分かる.

ただし, 単調増加・単調減少を調べるのも良いが, 制約が緩いので両端が$0$であるような部分列に対して$1$ずつ減じていけば良いことが分かる.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main(){
  int n; cin>>n;
  vector<int> h(n);
  for(int i=0;i<n;++i) cin>>h[i];
  
  int ans=0;
  // [l, r)の区間は全て正
  for(int l=0;l<n;++l){
    while(h[l]>0){
      int r;
      for(r=l+1;r<n;++r){
        if(h[r]==0)break;
      }
      
      // ここで閉じている左端もついでに引いておく
      for(int i=l;i<r;++i){
        --h[i];
      }
      ++ans;
    }
  }
  cout << ans << endl;
  return 0;
}
```

# 参考資料
 - [Editorial](https://img.atcoder.jp/abc116/editorial.pdf)
 - [ABC116 解説](https://misteer.hatenablog.com/entry/ABC116)