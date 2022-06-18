<template>
    <Head>
        <title>Home | Enchanted Games</title>
    </Head>
    <PageHeader />
    <div class="main-container">
        <img class="page-header-image" loading="lazy" alt="Home Page Icon" src="@/assets/logo.png" />
        <GeneralSection numberID="0" canCollapse="false" :htmlContent="markdownToHTML" />
        <SectionGrid sectionTitle="Projects" projectViewPath="/" :projectsArray="projectCategories" />
        <ButtonSection numberID="3" canCollapse="false" sectionTitle="Socials" sectionText="Find me on" :linksObject="linksObject" />
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
            markdown: `# Enchanted Games
Easy access to all my projects and socials`,

            projectCategories: [
                { slug: "minecraft-projects.html", src: "/static/project_icons/minecraft_java_lowres.png", title: "Minecraft Projects", description: "All my Minecraft Projects for both Java and Bedrock editions", lastUpdated: null },
                { slug: "generator/blockdesigner.html", src: "https://bd.enchanted.games/favicon.ico", title: "Minecraft Block Designer", description: "Create thounsands of blocks in vanilla Minecraft with just one command and a resource pack.", lastUpdated: null },
                { slug: "other-projects.html", src: "/static/project_icons/other-projects.png", title: "Other Projects", description: "All my other projects are here. (FireFox themes, Aseprite themes, etc.)", lastUpdated: null },
            ],

            linksObject: [
                { src: "https://youtube.com/EnchantedGames", desc: "YouTube" },
                { src: "https://discordapp.com/users/537356314578386995", desc: "ioblackshaw#8695" },
                { src: "https://github.com/Enchanted-Games", desc: "GitHub" },
                { src: "https://www.planetminecraft.com/member/enchanted_games/", desc: "PlanetMinecraft" },
                { src: "https://modrinth.com/user/q7Pixh4Q", desc: "Modrinth" },
                { src: "https://www.curseforge.com/members/enchanted_games/projects", desc: "CurseForge" },
                { src: "https://mcpedl.com/user/enchanted-games/", desc: "MCPEDL" },
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
    --main-background-image: url(@/assets/images/backgrounds/home_small.png);
}
img {
    margin: auto;
}
</style>
