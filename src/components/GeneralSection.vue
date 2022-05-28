<template>
    <div class="general-section general-section" :class="{ expanded: isExpanded, overrideCollapse: canCollapse != 'true' }" v-html="html_content"></div>
    <input @input="expand" type="checkbox" :id="'general-section-showmore-toggle-' + numberID" />
    <label :for="'general-section-showmore-toggle-' + numberID" class="general-section-showmore-label" v-if="isExpanded == false && canCollapse != 'false'">{{ expand_text }}</label>
    <label :for="'general-section-showmore-toggle-' + numberID" class="general-section-showmore-label" v-else-if="isExpanded == true && canCollapse != 'false'">{{ collapse_text }}</label>
</template>

<script>
export default {
    name: "GeneralSection",
    props: {
        // content that goes inside the element
        html_content: String,

        // text for the expand button
        expand_text: {
            type: String,
            default: "Show More",
        },
        // text for the collapse button
        collapse_text: {
            type: String,
            default: "Show Less",
        },
        // numeric ID (must be unique for expand/collapse function to work properly)
        numberID: {
            type: String,
            default: "0",
        },

        // determines whether element has a expand/collapse button
        // if set to false element will grow as much as it need no matter what
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
                this.isExpanded = false;
            } else {
                this.isExpanded = true;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.general-section {
    background-color: var(--section-background-color);
    padding: 25px;
    border-radius: var(--section-background-border-radius);
    box-shadow: var(--section-box-shadow-soft);
    width: 90%;
    margin: auto;
    text-align: left;
    backdrop-filter: blur(var(--section-background-blur-amount));

    max-height: 15rem;
    height: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
    // background: linear-gradient(var(--section-background-color) 150px, white);
}
@media (max-width: 500px) {
    .general-section {
        width: 98%;
    }
}

@media (max-width: 750px) {
    .general-section {
        max-height: 25rem;
    }
}
@media (max-width: 350px) {
    .general-section {
        max-height: 35rem;
    }
}
.general-section.expanded {
    transition: max-height 1s ease-in-out;
    max-height: 9999px !important;
}

.general-section-showmore-label {
    font-size: 18px;
    padding: 6px 10px;
    border-radius: 7px;
    display: block;
    transform: translateY(-50%);
    max-width: 60%;
    margin: auto;

    cursor: pointer;
    color: white;
    font-weight: bold;
    background-color: var(--main-brand-colour-300);

    transition: all 200ms ease-out;
}
.general-section-showmore-label:hover {
    background-color: var(--main-brand-colour-500);
}
input[type="checkbox"] {
    position: absolute !important;
    top: -9999px !important;
    left: -9999px !important;
}
input[type="checkbox"]:focus-visible + .general-section-showmore-label {
    outline: var(--focus-border-colour) var(--focus-border-width) var(--focus-border-style);
}

// if element should have no expand/collapse button
.general-section.overrideCollapse {
    max-height: 9999px !important;
    margin-bottom: 40px;
}
</style>
