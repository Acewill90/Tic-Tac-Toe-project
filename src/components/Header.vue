<template>
    <header :class="{ 'on-game': readyForPlay }">
        <picture v-if="playerAvatars.first" class="avatar">
            <img :src="'src/assets/images/'+ playerAvatars.first +'.svg'" width="80" height="80" alt="bear-avatar">
        </picture>
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
        <picture v-if="playerAvatars.second" class="avatar">
            <img :src="'src/assets/images/'+ playerAvatars.second +'.svg'" width="80" height="80" alt="bear-avatar">
        </picture>
    </header>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                playerAvatars: {first: '', second: ''},
                readyForPlay: false
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
        }
    }
</script>
