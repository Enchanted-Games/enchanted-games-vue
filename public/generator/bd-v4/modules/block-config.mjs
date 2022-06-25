import { cleanString } from "../main.mjs";
import { textureCollection } from "./texture.mjs";
import { versionInfo, fullVersion, blockShareShortURL } from "/generator/bd-v4/modules/metadata.mjs";
import { boolMap, textureIdMap, colourIDMappings, colourNameMappings, blockNumericIDMappingsL1, blockNumericIDMappingsL2, blockNumericIDMappingsL3 } from "/generator/bd-v4/modules/upgrade-mappings.mjs";
export { BlockConfig, maxBlocknameLength, maxBlockloreLength, blockPreviewTitle };

class BlockConfig {
    constructor(settingsObject) {
        // generate a default block if there is no URL string to upgrade
        if (settingsObject.generateDefaultOptions) {
            this.generateDefaults();
        }
        // load block data from a url into BlockConfig object
        if (settingsObject.upgradeURLString) {
            this.upgradeURLString(settingsObject.URLString);
        }
    }
}

// sets max length the block name and lore strings can be
// also used in saved-blocks-menu
let maxBlocknameLength = 75;
let maxBlockloreLength = 150;

let blockPreviewTitle = {
    element: $q("#preview-error"),
    originalText: "Preview",
    timeout: null,
    showError: function (errorToShow, customErrorText) {
        this.timeout = clearTimeout(this.timeout);
        this.timeout = null;
        this.element.innerHTML = this.originalText;
        errorToShow = cleanString(errorToShow, false);
        let errorText = "Error while trying to load block.";
        if (customErrorText != undefined) {
            errorText = customErrorText;
        }

        this.element.innerHTML += `<br> <span class="red-error-text" id="finalPreviewErrorText">${errorText}<br> ${errorToShow}</span>`;
        console.error(errorText + "\n", errorToShow);
        this.timeout = setTimeout(() => {
            this.element.innerHTML = this.originalText;
        }, 15000);
    },
    removeError: function () {
        this.timeout = clearTimeout(this.timeout);
        this.timeout = null;
        this.element.innerHTML = this.originalText;
    },
};

async function shrinkURL(urlToShrink) {
    return urlToShrink;
}

BlockConfig.prototype.toBlockString = function () {
    let smallBlockObject = [
        this.generalOptions.blockEngineVersion, //

        this.layers.layer1.textureID,
        this.layers.layer1.colour,
        this.layers.layer1.hasGlint,

        this.layers.layer2.textureID,
        this.layers.layer2.colour,
        this.layers.layer2.hasGlint,

        this.layers.layer3.textureID,
        this.layers.layer3.colour,
        this.layers.layer3.hasGlint,

        cleanString(this.generalOptions.inGameName),
        cleanString(this.generalOptions.blockLore),

        this.generalOptions.nameFormatting.bold,
        this.generalOptions.nameFormatting.italic,
        this.generalOptions.nameFormatting.strike,
        this.generalOptions.nameFormatting.underline,
        this.generalOptions.nameFormatting.colour,
    ];

    let JSONdata = JSON.stringify(smallBlockObject);
    let JSONdataBase64 = btoa(JSONdata);

    return JSONdataBase64;
};

BlockConfig.prototype.fromBlockString = function (blockStringFromURL) {
    // decode base64 string and parse into an array
    let blockStringArray = null;
    try {
        blockStringArray = atob(blockStringFromURL);
        blockStringArray = JSON.parse(blockStringArray);
    } catch (error) {
        blockPreviewTitle.showError(error);
        this.generateDefaults();
        return false;
    }

    if (blockStringArray[11] == false) {
        blockStringArray[11] = "";
    }

    this.layers = {
        layer1: {
            textureID: blockStringArray[1],
            colour: blockStringArray[2],
            hasGlint: blockStringArray[3],
        },
        layer2: {
            textureID: blockStringArray[4],
            colour: blockStringArray[5],
            hasGlint: blockStringArray[6],
        },
        layer3: {
            textureID: blockStringArray[7],
            colour: blockStringArray[8],
            hasGlint: blockStringArray[9],
        },
    };
    this.generalOptions = {
        inGameName: blockStringArray[10].substring(0, maxBlocknameLength),
        nameFormatting: {
            bold: blockStringArray[12],
            italic: blockStringArray[13],
            strike: blockStringArray[14],
            underline: blockStringArray[15],
            colour: blockStringArray[16],
        },
        blockLore: blockStringArray[11].substring(0, maxBlockloreLength),
        blockEngineVersion: blockStringArray[0],
    };
};

BlockConfig.prototype.generateDefaults = function () {
    this.layers = {
        layer1: {
            textureID: "empty",
            colour: "#FF7E7E",
            hasGlint: false,
        },
        layer2: {
            textureID: "empty",
            colour: "#7EFF7E",
            hasGlint: false,
        },
        layer3: {
            textureID: "empty",
            colour: "#7E7EFF",
            hasGlint: false,
        },
    };
    this.generalOptions = {
        inGameName: "Custom Block",
        nameFormatting: {
            bold: false,
            italic: false,
            strike: false,
            underline: false,
            colour: "#ffffff",
        },
        blockLore: "",
        blockEngineVersion: fullVersion,
    };
};

BlockConfig.prototype.upgradeURLString = function (URLString) {
    let URLparams = new URL(URLString);
    let blockVer = URLparams.searchParams.get("b0");
    // ["v2", layer1id, glint1active, layer1colour, layer2id, glint2active, layer2colour, layer3id, glint3active, layer3colour, nameStyleBold, nameStyleItalic, nameStyleStrike, nameStyleUnderline, nameColourFormat, nameFinalColour, blockIngameName, blockSaveName, blockSaveComment];

    if (blockVer == 4) {
        this.fromBlockString(URLparams.searchParams.get("b1"));
    } else if (blockVer == "3") {
        let blockData = undefined;
        try {
            // decode base64 block data and convert to an array
            blockData = atob(URLparams.searchParams.get("b1"));
            blockData = blockData.replace(/"/g, "");
            blockData = blockData.split(",");
        } catch (error) {
            blockPreviewTitle.showError(error);
            this.generateDefaults();
            return false;
        }

        try {
            // turn string bools into real bools
            if (blockData[2] === "true") {
                blockData[2] = true;
            } else {
                blockData[2] = false;
            }
            if (blockData[5] === "true") {
                blockData[5] = true;
            } else {
                blockData[5] = false;
            }
            if (blockData[8] === "true") {
                blockData[8] = true;
            } else {
                blockData[8] = false;
            }
            if (blockData[10] === "true") {
                blockData[10] = true;
            } else {
                blockData[10] = false;
            }
            if (blockData[11] === "true") {
                blockData[11] = true;
            } else {
                blockData[11] = false;
            }
            if (blockData[12] === "true") {
                blockData[12] = true;
            } else {
                blockData[12] = false;
            }
            if (blockData[13] === "true") {
                blockData[13] = true;
            } else {
                blockData[13] = false;
            }

            // if name colour is not a hex colour, get hex value from colourIDMappings
            if (blockData[15].includes("#") != true) {
                blockData[15] = colourIDMappings.get(blockData[15]);
            }
        } catch (error) {
            blockPreviewTitle.showError(error);
            this.generateDefaults();
            return false;
        }

        // set values inside object
        this.layers = {
            layer1: {
                textureID: textureIdMap.get(blockData[1]),
                colour: blockData[3],
                hasGlint: blockData[2],
            },
            layer2: {
                textureID: textureIdMap.get(blockData[4]),
                colour: blockData[6],
                hasGlint: blockData[5],
            },
            layer3: {
                textureID: textureIdMap.get(blockData[7]),
                colour: blockData[9],
                hasGlint: blockData[8],
            },
        };

        this.generalOptions = {
            inGameName: blockData[16].substring(0, maxBlocknameLength),
            nameFormatting: {
                bold: blockData[10],
                italic: blockData[11],
                strike: blockData[12],
                underline: blockData[13],
                colour: blockData[15],
            },
            blockLore: blockData[18].substring(0, maxBlockloreLength),
            blockEngineVersion: fullVersion,
        };
    } else if (blockVer == "2") {
        // decode base64 block data and convert to an array
        let blockData = URLparams.searchParams.get("b1");
        blockData = decodeURIComponent(blockData);
        blockData = blockData.replace(/"/g, "");
        blockData = blockData.split(",");

        try {
            // if name colour is not a hex colour, get hex value from colourIDMappings
            if (blockData[14].includes("#") != true) {
                blockData[14] = colourNameMappings.get(blockData[14]);
            }

            // set values inside object
            this.layers = {
                layer1: {
                    textureID: blockNumericIDMappingsL1.get(blockData[0]),
                    colour: blockData[1],
                    hasGlint: boolMap.get(blockData[6]),
                },
                layer2: {
                    textureID: blockNumericIDMappingsL2.get(blockData[2]),
                    colour: blockData[3],
                    hasGlint: boolMap.get(blockData[7]),
                },
                layer3: {
                    textureID: blockNumericIDMappingsL3.get(blockData[4]),
                    colour: blockData[5],
                    hasGlint: boolMap.get(blockData[8]),
                },
            };
            this.generalOptions = {
                inGameName: blockData[15].substring(0, maxBlocknameLength),
                nameFormatting: {
                    bold: boolMap.get(blockData[9]),
                    italic: boolMap.get(blockData[10]),
                    strike: boolMap.get(blockData[11]),
                    underline: boolMap.get(blockData[12]),
                    colour: blockData[14],
                },
                blockLore: "",
                blockEngineVersion: fullVersion,
            };
        } catch (e) {
            this.generateDefaults();
            blockPreviewTitle.showError(e);
        }
    } else if (blockVer == "1") {
        this.generateDefaults();
        blockPreviewTitle.showError('The block format "1" is currently unsupported, however it may be supported again in a future update.');
    } else {
        this.generateDefaults();
        blockPreviewTitle.showError("Block Data from URL didn't have a valid format version.");
    }
};

BlockConfig.prototype.generateShareableLink = function (openModal, modalToOpen) {
    // generates a full URL for the block

    let blockData64 = this.toBlockString();
    let shareLink = `${blockShareShortURL}?b0=${versionInfo.blockFormatVersion}&b1=${blockData64}`;

    if (openModal) {
        // code to fill in modal
        $q("#share-block-name").innerText = cleanString(this.generalOptions.inGameName);
        $q("#modal-share-area").value = shareLink;
        window.openModal(modalToOpen);
    }
};

BlockConfig.prototype.generateCommand = function (mcVersion, blockNameElement, textareaToUpdate) {
    // returns a command for the passed Minecraft version
    // mcVersion should be the lowest Minecraft version that supports the command format you want to generate

    let finalCommand = undefined;
    // put name of block below command version
    $q(blockNameElement).innerText = cleanString(this.generalOptions.inGameName);

    // values for command
    // get model data for layer1 textureID
    let layer1_modelData = textureCollection.getTexture(this.layers.layer1.textureID).modelData;
    // get hex colour and decimal colour for layer 1
    let layer1_colour = this.layers.layer1.colour;
    let layer1_colourDecimal = parseInt(layer1_colour.replace("#", "0x"));
    // glint string for layer 1
    let layer1_glintString = boolToGlintString(this.layers.layer1.hasGlint);

    // get model data for layer2 textureID
    let layer2_modelData = textureCollection.getTexture(this.layers.layer2.textureID).modelData;
    // get hex colour and decimal colour for layer 1
    let layer2_colour = this.layers.layer2.colour;
    let layer2_colourDecimal = parseInt(layer2_colour.replace("#", "0x"));
    // glint string for layer 1
    let layer2_glintString = boolToGlintString(this.layers.layer2.hasGlint);

    // get model data for layer3 textureID
    let layer3_modelData = textureCollection.getTexture(this.layers.layer3.textureID).modelData;
    // get hex colour and decimal colour for layer 1
    let layer3_colour = this.layers.layer3.colour;
    let layer3_colourDecimal = parseInt(layer3_colour.replace("#", "0x"));
    // glint string for layer 1
    let layer3_glintString = boolToGlintString(this.layers.layer3.hasGlint);

    let nameFormat_bold = `,"bold":${this.generalOptions.nameFormatting.bold}`;
    let nameFormat_italic = `,"italic":${this.generalOptions.nameFormatting.italic}`;
    let nameFormat_strike = `,"strikethrough":${this.generalOptions.nameFormatting.strike}`;
    let nameFormat_underline = `,"underlined":${this.generalOptions.nameFormatting.underline}`;
    let nameFormat_colour = `,"color":"${this.generalOptions.nameFormatting.colour}"`;
    let nameFormat_name = cleanString(this.generalOptions.inGameName);
    let nameFormat_lore = cleanString(this.generalOptions.blockLore);

    let loreString = "";
    if (nameFormat_lore !== "") {
        loreString = `,Lore:['{"text":"${nameFormat_lore}"}']`;
    }

    let layer1boots = "{}";
    if (this.layers.layer1.textureID !== "empty") {
        layer1boots = `{id:\\"minecraft:leather_boots\\",Count:1b,tag:{display:{color:${layer1_colourDecimal}},CustomModelData:${layer1_modelData}${layer1_glintString}}`;
    }
    let layer2boots = "{}";
    let layer3boots_seperatorComma = ",";
    if (this.layers.layer2.textureID !== "empty") {
        layer2boots = `{id:\\"minecraft:leather_boots\\",Count:1b,tag:{display:{color:${layer2_colourDecimal}},CustomModelData:${layer2_modelData}${layer2_glintString}}`;
    }
    let layer3boots = "{}";
    if (this.layers.layer3.textureID !== "empty") {
        layer3boots = `{id:\\"minecraft:leather_boots\\",Count:1b,tag:{display:{color:${layer3_colourDecimal}},CustomModelData:${layer3_modelData}${layer3_glintString}}`;
    }

    let layer1boots_normal_quote = "{}";
    if (this.layers.layer1.textureID !== "empty") {
        layer1boots_normal_quote = `{id:"minecraft:leather_boots",Count:1b,tag:{display:{color:${layer1_colourDecimal}},CustomModelData:${layer1_modelData}${layer1_glintString}}`;
    }
    let layer2boots_normal_quote = "{}";
    if (this.layers.layer2.textureID !== "empty") {
        layer2boots_normal_quote = `{id:"minecraft:leather_boots",Count:1b,tag:{display:{color:${layer2_colourDecimal}},CustomModelData:${layer2_modelData}${layer2_glintString}}`;
    }
    let layer3boots_normal_quote = "{}";
    if (this.layers.layer3.textureID !== "empty") {
        layer3boots_normal_quote = `{id:"minecraft:leather_boots",Count:1b,tag:{display:{color:${layer3_colourDecimal}},CustomModelData:${layer3_modelData}${layer3_glintString}}`;
    }

    if (mcVersion == "1.16") {
        $q("#command-note").innerText = "";
        // generate a command compatible with Minecraft 1.16 to 1.17.1
        finalCommand = `/give @p minecraft:command_block{display:{Name:'{\"text\":\"${nameFormat_name}\"${nameFormat_colour}${nameFormat_bold}${nameFormat_italic}${nameFormat_strike}${nameFormat_underline}}'${loreString}},BlockEntityTag:{Command:\"/setblock ~ ~ ~ minecraft:spawner{SpawnCount:0,SpawnRange:0,Delay:0,MaxNearbyEntities:0,RequiredPlayerRange:0,SpawnData:{id:\\"minecraft:armor_stand\\",Invisible:1b,Pose:{LeftArm:[30f,0f,0f],RightArm:[30f,0f,0f]},HandItems:[${layer2boots}${layer3boots_seperatorComma}${layer3boots}],ArmorItems:[{},{},{},${layer1boots}]}} replace\",auto:1b}} 1`;

        // set command version dropdown to mc version
        $q("#command-version").value = 1;

        //
    } else if (mcVersion == "1.14") {
        $q("#command-note").innerText = "Name Formatting is not yet fully supported for 1.14 to 1.15.2";
        // generate a command compatible with Minecraft 1.14 to 1.15.2
        finalCommand = `/give @p minecraft:command_block{display:{Name:'{\"text\":\"${nameFormat_name}\","color":"white"}${nameFormat_bold}${nameFormat_italic}${nameFormat_strike}${nameFormat_underline}}'${loreString}},BlockEntityTag:{Command:\"/setblock ~ ~ ~ minecraft:spawner{SpawnCount:0,SpawnRange:0,Delay:0,MaxNearbyEntities:0,RequiredPlayerRange:0,SpawnData:{id:\\"minecraft:armor_stand\\",Invisible:1b,Pose:{LeftArm:[30f,0f,0f],RightArm:[30f,0f,0f]},HandItems:[${layer2boots}${layer3boots_seperatorComma}${layer3boots}],ArmorItems:[{},{},{},${layer1boots}]}} replace\",auto:1b}} 1`;

        // set command version dropdown to mc version
        $q("#command-version").value = 2;

        //
    } else if (mcVersion == "1.18") {
        $q("#command-note").innerHTML = "If you are in 1.19 you must relog for your block to show correctly! <a class='general-link' href='https://bugs.mojang.com/browse/MC-252368' target='_blank'>MC-252368 on MC Bug Tracker</a>";
        // generate a command compatible with Minecraft 1.18 and above
        finalCommand = `/give @p minecraft:command_block{display:{Name:'{\"text\":\"${nameFormat_name}\"${nameFormat_colour}${nameFormat_bold}${nameFormat_italic}${nameFormat_strike}${nameFormat_underline}}'${loreString}},BlockEntityTag:{Command:\"/setblock ~ ~ ~ minecraft:spawner{SpawnCount:0,SpawnRange:0,Delay:0,MaxNearbyEntities:0,RequiredPlayerRange:0,SpawnData:{entity:{id:\\"minecraft:armor_stand\\",Invisible:1b,Pose:{LeftArm:[30f,0f,0f],RightArm:[30f,0f,0f]},HandItems:[${layer2boots}${layer3boots_seperatorComma}${layer3boots}],ArmorItems:[{},{},{},${layer1boots}]}}} replace\",auto:1b}} 1`;

        // set command version dropdown to mc version
        $q("#command-version").value = 0;

        //
    } else {
        console.error("Invalid Minecraft version (" + mcVersion + ")");
        return false;
    }

    $q(textareaToUpdate).value = finalCommand;
    openModal("#commandmodal");
};

function boolToGlintString(bool) {
    // returns enchantment data for Minecraft command
    if (bool == true) {
        return ',Enchantments:[{id:\\"protection\\",lvl:1s}]}';
    } else {
        return "}";
    }
}

BlockConfig.prototype.copyConfig = function (configToCopy) {
    // converst passed BlockConfig to a blockstring then applies it to this BlockConfig
    this.fromBlockString(configToCopy.toBlockString());
};
