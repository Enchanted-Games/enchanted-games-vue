export { fullVersion, versionInfo, checkForNewVersion, updateShownVersion, updateResourcepackLink, checkForCachedModal, domainName, pathName, blockShareShortURL };

let versionInfo = {
    blockFormatVersion: 4,
    major: 4,
    minor: 0,
    patch: 4,
};
let resourcePackLink = "https://www.dropbox.com/sh/dbabpgcvwtnt8gf/AABsGg5gUyk7DPiuOU0lSN4Da?dl=0";

// returns a protocol and host, example "http://127.0.0.1:5500"
let domainName = window.location.protocol + "//" + window.location.host;
let pathName = window.location.pathname;
let blockShareShortURL = "https://bd.enchanted.games";

let fullVersion = `${versionInfo.major}.${versionInfo.minor}.${versionInfo.patch}`;

function checkForNewVersion(modalToOpen) {
    let lastLoaded = localStorage.getItem("lastLoaded");

    if (lastLoaded != "" && lastLoaded != null && lastLoaded != undefined) {
        lastLoaded = JSON.parse(lastLoaded);
        let num = lastLoaded.major + "." + lastLoaded.minor;
        num = parseFloat(num);

        if (num < parseFloat(versionInfo.major + "." + versionInfo.minor)) {
            // run if theres an update
            window.openModal(modalToOpen);
        }
        if (num > parseFloat(versionInfo.major + "." + versionInfo.minor)) {
            // run if lastLoaded version is greater than the current version
            console.log("You have data from a future version! shhh..");
            localStorage.setItem("lastLoaded", JSON.stringify(versionInfo));
        }
    } else {
        // assume user never visited page before
        localStorage.setItem("lastLoaded", JSON.stringify(versionInfo));
        window.openModal(modalToOpen);
    }

    localStorage.setItem("lastLoaded", JSON.stringify(versionInfo));
}
function updateShownVersion(element) {
    element.innerHTML = element.innerHTML + " - v" + fullVersion;
}
function updateResourcepackLink(element) {
    element.setAttribute("href", resourcePackLink);
}
function checkForCachedModal() {
    let cachedModalID = sessionStorage.getItem("cachedModalID");

    if (cachedModalID != "" && cachedModalID != null && cachedModalID != undefined) {
        // openModal(cachedModalID);
    }
}
