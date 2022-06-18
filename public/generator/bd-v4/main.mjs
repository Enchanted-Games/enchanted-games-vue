import { BlockRenderer } from "/generator/bd-v4/modules/block-renderer.mjs";
import { BlockImporter } from "/generator/bd-v4/modules/block-importing.mjs";
import { createTextures } from "/generator/bd-v4/modules/texture-reg.mjs";
import { BlockConfig, blockPreviewTitle } from "/generator/bd-v4/modules/block-config.mjs";
import { updateShownVersion, updateResourcepackLink, checkForNewVersion, checkForCachedModal } from "/generator/bd-v4/modules/metadata.mjs";
import { SavedBlockMenu } from "/generator/bd-v4/modules/saved-blocks-menu.mjs";
import { copyTextToClipboard } from "/generator/lib/copy-text.mjs";
import "/generator/bd-v4/modules/random-block.mjs";
export { finalPreview, cleanString, blankBlock, mainBlock };

var $e = document.getElementById.bind(document);
var $c = document.getElementsByClassName.bind(document);
var $q = document.querySelector.bind(document);
var $a = document.querySelectorAll.bind(document);

// Modals
let onModalOpen = new Event("onModalOpen");
let onModalClose = new Event("onModalClose");
window.closeModal = function (modal) {
    // CLOSE A MODAL ("#MODALID")
    $q(modal).style.display = "none";

    if (modal == "#editblockmodal") {
        setTimeout(() => {
            editMenuPreview.renderConfig(blankBlock, false);
        }, 10);
    }

    $q(modal).dispatchEvent(onModalClose);

    finalPreview.showBlock(true);

    sessionStorage.removeItem("cachedModalID");
};
window.openModal = function (modal) {
    // OPEN A MODAL ("#MODALID")
    $q(modal).style.display = "block";

    // if (modal == "#editblockmodal") {
    //     setTimeout(() => {
    //         editMenuPreview.renderConfig(blankBlock, false)
    //     }, 10);
    // }

    $q(modal).dispatchEvent(onModalOpen);

    finalPreview.showBlock(false);

    sessionStorage.setItem("cachedModalID", modal);
};

// set defaults for jscolor inputs
jscolor.presets.default = {
    format: "hex",
    previewSize: 25,
    backgroundColor: "rgba(94,97,104,1)",
    borderColor: "rgba(69,71,77,1)",
    borderWidth: 2,
    borderRadius: 0,
    padding: 10,
    width: 170,
    height: 100,
    buttonColor: "rgba(255,0,0,1)",
    controlBorderColor: "rgba(69,71,77,1)",
    crossSize: 6,
    pointerColor: "rgba(0,0,0,1)",
    shadowColor: "rgba(0,0,0,0.16)",
};
jscolor.install();

// const loadingScreen = new LoadingScreen({
//     background: $q(".loading-screen"),
//     title: $q("#loading-header"),
//     text: $q("#loading-text"),
//     bar: $q(".loading-progress"),
//     prefix: "Loading",
//     seperator: ": ",
//     status: "HTML and Scripts",
// });

window.savedBlockMenu = new SavedBlockMenu({
    savedHolder: ".saved-holder",
});

const blankBlock = new BlockConfig({
    generateDefaultOptions: true,
});
let finalPreview = new BlockRenderer({
    parent: $q(".final-preview-left"),
    renderSmaller: false,
    canvasResolution: 112,
    colourInputs: {
        layer1: "#colour-picker-layer1",
        layer2: "#colour-picker-layer2",
        layer3: "#colour-picker-layer3",
    },
    glintInputs: {
        layer1: "#glint1",
        layer2: "#glint2",
        layer3: "#glint3",
    },
    nameFormatInputs: {
        bold: "#name-bold",
        italic: "#name-italic",
        strike: "#name-strike",
        underline: "#name-underline",
        name: "#name-final-input",
        lore: "#blockLore-final-input",
        blockNameColour: "#colour-picker-blockName",
    },
});
finalPreview.create();

let contextMenuOffsetX = 25;
let contextMenuOffsetY = 25;
try {
    finalPreview.parent.oncontextmenu = (e) => {
        e.preventDefault();
        let menu = document.createElement("div");
        menu.className = "general-contextmenu";
        menu.id = "finalPreviewContextmenu";
        menu.style = `top:${e.clientY - contextMenuOffsetY}px;left:${e.clientX - contextMenuOffsetX}px`;
        menu.oncontextmenu = (e) => e.preventDefault();
        menu.onmouseleave = () => (finalPreviewContextmenu.outerHTML = "");
        menu.onclick = () => (finalPreviewContextmenu.outerHTML = "");
        menu.innerHTML = `
        <p onclick="setLayerTo(1)">Edit Layer 1</p>
        <p onclick="setLayerTo(2)">Edit Layer 2</p>
        <p onclick="setLayerTo(3)">Edit Layer 3</p>
        <p onclick="setLayerTo(4)">Edit Name Formatting</p>
        <div></div>
        <p onclick='toggleAllGlints(true)'>Enable All Glints</p>
        <p onclick='toggleAllGlints(false)'>Disable All Glints</p>
        <div></div>
        <p onclick='contextMenuGenerate("saveBlock")'>Save Block</p>
        <p onclick='contextMenuGenerate("command")'>Generate Command</p>
        <p onclick='contextMenuGenerate("link")'>Share Block</p>
        <div></div>
        <p onclick='contextMenuGenerate("deleteBlock")'>Reset Block</p>
        `;
        document.body.appendChild(menu);
    };
} catch (error) {
    console.error(error);
}

window.toggleAllGlints = function (toggle) {
    if (toggle == true) {
        mainBlock.layers.layer1.hasGlint = true;
        mainBlock.layers.layer2.hasGlint = true;
        mainBlock.layers.layer3.hasGlint = true;
    } else {
        mainBlock.layers.layer1.hasGlint = false;
        mainBlock.layers.layer2.hasGlint = false;
        mainBlock.layers.layer3.hasGlint = false;
    }
    finalPreview.renderConfig(mainBlock, true, true);
};
let shouldRun = false;
window.contextMenuGenerate = function (generateThis) {
    if (generateThis == "command") {
        mainBlock.generateCommand("1.18", "#command-block-name", "#modal-command-area");
    } else if (generateThis == "link") {
        mainBlock.generateShareableLink(true, "#sharemodal");
    } else if (generateThis == "saveBlock") {
        if (shouldRun == false) {
            $q("#savedBlocksMenuButton").removeEventListener("click", loadSavedBlocks);
            loadSavedBlocks();
        }

        savedBlockMenu.addBlock(mainBlock.toBlockString(), undefined, undefined, true);
        savedBlockMenu.glowSavedItem(0);

        savedBlockMenu.removeShownBlocks();
        savedBlockMenu.renderAllBlocks();
        openModal("#modal8");
    } else if (generateThis == "deleteBlock") {
        openModal("#confirmDeleteModal");
    }
};

window.sharedBlockPreview = new BlockRenderer({
    parent: $q("#shared-block-preview-container"),
    renderSmaller: true,
    canvasResolution: 56,
});
sharedBlockPreview.create();
window.savedBlockPreview = new BlockRenderer({
    parent: $q("#saved-block-preview-container"),
    renderSmaller: true,
    canvasResolution: 56,
});
savedBlockPreview.create();
let mainBlock = undefined;
checkURLForBlockData();
let blockImporter = new BlockImporter();

window.manageColourInput = function (elm) {
    // tints textures when colour input is changed
    let layer = elm.getAttribute("id");
    layer = layer.replace("colour-picker-", "");

    mainBlock.layers[layer].colour = elm.jscolor.toString();
    finalPreview.renderConfig(mainBlock, true);
};
window.manageGlintInput = function (elm) {
    // applies glints when glint input is changes
    let layer = elm.getAttribute("id");
    layer = layer.replace("glint", "");
    layer = "layer" + layer;

    mainBlock.layers[layer].hasGlint = elm.checked;
    finalPreview.renderConfig(mainBlock, true);

    layer = null;
};
window.manageNameFormatInput = function (elm) {
    // refreshes formatting for name
    let inputName = elm.getAttribute("id");
    if (inputName == "name-final-input") {
        // set name if changes
        elm.value = cleanString(elm.value, true, 75);
        mainBlock.generalOptions.inGameName = elm.value;
    } else if (inputName == "blockLore-final-input") {
        // set block lore if changes
        elm.value = cleanString(elm.value, true, 150);
        mainBlock.generalOptions.blockLore = elm.value;
    } else if (inputName == "colour-picker-blockName") {
        mainBlock.generalOptions.nameFormatting.colour = elm.jscolor.toString();
    } else {
        inputName = inputName.replace("name-", "");
        mainBlock.generalOptions.nameFormatting[inputName] = elm.checked;
    }

    finalPreview.renderConfig(mainBlock, true, false);

    inputName = null;
};
window.resetMainBlock = function () {
    mainBlock.copyConfig(blankBlock);
    finalPreview.renderConfig(mainBlock, true, true);
    closeModal("#confirmDeleteModal");
};

function cleanString(string, shouldShorten, shortenTo) {
    let cleanedString = string;
    // filter out less than and greater than signs
    // remove quotes
    try {
        cleanedString = string
            .replace(/</g, "")
            .replace(/>/g, "")
            .replace(/"/g, "")
            .replace(/'/g, "")
            .replace(/`/g, "")
            .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, "");
    } catch (error) {
        console.error(error);
        return string;
    }

    if (shortenTo == undefined || shortenTo == null) {
        shortenTo = 75;
    }

    if (shouldShorten) {
        if (cleanedString.split("").length >= shortenTo + 1) {
            console.warn(`WARN: String was longer than [${shortenTo}] characterss. It was shortened`);
        }
        cleanedString = cleanedString.substring(0, shortenTo);
    }

    return cleanedString;
}

function checkURLForBlockData() {
    var searchURL = window.location.href;
    var urlParams = new URL(searchURL);
    var blockFormatVersion = urlParams.searchParams.get("b0");

    if (blockFormatVersion != null || blockFormatVersion != undefined) {
        // if there is a block in URL
        mainBlock = new BlockConfig({
            generateDefaultOptions: false,
            upgradeURLString: true,
            URLString: searchURL,
        });
    } else {
        mainBlock = new BlockConfig({
            generateDefaultOptions: true,
        });
    }
}

updateShownVersion($q(".bd-version"));
updateResourcepackLink($q("#downloadResourcePackLinkButton"));

window.addEventListener("DOMContentLoaded", (event) => {
    createTextures();

    finalPreview.renderConfig(mainBlock, true);
    // loadingScreen.updateStatus("Done!");
    // setTimeout(() => {
    //     loadingScreen.hide();
    // }, 250);

    window.addEventListener("load", function () {
        // fix block disapearing when page fully loads
        finalPreview.renderConfig(mainBlock);
    });
});

let firstTimeLoadingSavedBlocks = true;
window.addEventListener("load", init());
function init() {
    checkForNewVersion("#modal13");
    checkForCachedModal();

    // preview controls
    $q("#mainPreviewRotLeft").addEventListener("click", function () {
        finalPreview.addRotation(0, -45, 0);
    });
    $q("#mainPreviewRotRight").addEventListener("click", function () {
        finalPreview.addRotation(0, 45, 0);
    });
    $q("#mainPreviewFlip").addEventListener("click", function () {
        finalPreview.addRotation(0, 0, 180);
    });
    $q("#mainPreviewResetRot").addEventListener("click", function () {
        finalPreview.resetRotation();
    });
    $q("#previewInfo").addEventListener("click", function () {
        openModal("#modal3");
    });
    $q("#savedBlocksMenuButton").addEventListener("click", loadSavedBlocks);

    $q(".genShareBtn").addEventListener("click", function () {
        mainBlock.generateShareableLink(true, "#sharemodal");
    });
    $q(".genCmdBtn").addEventListener("click", function () {
        mainBlock.generateCommand("1.18", "#command-block-name", "#modal-command-area");
    });

    $q("#saveCurrentBlockButton").addEventListener("click", function () {
        savedBlockMenu.addBlock(mainBlock.toBlockString(), undefined, undefined, true, true);
        savedBlockMenu.removeShownBlocks();
        savedBlockMenu.renderAllBlocks();
    });

    $q(".importBlockBtn").addEventListener("click", function () {
        openImportMenu();
    });

    $q("#exportSavedBlocksButton").addEventListener("click", function () {
        closeModal("#modal8");
        openModal("#importOrExportMenu");
    });

    $q("#whatsNew_openResourcePack").addEventListener("click", function () {
        closeModal("#modal13");
        openModal("#modal2");
        $q("#modal2").addEventListener("onModalClose", function openUpdate() {
            openModal("#modal13");
            this.removeEventListener("onModalClose", openUpdate);
        });
    });

    $q("#whatsNew_openPatchNotes").addEventListener("click", function () {
        closeModal("#modal13");
        openModal("#modalupdate2");
        $q("#modalupdate2").addEventListener("onModalClose", function openUpdate() {
            openModal("#modal13");
            this.removeEventListener("onModalClose", openUpdate);
        });
    });

    console.log("Written by Enchanted Games \n  https://youtube.com/c/EnchantedGames");
    console.log("Inspired by CodeCrafted \n  https://codecrafted.net/blockdesigner");
}

function loadSavedBlocks() {
    if (allTexturesLoaded == true && firstTimeLoadingSavedBlocks == true) {
        savedBlockMenu.loadAndRenderAllBlocks();
        firstTimeLoadingSavedBlocks = false;
        shouldRun = true;
    } else {
        return false;
    }
}

window.openImportMenu = function () {
    blockImporter.populateMenu("#importModal", {
        loadRandom: () => {
            let randomBlocksDropdown = $q("#import-random-block-dropdown");
            if (randomBlocksDropdown.value == 0) {
                let randomBlock = blockList1.getRandomBlock();

                mainBlock.copyConfig(randomBlock);
                finalPreview.renderConfig(mainBlock, true, true);

                randomBlock = null;
            } else {
                let randomBlock = blockList1.getTrulyRandomBlock();

                mainBlock.copyConfig(randomBlock);
                finalPreview.renderConfig(mainBlock, true, true);

                randomBlock = null;
            }
            closeModal("#importModal");
        },
        loadURL: () => {
            let URLtoImport = $q("#modal-import-area").value;
            let importedBlock = blockImporter.importFromURL(URLtoImport);

            if (typeof importedBlock == "object" && importedBlock[0] == false) {
                blockPreviewTitle.showError(importedBlock[1].message);
                closeModal("#importModal");
                return false;
            }
            mainBlock.copyConfig(importedBlock);
            finalPreview.renderConfig(importedBlock, true, true);
            blockPreviewTitle.removeError();

            closeModal("#importModal");
        },
        codeCrafted: () => {
            let URLtoConvert = $q("#modal-import-area").value;
            let importedBlock = blockImporter.importFromCodecrafted(URLtoConvert);

            if (typeof importedBlock == "object" && importedBlock[0] == false) {
                blockPreviewTitle.showError(importedBlock[1].message);
                closeModal("#importModal");
                return false;
            }
            mainBlock.copyConfig(importedBlock);
            finalPreview.renderConfig(importedBlock, true, true);
            blockPreviewTitle.removeError();

            closeModal("#importModal");
        },
    });
};

window.manageMCverCmd = function (elm) {
    let cmdVer = elm.selectedOptions[0];

    mainBlock.generateCommand(cmdVer.getAttribute("data-mc-version"), "#command-block-name", "#modal-command-area");
};

window.copyFromTextArea = function (textArea, modal) {
    copyTextToClipboard($q(textArea).value);
    setTimeout(() => {
        closeModal(modal);
    }, 2500);
};

// Layer Switching
var currentSelLayer = 1;
window.layerSwitch = function (elm) {
    if (elm.getAttribute("class").includes("increasearrow")) {
        if (currentSelLayer == 4) {
            currentSelLayer = 1;
        } else {
            currentSelLayer = currentSelLayer + 1;
        }
        layerChange();
    } else if (elm.getAttribute("class").includes("decreasearrow")) {
        if (currentSelLayer == 1) {
            currentSelLayer = 4;
        } else {
            currentSelLayer = currentSelLayer - 1;
        }
        layerChange();
    } else {
        return false;
    }
};
window.setLayerTo = function (layer) {
    currentSelLayer = layer;
    layerChange();
};
window.layerChange = function () {
    $q("#layer1options").setAttribute("class", "hidden");
    $q("#layer2options").setAttribute("class", "hidden");
    $q("#layer3options").setAttribute("class", "hidden");
    $q("#blockoptions").setAttribute("class", "hidden");
    $q("#overallBlockoptions").setAttribute("class", "hidden");

    if (currentSelLayer == 1 || currentSelLayer == 2 || currentSelLayer == 3) {
        $q(`#layer${currentSelLayer}options`).setAttribute("class", "");
        $q("#layerselectiontitle").innerText = "Layer " + currentSelLayer;
    } else if (currentSelLayer == 4) {
        $q("#blockoptions").setAttribute("class", "");
        $q("#layerselectiontitle").innerText = "Name Formatting";
    } else if (currentSelLayer == 5) {
        $q("#overallBlockoptions").setAttribute("class", "");
        $q("#layerselectiontitle").innerText = "General Block Options";
    }
};

// TODO: shared a block screen
