<template>
  <div class="tags-page">
    <ul>
      <li v-for="tag,index in Object.keys(tags)" :key="'t'+index">
        <router-link :to="{ path: `/tags/#${tag}`}" :class="['title-tags','color'+index]">{{tag}}</router-link>
      </li>
    </ul>

    <div v-for="tag,index in Object.keys(tags)" :key="'s'+index">
      <h2 :id="tag">
        <a href="#" class="header-anchor" aria-hidden="true">#</a>
        <i class="fas fa-tags"></i>
        {{tag}}
      </h2>

      <ul :style="{listStyle: 'none'}">
        <li v-for="page,index in tags[tag]" :key="'b'+index">
          <router-link :to="{ path: page.path}" class="title-link">
            <i class="far fa-file-alt"></i>
            {{page.title}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    tags() {
      let tags = {};
      for (let page of this.$site.pages) {
        for (let index in page.frontmatter.tags) {
          const tag = page.frontmatter.tags[index];
          if (tag in tags) {
            tags[tag].push(page);
          } else {
            tags[tag] = [page];
          }
        }
      }
      return tags;
    }
  }
};
</script>
<style lang="stylus" scoped>
.tags-page {
  h2 {
    margin-top: -3.1rem;
    padding-top: 4.6rem;
    margin-bottom: 0;
  }

  li {
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    margin-right: 5px;
  }
}
i {
  font-size: 14px;
  margin-right: 3px;
}
*,
::after,
::before {
  box-sizing: border-box;
}
div {
  display: block;
}
.d-inline {
  display: inline-block !important;
}
.capture-image {
  display: block;
  margin: 10px auto 0;
  width: auto;
}
.title-tags {
  border-radius: 3px;
  padding: 0 4px;
  color: #fff;
  background: #42b983;
}

.color0 {
  background: #42b999;
}
.color1 {
  background: #3366cc;
}
.color2 {
  background: #dc3912;
}
.color3 {
  background: #ff9900;
}
.color4 {
  background: #109618;
}
.color5 {
  background: #990099;
}
.color6 {
  background: #0099c6;
}
.color7 {
  background: #dd4477;
}
.color8 {
  background: #66aa00;
}
.color9 {
  background: #b82e2e;
}
.color10 {
  background: #316395;
}
.color11 {
  background: #3366cc;
}
.color12 {
  background: #994499;
}
.color13 {
  background: #22aa99;
}
.color14 {
  background: #aaaa11;
}
.color15 {
  background: #6633cc;
}
.color16 {
  background: #e67300;
}
.color17 {
  background: #8b0707;
}
.color18 {
  background: #651067;
}
.color19 {
  background: #329262;
}
.color20 {
  background: #5574a6;
}
</style>