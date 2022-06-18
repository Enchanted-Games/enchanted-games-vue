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
        this.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw1AUhU9Ti0UqgnYQcchQnayIijhKFYtgobQVWnUweekfNGlIUlwcBdeCgz+LVQcXZ10dXAVB8AfEydFJ0UVKvC8ptIjxweV9nPfO4b77AKFRYarZNQGommWk4jExm1sVu18RRAD9VOMSM/VEejEDz/V1Dx/f76I8y/ven6tXyZsM8InEc0w3LOIN4plNS+e8TxxmJUkhPiceM6hB4keuyy6/cS46LPDMsJFJzROHicViB8sdzEqGSjxNHFFUjfKFrMsK5y3OaqXGWn3yF4by2kqa61TDiGMJCSQhQkYNZVRgIUq7RoqJFJ3HPPxDjj9JLplcZTByLKAKFZLjB/+D37M1C1OTblIoBgRebPtjBOjeBZp12/4+tu3mCeB/Bq60tr/aAGY/Sa+3tcgR0LcNXFy3NXkPuNwBBp90yZAcyU8lFArA+xl9Uw4YuAV61ty5tc5x+gBkaFbLN8DBITBapOx1j3cHO+f2753W/H4AVupynD/MjrgAAAAXSURBVAiZBcEBAQAAAIIg+j/aQAoNJQdC2Ab7m7U9GwAAAABJRU5ErkJggg==";
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
