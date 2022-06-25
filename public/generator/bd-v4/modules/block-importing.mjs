import { BlockConfig, blockPreviewTitle } from "./block-config.mjs";
import { codecraftedBlockUpgradeMap } from "/generator/bd-v4/modules/upgrade-mappings.mjs";
export { BlockImporter };

class BlockImporter {
    constructor(settingsObject) {}
}

let inputEvent = new Event("input");
BlockImporter.prototype.populateMenu = function (modalID, callbacks) {
    let modal = $q(modalID);
    let dropdown = $q("#import-mode-dropdown");
    let importButton = $q("#blockImportButton");

    dropdown.value = 0;
    dropdown.addEventListener("input", manageImportMode);
    dropdown.dispatchEvent(inputEvent);
    importButton.importCallbacks = callbacks;
    importButton.addEventListener("click", importBlock);

    modal.addEventListener("onModalClose", function modalClosed() {
        dropdown.removeEventListener("input", manageImportMode);
        importButton.removeEventListener("click", importBlock);
        importButton.importCallbacks = null;
        modal.removeEventListener("onModalClose", modalClosed);
    });

    openModal(modalID);
};

// runs when import mode dropdown changed
window.manageImportMode = function (e) {
    $q("#modal-import-area").value = "";
    $q("#import-note").innerHTML = ``;

    if (e.target.value == 0) {
        $q("#importMenu-pasteURL").style.display = "none";
        $q("#importMenu-randomList").style.display = "block";
    } else if (e.target.value == 1) {
        $q("#importMenu-pasteURL").style.display = "block";
        $q("#importMenu-randomList").style.display = "none";
        // code for import from blockdesigner URL
        $q("#import-note").innerHTML = `This must be a valid Shared Block Link. This the link you get when clicking "Share Block".<br>`;
    } else if (e.target.value == 2) {
        $q("#importMenu-pasteURL").style.display = "block";
        $q("#importMenu-randomList").style.display = "none";
        // code for import from codecrafted URL
        $q("#import-note").innerHTML = `This must be a Shared Block Link from <a class="general-link" target="_blank" href="https://codecrafted.net/blockdesigner">CodeCrafteds Block Designer</a>. You can get the block link by clicking "Share Block" in the top left.<br>This feature is experimental so blocks may not look exactly the same when converted.<br>`;
    }
};

window.importBlock = function (e) {
    // runs when "import block" button is pressed
    let dropdown = $q("#import-mode-dropdown");
    if (dropdown.value == 0) {
        this.importCallbacks.loadRandom();
    } else if (dropdown.value == 1) {
        this.importCallbacks.loadURL();
    } else if (dropdown.value == 2) {
        this.importCallbacks.codeCrafted();
    }
};

BlockImporter.prototype.importFromCommand = function (command) {
    return command;
};
BlockImporter.prototype.importFromURL = function (URLString) {
    let upgradedBlockConfig = new BlockConfig({
        generateDefaultOptions: false,
        upgradeURLString: true,
        URLString: URLString,
    });

    return upgradedBlockConfig;
};
BlockImporter.prototype.importFromCodecrafted = function (codeCraftedURL) {
    let upgradedBlockConfig = new BlockConfig({
        generateDefaultOptions: true,
        upgradeURLString: false,
    });
    try {
        let URLparams = new URL(codeCraftedURL);
        let URLhash = URLparams.hash;
        URLhash = URLhash.replace("#", "");
        let URLhashDecode = atob(URLhash);
        let blockDataParsed = JSON.parse(URLhashDecode);

        for (let i = 0; i < blockDataParsed.length; i++) {
            // stringify array of image links
            blockDataParsed[i]["1"] = JSON.stringify(blockDataParsed[i]["1"]);
            // get corresponding textureID for image links array
            blockDataParsed[i]["1"] = codecraftedBlockUpgradeMap.get(blockDataParsed[i]["1"]);
            if (blockDataParsed[i]["1"] == undefined || blockDataParsed[i]["1"] == null) {
                // if no texture upgrade was found set it to empty
                blockDataParsed[i]["1"] = "empty";
            }

            let glint = blockDataParsed[i].glint;
            if (glint == undefined || glint == null) {
                // if there is no glint key in the block data set it to false
                blockDataParsed[i].glint = false;
            }
        }

        upgradedBlockConfig.layers = {
            layer1: {
                textureID: blockDataParsed[0]["1"],
                colour: blockDataParsed[0]["0"],
                hasGlint: blockDataParsed[0]["glint"],
            },
            layer2: {
                textureID: blockDataParsed[1]["1"],
                colour: blockDataParsed[1]["0"],
                hasGlint: blockDataParsed[1]["glint"],
            },
            layer3: {
                textureID: blockDataParsed[2]["1"],
                colour: blockDataParsed[2]["0"],
                hasGlint: blockDataParsed[2]["glint"],
            },
        };
        upgradedBlockConfig.generalOptions.inGameName = "Custom Block";
        upgradedBlockConfig.generalOptions.blockLore = "Block was converted from CodeCrafteds Block Designer";
    } catch (e) {
        return [false, e];
    }

    return upgradedBlockConfig;
};
