(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{248:function(t,r,e){"use strict";e.r(r);var o=e(0),s=Object(o.a)({},(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"smtpのポート25-465-smtps-587-2525について-めも"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#smtpのポート25-465-smtps-587-2525について-めも"}},[t._v("#")]),t._v(" smtpのポート25, 465(smtps), 587, 2525について めも")]),t._v(" "),e("p",[t._v("ふと思った。smtpのポートの使い分けってどうしているのだろう, と。")]),t._v(" "),e("p",[t._v("25はspamに使われやすいから587を使わレルようになったというのは知っていたが, どうも465もあるらしい。")]),t._v(" "),e("h2",{attrs:{id:"smtp-port-25-465-587-or-2525-–-how-to-choose-the-right-smtp-port"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#smtp-port-25-465-587-or-2525-–-how-to-choose-the-right-smtp-port"}},[t._v("#")]),t._v(" "),e("a",{attrs:{href:"https://pepipost.com/blog/25-465-587-2525-choose-the-right-smtp-port/",target:"_blank",rel:"noopener noreferrer"}},[t._v("SMTP Port 25, 465, 587 or 2525 – How to Choose The Right SMTP Port?"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("このサイトには, smtp(s)用のポートの概要と歴史について書かれていた。"),e("br"),t._v("\n私なりにまとめると, 以下の通りである。")]),t._v(" "),e("ul",[e("li",[t._v("smtp用にはPort 587を使った方が良い")]),t._v(" "),e("li",[t._v("Port 25はポートリレーに使われるデフォルトポート")]),t._v(" "),e("li",[t._v("Port 465はもはや使われるべきではない")]),t._v(" "),e("li",[t._v("Port 2525は他の全てのポートがブロックされている時に使われる")])]),t._v(" "),e("p",[t._v("また, それぞれのポートについて軽く説明を入れておく")]),t._v(" "),e("h3",{attrs:{id:"port-25"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#port-25"}},[t._v("#")]),t._v(" Port 25")]),t._v(" "),e("ul",[e("li",[t._v("1982年の8月にIETF(Internet Engineering Task Force)に提出された"),e("a",{attrs:{href:"https://tools.ietf.org/html/rfc821",target:"_blank",rel:"noopener noreferrer"}},[t._v("RFC821"),e("OutboundLink")],1),t._v("に記述")]),t._v(" "),e("li",[t._v("Port25がemailのためのデフォルト交信ポートとされていた")]),t._v(" "),e("li",[t._v("元々は"),e("strong",[t._v("交信用")]),t._v("とされていたが, 現在は"),e("strong",[t._v("送信用")]),t._v("として広く使われている")])]),t._v(" "),e("h3",{attrs:{id:"port-465"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#port-465"}},[t._v("#")]),t._v(" Port 465")]),t._v(" "),e("ul",[e("li",[t._v("1997年にIANAがSMTPS(smtp over SSL)のためのポートとして登録")]),t._v(" "),e("li",[t._v("smtpをSSLでwrapするもの\n"),e("ul",[e("li",[t._v("他のover SSLと同じ")])])]),t._v(" "),e("li",[t._v("1998年に, 後述するSTARTTLS over smtp(Port 587)の登場によって, Port465は取り消された")]),t._v(" "),e("li",[t._v("古いクライアントがsmtpsを使っている場合でもない限り, 過去の産物にすぎない")]),t._v(" "),e("li",[t._v("*"),e("em",[t._v("smtpの標準として既に受け入れられていない")]),t._v("+")])]),t._v(" "),e("h3",{attrs:{id:"port-587"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#port-587"}},[t._v("#")]),t._v(" Port 587")]),t._v(" "),e("ul",[e("li",[t._v("1998年にIFTF提出された"),e("a",{attrs:{href:"https://tools.ietf.org/html/rfc2476",target:"_blank",rel:"noopener noreferrer"}},[t._v("RFC 2476"),e("OutboundLink")],1),t._v("に記述")]),t._v(" "),e("li",[t._v("大体のメールサーバはサポートされている")]),t._v(" "),e("li",[t._v("Port 25の代わりに送信用として推奨されている\n"),e("ul",[e("li",[t._v("ref: "),e("a",{attrs:{href:"https://tools.ietf.org/html/rfc2476#section-3.1",target:"_blank",rel:"noopener noreferrer"}},[t._v("3.1.  Submission Identification"),e("OutboundLink")],1)])])])]),t._v(" "),e("blockquote",[e("p",[t._v("Port 587 is reserved for email message submission as specified in this document.  Messages received on this port are defined to be submissions.")])]),t._v(" "),e("ul",[e("li",[t._v("Port 587とTLS暗号化によってメールが送信される")])]),t._v(" "),e("h3",{attrs:{id:"port-2525"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#port-2525"}},[t._v("#")]),t._v(" Port 2525")]),t._v(" "),e("ul",[e("li",[t._v("IETFにもIANAにも是認されていない非公式のsmtpポート")]),t._v(" "),e("li",[t._v("Port 587の代わりにsmtpのために使われることがある")]),t._v(" "),e("li",[t._v("well-knownポート外なので, customer ISPおよびクラウドホスティングプロバイダによってサポートされる")]),t._v(" "),e("li",[t._v("Port 587の代わりに使われるほどなので, TLS暗号化もサポートしている")])]),t._v(" "),e("h2",{attrs:{id:"teratailの質問について"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#teratailの質問について"}},[t._v("#")]),t._v(" teratailの質問について")]),t._v(" "),e("p",[t._v("調べると, 次のteratailのページを見つけた。")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://teratail.com/questions/25736",target:"_blank",rel:"noopener noreferrer"}},[t._v("SMTPの各ポート番号25,587,465の違いについて"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("そこの回答欄を見ていると以下のように書かれていた。")]),t._v(" "),e("blockquote",[e("p",[t._v("25番ポート\n暗号化なし通信。認証は使えない")])]),t._v(" "),e("blockquote",[e("p",[t._v("目的: 主に受信用のポート。特定のネットワークアドレス(社内など)からから認証なしで送信する用途にも使われる。\n暗号化(STARTTLS): なし、または、任意(クライアントが望めば)\n認証: なし。認証を任意として、587番ポートの役割も兼ねることも。")])]),t._v(" "),e("blockquote",[e("p",[t._v("587番ポート\nSTARTTLSを使用するならばこれ。認証は使える")])]),t._v(" "),e("blockquote",[e("p",[t._v("目的: 主に送信用のポート。認証に成功した場合のみ送信を許可。\n暗号化(STARTTLS): (一般的に)必須。\n認証: (一般的に)必須。")])]),t._v(" "),e("blockquote",[e("p",[t._v("465番ポート\nSMTPS(over SSL)を使用するならばこれ。認証は使える。")])]),t._v(" "),e("blockquote",[e("p",[t._v("目的: 主に送信用のポート。認証に成功した場合のみ送信を許可。\n暗号化(SMTPS): 必須。\n認証: (一般的に)必須。")])]),t._v(" "),e("blockquote",[e("p",[t._v("以上が一般的な使われ方だと思いますが、「(一般的に)」と書いたところは MTA の設定によります。\n例えば、587,465番ポートでも、特定のネットワークアドレスからは認証なしで送信許可とか、\n普通はやりませんが、認証が必須なのに暗号化なしとかにもできます。")])]),t._v(" "),e("h2",{attrs:{id:"_25番ポートは受信用のポート"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_25番ポートは受信用のポート"}},[t._v("#")]),t._v(" 25番ポートは受信用のポート?")]),t._v(" "),e("p",[t._v("このうち, 気になったのがport25の以下の文面である。")]),t._v(" "),e("blockquote",[e("p",[t._v("目的: 主に受信用のポート。")])]),t._v(" "),e("p",[t._v("smtpって送信用ではなかったの？")]),t._v(" "),e("p",[t._v("ということで, "),e("a",{attrs:{href:"https://tools.ietf.org/html/rfc5321#section-4.5.4.2",target:"_blank",rel:"noopener noreferrer"}},[t._v("rfc5321"),e("OutboundLink")],1),t._v("に目を通すと以下のように書かれていた。")]),t._v(" "),e("blockquote",[e("p",[t._v("4.5.4.2.  Receiving Strategy\nThe SMTP server SHOULD attempt to keep a pending listen on the SMTP port (specified by IANA as port 25) at all times.  This requires the support of multiple incoming TCP connections for SMTP.")])]),t._v(" "),e("p",[t._v("要するに, 25番ポートはSMTPのための複数の入力TCP接続のサポートを必要とする訳だ。だから, 受信用のポートと書かれていたのかもしれない。なるほど。")])])}),[],!1,null,null,null);r.default=s.exports}}]);