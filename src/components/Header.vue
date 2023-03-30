<template>
    <header :class="{ 'on-game': readyForPlay, 'on-scores-page': onScoresPage }">
        <picture v-if="playerAvatars.first" class="avatar">
            <img :src="'src/assets/images/'+ playerAvatars.first +'.svg'" width="80" height="80" alt="bear-avatar">
        </picture>
        <RouterLink to="/" class="router-btn">
            <button type="button" @click="resetPlayers" class="button">
                <span>Játék indítása</span>
            </button>
        </RouterLink>
        <h1>Amőba</h1>
        <RouterLink to="/score-list" class="router-btn">
            <button type="button" class="button button--blue">
                <span>Toplista</span>
            </button>
        </RouterLink>
        <picture v-if="playerAvatars.second" class="avatar">
            <img :src="'src/assets/images/'+ playerAvatars.second +'.svg'" width="80" height="80" alt="bear-avatar">
        </picture>
    </header>
</template>

<script>
    import { RouterLink } from 'vue-router'

    export default {
        name: 'Header',
        data() {
            return {
                playerAvatars: {first: '', second: ''},
                readyForPlay: false,
                onScoresPage: false
            }
        },
        methods: {
            removeDataFromLocalStorage(){
                localStorage.removeItem("board");
                localStorage.removeItem("boardInputs");
                localStorage.removeItem("playerOne");
                localStorage.removeItem("playerTwo");
                localStorage.removeItem("readyForPlay");
                localStorage.removeItem("startingX");
            },
            resetPlayers(){
                this.removeDataFromLocalStorage();
                this.playerAvatars.first = '';
                this.playerAvatars.second = '';
                this.readyForPlay = false;
                this.emitter.emit('newGame');
            }
        },
        created (){
            this.emitter.on("gameStarted", data => {
                this.readyForPlay = data;
            });
            this.emitter.on("playerAvatars", data => {
                this.playerAvatars.first =  data.playerOneAvatar;
                this.playerAvatars.second =  data.playerTwoAvatar;
            });
            this.emitter.on("newGameOnFooter", () => {
                this.resetPlayers();
            });
            this.emitter.on("onScoresPage", () => {
                this.onScoresPage = true;
            });
            this.emitter.on("onHomepage", () => {
                this.onScoresPage = false;
            });
        }
    }
</script>
