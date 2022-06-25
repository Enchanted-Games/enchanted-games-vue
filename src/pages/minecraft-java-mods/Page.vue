<template>
    <Head>
        <title>{{ pageTitle }} | Enchanted Games</title>
        <meta name="description" content="All of Enchanted Game's Resource Packs for Minecraft Java Edition" />
    </Head>
    <PageHeader />
    <div class="main-container">
        <img class="page-header-image" loading="lazy" alt="Page Icon" src="/static/project_icons/minecraft_java_mods_lowres.png" />
        <GeneralSection numberID="0" canCollapse="false" :htmlContent="markdownToHTML" />
        <SectionGrid showSearchBar="true" searchBarPlaceholder="Search Projects" :projectViewPath="projectViewPath" :projectsArray="currentProjects" />
    </div>
</template>

<script>
// custom components
import Styles from "@/components/Styles.vue";
import PageHeader from "@/components/PageHeader.vue";
import SectionGrid from "@/components/SectionGrid.vue";
import GeneralSection from "@/components/GeneralSection.vue";

// libraries
import { Head } from "@vueuse/head";
import { marked } from "marked";
import DOMPurify from "dompurify";

// firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, where } from "firebase/firestore/lite";

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
        Head,
        GeneralSection,
        SectionGrid,
    },
    data() {
        return {
            projectType: "minecraft-java-mod", // types of projects that will be displayed
            projectViewPath: "/minecraft-java-mods/view?p=", // base URL for projects to be viewed
            pageTitle: "Minecraft Java Mods",

            markdown: `# Minecraft Java Edition Mods
All my Mods for Minecraft Java Edition. (Windows, MacOS, Linux)`,
            currentProjects: [],
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

        const q = query(projectsRef, where("projecttype", "==", this.projectType));

        let projectsArray = [];

        getDocs(q)
            .then((e) => {
                // add data from each doc to an array
                e.forEach((doc) => {
                    let projectData = doc.data();

                    projectData.projectId = doc.id;

                    projectsArray.push(projectData);
                });

                // sort projects array by timestamp it was updated at
                projectsArray.sort(function (a, b) {
                    return b["project-date-number"] - a["project-date-number"];
                });

                // display projects that arent hidden
                for (let i = 0; i < projectsArray.length; i++) {
                    if (projectsArray[i].projectviewstatus == 0) {
                        // project should be displayed
                        let dataToDisplay = {
                            slug: projectsArray[i]["projectId"],
                            src: projectsArray[i]["favicon-url"],
                            title: projectsArray[i]["project-title"],
                            description: decodeURIComponent(projectsArray[i]["encoded-short-description"]),
                            lastUpdated: projectsArray[i]["project-updated-date"],
                        };

                        this.currentProjects.push(dataToDisplay);
                    } else {
                        return false;
                    }
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
    --main-background-image: url(@/assets/images/backgrounds/minecraft_mods.png);
}
img {
    margin: auto;
}
</style>
