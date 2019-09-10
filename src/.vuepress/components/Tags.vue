<template>
  <div>
    {{ tags }} 
    <a v-for="tag in tags":href="tag">{{ tag }}</a>
  </div>
</template>

<script>
export default {
  computed: {
    tags () {
      return Object.keys
    }
  }
}
</script>
