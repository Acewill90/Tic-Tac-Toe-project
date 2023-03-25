<template>
  <h1>This is a score page</h1>
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
