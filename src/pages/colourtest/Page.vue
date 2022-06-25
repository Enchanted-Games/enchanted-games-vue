<template>
    <Head>
        <title>Colour Test | Enchanted Games</title>
    </Head>
    <PageHeader />
    <div class="main-container">
        <img class="page-header-image" loading="lazy" alt="Page Icon" src="/images/static/404.png" />
        <GeneralSection numberID="0" canCollapse="false" :htmlContent="markdownToHTML" />
        <ColourTest />
    </div>
</template>

<script>
// custom components
import Styles from "@/components/Styles.vue";
import PageHeader from "@/components/PageHeader.vue";
import GenericSwitch from "@/components/GenericSwitch.vue";
import GeneralSection from "@/components/GeneralSection.vue";
import ColourTest from "@/components/ColourTest.vue";

// libraries
import { Head } from "@vueuse/head";

import { marked } from "marked";
import DOMPurify from "dompurify";

export default {
    name: "Page",
    components: {
        Styles,
        PageHeader,
        GenericSwitch,
        GeneralSection,
        Head,
        ColourTest,
    },
    data() {
        return {
            markdown: `# Colour Test
Testing brand colours`,
        };
    },
    computed: {
        markdownToHTML() {
            return DOMPurify.sanitize(marked(this.markdown));
        },
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
