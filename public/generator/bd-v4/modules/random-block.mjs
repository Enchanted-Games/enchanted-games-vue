import { BlockConfig } from "/generator/bd-v4/modules/block-config.mjs";
export { BlockList };

class BlockList {
    constructor() {
        this.blocksArray = [];
    }
}
BlockList.prototype.addBlock = function (blockURLstring) {
    this.blocksArray.push(
        new BlockConfig({
            generateDefaultOptions: false,
            upgradeURLString: true,
            URLString: blockURLstring,
        })
    );
};

window.blockList1 = new BlockList();
// endstone ore
window.blockList1.addBlock("https://bd.enchanted.games?b0=4&b1=WyI0LjAuMCIsInNhbmRzdG9uZUJvdHRvbSIsIiNGQUZGQjQiLGZhbHNlLCJpcm9uT3JlT2xkIiwiIzJkYzdkYSIsdHJ1ZSwiZ2xvd0xpY2hlbiIsIiNGQUZGQjQiLGZhbHNlLCJFbmRzdG9uZSBPcmUiLCIiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsIiNmZmZmZmYiXQ==");
// dusty bricks
window.blockList1.addBlock("https://bd.enchanted.games?b0=4&b1=WyI0LjAuMCIsImJyaWNrcyIsIiNBRDhDN0YiLGZhbHNlLCJicmlja3NPdXRsaW5lIiwiI0IzOUU4QyIsZmFsc2UsImVuZHN0b25lQnJpY2siLCIjQjM5RThDIixmYWxzZSwiRHVzdHkgQnJpY2tzIiwiQnJpY2tzIHRoYXQgbG9vayB3ZWF0aGVyZWQiLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsIiNFOEIzNzUiXQ==");
// endstone with grass
window.blockList1.addBlock("https://bd.enchanted.games?b0=4&b1=WyI0LjAuMCIsImVuZHN0b25lIiwiI0ZBRkZCNCIsZmFsc2UsImVtcHR5IiwiI0ZGRkZGRiIsZmFsc2UsIm55bGl1bSIsIiMwRUZGRDQiLGZhbHNlLCJFbmRzdG9uZSBXaXRoIEdyYXNzIiwiY29tbWVudCIsZmFsc2UsZmFsc2UsZmFsc2UsdHJ1ZSwiIzUwRjRFMCJd");
// blue bricks
window.blockList1.addBlock("https://bd.enchanted.games?b0=4&b1=WyI0LjAuMCIsInNhbmRzdG9uZUJvdHRvbSIsIiM3RURBRkYiLGZhbHNlLCJuZXRoZXJTdGVtIiwiIzY2QThEMyIsdHJ1ZSwiZW5kc3RvbmVCcmljayIsIiM2NkE4RDMiLGZhbHNlLCJCbHVlIEJyaWNrcyIsIldpdGggZ2xvd2luZyBjcmFja3MiLGZhbHNlLHRydWUsZmFsc2UsZmFsc2UsIiM2NkE4RDMiXQ==");
// glowing emerald
window.blockList1.addBlock("https://bd.enchanted.games?b0=4&b1=WyI0LjAuMCIsImxvZ1RvcCIsIiMzQjc5M0IiLGZhbHNlLCJlbWVyYWxkQmxvY2siLCIjN0VGRjdFIix0cnVlLCJlbWVyYWxkQmxvY2tPbGQiLCIjNTJBNzUyIixmYWxzZSwiR2xvd2luZyBFbWVyYWxkIiwiQW4gZW1lcmFsZCBsb29raW5nIGJsb2NrIHdpdGggZ2xvd2luZyByaW5ncyBpbiB0aGUgbWlkZGxlIixmYWxzZSx0cnVlLGZhbHNlLHRydWUsIiM3REZGN0QiXQ==");
// spruce bookshelf
window.blockList1.addBlock("https://bd.enchanted.games?b0=4&b1=WyI0LjAuMCIsImJvb2tzaGVsZkJhY2siLCIjN0Y1RTM4IixmYWxzZSwiYm9va3MyIiwiIzI3OEFGRiIsZmFsc2UsImJvb2tzMSIsIiM1MkQ5RkYiLGZhbHNlLCJTcHJ1Y2UgQm9va3NoZWxmIiwiIixmYWxzZSxmYWxzZSxmYWxzZSx0cnVlLCIjZmZmZmZmIl0=");
// orange mushroom
window.blockList1.addBlock("https://bd.enchanted.games?b0=4&b1=WyI0LjAuMCIsImJyb3duTXVzaHJvb20iLCIjRkY3ODQwIixmYWxzZSwicmVkTXVzaHJvb21TcG90cyIsIiNGRkUzRTMiLHRydWUsImVtcHR5IiwiIzdFN0VGRiIsZmFsc2UsIk9yYW5nZSBNdXNocm9vbSIsIiIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZSwiI0ZGNzg0MCJd");
// grape bush
window.blockList1.addBlock("https://bd.enchanted.games?b0=4&b1=WyI0LjAuMCIsImFuZGVzaXRlIiwiIzNEODQzQyIsZmFsc2UsImVtZXJhbGRPcmVPbGQiLCIjRTg5N0UzIix0cnVlLCJ2aW5lIiwiIzNEODQzQyIsZmFsc2UsIkdyYXBlIEJ1c2giLCIiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2UsIiNGRkE3RkEiXQ==");
// Cinnamon roll
window.blockList1.addBlock("https://bd.enchanted.games?b0=4&b1=WyI0LjAuMCIsImRlYnJpc1RvcCIsIiNGM0JFOEIiLGZhbHNlLCJlbWVyYWxkT3JlT2xkIiwiI0ZGRkZGRiIsZmFsc2UsImVtcHR5IiwiI0ZGRkZGRiIsZmFsc2UsIkNpbm5hbW9uIHJvbGwgIiwiIix0cnVlLGZhbHNlLGZhbHNlLGZhbHNlLCIjRkZGRkZGIl0=");
// vined melon
window.blockList1.addBlock("https://bd.enchanted.games?b0=4&b1=WyI0LjAuMCIsInB1bXBraW4iLCIjNzREOTI3IixmYWxzZSwibmV0aGVyU3RlbSIsIiM5OUI5MzkiLGZhbHNlLCJpcm9uT3JlIiwiIzk5QjkzOSIsZmFsc2UsIlZpbmVkIE1lbG9uIiwiTWVsb24gd2l0aCB2aW5lcyBncm93aW5nIG9uIGl0IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZSwiI2ZmZmZmZiJd");
// classic copper ore (one of the first blocks i ever made with the block designer)
window.blockList1.addBlock("https://bd.enchanted.games?b0=4&b1=WyI0LjAuMiIsInN0b25lIiwiIzcwNzA3MCIsZmFsc2UsInF1YXJ0ek9yZU9sZCIsIiNEQTgwMkMiLGZhbHNlLCJlbXB0eSIsIiM3RTdFRkYiLGZhbHNlLCJDb3BwZXIgT3JlIiwiQ2xhc3NpYyEiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLCIjREZBNTMwIl0=");

BlockList.prototype.getRandomBlock = function () {
    let randomInt = Math.floor(Math.random() * this.blocksArray.length);

    let randomBlock = this.blocksArray[randomInt];

    return randomBlock;
};

let randomJSColorPicker = new jscolor($q("#randomJSColorPicker"));

BlockList.prototype.getTrulyRandomBlock = function () {
    let chanceForl2empty = 6;
    let chanceForl3empty = 2;

    let randomTex_l1 = textureCollection.getRandomTexture("layer1");
    let randomTexID_l1 = randomTex_l1.textureID;
    let randomColour_l1 = randomJSColorPicker.randomize(30, 100, 0, 100, 0, 100, 1, 1);
    randomColour_l1 = randomJSColorPicker.toHEXString();

    let shouldGetL2Tex = Math.floor(Math.random() * chanceForl2empty);
    let randomTexID_l2 = "empty";
    if (shouldGetL2Tex != 1) {
        let randomTex_l2 = textureCollection.getRandomTexture();
        randomTexID_l2 = randomTex_l2.textureID;
    }
    let randomColour_l2 = randomJSColorPicker.randomize(30, 100, 0, 100, 0, 100, 1, 1);
    randomColour_l2 = randomJSColorPicker.toHEXString();

    let shouldGetL3Tex = Math.floor(Math.random() * chanceForl3empty);
    let randomTexID_l3 = "empty";
    if (shouldGetL3Tex != 1) {
        let randomTex_l3 = textureCollection.getRandomTexture();
        randomTexID_l3 = randomTex_l3.textureID;
    }
    let randomColour_l3 = randomJSColorPicker.randomize(30, 100, 0, 100, 0, 100, 1, 1);
    randomColour_l3 = randomJSColorPicker.toHEXString();

    let randomBlock = new BlockConfig({
        generateDefaultOptions: true,
        upgradeURLString: false,
    });
    randomBlock.layers = {
        layer1: {
            textureID: randomTexID_l1,
            colour: randomColour_l1,
            hasGlint: false,
        },
        layer2: {
            textureID: randomTexID_l2,
            colour: randomColour_l2,
            hasGlint: false,
        },
        layer3: {
            textureID: randomTexID_l3,
            colour: randomColour_l3,
            hasGlint: false,
        },
    };
    randomBlock.generalOptions.blockLore = "Block generated randomly";

    return randomBlock;
};
