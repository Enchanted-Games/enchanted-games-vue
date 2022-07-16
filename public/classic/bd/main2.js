var x;
var width;
var height;
var fg;
var buffer;
var bx;

window.onload = init;
function init() {
    var canvas = document.getElementById("canvas1");
    if (canvas && canvas.getContext) {
        // create offscreen buffer
        buffer = document.createElement("canvas");
        buffer.setAttribute("id", "buffer");
        buffer.width = 112;
        buffer.height = 112;
        bx = buffer.getContext("2d");
    }
    hideSaveBtn();
    turnCube("x", 0);

    // event listeners
    document.querySelector("#diamondblock").addEventListener("click", function () {
        l1_1();
    });
    document.querySelector("#logside").addEventListener("click", function () {
        l1_2();
    });
    document.querySelector("#empty").addEventListener("click", function () {
        l1_r();
    });

    // draw crosses onto canvasses
    l1_r();
}

function tintImg(imgID, colour, canvID) {
    fg = new Image();
    fg = document.getElementById(imgID);

    // set up contexes
    var tcanv = document.getElementById(canvID);
    x = tcanv.getContext("2d");
    bx = buffer.getContext("2d");

    x.imageSmoothingEnabled = false;
    bx.imageSmoothingEnabled = false;

    // check if image is not nothing
    if (imgID == "clearCanv") {
        x.clearRect(0, 0, buffer.width, buffer.height);
        bx.clearRect(0, 0, buffer.width, buffer.height);
        return false;
    }
    // fill the buffer
    bx.clearRect(0, 0, buffer.width, buffer.height);
    bx.fillStyle = colour;
    bx.fillRect(0, 0, buffer.width, buffer.height);
    // draw final img
    bx.globalCompositeOperation = "destination-atop";
    x.globalCompositeOperation = "multiply";
    bx.drawImage(fg, 0, 0);
    x.clearRect(0, 0, buffer.width, buffer.height);
    x.drawImage(fg, 0, 0);
    x.drawImage(buffer, 0, 0);
}
// pickr stuff
const pickr1 = Pickr.create({
    //Build picker1
    el: ".colour-picker-1",
    theme: "monolith",
    default: "#ff0000",
    swatches: ["#FF0000", "#FFAA00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#A800FF", "#FF00FF"],
    components: {
        // Main components
        preview: true,
        opacity: false,
        hue: true,
        // Input / output Options
        interaction: { hex: true, rgba: false, hsla: false, hsva: false, cmyk: false, input: true, clear: false, save: true },
    },
});
const pickr2 = Pickr.create({
    //Build picker2
    el: ".colour-picker-2",
    theme: "monolith",
    default: "#00ff00",
    swatches: ["#FF0000", "#FFAA00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#A800FF", "#FF00FF"],
    components: {
        // Main components
        preview: true,
        opacity: false,
        hue: true,
        // Input / output Options
        interaction: { hex: true, rgba: false, hsla: false, hsva: false, cmyk: false, input: true, clear: false, save: true },
    },
});
const pickr3 = Pickr.create({
    //Build picker3
    el: ".colour-picker-3",
    theme: "monolith",
    default: "#0000ff",
    swatches: ["#FF0000", "#FFAA00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#A800FF", "#FF00FF"],
    components: {
        // Main components
        preview: true,
        opacity: false,
        hue: true,
        // Input / output Options
        interaction: { hex: true, rgba: false, hsla: false, hsva: false, cmyk: false, input: true, clear: false, save: true },
    },
});

var saveBtn1 = document.getElementsByClassName("pcr-save")[0];
var saveBtn2 = document.getElementsByClassName("pcr-save")[1];
var saveBtn3 = document.getElementsByClassName("pcr-save")[2];

function hideSaveBtn() {
    var elements = document.getElementsByClassName("pcr-save");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
}

var selected1 = "-1";
var selected2 = "";
var selected3 = "";

var colour1 = "#ff0000";
var colour2 = "#00ff00";
var colour3 = "#0000ff";

pickr1.on("change", (color) => {
    colour1 = color.toHEXA().toString();
    if (selected1 == "one") {
        l1_1();
    } else if (selected1 == "two") {
        l1_2();
    } else if (selected1 == "-1") {
        l1_r();
    } else {
        l1_r();
    }
    saveBtn1.click();
});

pickr2.on("change", (color) => {
    colour2 = color.toHEXA().toString();
    tintImg("empty", "rgba(0,0,0,0)", "canvas2");
    saveBtn2.click();
});

pickr3.on("change", (color) => {
    colour3 = color.toHEXA().toString();
    tintImg("empty", "rgba(0,0,0,0)", "canvas3");
    saveBtn3.click();
});

// image click functions
function l1_r() {
    selected1 = "one";
    tintImg("empty", "rgba(0,0,0,0)", "canvas1");
    tintImg("clearCanv", "rgba(0,0,0,0)", "canvas1top");
    tintImg("clearCanv", "rgba(0,0,0,0)", "canvas1s1");
    tintImg("clearCanv", "rgba(0,0,0,0)", "canvas1s2");
    tintImg("clearCanv", "rgba(0,0,0,0)", "canvas1s3");
    tintImg("clearCanv", "rgba(0,0,0,0)", "canvas1s4");
    tintImg("clearCanv", "rgba(0,0,0,0)", "canvas1bottom");
}
function l1_1() {
    selected1 = "one";
    tintImg("diamondblock", colour1, "canvas1");
    tintImg("diamondblock", colour1, "canvas1top");
    tintImg("diamondblock", colour1, "canvas1s1");
    tintImg("diamondblock", colour1, "canvas1s2");
    tintImg("diamondblock", colour1, "canvas1s3");
    tintImg("diamondblock", colour1, "canvas1s4");
    tintImg("diamondblock", colour1, "canvas1bottom");
}
function l1_2() {
    selected1 = "two";
    tintImg("logside", colour1, "canvas1");
    tintImg("logside", colour1, "canvas1top");
    tintImg("logside", colour1, "canvas1s1");
    tintImg("logside", colour1, "canvas1s2");
    tintImg("logside", colour1, "canvas1s3");
    tintImg("logside", colour1, "canvas1s4");
    tintImg("logside", colour1, "canvas1bottom");
}

var cubex = -25, // initial rotation
    cubey = -45,
    cubez = 0;
function rotate(variableName, degrees) {
    window[variableName] = window[variableName] + degrees;
    rotCube(cubex, cubey, cubez);
}
function rotCube(degx, degy, degz) {
    segs = "rotateX(" + degx + "deg) rotateY(" + degy + "deg) rotateZ(" + degz + "deg) translateX(0) translateY(0) translateZ(0)";
    // converted from jQuery: $('#D3Cube').css({"transform":segs});
    document.querySelector("#D3Cube").style.transform = segs;
}
function turnCube(dimension, deg) {
    rotate("cube" + dimension, deg);
    console.log(cubex, cubey, cubez);
}

function resetCube() {
    cubex = -25;
    cubey = -45;
    cubez = 0;
    turnCube("x", 0);
}
