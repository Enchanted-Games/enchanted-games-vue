const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
    transpileDependencies: true,
    pages: {
        // {host}/index.html
        index: {
            entry: "./src/pages/HomePage/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "Home",
            chunks: ["chunk-vendors", "chunk-common", "index"],
        },

        // {host}/404.html
        404: {
            entry: "./src/pages/404/main.js",
            template: "public/index.html",
            filename: "404.html",
            title: "Minecraft Projects",
            chunks: ["chunk-vendors", "chunk-common", "404"],
        },

        // {host}/minecraft-projects.html
        "minecraft-projects": {
            entry: "./src/pages/minecraft-projects/main.js",
            template: "public/index.html",
            filename: "minecraft-projects.html",
            title: "Minecraft Projects",
            chunks: ["chunk-vendors", "chunk-common", "minecraft-projects"],
        },

        // {host}/minecraft-java-resource-packs.html
        "minecraft-java-resource-packs": {
            entry: "./src/pages/minecraft-java-resource-packs/main.js",
            template: "public/index.html",
            filename: "minecraft-java-resource-packs.html",
            title: "Minecraft Java Resource Packs",
            chunks: ["chunk-vendors", "chunk-common", "minecraft-java-resource-packs"],
        },
        // {host}/minecraft-java-resource-packs/view.html
        "minecraft-java-resource-packs/view": {
            entry: "./src/pages/minecraft-java-resource-packs/view/main.js",
            template: "public/index.html",
            filename: "minecraft-java-resource-packs/view.html",
            title: "Minecraft Java Resource Packs - View Project",
            chunks: ["chunk-vendors", "chunk-common", "minecraft-java-resource-packs/view"],
        },

        // {host}/minecraft-bedrock-resource-packs.html
        "minecraft-bedrock-resource-packs": {
            entry: "./src/pages/minecraft-bedrock-resource-packs/main.js",
            template: "public/index.html",
            filename: "minecraft-bedrock-resource-packs.html",
            title: "Minecraft Becrock Resource Packs",
            chunks: ["chunk-vendors", "chunk-common", "minecraft-bedrock-resource-packs"],
        },
        // {host}/minecraft-java-resource-packs/view.html
        "minecraft-bedrock-resource-packs/view": {
            entry: "./src/pages/minecraft-bedrock-resource-packs/view/main.js",
            template: "public/index.html",
            filename: "minecraft-bedrock-resource-packs/view.html",
            title: "Minecraft Becrock Resource Packs - View Project",
            chunks: ["chunk-vendors", "chunk-common", "minecraft-bedrock-resource-packs/view"],
        },

        // {host}/minecraft-java-mods.html
        "minecraft-java-mods": {
            entry: "./src/pages/minecraft-java-mods/main.js",
            template: "public/index.html",
            filename: "minecraft-java-mods.html",
            title: "Minecraft Becrock Resource Packs",
            chunks: ["chunk-vendors", "chunk-common", "minecraft-java-mods"],
        },
        // {host}/minecraft-java-resource-packs/view.html
        "minecraft-java-mods/view": {
            entry: "./src/pages/minecraft-java-mods/view/main.js",
            template: "public/index.html",
            filename: "minecraft-java-mods/view.html",
            title: "Minecraft Becrock Resource Packs - View Project",
            chunks: ["chunk-vendors", "chunk-common", "minecraft-java-mods/view"],
        },

        // {host}/other-projects.html
        "other-projects": {
            entry: "./src/pages/other-projects/main.js",
            template: "public/index.html",
            filename: "other-projects.html",
            title: "Minecraft Becrock Resource Packs",
            chunks: ["chunk-vendors", "chunk-common", "other-projects"],
        },
        // {host}/other-projects/view.html
        "other-projects/view": {
            entry: "./src/pages/other-projects/view/main.js",
            template: "public/index.html",
            filename: "other-projects/view.html",
            title: "Minecraft Becrock Resource Packs - View Project",
            chunks: ["chunk-vendors", "chunk-common", "other-projects/view"],
        },

        // {host}/colourtest.html
        colourtest: {
            entry: "./src/pages/colourtest/main.js",
            template: "public/index.html",
            filename: "colourtest.html",
            title: "Colour Test",
            chunks: ["chunk-vendors", "chunk-common", "colourtest"],
        },
    },
});
