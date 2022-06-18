export { LoadingScreen };

class LoadingScreen {
    constructor(settingsObject) {
        this.background = settingsObject.background;
        this.title = settingsObject.title;
        this.text = settingsObject.text;
        this.bar = settingsObject.bar;
        this.progress = this.bar.value;
        this.status = settingsObject.status;
        this.prefix = settingsObject.prefix;
        this.seperator = settingsObject.seperator;
    }
}
LoadingScreen.prototype.updateStatus = function (newStatus) {
    if (newStatus != 0) {
        // update status in loading screen object
        this.status = newStatus;
        // update html status
        this.text.innerText = this.prefix + this.seperator + this.status;
    }
};
LoadingScreen.prototype.hide = function () {
    // hide background element of loading screen
    this.background.style.display = "none";
};
