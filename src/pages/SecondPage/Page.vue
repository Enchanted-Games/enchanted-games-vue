<template>
    <PageHeader />
    <div class="main-container">
        <img alt="Vue logo" src="@/assets/logo.png" />
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
</template>

<script>
import Styles from "@/components/Styles.vue";
import PageHeader from "@/components/PageHeader.vue";

export default {
    name: "Page",
    components: {
        Styles,
        PageHeader,
    },
};
</script>

<style lang="scss"></style>
