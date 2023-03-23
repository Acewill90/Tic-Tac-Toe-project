<template>
  <Header />

  <RouterView />
</template>

<script>
  import {RouterView, RouterLink} from 'vue-router'
  import Header from './components/Header.vue'

  export default {
    name: 'App',
    components: {
      Header
    },
    
  }
</script>
