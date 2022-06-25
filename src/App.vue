<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
    name: "App",
    components: {
        HelloWorld,
    },
};
</script>

<style lang="scss">
// @import url(@/css/reset.css);
// @import url(@/css/global_variables.css);
body {
    background-color: #e418ff;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #7db3e9;
    // background-color: #27272a;
    margin-top: 60px;
}
</style>
