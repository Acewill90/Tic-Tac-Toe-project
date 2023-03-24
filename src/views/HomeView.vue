<template>
  <main class="homepage">
    <div class="playground-grid">
      <span v-for="i in 162" class="playground-grid--elem" @click="clickOnSquare(i, $event)"></span>
      <div class="welcome-screen" v-if="!readyForPlay">
        <div class="form-grid-section">
          <!-- 1st player -->
          <div class="input-wrapper">
            <label for="player-1" class="input-description">1. játékos neve:</label>
            <input type="text" id="player-1" name="form-player-one" required v-model="playerOne.name">  
          </div>
          <div class="input-wrapper">
            <span class="input-description">Válassz karaktert!</span>
            <div class="radio-wrapper">
              <input type="radio" id="avatar-grey" v-model="playerOne.avatar" value="avatar_grey">
              <label for="avatar-grey"></label>
              <img src="../assets/images/avatar_grey.svg" width="80" height="80" alt="bear-grey">
            </div>
            <div class="radio-wrapper">
              <input type="radio" id="avatar-brown" v-model="playerOne.avatar" value="avatar_brown">
              <label for="avatar-brown"></label>
              <img src="../assets/images/avatar_brown.svg" width="80" height="80" alt="bear-brown">
            </div>
            <div class="radio-wrapper">
              <input type="radio" id="avatar-white" v-model="playerOne.avatar" value="avatar_white">
              <label for="avatar-white"></label>
              <img src="../assets/images/avatar_white.svg" width="80" height="80" alt="bear-white">
            </div>  
          </div>
          <!-- 2nd player -->
          <div class="input-wrapper">
            <label for="player-2" class="input-description">2. játékos neve:</label>
            <input type="text" id="player-2" name="form-player-two" required v-model="playerTwo.name">  
          </div>
          <div class="input-wrapper">
            <span class="input-description">Válassz karaktert!</span>
            <div class="radio-wrapper">
              <input type="radio" id="avatar-grey-2" v-model="playerTwo.avatar" value="avatar_grey">
              <label for="avatar-grey-2"></label>
              <img src="../assets/images/avatar_grey.svg" width="80" height="80" alt="bear-grey">
            </div>
            <div class="radio-wrapper">
              <input type="radio" id="avatar-brown-2" v-model="playerTwo.avatar" value="avatar_brown">
              <label for="avatar-brown-2"></label>
              <img src="../assets/images/avatar_brown.svg" width="80" height="80" alt="bear-brown">
            </div>
            <div class="radio-wrapper">
              <input type="radio" id="avatar-white-2" v-model="playerTwo.avatar" value="avatar_white">
              <label for="avatar-white-2"></label>
              <img src="../assets/images/avatar_white.svg" width="80" height="80" alt="bear-white">
            </div>  
          </div>
          <button :disabled="checkPlayerInfos() === false" type="button" 
                  class="button play-btn" @click="startTheGame">
            <span>Játék indítása</span>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        playerOne: {name: '', avatar: '', mark: 'X'},
        playerTwo: {name: '', avatar: ''},
        readyForPlay: false,
        boardForX: new Array(162),
        boardForO: new Array(162),
        startingX: true,
        winningPattern: [
          [1,2,3,4,5],[2,3,4,5,6],[3,4,5,6,7],[4,5,6,7,8],[5,6,7,8,9],[6,7,8,9,10],[7,8,9,10,11],[8,9,10,11,12],
          [9,10,11,12,13],[10,11,12,13,14],[11,12,13,14,15],[12,13,14,15,16],[13,14,15,16,17],[14,15,16,17,18],
        ]
      }
    },
    methods: {
      checkPlayerInfos(){
        if (this.playerOne.name === '') {
          return false;
        }

        if (this.playerOne.avatar === '') {
          return false;
        }

        if (this.playerTwo.name === '') {
          return false;
        }

        if (this.playerTwo.avatar === '') {
          return false;
        }
        
        return true;
      },

      startTheGame(){
        this.readyForPlay = true;
        this.emitter.emit('gameStarted', this.readyForPlay);
        this.emitter.emit('playerAvatars', 
        { playerOneAvatar: this.playerOne.avatar, playerTwoAvatar: this.playerTwo.avatar });
      },

      resetPlayers(){
        this.playerOne.name = '';
        this.playerOne.avatar = '';
        this.playerTwo.name = '';
        this.playerTwo.avatar = '';
        this.readyForPlay = false;
      },

      clickOnSquare(position, e){
        // const arr1 = [ 1, 2, 10];
        // const arr2 = [ 3, 5, 4, 2, 7, 0, 1, 10, undefined, 'reserved' ];

        // const hasAllElems = arr1.every(elem => arr2.includes(elem));

        // console.log(hasAllElems);

        
        if (this.startingX) {
          if (this.boardForX[position-1] === undefined) { 
            this.boardForX[position-1] = position;
            this.boardForO[position-1] = 'reserved';
            this.startingX = false;
            e.target.classList.add('playground-grid--elem-active', 'playground-grid--elem-active-x');
            for (let i = 0; i < this.winningPattern.length; i++){
              const isWinner = this.winningPattern[i].every(element => this.boardForX.includes(element));
              if (isWinner){
                this.winningPattern[i].forEach(position => 
                  document.querySelector('.playground-grid--elem:nth-child('+position+')').classList.add('playground-grid--elem-winner')
                )  
              } 
            }
          }          
        } else {
          if (this.boardForO[position-1] === undefined) {
            this.boardForO[position-1] = position;
            this.boardForX[position-1] = 'reserved';
            this.startingX = true;
            e.target.classList.add('playground-grid--elem-active', 'playground-grid--elem-active-o');
          }  
        }
      }
    },
    created (){
      this.emitter.on("newGame", () => {
          this.resetPlayers();
      });
    }
  }
</script>

<style>
  @import "../assets/scss/compiled/home.min.css";
</style>
