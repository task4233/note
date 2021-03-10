---
date: 2019-08-29
description: 'css Menuのメモ'
tags:
 - CSS
---

# メモ付きCSS
 - 下の方のCSSの意味が理解できなかったので, メモとして残しておく
```
<template>
  <div id="app">
    <div id="headerWrap">
    <div class="js-modal-bk" @click="modalBkClick" :class="{active:modal_bk}"></div>
    <header class="header">
      <div class="headerInner">
        <div
          id="js-open-menu"
          class="header__menu"
          @click="mainMenuToggle"
          :class="{active:headerMenu_state}"
        >
          <!-- メニューの三本線 -->
          <span class="header__menu__line"></span>
          <span class="header__menu__line"></span>
          <span class="header__menu__line"></span>
        </div>
        <!-- header__menu -->

        <!-- MENU INNER - start --------------------------------------------------------------------------------------------->
        <div class="header__menu__inner" :class="{active:headerMenu_state}">
          <ul class="header__menuList">
            <li>
              <a href>
                <span>sample</span>
              </a>
            </li>
            <li>
              <a href>
                <span>sample</span>
              </a>
            </li>
          </ul>
          <!-- header__menuList -->
        </div>
        <!-- header__menu__inner -->
        <!-- MENU INNER - end --------------------------------------------------------------------------------------------->
        <h1 class="header__logo">logo</h1>
      </div>
      <!-- headerInner -->
    </header>
    </div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: '#headerWrap',
  data () {
    return {
      headerMenu_state: false,
      modal_bk: false
    }
  },
  methods: {
    mainMenuToggle: function () {
      if (this.headerMenu_state) {
        this.headerMenu_state = false
        this.modal_bk = false
        return
      }
      this.headerMenu_state = true
      this.modal_bk = true
    },
    modalBkClick: function () {
      this.headerMenu_state = false
      this.modal_bk = false
    }
  }
}
</script>

<style lang="scss">
/* ------------------------------------ */
/* reset css setting                   */
/* ------------------------------------ */
div {
  margin: 0;
  padding: 0;
  border: 0;
  color: #333333;
  font-size: 100%;
  vertical-align: baseline;
  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 500; // 文字の太さ
  line-height: 1.4; // 行間隔
}

article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

li {
  list-style: none; // listの・を消す
}

.js-modal-bk {
  opacity: 0;
  visibility: hidden;
  position: fixed;
  z-index: 12;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  transition: all 0.3s;
}

.js-modal-bk.active {
  opacity: 1;
  visibility: visible;
  height: 100vh;
  overflow: hidden;
}

.header {
  position: fixed;
  z-index: 12;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  border: 2px solid #ccc;
}

.headerInner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__menu {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  width: 44px;
  height: 46px;
  padding: 13px 10px;
  transition: all 0.4s;
}
.header__menu .header__menu__line {
  display: block;
  width: 15px;
  height: 2px;
  margin: 0 auto 0 0;
  background: #0257BD;
  transition: all 0.4s;
}
/* ここだけ線を短くしてる */
.header__menu .header__menu__line:nth-child(3) {
  width: 10px;
}

.header__menu.active .header__menu__line {
  position: relative;
  width: 17px;
}
.header__menu.active .header__menu__line:nth-of-type(1) {
  top: -2px;
  transform: translateY(5px) rotate(-45deg);
}
.header__menu.active .header__menu__line:nth-of-type(2) {
  opacity: 0;
}
.header__menu.active .header__menu__line:nth-of-type(3) {
  top: 0;
  width: 17px;
  transform: translateY(-10px) rotate(45deg);
}

.header__notice {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 7px;
  right: -5px;
  min-width: 20px;
  min-height: 20px;
  padding: 2px;
  box-sizing: border-box;
  background: #e9545d;
  border-radius: 50%;
  color: #fff;
  font-size: 10px;
}
.header__notice span {
  display: inline-block;
  margin-left: 2px;
  color: #fff;
}

.header__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 32%;
  margin: auto;
}

.header__iconWrap {
  display: flex;
}

.header__icon {
  display: block;
  padding: 10px 11px;
}
.header__icon img {
  width: 100%;
}

.header__menu__inner {
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  height: calc(100vh - 46px);
  background: #fff;
  font-size: 14px;
  transform: translateX(-100%);
  transition: all 0.3s;
}

.header__menu__inner.active {
  transform: translateX(0);
}

/* ----------------- */
/* ここからメニュー内部 */
/* ----------------- */

.header__menuList {
  margin-bottom: 20px;
}

/* リンクごとの線を引いている */
.header__menuList > li {
  position: relative;
  border-bottom: 1px solid #f0f3f6;
}

/* 右にある矢印を描画 */
.header__menuList > li:after {
  position: absolute;
  top: 0;
  right: 18px;
  bottom: 0;
  left: auto;
  width: 0;
  height: 0;
  content: "";
  margin: auto;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid #0257bd;
}
</style>
```

## Ref
 - [【Vue.js】ハンバーガーメニュー作成](https://codepen.io/hiroya/pen/jdVrRG/)
