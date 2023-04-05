<template>
  <main class="homepage">
    <div class="scores-wrapper">
      <div class="scores-wrapper--bckg">
        <span v-for="i in 300" class="scores-wrapper--elem"></span>
      </div>
      <h2 class="h1">Toplista</h2>
      <div class="list">
        <div class="list--box" v-for="winner in winners.scores">
          <span class="list--elem">name: "{{ winner.name }}",</span>
          <span class="list--elem">score: {{ winner.score }}</span>
        </div>
      </div>
    </div>
    <MobileFooter />
  </main>
</template>

<script>
import MobileFooter from '../components/MobileFooter.vue'

export default {
  name: "Top scores",
  components: {
    MobileFooter
  },
  data() {
    return {
      winners: []
    }
  },

  mounted() {    
    const authToken = import.meta.env.VITE_AUTH_TOKEN;

    fetch('https://eomxihgqom5ex61.m.pipedream.net/high-scores', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(res => res.json())
    .then(data => this.winners = data)
    .catch(err => console.log(err.message))

  },

  created() {
    this.emitter.emit('onScoresPage');
  }
}
</script>

<style scoped>
  @import "../assets/scss/compiled/scores.min.css";
</style>
