<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>WebAssembly in action!</h1>
                <app-result></app-result>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
    import Result from './components/Result.vue';

    export default {
        components: {
            appResult: Result,
        }
    }
</script>

