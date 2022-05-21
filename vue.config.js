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
        second: {
            entry: "./src/pages/SecondPage/main.js",
            template: "public/index.html",
            filename: "second.html",
            title: "Second",
            chunks: ["chunk-vendors", "chunk-common", "second"],
        },
        "dir/nested": {
            entry: "./src/pages/dir/NestedPage/main.js",
            template: "public/index.html",
            filename: "dir/nestedpage.html",
            title: "nested",
            chunks: ["chunk-vendors", "chunk-common", "dir/nested"],
        },
    },
});
