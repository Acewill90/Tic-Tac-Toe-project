<template>
  <main class="homepage">
    <div class="playground-grid">
      <span v-for="i in 162" class="playground-grid--elem"></span>

      <div class="cover-screen cover-screen--scores">
        <h2 class="h1">Toplista</h2>
        <div class="list">
          <div class="list--box" v-for="winner in winners.scores">
            <span class="list--elem">name: "{{ winner.name }}",</span>
            <span class="list--elem">score: {{ winner.score }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Top scores",
  data() {
    return {
      winners: []
    }
  },

  mounted() {    
    const authToken = 'hkew57zhne345hb3kw-zh65u';

    fetch('https://eomxihgqom5ex61.m.pipedream.net/high-scores', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(res => res.json())
    .then(data => this.winners = data)
    .catch(err => console.log(err.message))

  }
}
</script>

<style scoped>
  @import "../assets/scss/compiled/scores.min.css";
</style>
