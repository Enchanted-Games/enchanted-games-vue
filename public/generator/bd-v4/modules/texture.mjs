import { domainName } from "/generator/bd-v4/modules/metadata.mjs";
import { mainBlock } from "/generator/bd-v4/main.mjs";

export { Texture, textureCollection };

let textureCollection = {
    addTexture: function (texture) {
        // warn to console if the texture is already in textureCollection
        if (this.textures[texture.textureID] != undefined) {
            console.warn("WARN: Texture ID '" + texture.textureID + "' already exists. It has been replaced");
        }
        this.textures[texture.textureID] = texture;
    },
    getTexture: function (textureID) {
        // returns a texture object for the passed in textureID from this textureCollecion
        let textureToReturn = this[textureID];
        if (textureToReturn !== null || textureCollection !== undefined) {
            return this.textures[textureID];
        } else {
            console.error("Invalid texture ID (" + textureID + ")");
            return false;
        }
    },
    getRandomTexture: function (layer) {
        // layer (optional) set to "layer1" to only get a texture compatible with layer 1
        if (layer == "layer1") {
            let gotLayerTex = false;
            let randomTex = null;

            while (gotLayerTex == false) {
                // get a random texture that is compatible with layer 1
                randomTex = randomProperty(this.textures);
                if (randomTex.compatibleWithLayer1 == true && randomTex.textureID != "empty" && randomTex.canAppearInRandomSelection != false) {
                    gotLayerTex = true;
                }
            }

            return randomTex;
            //
        } else {
            let gotLayerTex = false;
            let randomTex = null;

            while (gotLayerTex == false) {
                // get a random texture that is compatible with layer 1
                randomTex = randomProperty(this.textures);
                if (randomTex.compatibleWithLayer1 != true && randomTex.textureID != "empty" && randomTex.canAppearInRandomSelection != false) {
                    gotLayerTex = true;
                }
            }

            return randomTex;
        }
    },
    textures: {},
};
window.textureCollection = textureCollection;

function randomProperty(obj) {
    var keys = Object.keys(obj);
    return obj[keys[(keys.length * Math.random()) << 0]];
}

class Texture {
    constructor(settingsObject) {
        this.textureID = settingsObject.textureID;
        this.displayImage = settingsObject.displayImage;
        this.blockTitle = settingsObject.blockTitle;
        this.blockLore = settingsObject.blockLore;
        this.modelData = settingsObject.modelData;
        this.compatibleWithLayer1 = settingsObject.compatibleWithLayer1;
        this.canAppearInRandomSelection = settingsObject.canAppearInRandomSelection;

        settingsObject.renderingMode = settingsObject.renderingMode.toLowerCase();
        // rendering modes
        // sets faces to image urls
        if (settingsObject.renderingMode == "grasslike") {
            this.images = {
                north: settingsObject.images.sides,
                east: settingsObject.images.sides,
                south: settingsObject.images.sides,
                west: settingsObject.images.sides,
                top: settingsObject.images.top,
                bottom: "",
            };
        } else if (settingsObject.renderingMode == "loglike") {
            this.images = {
                north: settingsObject.images.sides,
                east: settingsObject.images.sides,
                south: settingsObject.images.sides,
                west: settingsObject.images.sides,
                top: settingsObject.images.top,
                bottom: settingsObject.images.bottom,
            };
        } else if (settingsObject.renderingMode == "specific") {
            this.images = {
                north: settingsObject.images.north,
                east: settingsObject.images.east,
                south: settingsObject.images.south,
                west: settingsObject.images.west,
                top: settingsObject.images.top,
                bottom: settingsObject.images.bottom,
            };
        } else {
            // includes anything not specified above (includes "all" rendering mode)
            this.images = {
                north: settingsObject.images.all,
                east: settingsObject.images.all,
                south: settingsObject.images.all,
                west: settingsObject.images.all,
                top: settingsObject.images.all,
                bottom: settingsObject.images.all,
            };
        }
        textureCollection.addTexture(this);
    }
}

Texture.prototype.getModelData = function () {
    return this.modelData;
};

Texture.prototype.createClickableTexture = function (elmToCreateIn, blockObjectToDrawTo) {
    let clickableImage = document.createElement("img");
    clickableImage.src = this.displayImage;
    let thisTexture = this;
    let layerToDraw = elmToCreateIn.getAttribute("data-layer-to-draw");
    // updates passed in block preview when image is clicked or focused on
    // clickableImage.addEventListener("click", function () {
    //     thisTexture.drawTextureTo(blockObjectToDrawTo, layerToDraw, true, mainBlock);
    // });
    clickableImage.addEventListener("focusin", function () {
        thisTexture.drawTextureTo(blockObjectToDrawTo, layerToDraw, true, mainBlock);
    });

    let loreString = "";
    if (this.blockLore != undefined) {
        loreString = "<br><span style='opacity:0.5'>" + this.blockLore + "</span>";
    }

    // create tippy tooltip on image
    tippy(clickableImage, {
        allowHTML: true,
        content: `${this.blockTitle}${loreString}`, // title of the texture
        theme: "MCtooltip",
        followCursor: true,
        arrow: false,
        placement: "right",
        offset: [0, 20],
        duration: 100,
        touch: false,
        hideOnClick: false,
    });

    // set attributes for image
    clickableImage.setAttribute("draggable", false);
    clickableImage.setAttribute("tabindex", 0);
    clickableImage.setAttribute("aria-title", this.blockTitle);
    clickableImage.setAttribute("class", "MCUItextureImage");
    clickableImage.oncontextmenu = function (e) {
        e.preventDefault();
    };
    clickableImage.onerror = function (e) {
        this.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw1AUhU9TS0UqDmYQccjQOlkQFXGUKhbBQmkrtOpg8tI/aGJIUlwcBdeCgz+LVQcXZ10dXAVB8AfEzc1J0UVKvC8ptIjxwuN9nHfP4b37AKFZY5rVMw5oum1mkgkpX1iRwq8IIQARMUgys4xUdiEH3/q6p16quzjP8u/7s/rVosWAgEQ8ywzTJl4nnt60Dc77xCKryCrxOfGYSRckfuS64vEb57LLAs8UzVxmjlgklspdrHQxq5ga8RRxVNV0yhfyHquctzhrtTpr35O/MFLUl7NcpzWCJBaRQhoSFNRRRQ024rTrpFjI0HnCxz/s+tPkUshVBSPHPDagQXb94H/we7ZWaXLCS4okgNCL43zEgPAu0Go4zvex47ROgOAzcKV3/BtNYOaT9EZHix4BA9vAxXVHU/aAyx1g6MmQTdmVgrSEUgl4P6NvKgCDt0Dfqje39jlOH4AczWrpBjg4BEbLlL3m8+7e7rn929Oe3w954nKqqt8AQgAAAJ5JREFUWIVjYBgFo2AUDDBghDEuT1r/n4GBgUE3L5ARt3IEgKmHAXR9xJrHRKxLaQVYSNWAy2ekhiAMDN4QINZH6GmBVPMGbwgQAug+IjYk0MHgCwF0n+CKO3LLC3TzBk8IUCtfk2re4AkBYgGuVE9uSA14CIwCjHg7mjuVrBKNWGA9OZustEIzgNc1W7yrqBIaPlvbBpevR8EoGFQAANygTCrMJ+T4AAAAAElFTkSuQmCC";
        console.log("image was not found, showing error image instead", this);
        this.onerror = null;
    };

    elmToCreateIn.appendChild(clickableImage);

    clickableImage = null;
};
Texture.prototype.drawTextureTo = function (blockObject, layerToDrawTo, shouldUpdate, blockConfigToUpdate, colour) {
    let colourPickerElm = $q("#colour-picker-" + layerToDrawTo);

    let tintColour = colour;
    if (colour == undefined || colour == null) {
        tintColour = colourPickerElm.value;
    }

    if (colourPickerElm == 0) {
        tintColour = "#ffffff";
    }
    for (const [key, value] of Object.entries(blockObject.faces[layerToDrawTo])) {
        // gets canvas face
        let canvasFace = value;
        let canvasBuffer = blockObject.buffers[layerToDrawTo][key];
        // get image link for each face
        let imageURL = domainName + this.images[key];

        this.render(canvasFace, imageURL, tintColour, canvasBuffer);

        canvasFace = null;
        canvasBuffer = null;
        imageURL = null;
    }

    if (shouldUpdate) {
        blockConfigToUpdate.layers[layerToDrawTo].textureID = this.textureID;
        blockConfigToUpdate.layers[layerToDrawTo].colour = tintColour;
    }

    colourPickerElm = null;
    tintColour = null;
};

Texture.prototype.render = function (canvas, imageURL, tintColour, buffer) {
    // get context
    let ctx = canvas.getContext("2d");
    let bufferCtx = buffer.getContext("2d");
    // remove image smoothing and set default comp operation
    ctx.imageSmoothingEnabled = false;
    ctx.globalCompositeOperation = "source-over";

    let img = new Image(112, 112);

    img.onload = function () {
        // clear canvas and draw the image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // multiply image by colour
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = tintColour;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // keep transparency
        ctx.globalCompositeOperation = "destination-atop";
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // draw same tinted image to buffer
        bufferCtx.clearRect(0, 0, buffer.width, buffer.height);
        bufferCtx.drawImage(canvas, 0, 0, buffer.width, buffer.height);

        // clean up image
        img.remove();
        img = null;
        ctx = null;
        bufferCtx = null;
    };
    img.onerror = function () {
        // clear canvas if image fails to load
        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bufferCtx.clearRect(0, 0, buffer.width, buffer.height);
        // clean up image
        img.remove();
        img = null;
        ctx = null;
        bufferCtx = null;
    };
    img.src = imageURL;
};
