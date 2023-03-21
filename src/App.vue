<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/">
      <button type="button" class="button">
        <span>Játék indítása</span>
      </button>
    </RouterLink>
    <h1>Amőba</h1>
    <RouterLink to="/score-list">
      <button type="button" class="button button--blue">
        <span>Toplista</span>
      </button>
    </RouterLink>

    <!-- <nav> 
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
  </header>

  <RouterView />
</template>

<style scoped>

</style>
