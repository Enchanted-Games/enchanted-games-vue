<template>
    <span class="input-switch-container">
        <p class="input-switch-label">
            <span class="icon-span" data-toggle-theme-icon>&nbsp;</span>
        </p>
        <label class="input-switch-outer">
            <input :checked="switchChecked" @change="toggleTheme" autocomplete="off" type="checkbox" />
            <span class="input-switch"></span>
        </label>
    </span>
</template>

<script>
export default {
    mounted() {
        const initUserTheme = this.getTheme() || this.getMediaPreference();
        this.setTheme(initUserTheme);
    },

    data() {
        return {
            userTheme: "dark-theme",
            switchChecked: false,
        };
    },

    methods: {
        toggleTheme() {
            const activeTheme = localStorage.getItem("user-theme");
            if (activeTheme === "light-theme") {
                this.setTheme("dark-theme");
            } else {
                this.setTheme("light-theme");
            }
        },

        getTheme() {
            return localStorage.getItem("user-theme");
        },

        setTheme(theme) {
            localStorage.setItem("user-theme", theme);
            this.userTheme = theme;
            if (theme == "dark-theme") {
                this.switchChecked = false;
            } else {
                this.switchChecked = true;
            }
            document.documentElement.className = theme;
        },

        getMediaPreference() {
            // const hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
            // if (hasDarkPreference) {
            //     return "dark-theme";
            // } else {
            //     return "light-theme";
            // }
            return "dark-theme";
        },
    },
};
</script>

<style scoped lang="scss">
.input-switch-container {
    display: none !important;
}
</style>
