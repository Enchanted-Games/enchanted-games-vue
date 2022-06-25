export { pickrLayer1, pickrLayer2, pickrLayer3, namePickr, createPickers };
import { finalPreview, mainBlock } from "/generator/bd-v4/main.mjs";

let pickrSwatches = ["#CE8F91", "#FEC29E", "#FFD892", "#8FCE97", "#8FCECC", "#8FABCE", "#AF8FCE", "#CE8FBC", "#9A5F61", "#BF8966", "#D7B166", "#5F9A69", "#5F9A99", "#5F799A", "#7E5F9A", "#9A5F88"];
let pickrLayer1 = undefined;
let pickrLayer2 = undefined;
let pickrLayer3 = undefined;
let namePickr = undefined;

function createPickers() {
    pickrLayer1 = new Pickr({
        el: ".pickr-layer1",
        theme: "nano", // or 'monolith', or 'nano'
        default: mainBlock.layers.layer1.colour,

        swatches: pickrSwatches,

        components: {
            // Main components
            preview: true,
            opacity: false,
            hue: true,

            // Input / output Options
            interaction: {
                hex: true,
                rgba: false,
                hsla: false,
                hsva: false,
                cmyk: false,
                input: true,
                clear: false,
                save: true,
            },
        },
    });
    pickrLayer1.on("changestop", function () {
        let col = pickrLayer1.getColor().toHEXA().toString();
        mainBlock.layers.layer1.colour = col;
        finalPreview.renderConfig(mainBlock, true);
        pickrLayer1.setColor(col);
    });
    pickrLayer1.on("swatchselect", function () {
        let col = pickrLayer1.getColor().toHEXA().toString();
        mainBlock.layers.layer1.colour = col;
        finalPreview.renderConfig(mainBlock, true);
        pickrLayer1.setColor(col);
    });

    pickrLayer2 = new Pickr({
        el: ".pickr-layer2",
        theme: "nano", // or 'monolith', or 'nano'
        default: mainBlock.layers.layer2.colour,

        swatches: pickrSwatches,

        components: {
            // Main components
            preview: true,
            opacity: false,
            hue: true,

            // Input / output Options
            interaction: {
                hex: true,
                rgba: false,
                hsla: false,
                hsva: false,
                cmyk: false,
                input: true,
                clear: false,
                save: true,
            },
        },
    });
    pickrLayer2.on("changestop", function () {
        let col = pickrLayer2.getColor().toHEXA().toString();
        mainBlock.layers.layer2.colour = col;
        finalPreview.renderConfig(mainBlock, true);
        pickrLayer2.setColor(col);
    });
    pickrLayer2.on("swatchselect", function () {
        let col = pickrLayer2.getColor().toHEXA().toString();
        mainBlock.layers.layer2.colour = col;
        finalPreview.renderConfig(mainBlock, true);
        pickrLayer2.setColor(col);
    });

    pickrLayer3 = new Pickr({
        el: ".pickr-layer3",
        theme: "nano", // or 'monolith', or 'nano'
        default: mainBlock.layers.layer3.colour,

        swatches: pickrSwatches,

        components: {
            // Main components
            preview: true,
            opacity: false,
            hue: true,

            // Input / output Options
            interaction: {
                hex: true,
                rgba: false,
                hsla: false,
                hsva: false,
                cmyk: false,
                input: true,
                clear: false,
                save: true,
            },
        },
    });
    pickrLayer3.on("changestop", function () {
        let col = pickrLayer3.getColor().toHEXA().toString();
        mainBlock.layers.layer3.colour = col;
        finalPreview.renderConfig(mainBlock, true);
        pickrLayer3.setColor(col);
    });
    pickrLayer3.on("swatchselect", function () {
        let col = pickrLayer3.getColor().toHEXA().toString();
        mainBlock.layers.layer3.colour = col;
        finalPreview.renderConfig(mainBlock, true);
        pickrLayer3.setColor(col);
    });

    namePickr = new Pickr({
        el: ".bd-name-pickr",
        theme: "nano", // or 'monolith', or 'nano'
        default: mainBlock.generalOptions.nameFormatting.colour,

        swatches: pickrSwatches,

        components: {
            // Main components
            preview: true,
            opacity: false,
            hue: true,

            // Input / output Options
            interaction: {
                hex: true,
                rgba: false,
                hsla: false,
                hsva: false,
                cmyk: false,
                input: true,
                clear: false,
                save: true,
            },
        },
    });
    namePickr.on("changestop", function () {
        let col = namePickr.getColor().toHEXA().toString();
        mainBlock.generalOptions.nameFormatting.colour = col;
        finalPreview.renderConfig(mainBlock, true);
        namePickr.setColor(col);
    });
    namePickr.on("swatchselect", function () {
        let col = namePickr.getColor().toHEXA().toString();
        mainBlock.generalOptions.nameFormatting.colour = col;
        finalPreview.renderConfig(mainBlock, true);
        namePickr.setColor(col);
    });
}
