<template>
  <section class="hero is-info is-fullheight">
    <div class="hero-body">
      <div class="container">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'HeroContainer',
  }
</script>

<style scoped>
div.container {
  min-height: 100vh;
}
</style>
