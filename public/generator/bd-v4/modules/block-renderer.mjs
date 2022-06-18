import { textureCollection } from "/generator/bd-v4/modules/texture.mjs";
import { cleanString } from "/generator/bd-v4/main.mjs";
export { BlockRenderer, BlockRenderer2D };

class BlockRenderer {
    constructor(settingsObject) {
        this.parent = settingsObject.parent;
        this.parent.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });
        // used for the saved blocks menu (editing block)
        if (settingsObject.renderSmaller == true) {
            this.editString = "-edit";
        } else {
            this.editString = "";
        }
        this.faces = {
            layer1: {},
            layer2: {},
            layer3: {},
        };
        this.buffers = {
            layer1: {},
            layer2: {},
            layer3: {},
        };
        this.glintIntervals = {
            layer1: null,
            layer2: null,
            layer3: null,
        };
        this.canvasResolution = settingsObject.canvasResolution;
        this.renderSmaller = settingsObject.renderSmaller;
        this.mathCube;
        this.currentRotation = {
            degx: -25,
            degy: -45,
            degz: 0,
        };
        if (settingsObject.colourInputs != undefined) {
            this.inputs = {
                colours: settingsObject.colourInputs,
                glints: settingsObject.glintInputs,
                nameFormats: settingsObject.nameFormatInputs,
            };
        }
    }
}

BlockRenderer.prototype.renderConfig = function (blockConfig, updateInputs, redrawFaces) {
    let renderer = this;

    if (updateInputs) {
        // set colours
        // updates jscolor inputs
        for (const [key, value] of Object.entries(renderer.inputs.colours)) {
            // get input IDs from BlockRenderer object
            let colourInput = $q(value);
            // parse layer from input IDs
            let layer = value;
            layer = layer.replace("#colour-picker-", "");
            // get colour from passed in config
            let colour = blockConfig.layers[layer].colour;
            // set colour inputs
            colourInput.value = colour;
            try {
                colourInput.jscolor.fromString(colour);
            } catch (error) {}

            colourInput = null;
            layer = null;
            colour = null;
        }

        // set glints input toggles
        for (let i = 0; i < 3; i++) {
            let layer = "layer" + (i + 1);

            if (blockConfig.layers[layer].hasGlint) {
                $q(this.inputs.glints[layer]).checked = true;
            } else {
                $q(this.inputs.glints[layer]).checked = false;
            }
            layer = null;
        }

        blockConfig.generalOptions.inGameName = cleanString(blockConfig.generalOptions.inGameName, true);
        blockConfig.generalOptions.blockLore = cleanString(blockConfig.generalOptions.blockLore, true, 150);

        $q(this.inputs.nameFormats.name).value = blockConfig.generalOptions.inGameName;
        $q(this.inputs.nameFormats.lore).value = blockConfig.generalOptions.blockLore;
        $q(this.inputs.nameFormats.bold).checked = blockConfig.generalOptions.nameFormatting.bold;
        $q(this.inputs.nameFormats.italic).checked = blockConfig.generalOptions.nameFormatting.italic;
        $q(this.inputs.nameFormats.strike).checked = blockConfig.generalOptions.nameFormatting.strike;
        $q(this.inputs.nameFormats.underline).checked = blockConfig.generalOptions.nameFormatting.underline;
        $q(this.inputs.nameFormats.blockNameColour).jscolor.fromString(blockConfig.generalOptions.nameFormatting.colour);

        this.updateNameFormatting(blockConfig);
    }

    // set glints render
    for (let i = 0; i < 3; i++) {
        let layer = "layer" + (i + 1);

        if (blockConfig.layers[layer].hasGlint) {
            this.glintLayer(layer, true);
        } else {
            this.glintLayer(layer, false);
        }
        layer = null;
    }

    if (redrawFaces == false) {
        // clean up
        renderer = null;
        // stop if should not redraw canvases
        return false;
    }

    // // draw image urls from passed config
    for (const [key, value] of Object.entries(blockConfig.layers)) {
        // get input IDs from BlockRenderer object
        let textureID = value.textureID;
        // get layers
        let layer = key;
        let colour = value.colour;

        textureCollection.textures[textureID].drawTextureTo(renderer, layer, false, null, colour);
        textureID = null;
        layer = null;
    }

    // clean up
    renderer = null;
};

BlockRenderer.prototype.updateNameFormatting = function (blockConfig, onlyUpdateTippy) {
    // update styling for name input and update hover name

    // colour name
    let nameInput = null;
    if (onlyUpdateTippy == true) {
        nameInput = document.createElement("input");
    } else {
        nameInput = $q(this.inputs.nameFormats.name);
    }
    nameInput.style.color = blockConfig.generalOptions.nameFormatting.colour;

    if (blockConfig.generalOptions.nameFormatting.bold == true) {
        nameInput.style.fontWeight = "bold";
    } else {
        nameInput.style.fontWeight = "normal";
    }
    if (blockConfig.generalOptions.nameFormatting.italic == true) {
        nameInput.style.fontStyle = "italic";
    } else {
        nameInput.style.fontStyle = "normal";
    }

    if (blockConfig.generalOptions.nameFormatting.underline == true && blockConfig.generalOptions.nameFormatting.strike == false) {
        // underline only
        nameInput.style.textDecoration = "underline";
    } else if (blockConfig.generalOptions.nameFormatting.underline == false && blockConfig.generalOptions.nameFormatting.strike == false) {
        nameInput.style.textDecoration = "none";
    }

    if (blockConfig.generalOptions.nameFormatting.strike == true && blockConfig.generalOptions.nameFormatting.underline == false) {
        // strike through only
        nameInput.style.textDecoration = "line-through";
    } else if (blockConfig.generalOptions.nameFormatting.strike == false && blockConfig.generalOptions.nameFormatting.underline == false) {
        nameInput.style.textDecoration = "none";
    }

    if (blockConfig.generalOptions.nameFormatting.underline == true && blockConfig.generalOptions.nameFormatting.strike == true) {
        // if bold and strike through
        nameInput.style.textDecoration = "underline line-through";
    } else if (blockConfig.generalOptions.nameFormatting.underline == false && blockConfig.generalOptions.nameFormatting.strike == false) {
        nameInput.style.textDecoration = "none";
    }

    this.tippyTooltip.setContent(`<span class="MCtooltipContent"> <span style="${nameInput.style.cssText}">${blockConfig.generalOptions.inGameName}</span><br><span class="MCUIloreText">${blockConfig.generalOptions.blockLore}</span></span>`);

    if (onlyUpdateTippy == true) {
        nameInput = null;
    }
};

BlockRenderer.prototype.debug = function () {
    console.log(this);
};

// used to determine canvas id names
let canvasEndingMap = new Map();
canvasEndingMap.set(1, "top");
canvasEndingMap.set(2, "s1");
canvasEndingMap.set(3, "s2");
canvasEndingMap.set(4, "s3");
canvasEndingMap.set(5, "s4");
canvasEndingMap.set(6, "bottom");

// used when naming faces in the faces object
let faceNames = new Map();
faceNames.set(0, "top");
faceNames.set(1, "west");
faceNames.set(2, "north");
faceNames.set(3, "east");
faceNames.set(4, "south");
faceNames.set(5, "bottom");

BlockRenderer.prototype.create = function () {
    if (this.editString == undefined || this.editString == null) {
        this.editString = "";
    }

    // create main container
    let blockContainer = document.createElement("div");
    blockContainer.setAttribute("id", "preview3Dcubecontainer" + this.editString);

    this.tippyTooltip = new tippy(blockContainer, {
        allowHTML: true,
        content: `Name undefined`, // gets populated in renderConfig
        theme: "MCtooltip",
        followCursor: true,
        arrow: false,
        placement: "right",
        offset: [0, 20],
        duration: 100,
        hideOnClick: false,
    });

    // create cube
    let preview3Dcube = document.createElement("div");
    preview3Dcube.setAttribute("id", "preview3Dcube" + this.editString);
    blockContainer.appendChild(preview3Dcube);
    this.mathCube = preview3Dcube;

    // create faces
    for (let i = 0; i < 6; i++) {
        let faceName = faceNames.get(i);
        let sideInt = i + 1;
        let sideElm = document.createElement("div");
        sideElm.setAttribute("id", `side${sideInt}` + this.editString);
        sideElm.setAttribute("class", "cubeside");

        let brightnessAttribute = "0";
        if (faceName == "north" || faceName == "south") {
            brightnessAttribute = "10";
        }
        if (faceName == "east" || faceName == "west") {
            brightnessAttribute = "20";
        }
        if (faceName == "bottom") {
            brightnessAttribute = "30";
        }

        // spawner images
        let spawnerFace = document.createElement("div");
        spawnerFace.setAttribute("id", "spawnerface" + this.editString);
        let spawnerFaceImg = document.createElement("img");
        spawnerFaceImg.setAttribute("src", "/images/blockdesigner/spawner.png");
        spawnerFaceImg.setAttribute("data-brightness-level", brightnessAttribute);
        spawnerFace.appendChild(spawnerFaceImg);

        // canvases

        let canvasEnding = canvasEndingMap.get(sideInt);
        let canvas1 = document.createElement("canvas");
        canvas1.setAttribute("class", "border-box");
        canvas1.setAttribute("id", "canvas1" + canvasEnding + this.editString);
        canvas1.setAttribute("width", this.canvasResolution);
        canvas1.setAttribute("height", this.canvasResolution);
        canvas1.setAttribute("data-brightness-level", brightnessAttribute);
        this.faces.layer1[faceName] = canvas1;

        let canvas2 = document.createElement("canvas");
        canvas2.setAttribute("class", "border-box");
        canvas2.setAttribute("id", "canvas2" + canvasEnding + this.editString);
        canvas2.setAttribute("width", this.canvasResolution);
        canvas2.setAttribute("height", this.canvasResolution);
        canvas2.setAttribute("data-brightness-level", brightnessAttribute);
        this.faces.layer2[faceName] = canvas2;

        let canvas3 = document.createElement("canvas");
        canvas3.setAttribute("class", "border-box");
        canvas3.setAttribute("id", "canvas3" + canvasEnding + this.editString);
        canvas3.setAttribute("width", this.canvasResolution);
        canvas3.setAttribute("height", this.canvasResolution);
        canvas3.setAttribute("data-brightness-level", brightnessAttribute);
        this.faces.layer3[faceName] = canvas3;

        let canvasBuffer1 = document.createElement("canvas");
        canvasBuffer1.setAttribute("class", "border-box");
        canvasBuffer1.setAttribute("id", "canvasBuffer1" + canvasEnding + this.editString);
        canvasBuffer1.setAttribute("width", this.canvasResolution);
        canvasBuffer1.setAttribute("height", this.canvasResolution);
        canvasBuffer1.setAttribute("data-brightness-level", brightnessAttribute);
        this.buffers.layer1[faceName] = canvasBuffer1;

        let canvasBuffer2 = document.createElement("canvas");
        canvasBuffer2.setAttribute("class", "border-box");
        canvasBuffer2.setAttribute("id", "canvasBuffer2" + canvasEnding + this.editString);
        canvasBuffer2.setAttribute("width", this.canvasResolution);
        canvasBuffer2.setAttribute("height", this.canvasResolution);
        canvasBuffer2.setAttribute("data-brightness-level", brightnessAttribute);
        this.buffers.layer2[faceName] = canvasBuffer2;

        let canvasBuffer3 = document.createElement("canvas");
        canvasBuffer3.setAttribute("class", "border-box");
        canvasBuffer3.setAttribute("id", "canvasBuffer3" + canvasEnding + this.editString);
        canvasBuffer3.setAttribute("width", this.canvasResolution);
        canvasBuffer3.setAttribute("height", this.canvasResolution);
        canvasBuffer3.setAttribute("data-brightness-level", brightnessAttribute);
        this.buffers.layer3[faceName] = canvasBuffer3;

        sideElm.appendChild(spawnerFace);
        sideElm.appendChild(canvas1);
        sideElm.appendChild(canvas2);
        sideElm.appendChild(canvas3);
        preview3Dcube.appendChild(sideElm);
    }

    // append all elements to parent
    this.parent.appendChild(blockContainer);

    if (this.renderSmaller == true) {
        let blockShadow = document.createElement("span");
        blockShadow.setAttribute("class", "preview-shadow");
        this.parent.appendChild(blockShadow);
        this.tippyTooltip.setContent("Preview of the block");
    }

    try {
        for (const [key, value] of Object.entries(this.inputs.colours)) {
            $q(value).addEventListener("change", function () {
                manageColourInput(this);
            });
        }
        for (const [key, value] of Object.entries(this.inputs.glints)) {
            $q(value).addEventListener("change", function () {
                manageGlintInput(this);
            });
        }
        for (const [key, value] of Object.entries(this.inputs.nameFormats)) {
            $q(value).addEventListener("change", function () {
                manageNameFormatInput(this);
            });
        }
    } catch {}
};

// change rotation of block
BlockRenderer.prototype.setRotation = function (degx, degy, degz) {
    this.currentRotation = { degx: degx, degy: degy, degz: degz };
    this.mathCube.style.transform = "rotateX(" + degx + "deg) rotateY(" + degy + "deg) rotateZ(" + degz + "deg) translateX(0) translateY(0) translateZ(0)";
};
// add new values to rotation of the block
BlockRenderer.prototype.addRotation = function (degx, degy, degz) {
    this.mathCube.style.transform = "rotateX(" + (this.currentRotation.degx + degx) + "deg) rotateY(" + (this.currentRotation.degy + degy) + "deg) rotateZ(" + (this.currentRotation.degz + degz) + "deg) translateX(0) translateY(0) translateZ(0)";

    this.currentRotation.degx += degx;
    this.currentRotation.degy += degy;
    this.currentRotation.degz += degz;
};
// reset rotation of the block
BlockRenderer.prototype.resetRotation = function () {
    this.setRotation(-25, -45, 0);
};
BlockRenderer.prototype.startRotating = function (rotate) {
    // in milliseconds
    let rotationSpeed = 6500;
    setTimeout(() => {
        if (rotate == true) {
            this.isRotating = true;
            this.mathCube.setAttribute("style", "transition: all " + rotationSpeed + "ms linear;");
            this.addRotation(0, 360, 0);

            this.loopTimer = setInterval(() => {
                this.mathCube.setAttribute("style", "transition: all 0ms linear;");
                this.resetRotation();
                setTimeout(() => {
                    this.mathCube.setAttribute("style", "transition: all " + rotationSpeed + "ms linear;");
                    this.addRotation(0, 360, 0);
                }, 10);
            }, rotationSpeed + 25);
        } else if (rotate == false) {
            this.isRotating = false;
            clearInterval(this.loopTimer);
            this.mathCube.setAttribute("style", "transition: all 0s linear;");
            this.resetRotation();
        }
    }, 100);
};

BlockRenderer.prototype.showBlock = function (shouldShow) {
    if (shouldShow != true) {
        this.mathCube.style.display = "none";
    } else {
        this.mathCube.style.display = "block";
    }
};

BlockRenderer.prototype.glintLayer = function (layer, glintTrueOrFalse) {
    // glint(glintTrueOrFalse, key, renderer.faces[layer], renderer.buffers[layer], renderer.glintIntervals[layer]);

    this.glintIntervals[layer] = clearInterval(this.glintIntervals[layer]);

    this.glintIntervals[layer] = setInterval(() => {
        // get each canvas to glint and buffers
        glintRender(this.faces[layer].north, glintTrueOrFalse, this.buffers[layer].north);
        glintRender(this.faces[layer].east, glintTrueOrFalse, this.buffers[layer].east);
        glintRender(this.faces[layer].south, glintTrueOrFalse, this.buffers[layer].south);
        glintRender(this.faces[layer].west, glintTrueOrFalse, this.buffers[layer].west);
        glintRender(this.faces[layer].top, glintTrueOrFalse, this.buffers[layer].top);
        glintRender(this.faces[layer].bottom, glintTrueOrFalse, this.buffers[layer].bottom);
        drawGlint();
    }, globalFrame);
};

var glint_offset = 30;
var glint_steps = 150;
var globalScale = 5.5;
var enchantGlintAlphaL1 = 0.5;
var globalFrame = 30;
let glint_offset_increase = 1;
let img_glint = $q("#glint-texture");
let img_glint_small = $q("#glint-texture-small");

let glintLoop = setInterval(() => {
    glint_offset += glint_offset_increase;
}, globalFrame);

function glintRender(canvas, toggle, buffer) {
    if (toggle == true) {
        let ctx = canvas.getContext("2d");
        let glintImg = document.getElementById("glint-animation");
        ctx.imageSmoothingEnabled = false;
        ctx.globalCompositeOperation = "destination-atop";
        ctx.clearRect(0, 0, 112, 112);
        ctx.drawImage(glintImg, 0, 0);
        ctx.drawImage(buffer, 0, 0);
        ctx = null;
        glintImg = null;
    } else {
        let ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, 112, 112);
        ctx.drawImage(buffer, 0, 0);
        ctx = null;
    }
}

function deg(angle) {
    return (angle * Math.PI) / 180.0;
}

function drawGlint() {
    try {
        // console.log("ran");
        let canvas = $q("#glint-animation");
        let ctx = canvas.getContext("2d");

        ctx.imageSmoothingEnabled = true;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.globalAlpha = enchantGlintAlphaL1;
        ctx.save();
        ctx.rotate(deg(15));
        ctx.scale(globalScale, globalScale);
        ctx.translate(0, -20);
        ctx.translate((((glint_offset * canvas.width) / glint_steps) % canvas.width) - canvas.width, 0);
        ctx.drawImage(img_glint, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img_glint, 112, 0, canvas.width, canvas.height);
        ctx.restore();

        ctx = null;
        canvas = null;
    } catch {}
}

class BlockRenderer2D {
    constructor(settingsObject) {
        // elements must be passed as actual html elements eg: $q(".element")
        this.parent = settingsObject.parent;
        this.canvases = settingsObject.canvases;
        this.canvasResolution = settingsObject.canvasResolution;
    }
}

// render config for a 2d renderer
BlockRenderer2D.prototype.renderConfig = function (blockConfig) {
    for (const [key, value] of Object.entries(blockConfig.layers)) {
        let textureID = value.textureID;
        let texture = textureCollection.getTexture(textureID);

        let canvtoDrawTo = this.canvases["canvas_" + key];
        let buffer = document.createElement("canvas");

        texture.render(canvtoDrawTo, texture.images.north, blockConfig.layers[key].colour, buffer);

        textureID = null;
        texture = null;
        canvtoDrawTo = null;
        buffer = null;
    }
};

BlockRenderer2D.prototype.staticGlint = function (canvas) {
    // let ctx = canvas.getContext("2d");
    // ctx.globalCompositeOperation = "overlay";
    // ctx.drawImage(img_glint_small, 0, 0, 56, 56);
};
