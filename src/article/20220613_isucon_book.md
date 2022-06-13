---
date: 2022-06-13
description: 'ISUCON本のメモ'
tags:
 - 記録
---

# ISUCON本のメモ

💡
これはISUCON本を読んだ時に思ったことや新しく知ったことを言葉に起こすために使うメモです。雑多に書きます。

## References

- 藤原 et al., "達人が教えるWebパフォーマンスチューニング〜ISUCONから学ぶ高速化の実践", 2022, ISBN 978-4-297-12846-3.
- [GitHub](https://github.com/task4233/private-isu)
- [ISUCON Cheat Sheet](https://gist.github.com/south37/d4a5a8158f49e067237c17d13ecab12a)

## 1章 チューニングの基礎知識

- 垂直スケーリング(スケールアップ/ダウン)
    - サーバの性能を向上/低下させること
- 水平スケーリング(スケールアウト/イン)
    - サーバの数を増加/減少させること

### **パフォーマンスチューニングの基本のき**

- **いきなり手を動かさない**
- **勘で行動しない**
- **「基本のき」から「基本のん」まで読んでから、考えて、行動する**

- 推測せず計測する
    - 指標
        - システムリソース利用状況
        - レイテンシ
        - スループット
    - 負荷試験をする際に、与負荷側のシステムのパフォーマンス不足が律速原因になることがある
- 公平に比較する
    - ネットワークの回線が原因でパフォーマンスが低下することもある
- 1つずつ比較する
    - まとめて施策を適用すると、どの施策が刺さったのかが分からなくなる
    - PRは1つずつマージして指標を取る

### パフォーマンスチューニングの基本のほ

- **ボトルネックだけにアプローチする**
    - レジが混んでいるのに、入り口と店内を広くしても時間当たりの売り上げは上がらない
    - 最悪、パフォーマンスが落ちる
- **ボトルネックの特定は外側から順番に**
    - Webサービスにおける入出力の一番外側から見る
        - 所要時間が長い箇所
        - システムリソースの利用率が高い箇所
    - ボトルネックになりがちな箇所
        - CPU
        - メモリ
        - ディスクI/O
        - ネットワークI/O
- **ボトルネック対処の基本3パターン**
    1. 解決
        
        課題になっている事象を根本から解決する
        
    2. 回避
        
        課題になっている事象がボトルネックにならないように迂回・省略する
        
    3. 緩和
        
        課題になっている事象の影響を和らげる
        
    - 対応コストは回避 < 緩和

### パフォーマンスチューニングの基本のん

- 高速化の具体的な活動
    1. 負荷試験計画
    2. 実施準備
    3. 負荷試行→結果確認→改善→負荷試行→…
- 負荷試験の計画(項目はP19)
    - **必ず定めて！！！**
    - **何のために(目的)？**
    - **どのように(方法)？**
    - **どの程度まで(ゴール)？**
- 被負荷環境の準備
    - 負荷をかけながら手動で使用感を確かめるのもアリ
    - 実施時間・実施結果・メトリクス・ログをセットで自動で記録しておくと良い
        - ダッシュボードの日時指定機能でURLを生成する
        - Slack/DiscordにPostするようにしておく
    - 実施結果を都度解釈する
        - パフォーマンス: X並列でYユーザがN分間で操作完了
        - 異常の有無: エラーレスポンス、システムエラー、不審な挙動、不安定なレスポンスタイム
        - ボトルネックの移動有無
        - それぞれの値、リソースメトリクスの値が想定通り変化したか

## 2章 モニタリング

- 外形監視
    - Webサービスの外からモニタリングする手法
    - ネットワーク的な接続トラブルの発見に有効だが、完全な再現は現実的ではない
- 内部監視
    - Webサービスのアプリケーションの内側からモニタリングする手法
    - 外部ユーザが見れない、リソースのメトリクス等を監視できる
    - pull型(Prometheus)
        - モニタリングアプリケーション(以下MA)が各エージェントからメトリクスをpullしてくる
        - メリット
            - MA側で取得間隔を管理できる
            - エージェントの実装をシンプルにできる
    - push型
        - 各エージェントがモニタリングアプリケーションに対してメトリクスをpushする
        - メリット
            - サーバ側のポートを開けずに済む
            - エージェントの管理をせずに済む
- 使えるコマンド
    
    ```bash
    : マルチコアCPU使用率の収集
    mpstat -P ALL
    
    : メモリ使用率上位5件のプロセスの収集
    ps aux --sort -%mem | head -5
    
    : メモリ使用率の収集
    free -m
    ```
    
- 割合(%)の変動具合を比較しないこと
    - 15%増と10%増は、そもそもベースラインが異なる可能性があるので比較しても意味がない
- 同じサーバ内から負荷試験を行わないこと
    - 検証対象のリソースを使うので、それはそう

## 3. 基礎的な負荷試験

- alp

```bash
alp json --file access.log
```

- ab
- abとalpの比較
    
    abの `Time per request` とalpの `avg` が同じくらいになっていることを確認する
    
    abの結果
    
    ```bash
    % ab -c 1 -n 10 http://localhost/                                                                                                                                      [~/work/private-isu/webapp]+[master]
    This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
    Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
    Licensed to The Apache Software Foundation, http://www.apache.org/
    
    Benchmarking localhost (be patient).....done
    
    Server Software:        nginx/1.22.0
    Server Hostname:        localhost
    Server Port:            80
    
    Document Path:          /
    Document Length:        35054 bytes
    
    Concurrency Level:      1
    Time taken for tests:   23.625 seconds
    Complete requests:      10
    Failed requests:        0
    Total transferred:      354170 bytes
    HTML transferred:       350540 bytes
    Requests per second:    0.42 [#/sec] (mean)
    **Time per request:       2362.545 [ms] (mean)**
    Time per request:       2362.545 [ms] (mean, across all concurrent requests)
    Transfer rate:          14.64 [Kbytes/sec] received
    
    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    0   0.1      0       0
    Processing:  1758 2362 982.9   1899    4597
    Waiting:     1758 2361 982.4   1899    4595
    Total:       1758 2362 982.9   1899    4597
    
    Percentage of the requests served within a certain time (ms)
      50%   1899
      66%   2025
      75%   2378
      80%   3706
      90%   4597
      95%   4597
      98%   4597
      99%   4597
     100%   4597 (longest request)
    ```
    
    alpの結果
    
    ```bash
    % tail -n 10 logs/nginx/access.log| alp json -o count,method,uri,min,avg,max
    +-------+--------+-----+-------+-------+-------+
    | COUNT | METHOD | URI |  MIN  |  AVG  |  MAX  |
    +-------+--------+-----+-------+-------+-------+
    |    10 | GET    | /   | 1.755 | **2.357** | 4.590 |
    +-------+--------+-----+-------+-------+-------+
    ```
    

- mysqldumpslowとpt-query-digestの比較
- mysqldumpslow
    
    ```bash
    % mysqldumpslow logs/mysql/mysql-slow.log                       [~/work/private-isu/webapp]+[master]
    
    Reading mysql slow query log from logs/mysql/mysql-slow.log
    Count: 1  Time=0.08s (0s)  Lock=0.00s (0s)  Rows=10001.0 (10001), root[root]@webapp_app_1.webapp_default
      SELECT `id`, `user_id`, `body`, `created_at`, `mime` FROM `posts` ORDER BY `created_at` DESC
    
    Count: 22  Time=0.06s (1s)  Lock=0.00s (0s)  Rows=2.9 (64), root[root]@webapp_app_1.webapp_default
      SELECT * FROM `comments` WHERE `post_id` = N ORDER BY `created_at` DESC LIMIT N
    
    Count: 22  Time=0.02s (0s)  Lock=0.00s (0s)  Rows=1.0 (22), root[root]@webapp_app_1.webapp_default
      SELECT COUNT(*) AS `count` FROM `comments` WHERE `post_id` = N
    
    Count: 20  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=1.0 (20), root[root]@webapp_app_1.webapp_default
      SELECT * FROM `posts` WHERE `id` = N
    
    Count: 86  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=1.0 (86), root[root]@webapp_app_1.webapp_default
      SELECT * FROM `users` WHERE `id` = N
    
    Count: 305  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=0.4 (133), 2users@2hosts
      #
    
    Count: 150  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=0.0 (0), 0users@0hosts
      administrator command: Prepare
    
    Count: 133  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=0.0 (0), 0users@0hosts
      administrator command: Close stmt
    
    Count: 11  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=0.0 (0), 0users@0hosts
      administrator command: Ping
    
    Count: 11  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=0.0 (0), 0users@0hosts
      administrator command: Quit
    ```
    
- pt-query-digest
    
    ```bash
    pt-query-digest ./logs/mysql/mysql-slow.log                   [~/work/private-isu/webapp]+[master]
    
    # A software update is available:
    #   * The current version for Percona::Toolkit is 3.0.5
    
    # 360ms user time, 140ms system time, 34.92M rss, 4.13G vsz
    # Current date: Wed Jun  8 23:22:35 2022
    # Hostname: deadbeef.local
    # Files: ./logs/mysql/mysql-slow.log
    # Overall: 460 total, 9 unique, 1.27 QPS, 0.01x concurrency ______________
    # Time range: 2022-06-08T14:16:23 to 2022-06-08T14:22:24
    # Attribute          total     min     max     avg     95%  stddev  median
    # ============     ======= ======= ======= ======= ======= ======= =======
    # Exec time             2s     4us    88ms     5ms    59ms    15ms   236us
    # Lock time          465us       0    17us     1us     2us     1us       0
    # Rows sent          9.95k       0   9.77k   22.16    0.99  444.93       0
    # Rows examine       4.22M       0  97.66k   9.38k  97.04k  28.54k       0
    # Query size        16.57k      27      92   36.88   65.89   12.74   31.70
    
    # Profile
    # Rank Query ID           Response time Calls R/Call V/M   Item
    # ==== ================== ============= ===== ====== ===== ===============
    #    1 0x16849282195BE09F  1.4162 66.5%    22 0.0644  0.00 SELECT comments
    #    2 0x7539A5F45EB76A80  0.5197 24.4%    22 0.0236  0.01 SELECT comments
    #    3 0x44D0B06948A2E5CC  0.0825  3.9%     1 0.0825  0.00 SELECT posts
    #    4 0x99AA0165670CE848  0.0513  2.4%   150 0.0003  0.00 ADMIN PREPARE
    # MISC 0xMISC              0.0600  2.8%   265 0.0002   0.0 <5 ITEMS>
    
    # Query 1: 11 QPS, 0.71x concurrency, ID 0x16849282195BE09F at byte 20337
    # This item is included in the report because it matches --limit.
    # Scores: V/M = 0.00
    # Time range: 2022-06-08T14:17:38 to 2022-06-08T14:17:40
    # Attribute    pct   total     min     max     avg     95%  stddev  median
    # ============ === ======= ======= ======= ======= ======= ======= =======
    # Count          4      22
    # Exec time     66      1s    60ms    81ms    64ms    68ms     5ms    61ms
    # Lock time     12    57us     2us     4us     2us     2us       0     2us
    # Rows sent      0      64       1       3    2.91    2.90    0.40    2.90
    # Rows examine  49   2.10M  97.66k  97.66k  97.66k  97.04k       0  97.04k
    # Query size    10   1.76k      82      83   82.09   80.10    0.00   80.10
    # String:
    # Databases    isuconp
    # Hosts        webapp_app_1.webapp_default
    # Users        root
    # Query_time distribution
    #   1us
    #  10us
    # 100us
    #   1ms
    #  10ms  ################################################################
    # 100ms
    #    1s
    #  10s+
    # Tables
    #    SHOW TABLE STATUS FROM `isuconp` LIKE 'comments'\G
    #    SHOW CREATE TABLE `isuconp`.`comments`\G
    # EXPLAIN /*!50100 PARTITIONS*/
    SELECT * FROM `comments` WHERE `post_id` = 9995 ORDER BY `created_at` DESC LIMIT 3\G
    
    # Query 2: 11 QPS, 0.26x concurrency, ID 0x7539A5F45EB76A80 at byte 2174 _
    # This item is included in the report because it matches --limit.
    # Scores: V/M = 0.01
    # Time range: 2022-06-08T14:17:38 to 2022-06-08T14:17:40
    # Attribute    pct   total     min     max     avg     95%  stddev  median
    # ============ === ======= ======= ======= ======= ======= ======= =======
    # Count          4      22
    # Exec time     24   520ms    19ms    88ms    24ms    21ms    14ms    20ms
    # Lock time     11    55us     2us     4us     2us     2us       0     1us
    # Rows sent      0      22       1       1       1       1       0       1
    # Rows examine  49   2.10M  97.66k  97.66k  97.66k  97.66k       0  97.66k
    # Query size     8   1.40k      65      66   65.09   62.76    0.50   62.76
    # String:
    # Databases    isuconp
    # Hosts        webapp_app_1.webapp_default
    # Users        root
    # Query_time distribution
    #   1us
    #  10us
    # 100us
    #   1ms
    #  10ms  ################################################################
    # 100ms
    #    1s
    #  10s+
    # Tables
    #    SHOW TABLE STATUS FROM `isuconp` LIKE 'comments'\G
    #    SHOW CREATE TABLE `isuconp`.`comments`\G
    # EXPLAIN /*!50100 PARTITIONS*/
    SELECT COUNT(*) AS `count` FROM `comments` WHERE `post_id` = 10001\G
    
    # Query 3: 0 QPS, 0x concurrency, ID 0x44D0B06948A2E5CC at byte 1595 _____
    # This item is included in the report because it matches --limit.
    # Scores: V/M = 0.00
    # Time range: all events occurred at 2022-06-08T14:17:38
    # Attribute    pct   total     min     max     avg     95%  stddev  median
    # ============ === ======= ======= ======= ======= ======= ======= =======
    # Count          0       1
    # Exec time      3    82ms    82ms    82ms    82ms    82ms       0    82ms
    # Lock time      3    17us    17us    17us    17us    17us       0    17us
    # Rows sent     98   9.77k   9.77k   9.77k   9.77k   9.77k       0   9.77k
    # Rows examine   0  19.53k  19.53k  19.53k  19.53k  19.53k       0  19.53k
    # Query size     0      92      92      92      92      92       0      92
    # String:
    # Databases    isuconp
    # Hosts        webapp_app_1.webapp_default
    # Users        root
    # Query_time distribution
    #   1us
    #  10us
    # 100us
    #   1ms
    #  10ms  ################################################################
    # 100ms
    #    1s
    #  10s+
    # Tables
    #    SHOW TABLE STATUS FROM `isuconp` LIKE 'posts'\G
    #    SHOW CREATE TABLE `isuconp`.`posts`\G
    # EXPLAIN /*!50100 PARTITIONS*/
    SELECT `id`, `user_id`, `body`, `created_at`, `mime` FROM `posts` ORDER BY `created_at` DESC\G
    
    # Query 4: 37.50 QPS, 0.01x concurrency, ID 0x99AA0165670CE848 at byte 1926
    # This item is included in the report because it matches --limit.
    # Scores: V/M = 0.00
    # Time range: 2022-06-08T14:17:38 to 2022-06-08T14:17:42
    # Attribute    pct   total     min     max     avg     95%  stddev  median
    # ============ === ======= ======= ======= ======= ======= ======= =======
    # Count         32     150
    # Exec time      2    51ms   140us     5ms   341us   467us   419us   260us
    # Lock time      5    25us       0    16us       0       0     1us       0
    # Rows sent      0       0       0       0       0       0       0       0
    # Rows examine   0       0       0       0       0       0       0       0
    # Query size    26   4.39k      30      30      30      30       0      30
    # String:
    # Databases    isuconp
    # Hosts        webapp_app_1.webapp_default
    # Users        root
    # Query_time distribution
    #   1us
    #  10us
    # 100us  ################################################################
    #   1ms  #
    #  10ms
    # 100ms
    #    1s
    #  10s+
    administrator command: Prepare\G
    ```
    

- CPU使用率の履歴を残したい場合は `$ dstat`

```bash
dstat --cpu
```

## 4. シナリオを持った負荷試験

- k6
    - HTTP/1.1, 2, WebSocket, gRPCでシナリオベースの負荷試験を行えるツール
    - MacOSなら `$ brew install k6`
    - 他OSなら[ドキュメント](https://k6.io/docs/getting-started/installation/)を参照して
- 並列度1で30秒間実行する場合
    - `$ k6 run --vus 1 --duration 30s ab.js`
    - `vus` はVirtual Usersの略
- 単一URLにリクエストを送信するシナリオ
    
    ```bash
    % cat ab.js                                                                                                                                                        [~/work/private-isu/k6]+[master]
    import http from "k6/http"
    
    const BASE_URL = "http://localhost";
    
    export default function() {
      http.get(`${BASE_URL}/`);
    }
    % k6 run --vus 1 --duration 30s ab.js                                                                                                                              [~/work/private-isu/k6]+[master]
    
              /\      |‾‾| /‾‾/   /‾‾/   
         /\  /  \     |  |/  /   /  /    
        /  \/    \    |     (   /   ‾‾\  
       /          \   |  |\  \ |  (‾)  | 
      / __________ \  |__| \__\ \_____/ .io
    
      execution: local
         script: ab.js
         output: -
    
      scenarios: (100.00%) 1 scenario, 1 max VUs, 1m0s max duration (incl. graceful stop):
               * default: 1 looping VUs for 30s (gracefulStop: 30s)
    
    running (0m31.5s), 0/1 VUs, 13 complete and 0 interrupted iterations
    default ✓ [======================================] 1 VUs  30s
    
         data_received..................: 461 kB 15 kB/s
         data_sent......................: 975 B  31 B/s
         http_req_blocked...............: avg=51.46µs min=2µs   med=4µs   max=620µs  p(90)=6µs     p(95)=251.59µs
         http_req_connecting............: avg=13.15µs min=0s    med=0s    max=171µs  p(90)=0s      p(95)=68.39µs 
         http_req_duration..............: avg=2.42s   min=2.29s med=2.33s max=3.32s  p(90)=2.58s   p(95)=2.91s   
           { expected_response:true }...: avg=2.42s   min=2.29s med=2.33s max=3.32s  p(90)=2.58s   p(95)=2.91s   
         http_req_failed................: 0.00%  ✓ 0        ✗ 13 
         http_req_receiving.............: avg=424.3µs min=89µs  med=129µs max=3.54ms p(90)=554.6µs p(95)=1.8ms   
         http_req_sending...............: avg=28.92µs min=13µs  med=16µs  max=173µs  p(90)=24.6µs  p(95)=84.19µs 
         http_req_tls_handshaking.......: avg=0s      min=0s    med=0s    max=0s     p(90)=0s      p(95)=0s      
         http_req_waiting...............: avg=2.42s   min=2.28s med=2.33s max=3.32s  p(90)=2.58s   p(95)=2.91s   
         http_reqs......................: 13     0.412203/s
         iteration_duration.............: avg=2.42s   min=2.29s med=2.33s max=3.32s  p(90)=2.58s   p(95)=2.91s   
         iterations.....................: 13     0.412203/s
         vus............................: 1      min=1      max=1
         vus_max........................: 1      min=1      max=1
    ```
    
- ISUCONでは初期化のために `GET /initialize` というURLにアクセスする
- 新しいシナリオ
    1. Webアプリケーションの初期化
    2. ログインしてコメントを投稿する処理
    3. ログインして画像を投稿する処理
    
    - URLの共有用JS
        
        ```jsx
        // config.js
        const BASE_URL = "http://localhost";
        
        export function url(path) {
        	return `${BASE_URL}${path}`;
        }
        ```
        
    - 初期化処理用JS
        
        ```jsx
        // initialize.js
        import http from "k6/http";
        import { sleep } from "k6";
        import { url } from "./config.js";
        
        export default function() {
          http.get(url("/initialize"), {
            timeout: "10s",
          });
          sleep(1);
        }
        ```
        
    - 初期化の負荷実行
        
        ```bash
        % k6 run --vus 1 initialize.js                                                                                                               [~/work/private-isu/k6/scinario-base-request]+[master]
        
                  /\      |‾‾| /‾‾/   /‾‾/   
             /\  /  \     |  |/  /   /  /    
            /  \/    \    |     (   /   ‾‾\  
           /          \   |  |\  \ |  (‾)  | 
          / __________ \  |__| \__\ \_____/ .io
        
          execution: local
             script: initialize.js
             output: -
        
          scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
                   * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)
        
        running (00m01.1s), 0/1 VUs, 1 complete and 0 interrupted iterations
        default ✓ [======================================] 1 VUs  00m01.1s/10m0s  1/1 iters, 1 per VU
        
             data_received..................: 255 B 241 B/s
             data_sent......................: 85 B  80 B/s
             http_req_blocked...............: avg=1.18ms  min=1.18ms  med=1.18ms  max=1.18ms  p(90)=1.18ms  p(95)=1.18ms 
             http_req_connecting............: avg=198µs   min=198µs   med=198µs   max=198µs   p(90)=198µs   p(95)=198µs  
             http_req_duration..............: avg=52.12ms min=52.12ms med=52.12ms max=52.12ms p(90)=52.12ms p(95)=52.12ms
               { expected_response:true }...: avg=52.12ms min=52.12ms med=52.12ms max=52.12ms p(90)=52.12ms p(95)=52.12ms
             http_req_failed................: 0.00% ✓ 0        ✗ 1  
             http_req_receiving.............: avg=169µs   min=169µs   med=169µs   max=169µs   p(90)=169µs   p(95)=169µs  
             http_req_sending...............: avg=706µs   min=706µs   med=706µs   max=706µs   p(90)=706µs   p(95)=706µs  
             http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s     
             http_req_waiting...............: avg=51.25ms min=51.25ms med=51.25ms max=51.25ms p(90)=51.25ms p(95)=51.25ms
             http_reqs......................: 1     0.945969/s
             iteration_duration.............: avg=1.05s   min=1.05s   med=1.05s   max=1.05s   p(90)=1.05s   p(95)=1.05s  
             iterations.....................: 1     0.945969/s
             vus............................: 1     min=1      max=1
             vus_max........................: 1     min=1      max=1
        ```
        
    - コメント投稿するJS
        
        ```jsx
        // comment.js
        import http from "k6/http";
        import { check } from "k6";
        import { parseHTML } from "k6/html";
        import { url } from "./config.js";
        
        export default function() {
          // login
          const login_res = http.post(url("/login"), {
            account_name: "terra",
            password: "terraterra",
          });
        
          check(login_res, {
            "is status 200": (r) => r.status === 200,
          });
          const res = http.get(url("/@terra"));
          const doc = parseHTML(res.body);
        
          const token = doc.find('input[name="csrf_token"]').first().attr("value");
          const post_id = doc.find('input[name="post_id"]').first().attr("value");
        
          // comment
          const comment_res = http.post(url("/comment"), {
            post_id: post_id,
            csrf_token: token,
            comment: "Hello k6!",
          });
        
          check(comment_res, {
            "is status 200": (r) => r.status === 200,
          });
        }
        ```
        
    - コメント投稿の負荷実行
        
        ```bash
        % k6 run --vus 1 comment.js                                                                                                                  [~/work/private-isu/k6/scinario-base-request]+[master]
        
                  /\      |‾‾| /‾‾/   /‾‾/   
             /\  /  \     |  |/  /   /  /    
            /  \/    \    |     (   /   ‾‾\  
           /          \   |  |\  \ |  (‾)  | 
          / __________ \  |__| \__\ \_____/ .io
        
          execution: local
             script: comment.js
             output: -
        
          scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
                   * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)
        
        running at file:///Users/takashimima/work/private-isu/k6/scinario-base-request/comment.js:18:24(40)
        default at native  executor=per-vu-iterations scenario=default source=stacktrace
        
        running (00m06.8s), 0/1 VUs, 1 complete and 0 interrupted iterations
        default ✓ [======================================] 1 VUs  00m06.8s/10m0s  1/1 iters, 1 per VU
        
             ✓ is status 200
        
             checks.........................: 100.00% ✓ 1        ✗ 0  
             data_received..................: 72 kB   11 kB/s
             data_sent......................: 600 B   89 B/s
             http_req_blocked...............: avg=568.66µs min=2µs     med=4µs   max=1.7ms p(90)=1.36ms  p(95)=1.53ms 
             http_req_connecting............: avg=62.33µs  min=0s      med=0s    max=187µs p(90)=149.6µs p(95)=168.3µs
             http_req_duration..............: avg=2.25s    min=44.9ms  med=2.88s max=3.84s p(90)=3.65s   p(95)=3.75s  
               { expected_response:true }...: avg=2.25s    min=44.9ms  med=2.88s max=3.84s p(90)=3.65s   p(95)=3.75s  
             http_req_failed................: 0.00%   ✓ 0        ✗ 3  
             http_req_receiving.............: avg=260µs    min=175µs   med=213µs max=392µs p(90)=356.2µs p(95)=374.1µs
             http_req_sending...............: avg=148.66µs min=14µs    med=18µs  max=414µs p(90)=334.8µs p(95)=374.4µs
             http_req_tls_handshaking.......: avg=0s       min=0s      med=0s    max=0s    p(90)=0s      p(95)=0s     
             http_req_waiting...............: avg=2.25s    min=44.09ms med=2.87s max=3.84s p(90)=3.65s   p(95)=3.75s  
             http_reqs......................: 3       0.442368/s
             iteration_duration.............: avg=6.77s    min=6.77s   med=6.77s max=6.77s p(90)=6.77s   p(95)=6.77s  
             iterations.....................: 1       0.147456/s
             vus............................: 1       min=1      max=1
             vus_max........................: 1       min=1      max=1
        ```
        
    - 画像をアップロードするJS
        
        ```jsx
        // postimage.js
        import http from "k6/http";
        import { parseHTML } from "k6/html";
        import { url } from "./config.js";
        
        const testImage = open("testImage.jpg", "b");
        
        export default function() {
          // login
          const res = http.post(url("/login"), {
            account_name: "terra",
            password: "terraterra",
          });
          const doc = parseHTML(res.body);
          const token = doc.find('input[name="csrf_token"]').first().attr("value");
          
          // post image
          http.post(url("/"), {
            file: http.file(testImage, "testimage.jpg", "image/jpeg"),
            body: "Posted by k6",
            csrf_token: token,
          });
        }
        ```
        
    - JSONを読み込むモジュールのJS
        
        ```json
        [
            {
                "account_name":"terra",
                "password":"terraterra"
            },
            {
                "account_name":"sheri",
                "password":"sherisheri"
            },
            {
                "account_name":"janelle",
                "password":"janellejanelle"
            },
            {
                "account_name":"chasity",
                "password":"chasitychasity"
            }
        ]
        ```
        
        ```jsx
        // account.js
        import { SharedArray } import "k6/data";
        
        const accounts = new SharedArray('accounts', function() {
          return JSON.parse(open('./account.json'));
        });
        
        export function getAccount() {
          return accounts[Math.floor(Math.random() * accounts.length)];
        
        ```
        
        ```jsx
        import { getAccount } from "./account.js";
        
        function commentScenario() {
          const account = getAccount();
          const login_res = http.post(url("/login"), {
            account_name: account_name,
            password: account.password,
          });
        }
        ```
        
    - 複数のシナリオを組み合わせた統合シナリオ用JS
        
        ```jsx
        // integrated.js
        import initialize from "./initialize.js";
        import comment from "./comment.js";
        import postimage from "./postimage.js";
        
        export {
            initialize,
            comment,
            postimage
        };
        
        // The scinario is 
        // 1.   initialize    (0[s] ~10[s])
        // 2-1. leave comments(12[s]~42[s])
        // 2-2. post images   (12[s]~42[s])
        export const options = {
            scenarios: {
                initialize: {
                    executor: "shared-iterations", // multiple virtual users
                    vus: 1,
                    iterations: 1,
                    exec: "initialize",
                    maxDuration: "10s",
                },
                comment: {
                    executor: "constant-vus",
                    vus: 4,
                    duration: "30s",
                    exec: "comment",
                    startTime: "12s",
                },
                postImage: {
                    executor: "constant-vus",
                    vus: 2,
                    duration: "30s",
                    exec: "postimage",
                    startTime: "12s",
                },
            },
        };
        
        export default function() {}
        ```
        
    - 複数のシナリオを組み合わせた統合シナリオの負荷実行
        
        ```bash
        % k6 run integrated.js                                                                                                                       [~/work/private-isu/k6/scinario-base-request]+[master]
        
                  /\      |‾‾| /‾‾/   /‾‾/   
             /\  /  \     |  |/  /   /  /    
            /  \/    \    |     (   /   ‾‾\  
           /          \   |  |\  \ |  (‾)  | 
          / __________ \  |__| \__\ \_____/ .io
        
          execution: local
             script: integrated.js
             output: -
        
          scenarios: (100.00%) 3 scenarios, 7 max VUs, 1m12s max duration (incl. graceful stop):
                   * initialize: 1 iterations shared among 1 VUs (maxDuration: 10s, exec: initialize, gracefulStop: 30s)
                   * comment: 4 looping VUs for 30s (exec: comment, startTime: 12s, gracefulStop: 30s)
                   * postImage: 2 looping VUs for 30s (exec: postimage, startTime: 12s, gracefulStop: 30s)
        
        running (0m44.4s), 0/7 VUs, 7 complete and 0 interrupted iterations
        initialize ✓ [======================================] 1 VUs  01.1s/10s  1/1 shared iters
        comment    ✓ [======================================] 4 VUs  30s       
        postImage  ✓ [======================================] 2 VUs  30s       
        
             ✓ is status 200
        
             checks.........................: 100.00% ✓ 8        ✗ 0  
             data_received..................: 382 kB  8.6 kB/s
             data_sent......................: 32 kB   716 B/s
             http_req_blocked...............: avg=374.06µs min=2µs     med=4µs    max=5.99ms p(90)=979µs    p(95)=1.01ms  
             http_req_connecting............: avg=141µs    min=0s      med=0s     max=878µs  p(90)=609.59µs p(95)=844.4µs 
             http_req_duration..............: avg=6.61s    min=35.72ms med=3.29s  max=21.16s p(90)=16.82s   p(95)=19.67s  
               { expected_response:true }...: avg=6.61s    min=35.72ms med=3.29s  max=21.16s p(90)=16.82s   p(95)=19.67s  
             http_req_failed................: 0.00%   ✓ 0        ✗ 29 
             http_req_receiving.............: avg=224.86µs min=69µs    med=99µs   max=2.15ms p(90)=271.99µs p(95)=693.39µs
             http_req_sending...............: avg=57.79µs  min=14µs    med=22µs   max=194µs  p(90)=167.8µs  p(95)=183.59µs
             http_req_tls_handshaking.......: avg=0s       min=0s      med=0s     max=0s     p(90)=0s       p(95)=0s      
             http_req_waiting...............: avg=6.61s    min=35.52ms med=3.29s  max=21.16s p(90)=16.82s   p(95)=19.67s  
             http_reqs......................: 29      0.653619/s
             iteration_duration.............: avg=27.54s   min=1.1s    med=31.94s max=32.36s p(90)=32.25s   p(95)=32.3s   
             iterations.....................: 7       0.15777/s
             vus............................: 3       min=0      max=6
             vus_max........................: 7       min=7      max=7
        ```
        
    - alpの実行結果
        
        ```bash
        % alp json --sort sum -r -m "/posts/[0-9]+,/@\w+" -o count,method,uri,min,avg,max,sum --file ./access.log.20220610-135211                           [~/work/private-isu/webapp/logs/nginx]+[master]
        +-------+--------+---------------+--------+--------+--------+---------+
        | COUNT | METHOD |      URI      |  MIN   |  AVG   |  MAX   |   SUM   |
        +-------+--------+---------------+--------+--------+--------+---------+
        |    12 | GET    | /             |  2.451 |  8.737 | 15.176 | 104.846 |
        |     8 | GET    | /@\w+         | 11.055 | 12.770 | 14.676 | 102.158 |
        |     4 | POST   | /             |  2.214 |  9.666 | 12.875 |  38.665 |
        |    12 | POST   | /login        |  0.047 |  1.971 |  7.830 |  23.649 |
        |     4 | GET    | /posts/[0-9]+ |  0.120 |  3.518 | 11.152 |  14.073 |
        |     1 | GET    | /initialize   |  0.027 |  0.027 |  0.027 |   0.027 |
        +-------+--------+---------------+--------+--------+--------+---------+
        ```
        
        ※`-m` で絞り込めないのは、そもそもそのログが残ってないから
        
        ```bash
        % alp json --sort sum -r -m "/posts/[0-9]+,/@\w+" -o count,method,uri,min,avg,max,sum --file ./access.log.20220610-125756                           [~/work/private-isu/webapp/logs/nginx]+[master]
        +-------+--------+----------------------+-------+-------+-------+--------+
        | COUNT | METHOD |         URI          |  MIN  |  AVG  |  MAX  |  SUM   |
        +-------+--------+----------------------+-------+-------+-------+--------+
        |    15 | GET    | /                    | 2.288 | 2.498 | 3.502 | 37.466 |
        |     2 | GET    | /js/timeago.min.js   | 0.473 | 1.472 | 2.471 |  2.944 |
        |     2 | GET    | /js/main.js          | 0.460 | 1.459 | 2.458 |  2.918 |
        |     2 | GET    | /image/9998.jpg      | 0.408 | 1.320 | 2.232 |  2.640 |
        |     2 | GET    | /image/9999.jpg      | 0.120 | 1.302 | 2.485 |  2.605 |
        |     1 | GET    | /css/style.css       | 2.454 | 2.454 | 2.454 |  2.454 |
        |     2 | GET    | /image/10000.png     | 0.205 | 0.258 | 0.311 |  0.516 |
        |     2 | GET    | /image/9997.jpg      | 0.013 | 0.238 | 0.462 |  0.475 |
        |     1 | GET    | /image/9987.jpg      | 0.431 | 0.431 | 0.431 |  0.431 |
        |     1 | GET    | /image/9986.jpg      | 0.425 | 0.425 | 0.425 |  0.425 |
        |     2 | GET    | /image/9996.jpg      | 0.422 | 0.211 | 0.422 |  0.422 |
        |     1 | GET    | /image/9981.jpg      | 0.367 | 0.367 | 0.367 |  0.367 |
        |     1 | GET    | /image/9991.jpg      | 0.366 | 0.366 | 0.366 |  0.366 |
        |     1 | GET    | /image/9982.jpg      | 0.365 | 0.365 | 0.365 |  0.365 |
        |     1 | GET    | /image/9983.jpg      | 0.357 | 0.357 | 0.357 |  0.357 |
        |     1 | GET    | /image/9990.jpg      | 0.346 | 0.346 | 0.346 |  0.346 |
        |     1 | GET    | /image/9988.jpg      | 0.342 | 0.342 | 0.342 |  0.342 |
        |     1 | GET    | /image/9989.jpg      | 0.340 | 0.340 | 0.340 |  0.340 |
        |     1 | GET    | /image/9985.jpg      | 0.323 | 0.323 | 0.323 |  0.323 |
        |     1 | GET    | /image/9995.jpg      | 0.306 | 0.306 | 0.306 |  0.306 |
        |     1 | GET    | /image/9993.jpg      | 0.267 | 0.267 | 0.267 |  0.267 |
        |     1 | GET    | /image/9980.jpg      | 0.267 | 0.267 | 0.267 |  0.267 |
        |     1 | GET    | /image/9994.jpg      | 0.255 | 0.255 | 0.255 |  0.255 |
        |     1 | GET    | /img/ajax-loader.gif | 0.253 | 0.253 | 0.253 |  0.253 |
        |     2 | GET    | /image/10001.png     | 0.023 | 0.056 | 0.090 |  0.113 |
        |     1 | GET    | /favicon.ico         | 0.004 | 0.004 | 0.004 |  0.004 |
        +-------+--------+----------------------+-------+-------+-------+--------+
        deadbeef(23:05:24) ~/work/private-isu/webapp/logs/nginx
        ```
        
    

## 5. データベースのチューニング

- RDBMS
    - 強い一貫性を持つ
        - 一貫性とは、いくつもの表にわたり処理を行わなければならない場合でも生合成を保つ性質
    - MySQL, MariaDB, PostgreSQL, SQLite
- NoSQL
    - 強い一貫性を持たない代わりに高速な処理を実現する
    - ソフトウェアによっては、複数のサーバに分散して高いスケーラビリティを持つ
    - memcached, Redis, DynamoDB, Firebase Realtime Database, Cloud Firestore
- NewSQL
    - 強い一貫性と高いスケーラビリティおよび可用性を持つ
    - 代わりにサーバコストやレイテンシの部分で劣る
    - Cloud Spanner, TiDB, Cockroach DB
- スロークエリの可視化
    - pt-query-digest
        - Installation
            
            [Installing Percona Toolkit](https://www.percona.com/doc/percona-toolkit/LATEST/installation.html)
            
            ```bash
            // Debian系
            sudo apt update
            sudo apt install percona-toolkit
            ```
            
            Slow Log Queryの有効化
            
            ```bash
            // /etc/my.cnf
            slow_query_log = 1
            slow_query_log_file = /var/log/mysql/mysql-slow.log
            long_query_time = 0
            ```
            
- インデックス
    - **よく条件の絞り込みに使われる場合はインデックスを貼れ**
        - 判断するにはEXPLAINを先頭につけて実行しろ
        - 複合インデックスも可能だが、可能な限り単一のインデックスにすべき
    - **何でもかんでもインデックスを貼るな！！！**
        - インデックスの追加、削除には時間がかかる
        - データの追加・更新にも時間がかかる
    - プライマリインデックス
        - 主キー(PRIMARY KEY)に貼られるインデックス
        - 1テーブルに1つしか存在できない
    - セカンダリインデックス
        - プライマリインデックス以外のインデックス
        - プライマリインデックスを参照しないで結果が返せる高速化をCovering Indexと呼ぶ
        - 以下の例はプライマリインデックスを参照せずに結果が返せるため、 `user_id`にインデックスを貼ることで高速化が期待できる
    
    ```sql
    SELECT COUNT(*) FROM comments WH
    E user_id = 123;
    ```
    
    - LIKE句を用いている場合は全文検索インデックスが使える
        
        ```sql
        SELECT * FROM comments WHERE comment LIKE '%hoge%'
        ```
        
        - BTree Indexの性質上、前方一致にしかインデックスを利用できない
        - MySQLでは全文検索インデックスを適用できる
        
        ```sql
        ALTER TABLE comments ADD FULLTEXT INDEX comments_full_idx (comment) WITH PARSER ngram;
        ```
        
- N+1問題
    - とりあえず `JOIN` 句で書き直すと解消されることがある
        - QueryがPreloadされるため
    - Cacheする
        - 1度目のリクエストが遅くなる問題は解消されない
        - 起動時にCacheを登録することでN+1の問題を小さくする
    - Index
        - `ORDER BY` 狙いのIndexは `FORCE INDEX` にしないと機能しないことがある
    - `SELECT *` 系のクエリは無駄に多くのデータを取得することに繋がる場合もある
        - Columnの宣言時に `INVISIBLE` を付与する
    - Prepared Statementは効率が落ちがち
        - 準備および開放(CLOSE)時にリソースを要するため
        - Goなら `[sql.Open](http://sql.Open)` の時に、 `interpolateParams=true` にする
- DBとクライアントとのTCPコネクション
    - Client
        - MaxIdleConnection(default value: 2)
            - idle時に保持しておくコネクション数
        - MaxOpenConnection(default value: 0: inf)
            - 最大接続数
    - DB
        - max_connections
            - `my.cnf` で設定できる
    
    ```sql
    [mysqld]
    max_connections = 65535
    ```
    
- innodbの設定(P162)

## 6. リバースプロキシの利用

- 静的ファイルをNginxサーバからサーブするとき

```
server {
  listen 80;

  # (snip)
  
	# js, jpg, png, css の拡張子を持つファイルを全てNginxから返す
	root /home/isucon/webapp/public/;

  location ~ .*\.(htm|html|css|js|jpg|png|gif|ico) {
    expires 24h;
    add_header Cache-Control public;
      
    open_file_cache max=100  # file descriptor などを cache

    gzip on;  # cpu 使うのでメリット・デメリット見極める必要あり。gzip_static 使えるなら事前にgzip圧縮した上でそちらを使う。
    gzip_types text/css application/javascript application/json application/font-woff application/font-tff image/gif image/png image/jpeg image/svg+xml image/x-icon application/octet-stream;
    gzip_disable "msie6";
    gzip_static on;  # nginx configure時に --with-http_gzip_static_module 必要
    gzip_vary on;
    gzip_min_length 1k; # gzip圧縮すると元のファイルよりも大きくなることがある
  }

  location / {
    proxy_set_header Host $host;
    proxy_pass http://localhost:8080;
  }
}
```

- **application側でもgzip圧縮した方が良い**
    - ネットワークコストはパフォーマンス的にも金銭的にも高く、高い確率でボトルネックになるため
    - gzip圧縮する前提でサーバのCPUを考慮した方が良い
- keepaliveにするためには(P179)
    - メリットはコネクションの作り直しによるパフォーマンス低下や負荷の増加が減ること
    - デメリットはkeepaliveを無効にしているときよりもコネクション数が増えれば増えるほどサーバ側に負荷がかかること
    - HTTP/2の利用
        - Nginxで `listen 443 ssl http2` としておけば良い

## 7. キャッシュの活用

- Thundering herd problem
    - キャッシュがない場合、大量のリクエストがappに来た場合、キャッシュを作成するためにOriginに大量のリクエストがいくこと

## 8. 押さえておきたい高速化手法

- **外部コマンドではなくライブラリを利用する**
    - opensslコマンドをshで実行するのではなく、言語側のライブラリを利用した方がオーバーヘッドが小さくなる
- アプリケーション側で冗長なログを出力しない
    - ログ出力はディスクリプタをロックする上に時間がかかる
- GoのHTTPクライアントについて
    - ****[Goでnet/httpを使う時のこまごまとした注意](https://qiita.com/ono_matope/items/60e96c01b43c64ed1d18)****
- 静的ファイル配信をリバースプロキシから直接配信する
    - ネットワーク帯域が逼迫しないようにするため
    - アプリケーションサーバのメモリを食い潰さないようにするため
- HTTPヘッダを用いてクライアント側にキャッシュさせる
    - `Cache-Control: max-age=86400` のようなヘッダ
    - Nginxであれば `expires` を設定しておけば 🆗
- CDN……はISUCONにおいては多分気にしなくて良さそう

## 9. OSの基礎知識とチューニング

- LinuxはOSとしてのコア機能をLinux Kernelと呼ばれるソフトウェアが担っている
- OS上で動作するアプリケーションはシステムコールと呼ばれる命令を用いてLinux Kernelの機能を利用している
- アプリケーションとOSのコア部分の間にインタフェースを設けて実装を分割することで、**様々なハードウェアごとの違いをOS上で動作するアプリケーションがOSのレイヤーにおける違いを意識することなく利用できるようになっている**
- 読み書きするファイルがどのようなハードウェアで書き込まれていて、どのようなファイルシステム上で読み書きが行われるのかを指定するものではない
    - システムコールを用いることで、ハードウェアやOSレイヤのシステムを隠蔽していることによる恩恵
- open(2)の2はセクションの番号
    - [https://atmarkit.itmedia.co.jp/flinux/rensai/linuxtips/073mannum.html](https://t.co/RyLxxLmS6u)
- Linux Kernel側をカーネル空間
- システムコールを利用するLinuxOS上のアプリケーションが動作する部分をユーザ空間と呼ぶ
- カーネル空間で処理が完結する場合は、ユーザ空間と比較してオーバーヘッドが少なく、より高速に動作する傾向にある
- ミドルウェアなど、速度が要求されるアプリケーションは直接カーネル空間で処理を行うよう実装する例もたくさんある
- スループット
    - 一定時間で処理できるパケットの量
- レイテンシ
    - 通信を開始してから終了するまでの所要時間
- HDD
    - シーケンシャルリード/ライト > ランダムリード/ライト
- 仮想ディスク
    - ランダムリード/ライト > シーケンシャルリード/ライト

---

- Linuxカーネルパラメータ
    - `net.core.somaxconn`
        - HTTPリクエストを受け取れるソケットの最大数
    - `net.ipv4.ip_local_port_range`
        - Ephemeral Portsの幅

## private-isuの攻略

1. commentsテーブルにインデックスを追加する
2. 静的ファイルをNginxで配信する
3. アップロード画像を静的ファイル化する
4. N+1の解決(JOINを利用する)
5. prepared statementを除去する
6. commentsテーブルへインデックスを追加する
7. N+1結果をキャッシュする
8. 適切なインデックスを利用できないクエリを書き換える
9. 外部コマンドの呼び出しを止める
10. MySQLのログを残さないようにする
11. memcachedへのN+1の修正
