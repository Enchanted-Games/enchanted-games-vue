<template>
    <img alt="Vue logo" src="@/assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "Page",
    components: {
        HelloWorld,
    },
};
</script>

<style lang="scss">
body {
    background-color: #34424a;
}
#page {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #a3c1df;
    margin-top: 60px;
}
</style>
