<template>
<div>
  <div v-for="page in filteredPages" class="article-container" v-if="page.frontmatter.exclude">
    <h3 class="article-title">
      <router-link :to="page.path">{{page.title || 'No Title'}}</router-link>
    </h3>
    <div class="tag-container">
      <i class="fas fa-tags tag-icon"></i>
      <div v-for="content in page.frontmatter.category" class="tag">{{content}}</div>
    </div>
    <div v-if="page.frontmatter.description" class="article-description">{{page.frontmatter.description}}</div>
  </div>
</div>
</template>


<script>
export default {
  name: 'Articles',
  props: ['pages', 'prefix'],
  computed: {
    filteredPages () {
      return this.pages.filter(page => page.path.includes(this.prefix || '')) 
    }
  }
}
</script>