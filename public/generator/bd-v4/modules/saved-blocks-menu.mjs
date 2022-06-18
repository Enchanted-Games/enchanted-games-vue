import { BlockConfig, maxBlocknameLength, maxBlockloreLength, blockPreviewTitle } from "/generator/bd-v4/modules/block-config.mjs";
import { BlockRenderer2D } from "/generator/bd-v4/modules/block-renderer.mjs";
import { cleanString, finalPreview, blankBlock, mainBlock } from "/generator/bd-v4/main.mjs";
import { blockShareShortURL, fullVersion } from "/generator/bd-v4/modules/metadata.mjs";
import { textureIdMap, colourIDMappings } from "./upgrade-mappings.mjs";
export { SavedBlockMenu };

class SavedBlockMenu {
    constructor(settingsObject) {
        this.savedHolder = $q(settingsObject.savedHolder);
        this.currentSavedBlocks = [];
    }
}
function convertBase64StringToURL(blockData64String) {
    let finalURLstring = blockShareShortURL + "?b0=4&b1=" + blockData64String;
    return finalURLstring;
}

SavedBlockMenu.prototype.renderBlock = function (blockData64String, arrayIndex) {
    let blockURLstring = decodeURIComponent(blockData64String);

    let blockConfig = new BlockConfig({
        generateDefaultOptions: false,
        upgradeURLString: true,
        URLString: blockURLstring,
    });
    // add block to the saved blocks menu
    // <div class="saved-item" savedblockid="0">
    //     <div class="canv-holder">
    //          <canvas class="saved-img" width="32" height="32"></canvas><canvas class="saved-img2" width="32" height="32"></canvas><canvas class="saved-img3" width="32" height="32"></canvas>
    //      </div>
    //     <div class="info-holder">
    //         <div class="name-final-holder saved-block-name">
    //             <span class="mc-name-input user-select-none">Endstone ore</span>
    //             <br>
    //             <span class="mc-name-input user-select-none MCUIloreText">Block lore</span>
    //         </div>
    //     </div>
    //     <div class="button-wrapper"><img class="saved-menu-button saved-block-more-options" src="../images/blockdesigner/more_options.png" draggable="false" title="Show more options for this block"></div>
    // </div>

    let savedItem = document.createElement("div");
    savedItem.setAttribute("class", "saved-item");

    // canvases
    let canvasHolder = document.createElement("div");
    canvasHolder.setAttribute("class", "canv-holder");

    let canvas1 = document.createElement("canvas");
    canvas1.setAttribute("width", "32");
    canvas1.setAttribute("height", "32");
    canvas1.setAttribute("class", "saved-img vertical-center");
    canvasHolder.appendChild(canvas1);
    let canvas2 = document.createElement("canvas");
    canvas2.setAttribute("width", "32");
    canvas2.setAttribute("height", "32");
    canvas2.setAttribute("class", "saved-img2 vertical-center");
    canvasHolder.appendChild(canvas2);
    let canvas3 = document.createElement("canvas");
    canvas3.setAttribute("width", "32");
    canvas3.setAttribute("height", "32");
    canvas3.setAttribute("class", "saved-img3 vertical-center");
    canvasHolder.appendChild(canvas3);

    savedItem.appendChild(canvasHolder);

    let canvasRenderer = new BlockRenderer2D({
        parent: canvasHolder,
        canvases: {
            canvas_layer1: canvas1,
            canvas_layer2: canvas2,
            canvas_layer3: canvas3,
        },
        canvasResolution: 32,
    });
    canvasRenderer.renderConfig(blockConfig);

    if (blockConfig.layers.layer1.hasGlint) {
        canvasRenderer.staticGlint(canvas1);
    }
    if (blockConfig.layers.layer2.hasGlint) {
        canvasRenderer.staticGlint(canvas2);
    }
    if (blockConfig.layers.layer3.hasGlint) {
        canvasRenderer.staticGlint(canvas3);
    }

    canvasRenderer = null;
    // canvases end

    // name holder
    let infoHolder = document.createElement("div");
    infoHolder.setAttribute("class", "info-holder");

    let nameContainer = document.createElement("div");
    nameContainer.setAttribute("class", "name-final-holder saved-block-name vertical-center");
    infoHolder.appendChild(nameContainer);

    let nameNode = document.createElement("span");
    nameNode.setAttribute("class", "mc-name-input user-select-none");
    let nameContainerText = document.createTextNode(blockConfig.generalOptions.inGameName);
    nameNode.appendChild(nameContainerText);
    // format name node
    nameNode.style.color = blockConfig.generalOptions.nameFormatting.colour;
    // format the name
    if (blockConfig.generalOptions.nameFormatting.bold == true) {
        nameNode.style.fontWeight = "bold";
    } else {
        nameNode.style.fontWeight = "normal";
    }
    if (blockConfig.generalOptions.nameFormatting.italic == true) {
        nameNode.style.fontStyle = "italic";
    } else {
        nameNode.style.fontStyle = "normal";
    }

    if (blockConfig.generalOptions.nameFormatting.underline == true && blockConfig.generalOptions.nameFormatting.strike == false) {
        // underline only
        nameNode.style.textDecoration = "underline";
    } else if (blockConfig.generalOptions.nameFormatting.underline == false && blockConfig.generalOptions.nameFormatting.strike == false) {
        nameNode.style.textDecoration = "none";
    }

    if (blockConfig.generalOptions.nameFormatting.strike == true && blockConfig.generalOptions.nameFormatting.underline == false) {
        // strike through only
        nameNode.style.textDecoration = "line-through";
    } else if (blockConfig.generalOptions.nameFormatting.strike == false && blockConfig.generalOptions.nameFormatting.underline == false) {
        nameNode.style.textDecoration = "none";
    }

    if (blockConfig.generalOptions.nameFormatting.underline == true && blockConfig.generalOptions.nameFormatting.strike == true) {
        // if bold and strike through
        nameNode.style.textDecoration = "underline line-through";
    } else if (blockConfig.generalOptions.nameFormatting.underline == false && blockConfig.generalOptions.nameFormatting.strike == false) {
        nameNode.style.textDecoration = "none";
    }
    nameContainer.appendChild(nameNode);
    // name end

    // lore
    let blockLoreText = blockConfig.generalOptions.blockLore;

    if (blockLoreText != "" && blockLoreText != false) {
        // only create lore elements if the block has lore
        let loreContainer = document.createElement("span");
        loreContainer.setAttribute("class", "mc-name-input user-select-none MCUIloreText");
        let loreContainerText = document.createTextNode(blockLoreText);
        loreContainer.appendChild(loreContainerText);

        nameContainer.appendChild(document.createElement("br"));
        nameContainer.appendChild(loreContainer);
    }

    savedItem.appendChild(infoHolder);
    // name holder end

    // more options image
    //     <div class="button-wrapper"><img class="saved-menu-button saved-block-more-options" src="../images/blockdesigner/more_options.png" draggable="false" title="Show more options for this block"></div>
    let buttonWrapper = document.createElement("div");
    buttonWrapper.setAttribute("class", "button-wrapper");
    let moreOptionsImage = document.createElement("img");
    moreOptionsImage.setAttribute("class", "saved-menu-button saved-block-more-options vertical-center");
    moreOptionsImage.setAttribute("src", "../images/blockdesigner/more_options.png");
    moreOptionsImage.setAttribute("draggable", "false");
    moreOptionsImage.addEventListener("dragstart", function (event) {
        event.preventDefault();
    });
    moreOptionsImage.setAttribute("title", "Show options for this block");
    moreOptionsImage.addEventListener("click", function (e) {
        populateEditModal(blockData64String, arrayIndex);
        e.target.parentNode.parentNode.classList.remove("glowingElement");
    });

    buttonWrapper.appendChild(moreOptionsImage);
    savedItem.appendChild(buttonWrapper);

    this.savedHolder.appendChild(savedItem);

    blockConfig = null;
};

function loadBlock(e) {
    mainBlock.copyConfig(e.target.blockConfig);
    closeModal("#savedBlockModal");
    finalPreview.renderConfig(mainBlock, true, true);

    $q("#loadSavedBlock").removeEventListener("click", loadBlock);
    e.target.blockConfig = null;
}
function genBlockCmd(e) {
    e.target.blockConfig.generateCommand("1.18", "#command-block-name", "#modal-command-area");
    closeModal("#savedBlockModal");

    $q("#generateCmdSavedBlock").removeEventListener("click", genBlockCmd);
    e.target.blockConfig = null;
}
function shareBlock(e) {
    e.target.blockConfig.generateShareableLink(true, "#sharemodal");
    closeModal("#savedBlockModal");

    $q("#shareSavedBlock").removeEventListener("click", shareBlock);
    e.target.blockConfig = null;
}
function deleteBlock(e) {
    let arrayIndex = e.target.getAttribute("data-array-index-to-delete");
    window.savedBlockMenu.deleteBlockFromIndex(arrayIndex);
    closeModal("#savedBlockModal");
    openModal("#modal8");

    // remove event listeners
    $q("#generateCmdSavedBlock").removeEventListener("click", genBlockCmd);
    $q("#loadSavedBlock").removeEventListener("click", loadBlock);
    $q("#shareSavedBlock").removeEventListener("click", shareBlock);

    deleteButton.removeEventListener("pressHold", deleteBlock);
    deleteButton.removeEventListener("mousedown", pressingDown);
    deleteButton.removeEventListener("mouseup", notPressingDown);
    deleteButton.removeEventListener("mouseleave", notPressingDown);
    deleteButton.removeEventListener("touchstart", pressingDown);
    deleteButton.removeEventListener("touchend", notPressingDown);
}

let deleteAllButton = $q("#deleteAllSavedBlocksButton");
deleteAllButton.addEventListener("pressHold", deleteAllSavedBlocks);
deleteAllButton.addEventListener("mousedown", pressingDown);
deleteAllButton.addEventListener("mouseup", notPressingDown);
deleteAllButton.addEventListener("mouseleave", notPressingDown);
deleteAllButton.addEventListener("touchstart", pressingDown);
deleteAllButton.addEventListener("touchend", notPressingDown);

function deleteAllSavedBlocks() {
    savedBlockMenu.currentSavedBlocks = [];
    savedBlockMenu.removeShownBlocks();
    savedBlockMenu.renderAllBlocks();
    savedBlockMenu.saveBlocksToLocalStorage();

    closeModal("#confirmDeleteAllModal");
    openModal("#modal8");
}

// code for holding down the delete button
let counter = 0;
let pressHoldEvent = new CustomEvent("pressHold");
let pressHoldDuration = 75;
let deleteButton = $q("#deleteSavedBlock");
let pressLoop = null;

function pressingDown(e) {
    // Start the timer
    pressLoop = setInterval(() => {
        timer(e.target);
    }, 10);

    e.preventDefault();
}
function notPressingDown(e) {
    // Stop the timer
    pressLoop = clearInterval(pressLoop);
    counter = 0;

    if (e.target !== undefined) {
        e.target.style.backgroundImage = `none`;
    } else {
        e.style.backgroundImage = `none`;
    }
}

// runs in a loop when holding down the button
function timer(elm) {
    if (counter < pressHoldDuration) {
        counter++;
        let percecntDone = counter / pressHoldDuration;
        percecntDone *= 100;
        elm.style.backgroundImage = `linear-gradient(90deg, #E55A5A ${percecntDone}%, rgba(0,0,0,0) 0% )`;
    } else {
        playClickSound(elm);
        elm.dispatchEvent(pressHoldEvent);
        notPressingDown(elm);
    }
}

// end code for holding down delete button

function populateEditModal(blockData64String, arrayIndex) {
    let blockURLstring = decodeURIComponent(blockData64String);
    let blockConfig = new BlockConfig({
        generateDefaults: false,
        upgradeURLString: true,
        URLString: blockURLstring,
    });

    let modal = $q("#savedBlockModal");

    $q("#savedBlockModalTitle").innerText = cleanString(blockConfig.generalOptions.inGameName, true);

    $q("#loadSavedBlock").blockConfig = blockConfig;
    $q("#loadSavedBlock").addEventListener("click", loadBlock);

    $q("#generateCmdSavedBlock").blockConfig = blockConfig;
    $q("#generateCmdSavedBlock").addEventListener("click", genBlockCmd);

    $q("#shareSavedBlock").blockConfig = blockConfig;
    $q("#shareSavedBlock").addEventListener("click", shareBlock);

    $q("#moveSavedBlockToTop").setAttribute("data-array-index-to-move-up", arrayIndex);
    $q("#moveSavedBlockToTop").addEventListener("click", moveIndexToTop);
    $q("#moveSavedBlockToBottom").setAttribute("data-array-index-to-move-down", arrayIndex);
    $q("#moveSavedBlockToBottom").addEventListener("click", moveIndexToBottom);

    deleteButton.addEventListener("mousedown", pressingDown, false);
    deleteButton.addEventListener("mouseup", notPressingDown, false);
    deleteButton.addEventListener("mouseleave", notPressingDown, false);

    deleteButton.addEventListener("touchstart", pressingDown, false);
    deleteButton.addEventListener("touchend", notPressingDown, false);

    deleteButton.setAttribute("data-array-index-to-delete", arrayIndex);
    deleteButton.addEventListener("pressHold", deleteBlock);

    // use array index to delete

    modal.addEventListener("onModalOpen", function modalOpen() {
        closeModal("#modal8");
        try {
            // code when modal is opened
            savedBlockPreview.renderConfig(blockConfig, false, true);
            savedBlockPreview.startRotating(true);
            savedBlockPreview.updateNameFormatting(blockConfig, true);

            $q("#saved-block-name").innerText = cleanString(blockConfig.generalOptions.inGameName);
            $q("#saved-block-comment").innerText = cleanString(blockConfig.generalOptions.blockLore);
        } catch {
            modal.removeEventListener("onModalOpen", modalOpen);
            return false;
        }

        modal.removeEventListener("onModalOpen", modalOpen);
    });

    modal.addEventListener("onModalClose", function modalClose() {
        // remove event listeners
        modal.removeEventListener("onModalClose", modalClose);
        $q("#generateCmdSavedBlock").removeEventListener("click", genBlockCmd);
        $q("#loadSavedBlock").removeEventListener("click", loadBlock);
        $q("#shareSavedBlock").removeEventListener("click", shareBlock);
        $q("#moveSavedBlockToTop").removeEventListener("click", moveIndexToTop);
        $q("#moveSavedBlockToBottom").removeEventListener("click", moveIndexToBottom);

        deleteButton.removeEventListener("click", deleteBlock);
        deleteButton.removeEventListener("mousedown", pressingDown);
        deleteButton.removeEventListener("mouseup", notPressingDown);
        deleteButton.removeEventListener("mouseleave", notPressingDown);
        deleteButton.removeEventListener("touchstart", pressingDown);
        deleteButton.removeEventListener("touchend", notPressingDown);

        try {
            // code when modal is closed here
            savedBlockPreview.renderConfig(blankBlock, false, true);
            savedBlockPreview.startRotating(false);
        } catch {
            modal.removeEventListener("onModalClose", modalClose);
            return false;
        }
    });

    openModal("#savedBlockModal");
}
SavedBlockMenu.prototype.deleteBlockFromIndex = function (arrayIndex) {
    // code to delete a block
    // remove index from array
    this.currentSavedBlocks.splice(arrayIndex, 1);

    this.removeShownBlocks();

    // render all blocks in saved block menu again
    this.renderAllBlocks();

    this.saveBlocksToLocalStorage();
};
SavedBlockMenu.prototype.removeShownBlocks = function () {
    // remove html elements
    while (this.savedHolder.firstChild) {
        this.savedHolder.removeChild(this.savedHolder.lastChild);
    }
};
SavedBlockMenu.prototype.loadBlock = function (blockData64String, previewToRenderTo, updateMainBlock) {
    let blockURLstring = convertBase64StringToURL(blockData64String);
    let blockConfigObject = new BlockConfig({
        generateDefaults: false,
        upgradeURLString: true,
        URLString: blockURLstring,
    });

    // copy converted block data string into mainBlock and render it onto finalPreview
    if (updateMainBlock == true) {
        mainBlock.copyConfig(blockConfigObject);
    }
    previewToRenderTo.renderConfig(blockConfigObject, true, true);
};
SavedBlockMenu.prototype.glowSavedItem = function (index) {
    this.savedHolder.bd_newIndex = index;
    this.savedHolder.addEventListener("bd:savedMenuRedraw", glowElement);
};
function glowElement(e) {
    // run when new block is added to the list
    let index = e.target.bd_newIndex;
    let newElm = e.target.children[index];

    e.target.removeEventListener("bd:savedMenuRedraw", glowElement);

    newElm.classList.add("glowingElement");

    let newLabel = document.createElement("span");
    newLabel.classList.add("newBlockLabel");
    newLabel.appendChild(document.createTextNode("New!"));

    newElm.appendChild(newLabel);
}

SavedBlockMenu.prototype.flashSavedItem = function (index) {
    flashElement(this.savedHolder, index);
};

function flashElement(e, index) {
    // run when new block is added to the list
    let newElm = e.children[index];

    console.log(index);
    e.removeEventListener("bd:savedMenuRedraw", glowElement);

    newElm.classList.add("glowingElement");

    newElm.addEventListener("mouseenter", function remove() {
        this.classList.remove("glowingElement");
        this.removeEventListener("mouseover", remove);
    });
}

SavedBlockMenu.prototype.addBlock = function (base64stringToAdd, shouldSaveBlocks, isAlreadyURL, addToTop, newItemGlow) {
    // accepts a base64 block string (not a full url just the block data)
    // adds a block to the saved blocks array in this object
    let encodedURL = base64stringToAdd;
    if (isAlreadyURL != true) {
        let blockUrl = blockShareShortURL + "?b0=4&b1=" + base64stringToAdd;
        encodedURL = encodeURIComponent(blockUrl);
    }

    let addedToIndex = 0;

    if (addToTop == true) {
        this.currentSavedBlocks.unshift(encodedURL);
        addedToIndex = 0;
    } else {
        this.currentSavedBlocks.push(encodedURL);
        addedToIndex = this.currentSavedBlocks.length - 1;
    }

    if (newItemGlow == true) {
        this.glowSavedItem(addedToIndex);
    }

    if (shouldSaveBlocks != false) {
        this.saveBlocksToLocalStorage();
    }
};
function moveIndexToTop(e) {
    let index = e.target.getAttribute("data-array-index-to-move-up");
    index = parseInt(index);
    let indexValue = savedBlockMenu.currentSavedBlocks[index];

    savedBlockMenu.currentSavedBlocks.splice(index, 1);
    savedBlockMenu.currentSavedBlocks.unshift(indexValue);

    savedBlockMenu.removeShownBlocks();
    // render all blocks in saved block menu again
    savedBlockMenu.renderAllBlocks();
    savedBlockMenu.saveBlocksToLocalStorage();

    closeModal("#savedBlockModal");
    openModal("#modal8");

    savedBlockMenu.flashSavedItem(0);
    savedBlockMenu.savedHolder.parentNode.parentNode.scrollTop = 0;
}
function moveIndexToBottom(e) {
    let index = e.target.getAttribute("data-array-index-to-move-down");
    index = parseInt(index);
    let indexValue = savedBlockMenu.currentSavedBlocks[index];

    savedBlockMenu.currentSavedBlocks.splice(index, 1);
    savedBlockMenu.currentSavedBlocks.push(indexValue);

    setTimeout(() => {
        savedBlockMenu.removeShownBlocks();
        // render all blocks in saved block menu again
        savedBlockMenu.renderAllBlocks();
        savedBlockMenu.saveBlocksToLocalStorage();
    }, 10);
    setTimeout(() => {
        savedBlockMenu.flashSavedItem(savedBlockMenu.currentSavedBlocks.length - 1);
    }, 100);

    closeModal("#savedBlockModal");
    openModal("#modal8");

    savedBlockMenu.savedHolder.parentNode.parentNode.scrollTop = savedBlockMenu.savedHolder.parentNode.parentNode.scrollHeight;
}

let savedMenuRedrawEvent = new Event("bd:savedMenuRedraw");
SavedBlockMenu.prototype.renderAllBlocks = function () {
    // loops through all saved blocks and creates html for them
    for (let i = 0; i < this.currentSavedBlocks.length; i++) {
        this.renderBlock(this.currentSavedBlocks[i], i);
    }
    this.savedHolder.dispatchEvent(savedMenuRedrawEvent);
};
SavedBlockMenu.prototype.stringifySavedBlocks = function () {
    let stringedBlockArray = JSON.stringify(this.currentSavedBlocks);

    return stringedBlockArray;
};
SavedBlockMenu.prototype.saveBlocksToLocalStorage = function () {
    let dataToSave = this.stringifySavedBlocks();

    localStorage.setItem("blockData", dataToSave);
};
SavedBlockMenu.prototype.loadBlocksFromLocalStorage = function () {
    let stringedArray = localStorage.getItem("blockData");
    let unstringedArray = JSON.parse(stringedArray);
    if (stringedArray != null) {
        for (let i = 0; i < unstringedArray.length; i++) {
            // decode saved URL
            let decodedURL = decodeURIComponent(unstringedArray[i]);
            // get block data from URL
            let URLparams = new URL(decodedURL);
            let blockData = URLparams.searchParams.get("b1");
            // add block to saved blocks array
            this.addBlock(blockData, true);
        }
    }
    this.saveBlocksToLocalStorage();
};

function deleteCookie(cname, cvalue, exdays) {
    let expires = ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie = cname + "=;" + expires + ";path=/; SameSite=None; Secure";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = document.cookie;
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function getDecodedCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

SavedBlockMenu.prototype.upgradeOldSavedBlocks = function () {
    let blocksCookie = getCookie("blockData");

    if (blocksCookie != "") {
        blocksCookie = JSON.parse(blocksCookie);

        for (let i = 0; i < blocksCookie.length; i++) {
            // convert an old saved block string into a v4 base64 string
            blocksCookie[i] = upgradeBlockData(blocksCookie[i]);

            this.addBlock(blocksCookie[i], false);
            deleteCookie("blockData");
        }
    }
};

function upgradeBlockData(dataToUpgrade) {
    let tempBlockConfig = new BlockConfig({
        generateDefaultOptions: true,
    });

    let dataDecoded = decodeURIComponent(dataToUpgrade);
    let dataArray = JSON.parse("[" + dataDecoded + "]");

    dataArray[2] = stringToBool(dataArray[2]);
    dataArray[5] = stringToBool(dataArray[5]);
    dataArray[8] = stringToBool(dataArray[8]);

    dataArray[10] = stringToBool(dataArray[10]);
    dataArray[11] = stringToBool(dataArray[11]);
    dataArray[12] = stringToBool(dataArray[12]);
    dataArray[13] = stringToBool(dataArray[13]);

    // turn block colour into a string
    dataArray[15] = "" + dataArray[15];
    if (dataArray[15].includes("#") != true) {
        // get hex colour from block colour id
        dataArray[15] = colourIDMappings.get(dataArray[15]);
    }

    tempBlockConfig.layers = {
        layer1: {
            textureID: textureIdMap.get(dataArray[1]),
            colour: dataArray[3],
            hasGlint: dataArray[2],
        },
        layer2: {
            textureID: textureIdMap.get(dataArray[4]),
            colour: dataArray[6],
            hasGlint: dataArray[5],
        },
        layer3: {
            textureID: textureIdMap.get(dataArray[7]),
            colour: dataArray[9],
            hasGlint: dataArray[8],
        },
    };
    tempBlockConfig.generalOptions = {
        inGameName: dataArray[16].substring(0, maxBlocknameLength),
        nameFormatting: {
            bold: dataArray[10],
            italic: dataArray[11],
            strike: dataArray[12],
            underline: dataArray[13],
            colour: dataArray[15],
        },
        blockLore: dataArray[18].substring(0, maxBlockloreLength),
        blockEngineVersion: fullVersion,
    };

    let newBlockData = tempBlockConfig.toBlockString();
    tempBlockConfig = null;

    return newBlockData;
}
function stringToBool(string) {
    if (typeof string == Boolean) {
        return string;
    } else {
        if (string === "true") {
            return true;
        } else {
            return false;
        }
    }
}

SavedBlockMenu.prototype.loadAndRenderAllBlocks = function () {
    this.upgradeOldSavedBlocks();
    this.loadBlocksFromLocalStorage();
    this.renderAllBlocks();
};

$q("#downloadSavedBlocksTextFile").addEventListener("click", function (e) {
    if (e.target.getAttribute("data-should-run") != "false") {
        savedBlockMenu.exportTextFile();
    }
});
$q("#importSavedBlocksFromTextFile").addEventListener("change", function () {
    savedBlockMenu.importFromTextFile(this);
});

SavedBlockMenu.prototype.importFromTextFile = function (elm) {
    try {
        const fileList = elm.files;
        let that = this;
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
            try {
                let fileContents = event.target.result;

                fileContents = decodeURIComponent(fileContents);

                fileContents = fileContents.split(",");

                let fileContentsText = atob(fileContents[1]);
                let fileContentsParsed = JSON.parse(fileContentsText);
                let blockLinksArray = atob(fileContentsParsed.blockData);
                blockLinksArray = JSON.parse(blockLinksArray);

                // loop through blockLinksArray backwards
                for (var i = blockLinksArray.length - 1; i >= 0; i--) {
                    that.addBlock(blockLinksArray[i], true, true, true);
                }
                that.removeShownBlocks();
                that.renderAllBlocks();
                closeModal("#importBlocksModal");
                openModal("#modal8");

                that = undefined;
            } catch (e) {
                closeModal("#importBlocksModal");
                blockPreviewTitle.showError("An error occured while trying to render blocks.", "Unable to import blocks from Text File");
                that = null;
            }
        });
        reader.readAsDataURL(fileList[0]);
    } catch (e) {
        closeModal("#importBlocksModal");
        blockPreviewTitle.showError("Couldn't read the file(" + e + ")", "Unable to import blocks from Text File");
    }
};

SavedBlockMenu.prototype.exportTextFile = function () {
    let blockdata = this.stringifySavedBlocks();

    let normalHead = "Saved Blocks backup Text File for (https://enchanted.games/generator/blockdesigner)";
    let base64blockdata = btoa(blockdata);

    let dataObject = {
        __comment: normalHead,
        blockData: base64blockdata,
    };

    download(JSON.stringify(dataObject), "blockdesigner_savedblocks.txt", "text/plain");
};

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob)
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else {
        try {
            // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        } catch {
            let contentHolder = document.createElement("div");
            contentHolder.classList.add("content-holder");
            let textarea = document.createElement("textarea");
            textarea.classList.add("modal-area");
            textarea.setAttribute("spellcheck", false);
            textarea.setAttribute("onfocus", "this.select();");
            let info = document.createElement("p");
            info.classList.add("modal-text");
            let infoText = document.createTextNode("Please copy the text below into a .txt file");
            info.appendChild(infoText);

            textarea.value = data;

            contentHolder.appendChild(info);
            contentHolder.appendChild(textarea);
            $q("#downloadSavedBlocksTextFile").parentNode.parentNode.appendChild(contentHolder);

            $q("#downloadSavedBlocksTextFile").setAttribute("data-should-run", "false");

            $q("#exportBlocksModal").addEventListener("onModalClose", function removeTextArea() {
                contentHolder.remove();
                $q("#downloadSavedBlocksTextFile").setAttribute("data-should-run", "true");

                $q("#exportBlocksModal").removeEventListener("onModalClose", removeTextArea);
            });
        }
    }
}
