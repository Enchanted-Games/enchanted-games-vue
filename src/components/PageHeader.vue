<template>
    <header>
        <div class="header-container">
            <h1 class="logo">
                <span>
                    <a href="/">Enchanted</a>
                </span>
            </h1>
            <input aria-label="open header navigation" type="checkbox" id="nav-toggle" class="nav-toggle" />
            <nav>
                <ul>
                    <li><a href="/minecraft-projects.html">Minecraft Projects</a></li>
                    <li><a href="/generator/blockdesigner.html">Block Designer</a></li>
                    <li><a href="/other-projects.html">Other Projects</a></li>
                </ul>
            </nav>
            <label for="nav-toggle" class="nav-toggle-label">
                <span></span>
            </label>
            <!-- <label class="header-switch-container">
                <ThemeToggle />
            </label> -->
        </div>
    </header>
</template>

<script>
export default {
    name: "PageHeader",
};
</script>

<style lang="scss" scoped>
header {
    background-color: var(--header-main-background);
    border-bottom: 3px solid var(--header-accent-light);
    box-shadow: 0px 0px 5px var(--header-accent-dark);
    height: var(--header-height);
    transition: height 0.5s ease-in-out;
    width: 100%;
    display: flex;
    justify-content: center;
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

// header logo
.logo {
    z-index: 10001;
    background-image: initial;
    background-clip: initial;
    height: 100%;
    font-size: 30px;
    display: flex;
    align-items: center;
}
.logo a {
    font-family: "Outfit Bold";
    color: var(--header-main-text);
    cursor: pointer;
    user-select: none;
    height: 100%;
    font-size: 30px;

    text-shadow: initial;
    color: var(--main-brand-colour-700);
}
@supports (background-clip: text) {
    .logo a {
        background-image: linear-gradient(45deg, var(--main-brand-colour-700), white);
        background-size: 200px;
        color: rgba(0, 0, 0, 0);
        background-clip: text;
    }
}
@supports not (background-clip: text) {
    .logo a {
        background-image: initial;
    }
}

@media (max-width: 300px) {
    // .logo a {
    //     display: inline-block;
    //     width: 20px;
    //     overflow: hidden;
    //     background-size: 16px;
    // }
    header {
        justify-content: space-between;
    }
    .header-container {
        margin-right: auto;
        margin-left: 20px;
    }
}

nav {
    position: absolute;
    text-align: right;
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
    right: 0;
    margin-right: 1em;
    padding-left: 20px;
    padding-right: 20px;
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
    opacity: 1;
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
    opacity: 0;
}
.nav-toggle:checked ~ .nav-toggle-label span {
    transform: rotate(-45deg);
    height: 3px;
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

@media (min-width: 850px) {
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
        grid-template-columns: auto 0.5fr minmax(500px, 2fr);
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
        color: var(--header-main-text);
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
