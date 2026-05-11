<script setup>
defineProps({
  profile: {
    type: Object,
    default: () => ({
      name: 'Takashi Mima',
      title: 'Software Engineer @ Mercari, Inc.',
      bio: 'Identity Platform Team. Web Security as a hobby.',
      image: '/imgs/icon.png',
    }),
  },
  links: {
    type: Array,
    default: () => [
      { label: 'GitHub',      href: 'https://github.com/task4233',               mark: 'GH', color: '#24292F' },
      { label: 'LinkedIn',    href: 'https://www.linkedin.com/in/takashi-mima/', mark: 'in', color: '#0A66C2' },
      { label: 'X',           href: 'https://x.com/task4233',                    mark: 'X',  color: '#000000' },
      { label: 'Qiita',       href: 'https://qiita.com/task4233',                mark: 'Q',  color: '#55C500' },
      { label: 'SpeakerDeck', href: 'https://speakerdeck.com/task4233',          mark: 'SD', color: '#009287' },
    ],
  },
})
</script>

<template>
  <article class="profile-card">
    <img class="avatar" :src="profile.image || '/imgs/icon.png'" :alt="profile.name" />
    <h1 class="name">{{ profile.name }}</h1>
    <p class="title">{{ profile.title }}</p>
    <p class="bio">{{ profile.bio }}</p>

    <a class="save-contact" href="/task4233.vcf" download="task4233.vcf">
      Save Contact
    </a>

    <ul class="links">
      <li v-for="link in links" :key="link.label">
        <a :href="link.href" target="_blank" rel="noopener noreferrer">
          <span class="mark" :style="{ backgroundColor: link.color }">{{ link.mark }}</span>
          <span class="label">{{ link.label }}</span>
          <span class="arrow" aria-hidden="true">→</span>
        </a>
      </li>
    </ul>
  </article>
</template>

<style scoped>
.profile-card {
  max-width: 480px;
  margin: 32px auto;
  padding: 32px 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.avatar {
  display: block;
  width: 128px;
  height: 128px;
  margin: 0 auto;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--vp-c-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.name {
  margin: 16px 0 4px;
  font-size: 1.5rem;
  font-weight: 700;
  border: none;
  padding: 0;
}

.title {
  margin: 0 0 12px;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.bio {
  margin: 0 0 24px;
  font-size: 0.95rem;
  line-height: 1.6;
}

.save-contact {
  display: inline-block;
  width: 100%;
  padding: 12px 24px;
  background: var(--vp-c-brand-1);
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background 0.15s;
}

.save-contact:hover {
  background: var(--vp-c-brand-2);
}

.links {
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
}

.links li + li {
  margin-top: 8px;
}

.links a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: transform 0.15s, box-shadow 0.15s;
}

.links a:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.label {
  flex: 1;
  text-align: left;
  font-weight: 500;
}

.arrow {
  color: var(--vp-c-text-3);
}

@media (max-width: 480px) {
  .profile-card {
    margin: 16px;
    padding: 24px 16px;
  }
}
</style>
