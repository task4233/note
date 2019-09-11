<template>
  <div>
    <div v-for="post in posts">
      <h2><router-link v-bind:to="post.path">{{ post.title }}</router-link></h2>
      <p>{{ post.frontmatter.description }}</p>
      Tags: <span v-for="c in post.frontmatter.category" class="tag"><a v-bind:href="$withBase(post.path)">{{c}}</a></span><p></p>
      <router-link v-bind:to="post.path">続きを読む</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    posts () {
      return this.$site.pages
        .filter(post => post.path.startsWith('/article/'))
        .sort((a,b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
    }
  }
}
</script>

<style scoped>
/*タグクラウドのデザイン*/
.tag a {
 padding:10px 0;
 color:#666;
 display:inline-block;
 margin-right: 10px;
 background:none;
 font-size:12px;
 text-decoration:none;
 border-bottom:dotted 1px #ddd;
}

.tag a:hover{
 color:#7fbfff;
 background:#fafafa;
 font-weight:bold;
}

.tag a:before{
 text-shadow:none;
 font-family:"FontAwesome";
 content:"\f02c";
 font-weight:normal;
 color:#eedcb3;
 padding-right:6px;
}
</style>
