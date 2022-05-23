<template>
    <header>
        <div class="header-container">
            <h1 class="logo"><a href="/">Enchanted</a></h1>
            <input type="checkbox" id="nav-toggle" class="nav-toggle" />
            <nav>
                <ul>
                    <li><a href="/minecraft-projects">Minecraft Projects</a></li>
                    <li><a href="/generator/blockdesigner">Block Designer</a></li>
                    <li><a href="/second">Other Projects</a></li>
                </ul>
            </nav>
            <label for="nav-toggle" class="nav-toggle-label">
                <span></span>
            </label>
            <label class="header-switch-container">
                <ThemeToggle />
            </label>
        </div>
        <!-- <div class="header-inner">
            <div class="header-logo-container">
                <h1><a href="/">Enchanted</a></h1>
            </div>
            <div class="header-switch-container">
                <ThemeToggle />
            </div>
        </div> -->
    </header>
</template>

<script>
import ThemeToggle from "@/components/ThemeToggle.vue";

export default {
    name: "PageHeader",
    components: {
        ThemeToggle,
    },
    props: {
        label: String,
        startChecked: String,
    },
};
</script>

<style lang="scss" scoped>
header {
    background-color: var(--header-main-background);
    border-bottom: 3px solid var(--header-accent-light);
    box-shadow: 0px 0px 5px var(--header-accent-dark);
    height: var(--header-height);
    width: 100%;
    // height: var(--header-height);
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;
    z-index: 10000;
}
.header-container {
    z-index: 10000;
    max-width: var(--header-content-max-width);
}

.logo {
    color: var(--header-main-text);
    height: 100%;
    text-shadow: 0px 0px 6px var(--header-accent-light);
    font-size: 30px;
}
.logo a {
    all: inherit;
    cursor: pointer;
    user-select: none;
    display: inline;
}

nav {
    position: absolute;
    text-align: left;
    top: 100%;
    left: 0;
    width: 100%;

    background-color: var(--header-main-background);
    border-bottom: 0px solid var(--header-accent-light);
    box-shadow: 0px 0px 0px var(--header-accent-dark);

    transform: scale(1, 0);
    transition: transform 300ms ease-out;
    transform-origin: top;
    z-index: 10000;
}
.nav-toggle:checked ~ nav {
    transform: scale(1, 1);
    border-bottom: 3px solid var(--header-accent-light);
    box-shadow: 0px 0px 5px var(--header-accent-dark);
}
.nav-toggle:checked ~ nav a {
    opacity: 1;
    transition: opacity 200ms ease-out 100ms;
}

nav ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

nav li:first-child {
    margin-top: 0.6em;
}
nav li {
    margin-bottom: 0.6em;
    margin-left: 1em;
    margin-right: 1em;
    transition: box-shadow 200ms ease-in-out;
}
nav li:hover {
    box-shadow: 0px 0px 5px var(--header-accent-dark);
}

nav a {
    color: var(--header-main-text);
    text-decoration: none;
    font-size: 18px;
    padding: 0px 5px;

    transition: opacity 100ms ease-out 0ms;
    opacity: 0;

    display: inline-block;
    width: 100%;
}
nav a:hover,
nav a:focus {
    color: var(--header-main-text-hover);
}

.nav-toggle {
    position: absolute !important;
    top: -9999px !important;
    left: -9999px !important;
}
.nav-toggle:focus-visible ~ .nav-toggle-label {
    outline: none;
    border-radius: 5px;
    border: var(--focus-border-colour) var(--focus-border-width) var(--focus-border-style);
}

.nav-toggle-label {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    margin-left: 1em;
    height: 100%;
    display: flex;
    align-items: center;
}
.nav-toggle-label span,
.nav-toggle-label span::before,
.nav-toggle-label span::after {
    transition: all 250ms ease-in-out;
    display: block;
    background: white;
    height: 2px;
    width: 22px;
    border-radius: 4px;
    position: relative;
}
.nav-toggle-label span::before,
.nav-toggle-label span::after {
    content: "";
    position: absolute;
}
.nav-toggle-label span::before {
    bottom: 7px;
}

.nav-toggle-label span::after {
    top: 7px;
}

.nav-toggle:checked ~ .nav-toggle-label span::before,
.nav-toggle:checked ~ .nav-toggle-label span::after {
    top: initial;
    bottom: initial;
}

.nav-toggle:checked ~ .nav-toggle-label span::after {
    transform: rotate(90deg);
    height: 3px;
}
.nav-toggle:checked ~ .nav-toggle-label span::before {
    all: initial;
}
.nav-toggle:checked ~ .nav-toggle-label span {
    transform: rotate(-45deg);
    height: 3px;
    // clip-path: polygon(17% 0%, 0% 20%, 28% 50%, 0% 80%, 17% 100%, 50% 71%, 83% 100%, 100% 80%, 72% 50%, 100% 20%, 83% 0%, 50% 30%);
}

.header-switch-container {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 1em;
    margin-left: -70px;
    height: 100%;
    display: flex;
    align-items: center;
    transform: scale(0.7);
    transform-origin: right;
    transition: transform 150ms ease-in-out;
}

@media (min-width: 820px) {
    // desktop header styles
    .nav-toggle-label {
        display: none;
    }

    .nav-toggle:checked ~ nav {
        transform: scale(1, 1);
        border-bottom: none;
        box-shadow: none;
    }

    .header-container {
        padding: 0px 20px;
        margin-left: auto;
        margin-right: auto;
        display: grid;
        grid-template-columns: auto 50px minmax(400px, 2fr) 100px;
        max-width: var();
    }
    .header-switch-container {
        margin-left: 0px;
        transform: scale(0.9);
        transform-origin: right;
    }

    .logo {
        grid-column: 1 / 1;
    }

    nav {
        all: unset;
        grid-column: 3 / 4;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    nav ul {
        display: flex;
    }

    nav li {
        margin: 0px 0px !important;
        padding: 0px 7px !important;
        border-style: solid;
        border-width: 1px;
        border-color: var(--header-accent-light);
        border-top: none;
        border-bottom: none;
    }
    nav li:first-child {
        border-left: none !important;
    }
    nav li:last-child {
        border-right: none !important;
    }

    nav a {
        display: inline;
        opacity: 1;
        position: relative;
        width: auto;
    }

    nav a:hover,
    nav a:focus {
        color: var(--header-main-text);
    }

    nav a::before {
        content: "";
        display: block;
        height: 2px;
        background-color: var(--header-accent-dark);
        position: absolute;
        top: 1.3em;
        right: 0;
        left: 0;
        transform: scale(0, 1);
        transition: transform ease-in 150ms;
    }
    nav a:hover::before,
    nav a:focus::before {
        outline: none;
        transform: scale(1, 1);
        background-color: var(--header-accent-light);
        transform-origin: center;
    }
}
</style>
<style lang="scss">
.main-container {
    margin-top: var(--header-height);
}
</style>
