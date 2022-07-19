<template>
    <Head>
        <title>Home | Enchanted Games</title>
    </Head>
    <PageHeader />
    <div class="main-container">
        <img class="page-header-image" loading="lazy" alt="Home Page Icon" src="@/assets/logo.png" />
        <GeneralSection numberID="0" canCollapse="false" :htmlContent="markdownToHTML" />
        <SectionGrid sectionTitle="Projects" projectViewPath="/" :projectsArray="projectCategories" />
        <SectionGrid sectionTitle="Recently Updated" sectionDesc="Shows the 3 most recently updated projects" projectViewPath="/" :projectsArray="newlyUpdated" />
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

// firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, orderBy, limit, where } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyCZ97zm-gnMMRJK_WjmuzjP3-Sm94YLHXk",
    authDomain: "enchanted-games-vue.firebaseapp.com",
    projectId: "enchanted-games-vue",
    storageBucket: "enchanted-games-vue.appspot.com",
    messagingSenderId: "728816858819",
    appId: "1:728816858819:web:f2ce8b2ab39f4fcaedd476",
    measurementId: "G-B544VMRE16",
};

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

            newlyUpdated: [{ slug: "#", src: "", title: "Fethcing Projects", description: "Please wait while we find Recently Updated Projects", lastUpdated: null, type: null }],
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
    created() {
        console.clear();

        const firebase_app = initializeApp(firebaseConfig);
        const firebase_db = getFirestore(firebase_app);

        // get non hidden projects

        const projectsRef = collection(firebase_db, "projects");

        const q = query(projectsRef, orderBy("project-date-number", "desc"), limit(4));

        let projectsArray = [];

        getDocs(q)
            .then((e) => {
                // add data from each doc to an array
                e.forEach((doc) => {
                    let projectData = doc.data();

                    projectData.projectId = doc.id;

                    if (projectData.projectviewstatus == 0) {
                        projectsArray.push(projectData);
                    }
                });

                // sort projects array by timestamp it was updated at
                projectsArray.sort(function (a, b) {
                    return b["project-date-number"] - a["project-date-number"];
                });

                this.newlyUpdated = [];

                // display projects that arent hidden
                for (let i = 0; i < projectsArray.length; i++) {
                    // project should be displayed
                    let dataToDisplay = {
                        slug: projectsArray[i]["projectId"],
                        src: projectsArray[i]["favicon-url"],
                        title: projectsArray[i]["project-title"],
                        description: decodeURIComponent(projectsArray[i]["encoded-short-description"]),
                        lastUpdated: projectsArray[i]["project-updated-date"],
                        type: projectsArray[i]["projecttype"].replace("resource-pack", "pack").replace(/-/g, " "),
                    };

                    this.newlyUpdated.push(dataToDisplay);
                }
            })
            .catch((e) => {
                console.error(e);
                this.currentProjects = null;
                this.markdown = `# Whoops...
We were unable to get fetch the projects. Please [Return Home](/index) and try again later.`;
            });
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
