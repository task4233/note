---
layout: page
title: Card
---

<script setup>
const profile = {
  name: 'Takashi Mima',
  title: 'ソフトウェアエンジニア',
  bio: '株式会社メルカリの Identity Platform Team 所属。趣味で Web セキュリティも。',
  image: '/imgs/icon.png',
}
</script>

<ProfileCard :profile="profile" save-label="連絡先を保存" />
