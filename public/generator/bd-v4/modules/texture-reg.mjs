import { Texture } from "/generator/bd-v4/modules/texture.mjs";
import { finalPreview } from "/generator/bd-v4/main.mjs";
import { textureCollection } from "./texture.mjs";
export { createTextures };

let layer1textures = $q("#layer1textures");
let layer2textures = $q("#layer2textures");
let layer3textures = $q("#layer3textures");

// any textures must be registered here
// textures must have a textureID, displayImage (url), renderingMode (see below), images (object), modelData (in game model data) and title
// renderingModes (capitalisation is ignored) :
//      "all" - Renders one image on the whole of the block.
//              must have one value in the images object named "all"
//      "grassLike" - one texture on top with a second on all other sides. Bottom is empty
//                  must have one value called "sides" and one called "top"
//      "logLike" - one texture on top one texture on the bottom with a third on all other sides.
//                  must have one value called "sides" one called "top" and one called "bottom"
//      "specific" - each face can be specified individually
//                  must have six values "north", "east", "south", "west", "top" and "bottom"
//
// (more presets can be added in texture.mjs, document it here)

// const exampleTexture = new Texture({
//     textureID: "exampleTexture",
//     displayImage: "/images/blockdesigner/l1/clay.png",
//     renderingMode: "all",
//     images: {
//         all: "/images/blockdesigner/li/clay.png",
//     },
//     modelData: 1,
//     blockTitle: "Example Title",
//     blockLore: "If not specified, will be ignored",
// });
// exampleTexture.createClickableTexture(layer1textures, finalPreview);

function createTextures() {
    let eTexArray = [];

    const emptyTexture = new Texture({
        blockTitle: "Remove Texture",
        blockLore: "The colour and enchant glint for this layer will still be saved",
        textureID: "empty",
        displayImage: "/images/blockdesigner/2xbin.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/empty.png",
        },
        modelData: 1,
        compatibleWithLayer1: true,
    });
    emptyTexture.createClickableTexture(layer1textures, finalPreview);
    emptyTexture.createClickableTexture(layer2textures, finalPreview);
    emptyTexture.createClickableTexture(layer3textures, finalPreview);

    // layer 1
    const lapisBlockTexture = new Texture({
        blockTitle: "Lapis Lazuli",
        textureID: "lapisBlock",
        displayImage: "/images/blockdesigner/blocks/lapisblock.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/lapisblock.png",
        },
        modelData: 42,
        compatibleWithLayer1: true,
    });
    lapisBlockTexture.createClickableTexture(layer1textures, finalPreview);

    const diamondBlockTexture = new Texture({
        blockTitle: "Diamond Block",
        textureID: "diamondBlock",
        displayImage: "/images/blockdesigner/blocks/diamondblock.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/diamondblock.png",
        },
        modelData: 3,
        compatibleWithLayer1: true,
    });
    diamondBlockTexture.createClickableTexture(layer1textures, finalPreview);

    const dirtTexture = new Texture({
        blockTitle: "Dirt",
        textureID: "dirt",
        displayImage: "/images/blockdesigner/blocks/dirt.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/dirt.png",
        },
        modelData: 4,
        compatibleWithLayer1: true,
    });
    dirtTexture.createClickableTexture(layer1textures, finalPreview);

    const endstoneTexture = new Texture({
        blockTitle: "Endstone",
        textureID: "endstone",
        displayImage: "/images/blockdesigner/blocks/endstone.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/endstone.png",
        },
        modelData: 5,
        compatibleWithLayer1: true,
    });
    endstoneTexture.createClickableTexture(layer1textures, finalPreview);

    const grassTopTexture = new Texture({
        blockTitle: "Grass Top",
        textureID: "grassTop",
        displayImage: "/images/blockdesigner/blocks/grass_top.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/grass_top.png",
        },
        modelData: 6,
        compatibleWithLayer1: true,
    });
    grassTopTexture.createClickableTexture(layer1textures, finalPreview);

    const terracottaTexture = new Texture({
        blockTitle: "Terracotta",
        textureID: "terracotta",
        displayImage: "/images/blockdesigner/blocks/terracotta.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/terracotta.png",
        },
        modelData: 7,
        compatibleWithLayer1: true,
    });
    terracottaTexture.createClickableTexture(layer1textures, finalPreview);

    const logSideTexture = new Texture({
        blockTitle: "Oak Log Side",
        textureID: "logSide",
        displayImage: "/images/blockdesigner/blocks/logside.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/logside.png",
        },
        modelData: 8,
        compatibleWithLayer1: true,
    });
    logSideTexture.createClickableTexture(layer1textures, finalPreview);

    const logTopTexture = new Texture({
        blockTitle: "Oak Log Top",
        textureID: "logTop",
        displayImage: "/images/blockdesigner/blocks/logtop.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/logtop.png",
        },
        modelData: 9,
        compatibleWithLayer1: true,
    });
    logTopTexture.createClickableTexture(layer1textures, finalPreview);

    const prismarineTexture = new Texture({
        blockTitle: "Prismarine",
        textureID: "prismarine",
        displayImage: "/images/blockdesigner/blocks/prismarine.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/prismarine.png",
        },
        modelData: 10,
        compatibleWithLayer1: true,
    });
    prismarineTexture.createClickableTexture(layer1textures, finalPreview);

    const clayTexture = new Texture({
        blockTitle: "Clay",
        textureID: "clay",
        displayImage: "/images/blockdesigner/blocks/clay.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/clay.png",
        },
        modelData: 11,
        compatibleWithLayer1: true,
    });
    clayTexture.createClickableTexture(layer1textures, finalPreview);

    const sandstoneTexture = new Texture({
        blockTitle: "Sandstone Bottom",
        textureID: "sandstoneBottom",
        displayImage: "/images/blockdesigner/blocks/sandstone.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/sandstone.png",
        },
        modelData: 12,
        compatibleWithLayer1: true,
    });
    sandstoneTexture.createClickableTexture(layer1textures, finalPreview);

    const stoneTexture = new Texture({
        blockTitle: "Stone",
        textureID: "stone",
        displayImage: "/images/blockdesigner/blocks/stone.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/stone.png",
        },
        modelData: 13,
        compatibleWithLayer1: true,
    });
    stoneTexture.createClickableTexture(layer1textures, finalPreview);

    const andesiteTexture = new Texture({
        blockTitle: "Andesite",
        textureID: "andesite",
        displayImage: "/images/blockdesigner/blocks/andesite.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/andesite.png",
        },
        modelData: 14,
        compatibleWithLayer1: true,
    });
    andesiteTexture.createClickableTexture(layer1textures, finalPreview);

    const planksTexture = new Texture({
        blockTitle: "Planks",
        textureID: "planks",
        displayImage: "/images/blockdesigner/blocks/planks.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/planks.png",
        },
        modelData: 39,
        compatibleWithLayer1: true,
    });
    planksTexture.createClickableTexture(layer1textures, finalPreview);

    const woolTexture = new Texture({
        blockTitle: "Wool",
        textureID: "wool",
        displayImage: "/images/blockdesigner/blocks/wool.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/wool.png",
        },
        modelData: 40,
        compatibleWithLayer1: true,
    });
    woolTexture.createClickableTexture(layer1textures, finalPreview);

    const copperTexture = new Texture({
        blockTitle: "Copper",
        textureID: "copper",
        displayImage: "/images/blockdesigner/blocks/copper.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/copper.png",
        },
        modelData: 44,
        compatibleWithLayer1: true,
    });
    copperTexture.createClickableTexture(layer1textures, finalPreview);

    const cutCopperTexture = new Texture({
        blockTitle: "Cut Copper Block",
        textureID: "cutCopper",
        displayImage: "/images/blockdesigner/blocks/cut_copper.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/cut_copper.png",
        },
        modelData: 61,
        compatibleWithLayer1: true,
    });
    cutCopperTexture.createClickableTexture(layer1textures, finalPreview);

    const debrisSideTexture = new Texture({
        // here for backwards compatability
        blockTitle: "Ancient Debris Side",
        textureID: "debrisSide",
        displayImage: "/images/blockdesigner/blocks/ancientdebris_side.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/ancientdebris_side.png",
        },
        modelData: 48,
        canAppearInRandomSelection: false,
    });
    eTexArray.push(function () {
        debrisSideTexture.createClickableTexture(layer1textures, finalPreview);
    });

    const debrisTopTexture = new Texture({
        // here for backwards compatability
        blockTitle: "Ancient Debris Top",
        textureID: "debrisTop",
        displayImage: "/images/blockdesigner/blocks/ancientdebris_top.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/ancientdebris_top.png",
        },
        modelData: 49,
        canAppearInRandomSelection: false,
    });
    eTexArray.push(function () {
        debrisTopTexture.createClickableTexture(layer1textures, finalPreview);
    });

    const debrisTexture = new Texture({
        blockTitle: "Ancient Debris",
        blockLore: "Now has in-game model",
        textureID: "debris",
        displayImage: "/images/blockdesigner/blocks/ancientdebris_side.png",
        renderingMode: "logLike",
        images: {
            sides: "/images/blockdesigner/blocks/ancientdebris_side.png",
            top: "/images/blockdesigner/blocks/ancientdebris_top.png",
            bottom: "/images/blockdesigner/blocks/ancientdebris_top.png",
        },
        modelData: 79,
        compatibleWithLayer1: true,
    });
    debrisTexture.createClickableTexture(layer1textures, finalPreview);

    const ironBlockTexture = new Texture({
        blockTitle: "Iron Block",
        textureID: "ironBlock",
        displayImage: "/images/blockdesigner/blocks/ironblock.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/ironblock.png",
        },
        modelData: 51,
        compatibleWithLayer1: true,
    });
    ironBlockTexture.createClickableTexture(layer1textures, finalPreview);

    const amethystTexture = new Texture({
        blockTitle: "Amethyst",
        textureID: "amethyst",
        displayImage: "/images/blockdesigner/blocks/amethyst.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/amethyst.png",
        },
        modelData: 52,
        compatibleWithLayer1: true,
    });
    amethystTexture.createClickableTexture(layer1textures, finalPreview);

    const dripstoneTexture = new Texture({
        blockTitle: "Dripstone Block",
        textureID: "dripstone",
        displayImage: "/images/blockdesigner/blocks/dripstone.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/dripstone.png",
        },
        modelData: 53,
        compatibleWithLayer1: true,
    });
    dripstoneTexture.createClickableTexture(layer1textures, finalPreview);

    const mushroomStemTexture = new Texture({
        blockTitle: "Mushroom Stem",
        textureID: "mushroomStem",
        displayImage: "/images/blockdesigner/blocks/mushroomstem.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/mushroomstem.png",
        },
        modelData: 54,
        compatibleWithLayer1: true,
    });
    mushroomStemTexture.createClickableTexture(layer1textures, finalPreview);

    const brownMushroomTexture = new Texture({
        blockTitle: "Brown Mushroom Block",
        textureID: "brownMushroom",
        displayImage: "/images/blockdesigner/blocks/bd_brown_mushroom_block.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/bd_brown_mushroom_block.png",
        },
        modelData: 80,
        compatibleWithLayer1: true,
    });
    brownMushroomTexture.createClickableTexture(layer1textures, finalPreview);

    const netherrackTexture = new Texture({
        blockTitle: "Netherrack",
        textureID: "netherrack",
        displayImage: "/images/blockdesigner/blocks/netherrack.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/netherrack.png",
        },
        modelData: 56,
        compatibleWithLayer1: true,
    });
    netherrackTexture.createClickableTexture(layer1textures, finalPreview);

    const cobbledDeepslateTexture = new Texture({
        blockTitle: "Cobbled Deepslate",
        textureID: "cobbledDeepslate",
        displayImage: "/images/blockdesigner/blocks/cobbled_deepslate.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/cobbled_deepslate.png",
        },
        modelData: 59,
        compatibleWithLayer1: true,
    });
    cobbledDeepslateTexture.createClickableTexture(layer1textures, finalPreview);

    const rawGoldTexture = new Texture({
        blockTitle: "Raw Gold Block",
        textureID: "rawGold",
        displayImage: "/images/blockdesigner/blocks/raw_gold_block.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/raw_gold_block.png",
        },
        modelData: 67,
        compatibleWithLayer1: true,
    });
    rawGoldTexture.createClickableTexture(layer1textures, finalPreview);

    const bricksTexture = new Texture({
        blockTitle: "Bricks",
        textureID: "bricks",
        displayImage: "/images/blockdesigner/blocks/bricks.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/bricks.png",
        },
        modelData: 69,
        compatibleWithLayer1: true,
    });
    bricksTexture.createClickableTexture(layer1textures, finalPreview);

    const cobblestoneTexture = new Texture({
        blockTitle: "Cobblestone",
        textureID: "cobblestone",
        displayImage: "/images/blockdesigner/blocks/cobblestone.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/cobblestone.png",
        },
        modelData: 70,
        compatibleWithLayer1: true,
    });
    cobblestoneTexture.createClickableTexture(layer1textures, finalPreview);

    const netherBricksTexture = new Texture({
        blockTitle: "Nether Bricks",
        textureID: "netherBricks",
        displayImage: "/images/blockdesigner/blocks/nether_bricks.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/nether_bricks.png",
        },
        modelData: 71,
        compatibleWithLayer1: true,
    });
    netherBricksTexture.createClickableTexture(layer1textures, finalPreview);

    const spongeTexture = new Texture({
        blockTitle: "Sponge",
        textureID: "sponge",
        displayImage: "/images/blockdesigner/blocks/sponge.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/sponge.png",
        },
        modelData: 72,
        compatibleWithLayer1: true,
    });
    spongeTexture.createClickableTexture(layer1textures, finalPreview);

    const tubeCoralTexture = new Texture({
        blockTitle: "Tube Coral Block",
        textureID: "tubeCoral",
        displayImage: "/images/blockdesigner/blocks/tube_coral_block.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/tube_coral_block.png",
        },
        modelData: 73,
        compatibleWithLayer1: true,
    });
    tubeCoralTexture.createClickableTexture(layer1textures, finalPreview);

    const brainCoralTexture = new Texture({
        blockTitle: "Brain Coral Block",
        textureID: "brainCoral",
        displayImage: "/images/blockdesigner/blocks/brain_coral_block.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/brain_coral_block.png",
        },
        modelData: 74,
        compatibleWithLayer1: true,
    });
    brainCoralTexture.createClickableTexture(layer1textures, finalPreview);

    const bubbleCoralTexture = new Texture({
        blockTitle: "Bubble Coral Block",
        textureID: "bubbleCoral",
        displayImage: "/images/blockdesigner/blocks/bubble_coral_block.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/bubble_coral_block.png",
        },
        modelData: 75,
        compatibleWithLayer1: true,
    });
    bubbleCoralTexture.createClickableTexture(layer1textures, finalPreview);

    const fireCoralTexture = new Texture({
        blockTitle: "Fire Coral Block",
        textureID: "fireCoral",
        displayImage: "/images/blockdesigner/blocks/fire_coral_block.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/fire_coral_block.png",
        },
        modelData: 76,
        compatibleWithLayer1: true,
    });
    fireCoralTexture.createClickableTexture(layer1textures, finalPreview);

    const hornCoralTexture = new Texture({
        blockTitle: "Horn Coral Block",
        textureID: "hornCoral",
        displayImage: "/images/blockdesigner/blocks/horn_coral_block.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/horn_coral_block.png",
        },
        modelData: 77,
        compatibleWithLayer1: true,
    });
    hornCoralTexture.createClickableTexture(layer1textures, finalPreview);

    const bookshelfBackTexture = new Texture({
        blockTitle: "Bookshelf Back",
        textureID: "bookshelfBack",
        displayImage: "/images/blockdesigner/blocks/bd_bookshelf_back.png",
        renderingMode: "loglike",
        images: {
            sides: "/images/blockdesigner/blocks/bd_bookshelf_back.png",
            top: "/images/blockdesigner/blocks/planks.png",
            bottom: "/images/blockdesigner/blocks/planks.png",
        },
        modelData: 86,
        compatibleWithLayer1: true,
    });
    bookshelfBackTexture.createClickableTexture(layer1textures, finalPreview);

    const pumpkinTexture = new Texture({
        blockTitle: "Pumpkin",
        textureID: "pumpkin",
        displayImage: "/images/blockdesigner/blocks/bd_pumpkin_side.png",
        renderingMode: "loglike",
        images: {
            sides: "/images/blockdesigner/blocks/bd_pumpkin_side.png",
            top: "/images/blockdesigner/blocks/bd_pumpkin_top.png",
            bottom: "/images/blockdesigner/blocks/bd_pumpkin_top.png",
        },
        modelData: 88,
        compatibleWithLayer1: true,
    });
    pumpkinTexture.createClickableTexture(layer1textures, finalPreview);

    // layer 2/3
    const grassBlockTexture = new Texture({
        blockTitle: "Grass Block",
        textureID: "grassBlock",
        displayImage: "/images/blockdesigner/blocks/grass_side.png",
        renderingMode: "grasslike",
        images: {
            sides: "/images/blockdesigner/blocks/grass_side.png",
            top: "/images/blockdesigner/blocks/grass_top.png",
        },
        modelData: 35,
    });
    grassBlockTexture.createClickableTexture(layer2textures, finalPreview);
    grassBlockTexture.createClickableTexture(layer3textures, finalPreview);

    const myceliumBlockTexture = new Texture({
        blockTitle: "Mycelium Block",
        textureID: "myceliumBlock",
        displayImage: "/images/blockdesigner/blocks/mycelium_side.png",
        renderingMode: "grasslike",
        images: {
            sides: "/images/blockdesigner/blocks/mycelium_side.png",
            top: "/images/blockdesigner/blocks/mycelium_top.png",
        },
        modelData: 36,
    });
    myceliumBlockTexture.createClickableTexture(layer2textures, finalPreview);
    myceliumBlockTexture.createClickableTexture(layer3textures, finalPreview);

    const nyliumTexture = new Texture({
        blockTitle: "Nylium",
        textureID: "nylium",
        displayImage: "/images/blockdesigner/blocks/warpednylium_side.png",
        renderingMode: "grasslike",
        images: {
            sides: "/images/blockdesigner/blocks/warpednylium_side.png",
            top: "/images/blockdesigner/blocks/warpednylium.png",
        },
        modelData: 50,
    });
    nyliumTexture.createClickableTexture(layer2textures, finalPreview);
    nyliumTexture.createClickableTexture(layer3textures, finalPreview);

    const vineTexture = new Texture({
        blockTitle: "Vine",
        textureID: "vine",
        displayImage: "/images/blockdesigner/blocks/vine.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/vine.png",
        },
        modelData: 37,
    });
    vineTexture.createClickableTexture(layer2textures, finalPreview);
    vineTexture.createClickableTexture(layer3textures, finalPreview);

    const borderTexture = new Texture({
        blockTitle: "Border",
        textureID: "border",
        displayImage: "/images/blockdesigner/blocks/border.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/border.png",
        },
        modelData: 32,
    });
    borderTexture.createClickableTexture(layer2textures, finalPreview);
    borderTexture.createClickableTexture(layer3textures, finalPreview);

    const ironBarsTexture = new Texture({
        blockTitle: "Iron Bars",
        textureID: "ironBars",
        displayImage: "/images/blockdesigner/blocks/iron_bars.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/iron_bars.png",
        },
        modelData: 43,
    });
    ironBarsTexture.createClickableTexture(layer2textures, finalPreview);
    ironBarsTexture.createClickableTexture(layer3textures, finalPreview);

    const daylightBottomTexture = new Texture({
        blockTitle: "Daylight Detector Bottom",
        textureID: "daylightDetectorBottom",
        displayImage: "/images/blockdesigner/blocks/dl_bottom.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/dl_bottom.png",
        },
        modelData: 15,
    });
    daylightBottomTexture.createClickableTexture(layer2textures, finalPreview);
    daylightBottomTexture.createClickableTexture(layer3textures, finalPreview);

    const daylightTopTexture = new Texture({
        blockTitle: "Daylight Detector Top",
        textureID: "daylightDetectorTop",
        displayImage: "/images/blockdesigner/blocks/dl_top.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/dl_top.png",
        },
        modelData: 16,
    });
    daylightTopTexture.createClickableTexture(layer2textures, finalPreview);
    daylightTopTexture.createClickableTexture(layer3textures, finalPreview);

    const emeraldBlockTexture = new Texture({
        blockTitle: "Emerald Block",
        textureID: "emeraldBlock",
        displayImage: "/images/blockdesigner/blocks/emerald_block.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/emerald_block.png",
        },
        modelData: 17,
    });
    emeraldBlockTexture.createClickableTexture(layer2textures, finalPreview);
    emeraldBlockTexture.createClickableTexture(layer3textures, finalPreview);

    const emeraldBlockOldTexture = new Texture({
        blockTitle: "Emerald Block",
        blockLore: "Pre 1.14 version",
        textureID: "emeraldBlockOld",
        displayImage: "/images/blockdesigner/blocks/bd_emerald_block_old.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/bd_emerald_block_old.png",
        },
        modelData: 83,
    });
    emeraldBlockOldTexture.createClickableTexture(layer2textures, finalPreview);
    emeraldBlockOldTexture.createClickableTexture(layer3textures, finalPreview);

    const endstoneBrickTexture = new Texture({
        blockTitle: "Endstone Brick",
        textureID: "endstoneBrick",
        displayImage: "/images/blockdesigner/blocks/endstone_brick.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/endstone_brick.png",
        },
        modelData: 19,
    });
    endstoneBrickTexture.createClickableTexture(layer2textures, finalPreview);
    endstoneBrickTexture.createClickableTexture(layer3textures, finalPreview);

    const netherBricksOutlineTexture = new Texture({
        blockTitle: "Nether Bricks Outline",
        textureID: "netherBrickOutline",
        displayImage: "/images/blockdesigner/blocks/netherbrick.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/netherbrick.png",
        },
        modelData: 22,
    });
    netherBricksOutlineTexture.createClickableTexture(layer2textures, finalPreview);
    netherBricksOutlineTexture.createClickableTexture(layer3textures, finalPreview);

    const obsidianTexture = new Texture({
        blockTitle: "Obsidian",
        blockLore: "Pre 1.14 version",
        textureID: "obsidian",
        displayImage: "/images/blockdesigner/blocks/obsidian.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/obsidian.png",
        },
        modelData: 23,
    });
    obsidianTexture.createClickableTexture(layer2textures, finalPreview);
    obsidianTexture.createClickableTexture(layer3textures, finalPreview);

    const planksOutlineTexture = new Texture({
        blockTitle: "Planks Outline",
        textureID: "planksOutline",
        displayImage: "/images/blockdesigner/blocks/planks_outline.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/planks_outline.png",
        },
        modelData: 24,
    });
    planksOutlineTexture.createClickableTexture(layer2textures, finalPreview);
    planksOutlineTexture.createClickableTexture(layer3textures, finalPreview);

    const prismarineBrickTexture = new Texture({
        blockTitle: "Prismarine Brick",
        textureID: "prismarineBrick",
        displayImage: "/images/blockdesigner/blocks/prismarine_brick.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/prismarine_brick.png",
        },
        modelData: 25,
    });
    prismarineBrickTexture.createClickableTexture(layer2textures, finalPreview);
    prismarineBrickTexture.createClickableTexture(layer3textures, finalPreview);

    const darkPrismarineTexture = new Texture({
        blockTitle: "Dark Prismarine",
        textureID: "darkPrismarine",
        displayImage: "/images/blockdesigner/blocks/dark_prismarine.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/dark_prismarine.png",
        },
        modelData: 26,
    });
    darkPrismarineTexture.createClickableTexture(layer2textures, finalPreview);
    darkPrismarineTexture.createClickableTexture(layer3textures, finalPreview);

    const purpurBrickTexture = new Texture({
        blockTitle: "Purpur Brick",
        textureID: "purpurBrick",
        displayImage: "/images/blockdesigner/blocks/purpur_brick.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/purpur_brick.png",
        },
        modelData: 27,
    });
    purpurBrickTexture.createClickableTexture(layer2textures, finalPreview);
    purpurBrickTexture.createClickableTexture(layer3textures, finalPreview);

    const purpurPillarOldTexture = new Texture({
        // here for backwards compatability
        blockTitle: "Purpur Pillar",
        textureID: "purpurPillarOld",
        displayImage: "/images/blockdesigner/blocks/purpur_pillar.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/purpur_pillar.png",
        },
        modelData: 28,
        canAppearInRandomSelection: false,
    });
    eTexArray.push(function () {
        purpurPillarOldTexture.createClickableTexture(layer2textures, finalPreview);
        purpurPillarOldTexture.createClickableTexture(layer3textures, finalPreview);
    });

    const purpurPillarTexture = new Texture({
        blockTitle: "Purpur Pillar",
        blockLore: "Now has in-game model",
        textureID: "purpurPillar",
        displayImage: "/images/blockdesigner/blocks/bd_purpur_pillar.png",
        renderingMode: "logLike",
        images: {
            top: "/images/blockdesigner/blocks/bd_purpur_pillar_top.png",
            bottom: "/images/blockdesigner/blocks/bd_purpur_pillar_top.png",
            sides: "/images/blockdesigner/blocks/bd_purpur_pillar.png",
        },
        modelData: 81,
    });
    purpurPillarTexture.createClickableTexture(layer2textures, finalPreview);
    purpurPillarTexture.createClickableTexture(layer3textures, finalPreview);

    const chiselledQuartsTexture = new Texture({
        blockTitle: "Chiselled Quartz",
        textureID: "chiselledQuartz",
        displayImage: "/images/blockdesigner/blocks/chipped_quartz.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/chipped_quartz.png",
        },
        modelData: 29,
    });
    chiselledQuartsTexture.createClickableTexture(layer2textures, finalPreview);
    chiselledQuartsTexture.createClickableTexture(layer3textures, finalPreview);

    const chiselledQuartsOldTexture = new Texture({
        blockTitle: "Chiselled Quartz",
        blockLore: "Pre 1.14 version",
        textureID: "chiselledQuartzOld",
        displayImage: "/images/blockdesigner/blocks/bd_chiselled_quartz_old.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/bd_chiselled_quartz_old.png",
        },
        modelData: 82,
    });
    chiselledQuartsOldTexture.createClickableTexture(layer2textures, finalPreview);
    chiselledQuartsOldTexture.createClickableTexture(layer3textures, finalPreview);

    const quartzPillarTexture = new Texture({
        blockTitle: "Quartz Pillar",
        textureID: "quartzPillar",
        displayImage: "/images/blockdesigner/blocks/quartz_pillar.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/quartz_pillar.png",
        },
        modelData: 30,
    });
    quartzPillarTexture.createClickableTexture(layer2textures, finalPreview);
    quartzPillarTexture.createClickableTexture(layer3textures, finalPreview);

    const stoneBrickTexture = new Texture({
        blockTitle: "Stone Brick",
        textureID: "stoneBrick",
        displayImage: "/images/blockdesigner/blocks/stonebrick.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/stonebrick.png",
        },
        modelData: 33,
    });
    stoneBrickTexture.createClickableTexture(layer2textures, finalPreview);
    stoneBrickTexture.createClickableTexture(layer3textures, finalPreview);

    const chiselledStoneTexture = new Texture({
        blockTitle: "Chiselled Stone Brick",
        textureID: "chiselledStone",
        displayImage: "/images/blockdesigner/blocks/chipped_stonebrick.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/chipped_stonebrick.png",
        },
        modelData: 34,
    });
    chiselledStoneTexture.createClickableTexture(layer2textures, finalPreview);
    chiselledStoneTexture.createClickableTexture(layer3textures, finalPreview);

    const warpedStemTexture = new Texture({
        blockTitle: "Nether Stem",
        blockLore: "Animated slightly in-game",
        textureID: "netherStem",
        displayImage: "/images/blockdesigner/blocks/crimsonstem.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/crimsonstem.png",
        },
        modelData: 45,
    });
    warpedStemTexture.createClickableTexture(layer2textures, finalPreview);
    warpedStemTexture.createClickableTexture(layer3textures, finalPreview);

    const glowLichenTexture = new Texture({
        blockTitle: "Glow Lichen",
        textureID: "glowLichen",
        displayImage: "/images/blockdesigner/blocks/glowlichen.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/glowlichen.png",
        },
        modelData: 46,
    });
    glowLichenTexture.createClickableTexture(layer2textures, finalPreview);
    glowLichenTexture.createClickableTexture(layer3textures, finalPreview);

    const glassTexture = new Texture({
        blockTitle: "Glass",
        textureID: "glass",
        displayImage: "/images/blockdesigner/blocks/glass.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/glass.png",
        },
        modelData: 47,
    });
    glassTexture.createClickableTexture(layer2textures, finalPreview);
    glassTexture.createClickableTexture(layer3textures, finalPreview);

    const tintedGlassTexture = new Texture({
        blockTitle: "Tinted Glass",
        textureID: "tintedGlass",
        displayImage: "/images/blockdesigner/blocks/tinted_glass.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/tinted_glass.png",
        },
        modelData: 57,
    });
    tintedGlassTexture.createClickableTexture(layer2textures, finalPreview);
    tintedGlassTexture.createClickableTexture(layer3textures, finalPreview);

    const bricksOutlineTexture = new Texture({
        blockTitle: "Bricks Outline",
        textureID: "bricksOutline",
        displayImage: "/images/blockdesigner/blocks/bricks_outline.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/bricks_outline.png",
        },
        modelData: 78,
    });
    bricksOutlineTexture.createClickableTexture(layer2textures, finalPreview);
    bricksOutlineTexture.createClickableTexture(layer3textures, finalPreview);

    const gildedBlackstoneTexture = new Texture({
        blockTitle: "Gilded Blackstone",
        textureID: "gildedBlackstone",
        displayImage: "/images/blockdesigner/blocks/gildedblackstone.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/gildedblackstone.png",
        },
        modelData: 55,
    });
    gildedBlackstoneTexture.createClickableTexture(layer2textures, finalPreview);
    gildedBlackstoneTexture.createClickableTexture(layer3textures, finalPreview);

    const emeraldOreOldTexture = new Texture({
        blockTitle: "Emerald Ore",
        blockLore: "Pre 1.17 version",
        textureID: "emeraldOreOld",
        displayImage: "/images/blockdesigner/blocks/emerald_ore.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/emerald_ore.png",
        },
        modelData: 18,
    });
    emeraldOreOldTexture.createClickableTexture(layer2textures, finalPreview);
    emeraldOreOldTexture.createClickableTexture(layer3textures, finalPreview);

    const ironOreNewTexture = new Texture({
        blockTitle: "Iron Ore",
        blockLore: "Pre 1.17 version",
        textureID: "ironOreOld",
        displayImage: "/images/blockdesigner/blocks/iron_ore.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/iron_ore.png",
        },
        modelData: 20,
    });
    ironOreNewTexture.createClickableTexture(layer2textures, finalPreview);
    ironOreNewTexture.createClickableTexture(layer3textures, finalPreview);

    const lapisOreTexture = new Texture({
        blockTitle: "Lapis Ore",
        textureID: "lapisOre",
        displayImage: "/images/blockdesigner/blocks/lapis_ore.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/lapis_ore.png",
        },
        modelData: 21,
    });
    lapisOreTexture.createClickableTexture(layer2textures, finalPreview);
    lapisOreTexture.createClickableTexture(layer3textures, finalPreview);

    const coalOreTexture = new Texture({
        blockTitle: "Coal Ore",
        textureID: "coalOre",
        displayImage: "/images/blockdesigner/blocks/coal_ore.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/coal_ore.png",
        },
        modelData: 58,
    });
    coalOreTexture.createClickableTexture(layer2textures, finalPreview);
    coalOreTexture.createClickableTexture(layer3textures, finalPreview);

    const copperOreTexture = new Texture({
        blockTitle: "Copper Ore",
        textureID: "copperOre",
        displayImage: "/images/blockdesigner/blocks/copper_ore.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/copper_ore.png",
        },
        modelData: 60,
    });
    copperOreTexture.createClickableTexture(layer2textures, finalPreview);
    copperOreTexture.createClickableTexture(layer3textures, finalPreview);

    const emeraldOreTexture = new Texture({
        blockTitle: "Emerald Ore",
        textureID: "emeraldOre",
        displayImage: "/images/blockdesigner/blocks/emerald_ore_new.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/emerald_ore_new.png",
        },
        modelData: 62,
    });
    emeraldOreTexture.createClickableTexture(layer2textures, finalPreview);
    emeraldOreTexture.createClickableTexture(layer3textures, finalPreview);

    const goldOreTexture = new Texture({
        blockTitle: "Gold Ore",
        textureID: "goldOre",
        displayImage: "/images/blockdesigner/blocks/gold_ore.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/gold_ore.png",
        },
        modelData: 63,
    });
    goldOreTexture.createClickableTexture(layer2textures, finalPreview);
    goldOreTexture.createClickableTexture(layer3textures, finalPreview);

    const ironOreTexture = new Texture({
        blockTitle: "Iron Ore",
        textureID: "ironOre",
        displayImage: "/images/blockdesigner/blocks/iron_ore_new.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/iron_ore_new.png",
        },
        modelData: 64,
    });
    ironOreTexture.createClickableTexture(layer2textures, finalPreview);
    ironOreTexture.createClickableTexture(layer3textures, finalPreview);

    const netherGoldOreTexture = new Texture({
        blockTitle: "Nether Gold Ore",
        textureID: "netherGoldOre",
        displayImage: "/images/blockdesigner/blocks/nether_gold_ore.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/nether_gold_ore.png",
        },
        modelData: 65,
    });
    netherGoldOreTexture.createClickableTexture(layer2textures, finalPreview);
    netherGoldOreTexture.createClickableTexture(layer3textures, finalPreview);

    const quartzOreOldTexture = new Texture({
        blockTitle: "Nether Quartz Ore",
        blockLore: "Pre 1.14 version",
        textureID: "quartzOreOld",
        displayImage: "/images/blockdesigner/blocks/quartz_ore.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/quartz_ore.png",
        },
        modelData: 31,
    });
    quartzOreOldTexture.createClickableTexture(layer2textures, finalPreview);
    quartzOreOldTexture.createClickableTexture(layer3textures, finalPreview);

    const quartzOreTexture = new Texture({
        blockTitle: "Nether Quartz Ore",
        textureID: "quartzOre",
        displayImage: "/images/blockdesigner/blocks/nether_quartz_new.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/nether_quartz_new.png",
        },
        modelData: 66,
    });
    quartzOreTexture.createClickableTexture(layer2textures, finalPreview);
    quartzOreTexture.createClickableTexture(layer3textures, finalPreview);

    const redstoneOreTexture = new Texture({
        blockTitle: "Redstone Ore",
        textureID: "redstoneOre",
        displayImage: "/images/blockdesigner/blocks/redstone_ore.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/redstone_ore.png",
        },
        modelData: 68,
    });
    redstoneOreTexture.createClickableTexture(layer2textures, finalPreview);
    redstoneOreTexture.createClickableTexture(layer3textures, finalPreview);

    // TODO: untinted layers for untintable parts of texture
    const bookshelfBooks1Texture = new Texture({
        blockTitle: "Bookshelf Books 1",
        textureID: "books1",
        displayImage: "/images/blockdesigner/blocks/bd_bookshelf_books_1.png",
        renderingMode: "logLike",
        images: {
            sides: "/images/blockdesigner/blocks/bd_bookshelf_books_1.png",
        },
        modelData: 84,
    });
    bookshelfBooks1Texture.createClickableTexture(layer2textures, finalPreview);
    bookshelfBooks1Texture.createClickableTexture(layer3textures, finalPreview);

    const bookshelfBooks2Texture = new Texture({
        blockTitle: "Bookshelf Books 2",
        textureID: "books2",
        displayImage: "/images/blockdesigner/blocks/bd_bookshelf_books_2.png",
        renderingMode: "logLike",
        images: {
            sides: "/images/blockdesigner/blocks/bd_bookshelf_books_2.png",
        },
        modelData: 85,
    });
    bookshelfBooks2Texture.createClickableTexture(layer2textures, finalPreview);
    bookshelfBooks2Texture.createClickableTexture(layer3textures, finalPreview);

    const redMushroomSpotsTexture = new Texture({
        blockTitle: "Red Mushroom Spots",
        textureID: "redMushroomSpots",
        displayImage: "/images/blockdesigner/blocks/bd_red_mushroom_spots.png",
        renderingMode: "all",
        images: {
            all: "/images/blockdesigner/blocks/bd_red_mushroom_spots.png",
        },
        modelData: 87,
    });
    redMushroomSpotsTexture.createClickableTexture(layer2textures, finalPreview);
    redMushroomSpotsTexture.createClickableTexture(layer3textures, finalPreview);

    window.allTexturesLoaded = true;

    let addEasterEggTextures = true;

    $q(".bd-version").addEventListener("click", function (e) {
        e.target.classList.add("moveUp100px");
        setTimeout(() => {
            e.target.classList.remove("moveUp100px");
        }, 1200);

        if (addEasterEggTextures == true) {
            setTimeout(() => {
                for (let i = 0; i < eTexArray.length; i++) {
                    eTexArray[i]();
                }
            }, 1200);
        }

        addEasterEggTextures = false;
    });
}

// new textures: proper debris model, brown mushroom block, bookshelf books and back, red mushroom spots
// spawner on second layer
//
