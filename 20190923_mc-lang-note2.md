---
date: 2019-09-23
description: 'mc-lang-2 めも'
category:
 - めも
---

# mc-lang-02 note

[mc-lang-02](https://github.com/task4233/mc-lang-2)のメモです。

## 2.1 識別子をトークナイズする
識別子とは, 変数名や関数名のこと。

`def hoge()`で考えてみる。
この場合, **def**および**hoge**が識別子に該当する。

これらの識別子を認識するためには, 1文字目から見ていくのが良さそうである。文字列を順に記憶して, スペース等の別の記号が来たら識別子として登録すれば良い。

以下めも。

 - 実装はlexer.h
 - アルファベットか否かは[isalpha()](https://ja.cppreference.com/w/cpp/string/byte/isalpha)で確認できる
   - 大文字小文字のa-zならば非ゼロ, そうでなければゼロを返す
 - getNextChar(iFile)は次の文字を1つ読み込む
 - setIdentifier(hoge)でidentifierStrにhogeをセットする
   - 実装は[ここ](https://github.com/yamaguchi1024/mc-lang-2/blob/master/src/lexer.h#L95)でされている

## 2.2 識別子をパースしよう
>トークンが識別子の場合は、引数(変数)の参照か関数の呼び出しの為、引数の参照である場合はVariableExprASTを返し、関数呼び出しの場合はCallExprASTを返す。

[VariableExprAST](https://github.com/yamaguchi1024/mc-lang-2/blob/master/src/parser.h#L42-L49)は, 変数の名前を表すクラスである。そして, [CallExprAST](https://github.com/yamaguchi1024/mc-lang-2/blob/master/src/parser.h#L51-L62)は関数呼び出しを表すクラスである。

トークンが識別子の場合, [2.1](#2.1)で実装した"def"かそれ以外の文字列(hoge等の他の文字列)になっているはずである。識別子が前者か後者かで判断すれば良い。

`def hoge(x y)`で考えてみる。
この場合, まず識別子として"def"が来るので, **関数呼び出し**と認識する。次に識別子として"hoge"が来るので, 変数(関数名)として認識される。そして"("が認識され, 続く"x", "y"も同様に変数として認識される。最後に")"が認識されてこの行のパースが終了する。

以下めも。

 - 実装はparse.h
 - hoge, fuga: 変数
 - def hoge(fuga): 関数(def)
 - `Lexer lexer`は[mc.cで既に宣言されている](https://github.com/yamaguchi1024/mc-lang-2/blob/master/src/mc.cpp#L42)ので, getIdentifierは単にlexer.getIdentifier()で呼び出せる
 - Hogeクラスの新しいインスタンスのunique_ptrを作りたい場合, `llvm::make_unique< Hoge >(fuga)`のようにして生成できる
   - `fuga`はコンストラクタに渡す引数
 - unique_ptrはスマートポインタと呼ばれ, メモリアクセスと解放をするための所有権を1つのオブジェクトのみに許すポインタである
   - スマートポインタは, デストラクタで自動的にdeleteしてくれるので, メモリの漏洩がなく安全なメモリ管理ができる

## 2-3 関数のシグネチャをパースしよう
>2.2とほぼ同じ。CallExprASTではなくPrototypeASTを返し、引数同士の区切りが','ではなくgetNextToken()を呼ぶと直ぐにCurTokに次の引数(もしくは')')が入るという違いのみ。

先ほどの2-2は, 関数内部(body)部分のパースであった。それに対し, この2-13では関数のシグネチャ(関数名, 関数の引数といった関数の情報)をパースする。

`def hoge(x y)`で考えてみる。
まず, "def"は`lexer.getIdentifier()`で`tok_def`に変換されているのでスルーする。次に, 識別子"hoge"がきて, 関数名(Name)が認識される。そして, '('が認識され, 続く識別子"x", "y"が引数であることが認識される。最後に, ')'が認識されて, この行のパースが終了する。

以下めも

 - 実装はparse.h
 - std::vectorが保持するものが異なる
   - こちらのstd::vectorはstd::stringを保持する

## 2-4 引数のcodegenを実装してみよう
>NamedValuesの中にVariableExprAST::NameとマッチするValueがあるかチェックし、あったらそのValueを返す。

以下めも

 - 実装はcodegen.h
 - `std::map`はそのままアクセスすると, '0'が生成されてしまうのでそのままアクセスするのはNG
   - 代わりに[`std::map::count`](https://cpprefjp.github.io/reference/map/map/count.html)を用いると良い
   - 返り値が1の時に値が存在する

## 2-5 関数呼び出しのcodegenを実装してみよう
関数呼び出し元のcodegen()を実装する。2. で`llvm::Function::arg_size`を比較しているのは, オーバーロードされていた時に区別をつけるため。関数名および引数を用いて関数呼び出しに該当する`Builder.CreateCall()`を呼び出す。

以下めも

 - 実装はcodegen.h
 - calleeは`CallExprAST::callee`と書く必要はなく, 単に`callee`のみでよい
   - クラス内でprivateな変数は共有されるので
 - [CreateCall(FunctionCallee callee, ArrayRef< Value* > Args, const Twine& Name)](https://llvm.org/doxygen/classllvm_1_1IRBuilder.html#a5f14bbaf77b70bbb42e73d7c2900f050)の順に呼び出す

## 2-6 C++を用いてELFファイルを作り, 実行してみよう
以下のコマンドを実行するだけ

```
./mc test/test4.mc
clang++-8 main.cpp output.o -o main
./main
```