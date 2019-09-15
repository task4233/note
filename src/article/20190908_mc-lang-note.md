---
date: 2019-09-15
description: 'mc-lang-1のリソースメモ'
category:
 - めも
---

# mc-lang 1 20190908
 - mc-lang全般に含まれているリソースまとめです。
 - https://github.com/task4233/mc-lang-1

# 追加した仕様
 - `#`でコメントアウト
 - カッコの実装
 - 二項演算(+,-,*,/)の実yo

# lexer.h
 - 字句解析用ヘッダ
 - このセクションでは、Lexerというテキストから「数字」や「演算子」をまとまり毎に分割するクラスを実装している。
 - 全体的な流れとしては、gettokをParserから呼ぶことにより「次のトークン」を読み、それが数値リテラルだった場合はnumValという変数にセットする。
## variables
 - Token
   - 構造体

|名称|詳細|
|:-:|:-:|
|tok_eof|EOFトークン(-1)|
|tok_number|値を格納|

## functions
 - getIdentifier()
   - getter

## class
### Lexer
#### Public
 - gettok()メソッド
   - トークンを取得する
   - #やスペース等をスルーする
 - getNumVal
   - numValのゲッター
 - setNumVal
   - numValのセッター
 - initStream
   - fileNameのファイルをopen

#### Private
 - iFile
   - std::ifstream
 - numVal
   - 保持する数字
 - getNextChar
   - 1文字char型で入力

# parser.h
 - 構文解析用ヘッダ
 - ここのセクションでは、AST（構文解析木）の葉を定義している。
 - MCコンパイラの根幹であるクラスでLexerとCodeGenで使われている。
 - Lexerが次のトークンを取ってきて、それが数値リテラルであったらNumberASTに値を格納し、そのポインタを親ノードが保持する。
 - 全てのコードを無事にASTとして表現できたら、後述するcodegenを再帰的に呼び出す事によりオブジェクトファイルを生成する。

## variables
 - curTok
   - 読み取ったトークンを保持
 - getNextToken
   - lexer.hのgettok()
 - BinopPrecedence
   - mc.cppで定義した結合子の優先権を保持
## functions
 - GetTokPrecedence()
   - 二項演算子の結合度を取得
   - もし現在のトークンが二項演算子ならその結合度を返し、そうでないなら-1を返す。
 - LogError(const char *str)
   - エラーを表示しnullptrを返してくれるエラーハンドリング関数
 - ParseExpressions()
   - 数値リテラル/カッコ->二項演算子の順にパースできるかを確認してパースする
 - ParseNumberExpr()
   - 数値リテラルをパースして内部のexpressionのゆにぽを返す関数
 - ParseParenExpr
   - カッコ内部のexpressionをパースして内部のexpressionのゆにぽを返す関数
 - ParsePrimary()
   - NumberASTかカッコをパースするための関数を呼び出す関数
 - ParseBinOpRHS\(int CallerPrec, std::unique_ptr\<ExprAST\> LHS\)
   - 二項演算子をパースする関数
   - LHSが入った状態でよびだされ, LHSとRHSと二項演算子がペアになった状態で返す
 - ParseTopLevelExpr()
   - パーサーのトップレベル関数
   - まだ関数定義は実装しないので、今のmc言語では__anon_exprという関数がトップレベルに作られ、その中に全てのASTが入る

## class
### ExprAST
 - `5+2`や`2*10-2`等のexpressionを表すクラス

### NumberAST
 - `5`や`2`等の数値リテラルを表すクラス
 
#### public
 - *codegenをオーバーライド

#### private
 - Val
   - 数値の値を保持する変数 

### BinaryAST
 - `+`や`*`等の二項演算子を表すクラス
#### public
 - *codegenをオーバーライド

#### private
 - Op
   - char型のオペランド?
 - LHS(Left-hand side)/RHS(Right-hand side)
   - 左辺値/右辺値を指すゆにぽ

### PrototypeAST
 - 関数シグネチャーで、関数の名前と引数の名前を表すクラス
#### public
 - &getName()
   - 保持しているNameのアドレスを返す
#### private
 - Name
   - 関数名
   - std::string
 - Args
   - 引数
   - std::vector\<std::string\>
 
### FunctionAST
 - 関数のbody(C++で言うint foo) {...}の中身)を表すクラス

#### public
 - *codegen()

#### private
 - Proto
   - 関数の名前と引数を保持するオブジェクトのゆにぽ
   - std::unique_ptr\<PrototypeAST\>
 - Body
   - 関数の中身のexpressionを保持するオブジェクトのゆにぽ
   - std::unique_ptr\<ExprAST\>
