<template>
    <Head>
        <title>404 | Enchanted Games</title>
        <link rel="shortcut icon" href="/images/static/404.png" type="image/x-icon" />
    </Head>
    <PageHeader />
    <div class="main-container">
        <img class="page-header-image" loading="lazy" alt="404" src="/images/static/404.png" />
        <GeneralSection numberID="0" canCollapse="false" :htmlContent="markdownToHTML" />
    </div>
</template>

<script>
// custom components
import Styles from "@/components/Styles.vue";
import PageHeader from "@/components/PageHeader.vue";
import GeneralSection from "@/components/GeneralSection.vue";

// libraries
import { Head } from "@vueuse/head";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default {
    name: "Page",
    components: {
        Styles,
        PageHeader,
        Head,
        GeneralSection,
    },
    data() {
        return {
            markdown: `# Whoops...
We couldn't find the content you are looking for, it may have been moved or deleted. Double check the spelling in the URL or [return home](/index).
`,
        };
    },
    computed: {
        markdownToHTML() {
            return DOMPurify.sanitize(marked(this.markdown));
        },
    },
};
</script>

<style lang="scss">
img {
    margin: auto;
}
</style>
