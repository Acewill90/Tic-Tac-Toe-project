<template>
    <div class="mobile-footer">
        <RouterLink to="/">
            <button type="button" @click="resetPlayers" class="button">
                <span>Játék indítása</span>
            </button>
        </RouterLink>
        <RouterLink to="/score-list">
            <button type="button" class="button button--blue">
                <span>Toplista</span>
            </button>
        </RouterLink>
    </div>
</template>

<script>
    import { RouterLink } from 'vue-router'

    export default {
        name: 'MobileFooter',
        data() {
            return {
                readyForPlay: false
            }
        },
        methods: {
            resetPlayers(){
                this.readyForPlay = false;
                this.emitter.emit('newGameOnFooter');
            }
        },
        created (){
            this.emitter.on("gameStarted2", data => {
                this.readyForPlay = data;
            });
        }
    }
</script>
