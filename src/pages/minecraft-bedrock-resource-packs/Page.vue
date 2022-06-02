<template>
    <Head>
        <title>{{ pageTitle }} | Enchanted Games</title>
    </Head>
    <PageHeader />
    <div class="main-container">
        <img class="page-header-image" alt="Page Icon" src="@/assets/logo.png" />
        <GeneralSection numberID="0" canCollapse="false" :htmlContent="markdownToHTML" />
        <SectionGrid />
    </div>
</template>

<script>
// custom components
import Styles from "@/components/Styles.vue";
import PageHeader from "@/components/PageHeader.vue";
import GenericSwitch from "@/components/GenericSwitch.vue";
import GeneralSection from "@/components/GeneralSection.vue";
import ButtonSection from "@/components/ButtonSection.vue";

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
        GenericSwitch,
        Head,
        GeneralSection,
        ButtonSection,
    },
    data() {
        return {
            projectType: "minecraft-bedrock-resource-pack", // types of projects that will be displayed
            pageTitle: "Minecraft Bedrock Resource Packs",
            faviconImageSrc: "/favicon.ico",

            markdown: `# Downloading page contents...`,
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

        getDocs(q)
            .then((e) => {
                // console.log(e.data());
                // loop through docs in collection
                e.forEach((doc) => {
                    console.log(doc.id); // get doc name
                    let projectData = doc.data();

                    if (projectData.projectviewstatus == 0) {
                        // project should be displayed
                        let dataToDisplay = {
                            title: projectData["project-title"],
                            image: projectData["favicon-url"],
                        };

                        currentProjects.push(dataToDisplay);
                    } else {
                        return false;
                    }
                });
            })
            .catch((e) => {
                console.log(e.message);
            });
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
