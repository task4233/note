<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { withBase } from 'vitepress'

const quotes = [
  '進む方向を変えなければ, あなたは向かっている方向にたどり着くことになる',
  'このページは git rebase でいなくなったかもしれません',
  'TODO: このページを実装する',
  'panic: page not found, goroutine 1 [running]',
  '探していた URL は別のサーバで元気にしている可能性があります',
  'マッピングテーブルから漏れた小さなパスが, 静かに 404 を呼び出しました',
  '404 の精霊があなたの探していたページを別の dimension に転送しました',
  'this.page = null;',
  'たどり着いた先が間違いだったとしても, それもまた一つの旅です',
]

const quote = ref(quotes[0])

onMounted(() => {
  quote.value = quotes[Math.floor(Math.random() * quotes.length)]
})
</script>

<template>
  <!-- flag{Y0U_F0UND_4_HIDD3N_FL4G_W3LC0M3_FR13ND} -->
  <div class="NotFound">
    <p class="code">4 0 4</p>
    <h1 class="title">ページが見つかりません</h1>
    <div class="divider" />
    <blockquote class="quote">{{ quote }}</blockquote>
    <div class="action">
      <a class="link" :href="withBase('/')" aria-label="トップに戻る">
        トップへ戻る
      </a>
    </div>
    <p class="hint">
      <span class="hint-label">hint</span> view-source して flag を探そう
    </p>
  </div>
</template>

<style scoped>
.NotFound {
  padding: 64px 24px 96px;
  text-align: center;
}

@media (min-width: 768px) {
  .NotFound {
    padding: 96px 32px 168px;
  }
}

.code {
  line-height: 64px;
  font-size: 64px;
  font-weight: 600;
  letter-spacing: 8px;
  color: var(--vp-c-brand-1);
  font-variant-numeric: tabular-nums;
}

.title {
  padding-top: 12px;
  letter-spacing: 2px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 700;
}

.divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.quote {
  margin: 0 auto;
  max-width: 420px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.action {
  padding-top: 24px;
}

.link {
  display: inline-block;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 16px;
  padding: 3px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: border-color 0.25s, color 0.25s;
}

.link:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-2);
}

.hint {
  margin-top: 56px;
  font-size: 11px;
  color: var(--vp-c-text-3);
  letter-spacing: 0.5px;
}

.hint-label {
  display: inline-block;
  margin-right: 6px;
  padding: 1px 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 3px;
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}
</style>
