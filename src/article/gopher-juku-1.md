---
date: 2022-11-04
description: 'Gopher塾 #1 - Testingに参加した時の記録です。'
tags:
 - 記録
---

# Gopher塾 #1 - Testing 参加ログ

## はじめに

2022/11/3(木)に開催された****Gopher塾 #1 - Testing - DAY2****に参加しました。このイベントはGoのテストについて講義形式で学ぶイベントです。扱われた内容は[connpassのページ](https://tenntenn.connpass.com/event/262106/#:~:text=%E3%81%94%E8%A6%A7%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%80%82-,%E5%86%85%E5%AE%B9,-%E4%BB%A5%E4%B8%8B%E3%81%AE%E5%86%85%E5%AE%B9)をご覧ください。

本エントリでは、私が新たに知った/気づいたことを共有します。

### テストのカバレッジは何%程度にしておくと良いか

前提として、**カバレッジはあくまで参考にする数値**です。そのため、カバレッジだけに着目して数字を追いかけることに意味はなさそうです。

その上で、カバレッジを指標の1つとする場合でも、基準はプロジェクトに依存するとのことです。少なくとも60%は欲しく、80%程度あると望ましいとの話でした。テストが難しかったり不要だったりするロジックが存在するため、100%のカバレッジを目指す必要はありません。

### ErrorとFatalの使い分け

**後続の処理が実行不能になる場合はFatal、そうでない場合はErrorを使うと良い**とのことです。ただし、Fatalを実行すると内部的に `runtime.Goexit()` が実行されてしまうことに注意してください。一応、Error+即時returnを利用することもできますが、return後に後続の処理が実行される場合は代替にならないためクロージャ外でFatalを利用することが好ましいです。

### $ go testの-vオプション

**`-v` オプションを使うのはローカルでのデバッグにとどめ、CIでは理由がなければ付与しない方が良いのでは**ないか、とのことです。 理由としては、テスト失敗時の原因が見づらいこと、出力が増える分処理が遅くなることが挙げられます。

### カバレッジがどう計算されているか

`$ go test -cover` の実行時に、GoのCLIが以下のような計測用のコードを内部的に差し込みます。

```bash
$ go tool cover -mode=set a.go
//line a.go:1
package testbuild

func F() {GoCover.Count[0] = 1; // この行が実行された場合、Count[0]が1になる
	if true {GoCover.Count[1] = 1;
		println(true)
	}
}
```

この差し込まれたコードによって集計された情報をもとに、カバレッジが計算されています。

ちなみに、 `$ go test` のカバレッジで利用される指標はC0(命令網羅)です。他の指標には、C1(分岐網羅)、C2(条件網羅)があります。

ref: ****[いつも忘れてしまうC0/C1/C2カバレッジまとめ](https://tech.naturalmindo.com/notwork_coverage/)****

### gp: Go PlaygroundのCLIツール

[GitHubで公開されている](https://github.com/tenntenn/goplayground)Go PlaygroundのCLIツールです。ローカルのコードを共有したい時に便利です。

```bash
: installation
$ go install github.com/tenntenn/goplayground/cmd/gp@latest

: generate a url of a playground
$ gp share main_test.go
https://go.dev/play/p/zVM3DkjZj6s
```

### ループ変数にtt := ttが必要という話

Goには、以下のようなループ変数のイテレーションで、 `tt := tt` のようにコピーを生成しないと、1つの変数のみが参照されてしまうという問題があります。

```go
package main

import (
	"math"
	"testing"
)

func AddOne(num int) int {
	return num + 1
}

func TestAddOne(t *testing.T) {
	t.Parallel()

	cases := map[string]struct {
		arg  int
		want int
	}{
		"invalid case: 0=>0": {
			arg:  0,
			want: 0,
		},
		"5=>6": {
			arg:  5,
			want: 6,
		},
		"-1=>0": {
			arg:  -1,
			want: 0,
		},
		"MaxInt->MinInt": { // lol
			arg:  math.MaxInt,
			want: math.MinInt,
		},
	}

	for name, tt := range cases {
		// NOTE: ここでループ変数ttのコピーをしないと、次に来るt.Run()内の関数では同じ変数しか参照されない
		// tt := tt

		t.Run(name, func(t *testing.T) {
			t.Parallel()
			got := AddOne(tt.arg)
			if got != tt.want {
				t.Fatalf("failed addOne: want: %d, got: %d", tt.want, got)
			}
		})

	}
}
```

ref: [https://go.dev/play/p/aThJGJu46K2](https://go.dev/play/p/aThJGJu46K2)

熟練者でもミスすることがあるため、イテレーションごとに変数を生成する案がGoコントリビュータのRuss Cox(rsc)から提案されています。

ref: **[redefining for loop variable semantics](https://github.com/golang/go/discussions/56010)**

### testingパッケージの便利メソッド

初めて知ったのは [Cleanup](https://pkg.go.dev/testing#B.Cleanup) と [TempDir](https://pkg.go.dev/testing#B.TempDir) の2つです。

前者は、引数で渡された関数をテスト終了時に実行するメソッドです。 `defer` で終了処理を実装するとテスト関数終了時に実行されるため、 `t.Parallel()` によって順序性が保証されないテストとアンマッチである場合があります。そこで利用できるのが、この [Cleanup](https://pkg.go.dev/testing#B.Cleanup) メソッドです。

後者は、テスト時に作成された一時ディレクトリのパスを返すメソッドです。ここで生成された一時ディレクトリは、[Cleanup](https://pkg.go.dev/testing#B.Cleanup) 実行時に自動的に削除されます。

### txtar: 複数のファイルをまとめて扱うファイル形式

`-- ファイルパス --` を区切り文字として、1つのファイルに複数のファイルのデータを入れることで、まとめて扱うファイル形式です。Go Playgroundでも利用が可能です。

```go
package main

import "myprinter/myprinter"

func main() {
	myprinter.Print("hoge")
}
-- go.mod --
module myprinter
-- myprinter/myprinter.go --
package myprinter

import "fmt"

func Print(arg any) {
	fmt.Printf("[myprinter]: %v", arg)
}
```

ref: [https://go.dev/play/p/Hglypeavo5Q](https://go.dev/play/p/Hglypeavo5Q)

### Golden File Test

期待するデータを、文字列ではなくファイルで用意しておくテスト形式のことです。”Golden File Test” というテスト名は、用意されたファイルを Golden File と呼ぶことに由来するものです。

## おわりに

Goのテストにおける基礎に始まり、発展的な内容まで扱ってくださったので満足しています。

特に、Goのカバレッジ計算の実装方法の仕組みが一般的なFuzzerのそれと似ていたため、少しの感動がありました。と言うのも、Fuzzerは効率的に入力データを生成する必要があるために機械語やアセンブリレベルでコードをインサートするんですよね。発想がほとんど同じなのでなるほどなという気持ちになりました。

また、実装に関しての予想ですが、ソースコードのASTを構築してから各行にカウントするコードを挿入していそうだなと思いました。Goはastパッケージが優秀なので、ソースコードを入れるだけでシュッと解析してくれますし。実際に、私が以前開発した[コミットされないロガーであるdelog](https://github.com/task4233/dl)も、astパッケージの恩恵をかなり受けていました。

余談はさておき、[本イベントは11/23にも開催される](https://tenntenn.connpass.com/event/265342/)ようです。Goのテストに興味がある方は参加してみてはいかがでしょうか。