// Contains a few functions used accross the website

const defaultColourArr = ["#69304a", "#FFFFFF", "#858585", "#414141", "#8F8F8F"];
var pickrSwatchesArray = ["#CE8F91", "#FEC29E", "#FFD892", "#8FCE97", "#8FCECC", "#8FABCE", "#AF8FCE", "#CE8FBC", "#9A5F61", "#BF8966", "#D7B166", "#5F9A69", "#5F9A99", "#5F799A", "#7E5F9A", "#9A5F88"];
var presetThemes = [
    ["", "", "", "", "", "Custom"],
    ["#b24a79", "#FFFFFF", "#858585", "#414141", "#8F8F8F", "Default (Purple)"],
    ["#9A5F61", "#FFFFFF", "#858585", "#414141", "#8F8F8F", "Red"],
    ["#BF8966", "#FFFFFF", "#858585", "#414141", "#8F8F8F", "Orange"],
    ["#D7B166", "#FFFFFF", "#858585", "#414141", "#8F8F8F", "Yellow"],
    ["#5F9A69", "#FFFFFF", "#858585", "#414141", "#8F8F8F", "Green"],
    ["#5F9A99", "#FFFFFF", "#858585", "#414141", "#8F8F8F", "Teal"],
    ["#5F799A", "#FFFFFF", "#858585", "#414141", "#8F8F8F", "Blue"],
    ["#7E5F9A", "#FFFFFF", "#858585", "#414141", "#8F8F8F", "Purple"],
    ["#9A5F88", "#FFFFFF", "#858585", "#414141", "#8F8F8F", "Pink"],

    ["#B79CE2", "#FFFFFF", "#858585", "#414141", "#8F8F8F", "Classic Pink"],
];

var galleryExpanded = false;
var root = document.documentElement;
var $e = document.getElementById.bind(document);
var $c = document.getElementsByClassName.bind(document);
var $q = document.querySelector.bind(document);
var $a = document.querySelectorAll.bind(document);
var defaultBgUrl = "https://enchanted.games/images/header/bg/1.png";
var useCustomHeaderURL = false;
var headerBgEnabled = false;
var contentLoaded = false;
var clickSound = new Audio("../sounds/btnClick.mp3");
var settingsModal = $q("#settingsMenu");

let codeElements = $a("code[data-auto-select]");
if (codeElements != null && codeElements != undefined) {
    // auto select <code> elements with the data-auto-select attribute
    [...codeElements].forEach((e) => {
        e.setAttribute("tabindex", "1");
        e.addEventListener("click", function () {
            selectTextIn(e);
        });
    });
}
function selectTextIn(node) {
    // fromhttps://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse

    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("WARN: Could not select text in node - Unsupported browser.");
    }
}

function playClickSound(elm) {
    if (elm.getAttribute("disabledBtn") == "true") {
        return false;
    } else {
        if (clickSound.paused) {
            clickSound.play();
        } else {
            clickSound.currentTime = 0;
            setTimeout(() => {
                clickSound.play();
            }, 10);
        }
    }
}

function copyAttribute(attr, elm) {
    attribute = elm.getAttribute(attr);

    copyTextToClipboard(attribute);
    if (attr == "discord_tag") {
        copyTextComplete.display();
    }
}

var coloursLoaded = false;

function openImagePreview(elm, link) {
    var preview;
    if (preview == undefined) {
        preview = document.getElementById("imagePreview");
    }

    if (preview == null) {
        document.body.outerHTML =
            document.body.outerHTML +
            `<div id="imagePreview" class="modal"><!--image preview-->
            <div class="preview-background">
                <div class="preview-holder">
                    <div onclick="closeImagePreview()" class="preview-close">&times;</div>
                    <img draggable="false" src="/images/404.png" onerror="closeImagePreview()" class="preview-image">
                </div>
            </div>
        </div><!--image preview-->`;

        preview = document.getElementById("imagePreview");
    }
    if (link == true) {
        preview.style.display = "block";

        document.getElementsByClassName("preview-image")[0].setAttribute("src", "");
        document.getElementsByClassName("preview-image")[0].setAttribute("src", elm);
    } else {
        preview.style.display = "block";

        document.getElementsByClassName("preview-image")[0].setAttribute("src", "");
        document.getElementsByClassName("preview-image")[0].setAttribute("src", elm.children[0].src);
    }
}

function closeImagePreview() {
    try {
        preview = document.getElementById("imagePreview");
        preview.style.display = "none";
    } catch (e) {
        console.error(e);
    }
}

function manageTextIcons() {
    var spans = $a(".text-icon-new");

    for (let i = 0; i < spans.length; i++) {
        var BGurl = spans[i].getAttribute("data-icon-url");
        if (BGurl !== null) {
            spans[i].setAttribute("style", `background-image: url(${BGurl})`);
            spans[i].removeAttribute("data-icon-url", "");
        }
    }
}

function manageNewPickrs() {
    HTMLTemplate = `
    <div class="content-holder">
        <p class="modal-switch"><strong>Button Text:</strong> </p><div class="pickr-container button-text-pickr-c"><div class="button-text-pickr"></div></div>
    </div>
    `;

    $q("#settingsMenu").children[0].children[1].lastElementChild.outerHTML += HTMLTemplate;
}

function preventImageDragging() {
    var imgs = document.querySelectorAll("img");
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("dragstart", function (event) {
            event.preventDefault();
        });
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    preventImageDragging();
    manageTextIcons();

    opacityValue = getCookie("particleOpacity");
    if (opacityValue == "") {
        opacityValue = 100;
    }

    //create toggle for particles
    var HTMLData = `
    <div class="content-holder particle-settings-holder">
        <p class="modal-switch"><strong>Particles:</strong></p><label class="switch"><input class="particleToggle" oninput="toggleParticles(this)" autocomplete="off" type="checkbox"><span class="slider round"></span></label>
    </div>
    <p class="modal-text particle-settings-holder">Reload the page to properly disable particles.</p>
    <div class="content-holder particle-settings-holder">
        <span class="slider-container">
            <p class="modal-switch"><strong>Particle Opacity</strong></p>
            <span class="slider-text-before"> <strong id="opacityTextValue">${opacityValue}</strong> </span>
            <input type="range" min="0.2" max="1" step="0.10" value="${opacityValue}" class="general-slider" id="opacitySlider">
        </span>
    </div>
    `;

    settingsModal.children[0].children[1].children[2].outerHTML = settingsModal.children[0].children[1].children[2].outerHTML + "</div>" + HTMLData;

    var particleSettingsHolder = $a(".particle-settings-holder");
    for (let i = 0; i < particleSettingsHolder.length; i++) {
        particleSettingsHolder[i].style.display = "none";
    }

    var particlesEnabled = getCookie("particlesEnabled");
    if (particlesEnabled == "" || particlesEnabled == "undefined") {
        particlesEnabled = "true";
        setcookie("particlesEnabled", "true");
    }

    var date = new Date();
    date = date.toString();
    date = date.toLowerCase();

    if (particlesEnabled == "true") {
        if (date.includes("dec 31") || date.includes("jan 1 ")) {
            loadScript("https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js", function () {
                manageParticles("newyear");
            });
        } else if (date.includes("dec")) {
            loadScript("https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js", function () {
                manageParticles("winter");
            });
        }
    }

    var tempColours = getCookie("themeColours");
    generateExtraOptions();
    try {
        document.querySelector("#imagePreview").addEventListener("click", function () {
            closeImagePreview();
        });
    } catch (e) {}
    if (tempColours == "") {
        buildPickrs();
        coloursLoaded = true;
    } else if (tempColours !== "") {
        try {
            var tempColoursArr = JSON.parse(tempColours);
            buildPickrs(tempColoursArr);
            coloursLoaded = true;
        } catch (error) {
            coloursLoaded = true;
        }
    } else {
        buildPickrs();
        coloursLoaded = true;
    }
    handleSwitchStates();
    //$q(".bg-url-holder-modal").setAttribute("oninput", "toggleCustomURL($q('.toggleCustomURL'));$q('#preset-themes').value = 0")
    //$q(".bg-url-holder-modal").addEventListener("change", function change() {
    //    saveColours()
    //})
    contentLoaded = true;

    var opacitySlider = $q("#opacitySlider");
    opacitySlider.addEventListener("input", function () {
        var opacityTextValue = $q("#opacityTextValue");
        opacityTextValue.innerText = opacitySlider.value;
        saveBasicCookies();

        $q("#particle1").style.opacity = opacitySlider.valueAsNumber;
        $q("#particle2").style.opacity = opacitySlider.valueAsNumber;
    });
});

window.onload = function () {
    hideSaveBtn();
    document.querySelector(".container-for-all").style.display = "block";
};

var main_colour = {
    dark: "#242526",
    light: "#FFFFFF",
};
var modal_bg_colour = {
    dark: "#242526",
    light: "#EEEEEE",
};
var main_text_colour = {
    dark: "#ffffff",
    light: "#121212",
};
var modal_text_colour = {
    dark: "#ffffff",
    light: "#121212",
};
var main_text_colour_invert = {
    dark: "#121212",
    light: "#ffffff",
};
var box_text = {
    dark: "#ebebeb",
    light: "#d8d8d8",
};
var MCUIbackgroundColour = {
    dark: "#171717",
    light: "#C6C6C6",
};
var MCUIbackgroundColourFocus = {
    dark: "#303030",
    light: "#D6D6D6",
};
var MCUIborderDarker = {
    dark: "#000000",
    light: "#555555",
};
var MCUIborderLighter = {
    dark: "#484848",
    light: "#FFFFFF",
};
var MCUIinvBackground = {
    dark: "#171717",
    light: "#8B8B8B",
};
var ImageInverttheme = {
    dark: "none()",
    light: "invert()",
};

var newMCUI_textColour = {
    dark: "#ffffff",
    light: "#1e1e1f",
};
var newMCUI_sectionBackground = {
    dark: "#48494a",
    light: "#d0d1d4",
};
var newMCUI_sectionLightBorder = {
    dark: "#6a6c70",
    light: "#ebeced",
};
var newMCUI_sectionDarkBorder = {
    dark: "#1e1e1f",
    light: "#1e1e1f",
};
var newMCUI_bottomShadow = {
    dark: "#313233",
    light: "#58585a",
};
var newMCUI_buttonTextColour = {
    dark: "#ffffff",
    light: "#1e1e1f",
};
var newMCUI_buttonBackground = {
    dark: "#48494a",
    light: "#d0d1d4",
};
var newMCUI_buttonLightBorder = {
    dark: "#6a6c70",
    light: "#ebeced",
};
var newMCUI_buttonDarkBorder = {
    dark: "#1e1e1f",
    light: "#1e1e1f",
};
var newMCUI_buttonBottomShadow = {
    dark: "#313233",
    light: "#58585a",
};
var newMCUI_slotBackgroundColour = {
    dark: "#88898a",
    light: "#b6b6b9",
};

var scrollbar_handle_colour = {
    dark: "#4c4d4d",
    light: "#d9d9d9",
};
var scrollbar_handle_colour_hover = {
    dark: "#58595a",
    light: "#bfbfc0",
};
var scrollbar_background_colour = {
    dark: "#323334",
    light: "#a5a6a7",
};
var scrollbar_button_background_colour = {
    dark: "#323334",
    light: "#a5a6a7",
};
var scrollbar_button_background_colour_hover = {
    dark: "#323334",
    light: "#98999a",
};
var scrollbar_button_arrow_colour = {
    dark: "#4c4d4d",
    light: "#d9d9d9",
};
var scrollbar_button_arrow_colour_hover = {
    dark: "#58595a",
    light: "#bfbfc0",
};

function toggleLightDark(query) {
    saveColours();
    var theme = "dark";
    if (query.checked) {
        theme = "light";
    }

    root.style.setProperty("--scrollbar-handle-colour", scrollbar_handle_colour[theme]);
    root.style.setProperty("--scrollbar-handle-colour-hover", scrollbar_handle_colour_hover[theme]);
    root.style.setProperty("--scrollbar-background-colour", scrollbar_background_colour[theme]);
    root.style.setProperty("--scrollbar-button-background-colour", scrollbar_button_background_colour[theme]);
    root.style.setProperty("--scrollbar-button-background-colour-hover", scrollbar_button_background_colour_hover[theme]);
    root.style.setProperty("--scrollbar-button-arrow-colour", scrollbar_button_arrow_colour[theme]);
    root.style.setProperty("--scrollbar-button-arrow-colour-hover", scrollbar_button_arrow_colour_hover[theme]);

    root.style.setProperty("--main-colour", main_colour[theme]);
    root.style.setProperty("--modal-bg-colour", modal_bg_colour[theme]);
    root.style.setProperty("--main-text-colour", main_text_colour[theme]);
    root.style.setProperty("--modal-text-colour", modal_text_colour[theme]);
    root.style.setProperty("--main-text-colour-invert", main_text_colour_invert[theme]);
    root.style.setProperty("--box-text", main_colour[theme]);

    root.style.setProperty("--MCUIbackgroundColour", MCUIbackgroundColour[theme]);
    root.style.setProperty("--MCUIbackgroundColourFocus", MCUIbackgroundColourFocus[theme]);
    root.style.setProperty("--MCUIborderDarker", MCUIborderDarker[theme]);
    root.style.setProperty("--MCUIborderLighter", MCUIborderLighter[theme]);
    root.style.setProperty("--MCUIinvBackground", MCUIinvBackground[theme]);

    root.style.setProperty("--newMCUI-textColour", newMCUI_textColour[theme]);
    root.style.setProperty("--newMCUI-sectionBackground", newMCUI_sectionBackground[theme]);
    root.style.setProperty("--newMCUI-sectionLightBorder", newMCUI_sectionLightBorder[theme]);
    root.style.setProperty("--newMCUI-sectionDarkBorder", newMCUI_sectionDarkBorder[theme]);
    root.style.setProperty("--newMCUI-bottomShadow", newMCUI_bottomShadow[theme]);
    root.style.setProperty("--newMCUI-buttonTextColour", newMCUI_buttonTextColour[theme]);
    root.style.setProperty("--newMCUI-buttonBackground", newMCUI_buttonBackground[theme]);
    root.style.setProperty("--newMCUI-buttonLightBorder", newMCUI_buttonLightBorder[theme]);
    root.style.setProperty("--newMCUI-buttonDarkBorder", newMCUI_buttonDarkBorder[theme]);
    root.style.setProperty("--newMCUI-buttonBottomShadow", newMCUI_buttonBottomShadow[theme]);
    root.style.setProperty("--newMCUI-slotBackgroundColour", newMCUI_slotBackgroundColour[theme]);

    root.style.setProperty("--image-invert-theme", ImageInverttheme[theme]);

    if (window.location.pathname.includes("/blockdesigner")) {
        //$q(".saved-holder-mcui").setAttribute("data-thememode", theme)
    }
}

function changeCssVariables(val1, val2) {
    root.style.setProperty("--button-text-colour-hover", val1);
    root.style.setProperty("--button-text-shadow-hover", val2);

    const HSLA = header_pickr.getColor().toHSLA();

    // lightens colour
    var HSLAlight = header_pickr.getColor().toHSLA();
    HSLAlight[2] = HSLAlight[2] + 15;

    // slot hilight for newMCUI
    var newMCUI = header_pickr.getColor().toHSLA();
    newMCUI[2] = newMCUI[2] + 20;

    // darkens colour
    var HSLAdark = header_pickr.getColor().toHSLA();
    HSLAdark[2] = HSLAdark[2] - 15;

    root.style.setProperty("--newMCUI-slotBackgroundColourHover", newMCUI);
    root.style.setProperty("--button-background-colour-hover", HSLA);
    root.style.setProperty("--button-hilight-colour-hover", HSLAlight.toString());
    root.style.setProperty("--button-shadow-colour-hover", HSLAdark.toString());
}

function toggleParticles(elm) {
    if (elm.checked == false) {
        $q(".particle-container").style.opacity = 0;
    } else {
        try {
            $q(".particle-container").style.opacity = 1;
        } catch (error) {
            var confirmBox = confirm("Would you like to reload the page to update this setting? Unsaved changes may not be saved.");
            if (confirmBox == true) {
                location.reload();
            } else {
                elm.checked = false;
            }
        }
    }
    saveColours();
}

function expandGallery() {
    if (galleryExpanded == false) {
        const amount = $a(".gallery-image-wrapper-extra").length;
        for (let i = 0; i < amount; i++) {
            $a(".gallery-image-wrapper-extra")[i].setAttribute("data-gallery-hidden", "false");
        }

        $q(".gallery-load-more-text").innerText = "Close Gallery";

        galleryExpanded = true;
    } else if (galleryExpanded == true) {
        const amount = $a(".gallery-image-wrapper-extra").length;
        for (let i = 0; i < amount; i++) {
            $a(".gallery-image-wrapper-extra")[i].setAttribute("data-gallery-hidden", "true");
        }

        $q(".gallery-load-more-text").innerText = "Open Gallery";

        galleryExpanded = false;
    } else {
        console.error("An error occured whilst opening the gallery");
    }
}

function generatePresetThemes() {
    let length = presetThemes.length;
    for (let i = 0; i < length; i++) {
        var theme = presetThemes[i];

        option = document.createElement("option");

        option.setAttribute("theme", theme);
        option.setAttribute("value", i);
        optionName = document.createTextNode(presetThemes[i][5]);
        option.appendChild(optionName);
        $q("#preset-themes").appendChild(option);
    }
}

function presetThemeChange(dropdown) {
    value = dropdown.value;

    // $q(".useDefaultsToggle").checked = false;

    for (let i = 0; i < presetThemes.length; i++) {
        if (dropdown.children[i].value == value) {
            themeData = dropdown.children[i].getAttribute("theme");
            themeArray = themeData.split(",");
            applySavedColours(themeArray);
            break;
        }
    }

    saveColours();
}

function openSettings() {
    document.querySelector("#settingsMenu").style.display = "block";
    if (window.location.pathname.includes("generator/blockdesigner")) {
        for (let i = 0; i < 6; i++) {
            $q(`#side${i + 1}`).style.display = "none";
        }
    }
}
function closeSettings() {
    saveColours();
    document.querySelector("#settingsMenu").style.display = "none";
    if (window.location.pathname.includes("generator/blockdesigner")) {
        for (let i = 0; i < 6; i++) {
            $q(`#side${i + 1}`).style.display = "block";
        }
    }
}

function openLink(query) {
    query2 = query.replace("enchanted-gaming.com", "enchanted.games");

    window.location.href = query2;
}

function pickrChanged() {
    if (coloursLoaded == true) {
        // $q(".useDefaultsToggle").checked = false;

        $q("#preset-themes").value = 0;

        saveColours();
    } else {
    }
}

function saveBasicCookies() {
    date = new Date();
    date = date.toString();
    date = date.toLowerCase();

    if (date.includes("dec") || date.includes("dec 31") || date.includes("jan 1 ")) {
        setcookie("particlesEnabled", $q(".particleToggle").checked);
    } else {
        setcookie("particlesEnabled", true);
    }
    /*setcookie(
        "headerURL",
        headerImgURL
    )*/

    setcookie("particleOpacity", $q("#opacitySlider").value);
}

function saveColours() {
    switchStateArr = [false, false, false, false, false, false];
    switchArrStr = JSON.stringify(switchStateArr);

    // changeCssVariables(header_text_pickr.getColor().toHEXA().toString(), header_sel_text_pickr.getColor().toHEXA().toString());

    //headerImgURL = $q(".bg-url-holder-modal").value
    //headerImgURL = encodeURIComponent(headerImgURL)

    // colourArray = [header_pickr.getColor().toHEXA().toString(), header_text_pickr.getColor().toHEXA().toString(), header_hover_text_pickr.getColor().toHEXA().toString(), header_sel_text_pickr.getColor().toHEXA().toString()];

    // themeColours = JSON.stringify(colourArray);

    // setcookie("themeColours", themeColours);
    // setcookie("switchStates", switchArrStr);

    saveBasicCookies();
}

var useDefaultsTrue = false;
function useDefaults(query) {
    saveColours();
    if (query.checked) {
        root.style.setProperty("--border-colour", defaultColourArr[4]);
        root.style.setProperty("--header-selected", defaultColourArr[3]);
        root.style.setProperty("--header-text-hover", defaultColourArr[2]);
        root.style.setProperty("--header-bg", defaultColourArr[0]);
        root.style.setProperty("--modal-main", defaultColourArr[0]);
        root.style.setProperty("--header-text-colour", defaultColourArr[1]);
        root.style.setProperty("--modal-header-text", defaultColourArr[1]);

        useDefaultsTrue = true;
    } else {
        root.style.setProperty("--border-colour", defaultColourArr[4]);
        root.style.setProperty("--header-selected", defaultColourArr[3]);
        root.style.setProperty("--header-text-hover", defaultColourArr[2]);
        root.style.setProperty("--header-bg", defaultColourArr[0]);
        root.style.setProperty("--modal-main", defaultColourArr[0]);
        root.style.setProperty("--header-text-colour", defaultColourArr[1]);
        root.style.setProperty("--modal-header-text", defaultColourArr[1]);

        useDefaultsTrue = false;
    }
}

function handleSwitchStates() {
    var switchStateCookie = getCookie("switchStates");
    var headerBgURL = getCookie("headerURL");
    var particlesCookie = getCookie("particlesEnabled");
    headerBgURL = decodeURIComponent(headerBgURL);

    if (particlesCookie == "true") {
        $q(".particleToggle").checked = true;
    } else {
        $q(".particleToggle").checked = false;
    }

    if (switchStateCookie == "") {
    } else if (switchStateCookie !== "") {
        var switchStateStr = JSON.parse(switchStateCookie);

        // if (switchStateStr[0] == true) {
        //     $q(".lightDarkToggle").checked = true;
        //     setTimeout(() => {
        //         toggleLightDark($q(".lightDarkToggle"));
        //     }, 1);
        // } else {
        //     $q(".lightDarkToggle").checked = false;
        //     setTimeout(() => {
        //         toggleLightDark($q(".lightDarkToggle"));
        //     }, 1);
        // }

        // if (switchStateStr[1] == true) {
        //     $q(".useDefaultsToggle").checked = true;
        //     setTimeout(() => {
        //         useDefaults($q(".useDefaultsToggle"));
        //     }, 1);
        // } else {
        //     $q(".useDefaultsToggle").checked = false;
        //     setTimeout(() => {
        //         useDefaults($q(".useDefaultsToggle"));
        //     }, 1);
        // }

        if (switchStateStr[3] == true) {
            $q(".toggleHeaderBg").checked = true;
            setTimeout(() => {
                toggleHeaderBg($q(".toggleHeaderBg"));
            }, 200);
        } else {
            $q(".toggleHeaderBg").checked = false;
            setTimeout(() => {
                toggleHeaderBg($q(".toggleHeaderBg"));
            }, 200);
        }

        if (switchStateStr[4] == true) {
            $q(".toggleHeaderDarkerIcons").checked = true;
            setTimeout(() => {
                toggleHeaderDarkerIcons($q(".toggleHeaderDarkerIcons"));
            }, 1);
        } else {
            $q(".toggleHeaderDarkerIcons").checked = false;
            setTimeout(() => {
                toggleHeaderDarkerIcons($q(".toggleHeaderDarkerIcons"));
            }, 1);
        }

        if (switchStateStr[5] == true) {
            $q(".toggleCustomURL").checked = true;
            setTimeout(() => {
                toggleCustomURL($q(".toggleCustomURL"));
                $q(".bg-url-holder-modal").value = headerBgURL;
                $q(".bg-url-holder-modal").setAttribute("invalid", "false");
            }, 1);
        } else {
            $q(".toggleCustomURL").checked = false;
            setTimeout(() => {
                toggleCustomURL($q(".toggleCustomURL"));
            }, 1);
        }
    } else {
    }
}

function hideSaveBtn() {
    // HIDE THE SAVE BUTTON IN PICKRS
    var elements = $c("pcr-save");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.width = "1px";
        elements[i].style.padding = "0px";
        elements[i].style.opacity = "0";
    }
    var elements = $c("pcr-current-color");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.width = "100%";
    }
    var elements = $c("pcr-last-color");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
}

function applySavedColours(optionalArr) {
    saveColours();
    if (optionalArr == undefined || optionalArr == null) {
        var tempColours = getCookie("themeColours");
        var tempColoursArr;
        if (tempColours == "") {
            tempColoursArr = defaultColourArr;
        } else if (tempColours !== "") {
            try {
                tempColoursArr = JSON.parse(tempColours);
            } catch {}
        } else {
            tempColoursArr = defaultColourArr;
        }

        header_pickr.setColor(tempColoursArr[0]), header_text_pickr.setColor(tempColoursArr[1]), header_hover_text_pickr.setColor(tempColoursArr[2]), header_sel_text_pickr.setColor(tempColoursArr[3]);

        changeCssVariables(tempColoursArr[1], tempColoursArr[3]);
    } else {
        if (optionalArr[0] == "null") {
            return false;
        } else {
            header_pickr.setColor(optionalArr[0]), header_text_pickr.setColor(optionalArr[1]), header_hover_text_pickr.setColor(optionalArr[2]), header_sel_text_pickr.setColor(optionalArr[3]);

            changeCssVariables(optionalArr[1], optionalArr[3]);
        }
    }
}

function setcookie(key, val) {
    cookieVal = val + "; SameSite=None; path=/; Secure;" + "expires=" + new Date(new Date().getTime() + 3600 * 1000 * 24 * 365 * 10).toGMTString() + ";";
    document.cookie = key + "=" + cookieVal;
}

function getCookie(cname) {
    // GET A COOKIE
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var header_pickr;
var header_text_pickr;
var header_hover_text_pickr;
var header_sel_text_pickr;

function buildPickrs(colourArray) {
    if (colourArray == undefined) {
        colourArray = defaultColourArr;
    } else {
        colourArray = colourArray;
    }

    header_pickr = Pickr.create({
        el: ".header-pickr",
        theme: "monolith",
        default: colourArray[0],
        swatches: pickrSwatchesArray,
        components: {
            // Main components
            preview: true,
            opacity: false,
            hue: true,
            // Input / output Options
            interaction: {
                hex: true,
                rgba: false,
                hsla: false,
                hsva: false,
                cmyk: false,
                input: true,
                clear: false,
                save: true,
            },
        },
    });
    header_text_pickr = Pickr.create({
        el: ".header-text-pickr",
        theme: "monolith",
        default: colourArray[1],
        swatches: pickrSwatchesArray,
        components: {
            // Main components
            preview: true,
            opacity: false,
            hue: true,
            // Input / output Options
            interaction: {
                hex: true,
                rgba: false,
                hsla: false,
                hsva: false,
                cmyk: false,
                input: true,
                clear: false,
                save: true,
            },
        },
    });
    header_hover_text_pickr = Pickr.create({
        el: ".header-hover-text-pickr",
        theme: "monolith",
        default: colourArray[2],
        swatches: pickrSwatchesArray,
        components: {
            // Main components
            preview: true,
            opacity: false,
            hue: true,
            // Input / output Options
            interaction: {
                hex: true,
                rgba: false,
                hsla: false,
                hsva: false,
                cmyk: false,
                input: true,
                clear: false,
                save: true,
            },
        },
    });
    header_sel_text_pickr = Pickr.create({
        el: ".header-sel-text-pickr",
        theme: "monolith",
        default: colourArray[3],
        swatches: pickrSwatchesArray,
        components: {
            // Main components
            preview: true,
            opacity: false,
            hue: true,
            // Input / output Options
            interaction: {
                hex: true,
                rgba: false,
                hsla: false,
                hsva: false,
                cmyk: false,
                input: true,
                clear: false,
                save: true,
            },
        },
    });

    header_pickr.on("change", function (color) {
        colour = color.toHEXA().toString();
        root.style.setProperty("--header-bg", "#b24a79");
        root.style.setProperty("--modal-main", "#b24a79");

        $q(".header-pickr-c").children[0].children[0].style.color = colour;
    });
    header_pickr.on("changestop", function () {
        header_pickr.applyColor((silent = true), header_pickr.getColor().toHEXA().toString());
    });
    header_pickr.on("swatchselect", function () {
        header_pickr.applyColor((silent = true), header_pickr.getColor().toHEXA().toString());
    });

    header_text_pickr.on("change", function (color) {
        colour = color.toHEXA().toString();
        root.style.setProperty("--header-text-colour", colour);
        root.style.setProperty("--modal-header-text", colour);
        changeCssVariables(colour, header_sel_text_pickr.getColor().toHEXA().toString());

        $q(".header-text-pickr-c").children[0].children[0].style.color = colour;
    });
    header_text_pickr.on("changestop", function () {
        header_text_pickr.applyColor((silent = true), header_text_pickr.getColor().toHEXA().toString());
    });
    header_text_pickr.on("swatchselect", function () {
        header_text_pickr.applyColor((silent = true), header_text_pickr.getColor().toHEXA().toString());
    });

    header_hover_text_pickr.on("change", function (color) {
        colour = color.toHEXA().toString();
        root.style.setProperty("--header-text-hover", colour);

        $q(".header-hover-text-pickr-c").children[0].children[0].style.color = colour;
    });
    header_hover_text_pickr.on("changestop", function () {
        header_hover_text_pickr.applyColor((silent = true), header_hover_text_pickr.getColor().toHEXA().toString());
    });
    header_hover_text_pickr.on("swatchselect", function () {
        header_hover_text_pickr.applyColor((silent = true), header_hover_text_pickr.getColor().toHEXA().toString());
    });

    header_sel_text_pickr.on("change", function (color) {
        colour = color.toHEXA().toString();
        root.style.setProperty("--header-selected", colour);

        changeCssVariables(header_text_pickr.getColor().toHEXA().toString(), colour);

        $q(".header-sel-text-pickr-c").children[0].children[0].style.color = colour;
    });
    header_sel_text_pickr.on("changestop", function () {
        header_sel_text_pickr.applyColor((silent = true), header_sel_text_pickr.getColor().toHEXA().toString());
    });
    header_sel_text_pickr.on("swatchselect", function () {
        header_sel_text_pickr.applyColor((silent = true), header_sel_text_pickr.getColor().toHEXA().toString());
    });

    header_pickr.on("hide", function () {
        saveColours();
        pickrChanged();
    });

    header_text_pickr.on("hide", function () {
        saveColours();
        pickrChanged();
    });

    header_hover_text_pickr.on("hide", function () {
        saveColours();
        pickrChanged();
    });

    header_sel_text_pickr.on("hide", function () {
        saveColours();
        pickrChanged();
    });

    header_sel_text_pickr.on("init", function () {
        applySavedColours();
    });
}

/*
var headerLogo1 = $q(".header-size1").children[0].children[0].children[0],
    headerLink1_1 = $q(".header-size1").children[1].children[0].children[0].children[0],
    headerLink1_2 = $q(".header-size1").children[1].children[1].children[0].children[0],
    headerLink1_3 = $q(".header-size1").children[1].children[2].children[0].children[0],
    headerSettings1 = $q(".header-size1").children[2].children[0].children[0],

    headerLogo2 = $q(".header-size2").children[0].children[0].children[0],
    headerLink2_1 = $q(".header-size2").children[1].children[0].children[0].children[0],
    headerLink2_2 = $q(".header-size2").children[1].children[1].children[0].children[0],
    headerLink2_3 = $q(".header-size2").children[1].children[2].children[0].children[0],
    headerSettings2 = $q(".header-size2").children[2].children[0].children[0],

    header_main_bg = $q(".header-main-holder");
*/

function toggleHeaderBg(toggle, override) {
    /*
    value = $q("#preset-themes").value
    if(toggle.checked && useCustomHeaderURL == false){
    headerBgEnabled = true
        header_main_bg.setAttribute("bgEnabled", "true")
        
        if(value == 0 && contentLoaded == true && override !== true){
            header_main_bg.style.backgroundImage = 'url("https://enchanted.games/images/header/bg/default.png")'
        }else if(value == 0 && contentLoaded == true){

        }else{
            header_main_bg.style.backgroundImage = 'url("https://enchanted.games/images/header/bg/' + value + '.png")'
        }

    }
    else if(toggle.checked && useCustomHeaderURL == true){
        toggleCustomURL(true, true)
    }
    else{
        headerBgEnabled = false
        header_main_bg.setAttribute("bgEnabled", "false")
        header_main_bg.style.backgroundImage = 'none'
    }
    saveColours()
    */
}
function toggleHeaderDarkerIcons(toggle) {
    /*
    if(toggle.checked){
        // Mobile header
        headerLogo1.src = "/images/header/home-invert.png"
        headerLink1_1.src = "/images/header/blockdesigner-invert.png"
        headerLink1_2.src = "/images/header/resourcepack-invert.png"
        headerLink1_3.src = "/images/header/datapack-invert.png"
        headerSettings1.src = "/images/header/settings-invert.png"
                
        // Desktop header
        headerLogo2.style.color = "#404040"
        headerLink2_1.src = "/images/header/blockdesigner-invert.png"
        headerLink2_2.src = "/images/header/resourcepack-invert.png"
        headerLink2_3.src = "/images/header/datapack-invert.png"
        headerSettings2.src = "/images/header/settings-invert.png"

    }else{
        // Mobile header
        headerLogo1.src = "/images/header/home.png"
        headerLink1_1.src = "/images/header/blockdesigner.png"
        headerLink1_2.src = "/images/header/resourcepack.png"
        headerLink1_3.src = "/images/header/datapack.png"
        headerSettings1.src = "/images/header/settings.png"
                
        // Desktop header
        headerLogo2.style.color = "#ffffff"
        headerLink2_1.src = "/images/header/blockdesigner.png"
        headerLink2_2.src = "/images/header/resourcepack.png"
        headerLink2_3.src = "/images/header/datapack.png"
        headerSettings2.src = "/images/header/settings.png"
    }
    saveColours()
    */
}

function toggleCustomURL(toggle, r) {
    /*
    if(toggle.checked == true){
        headerURLtrue()
    }else if(r == true){
        headerURLtrue()
    }
    else{
        useCustomHeaderURL = false
        $q("#header-url").setAttribute("disabledElm", "true")
        $q(".bg-url-holder-modal").setAttribute("disabled", "")

        toggleHeaderBg($q('.toggleHeaderBg'), true)
    }
    */
}

function headerURLtrue() {
    /*useCustomHeaderURL = true
    $q("#header-url").removeAttribute("disabledElm")
    $q(".bg-url-holder-modal").removeAttribute("disabled")

    headerURL = $q(".bg-url-holder-modal").value

    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    if(pattern.test(headerURL)){
        $q(".bg-url-holder-modal").setAttribute("invalid", "false")
    }else{
        $q(".bg-url-holder-modal").setAttribute("invalid", "true")
        return false;
    }

    header_main_bg.setAttribute("bgEnabled", "true")
    header_main_bg.style.backgroundImage = 'url("' + headerURL + '")'
    */
}

function generateExtraOptions() {
    settingsModal = $q("#settingsMenu");

    newElements = '<p style="display:none;" style="display:none;" class="modal-break"></p><div style="display:none;"  class="content-holder"><p style="display:none;" class="modal-switch"><strong>Header Background:</strong></p><label style="display:none;"  class="switch"><input style="display:none;"  class="toggleHeaderBg" oninput="toggleHeaderBg(this)" autocomplete="off" type="checkbox"><span class="slider round"></span></label></div><div style="display:none;"  class="content-holder"><p style="display:none;" class="modal-switch"><strong>Darker Header Icons:</strong></p><label style="display:none;"  class="switch"><input style="display:none;"  autocomplete="off" type="checkbox" class="toggleHeaderDarkerIcons" oninput="toggleHeaderDarkerIcons(this)"><span class="slider round"></span></label></div><div style="display:none;"  class="content-holder"><p style="display:none;" class="modal-switch"><strong>Use Custom URL:</strong></p><label style="display:none;"  class="switch"><input style="display:none;"  autocomplete="off" type="checkbox" class="toggleCustomURL" oninput="toggleCustomURL(this)"><span class="slider round"></span></label></div><span id="header-url" disabledElm="true" class="modal-input-wrapper" ><p style="display:none;" style="font-weight: bold; " class="modal-text">Background URL&nbsp;</p><input style="display:none;"  type="text" class="modal-text modal-input bg-url-holder-modal" autocomplete="off" disabled placeholder="Optional URL"></span>';

    settingsModal.children[0].children[1].innerHTML = settingsModal.children[0].children[1].innerHTML + newElements;
}

function toggleList() {
    var listElm = $q(".hideable-list");
    var listElmHidden;
    if (listElm !== null || listElm !== undefined) {
        listElmHidden = listElm.getAttribute("data-hidden-elm");
    }
    if (listElmHidden == "true") {
        listElm.setAttribute("data-hidden-elm", "false");
    } else {
        listElm.setAttribute("data-hidden-elm", "true");
    }
}

function loadScript(url, callback) {
    var head = document.head;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    // Fire the loading
    head.appendChild(script);

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;
}

function manageParticles(type) {
    var particleSettingsHolder = $a(".particle-settings-holder");
    for (let i = 0; i < particleSettingsHolder.length; i++) {
        particleSettingsHolder[i].style.display = "block";
    }
    // create divs for particles
    var particle1 = document.createElement("div");
    particle1.setAttribute("id", "particle1");
    particle1.setAttribute("class", "particle-canv-holder");
    particle1.style.opacity = opacitySlider.valueAsNumber;
    var particle2 = document.createElement("div");
    particle2.setAttribute("id", "particle2");
    particle2.setAttribute("class", "particle-canv-holder");
    particle2.style.opacity = opacitySlider.valueAsNumber;

    //create particle container
    var particlecontainer = document.createElement("div");
    particlecontainer.setAttribute("class", "particle-container");
    particlecontainer.appendChild(particle1);
    particlecontainer.appendChild(particle2);

    document.body.prepend(particlecontainer);

    if (type == "winter") {
        particlesJS.load("particle1", "/json/particles/snow1.json");
        particlesJS.load("particle2", "/json/particles/snow2.json");
    } else if (type == "newyear") {
        particlesJS.load("particle1", "/json/particles/newyear.json");
    }
}

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(
        function () {
            console.log("Async: Copying to clipboard was successful!");
        },
        function (err) {
            console.error("Async: Could not copy text: ", err);
        }
    );
}
