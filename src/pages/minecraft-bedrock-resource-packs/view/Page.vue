<template>
    <Head>
        <title>{{ pageTitle }} | Enchanted Games</title>
        <link rel="shortcut icon" :href="faviconImageSrc" type="image/x-icon" />
    </Head>
    <PageHeader />
    <div class="main-container">
        <BackButton />
        <img class="page-header-image" loading="lazy" :alt="pageTitle" :src="faviconImageSrc" />
        <MetadataSection v-if="projectMetaData != null" :metadataArray="projectMetaData" />
        <GeneralSection numberID="0" :canCollapse="shouldMainSectionCollapse" :htmlContent="markdownToHTML" />
        <GeneralSection v-if="imagesObject != null" numberID="2" isImageHolder="true" canCollapse="false" imageHolderTitle="Screenshots" :imagesObject="imagesObject" />
        <ButtonSection v-if="linksObject != null" numberID="3" canCollapse="false" :linksObject="linksObject" />
    </div>
</template>

<script>
// custom components
import Styles from "@/components/Styles.vue";
import PageHeader from "@/components/PageHeader.vue";
import MetadataSection from "@/components/MetadataSection.vue";
import GenericSwitch from "@/components/GenericSwitch.vue";
import GeneralSection from "@/components/GeneralSection.vue";
import ButtonSection from "@/components/ButtonSection.vue";
import BackButton from "@/components/BackButton.vue";

// libraries
import { Head } from "@vueuse/head";
import { marked } from "marked";
import DOMPurify from "dompurify";

// firebase
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";

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
        MetadataSection,
        BackButton,
    },
    data() {
        return {
            projectType: "minecraft-bedrock-resource-pack", // types of projects that will be displayed
            firebaseCollectionName: "projects", // firebase collection that this page will search for the project in URL
            pageTitle: "Minecraft Bedrock Resource Pack",
            faviconImageSrc: "/favicon.ico",

            shouldMainSectionCollapse: "true",

            projectMetaData: null,
            markdown: `# Downloading page contents...`,
            linksObject: null,
            imagesObject: null,
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

        let url_string = window.location.href;
        let url = new URL(url_string);
        let projectID = url.searchParams.get("p");

        if (projectID == undefined || projectID == null) {
            projectID = "404";
        }
        let docRef = doc(firebase_db, this.firebaseCollectionName, projectID);

        getDoc(docRef)
            .then((e) => {
                let data = e.data();

                if (data == undefined || data["projecttype"] != this.projectType) {
                    // if project is not found
                    this.markdown = `# Whoops...
We couldn't find that project, it may have been moved or deleted. Double check the spelling in the URL or [return home.](/index.html)
`;
                    this.shouldMainSectionCollapse = "false";
                    this.faviconImageSrc = "/favicon.ico";
                    this.pageTitle = "404";
                    this.faviconImageSrc = "/images/static/404.png";
                } else {
                    // if project was succesfully downloaded
                    this.markdown = decodeURIComponent(data["encoded-markdown"]);

                    let shouldContentCollapse = data["should-content-collapse"].toString();

                    if (shouldContentCollapse === "true") {
                        this.shouldMainSectionCollapse = "true";
                    } else if (shouldContentCollapse === "auto") {
                        // auto determine if main content should collapse based on markdown length
                        if (this.markdown.length < 600) {
                            this.shouldMainSectionCollapse = "false";
                        }
                    } else {
                        this.shouldMainSectionCollapse = "false";
                    }

                    this.projectMetaData = data["project-meta-data"];
                    this.imagesObject = data["images-array"];
                    this.linksObject = data["links-array"];

                    this.pageTitle = data["project-title"];

                    this.faviconImageSrc = data["favicon-url"];

                    document.documentElement.style.setProperty("--main-background-image", `url(${data["background-url"]})`);
                }
            })
            .catch(function (e) {
                console.error(e);
            });
    },
};
</script>

<style lang="scss">
img {
    margin: auto;
}
</style>
