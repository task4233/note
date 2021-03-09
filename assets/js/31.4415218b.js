(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{390:function(e,t,r){"use strict";r.r(t);var a=r(49),_=Object(a.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"mc-lang-02-note"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#mc-lang-02-note"}},[e._v("#")]),e._v(" mc-lang-02 note")]),e._v(" "),r("p",[r("a",{attrs:{href:"https://github.com/task4233/mc-lang-2",target:"_blank",rel:"noopener noreferrer"}},[e._v("mc-lang-02"),r("OutboundLink")],1),e._v("のメモです。")]),e._v(" "),r("h2",{attrs:{id:"_2-1-識別子をトークナイズする"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-識別子をトークナイズする"}},[e._v("#")]),e._v(" 2.1 識別子をトークナイズする")]),e._v(" "),r("p",[e._v("識別子とは, 変数名や関数名のこと。")]),e._v(" "),r("p",[r("code",[e._v("def hoge()")]),e._v("で考えてみる。\nこの場合, "),r("strong",[e._v("def")]),e._v("および"),r("strong",[e._v("hoge")]),e._v("が識別子に該当する。")]),e._v(" "),r("p",[e._v("これらの識別子を認識するためには, 1文字目から見ていくのが良さそうである。文字列を順に記憶して, スペース等の別の記号が来たら識別子として登録すれば良い。")]),e._v(" "),r("p",[e._v("以下めも。")]),e._v(" "),r("ul",[r("li",[e._v("実装はlexer.h")]),e._v(" "),r("li",[e._v("アルファベットか否かは"),r("a",{attrs:{href:"https://ja.cppreference.com/w/cpp/string/byte/isalpha",target:"_blank",rel:"noopener noreferrer"}},[e._v("isalpha()"),r("OutboundLink")],1),e._v("で確認できる\n"),r("ul",[r("li",[e._v("大文字小文字のa-zならば非ゼロ, そうでなければゼロを返す")])])]),e._v(" "),r("li",[e._v("getNextChar(iFile)は次の文字を1つ読み込む")]),e._v(" "),r("li",[e._v("setIdentifier(hoge)でidentifierStrにhogeをセットする\n"),r("ul",[r("li",[e._v("実装は"),r("a",{attrs:{href:"https://github.com/yamaguchi1024/mc-lang-2/blob/master/src/lexer.h#L95",target:"_blank",rel:"noopener noreferrer"}},[e._v("ここ"),r("OutboundLink")],1),e._v("でされている")])])])]),e._v(" "),r("h2",{attrs:{id:"_2-2-識別子をパースしよう"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-識別子をパースしよう"}},[e._v("#")]),e._v(" 2.2 識別子をパースしよう")]),e._v(" "),r("blockquote",[r("p",[e._v("トークンが識別子の場合は、引数(変数)の参照か関数の呼び出しの為、引数の参照である場合はVariableExprASTを返し、関数呼び出しの場合はCallExprASTを返す。")])]),e._v(" "),r("p",[r("a",{attrs:{href:"https://github.com/yamaguchi1024/mc-lang-2/blob/master/src/parser.h#L42-L49",target:"_blank",rel:"noopener noreferrer"}},[e._v("VariableExprAST"),r("OutboundLink")],1),e._v("は, 変数の名前を表すクラスである。そして, "),r("a",{attrs:{href:"https://github.com/yamaguchi1024/mc-lang-2/blob/master/src/parser.h#L51-L62",target:"_blank",rel:"noopener noreferrer"}},[e._v("CallExprAST"),r("OutboundLink")],1),e._v("は関数呼び出しを表すクラスである。")]),e._v(" "),r("p",[e._v("トークンが識別子の場合, "),r("a",{attrs:{href:"#2.1"}},[e._v("2.1")]),e._v('で実装した"def"かそれ以外の文字列(hoge等の他の文字列)になっているはずである。識別子が前者か後者かで判断すれば良い。')]),e._v(" "),r("p",[r("code",[e._v("def hoge(x y)")]),e._v('で考えてみる。\nこの場合, まず識別子として"def"が来るので, '),r("strong",[e._v("関数呼び出し")]),e._v('と認識する。次に識別子として"hoge"が来るので, 変数(関数名)として認識される。そして"("が認識され, 続く"x", "y"も同様に変数として認識される。最後に")"が認識されてこの行のパースが終了する。')]),e._v(" "),r("p",[e._v("以下めも。")]),e._v(" "),r("ul",[r("li",[e._v("実装はparse.h")]),e._v(" "),r("li",[e._v("hoge, fuga: 変数")]),e._v(" "),r("li",[e._v("def hoge(fuga): 関数(def)")]),e._v(" "),r("li",[r("code",[e._v("Lexer lexer")]),e._v("は"),r("a",{attrs:{href:"https://github.com/yamaguchi1024/mc-lang-2/blob/master/src/mc.cpp#L42",target:"_blank",rel:"noopener noreferrer"}},[e._v("mc.cで既に宣言されている"),r("OutboundLink")],1),e._v("ので, getIdentifierは単にlexer.getIdentifier()で呼び出せる")]),e._v(" "),r("li",[e._v("Hogeクラスの新しいインスタンスのunique_ptrを作りたい場合, "),r("code",[e._v("llvm::make_unique< Hoge >(fuga)")]),e._v("のようにして生成できる\n"),r("ul",[r("li",[r("code",[e._v("fuga")]),e._v("はコンストラクタに渡す引数")])])]),e._v(" "),r("li",[e._v("unique_ptrはスマートポインタと呼ばれ, メモリアクセスと解放をするための所有権を1つのオブジェクトのみに許すポインタである\n"),r("ul",[r("li",[e._v("スマートポインタは, デストラクタで自動的にdeleteしてくれるので, メモリの漏洩がなく安全なメモリ管理ができる")])])])]),e._v(" "),r("h2",{attrs:{id:"_2-3-関数のシグネチャをパースしよう"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-関数のシグネチャをパースしよう"}},[e._v("#")]),e._v(" 2-3 関数のシグネチャをパースしよう")]),e._v(" "),r("blockquote",[r("p",[e._v("2.2とほぼ同じ。CallExprASTではなくPrototypeASTを返し、引数同士の区切りが','ではなくgetNextToken()を呼ぶと直ぐにCurTokに次の引数(もしくは')')が入るという違いのみ。")])]),e._v(" "),r("p",[e._v("先ほどの2-2は, 関数内部(body)部分のパースであった。それに対し, この2-13では関数のシグネチャ(関数名, 関数の引数といった関数の情報)をパースする。")]),e._v(" "),r("p",[r("code",[e._v("def hoge(x y)")]),e._v('で考えてみる。\nまず, "def"は'),r("code",[e._v("lexer.getIdentifier()")]),e._v("で"),r("code",[e._v("tok_def")]),e._v('に変換されているのでスルーする。次に, 識別子"hoge"がきて, 関数名(Name)が認識される。そして, \'(\'が認識され, 続く識別子"x", "y"が引数であることが認識される。最後に, \')\'が認識されて, この行のパースが終了する。')]),e._v(" "),r("p",[e._v("以下めも")]),e._v(" "),r("ul",[r("li",[e._v("実装はparse.h")]),e._v(" "),r("li",[e._v("std::vectorが保持するものが異なる\n"),r("ul",[r("li",[e._v("こちらのstd::vectorはstd::stringを保持する")])])])]),e._v(" "),r("h2",{attrs:{id:"_2-4-引数のcodegenを実装してみよう"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-引数のcodegenを実装してみよう"}},[e._v("#")]),e._v(" 2-4 引数のcodegenを実装してみよう")]),e._v(" "),r("blockquote",[r("p",[e._v("NamedValuesの中にVariableExprAST::NameとマッチするValueがあるかチェックし、あったらそのValueを返す。")])]),e._v(" "),r("p",[e._v("以下めも")]),e._v(" "),r("ul",[r("li",[e._v("実装はcodegen.h")]),e._v(" "),r("li",[r("code",[e._v("std::map")]),e._v("はそのままアクセスすると, '0'が生成されてしまうのでそのままアクセスするのはNG\n"),r("ul",[r("li",[e._v("代わりに"),r("a",{attrs:{href:"https://cpprefjp.github.io/reference/map/map/count.html",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("std::map::count")]),r("OutboundLink")],1),e._v("を用いると良い")]),e._v(" "),r("li",[e._v("返り値が1の時に値が存在する")])])])]),e._v(" "),r("h2",{attrs:{id:"_2-5-関数呼び出しのcodegenを実装してみよう"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-5-関数呼び出しのcodegenを実装してみよう"}},[e._v("#")]),e._v(" 2-5 関数呼び出しのcodegenを実装してみよう")]),e._v(" "),r("p",[e._v("関数呼び出し元のcodegen()を実装する。2. で"),r("code",[e._v("llvm::Function::arg_size")]),e._v("を比較しているのは, オーバーロードされていた時に区別をつけるため。関数名および引数を用いて関数呼び出しに該当する"),r("code",[e._v("Builder.CreateCall()")]),e._v("を呼び出す。")]),e._v(" "),r("p",[e._v("以下めも")]),e._v(" "),r("ul",[r("li",[e._v("実装はcodegen.h")]),e._v(" "),r("li",[e._v("calleeは"),r("code",[e._v("CallExprAST::callee")]),e._v("と書く必要はなく, 単に"),r("code",[e._v("callee")]),e._v("のみでよい\n"),r("ul",[r("li",[e._v("クラス内でprivateな変数は共有されるので")])])]),e._v(" "),r("li",[r("a",{attrs:{href:"https://llvm.org/doxygen/classllvm_1_1IRBuilder.html#a5f14bbaf77b70bbb42e73d7c2900f050",target:"_blank",rel:"noopener noreferrer"}},[e._v("CreateCall(FunctionCallee callee, ArrayRef< Value* > Args, const Twine& Name)"),r("OutboundLink")],1),e._v("の順に呼び出す")])]),e._v(" "),r("h2",{attrs:{id:"_2-6-c-を用いてelfファイルを作り-実行してみよう"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-6-c-を用いてelfファイルを作り-実行してみよう"}},[e._v("#")]),e._v(" 2-6 C++を用いてELFファイルを作り, 実行してみよう")]),e._v(" "),r("p",[e._v("以下のコマンドを実行するだけ")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("./mc test/test4.mc\nclang++-8 main.cpp output.o -o main\n./main\n")])])])])}),[],!1,null,null,null);t.default=_.exports}}]);