<template>
    <Head>
        <title>Minecraft Projects | Enchanted Games</title>
    </Head>
    <PageHeader />
    <div class="main-container">
        <img class="page-header-image" loading="lazy" alt="Page Icon" src="/static/project_icons/minecraft_java_lowres.png" />
        <GeneralSection numberID="0" canCollapse="false" :htmlContent="markdownToHTML" />
        <SectionGrid sectionTitle="Projects" projectViewPath="/" :projectsArray="projectCategories" />
    </div>
</template>

<script>
// custom components
import Styles from "@/components/Styles.vue";
import PageHeader from "@/components/PageHeader.vue";
import GenericSwitch from "@/components/GenericSwitch.vue";
import GeneralSection from "@/components/GeneralSection.vue";
import ButtonSection from "@/components/ButtonSection.vue";
import SectionGrid from "@/components/SectionGrid.vue";

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
        Head,
        GeneralSection,
        ButtonSection,
        SectionGrid,
    },
    data() {
        return {
            markdown: `# Minecraft Projects
All my Minecraft Projects for both Java and Bedrock editions`,

            projectCategories: [
                { slug: "minecraft-java-resource-packs.html", src: "/static/project_icons/minecraft_java_lowres.png", title: "Minecraft Java Edition Resource Packs", description: "All my Resource Packs for Minecraft Java Edition. (Windows, MacOS, Linux)", lastUpdated: null },
                { slug: "minecraft-bedrock-resource-packs.html", src: "/static/project_icons/minecraft_bedrock.png", title: "Minecraft Bedrock Edition Resource Packs", description: "All my Resource Packs for Minecraft Bedrock Edition. (iOS, Android, Windows 10/11, Consoles)", lastUpdated: null },
                { slug: "minecraft-java-mods.html", src: "/static/project_icons/minecraft_java_mods_lowres.png", title: "Minecraft Java Edition Mods", description: "--TODO All my Mods for Minecraft Java Edition. (Windows, MacOS, Linux)", lastUpdated: null },
            ],
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
:root {
    --main-background-image: url(@/assets/images/backgrounds/minecraft_projects.png);
}
img {
    margin: auto;
}
</style>
