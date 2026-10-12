// en（src/）と ja（src/ja/）の Markdown で、見出しの並びと各見出し配下の項目数が一致するかを確かめる。
// 翻訳の更新漏れを検知するためのもの（ADR 0002）。依存なしで node から直接実行する。
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const SRC = new URL('../src/', import.meta.url).pathname
const JA = join(SRC, 'ja')

// 見出しごとに、その配下にあるトップレベルのリスト項目（`- ` 始まり）の数を数える。
// <script> / <style> ブロックとコードフェンスの中は数えない
function outline(file) {
  const sections = []
  let current = { heading: '(before first heading)', items: 0 }
  let skip = null
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    if (skip) {
      if (skip.test(line)) skip = null
      continue
    }
    if (/^<script\b/.test(line)) { skip = /^<\/script>/; continue }
    if (/^<style\b/.test(line)) { skip = /^<\/style>/; continue }
    if (/^```/.test(line)) { skip = /^```/; continue }
    const h = line.match(/^(#{2,6})\s+(.+?)\s*$/)
    if (h) {
      sections.push(current)
      current = { heading: `${h[1]} ${h[2]}`, items: 0 }
    } else if (/^- /.test(line)) {
      current.items++
    }
  }
  sections.push(current)
  return sections
}

function* markdownFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* markdownFiles(path)
    else if (entry.name.endsWith('.md')) yield path
  }
}

let failed = false
for (const jaFile of markdownFiles(JA)) {
  const enFile = join(SRC, relative(JA, jaFile))
  const name = relative(SRC, jaFile)
  if (!existsSync(enFile)) continue // ja にしかないページは対象外

  const en = outline(enFile)
  const ja = outline(jaFile)
  const length = Math.max(en.length, ja.length)
  for (let i = 0; i < length; i++) {
    const e = en[i]
    const j = ja[i]
    if (e?.heading !== j?.heading) {
      console.error(`${name}: 見出しが一致しません: en="${e?.heading}" ja="${j?.heading}"`)
      failed = true
      break // 見出しがずれると以降の比較は意味をなさない
    }
    if (e.items !== j.items) {
      console.error(`${name}: "${e.heading}" の項目数が一致しません: en=${e.items} ja=${j.items}`)
      failed = true
    }
  }
}

if (failed) {
  console.error('\nsrc/ と src/ja/ の内容がずれています。両方を更新してください。')
  process.exit(1)
}
console.log('i18n parity: OK')
