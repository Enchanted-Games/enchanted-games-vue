<template>
    <img alt="Vue logo" src="@/assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
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
    background-color: #ee4e35;
}
#page {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #27272a;
    margin-top: 60px;
}
</style>
