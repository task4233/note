---
date: 2019-02-02
description: 'Cにおけるゴルフのテク'
tags:
 - codegolf
---
# Cにおけるゴルフのテク
## コンパイラ
GCCを使用すると, main節で型宣言なしに変数宣言できる.  
```c
main(a,b){scanf("%d%d",&a,&b);}
```

## #includeの省略
`printf`, `scanf`等の関数は省略できる(エラーが出るが)  

## mainの返り値の省略
`main`関数の返り値は省略できる.  
省略すると`int`が自動的に返り値として設定される.
```c
main(){...}
```

## if文
三項演算子を用いることで, 簡潔に書ける.
```c
// if(a>b) printf("big");
// else printf("small");
printf((a>b?"big":"small"));
```

## 文の省略
`,`で繋ぐことで, コンパイラが1文として判断してくれる.  
複数のステートメントを1行にできるため, if-else, 三項演算子と相性が良い.
```c
// swap
t=a,a=b,b=a;
```
