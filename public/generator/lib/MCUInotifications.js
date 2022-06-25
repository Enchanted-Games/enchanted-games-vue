var root = document.documentElement;
var $e = document.getElementById.bind(document);
var $c = document.getElementsByClassName.bind(document);
var $q = document.querySelector.bind(document);
var $a = document.querySelectorAll.bind(document);

var imglink = "https://dev.enchanted.games/images/temp/yosh1.png";
var imglink2 = "https://dev.enchanted.games/images/temp/yosh2.png";

var maincontainer = undefined;
var firstFlyoutCreated = false;
var slideIntime;

// check if user disabled animations
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (!reducedMotion || reducedMotion.matches) {
    slideIntime = 0;
} else {
    slideIntime = 750;
}

const themesMap = new Map();
themesMap.set("default", {
    background: "#171717",
    text_colour: "#ffffff",
    light_border: "#484848",
    dark_border: "#000000",
});
themesMap.set("success", {
    background: "#346b24",
    text_colour: "#ffffff",
    light_border: "#58b73d",
    dark_border: "#27501b",
});
themesMap.set("error", {
    background: "#6b2424",
    text_colour: "#ffffff",
    light_border: "#b73d3d",
    dark_border: "#501b1b",
});
themesMap.set("info", {
    background: "#171717",
    text_colour: "#ffffff",
    light_border: "#ae8ecd",
    dark_border: "#543a6d",
});

const defaultsMap = new Map();
defaultsMap.set("duration", 2000);
defaultsMap.set("silent", true);
defaultsMap.set("flyout_title", "Default Title");
defaultsMap.set("flyout_body", "Default Body");
defaultsMap.set("show_image", false);
defaultsMap.set("image_url", "https://enchanted.games/images/404.png");
defaultsMap.set("font", "Arial");
defaultsMap.set("type", "default");
defaultsMap.set("custom_theme", themesMap.get("default"));
defaultsMap.set("showClose", true);

function checkForUndefined(value) {
    if (value.silent !== undefined) {
        return value;
    } else {
        return defaultsMap.get();
    }
}

class Flyout {
    constructor(settingsObject) {
        const notification_object = this;

        if (settingsObject.duration !== undefined) {
            this.duration = settingsObject.duration;
        } else {
            this.duration = defaultsMap.get("duration");
        }
        if (settingsObject.silent !== undefined) {
            this.silent = settingsObject.silent;
        } else {
            this.silent = defaultsMap.get("silent");
        }

        if (settingsObject.flyout_title !== undefined) {
            this.flyout_title = settingsObject.flyout_title;
        } else {
            this.flyout_title = defaultsMap.get("flyout_title");
        }
        if (settingsObject.flyout_body !== undefined) {
            this.flyout_body = settingsObject.flyout_body;
        } else {
            this.flyout_body = defaultsMap.get("flyout_body");
        }

        if (settingsObject.show_image !== undefined) {
            this.show_image = settingsObject.show_image;
        } else {
            this.show_image = defaultsMap.get("show_image");
        }
        if (settingsObject.image_url !== undefined) {
            this.image_url = settingsObject.image_url;
        } else {
            this.image_url = defaultsMap.get("image_url");
        }

        if (settingsObject.font !== undefined) {
            this.font = settingsObject.font;
        } else {
            this.font = defaultsMap.get("font");
        }
        if (settingsObject.type !== undefined) {
            this.type = settingsObject.type;
        } else {
            this.type = defaultsMap.get("type");
        }
        if (settingsObject.custom_theme !== undefined) {
            this.custom_theme = settingsObject.custom_theme;
        } else {
            this.custom_theme = defaultsMap.get("custom_theme");
        }

        if (settingsObject.is_currently_visible !== undefined) {
            this.is_currently_visible = settingsObject.is_currently_visible;
        } else {
            this.is_currently_visible = defaultsMap.get("is_currently_visible");
        }

        if (settingsObject.showClose !== undefined) {
            this.showClose = settingsObject.showClose;
        } else {
            this.showClose = defaultsMap.get("showClose");
        }

        this.waitTimer = undefined;
        this.removeTimer = undefined;

        const notification_container = document.createElement("div");
        notification_container.setAttribute("class", "flyout-container");

        const notification_body = document.createElement("div");
        notification_body.setAttribute("class", "flyout-background");

        var getThemeColours = themesMap.get(this.type);
        var finalFont = this.font;
        if (finalFont == undefined) {
            finalFont = "Ariel";
        } else if (finalFont == "Mojangles") {
            finalFont = `${finalFont}, Mojangles_fallback`;
        }

        if (this.type !== "custom") {
            // apply theme colours directly to flyout_background
            if (getThemeColours == undefined) {
                getThemeColours = themesMap.get("default");
            }
            notification_body.style = `
                --theme_background: ${getThemeColours.background};
                --theme_text_colour: ${getThemeColours.text_colour};
                --theme_light_border: ${getThemeColours.light_border};
                --theme_dark_border: ${getThemeColours.dark_border};
                --theme_font_family: ${finalFont};
            `;
        } else {
            // apply custom theme colours directly to flyout_background
            getThemeColours = this.custom_theme;
            notification_body.style = `
                --theme_background: ${getThemeColours.background};
                --theme_text_colour: ${getThemeColours.text_colour};
                --theme_light_border: ${getThemeColours.light_border};
                --theme_dark_border: ${getThemeColours.dark_border};
                --theme_font_family: "${finalFont}";
            `;
        }

        if (this.show_image) {
            const notification_image = document.createElement("img");
            notification_image.setAttribute("class", "flyout-image");
            notification_image.setAttribute("src", this.image_url);

            notification_body.appendChild(notification_image);
        }

        const notification_text_holder = document.createElement("div");
        notification_text_holder.setAttribute("class", "flyout-text-holder");

        const notification_text_title = document.createElement("p");
        notification_text_title.setAttribute("class", "flyout-title flyout-text");
        notification_text_title.appendChild(document.createTextNode(this.flyout_title));
        notification_text_holder.appendChild(notification_text_title);

        const notification_text_body = document.createElement("p");
        notification_text_body.setAttribute("class", "flyout-body flyout-text");
        notification_text_body.appendChild(document.createTextNode(this.flyout_body));
        notification_text_holder.appendChild(notification_text_body);

        notification_body.appendChild(notification_text_holder);
        notification_container.appendChild(notification_body);

        if (this.showClose) {
            const notification_close_button = document.createElement("span");
            notification_close_button.setAttribute("class", "flyout-close");
            notification_close_button.appendChild(document.createTextNode("×"));
            notification_close_button.addEventListener("click", function () {
                notification_object.hide();
            });
            notification_body.appendChild(notification_close_button);
        }

        this.flyout_container = notification_container;

        if (!firstFlyoutCreated) {
            const flyouts_holder = document.createElement("div");
            flyouts_holder.setAttribute("class", "flyouts-holder");
            var content_container = $q(".container-for-all");
            if (content_container == null || content_container == undefined) {
                document.body.appendChild(flyouts_holder);
            } else {
                content_container.appendChild(flyouts_holder);
            }

            maincontainer = flyouts_holder;
        }

        firstFlyoutCreated = true;
    }
}

Flyout.prototype.hide = function () {
    if (this.waitTimer !== undefined) {
        clearTimeout(this.waitTimer);
    }
    if (this.removeTimer !== undefined) {
        clearTimeout(this.removeTimer);
    }

    var animation_template = `animation: flyout_out ${slideIntime}ms ease-in-out forwards;`;
    this.flyout_container.style = animation_template;

    this.removeTimer = setTimeout(() => {
        try {
            maincontainer.removeChild(this.flyout_container);
        } catch {}
    }, slideIntime);

    this.is_currently_visible = false;
};

Flyout.prototype.display = function () {
    //openImagePreview(this.link, true)
    var animation_template = `animation: flyout_in ${slideIntime}ms ease-in-out forwards;`;

    maincontainer.prepend(this.flyout_container);
    this.flyout_container.style = animation_template;

    noti_timingFunctions(this);

    this.is_currently_visible = true;
};
function noti_timingFunctions(object) {
    if (object.waitTimer !== undefined) {
        clearTimeout(object.waitTimer);
    }
    if (object.removeTimer !== undefined) {
        clearTimeout(object.removeTimer);
    }

    object.waitTimer = setTimeout(() => {
        var animation_template = `animation: flyout_out ${slideIntime}ms ease-in-out forwards;`;
        object.flyout_container.style = animation_template;

        object.removeTimer = setTimeout(() => {
            try {
                maincontainer.removeChild(object.flyout_container);
            } catch {}
        }, slideIntime);

        this.is_currently_visible = false;
    }, object.duration + slideIntime);
}

/*
const example_flyout = new Flyout({
        // -- Basic Settings
        duration: 2000, // how long the flyout will be displayed for
        silent: true, // if false a sound will be played (UNUSED)

        // -- Text Content
        flyout_title: "A Title", // flyout title
        flyout_body: "Text", // flyout text

        // -- Image Settings
        show_image: false, // if false no image will be shown
        image_url: "url", // icon will be to the left of the text and should bea multiple of 8

        // -- Style Settings
        font: "Mojangles", // takes in a css font-family example: "sans-serif"
        type: "error", // can be "default", "error", "success", "info", "custom"
                // if custom the below theme will be used
        custom_theme: {
            background: "",
            text_colour: "",
            light_border: "",
            dark_border: ""
        }

    }
)
*/
