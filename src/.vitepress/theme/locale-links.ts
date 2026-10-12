// vitepress/dist/client/theme-default/composables/langs.js（1.6.4）の差し替え。
// 言語切替（correspondingLink: true）では、対になるページが存在しない locale を出さない。
// availableLocales は config.ts の transformPageData が設定する（ADR 0002）
import { computed } from 'vue'
import { useData } from 'vitepress'

export function useLangs({ correspondingLink = false } = {}) {
  const { site, localeIndex, page, theme, hash, frontmatter } = useData()
  const currentLang = computed(() => ({
    label: site.value.locales[localeIndex.value]?.label,
    link:
      site.value.locales[localeIndex.value]?.link ||
      (localeIndex.value === 'root' ? '/' : `/${localeIndex.value}/`),
  }))

  const localeLinks = computed(() => {
    const available: string[] | undefined = frontmatter.value.availableLocales
    return Object.entries(site.value.locales).flatMap(([key, value]) => {
      if (currentLang.value.label === value.label) return []
      if (correspondingLink && available && !available.includes(key)) return []
      return {
        text: value.label,
        link:
          normalizeLink(
            value.link || (key === 'root' ? '/' : `/${key}/`),
            theme.value.i18nRouting !== false && correspondingLink,
            page.value.relativePath.slice(currentLang.value.link.length - 1),
            !site.value.cleanUrls,
          ) + hash.value,
      }
    })
  })

  return { localeLinks, currentLang }
}

function normalizeLink(link: string, addPath: boolean, path: string, addExt: boolean) {
  if (!addPath) return link
  const p = path.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, addExt ? '.html' : '')
  return link.replace(/\/$/, '') + (p.startsWith('/') ? p : '/' + p)
}
