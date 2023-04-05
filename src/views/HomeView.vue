<template>
  <main class="homepage" :class="{ 'homepage--on-play': readyForPlay }">
    <h2 class="on-mobile-title" :class="{ '_hide': readyForPlay }">Amőba</h2>
    <div class="playground-grid" :class="{ 'playground-grid--on-play': readyForPlay }">
      <span v-for="i in 162" class="playground-grid--elem" v-if="!readyForPlay"></span>

      <div class="playground-grid--row" v-if="readyForPlay" v-for="k in boardInputs.rows">
        <div class="playground-grid--square" v-if="readyForPlay" 
              v-for="j in boardInputs.columns" @click="clickOnSquare(j-1, k-1, $event)">
        </div>
      </div>
      <div class="welcome-screen cover-screen" v-if="!readyForPlay">
        <div class="form-grid-section">
          <div class="input-wrapper">
            <label for="columns" class="input-description">Oszlopok és sorok száma:</label>
            <input type="number" id="columns" min="3" v-model="boardInputs.columns">
            <input type="number" id="rows" min="3" v-model="boardInputs.rows">  
          </div>
          <div class="input-wrapper">
            <label for="symbols" class="input-description">Egyező jelek száma:</label>
            <input type="number" id="symbols" min="3" v-model="boardInputs.symbols">    
          </div>
          <!-- 1st player -->
          <div class="input-wrapper">
            <label for="player-1" class="input-description">1. játékos neve:</label>
            <input type="text" id="player-1" name="form-player-one" v-model="playerOne.name">  
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
            <input type="text" id="player-2" name="form-player-two" v-model="playerTwo.name">  
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
    <MobileFooter v-if="readyForPlay" />
  </main>
</template>

<script>
  import MobileFooter from '../components/MobileFooter.vue'

  export default {
    name: "Home",
    components: {
      MobileFooter
    },
    data() {
        return {
            playerOne: { name: "", avatar: "" },
            playerTwo: { name: "", avatar: "" },
            winner: { name: "", score: 0 },
            readyForPlay: false,
            gameOver: false,
            boardInputs: { columns: 0, rows: 0, symbols: 0 },
            board: [],
            startingX: true
        };
    },
    methods: {
        checkPlayerInfos() {
            if (this.boardInputs.columns === "" || this.boardInputs.columns < 3) {
                return false;
            }
            if (this.boardInputs.rows === "" || this.boardInputs.rows < 3) {
                return false;
            }
            if (this.boardInputs.symbols === "" || this.boardInputs.symbols < 3) {
                return false;
            }
            if (this.boardInputs.symbols > (Math.min(this.boardInputs.columns, this.boardInputs.rows))) {
                return false;
            }
            if (this.playerOne.name === "") {
                return false;
            }
            if (this.playerOne.avatar === "") {
                return false;
            }
            if (this.playerTwo.name === "") {
                return false;
            }
            if (this.playerTwo.avatar === "") {
                return false;
            }
            return true;
        },
        startTheGame() {
            for (let i = 0; i < this.boardInputs.rows; i++) {
                for (let k = 0; k < this.boardInputs.columns; k++) {
                    this.board.push([]);
                }
            }
            // save data to local storage
            this.setStartingDataToLocalStorage();

            // emit players data
            this.emitPlayersData();
        },
        resetPlayers() {
            this.playerOne.name = "";
            this.playerOne.avatar = "";
            this.playerTwo.name = "";
            this.playerTwo.avatar = "";
            this.winner.name = "";
            this.winner.score = 0;
            this.board = [];
            this.readyForPlay = false;
            this.gameOver = false;
            this.startingX = true;
            this.getDataFromLocalStorage();
        },
        clickOnSquare(x, y, e) {
            let currentSymbol = "";

            if (this.startingX) {
                currentSymbol = "x";
            } else {
                currentSymbol = "o";
            }

            if (this.board[x][y] === undefined || this.board[x][y] === null) {
                this.board[x][y] = currentSymbol;
                e.target.classList.add("playground-grid--square-active", "playground-grid--square-active-"+currentSymbol);
                this.checkWinningRow(x, y, currentSymbol);
                this.checkWinningColumn(x, y, currentSymbol);
                this.checkWinningDiagonalReverseSlash(x, y, currentSymbol);
                this.checkWinningDiagonalSlash(x, y, currentSymbol);
                this.startingX = !this.startingX;
                this.setClicksToLocalStorage();
            }
        },
        checkWinningRow(x, y, symbol) {
            let counterLeft = 0;
            let counterRight = 0;
            let positions = [x + 1];
            for (let i = 1; i < this.boardInputs.symbols; i++) {
                if ((x - i >= 0) && this.board[x - i][y] === symbol) {
                    counterLeft++;
                    positions.push(x - i + 1);
                }
                else {
                    break;
                }
            }
            for (let i = 1; i < this.boardInputs.symbols; i++) {
                if (this.board[x + i][y] === symbol) {
                    counterRight++;
                    positions.push(x + i + 1);
                }
                else {
                    break;
                }
            }
            // winner row combination
            if ((counterLeft + counterRight) >= (this.boardInputs.symbols - 1)) {
                positions.forEach((elem) => {
                    document.querySelector(".playground-grid--row:nth-child(" + (y + 1) + ") .playground-grid--square:nth-child(" + elem + ")").classList.add("playground-grid--square-winner");
                });
                this.avatarOnWinnersBoardRow(positions, y);
                this.winnerNameAndScore();
                this.sendWinnerData();
                this.gameOver = true;
            }
        },
        checkWinningColumn(x, y, symbol) {
            let counterUp = 0;
            let counterDown = 0;
            let positions = [y + 1];
            for (let i = 1; i < this.boardInputs.symbols; i++) {
                if ((y - i >= 0) && this.board[x][y - i] === symbol) {
                    counterUp++;
                    positions.push(y - i + 1);
                }
                else {
                    break;
                }
            }
            for (let i = 1; i < this.boardInputs.symbols; i++) {
                if (this.board[x][y + i] === symbol) {
                    counterDown++;
                    positions.push(y + i + 1);
                }
                else {
                    break;
                }
            }
            // winner column combination
            if ((counterUp + counterDown) >= (this.boardInputs.symbols - 1)) {
                positions.forEach((elem) => {
                    document.querySelector(".playground-grid--row:nth-child(" + elem + ") .playground-grid--square:nth-child(" + (x + 1) + ")").classList.add("playground-grid--square-winner");
                });
                this.avatarOnWinnersBoardColumn(positions, x);
                this.winnerNameAndScore();
                this.sendWinnerData();
                this.gameOver = true;
            }
        },
        checkWinningDiagonalReverseSlash(x, y, symbol) {
            let counterLeftUp = 0;
            let counterRightDown = 0;
            let positions = [[x + 1, y + 1]];
            for (let i = 1; i < this.boardInputs.symbols; i++) {
                if ((x - i >= 0) && this.board[x - i][y - i] === symbol) {
                    counterLeftUp++;
                    positions.push([x - i + 1, y - i + 1]);
                }
                else {
                    break;
                }
            }
            for (let i = 1; i < this.boardInputs.symbols; i++) {
                if (this.board[x + i][y + i] === symbol) {
                    counterRightDown++;
                    positions.push([x + i + 1, y + i + 1]);
                }
                else {
                    break;
                }
            }
            // winner diagonal combination
            if ((counterLeftUp + counterRightDown) >= (this.boardInputs.symbols - 1)) {
                positions.forEach((elem) => {
                    document.querySelector(".playground-grid--row:nth-child(" + elem[1] + ") .playground-grid--square:nth-child(" + elem[0] + ")").classList.add("playground-grid--square-winner");
                });
                this.avatarOnWinnersBoardDiagonal(positions);
                this.winnerNameAndScore();
                this.sendWinnerData();
                this.gameOver = true;
            }
        },
        checkWinningDiagonalSlash(x, y, symbol) {
            let counterRightUp = 0;
            let counterLeftDown = 0;
            let positions = [[x + 1, y + 1]];
            for (let i = 1; i < this.boardInputs.symbols; i++) {
                if ((x - i >= 0) && this.board[x - i][y + i] === symbol) {
                    counterLeftDown++;
                    positions.push([x - i + 1, y + i + 1]);
                }
                else {
                    break;
                }
            }
            for (let i = 1; i < this.boardInputs.symbols; i++) {
                if (this.board[x + i][y - i] === symbol) {
                    counterRightUp++;
                    positions.push([x + i + 1, y - i + 1]);
                }
                else {
                    break;
                }
            }
            // winner diagonal combination
            if ((counterLeftDown + counterRightUp) >= (this.boardInputs.symbols - 1)) {
                positions.forEach((elem) => {
                    document.querySelector(".playground-grid--row:nth-child(" + elem[1] + ") .playground-grid--square:nth-child(" + elem[0] + ")").classList.add("playground-grid--square-winner");
                });
                this.avatarOnWinnersBoardDiagonal(positions);
                this.winnerNameAndScore();
                this.sendWinnerData();
                this.gameOver = true;
            }
        },
        avatarOnWinnersBoardRow(positions, y) {
            const firstPosition = Math.min(...positions);
            const lastPosition = Math.max(...positions);
            
            if (lastPosition < this.boardInputs.columns) {
                const lastSquare = document.querySelector(".playground-grid--row:nth-child(" + (y + 1) + ") .playground-grid--square:nth-child(" + lastPosition + ")");
                lastSquare.classList.add("playground-grid--square-last-horizontal");
                lastSquare.appendChild(this.makeDivWithWinnerIcon());
            }
            else {
                const firstSquare = document.querySelector(".playground-grid--row:nth-child(" + (y + 1) + ") .playground-grid--square:nth-child(" + firstPosition + ")");
                firstSquare.classList.add("playground-grid--square-first-horizontal");
                firstSquare.appendChild(this.makeDivWithWinnerIcon());
            }
        },
        avatarOnWinnersBoardColumn(positions, x) {
            const firstPosition = Math.min(...positions);
            const lastPosition = Math.max(...positions);

            if (lastPosition < this.boardInputs.rows) {
                const lastSquare = document.querySelector(".playground-grid--row:nth-child(" + lastPosition + ") .playground-grid--square:nth-child(" + (x + 1) + ")");
                lastSquare.classList.add("playground-grid--square-last-vertical");
                lastSquare.appendChild(this.makeDivWithWinnerIcon());
            }
            else {
                const firstSquare = document.querySelector(".playground-grid--row:nth-child(" + firstPosition + ") .playground-grid--square:nth-child(" + (x + 1) + ")");
                firstSquare.classList.add("playground-grid--square-first-vertical");
                firstSquare.appendChild(this.makeDivWithWinnerIcon());
            }
        },
        avatarOnWinnersBoardDiagonal(positions) {
            function sortFunction(a, b) { if (a[0] < b[0]) {
                return -1;
            }
            else {
                return 1;
            } }
            const sortedPositions = positions.sort(sortFunction);
            const lastXPosition = sortedPositions[this.boardInputs.symbols - 1][0];
            const lastYPosition = sortedPositions[this.boardInputs.symbols - 1][1];
            const firstXPosition = sortedPositions[0][0];
            const firstYPosition = sortedPositions[0][1];

            if (lastXPosition < this.boardInputs.columns) {
                const lastSquare = document.querySelector(".playground-grid--row:nth-child(" + lastYPosition + ") .playground-grid--square:nth-child(" + lastXPosition + ")");
                lastSquare.classList.add("playground-grid--square-last-horizontal");
                lastSquare.appendChild(this.makeDivWithWinnerIcon());
            }
            else {
                const firstSquare = document.querySelector(".playground-grid--row:nth-child(" + firstYPosition + ") .playground-grid--square:nth-child(" + firstXPosition + ")");
                firstSquare.classList.add("playground-grid--square-first-horizontal");
                firstSquare.appendChild(this.makeDivWithWinnerIcon());
            }
        },
        makeDivWithWinnerIcon() {
            const avatarContainer = document.createElement("div");

            if (this.startingX === true) {
                avatarContainer.classList.add("winner-icon", "winner-icon-" + this.playerOne.avatar);
            } else {
                avatarContainer.classList.add("winner-icon", "winner-icon-" + this.playerTwo.avatar);
            }

            return avatarContainer;
        },
        winnerNameAndScore() {
            if (this.startingX) {
                this.winner.name = this.playerOne.name;
                this.board.forEach((elems) => {
                    elems.forEach((elem) => {
                        if (elem === "x") {
                            this.winner.score++;
                        }
                    });
                });
            }
            else {
                this.winner.name = this.playerTwo.name;
                this.board.forEach((elems) => {
                    elems.forEach((elem) => {
                        if (elem === "o") {
                            this.winner.score++;
                        }
                    });
                });
            }
        },
        sendWinnerData() {
            const authToken = import.meta.env.VITE_AUTH_TOKEN;
            fetch("https://eomxihgqom5ex61.m.pipedream.net/result", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    user: this.winner.name,
                    score: this.winner.score
                })
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err.message));
        },
        emitPlayersData(){
            this.emitter.emit("gameStarted", this.readyForPlay);
            this.emitter.emit("playerAvatars", { playerOneAvatar: this.playerOne.avatar, playerTwoAvatar: this.playerTwo.avatar });
        },
        setStartingDataToLocalStorage(){
            localStorage.setItem("board", JSON.stringify(this.board));
            localStorage.setItem("boardInputs", JSON.stringify(this.boardInputs));
            localStorage.setItem("playerOne", JSON.stringify(this.playerOne));
            localStorage.setItem("playerTwo", JSON.stringify(this.playerTwo));

            this.readyForPlay = true;
            localStorage.setItem("readyForPlay", JSON.stringify(this.readyForPlay));
        },
        setClicksToLocalStorage(){
            localStorage.setItem("board", JSON.stringify(this.board));
            localStorage.setItem("startingX", JSON.stringify(this.startingX));
        },
        getDataFromLocalStorage(){
            const getPlayerOne = localStorage.getItem("playerOne");
            const getPlayerTwo = localStorage.getItem("playerTwo");
            const getReadyForPlay = localStorage.getItem("readyForPlay");
            const getBoard = localStorage.getItem("board");
            const getBoardInputs = localStorage.getItem("boardInputs");
            const getStartingX = localStorage.getItem("startingX");

            this.playerOne = JSON.parse(getPlayerOne || '{"name": "", "avatar": ""}');
            this.playerTwo = JSON.parse(getPlayerTwo || '{"name": "", "avatar": ""}');
            this.readyForPlay = JSON.parse(getReadyForPlay || 'false');
            this.board = JSON.parse(getBoard || '[]');
            this.boardInputs = JSON.parse(getBoardInputs || '{"columns": 18, "rows": 9, "symbols": 5}');
            this.startingX = JSON.parse(getStartingX || 'true');

            if (getPlayerOne && getPlayerTwo !== null) {
                this.emitPlayersData();
            }
        },
        checkBoardHistory(){
            this.board.forEach((rows, index) => {
                rows.forEach((square, indexRow) => {
                    if (square !== null){
                        document.querySelector(".playground-grid--row:nth-child(" + (indexRow+1) + ") .playground-grid--square:nth-child(" + (index+1) + ")")
                        .classList.add("playground-grid--square-active", "playground-grid--square-active-"+square+"");
                    }
                })
            });
        }
    },
    created() {
        this.emitter.on("newGame", () => {
            this.resetPlayers();
        });

        this.emitter.emit('onHomepage');

        this.getDataFromLocalStorage();
    },
    mounted() {
        this.checkBoardHistory();    
    }
}
</script>

<style scoped>
  @import "../assets/scss/compiled/home.min.css";
</style>
