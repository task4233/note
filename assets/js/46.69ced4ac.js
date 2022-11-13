(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{310:function(t,s,a){"use strict";a.r(s);var n=a(10),r=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"seccon-ctf-2022-writeup"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#seccon-ctf-2022-writeup"}},[t._v("#")]),t._v(" SECCON CTF 2022 Writeup")]),t._v(" "),s("h2",{attrs:{id:"はじめに"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#はじめに"}},[t._v("#")]),t._v(" はじめに")]),t._v(" "),s("p",[t._v("2022/11/12〜13にかけて開催されたSECCON CTF 2022にチームtaskとして参加し243/726位でした。")]),t._v(" "),s("p",[t._v("revのwarmupであるbabycmpしか通せなかったためwriteupは不要かと思っていました。")]),t._v(" "),s("p",[t._v("しかし、他の参加者のwriteupを見ると、私のようにGDBで無理矢理解いている人がいなかったため、解法共有のためにwriteupを書くことにしました。")]),t._v(" "),s("h2",{attrs:{id:"rev-babycmp-176-solves-79pts"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rev-babycmp-176-solves-79pts"}},[t._v("#")]),t._v(" [Rev] babycmp(176 solves/79pts)")]),t._v(" "),s("blockquote",[s("p",[s("code",[t._v("baby_mode = 1")]),t._v(" 👶")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://dashboard.quals-score.seccon.jp/api/download?key=prod%2Fbabycmp%2Fchall.baby",target:"_blank",rel:"noopener noreferrer"}},[t._v("chall.baby"),s("OutboundLink")],1),t._v(" 214fb8d53720d5183ed0fa850d00c33adb310e60")])]),t._v(" "),s("p",[t._v("64bitのELFファイルで、コマンドライン引数に正しいFLAGを設定するとCorrectと表示される系の問題に見えます。")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("$ file chall.baby \nchall.baby: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=ded5cc024f968b3087bf5d3df8649d14714e7202, for GNU/Linux 3.2.0, not stripped\n$ ./chall.baby\nUsage: ./chall.baby FLAG\n$ ./chall.baby SECCON{hoge}\nWrong...\n")])])]),s("p",[t._v("Ghidraで解析すると、以下のif文がtrueならCorrectになるようです。しかし、これらのデコンパイル結果を見てもよく分かりませんでした。そこで、動的解析してみることにしました。")]),t._v(" "),s("p",[s("img",{attrs:{src:"SECCON%20CTF%202022%20Writeup%2006c66cb85bb74f439f392f34a7ce7e7d/Screen_Shot_2022-11-14_at_0.51.56.png",alt:"Screen Shot 2022-11-14 at 0.51.56.png"}})]),t._v(" "),s("p",[t._v("GDBの逆アセンブル結果を見るに")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("0x0000000000001271")]),t._v(" の "),s("code",[t._v("je")]),t._v(" 命令")]),t._v(" "),s("li",[s("code",[t._v("0x00000000000012b5")]),t._v(" の "),s("code",[t._v("jne")]),t._v(" 命令")]),t._v(" "),s("li",[s("code",[t._v("0x00000000000012c0")]),t._v(" の "),s("code",[t._v("jne")]),t._v(" 命令")])]),t._v(" "),s("p",[t._v("がそれぞれ条件を満たせば良いことが分かります。")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ gdb -q ./chall.baby\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("snip"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ngdb-peda$ disas main\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("snip"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n   0x0000000000001257 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+21"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("5")]),t._v(">")]),t._v(":\tmov    r12,QWORD PTR "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rbp+0x8"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n   0x000000000000125b "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+21"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("9")]),t._v(">")]),t._v(":\tmov    rax,QWORD PTR "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("r12"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n   0x000000000000125f "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+22"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("3")]),t._v(">")]),t._v(":\tmov    rdx,QWORD PTR "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("r12+0x8"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n   0x0000000000001264 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+22"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("8")]),t._v(">")]),t._v(":\txor    rax,QWORD PTR "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rsp+0x20"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" \n   0x0000000000001269 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+23"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("3")]),t._v(">")]),t._v(":\txor    rdx,QWORD PTR "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rsp+0x28"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n   0x000000000000126e "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+23"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("8")]),t._v(">")]),t._v(":\tor     rdx,rax\n   0x0000000000001271 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+24"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("1")]),t._v(">")]),t._v(":\tje     0x129e "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("main+28"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("6")]),t._v(">")]),t._v("         "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 1つ目の条件")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("snip"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("   \n   0x000000000000129e "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+28"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("6")]),t._v(">")]),t._v(":\tmov    rax,QWORD PTR "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("r12+0x10"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n   0x00000000000012a3 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+29"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("1")]),t._v(">")]),t._v(":\tmov    rdx,QWORD PTR "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("r12+0x18"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n   0x00000000000012a8 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+29"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("6")]),t._v(">")]),t._v(":\txor    rax,QWORD PTR "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rsp+0x30"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n   0x00000000000012ad "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+30"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("1")]),t._v(">")]),t._v(":\txor    rdx,QWORD PTR "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rsp+0x38"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n   0x00000000000012b2 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+30"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("6")]),t._v(">")]),t._v(":\tor     rdx,rax\n   0x00000000000012b5 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+30"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("9")]),t._v(">")]),t._v(":\tjne    0x1273 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("main+24"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("3")]),t._v(">")]),t._v("         "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 2つ目の条件")]),t._v("\n   0x00000000000012b7 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+31"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("1")]),t._v(">")]),t._v(":\tmov    eax,DWORD PTR "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rsp+0x40"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n   0x00000000000012bb "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+31"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("5")]),t._v(">")]),t._v(":\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("cmp")]),t._v("    DWORD PTR "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("r12+0x20"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(",eax\n   0x00000000000012c0 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+32"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("0")]),t._v(">")]),t._v(":\tjne    0x1273 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("main+24"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("3")]),t._v(">")]),t._v("         "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 3つ目の条件")]),t._v("\n   0x00000000000012c2 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+32"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("2")]),t._v(">")]),t._v(":\tlea    rdi,"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rip+0x1e1b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("        \n   0x00000000000012c9 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+32"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("9")]),t._v(">")]),t._v(":\txor    r12d,r12d\n   0x00000000000012cc "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("+33"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("2")]),t._v(">")]),t._v(":\tcall   0x1100 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("puts@plt"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("snip"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("そのために、それぞれの命令の前の "),s("code",[t._v("xor")]),t._v(" 命令および "),s("code",[t._v("cmp")]),t._v(" 命令にて以下を比較していることが分かります。最終的に、正しいFLAGがコマンドライン引数で渡された時に、これらのレジスタとスタック領域の値が一致するはずです。FLAGに利用できる文字種はRulesに書いてある通り、ASCIIの "),s("code",[t._v("0x20")]),t._v(" から "),s("code",[t._v("0x7e")]),t._v(" の間です。そのための1文字ずつリークさせることが可能です。")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("レジスタ")]),t._v(" "),s("th",[t._v("スタック領域")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("rax")]),t._v(" "),s("td",[t._v("QWORD PTR [rsp+0x20]")])]),t._v(" "),s("tr",[s("td",[t._v("rdx")]),t._v(" "),s("td",[t._v("QWORD PTR [rsp+0x28]")])]),t._v(" "),s("tr",[s("td",[t._v("rax")]),t._v(" "),s("td",[t._v("QWORD PTR [rsp+0x30]")])]),t._v(" "),s("tr",[s("td",[t._v("rdx")]),t._v(" "),s("td",[t._v("QWORD PTR [rsp+0x38]")])]),t._v(" "),s("tr",[s("td",[t._v("eax")]),t._v(" "),s("td",[t._v("DWORD PTR [rsp+0x40]")])])])]),t._v(" "),s("p",[t._v("その操作をするためのGDB Scriptがこちらです。 "),s("code",[t._v("FLAG=")]),t._v(" の部分16文字ずつしかリークできないので、少しずつ上書きしました。結果、FLAGを取得できました。")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" gdb\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" re\n\nFLAG"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 1st breakpoint")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('# breakpoint="0x555555555264"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# -> SECCON{y0u_f0und")]),t._v("\nFLAG"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'SECCON{y0u_f0und'")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 2nd breakpoint")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('# breakpoint="0x5555555552a8"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# -> SECCON{y0u_f0und_7h3_baby_flag_Y")]),t._v("\nFLAG"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'SECCON{y0u_f0und_7h3_baby_flag_Y'")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 3rd breakpoint")]),t._v("\nbreakpoint"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0x5555555552bb"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# # -> SECCON{y0u_f0und_7h3_baby_flag_YaY}")]),t._v("\n\ngdb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("execute"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string-interpolation"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v('f"b *')]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("breakpoint"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("range")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# flag format is SECCON{[\\x20-\\x7e]+}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" ch "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("range")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x20")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x7e")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("any")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("scheme "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" ch "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" scheme "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x27")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("continue")]),t._v("\n\n        tmp_flag "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" FLAG "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("chr")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("tmp_flag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    \n        gdb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("execute"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string-interpolation"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v("f\"r '")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("tmp_flag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'\"")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# rax = gdb.parse_and_eval('$rax')")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# rdx = gdb.parse_and_eval('$rdx')")]),t._v("\n        eax "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" gdb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("parse_and_eval"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'$eax'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n        i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" gdb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("inferiors"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n        rsp_list "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# offsetは0x20(rax) -> 0x28(rdx) -> 0x30(rax) -> 0x38(rdx) -> 0x40")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# y0uの0がうまく動いてなかった、なぜ？guessしてしまったけど")]),t._v("\n        padding "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x20")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# offset = 0x20 + padding")]),t._v("\n        offset "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x20")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" idx "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("range")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# stack_addr = gdb.parse_and_eval(f'$rsp+{hex(offset + idx)}')")]),t._v("\n            r12 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" gdb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("parse_and_eval"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'$r12'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n            stack_addr "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" gdb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("parse_and_eval"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string-interpolation"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v("f'")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("hex")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("r12"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" offset"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" idx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n            m "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("read_memory"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("stack_addr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n            rsp_list"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("append"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("m"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("hex")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# rax_list = re.split('(..)',format(int(rax), '016x'))[1::2]")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# rax_list.reverse()")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# rdx_list = re.split('(..)',format(int(rdx), '016x'))[1::2]")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# rdx_list.reverse()")]),t._v("\n        eax_list "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" re"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("split"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'(..)'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("format")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("eax"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'016x'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n        eax_list"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("reverse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('# print(f"rax: {rax_list}")')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('# print(f"rdx: {rdx_list}")')]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string-interpolation"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v('f"eax: ')]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("eax_list"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string-interpolation"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v('f"rsp: ')]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("rsp_list"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n        gdb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("execute"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'c'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n        is_ok "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("True")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" idx "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("range")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("len")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("tmp_flag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("padding"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# paddingの1の位が0の時はrax、8の時はrdxレジスタを参照する")]),t._v("\n            ra "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" eax_list"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("idx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n            sp "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" rsp_list"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("idx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string-interpolation"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v('f"ra: ')]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("ra"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v(", sp: ")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("sp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v(", ra==sp: ")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("ra"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v("sp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n            is_ok "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ra"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v("sp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("not")]),t._v(" is_ok"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("continue")]),t._v("\n        FLAG "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" tmp_flag\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string-interpolation"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v('f"OK!!!! ')]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("FLAG"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),t._v("\n")])])]),s("h2",{attrs:{id:"おわりに"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#おわりに"}},[t._v("#")]),t._v(" おわりに")]),t._v(" "),s("p",[t._v("あまり賢い解き方ではないですが、解けたのは嬉しかったです。Web問題の復習にはもう少し時間がかかりそうなので、それも終わったら復習記事を書こうと思います。")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://twitter.com/task4233/status/1591673054413094912?s=20&t=hABu5HZBk9yiez4FCmDPsQ",target:"_blank",rel:"noopener noreferrer"}},[t._v("TwitterのWeb問復習スレッド"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=r.exports}}]);