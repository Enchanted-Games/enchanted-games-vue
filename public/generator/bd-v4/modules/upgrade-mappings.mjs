export { blockLinkArrayMap, boolMap, textureIdMap, colourIDMappings, colourNameMappings, blockNumericIDMappingsL1, blockNumericIDMappingsL2, blockNumericIDMappingsL3, codecraftedBlockUpgradeMap };

// includes maps for many things such as old texture IDs to new ones and array maps

// links array indexes to object locations (not used but helpful to figure out the values block link)
let blockLinkArrayMap = new Map();
blockLinkArrayMap.set(0, "generalOptions.blockEngineVersion");
blockLinkArrayMap.set(1, "layers.layer1.textureID");
blockLinkArrayMap.set(2, "layers.layer1.colour");
blockLinkArrayMap.set(3, "layers.layer1.hasGlint");
blockLinkArrayMap.set(4, "layers.layer2.textureID");
blockLinkArrayMap.set(5, "layers.layer2.colour");
blockLinkArrayMap.set(6, "layers.layer2.hasGlint");
blockLinkArrayMap.set(7, "layers.layer3.textureID");
blockLinkArrayMap.set(8, "layers.layer3.colour");
blockLinkArrayMap.set(9, "layers.layer3.hasGlint");
blockLinkArrayMap.set(10, "generalOptions.inGameName");
blockLinkArrayMap.set(11, "generalOptions.blockLore");
blockLinkArrayMap.set(12, "generalOptions.nameFormatting.bold");
blockLinkArrayMap.set(13, "generalOptions.nameFormatting.italic");
blockLinkArrayMap.set(14, "generalOptions.nameFormatting.strike");
blockLinkArrayMap.set(15, "generalOptions.nameFormatting.underline");
blockLinkArrayMap.set(16, "generalOptions.nameFormatting.colour");

let boolMap = new Map();
boolMap.set("0", false);
boolMap.set("1", true);

// mappings for old texture IDs to new texture IDs
// not required to add new entries here since these values come from block designer v3.2.1
let textureIdMap = new Map();
textureIdMap.set("delete1", "empty");
textureIdMap.set("delete2", "empty");
textureIdMap.set("delete3", "empty");
textureIdMap.set("lapisblock", "lapisBlock");
textureIdMap.set("diamondblock", "diamondBlock");
textureIdMap.set("dirt", "dirt");
textureIdMap.set("endstone", "endstone");
textureIdMap.set("grasstop", "grassTop");
textureIdMap.set("terracotta", "terracotta");
textureIdMap.set("logside", "logSide");
textureIdMap.set("logtop", "logTop");
textureIdMap.set("prismarine", "prismarine");
textureIdMap.set("sand", "clay");
textureIdMap.set("sandstone", "sandstoneBottom");
textureIdMap.set("stone", "stone");
textureIdMap.set("andesite", "andesite");
textureIdMap.set("planks", "planks");
textureIdMap.set("wool", "wool");
textureIdMap.set("copper", "copper");
textureIdMap.set("ancientdebris_side", "debrisSide");
textureIdMap.set("ancientdebris_top", "debrisTop");
textureIdMap.set("ironblock", "ironBlock");
textureIdMap.set("amethyst", "amethyst");
textureIdMap.set("dripstone", "dripstone");
textureIdMap.set("mushroomstem", "mushroomStem");
textureIdMap.set("netherrack", "netherrack");
textureIdMap.set("cobbleddeepslate", "cobbledDeepslate");
textureIdMap.set("cutcopper", "cutCopper");
textureIdMap.set("rawgold", "rawGold");
textureIdMap.set("bricks", "bricks");
textureIdMap.set("cobblestone", "cobblestone");
textureIdMap.set("netherbricks", "netherBricks");
textureIdMap.set("sponge", "sponge");
textureIdMap.set("tube_coral_block", "tubeCoral");
textureIdMap.set("brain_coral_block", "brainCoral");
textureIdMap.set("bubble_coral_block", "bubbleCoral");
textureIdMap.set("fire_coral_block", "fireCoral");
textureIdMap.set("horn_coral_block", "hornCoral");
// layer2
textureIdMap.set("dl_bottom", "daylightDetectorBottom");
textureIdMap.set("dl_top", "daylightDetectorTop");
textureIdMap.set("emerald_block", "emeraldBlock");
textureIdMap.set("emerald_ore", "emeraldOreOld");
textureIdMap.set("endstone_brick", "endstoneBrick");
textureIdMap.set("iron_ore", "ironOreOld");
textureIdMap.set("lapis_ore", "lapisOre");
textureIdMap.set("netherbrick", "netherBrickOutline");
textureIdMap.set("obsidian", "obsidian");
textureIdMap.set("planks_outline", "planksOutline");
textureIdMap.set("prismarine_brick", "prismarineBrick");
textureIdMap.set("dark_prismarine", "darkPrismarine");
textureIdMap.set("purpur_brick", "purpurBrick");
textureIdMap.set("purpur_pillar", "purpurPillarOld");
textureIdMap.set("chisseled_quartz", "chiselledQuartz");
textureIdMap.set("quartz_pillar", "quartzPillar");
textureIdMap.set("quartz_ore", "quartzOreOld");
textureIdMap.set("border", "border");
textureIdMap.set("stonebrick", "stoneBrick");
textureIdMap.set("chisseled_stonebrick", "chiselledStone");
textureIdMap.set("iron_bars", "ironBars");
textureIdMap.set("crimsonstem", "netherStem");
textureIdMap.set("glowlichen", "glowLichen");
textureIdMap.set("glass", "glass");
textureIdMap.set("gildedblackstone", "gildedBlackstone");
textureIdMap.set("vine", "vine");
textureIdMap.set("tintedglass", "tintedGlass");
textureIdMap.set("coalore", "coalOre");
textureIdMap.set("copperore", "copperOre");
textureIdMap.set("emeraldorenew", "emeraldOre");
textureIdMap.set("goldore", "goldOre");
textureIdMap.set("ironorenew", "ironOre");
textureIdMap.set("nethergoldore", "netherGoldOre");
textureIdMap.set("netherquartz", "quartzOre");
textureIdMap.set("redstoneore", "redstoneOre");

textureIdMap.set("grass_side2", "grassBlock");
textureIdMap.set("grass_side", "grassBlock");
textureIdMap.set("mycelium_side2", "myceliumBlock");
textureIdMap.set("mycelium_side", "myceliumBlock");
textureIdMap.set("warped_nylium_side2", "nylium");
textureIdMap.set("warped_nylium_side", "nylium");

textureIdMap.set("l3_dl_bottom", "daylightDetectorBottom");
textureIdMap.set("l3_dl_top", "daylightDetectorTop");
textureIdMap.set("l3_emerald_block", "emeraldBlock");
textureIdMap.set("l3_emerald_ore", "emeraldOreOld");
textureIdMap.set("l3_endstone_brick", "endstoneBrick");
textureIdMap.set("l3_iron_ore", "ironOreOld");
textureIdMap.set("l3_lapis_ore", "lapisOre");
textureIdMap.set("l3_netherbrick", "netherBrickOutline");
textureIdMap.set("l3_obsidian", "obsidian");
textureIdMap.set("l3_planks_outline", "planksOutline");
textureIdMap.set("l3_prismarine_brick", "prismarineBrick");
textureIdMap.set("l3_dark_prismarine", "darkPrismarine");
textureIdMap.set("l3_purpur_brick", "purpurBrick");
textureIdMap.set("l3_purpur_pillar", "purpurPillarOld");
textureIdMap.set("l3_chisseled_quartz", "chiselledQuartz");
textureIdMap.set("l3_quartz_pillar", "quartzPillar");
textureIdMap.set("l3_quartz_ore", "quartzOreOld");
textureIdMap.set("l3_border", "border");
textureIdMap.set("l3_stonebrick", "stoneBrick");
textureIdMap.set("l3_chisseled_stonebrick", "chiselledStone");
textureIdMap.set("l3_iron_bars", "ironBars");
textureIdMap.set("l3_crimsonstem", "netherStem");
textureIdMap.set("l3_glowlichen", "glowLichen");
textureIdMap.set("l3_glass", "glass");
textureIdMap.set("l3_gildedblackstone", "gildedBlackstone");
textureIdMap.set("l3_vine", "vine");
textureIdMap.set("l3_tintedglass", "tintedGlass");
textureIdMap.set("l3_coalore", "coalOre");
textureIdMap.set("l3_copperore", "copperOre");
textureIdMap.set("l3_emeraldorenew", "emeraldOre");
textureIdMap.set("l3_goldore", "goldOre");
textureIdMap.set("l3_ironorenew", "ironOre");
textureIdMap.set("l3_nethergoldore", "netherGoldOre");
textureIdMap.set("l3_netherquartz", "quartzOre");
textureIdMap.set("l3_redstoneore", "redstoneOre");

textureIdMap.set("bricks_outline", "bricksOutline");
textureIdMap.set("bricks_outline3", "bricksOutline");

// used to upgrade block IDs from blockdesigner v2 (layer1)
let blockNumericIDMappingsL1 = new Map();
blockNumericIDMappingsL1.set("0", "empty");
blockNumericIDMappingsL1.set("1", "lapisBlock");
blockNumericIDMappingsL1.set("2", "diamondBlock");
blockNumericIDMappingsL1.set("3", "dirt");
blockNumericIDMappingsL1.set("4", "endstone");
blockNumericIDMappingsL1.set("5", "grassTop");
blockNumericIDMappingsL1.set("6", "terracotta");
blockNumericIDMappingsL1.set("7", "logSide");
blockNumericIDMappingsL1.set("8", "logTop");
blockNumericIDMappingsL1.set("9", "prismarine");
blockNumericIDMappingsL1.set("10", "clay");
blockNumericIDMappingsL1.set("10", "clay");
blockNumericIDMappingsL1.set("11", "sandstoneBottom");
blockNumericIDMappingsL1.set("12", "stone");
blockNumericIDMappingsL1.set("13", "andesite");
blockNumericIDMappingsL1.set("14", "planks");
blockNumericIDMappingsL1.set("15", "wool");
blockNumericIDMappingsL1.set("16", "copper");
blockNumericIDMappingsL1.set("17", "debrisSide");
blockNumericIDMappingsL1.set("18", "debrisTop");
blockNumericIDMappingsL1.set("19", "ironBlock");
blockNumericIDMappingsL1.set("20", "amethyst");
blockNumericIDMappingsL1.set("21", "dripstone");
blockNumericIDMappingsL1.set("22", "mushroomStem");
blockNumericIDMappingsL1.set("23", "netherrack");

// used to upgrade block IDs from blockdesigner v2 (layer2)
let blockNumericIDMappingsL2 = new Map();
blockNumericIDMappingsL2.set("0", "empty");
blockNumericIDMappingsL2.set("1", "daylightDetectorBottom");
blockNumericIDMappingsL2.set("2", "daylightDetectorTop");
blockNumericIDMappingsL2.set("3", "emeraldBlock");
blockNumericIDMappingsL2.set("4", "emeraldOreOld");
blockNumericIDMappingsL2.set("5", "endstoneBrick");
blockNumericIDMappingsL2.set("6", "ironOreOld");
blockNumericIDMappingsL2.set("7", "lapisOre");
blockNumericIDMappingsL2.set("8", "netherBricks");
blockNumericIDMappingsL2.set("9", "obsidian");
blockNumericIDMappingsL2.set("10", "planksOutline");
blockNumericIDMappingsL2.set("11", "prismarineBrick");
blockNumericIDMappingsL2.set("12", "darkPrismarine");
blockNumericIDMappingsL2.set("13", "purpurBrick");
blockNumericIDMappingsL2.set("14", "purpurPillarOld");
blockNumericIDMappingsL2.set("15", "chiselledQuartz");
blockNumericIDMappingsL2.set("16", "quartzPillar");
blockNumericIDMappingsL2.set("17", "quartzOreOld");
blockNumericIDMappingsL2.set("18", "border");
blockNumericIDMappingsL2.set("19", "stoneBrick");
blockNumericIDMappingsL2.set("20", "chiselledStone");
blockNumericIDMappingsL2.set("21", "ironBars");
blockNumericIDMappingsL2.set("22", "netherStem");
blockNumericIDMappingsL2.set("23", "glowLichen");
blockNumericIDMappingsL2.set("24", "glass");
blockNumericIDMappingsL2.set("25", "gildedBlackstone");

// used to upgrade block IDs from blockdesigner v2 (layer3)
let blockNumericIDMappingsL3 = new Map();
blockNumericIDMappingsL3.set("0", "empty");
blockNumericIDMappingsL3.set("1", "grassBlock");
blockNumericIDMappingsL3.set("2", "myceliumBlock");
blockNumericIDMappingsL3.set("3", "vine");
blockNumericIDMappingsL3.set("4", "border");
blockNumericIDMappingsL3.set("5", "ironBars");
blockNumericIDMappingsL3.set("6", "nylium");

let colourIDMappings = new Map();
colourIDMappings.set("0", "#FFFFFF"); // white
colourIDMappings.set("1", "#000000"); // black
colourIDMappings.set("2", "#0000A7"); // dark blue
colourIDMappings.set("3", "#00A700"); // dark green
colourIDMappings.set("4", "#00A7A7"); // dark aqua
colourIDMappings.set("5", "#A70000"); // dark red
colourIDMappings.set("6", "#A700A7"); // dark purple
colourIDMappings.set("7", "#FBA700"); // gold
colourIDMappings.set("8", "#A7A7A7"); // gray
colourIDMappings.set("9", "#545454"); // dark gray
colourIDMappings.set("10", "#5454FB"); // blue
colourIDMappings.set("11", "#54FB54"); // green
colourIDMappings.set("12", "#54FBFB"); // aqua
colourIDMappings.set("13", "#FB5454"); // red
colourIDMappings.set("14", "#FB54FB"); // light purple
colourIDMappings.set("15", "#FBFB54"); // yellow

let colourNameMappings = new Map();
colourNameMappings.set("white", "#FFFFFF"); // white
colourNameMappings.set("black", "#000000"); // black
colourNameMappings.set("dark_blue", "#0000A7"); // dark blue
colourNameMappings.set("dark_green", "#00A700"); // dark green
colourNameMappings.set("dark_aqua", "#00A7A7"); // dark aqua
colourNameMappings.set("dark_red", "#A70000"); // dark red
colourNameMappings.set("dark_purple", "#A700A7"); // dark purple
colourNameMappings.set("gold", "#FBA700"); // gold
colourNameMappings.set("gray", "#A7A7A7"); // gray
colourNameMappings.set("dark_gray", "#545454"); // dark gray
colourNameMappings.set("blue", "#5454FB"); // blue
colourNameMappings.set("green", "#54FB54"); // green
colourNameMappings.set("aqua", "#54FBFB"); // aqua
colourNameMappings.set("red", "#FB5454"); // red
colourNameMappings.set("light_purple", "#FB54FB"); // light purple
colourNameMappings.set("yellow", "#FBFB54"); // yellow

// used to upgrade an array of image links from https://codecrafted.net/blockdesigner to textureIDs
let codecraftedBlockUpgradeMap = new Map();
// layer 1
codecraftedBlockUpgradeMap.set('["layer_1/l1_1.png","layer_1/l1_1.png","layer_1/l1_1.png"]', "clay");
codecraftedBlockUpgradeMap.set('["layer_1/l1_2.png","layer_1/l1_2.png","layer_1/l1_2.png"]', "diamondBlock");
codecraftedBlockUpgradeMap.set('["layer_1/l1_3.png","layer_1/l1_3.png","layer_1/l1_3.png"]', "dirt");
codecraftedBlockUpgradeMap.set('["layer_1/l1_4.png","layer_1/l1_4.png","layer_1/l1_4.png"]', "endstone");
codecraftedBlockUpgradeMap.set('["layer_1/l1_5.png","layer_1/l1_5.png","layer_1/l1_5.png"]', "grassTop");
codecraftedBlockUpgradeMap.set('["layer_1/l1_7.png","layer_1/l1_7.png","layer_1/l1_7.png"]', "logSide");
codecraftedBlockUpgradeMap.set('["layer_1/l1_8.png","layer_1/l1_8.png","layer_1/l1_8.png"]', "logTop");
codecraftedBlockUpgradeMap.set('["layer_1/l1_10.png","layer_1/l1_10.png","layer_1/l1_10.png"]', "clay");
codecraftedBlockUpgradeMap.set('["layer_1/l1_11.png","layer_1/l1_11.png","layer_1/l1_11.png"]', "sandstoneBottom");
codecraftedBlockUpgradeMap.set('["layer_1/l1_12.png","layer_1/l1_12.png","layer_1/l1_12.png"]', "stone");
codecraftedBlockUpgradeMap.set('["layer_1/l1_13.png","layer_1/l1_13.png","layer_1/l1_13.png"]', "andesite");
// layer 2
codecraftedBlockUpgradeMap.set('["layer_2/l2_1.png","layer_2/l2_1.png","layer_2/l2_1.png"]', "daylightDetectorBottom");
codecraftedBlockUpgradeMap.set('["layer_2/l2_2.png","layer_2/l2_2.png","layer_2/l2_2.png"]', "daylightDetectorTop");
codecraftedBlockUpgradeMap.set('["layer_2/l2_3.png","layer_2/l2_3.png","layer_2/l2_3.png"]', "emeraldBlockOld");
codecraftedBlockUpgradeMap.set('["layer_2/l2_4.png","layer_2/l2_4.png","layer_2/l2_4.png"]', "emeraldOreOld");
codecraftedBlockUpgradeMap.set('["layer_2/l2_5.png","layer_2/l2_5.png","layer_2/l2_5.png"]', "endstoneBrick");
codecraftedBlockUpgradeMap.set('["layer_2/l2_6.png","layer_2/l2_6.png","layer_2/l2_6.png"]', "ironOreOld");
codecraftedBlockUpgradeMap.set('["layer_2/l2_7.png","layer_2/l2_7.png","layer_2/l2_7.png"]', "lapisOre");
codecraftedBlockUpgradeMap.set('["layer_2/l2_8.png","layer_2/l2_8.png","layer_2/l2_8.png"]', "netherBrickOutline");
codecraftedBlockUpgradeMap.set('["layer_2/l2_9.png","layer_2/l2_9.png","layer_2/l2_9.png"]', "obsidian");
codecraftedBlockUpgradeMap.set('["layer_2/l2_10.png","layer_2/l2_10.png","layer_2/l2_10.png"]', "planksOutline");
codecraftedBlockUpgradeMap.set('["layer_2/l2_11.png","layer_2/l2_11.png","layer_2/l2_11.png"]', "prismarineBrick");
codecraftedBlockUpgradeMap.set('["layer_2/l2_12.png","layer_2/l2_12.png","layer_2/l2_12.png"]', "darkPrismarine");
codecraftedBlockUpgradeMap.set('["layer_2/l2_13.png","layer_2/l2_13.png","layer_2/l2_13.png"]', "purpurBrick");
codecraftedBlockUpgradeMap.set('["layer_2/l2_14.png","layer_2/l2_14.png","layer_2/l2_14.png"]', "purpurPillarOld");
codecraftedBlockUpgradeMap.set('["layer_2/l2_15.png","layer_2/l2_15.png","layer_2/l2_15.png"]', "chiselledQuartzOld");
codecraftedBlockUpgradeMap.set('["layer_2/l2_16.png","layer_2/l2_16.png","layer_2/l2_16.png"]', "quartzPillar");
codecraftedBlockUpgradeMap.set('["layer_2/l2_17.png","layer_2/l2_17.png","layer_2/l2_17.png"]', "quartzOreOld");
codecraftedBlockUpgradeMap.set('["layer_2/l2_18.png","layer_2/l2_18.png","layer_2/l2_18.png"]', "border");
codecraftedBlockUpgradeMap.set('["layer_2/l2_19.png","layer_2/l2_19.png","layer_2/l2_19.png"]', "stoneBrick");
codecraftedBlockUpgradeMap.set('["layer_2/l2_20.png","layer_2/l2_20.png","layer_2/l2_20.png"]', "chiselledStone");
// layer3
codecraftedBlockUpgradeMap.set('["layer_3/l3_1_2.png","layer_3/l3_1_1.png","layer_3/l3_1_1.png"]', "grassBlock");
codecraftedBlockUpgradeMap.set('["layer_3/l3_2_2.png","layer_3/l3_2_1.png","layer_3/l3_2_1.png"]', "myceliumBlock");
codecraftedBlockUpgradeMap.set('["layer_3/l3_3.png","layer_3/l3_3.png","layer_3/l3_3.png"]', "vine");
