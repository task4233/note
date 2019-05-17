---
date: 2019-05-17
description: 'Rustのシングルスレッドサーバ記事の例'
category:
 - Rust
---

# Rustでシングルスレッドサーバを作ってみる
以下に404 NOT FOUNDの実装を書いていきます。

## 1. 404 NOT FOUNDのページを作成する
HTMLファイルに404 NOT FOUNDの旨を書けば良いです。

一度作った`index.html`を真似して書いてみます。

```html
<!-- public/404.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <h1>404 NOT FOUND...</h1>
    <p>I do not want to work...</p>
  </body>
</html>
```

こんな感じで良いでしょう。

## 2. 404 NOT FOUNDのページを設定する
`src/main.rs`に追記すれば良いです。
設定したルーティング設定に引っかからなかったときに`404.html`を返せば良いので, そのように設定します。

```rust
// src/main.rs
use std::net::TcpListener;
use std::net::TcpStream;
use std::io::prelude::*;
use std::fs::File;

fn main() {
  // 127.0.0.1:3000でTCP接続要求を監視するTcpListenerを宣言
  let listener = TcpListener::bind("127.0.0.1:3000").unwrap();

  for stream in listener.incoming() {
    match stream {
      Err(_) => println!("listen error!"),
      Ok(stream) => {
        // 要求を受け取った時の処理を書く
        println!("Connection from {} to {} is established!",
          stream.peer_addr().unwrap(),
          stream.local_addr().unwrap());
                
          handle_connection(stream);
      }
    }
  }
}

fn handle_connection(mut stream: TcpStream) {
  // TcpStreamインスタンスのデータを読み取るためのバッファを用意
  let mut buffer = [0;512];
  stream.read(&mut buffer).unwrap();
  println!("Request: {}", String::from_utf8_lossy(&buffer[..]));

  let get = b"GET / HTTP/1.1\r\n";

  if buffer.starts_with(get) {
    let mut file = File::open("public/index.html").unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).unwrap();

    let response = format!("HTTP/1.1 200 OK\r\n\r\n{}", contents);
    stream.write(response.as_bytes()).unwrap();
    // streamに完全にwriteされるように, flush()を呼び出しておく
    stream.flush().unwrap();
+ } else {
+   let mut file = File::open("public/404.html").unwrap();
+   let mut contents = String::new();
+   file.read_to_string(&mut contents).unwrap();
+
+   let response = format!("HTTP/1.1 404 NOT FOUND\r\n\r\n{}", contents);
+   stream.write(response.as_bytes()).unwrap();
+   // streamに完全にwriteされるように, flush()を呼び出しておく
+   stream.flush().unwrap();  
  }
}
```

以上です。これで`http://127.0.0.1:3000/`以外のURLでリクエストを飛ばすと, `public/404.html`の内容がレスポンスとして返されることが確認できると思います。

お疲れ様でした。

