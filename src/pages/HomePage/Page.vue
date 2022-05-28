<template>
    <Head>
        <title>Home | Enchanted Games</title>
    </Head>
    <PageHeader />
    <div class="main-container">
        <img class="page-header-image" alt="Page Icon" src="@/assets/logo.png" />
        <GeneralSection numberID="0" :html_content="markdownToHTML" />
        <GeneralSection numberID="1" canCollapse="false" :html_content="'<h1>Images</h1>'" />
    </div>
</template>

<script>
// custom components
import Styles from "@/components/Styles.vue";
import PageHeader from "@/components/PageHeader.vue";
import GenericSwitch from "@/components/GenericSwitch.vue";
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
        GenericSwitch,
        Head,
        GeneralSection,
    },
    data() {
        return {
            markdown: `# Enchanted Vertical Slabs - BetterEnd Edition
A simple, vanilla-like mod that adds BetterEnd vertical slabs to Minecraft. They can be crafted the same way a normal slab can in a crafting table just vertically instead of horizontally. You do not need [the main mod](https://github.com/Enchanted-Games/vertical-slabs) installed though it is recommended. You must install BetterEnd alongside *Enchanted Vertical Slabs - BetterEnd Edition* otherwise the vertical slabs will not show up correctly. This mod is a fabric mod that requires [Fabric API](https://www.curseforge.com/minecraft/mc-mods/fabric-api) to function.

 - Any BetterEnd vertical slabs made in v1.3 of the main mod may not be compatible with *Enchanted Vertical Slabs - BetterEnd Edition*. Please make a backup if you are planning on upgrading.
 - The seperating will make the mod easier to maintain and also fixes some issues with error spam in the logs. It will also make it easier to create more compatibility mods in the future.

## Some bugs fixed in the seperating:
- Some blocks including Neon Cactus Slabs and Smaragdant Slabs now have correct textures and block properties (light levels and sounds)
`,
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
    --main-background-image: url(@/assets/images/screenshot.png);
}
img {
    margin: auto;
}
</style>
