<template>
    <div class="general-section general-section" :class="{ expanded: isExpanded, overrideCollapse: canCollapse != 'true' }">
        <h1>{{ sectionTitle }}</h1>
        <p>{{ sectionText }}</p>
        <div class="link-holder">
            <li v-for="(linkObject, index) in linksObject" :key="index" class="link-container">
                <img width="32" height="32" :src="getFaviconURL(linkObject.src)" loading="lazy" alt="" />
                <a :href="linkObject.src" target="_blank">{{ linkObject.desc }}</a>
            </li>
        </div>
    </div>
    <input @input="expand" type="checkbox" :id="'general-section-showmore-toggle-' + numberID" />
    <label :for="'general-section-showmore-toggle-' + numberID" class="general-section-showmore-label" v-if="isExpanded == false && canCollapse != 'false'">{{ expandText }}</label>
    <label :for="'general-section-showmore-toggle-' + numberID" class="general-section-showmore-label" v-else-if="isExpanded == true && canCollapse != 'false'">{{ collapseText }}</label>
</template>

<script>
export default {
    name: "ButtonSection",
    props: {
        // text for the expand button
        expandText: {
            type: String,
            default: "Show More",
        },
        // text for the collapse button
        collapseText: {
            type: String,
            default: "Show Less",
        },
        // numeric ID (must be unique for expand/collapse function to work properly)
        numberID: {
            type: String,
            default: "0",
        },

        // links array
        /*
            [
                {"src","destination URL for the link", "desc","text for the button"}
            ]
        */
        linksObject: {
            type: Object,
            default: [],
        },

        // title for image carousel
        sectionTitle: {
            type: String,
            default: "Downloads",
        },

        // extra text for image carousel
        sectionText: {
            type: String,
            default: "Find download pages for this project below",
        },

        // determines whether element has a expand/collapse button
        // if set to false element will grow as much as it needs no matter what
        canCollapse: {
            type: String,
            default: "true",
        },
    },
    data() {
        return {
            isExpanded: false,
        };
    },

    methods: {
        expand() {
            if (this.isExpanded == true) {
                // collapses element if already expanded
                this.isExpanded = false;
            } else {
                this.isExpanded = true;
            }
        },
        getFaviconURL(url) {
            let urlObj = new URL(url);

            let urlToReturn = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;

            return urlToReturn;
        },
    },
};
</script>

<style lang="scss" scoped>
.link-holder {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 10px 0px;
    margin-top: 15px;
}

.link-container {
    flex-basis: 40%;
    display: flex;
    align-items: center;

    background-color: var(--main-brand-colour-300);
    border-radius: 7px;

    padding: 3px;

    transition: all 200ms ease-out;
}
.link-container:hover {
    background-color: var(--main-brand-colour-500);
    border-radius: 7px;
}
@media (max-width: 900px) {
    .link-container {
        flex-basis: 90%;
    }
}
@media (min-width: 1500px) {
    .link-container {
        flex-basis: 350px;
    }
}

.link-container img {
    flex-basis: 32px;
    border-radius: 7px;
}

.link-container a {
    all: unset;
    display: block;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    color: white;
    font-weight: bold;
    width: 100%;
    min-height: 32px;

    display: flex;
    align-items: center;
    justify-content: center;
}
.link-container a:hover {
    opacity: 1;
    color: white;
    border-bottom: initial;
}
.link-container a:focus {
    outline: var(--focus-border-colour) var(--focus-border-style) var(--focus-border-width);
}
</style>
