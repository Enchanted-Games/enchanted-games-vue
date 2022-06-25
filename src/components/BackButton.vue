<template>
    <button v-if="shouldDisplay != false" @click="backPage" role="link">
        {{ text }}
    </button>
</template>

<script>
export default {
    name: "BackButton",
    props: {
        text: {
            type: String,
            default: "Back",
        },
    },
    data() {
        return {
            shouldDisplay: true,
        };
    },
    methods: {
        backPage() {
            history.back();
        },
    },
    mounted() {
        if (history.length <= 1) {
            this.shouldDisplay = false;
        }
    },
};
</script>

<style lang="scss" scoped>
button {
    all: unset;
    font-size: 18px;
    position: fixed;
    left: 40px;
    top: calc(var(--header-height) + 25px);
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 6px;
    padding-right: 16px;
    user-select: none;
    z-index: 50000;
    cursor: pointer;

    border-top-right-radius: var(--general-searchbar-border-radius);
    border-bottom-right-radius: var(--general-searchbar-border-radius);
    color: var(--general-searchbar-text-colour);
    background-color: var(--general-searchbar-background-colour);
}
button:before {
    /* both border styles */
    border: 20px solid transparent;
    border-right-color: var(--general-searchbar-background-colour);
    position: absolute;
    content: "";
    top: 0px;
    left: -40px;
}

button:hover {
    background-color: var(--general-searchbar-background-colour-hover);
}
button:hover::before {
    border-right-color: var(--general-searchbar-background-colour-hover);
}

button:active {
    filter: brightness(0.8);
}

button:focus-visible {
    outline: var(--focus-border-colour) var(--focus-border-style) var(--focus-border-width);
}
</style>
