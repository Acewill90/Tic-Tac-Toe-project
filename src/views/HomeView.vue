<template>
  <main class="homepage">
    <div class="playground-grid">
      <span v-for="i in 162" class="playground-grid--elem" @click="clickOnSquare(i, $event)"></span>
      <div class="welcome-screen cover-screen" v-if="!readyForPlay">
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
      <div class="cover-screen" v-if="gameOver"></div>
    </div>
  </main>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        playerOne: {name: '', avatar: ''},
        playerTwo: {name: '', avatar: ''},
        readyForPlay: false,
        gameOver: false,
        boardForX: new Array(162),
        boardForO: new Array(162),
        startingX: true,
        winningPatternFirst: [
          [1,19,37,55,73],[19,37,55,73,91],[37,55,73,91,109],[55,73,91,109,127],[73,91,109,127,145]
        ],
        winningPattern: [
          [1, 2, 3, 4, 5],[2, 3, 4, 5, 6],[3, 4, 5, 6, 7],[4, 5, 6, 7, 8],[5, 6, 7, 8, 9],
          [6, 7, 8, 9, 10],[7, 8, 9, 10, 11],[8, 9, 10, 11, 12],[9, 10, 11, 12, 13],[10, 11, 12, 13, 14],
          [11, 12, 13, 14, 15],[12, 13, 14, 15, 16],[13, 14, 15, 16, 17],[14, 15, 16, 17, 18],
          [19, 20, 21, 22, 23],[20, 21, 22, 23, 24],[21, 22, 23, 24, 25],[22, 23, 24, 25, 26],
          [23, 24, 25, 26, 27],[24, 25, 26, 27, 28],[25, 26, 27, 28, 29],[26, 27, 28, 29, 30],
          [27, 28, 29, 30, 31],[28, 29, 30, 31, 32],[29, 30, 31, 32, 33],[30, 31, 32, 33, 34],
          [31, 32, 33, 34, 35],[32, 33, 34, 35, 36],[37, 38, 39, 40, 41],[38, 39, 40, 41, 42],
          [39, 40, 41, 42, 43],[40, 41, 42, 43, 44],[41, 42, 43, 44, 45],[42, 43, 44, 45, 46],
          [43, 44, 45, 46, 47],[44, 45, 46, 47, 48],[45, 46, 47, 48, 49],[46, 47, 48, 49, 50],
          [47, 48, 49, 50, 51],[48, 49, 50, 51, 52],[49, 50, 51, 52, 53],[50, 51, 52, 53, 54],
          [55, 56, 57, 58, 59],[56, 57, 58, 59, 60],[57, 58, 59, 60, 61],[58, 59, 60, 61, 62],
          [59, 60, 61, 62, 63],[60, 61, 62, 63, 64],[61, 62, 63, 64, 65],[62, 63, 64, 65, 66],
          [63, 64, 65, 66, 67],[64, 65, 66, 67, 68],[65, 66, 67, 68, 69],[66, 67, 68, 69, 70],
          [67, 68, 69, 70, 71],[68, 69, 70, 71, 72],[73, 74, 75, 76, 77],[74, 75, 76, 77, 78],
          [75, 76, 77, 78, 79],[76, 77, 78, 79, 80],[77, 78, 79, 80, 81],[78, 79, 80, 81, 82],
          [79, 80, 81, 82, 83],[80, 81, 82, 83, 84],[81, 82, 83, 84, 85],[82, 83, 84, 85, 86],
          [83, 84, 85, 86, 87],[84, 85, 86, 87, 88],[85, 86, 87, 88, 89],[86, 87, 88, 89, 90],
          [91, 92, 93, 94, 95],[92, 93, 94, 95, 96],[93, 94, 95, 96, 97],[94, 95, 96, 97, 98],
          [95, 96, 97, 98, 99],[96, 97, 98, 99, 100],[97, 98, 99, 100, 101],[98, 99, 100, 101, 102],
          [99, 100, 101, 102, 103],[100, 101, 102, 103, 104],[101, 102, 103, 104, 105],
          [102, 103, 104, 105, 106],[103, 104, 105, 106, 107],[104, 105, 106, 107, 108],
          [109, 110, 111, 112, 113],[110, 111, 112, 113, 114],[111, 112, 113, 114, 115],
          [112, 113, 114, 115, 116],[113, 114, 115, 116, 117],[114, 115, 116, 117, 118],
          [115, 116, 117, 118, 119],[116, 117, 118, 119, 120],[117, 118, 119, 120, 121],
          [118, 119, 120, 121, 122],[119, 120, 121, 122, 123],[120, 121, 122, 123, 124],
          [121, 122, 123, 124, 125],[122, 123, 124, 125, 126],[127, 128, 129, 130, 131],
          [128, 129, 130, 131, 132],[129, 130, 131, 132, 133],[130, 131, 132, 133, 134],
          [131, 132, 133, 134, 135],[132, 133, 134, 135, 136],[133, 134, 135, 136, 137],
          [134, 135, 136, 137, 138],[135, 136, 137, 138, 139],[136, 137, 138, 139, 140],
          [137, 138, 139, 140, 141],[138, 139, 140, 141, 142],[139, 140, 141, 142, 143],
          [140, 141, 142, 143, 144],[145, 146, 147, 148, 149],[146, 147, 148, 149, 150],
          [147, 148, 149, 150, 151],[148, 149, 150, 151, 152],[149, 150, 151, 152, 153],
          [150, 151, 152, 153, 154],[151, 152, 153, 154, 155],[152, 153, 154, 155, 156],
          [153, 154, 155, 156, 157],[154, 155, 156, 157, 158],[155, 156, 157, 158, 159],
          [156, 157, 158, 159, 160],[157, 158, 159, 160, 161],[158, 159, 160, 161, 162],
          [1, 19, 37, 55, 73],[19, 37, 55, 73, 91],[37, 55, 73, 91, 109],[55, 73, 91, 109, 127],
          [73, 91, 109, 127, 145],[2, 20, 38, 56, 74],[20, 38, 56, 74, 92],[38, 56, 74, 92, 110],
          [56, 74, 92, 110, 128],[74, 92, 110, 128, 146],[3, 21, 39, 57, 75],[4, 22, 40, 58, 76],
          [5, 23, 41, 59, 77],[6, 24, 42, 60, 78],[7, 25, 43, 61, 79],[8, 26, 44, 62, 80],
          [9, 27, 45, 63, 81],[10, 28, 46, 64, 82],[11, 29, 47, 65, 83],[12, 30, 48, 66, 84],
          [13, 31, 49, 67, 85],[14, 32, 50, 68, 86],[15, 33, 51, 69, 87],[16, 34, 52, 70, 88],
          [17, 35, 53, 71, 89],[18, 36, 54, 72, 90],[21, 39, 57, 75, 93],[22, 40, 58, 76, 94],
          [23, 41, 59, 77, 95],[24, 42, 60, 78, 96],[25, 43, 61, 79, 97],[26, 44, 62, 80, 98],
          [27, 45, 63, 81, 99],[28, 46, 64, 82, 100],[29, 47, 65, 83, 101],[30, 48, 66, 84, 102],
          [31, 49, 67, 85, 103],[32, 50, 68, 86, 104],[33, 51, 69, 87, 105],[34, 52, 70, 88, 106],
          [35, 53, 71, 89, 107],[36, 54, 72, 90, 108],[39, 57, 75, 93, 111],[40, 58, 76, 94, 112],
          [41, 59, 77, 95, 113],[42, 60, 78, 96, 114],[43, 61, 79, 97, 115],[44, 62, 80, 98, 116],
          [45, 63, 81, 99, 117],[46, 64, 82, 100, 118],[47, 65, 83, 101, 119],[48, 66, 84, 102, 120],
          [49, 67, 85, 103, 121],[50, 68, 86, 104, 122],[51, 69, 87, 105, 123],[52, 70, 88, 106, 124],
          [53, 71, 89, 107, 125],[54, 72, 90, 108, 126],[57, 75, 93, 111, 129],[58, 76, 94, 112, 130],
          [59, 77, 95, 113, 131],[60, 78, 96, 114, 132],[61, 79, 97, 115, 133],[62, 80, 98, 116, 134],
          [63, 81, 99, 117, 135],[64, 82, 100, 118, 136],[65, 83, 101, 119, 137],[66, 84, 102, 120, 138],
          [67, 85, 103, 121, 139],[68, 86, 104, 122, 140],[69, 87, 105, 123, 141],[70, 88, 106, 124, 142],
          [71, 89, 107, 125, 143],[72, 90, 108, 126, 144],[75, 93, 111, 129, 147],[76, 94, 112, 130, 148],
          [77, 95, 113, 131, 149],[78, 96, 114, 132, 150],[79, 97, 115, 133, 151],[80, 98, 116, 134, 152],
          [81, 99, 117, 135, 153],[82, 100, 118, 136, 154],[83, 101, 119, 137, 155],[84, 102, 120, 138, 156],
          [85, 103, 121, 139, 157],[86, 104, 122, 140, 158],[87, 105, 123, 141, 159],
          [88, 106, 124, 142, 160],[89, 107, 125, 143, 161],[90, 108, 126, 144, 162]
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
        this.gameOver = false;
      },

      clickOnSquare(position, e){
        // let newArr = [];
        // let finalArr = [];
        // for (let i = 0; i < this.winningPatternFirst.length; i++) {
        //   const innerArrayLength = this.winningPatternFirst[i].length;
        //   // loop the inner array
        //   for (let k = 2; k < 18; k++) {
        //     for (let j = 0; j < innerArrayLength; j++) {
        //         newArr.push(this.winningPatternFirst[i][j]+k)   
        //     }
        //   }      
        // }

        // while (newArr.length > 0) {
        //   finalArr.push(newArr.splice(0,5));
        // }
        // console.log(finalArr);
        
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
                this.gameOver = true;  
              } 
            }
          }          
        } else {
          if (this.boardForO[position-1] === undefined) {
            this.boardForO[position-1] = position;
            this.boardForX[position-1] = 'reserved';
            this.startingX = true;
            e.target.classList.add('playground-grid--elem-active', 'playground-grid--elem-active-o');
            for (let i = 0; i < this.winningPattern.length; i++){
              const isWinner = this.winningPattern[i].every(element => this.boardForO.includes(element));
              if (isWinner){
                this.winningPattern[i].forEach(position => 
                  document.querySelector('.playground-grid--elem:nth-child('+position+')').classList.add('playground-grid--elem-winner')
                )
                this.gameOver = true;  
              } 
            }
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
