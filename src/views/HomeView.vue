<template>
  <main class="homepage">
    <div class="playground-grid">
      <span v-for="n in 162" class="playground-grid--elem"></span>
      <div class="welcome-screen">
        <form action="">
          <div class="form-grid-section">
            <div class="input-wrapper">
              <label for="player-1" class="input-description">1. játékos neve:</label>
              <input type="text" id="player-1" name="form-player-one" required v-model="playerOne.name">  
            </div>
            <div class="input-wrapper">
              <span class="input-description">Válassz karaktert!</span>
              <div>
                <input type="radio" id="avatar-grey" v-model="playerOne.avatar" value="avatar-grey">
                <label for="avatar-grey"></label>
              </div>
              <div>
                <input type="radio" id="avatar-brown" v-model="playerOne.avatar" value="avatar-brown">
                <label for="avatar-brown"></label>
              </div>
              <div>
                <input type="radio" id="avatar-white" v-model="playerOne.avatar" value="avatar-white">
                <label for="avatar-white"></label>
              </div>  
            </div>
          </div>  
        </form>  
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        playerOne: {name: '', avatar: ''},
        playerTwo: {name: '', avatar: ''}
      }
    }
  }
</script>

<style>
  @import "../assets/scss/compiled/home.min.css";
</style>
