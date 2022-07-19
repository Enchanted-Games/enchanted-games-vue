<template>
    <div class="general-section overrideCollapse">
        <h1>{{ sectionTitle }}</h1>
        <p>{{ sectionDesc }}</p>
        <div class="general-searchbar" v-if="showSearchBar != 'false'">
            <span class="search-container">
                <input
                    ref="searchQueryInput"
                    @keyup="
                        updateSearchBarState();
                        filterSearches($event);
                    "
                    id="searchbarInput"
                    type="text"
                    :placeholder="searchBarPlaceholder"
                />
                <label ref="searchBarLabel" for="searchbarInput"><img draggable="false" width="24" height="24" loading="lazy" src="/static/images/icons/search.png" alt="🔍" /></label>
                <p ref="searchQueryText" id="searchQueryText" :class="{ hidden: noSearchResults == true }">
                    Showing results for <span ref="searchQueryValue" id="searchQueryValue">{{ searchQueryText }}</span>
                </p>
            </span>
        </div>
        <ul ref="searchList" :class="{ searchList: showSearchBar != 'false' }">
            <div :class="{ hidden: noSearchResults == false }">
                <h2>
                    No results found for <span>{{ searchQueryText }}</span>
                </h2>
            </div>
            <span ref="liWrapper" v-for="(project, index) in projectsArray" :key="index" class="li-wrapper">
                <li>
                    <a :class="{ includesExtra: project.type != null && project.lastUpdated != null }" :href="projectViewPath + project.slug">
                        <img loading="lazy" :src="project.src" :alt="project.title" />
                        <h2>{{ project.title }}</h2>
                        <p class="description">{{ project.description }}</p>
                        <p v-if="project.lastUpdated != null" class="date">{{ project.lastUpdated }}</p>
                        <p v-if="project.type != null" class="type">{{ project.type }}</p>
                    </a>
                </li>
            </span>
        </ul>
    </div>
</template>

<script>
export default {
    name: "SectionGrid",
    props: {
        sectionTitle: {
            type: String,
        },
        sectionDesc: {
            type: String,
            default: "",
        },
        projectsArray: {
            type: Object,
        },
        projectViewPath: {
            type: String,
        },
        showSearchBar: {
            type: String,
            default: "false",
        },
        searchBarPlaceholder: {
            type: String,
            default: "Search Projects",
        },
    },
    data() {
        return {
            noSearchResults: false,
            searchQueryText: "",
        };
    },
    mounted() {
        if (this.$refs.searchQueryInput == null || this.$refs.searchBarLabel == null) {
            return false;
        }
        let that = this;
        let labelImg = that.$refs.searchBarLabel.getElementsByTagName("img")[0];

        labelImg.addEventListener("click", function clearInput() {
            let input = that.$refs.searchQueryInput;
            let query = input.value;
            let label = that.$refs.searchBarLabel;

            // clear searchbar input and dispatch a keyup event so projects get re-ordered
            input.value = "";
            input.dispatchEvent(new Event("keyup"));

            label.classList.remove("clickable");
        });
    },
    methods: {
        updateSearchBarState() {
            let input = this.$refs.searchQueryInput;
            let query = input.value;
            let label = this.$refs.searchBarLabel;
            let labelImg = label.getElementsByTagName("img")[0];

            if (query === "") {
                labelImg.src = "/static/images/icons/search.png";
            } else {
                labelImg.src = "/static/images/icons/cross.png";
                label.classList.add("clickable");
                // add click event listener
            }
        },
        filterSearches(e) {
            let input = this.$refs.searchQueryInput;
            let filter = input.value.toUpperCase();
            this.searchQueryText = input.value;
            let ul = this.$refs.searchList;
            let li = this.$refs.liWrapper;

            for (let i = 0; i < li.length; i++) {
                let title = li[i].getElementsByTagName("h2")[0];
                let txtValue = title.textContent || title.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].classList.remove("hiddenProject");
                } else {
                    li[i].classList.add("hiddenProject");
                }
            }

            let liArray = [];
            for (let i = 0; i < li.length; i++) {
                liArray.push(li[i].classList.contains("hiddenProject"));
            }

            if (liArray.every((value) => value === true)) {
                this.noSearchResults = true;
            } else {
                this.noSearchResults = false;
            }

            if (filter == 0) {
                this.$refs.searchQueryText.style.display = "none";
                this.$refs.searchQueryValue.innerText = "";
            } else {
                this.$refs.searchQueryText.style.display = "initial";
                this.$refs.searchQueryValue.innerText = input.value;
            }

            input = null;
            filter = null;
            ul = null;
            li = null;
            liArray = null;
        },
    },
};
</script>

<style lang="scss" scoped>
//search styling
.search-container {
    text-align: left;
    width: 100%;
    display: inline-block;
    margin: 10px auto;
    position: relative;
}
.search-container label {
    display: inline-block;
    position: relative;
    left: -31px;
    top: 7px;
    cursor: pointer;
    transition: 250ms ease-out;
}
.search-container label:hover {
    opacity: 0.75;
}
.search-container p {
    display: none;
    margin-left: 20px;
}
.search-container span::before,
.search-container span::after {
    content: '"';
}
.search-container input {
    border: none;
    background-image: none;
    box-shadow: none;
    border: none;
    outline: none;
    margin-bottom: 15px;
    padding: 6px;
    padding-right: 30px;

    box-shadow: var(--main-text-box-shadow);
    border-radius: var(--general-searchbar-border-radius);
    color: var(--general-searchbar-text-colour);
    background-color: var(--general-searchbar-background-colour);

    transition: background-color 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
}
.search-container input:hover,
.search-container input:focus {
    background-color: var(--general-searchbar-background-colour-hover);
}

// cards styling
ul {
    list-style: none;

    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;

    padding: 0px;
    margin: 0px;
}
ul div {
    // no results text
    position: relative;
    top: 0;
    right: 0px;
    width: 100%;
    text-align: center;
    grid-column: 1/5;
}
ul div h2 {
    color: white;
}
ul div h2 span {
    display: inline-block;
    width: 100%;
}
ul div h2 span::before,
ul div h2 span::after {
    content: '"';
}

.li-wrapper {
    padding: 7px;
    display: block;
    width: 50%;
}
li {
    display: block;
    min-height: 1px;

    height: 100%;

    border-radius: var(--card-border-radius);
    background-color: var(--card-background-colour);

    transition: background-color var(--card-transform-time) var(--card-transform-timing-function), transform var(--card-transform-time) var(--card-transform-timing-function), box-shadow var(--card-transform-time) var(--card-transform-timing-function);
    position: relative;
}
// li:nth-child(2n),
// li.oddItem {
//     // align every other child to right
//     width: 50%;
// }
// li:last-child:not(:nth-child(2n)),
// li.lastChild:not(.oddItem) {
//     // center last child
//     width: 50%;
// }
// li.lastChild {
//     width: 50%;
// }
.hiddenProject {
    display: none;
}

li:hover,
li:focus-within {
    background-color: var(--card-background-colour-hover);

    transform: translateY(var(--card-transform-y-amount));

    box-shadow: 0px 3px 10px 0px var(--card-background-colour-hover);
}

li a {
    border: none;
    display: block;
    min-height: 250px;
    height: 100%;
    font-weight: normal;
    padding: 15px;
    padding-bottom: 27px;
}
li a.includesExtra {
    padding-bottom: 48px;
}
li a img {
    width: 150px;
    height: 150px;
    margin-bottom: 10px;
    user-select: none;
    image-rendering: pixelated;
}
li a p.date {
    color: var(--main-brand-colour-800);
    position: absolute;
    bottom: 4px;
    right: 14px;
}
li a p.date::before {
    font-weight: normal;
    font-style: italic;
    content: "last updated - ";
    color: var(--main-brand-colour-700);
}

li a p.type {
    color: var(--main-brand-colour-800);
    position: absolute;
    bottom: 24px;
    right: 14px;
    text-transform: capitalize;
}
li a p.type::before {
    font-weight: normal;
    font-style: italic;
    content: "type - ";
    color: var(--main-brand-colour-700);
}

// desktop styling
@media (min-width: 950px) {
    ul {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        flex-basis: 100%;
    }

    .li-wrapper {
        width: 100%;
    }
    li a {
        min-height: 130px;
        display: grid;
        grid-template-columns: 165px 1fr;
        grid-template-rows: 40px 100px;
        overflow: hidden;
        padding-bottom: 24px !important;
    }
    li a img {
        margin: 0px;
        grid-row: 1/2;
    }
    li a h2 {
        grid-column: 2;
        grid-row: 1;
        max-width: 65ch;
    }
    li a p.description {
        grid-column: 2;
        grid-row: 2;
        max-width: 65ch;
    }

    li a p.type {
        top: 4px !important;
        right: 14px !important;
    }

    .search-container input {
        margin-bottom: 0px;
    }
}
// small device
@media (min-width: 800px) {
    .search-container input {
        margin-bottom: 0px;
    }
}
// phone
@media (max-width: 700px) {
    .li-wrapper {
        width: 100% !important;
    }
}
</style>
