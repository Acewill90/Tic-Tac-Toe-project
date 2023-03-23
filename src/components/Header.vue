<template>
    <header :class="{ 'on-game': readyForPlay }">
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
    </header>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                playerOne: {name: '', avatar: ''},
                playerTwo: {name: '', avatar: ''},
                readyForPlay: false
            }
        },
        created (){
            this.emitter.on("gameStarted", data => {
                this.readyForPlay = data;
            });
        }
    }
</script>
