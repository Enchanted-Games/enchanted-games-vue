const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
    transpileDependencies: true,
    pages: {
        index: {
            entry: "./src/pages/HomePage/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "Home",
            chunks: ["chunk-vendors", "chunk-common", "index"],
        },
        "minecraft-bedrock-resource-packs": {
            entry: "./src/pages/minecraft-bedrock-resource-packs/main.js",
            template: "public/index.html",
            filename: "minecraft-bedrock-resource-packs.html",
            title: "Minecraft Becrock Resource Packs",
            chunks: ["chunk-vendors", "chunk-common", "minecraft-bedrock-resource-packs"],
        },
        "minecraft-bedrock-resource-packs/view": {
            entry: "./src/pages/minecraft-bedrock-resource-packs/view/main.js",
            template: "public/index.html",
            filename: "minecraft-bedrock-resource-packs/view.html",
            title: "Minecraft Becrock Resource Packs - View Project",
            chunks: ["chunk-vendors", "chunk-common", "minecraft-bedrock-resource-packs/view"],
        },
    },
});
