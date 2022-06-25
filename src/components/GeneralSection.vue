<template>
    <div class="general-section" :class="{ expanded: isExpanded, overrideCollapse: canCollapse != 'true' }" v-if="isImageHolder == 'true'">
        <h1>{{ imageHolderTitle }}</h1>
        <p>{{ imageHolderText }}</p>
        <ul class="image-carousel thin-scrollbar">
            <li v-for="(imageObject, index) in imagesObject" :key="index" class="image-carousel-item">
                <div class="img-container">
                    <img loading="lazy" :src="imageObject.src" alt="" @click="toggleFullscreen" @load="imageLoaded" @error="imageErrored" />
                </div>
                <span>{{ imageObject.desc }}</span>
            </li>
        </ul>
    </div>
    <div class="general-section" :class="{ expanded: isExpanded, overrideCollapse: canCollapse != 'true' }" v-else>
        <div class="markdown-container" v-html="htmlContent"></div>
    </div>
    <input @input="expand" type="checkbox" :id="'general-section-showmore-toggle-' + numberID" />
    <label :for="'general-section-showmore-toggle-' + numberID" class="general-section-showmore-label" v-if="isExpanded == false && canCollapse != 'false'">{{ expandText }}</label>
    <label :for="'general-section-showmore-toggle-' + numberID" class="general-section-showmore-label" v-else-if="isExpanded == true && canCollapse != 'false'">{{ collapseText }}</label>
</template>

<script>
export default {
    name: "GeneralSection",
    props: {
        // content that goes inside the element
        htmlContent: String,

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

        // determines whether element has a expand/collapse button
        // if set to false element will grow as much as it needs no matter what
        canCollapse: {
            type: String,
            default: "true",
        },

        // props for image holder
        // if set to true, section will render a carousel of images
        isImageHolder: {
            type: String,
            default: "false",
        },

        // title for image carousel
        imageHolderTitle: {
            type: String,
            default: "Images",
        },

        // extra text for image carousel
        imageHolderText: {
            type: String,
            default: "Scroll horizontally to see more images",
        },

        // accepts an array of objects.
        // each object should have:
        // src: <--URL to an image>
        // desc: <-- description of image >
        imagesObject: {
            type: Object,
            default: [],
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
        imageErrored(e) {
            e.target.parentNode.classList.add("loaded");
            e.target.classList.add("error");
        },
        imageLoaded(e) {
            e.target.parentNode.classList.add("loaded");
        },
        toggleFullscreen(e) {
            if (document.fullscreenElement) {
                return document.exitFullscreen(); // exit fullscreen on next click
            }
            if (e.target.requestFullscreen) {
                e.target.requestFullscreen();
            } else if (e.target.webkitRequestFullscreen) {
                e.target.webkitRequestFullscreen(); // Safari
            } else if (e.target.msRequestFullscreen) {
                e.target.msRequestFullscreen(); // IE11
            }
        },
    },
};
</script>

<style lang="scss" scoped>
// image carousel styles

@keyframes spin {
    to {
        transform: rotate(1turn);
    }
}

// .image-carousel
.image-carousel {
    list-style: none;
    margin: 0;
    padding: 0;
    margin: 10px;

    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;

    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-padding: 0 0;
}

.image-carousel .image-carousel-item {
    min-width: 0;
    min-height: 0;
    box-sizing: border-box;
    aspect-ratio: 16/9;
    width: 16em;
    max-width: 97%;
    border: 3px solid rgba(0, 0, 0, 0.2);
    position: relative;
    margin: 5px;

    flex: 0 0 auto;

    user-select: none;
    text-align: center;
    scroll-snap-align: start;
}
.image-carousel .image-carousel-item:first-child {
    margin-left: 0px;
}
.image-carousel .image-carousel-item:last-child {
    margin-right: 0px;
    scroll-snap-align: end;
}
.img-container {
    width: 100%;
    height: 100%;

    // to center image
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    overflow: hidden;
}

.img-container:not(.loaded)::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 5;
    width: 100%;
    height: 100%;

    // styling for image loading
    --circle-start: 15%;
    --circle-end: 22%;

    // mask a circle shape with radial gradient
    mask-image: radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) var(--circle-start), rgba(0, 0, 0, 1) var(--circle-start), rgba(0, 0, 0, 1) var(--circle-end), rgba(0, 0, 0, 0) var(--circle-end), rgba(0, 0, 0, 0) 100%);
    mask-position: center;

    // circle with conic gradient
    background-image: conic-gradient(rgba(0, 0, 0, 0) 0deg 90deg, var(--image-loading-circle-colour) 200deg);
    background-position: center;

    animation: spin 1000ms linear infinite;

    opacity: var(--image-loading-circle-opacity);
}
.img-container:not(.loaded) img {
    opacity: var(--image-loading-opacity);
}
img {
    display: block;
    border: unset;
    outline: unset;
    margin: 0;
    padding: 0;
    cursor: pointer;

    image-rendering: pixelated;
    transition: opacity 0.25s ease-in;
}
img::before {
    content: "";
    display: block;
}
img.error {
    --background-colour: var(--image-error-background-colour);
    --cross-colour: var(--image-error-cross-colour);
    --cross-start: 49%;
    --cross-end: 51%;

    background-color: var(--background-colour);
    background-image: linear-gradient(45deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) var(--cross-start), var(--cross-colour) var(--cross-start), var(--cross-colour) var(--cross-end), rgba(0, 0, 0, 0) var(--cross-end), rgba(0, 0, 0, 0) 100%),
        //
        linear-gradient(-45deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) var(--cross-start), var(--cross-colour) var(--cross-start), var(--cross-colour) var(--cross-end), rgba(0, 0, 0, 0) var(--cross-end), rgba(0, 0, 0, 0) 100%);
    box-shadow: inset 0px 0px 10px 15px var(--background-colour);

    background-position: center;
    opacity: var(--image-error-opacity);

    width: 100%;
    height: 100%;
}
.image-carousel .image-carousel-item span {
    display: block;
    position: absolute;
    bottom: 0;
    z-index: 10;
    width: 100%;

    font-size: 16px;
    text-rendering: optimizeLegibility;

    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-color: rgba(0, 0, 0, 0.5);

    text-shadow: 0px 0px 5px rgba(0, 0, 0, 1), 0px 0px 5px rgba(0, 0, 0, 1);
}
@supports (backdrop-filter: blur(10px)) {
    .image-carousel .image-carousel-item span {
        backdrop-filter: blur(2px);
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        background-color: rgba(0, 0, 0, 0.3);

        text-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
    }
}
</style>
