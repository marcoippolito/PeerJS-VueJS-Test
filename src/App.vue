<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Peerjs in action!</h1>
                <app-peerjs></app-peerjs>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
    import Peerjs from './components/Peerjs.vue';

    export default {
        components: {
            appPeerjs: Peerjs
        }
    }
</script>

