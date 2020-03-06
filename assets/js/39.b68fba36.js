(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{249:function(e,a,t){"use strict";t.r(a);var s=t(0),l=Object(s.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("p",[e._v("--\ndate: 2020-01-07\ndescription: 'ShellCodeを書いてみる'\ncategory:")]),e._v(" "),t("ul",[t("li",[e._v("雑記")])]),e._v(" "),t("hr"),e._v(" "),t("h1",{attrs:{id:"shellcodeを書いてみる"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#shellcodeを書いてみる"}},[e._v("#")]),e._v(" ShellCodeを書いてみる")]),e._v(" "),t("h2",{attrs:{id:"environment"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#environment"}},[e._v("#")]),e._v(" environment")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("$ uname -a\nLinux localhost 5.3.0-kali3-amd64 #1 SMP Debian 5.3.15-1kali1 (2019-12-09) x86_64 GNU/Linux\n")])])]),t("h2",{attrs:{id:"syscall"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#syscall"}},[e._v("#")]),e._v(" syscall")]),e._v(" "),t("ul",[t("li",[e._v("32bit binary & x86 assembly")]),e._v(" "),t("li",[e._v("syscall\n"),t("ul",[t("li",[e._v("each syscall has a particular syscall number")]),e._v(" "),t("li",[e._v("then all other syscall parameters are loaded into other registers")]),e._v(" "),t("li",[e._v("lastly, CPU in kernel mode executes the syscall function by calling "),t("code",[e._v("0x80")])])])])]),e._v(" "),t("h2",{attrs:{id:"shellcode-in-c"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#shellcode-in-c"}},[e._v("#")]),e._v(" shellcode in C")]),e._v(" "),t("ul",[t("li",[e._v("use "),t("code",[e._v("execve()")]),e._v(", which executes the program pointed to by filename")]),e._v(" "),t("li",[e._v('we\'ll need to pass the filename "/bin/sh"\n'),t("ul",[t("li",[e._v('also argv which is an array of argument strings with the first string as "/bin/sh".')]),e._v(" "),t("li",[e._v("after that, we need not prepare other parameters, so let's set "),t("code",[e._v("NULL")])])])]),e._v(" "),t("li",[e._v("the program is below")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('#include <unistd.h>\n\nint main() {\n  char* argv = {"/bin/sh", NULL};\n  execve(argv[0], argv, NULL);\n  return 0;\n}\n')])])]),t("ul",[t("li",[e._v("let's run")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("# ./vuln\n# id \nuid=0(root) gid=0(root) groups=0(root)\n# tty \n/dev/pts/2\n# exit\n")])])]),t("ul",[t("li",[e._v("it works!")])]),e._v(" "),t("h2",{attrs:{id:"shellcode-in-assembly"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#shellcode-in-assembly"}},[e._v("#")]),e._v(" shellcode in assembly")]),e._v(" "),t("h2",{attrs:{id:"ref"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ref"}},[e._v("#")]),e._v(" ref")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://paraschetal.in/writing-your-own-shellcode",target:"_blank",rel:"noopener noreferrer"}},[e._v("Writing your own shellcode"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=l.exports}}]);