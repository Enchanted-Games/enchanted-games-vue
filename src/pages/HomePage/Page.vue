<template>
    <PageHeader />
    <div class="main-container">
        <img alt="Vue logo" src="@/assets/logo.png" />
        <GenericSwitch label="Test Label" />
        <GenericSwitch @change="switchChange($event)" label="Starts Checked" startChecked="true" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
import Styles from "@/components/Styles.vue";
import PageHeader from "@/components/PageHeader.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import GenericSwitch from "@/components/GenericSwitch.vue";

export default {
    name: "Page",
    components: {
        Styles,
        PageHeader,
        HelloWorld,
        GenericSwitch,
    },
    methods: {
        switchChange(event) {
            console.log(event.target);
        },
    },
};
</script>

<style lang="scss">
img {
    margin: auto;
}
</style>
