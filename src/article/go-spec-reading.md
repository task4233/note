---
date: 2021-03-11
description: 'Go Language Specification 輪読会 リアルタイム翻訳チャレンジ'
tags:
 - Go
---

# Go Language Specification 輪読会
ref: https://golang.org/ref/spec

## もくじ
 - [Constants](#Constants)
 - [Types](#Types)
   - [String Types](#String-Types)
   - [Array Types](#Array-Types)
   - [Slice Types](#Slice-Types)
 - [Properties of Types and Values](#Properties-of-Types-and-Values)
   - [Assignability](#Assignability)
 - [Expressions](#Expressions)
   - [Method Values](#Method-Values)
   - [Index Expressions](#Index-Expressions)
   - [Slice Expressions](#Slice-Expressions)
   - [Type Assertions](#Type-Assertions)
   - [Calls](#Calls)


# Constants
> There are boolean constants, rune constants, integer constants, floating-point constants, complex constants, and string constants. Rune, integer, floating-point, and complex constants are collectively called numeric constants.

下記の定数がある
 - boolean constants
 - rune constants
 - integer constants
 - floating-point constants
 - complex constants
 - string constants

下記を総称してnumeric constantsと呼ぶ
 - rune constants
 - integer constants
 - floating-point constants
 - complex constants

> A constant value is represented by a rune, integer, floating-point, imaginary, or string literal, an identifier denoting a constant, a constant expression, a conversion with a result that is a constant, or the result value of some built-in functions such as unsafe.Sizeof applied to any value, cap or len applied to some expressions, real and imag applied to a complex constant and complex applied to numeric constants. The boolean truth values are represented by the predeclared constants true and false. The predeclared identifier iota denotes an integer constant.

定数値は
 - rune literal
 - integer literal
 - floating-point literal
 - imaginary literal
 - string literal
 - 定数を表す識別子
 - 定数式
 - 定数である結果を持つ変換
 - unsafe.Sizeofを任意の値に適用したもの
 - capまたはlenをいくつかの式に適用したもの
 - realおよびimagをcomplexに適用したもの
 - 複素数を数値定数に適用したもの
で表される

真偽値は事前に宣言されたtrueとfalseで表現される。宣言された識別子は整数の定数を表す。

> In general, complex constants are a form of constant expression and are discussed in that section.

一般に, 複素定数は定数式の形であり, そのセクションで議論されている。

> Numeric constants represent exact values of arbitrary precision and do not overflow. Consequently, there are no constants denoting the IEEE-754 negative zero, infinity, and not-a-number values.

数値定数は任意の精度で正確な値を表し, オーバーフローしない。従って, IEEE-754の負の0, 無限大, 数ではない値を表す定数は存在しない。

> Constants may be typed or untyped. Literal constants, true, false, iota, and certain constant expressions containing only untyped constant operands are untyped.

定数は型付けされていてもいなくても構わない。リテラル定数, true, false, iota, 型付けされていない定数オペランドの実を含む特定の定数式は型付けされていない。

> A constant may be given a type explicitly by a constant declaration or conversion, or implicitly when used in a variable declaration or an assignment or as an operand in an expression. It is an error if the constant value cannot be represented as a value of the respective type.

定数は, 定数の宣言や変換によって明示的に型が与えられたり, 変数の宣言や代入で使用されたり, 式のオペランドとして使用されたりすると暗黙的に型が与えられることがある。定数の値がそれぞれの型の値として表現できない場合はエラーとなる。

> An untyped constant has a default type which is the type to which the constant is implicitly converted in contexts where a typed value is required, for instance, in a short variable declaration such as i := 0 where there is no explicit type. The default type of an untyped constant is bool, rune, int, float64, complex128 or string respectively, depending on whether it is a boolean, rune, integer, floating-point, complex, or string constant.

型付けされていない定数にはデフォルトの型があり, これは型付けされた値が必要とされるコンテキスト, 例えば明示的な型が存在しない`i := 0`のような短い変数宣言において, 定数が暗黙のうちに変換される型です。

型付けされていない定数のデフォルトの型は, 
 - bool
 - rune
 - int
 - float64
 - complex128
 - string
で, それぞれに該当する定数型に応じてそれぞれの型になる。

> Implementation restriction: Although numeric constants have arbitrary precision in the language, a compiler may implement them using an internal representation with limited precision.
> That said, every implementation must

実装上の制限として, 数値定数は言語内で任意の精度を持っているが, コンパイラは限られた制度の内部表現を利用して実装することが出来る。つまり, 全ての実装は下記の通りである必要がある。

 - Represent integer constants with at least 256 bits.

> 少なくとも256ビットの整数定数を表現する

 - Represent floating-point constants, including the parts of a complex constant, with a mantissa of at least 256 bits and a signed binary exponent of at least 16 bits.

> 複素定数の部分を含む浮動小数点定数を, 256ビット以上の仮数と16ビット以上の符号付き2進数で表現する

 - Give an error if unable to represent an integer constant precisely.

> 整数定数を正確に表現できなかった場合はエラーとする

 - Give an error if unable to represent a floating-point or complex constant due to overflow.

> オーバーフローのために浮動小数点または複素定数を表現できなかった場合, エラーとする

 - Round to the nearest representable constant if unable to represent a floating-point or complex constant due to limits on precision.

> 制度に限界があるために, 浮動小数点または複素定数を表現できない場合は, 最も近い表現可能な定数に丸める


> These requirements apply both to literal constants and to the result of evaluating constant expressions.

これらの要件は, リテラル定数と定数式の評価方法の両方に適用される。

# Types
## String Types
 - 識別子をユーザが上書き可能

## Array types
 - constant representableはconstant which is representableの略
   - コンパイル時に決定されるint型で表現可能な非負の整数
 - 推論はinfer
 - arrayはアドレスを取って変更することが出来る
 - accessedはread可能とaddressedはメモリ番地を特定できる

## Slice types
 - descriptorは記述子
 - underlying arrayはsliceの背後にある配列のこと
   - 実際にデータを保持しているのがコイツ
 - sliceは長さがコンパイル時に決まらない
 - underlying arrayの途中にdescriptorがあることがあるので、indexが元の配列よりも小さくなることもある
 - 同じ配列から複数のスライスが作られても、ストレージは同じ
 - embedded fieldはフィールド名が書かれていないけど、型が書いてあるもの
 - Tはポインタ型じゃダメ
 - fieldかmethodをselectorとして使えるようになることを、昇格すると表現した？
 - method set
   - 宣言された方に対して、埋め込みフィールドで
   - それ以外の場合は無視される
 - 関数の初期化されていない変数の値はnilである

# Properties of Types and Values
## Assignability
> A value x is assignable to a variable of type T ("x is assignable to T") if one of the following conditions applies:

後述する状態の場合、値`x`は型`T`の変数に代入可能です(`x` is assignable to `T`と書く)


 - x's type is identical to T.

> `x`の型が`T`と同じ場合

 - x's type V and T have identical underlying types and at least one of V or T is not a defined type.

> `x`の型`V`と`T`が同じunderlying typeを持ち、少なくとも型`V`か`T`のいずれかがdefined typeでない場合

 - T is an interface type and x implements T.

> `T`がinterface typeで、`x`が`T`を実装している場合

 - x is a bidirectional channel value, T is a channel type, x's type V and T have identical element types, and at least one of V or T is not a defined type.

> `x`が双方向性チャネルの変数で、`T`がチャネル型で、`x`の型`V`と`T`が同じ要素型を持ち、少なくとも`V`と`T`のいずれかがdefined typeでない場合

 - x is the predeclared identifier nil and T is a pointer, function, slice, map, channel, or interface type.

> `x`が事前に宣言された識別子`nil`で、かつ`T`がポインタ, 関数, スライス, マップ, チャネル, もしくはインタフェース型の場合


 - x is an untyped constant representable by a value of type T.

> `x`が型`T`の値によってuntyped constantで表現可能である場合

# Expressions
## Method Values
> If the expression x has static type T and M is in the method set of type T, x.M is called a method value. The method value x.M is a function value that is callable with the same arguments as a method call of x.M. The expression x is evaluated and saved during the evaluation of the method value; the saved copy is then used as the receiver in any calls, which may be executed later.

式xが静的な型Tを持ち, Mが型Tのメソッドセットに属する時, x.Mはメソッド値と呼ばれる。メソッド値x.Mは, x.Mのメソッド呼び出しとして同じ引数で呼び出すことが出来る関数値である。式xはメソッド値の評価中に評価, 保存される。そして, 保存されたコピーはその時あらゆる呼び出しのレシーバとして用いられ, その呼び出しは後ほど実行されることもある。

> The type T may be an interface or non-interface type.

型Tはinterface型であってもなくても構わない。

> As in the discussion of method expressions above, consider a struct type T with two methods, Mv, whose receiver is of type T, and Mp, whose receiver is of type *T.

上記のメソッド式の議論と同様に, 2つのメソッドを持つ型Tの構造体について考えてみる。2つのメソッドとは, 型Tのレシーバを持つMvと型\*Tのレシーバを持つMpである。

```
// T はint型のフィールドaを持つ構造体。
type T struct {
	a int
}
// Mv はvalue receiverで実装されたメソッド。
func (tv  T) Mv(a int) int         { return 0 }  // value receiver
// Mp はpointer receiverで実装されたメソッド。
func (tp *T) Mp(f float32) float32 { return 1 }  // pointer receiver

var t T
var pt *T
func makeT() T
```

> The expression`t.Mv` yeilds a function value of type `func(int) int`.

式`t.Mv`は型`func(int) int`の関数値を生み出す。

> These two invocations are equivalent:

```
t.Mv(7)
f := t.Mv; f(7)
```

> Similarly, the expression `pt.Mp` yields a function value of type `func(float32) float32`.

同様に, 式`pt.Mp`は, 型`func(float32) float32`の関数値を生み出す。

> As with selectors, a reference to a non-interface method with a value receiver using a pointer will automatically dereference that pointer: pt.Mv is equivalent to (*pt).Mv.

セレクタと同様に, ポインタを用いる値レシーバを持つ, interfaceでないメソッドに対する参照は自動的にそのポインタをdereferenceする。すなわち, `pt.Mv`は`(*pt).Mv`と等価だということだ。

> As with method calls, a reference to a non-interface method with a pointer receiver using an addressable value will automatically take the address of that value: t.Mp is equivalent to (&t).Mp.

メソッド呼び出しと同様に, アドレス化可能な値を用いるポインタを持つ, interfaceでないメソッドに対する参照は, 自動的にその値のアドレスを取得する。すなわち, `t.Mp`は`(&t).Mp`と等価である。

```
f := t.Mv; f(7)   // like t.Mv(7)
f := pt.Mp; f(7)  // like pt.Mp(7)
f := pt.Mv; f(7)  // like (*pt).Mv(7)
f := t.Mp; f(7)   // like (&t).Mp(7)
f := makeT().Mp   // invalid: result of makeT() is not addressable
```

> Although the examples above use non-interface types, it is also legal to create a method value from a value of interface type.

上記の例はinterface型でないが, この例もまたinterface型の値からメソッド値を作成できる。

## Index Expressions
> A primary expression of then form `a[x]` donates the element of the array, pointer to array, slice, string or map a indexed by x. The value x is called the index or map key, respectively. The following rules apply:

`a[x]`という形のprimary expressionは, 配列, 配列へのポインタ, スライス, 文字列もしくはxによって指定されるマップaを表す。

> If a is not a map:
 - the index x must be of integer type or an untyped constant
 - a constant index must be non-negative and representable by a value of type int
 - a constant index that is untyped is given type int
 - the index x is in range if 0 <= x < len(a), otherwise it is out of range

もしaがマップでない場合,
 - インデックス`x`は整数型か型なし定数でなければならない
 - 定数のインデックスは, 負ではなくint型の値で表現できなければならない
 - 型付けされていない定数インデックスはint型が与えられます。
 - インデックス x は、0 <= x < len(a) の場合は範囲内にあり、そうでなければ範囲外です。

> For a of array type A:
 - a constant index must be in range
 - if x is out of range at run time, a run-time panic occurs
 - a[x] is the array element at index x and the type of a[x] is the element type of A

配列型Aのaについて, 
 - 定数のインデックスは範囲に入っていなければならない(compile errorになる)
 - 変数のxが範囲に入っていない場合はrun-time errorになる
 - `a[x]`はインデックス`x`の配列要素であり, `a[x]`の方はAの要素型である

> For a of pointer to array type:
 - a[x] is shorthand for (*a)[x]

配列型に対するポインタのaについて, 
 - `a[x]`は`(*a)[x]`の省略形である

> For a of slice type S:
 - if x is out of range at run time, a run-time panic occurs
 - a[x] is the slice element at index x and the type of a[x] is the element type of S

文字列型のSについて, 
 - `x`が範囲外ならrun-time panicになる
 - `a[x]`はインデックス`x`のスライス要素であり, `a[x]`の方はSの要素型である

> For a of string type:
 - a constant index must be in range if the string a is also constant
 - if x is out of range at run time, a run-time panic occurs
 - a[x] is the non-constant byte value at index x and the type of a[x] is byte
 - a[x] may not be assigned to

文字列型のaについて
 - `a`もまた定数ならば, 定数のインデックスは範囲に入っていなければならない
 - `x`が実行時に範囲外なら, run-time panicが発生する
 - `a[x]`はインデックス`x`の非定数バイトの値で, `a[x]`の方は`byte`であるInde
map型Mのaについて
 - `x`は, Mのキーの型に代入可能でなければなれない
 - そのmapにキー`x`を持つエントリが含まれる場合, `a[x]`はキー`x`のマップ要素であり, `a[x]`の型は`M`の要素型です
 - そのmapが`nil`か, そのようなエントリを含まない場合, Mの要素のためのゼロ値です

> Otherwise a[x] is illegal.

以上の例でなければ, `a[x]`は規約違反です。

> An index expression on a map a of type map[K]V used in an assignment or initialization of the special form yields an additional untyped boolean value. The value of ok is true if the key x is present in the map, and false otherwise.

次の特別な形式の代入か初期化で用いられる型`map[K]V`のmap`a`のインデックス式は, 追加の型無しboolean値を生み出す。
```
v, ok = a[x]
v, ok := a[x]
var v, ok = a[x]
```

> The value of ok is true if the key x is present in the map, and false otherwise.
Assigning to an element of a nil map causes a run-time panic.

okの値は, キーxがマップ中に存在する場合はtrueになり, それ以外はfalseになります。
`nil`のmap要素への代入は, run-time panicを引き起こす可能性があります。

## Slice Expressions
> Slice expressions construct a substring or slice from a string, array, pointer to array, or slice. There are two variants: a simple form that specifies a low and high bound, and a full form that also specifies a bound on the capacity.

スライス式は, 部分文字列かstring, array, arrayに対するポインタもしくはスライスからスライスを構成する。上限および下限を指定するシンプルな形式と, 上限および下限に加えて容量も指定する完全な形式の2つの形式がある。

### Simple slice expressions

> For a string, array, pointer to array, or slice a, the primary expression constructs a substring or slice. The indices low and high select which elements of operand a appear in the result. 

string, array, arrayに対するポインタ, スライス`a`について, primary expression`a[low:high]`は部分文字列かスライスを構成する。インデックスlowとhighは, どのオペランド`a`のどの要素が結果に表れるか選択する。その結果は, 0から始まるインデックスとhigh-lowと等しい長さを持つ。

> After slicing the array a, the slice s has type []int, length 3, capacity 4, and elements

下記のarray`a`のスライス後, スライスsは[]int型, 長さ3, 容量4, 下記の要素を持つ。

```
a := [5]int{1, 2, 3, 4, 5}
s := a[1:4]

s[0] == 2
s[1] == 3
s[2] == 4
```

> For convenience, any of the indices may be omitted. A missing low index defaults to zero; a missing high index defaults to the length of the sliced operand:

便宜上, インデックスのいずれかは省略することが出来る。下限のインデックスがない場合はゼロが初期値となり, 上限のインデックスがない場合はスライスされたオペランドの長さが初期値です。

```
a[2:]  // [2 : len(a)]と同義
a[:3]  // a[0 : 3]と同義
a[:]   // a[0 : len(a)]と同義
```

> If a is a pointer to an array, a[low : high] is shorthand for (*a)[low : high].

もし`a`がarrayに対するポインタの場合, `a[low:high]`は(*a)[low:high]を短く表現したものです。

> For arrays or strings, the indices are in range if 0 <= low <= high <= len(a), otherwise they are out of range. For slices, the upper index bound is the slice capacity cap(a) rather than the length. A constant index must be non-negative and representable by a value of type int; for arrays or constant strings, constant indices must also be in range. If both indices are constant, they must satisfy low <= high. If the indices are out of range at run time, a run-time panic occurs.

arrayか文字列について, インデックスは0<=low<=high<=len(a)の時が範囲内で, それ以外は範囲外です。スライスに関しては, 上限のインデックスは, len(a)というよりもスライスの容量cap(a)です。定数のインデックスは負の値以外でint型の値によって表現できる必要があります。言い換えると, arrays, 定数文字列, 定数のインデックスもまた範囲内にある必要がある。両方のインデックスが定数の場合, それらはlow<=highを満たします。もしインデックスが実行時に範囲外なら, run-time panicが起きます。

> Except for untyped strings, if the sliced operand is a string or slice, the result of the slice operation is a non-constant value of the same type as the operand. For untyped string operands the result is a non-constant value of type string. If the sliced operand is an array, it must be addressable and the result of the slice operation is a slice with the same element type as the array.

型無し文字列を除き, スライスされたオペランドが文字列かスライスならば, スライス操作の結果はオペランドと同じ型の非定数値になります。型無し文字列オペランドの場合, 結果は文字列の非定数値になります。もし, スライスされたオペランドがarrayならばaddressableで, スライス操作の結果は, arrayと同じ要素型を持つスライスになります。

> If the sliced operand of a valid slice expression is a nil slice, the result is a nil slice. Otherwise, if the result is a slice, it shares its underlying array with the operand.

もし正しいスライス式のスライスされたオペランドの場合, その結果はnil sliceになります。それ以外は, 結果がスライスならば, そのオペランドを持つunderlying arrayを共有します。

```
var a [10]int
s1 := a[3:7]   // s1のunderlying arrayはarray aであり, &s1[2] == &a[5]
s2 := s1[1:4]  // s2のunderlying arrayはarray aであるs1のunderlying arrayであり, &s2[1] == &a[5]
s2[1] = 42     // s2[1] == s1[2] == a[5] == 42であり, 全ての例はtheyは同じunderlying arrayの要素を参照します
```

### Full slice expressions
> For an array, pointer to array, or slice a (but not a string), the primary expression `a[low : high : max]` constructs a slice of the same type, and with the same length and elements as the simple slice expression `a[low : high]`. Additionally, it controls the resulting slice's capacity by setting it to `max - low`. Only the first index may be omitted; it defaults to 0. 

array, arrayに対するポインタ, スライス`a`(ただし, stringでない), primary expression `a[low : high : max]`は同じ型のスライスを構成し, これはsimple slice expressionsである`a[low : high]`として同じ長さと要素を持つ。加えて, 結果として得られるスライスの容量を`max - low`に設定することでコントロールする。最初のインデックスのみを省略でき、その場合のデフォルト値は0である。

> After slicing the array `a`, the slice `t` has type []int, length 2, capacity 4, and elements.


下記のarray `a`のスライス実行後, スライス`t`は型`[]int`で長さ2, 容量4であり, 下記の要素を持つ。


```
a := [5]int{1, 2, 3, 4, 5}
t := a[1:3:5]
t[0] == 2
t[1] == 3
```

> As for simple slice expressions, if a is a pointer to an array, a[low : high : max] is shorthand for (*a)[low : high : max]. If the sliced operand is an array, it must be addressable.

simple slice expressionsにおいて, もし`a`がarrayに対するポインタであれば, `a[low : high : max`は`(*a)[low : high : max]`の省略形である。もしスライスされたオペランドがarrayであれば, addressableでなければならない。


> The indices are in range if 0 <= low <= high <= max <= cap(a), otherwise they are out of range. A constant index must be non-negative and representable by a value of type int; for arrays, constant indices must also be in range. 

もし, `0 <= low <= high <= max <= cap(a)`なら, インデックスは範囲内であり、それ以外の場合は範囲外にある。定数のインデックスは非負かつint型の値によって表現可能でなければならない。そして, arrayにおいては定数のインデックスもまた範囲内でなければならない。

> If multiple indices are constant, the constants that are present must be in range relative to each other. If the indices are out of range at run time, a run-time panic occurs.

もし, 複数のインデックスが定数なら, 存在する定数はお互いに相対的に範囲内になければならない。もし実行時にインデックスが範囲外になると, run-time panicが発生する。

## Type Assertions
> For an expression `x` of interface type and a type `T`, the primary expression `x.(T)` asserts that x is not nil and that the value stored in `x` is of type `T`. The notation x.(T) is called a type assertion.

インターフェース型の式`x`と型`T`のprimary expressionについて, そのprimary expression `x.(T)`は, `x`がnilではなく`x`に格納されている値が型`T`のものであることを主張する。`x.(T)`という表記法は型アサーションと呼ばれる。

> More precisely, if T is not an interface type, x.(T) asserts that the dynamic type of x is identical to the type T. In this case, T must implement the (interface) type of x; otherwise the type assertion is invalid since it is not possible for x to store a value of type T. If T is an interface type, x.(T) asserts that the dynamic type of x implements the interface T.

より正確には, Tがインターフェース型でない場合, x.(T)はxの動的型が型Tと同じことを主張する。この場合, Tはxの(インタフェース)型を実装していなければならない。そうでない場合, xが型Tの値を格納することはできないので, 型アサーションは無効である。Tがインタフェース型の場合, x.(T)はxの動的型がインタフェースTを実装していることを主張する。

> If the type assertion holds, the value of the expression is the value stored in x and its type is T. If the type assertion is false, a run-time panic occurs. In other words, even though the dynamic type of x is known only at run time, the type of x.(T) is known to be T in a correct program.

もし型アサーションが成り立つなら, 式の値はxに格納されている値であり, その型はTである。もし型アサーションが無効な場合, run-time panicが発生する。言い換えれば, たとえxの動的型が実行時にしか分からないとしても, x.(T)の型はTであることは自明である。

```
var x interface{} = 7          // xは動的なint型と7を保持している
i := x.(int)                   // iはint型と値7を保持する

type I interface { m() }

func f(y I) {
	s := y.(string)        // 不正: stringはIを実装していない(メソッドmが無い)
	r := y.(io.Reader)     // rは型io.Readerを持ち, yの動的な型はIとio.Readerの両方を実装していなければならない
	…
}
```

> A type assertion used in an assignment or initialization of the special form

```
v, ok = x.(T)
v, ok := x.(T)
var v, ok = x.(T)
var v, ok T1 = x.(T)
```

> yields an additional untyped boolean value. The value of ok is true if the assertion holds. Otherwise it is false and the value of v is the zero value for type T. No run-time panic occurs in this case.

これらの, 特別な形式の代入か初期化に用いられる型アサーションはもう一つのuntyped bool値を生成する。okの値はアサーションが保持されていればtrueである。それ以外の場合はfalseであり, vの値は型Tのゼロ値である。この場合, run-time panicは発生しない。

## Calls
> Given an expression f of function type F, `f(a1, a2, … an)` calls f with arguments a1, a2, … an. Except for one special case, arguments must be single-valued expressions assignable to the parameter types of F and are evaluated before the function is called. The type of the expression is the result type of F. 

関数型`F`の式`f`が与えられた時、`f(a1, a3, ..., an)`は`f`を引数a1, a2, ..., anと共に呼び出す。1つの特別なケースを除いて, 引数は`F`のパラメータ型に代入可能な1つの値の式でなければならず、関数が呼び出される前に評価される。式の型は`F`の結果の型です。

> A method invocation is similar but the method itself is specified as a selector upon a value of the receiver type for the method.

メソッドの呼び出しも似ているが、メソッドの受信型の値に応じてメソッド自体がセレクタとして指定される。

```
math.Atan2(x, y)  // 関数の呼び出し
var pt *Point
pt.Scale(3.5)     // レシーバptを用いたメソッド呼び出し
```

> In a function call, the function value and arguments are evaluated in the usual order. After they are evaluated, the parameters of the call are passed by value to the function and the called function begins execution. The return parameters of the function are passed by value back to the calling function when the function returns.

関数呼び出しでは、関数の値と引数は通常の順序で評価される。これらが評価された後、呼び出しのパラメータは値によって関数に渡され、呼び出された関数の実行が開始される。関数の戻り値パラメータは、関数が戻ってきたときに呼び出した関数に値として渡される。

> Calling a nil function value causes a run-time panic.

nil関数の値の呼び出しは、run-time panicを引き起こす。

> As a special case, if the return values of a function or method g are equal in number and individually assignable to the parameters of another function or method f, then the call f(g(parameters_of_g)) will invoke f after binding the return values of g to the parameters of f in order. The call of f must contain no parameters other than the call of g, and g must have at least one return value. If f has a final ... parameter, it is assigned the return values of g that remain after assignment of regular parameters.

特殊なケースとして、ある関数またはメソッドgの戻り値の数が同じで、個々でもう一つの関数かメソッドｆのパラメータに代入可能である時、その呼び出しf(g(parameters_of_g))がfのパラメータに対して順番にgの戻り値をバインドした後にfが呼び出される。fの呼び出しにはgの呼び出し以外のパラメータが含まれてはならず、gは少なくとも1つの戻り値を持っていなければならない。fの末尾に...パラメータがある場合、通常のパラメータを代入した後に残るgの戻り値が代入される。

```go
func Split(s string, pos int) (string, string) {
	return s[0:pos], s[pos:]
}

func Join(s, t string) string {
	return s + t
}

if Join(Split(value, len(value)/2)) != value {
	log.Panic("test fails")
}
```

> A method call x.m() is valid if the method set of (the type of) x contains m and the argument list can be assigned to the parameter list of m. If x is addressable and &x's method set contains m, x.m() is shorthand for (&x).m():

メソッド呼び出しx.m()はその型のxのメソッドセットがmを含み、引数リストがmのパラメータリストに代入できる場合に有効である。xがアドレス化可能で、&xのメソッドセットがmを含む場合、x.m()は(&x).m()の略形式である。

```
var p Point
p.Scale(3.5)
```

> There is no distinct method type and there are no method literals.
明確なメソッドタイプはなく、メソッドリテラルもない。

## Passing arguments to ... parameters
> If f is variadic with a final parameter p of type ...T, then within f the type of p is equivalent to type []T. If f is invoked with no actual arguments for p, the value passed to p is nil. Otherwise, the value passed is a new slice of type []T with a new underlying array whose successive elements are the actual arguments, which all must be assignable to T. The length and capacity of the slice is therefore the number of arguments bound to p and may differ for each call site.

fが...Tの最終パラメータpを持つ可変長引数(valiadic)である場合、f内ではpの型は[]Tと同じになる。fがpの実際の引数を持たずに呼び出された場合、pに渡される値はnilである。そうでなければ、渡される値は新しいunderlying arrayを持つ[]T型の新しいスライスであり、underlying arrayの連続する要素は実際の引数であり、その実際の引数は全てTに代入可能である必要がある。スライスの長さと容量は、pにバインドされた引数の数であり、callsiteごとに異なる場合がある。

> Given the function and calls

```go
func Greeting(prefix string, who ...string)
Greeting("nobody")
Greeting("hello:", "Joe", "Anna", "Eileen")
```

within Greeting, who will have the value nil in the first call, and []string{"Joe", "Anna", "Eileen"} in the second.

次の関数とcallsが渡された時、Greetingというのが最初の呼び出しがnil valueを持ち、[]string{"Joe", "Anna", "Eileen"}が2番目に来る。


> If the final argument is assignable to a slice type []T, it is passed unchanged as the value for a ...T parameter if the argument is followed by .... In this case no new slice is created.

もし最後の引数が型[]Tのスライスに代入可能であるならば、もし引数が...に続く場合は、Tのパラメータの値として変化せずに渡される。この場合、新しいスライスは作られない。

> Given the slice s and call

```
s := []string{"James", "Jasmine"}
Greeting("goodbye:", s...)
```

within Greeting, who will have the same value as s with the same underlying array.

スライスsとcallであるGreetingにおいて、同じ...

### Floating-piont operators
> For floating-point and complex numbers, +x is the same as x, while -x is the negation of x. The result of a floating-point or complex division by zero is not specified beyond the IEEE-754 standard; whether a run-time panic occurs is implementation-specific.

浮動小数点数や複素数の場合、+xはxと同じ意味で、-xはxの反転である。浮動小数点数や複素数のゼロ除算の結果は、IEEE-754規格以上には規定されておらず、実行時エラーが発生するかどうかは実装依存である。

> An implementation may combine multiple floating-point operations into a single fused operation, possibly across statements, and produce a result that differs from the value obtained by executing and rounding the instructions individually. An explicit floating-point type conversion rounds to the precision of the target type, preventing fusion that would discard that rounding.

実装は、複数の浮動小数点演算を1つのまとめ、場合によって式をまだがって、個々の命令を実行して丸目て得られた値と異なる結果を生成することがある。明示的な浮動小数点型の変換では、対象となる型の精度に丸められ、その丸めを破棄する融合を防ぐことが出来る。

> For instance, some architectures provide a "fused multiply and add" (FMA) instruction that computes x*y + z without rounding the intermediate result x*y. These examples show when a Go implementation can use that instruction:

例えば、いくつかのアーキテクチャでは、x*y+zの中間結果x*yを丸めずに計算する、結合した積と和用の命令(FMA)が用意されている。これらの例は、Goの実装がその命令を使用できる場合を示している。

```
// FMA allowed for computing r, because x*y is not explicitly rounded:
r  = x*y + z
r  = z;   r += x*y
t  = x*y; r = t + z
*p = x*y; r = *p + z
r  = x*y + float64(z)

// FMA disallowed for computing r, because it would omit rounding of x*y:
r  = float64(x*y) + z
r  = z; r += float64(x*y)
t  = float64(x*y); r = t + z 
```

### String concatenation
> Strings can be concatenated using the + operator or the += assignment operator. String addition creates a new string by concatenating the operands.

Stringsは+オペレータ、もしくは+=式で結合できます。Stringは結合演算子によって新しいStringを作ります。

## Comparison Operators
> Comparison operators compare two operands and yield an untyped boolean value.

比較演算子は2つのオペランドを比較し、untyped boolean valueを産出する。

> In any comparison, the first operand must be assignable to the type of the second operand, or vice versa.
The equality operators == and != apply to operands that are comparable. The ordering operators <, <=, >, and >= apply to operands that are ordered. These terms and the result of the comparisons are defined as follows:

いかなる比較においても、第一オペランドは第二オペランドの型に代入可能でなければならず、その逆もまた然り。

等式演算子==と!=は、比較可能なオペランドに適用される。順序付け演算子、<, <=, >=はオペランドが順序付けられている場合に適用される。これらの用語と比較の結果は次のように定義される。


 - Boolean values are comparable. Two boolean values are equal if they are either both true or both false.
 - boolean valueは比較できる。boolean valuesの両方がtrueもしくはfalseであるとき、等しいと定義する

 - Integer values are comparable and ordered, in the usual way.
 - Integer valuesは通常の方法で比較でき、順序付けすることが出来る


 - Floating-point values are comparable and ordered, as defined by the IEEE-754 standard.
 - 浮動小数点数は、IEEE754標準化の定義されているように、比較でき、順序付けられる

 - Complex values are comparable. Two complex values u and v are equal if both real(u) == real(v) and imag(u) == imag(v).
 - 複素数は比較可能である。2つの複素数u,vは実数と虚数の両方が等しいとき、等しいと定義される。

 - String values are comparable and ordered, lexically byte-wise.
 - 文字列は語彙的にはバイト単位で比較可能で順序付けられます

 - Pointer values are comparable. Two pointer values are equal if they point to the same variable or if both have value nil. Pointers to distinct zero-size variables may or may not be equal.
 - ポインタ値は比較可能である。2つのポインタ値はそれぞれが同じ値を指すか、両方のポインタがnil値を持つときに等しいと定義する、異なるゼロサイズ変数へのポインタは等しいときもあれば等しくない時もある。

 - Channel values are comparable. Two channel values are equal if they were created by the same call to make or if both have value nil.
 - チェネル値は比較可能である。2つのチャネル値はmakeの同じ呼び出しによって作成された場合、または両方とも値がnilの場合は等しいと定義する

 - Interface values are comparable. Two interface values are equal if they have identical dynamic types and equal dynamic values or if both have value nil.
 - interface値は比較可能である。2つのinterface値は、それらが同一の動的型をもつ場合、または両方の値がnilの場合に等しいt定義される。

 - A value x of non-interface type X and a value t of interface type T are comparable when values of type X are comparable and X implements T. They are equal if t's dynamic type is identical to X and t's dynamic value is equal to x.
 - インタフェース型でないXの値xとインタフェース型Tの値tは、型Xの値が比較可能であり、XがTを実装している時に比較可能である
 - tの動的型がXと等しく、tの動的値がxと等しくなる時に等しくなる

 - Struct values are comparable if all their fields are comparable. Two struct values are equal if their corresponding non-blank fields are equal.
 - Struct値は、ソレラのフィールドが全て比較できる時に比較可能である
 - 2つのstruct値は、一致する空でないフィールドが等しいときに、等しくなる

 - Array values are comparable if values of the array element type are comparable. Two array values are equal if their corresponding elements are equal.
 - 配列値は、配列要素の値が比較可能であるとき、比較可能である
 - 2つの配列値は一致する要素が等しい場合、等しい

the same call?


4240806946
