var accessToken = "";

function projectStats(project_slug) {
    console.log(project_slug)
    // https://minecraft.curseforge.com/api/maven/cofhcore/CoFHCore-1.10.2/release/CoFHCore-1.10.2-release-universal.jar
    var fetchUrl = 'https://www.curseforge.com/minecraft/texture-packs/waterlogged.html';
    console.log(fetchUrl)
    var headers = {
      "Access-Control-Allow-Origin": "https://www.curseforge.com"
    };
    var params = {
      'method' : 'get',
      'headers' : headers
    };
    var response = fetch(fetchUrl, params);
    console.log(response);
    var clickCount = JSON.parse(response.getContentText()).total_clicks;
    return clickCount;
  }

var bitlyIDarray = [
    "waterlogged"
]
var totalClicksFinal = 0

document.addEventListener('DOMContentLoaded', function(event){
    /*bitlyIDarray.forEach(function(e){
        //var resp = fetch('https://minecraft.curseforge.com/api/projects' + '', {
            headers: {
                //'X-Api-Token': accessToken
            }
        //});
        var resp = projectStats("waterlogged")
        resp.then(response => response.json())
        .then(data => {
            data["link_clicks"].forEach(function(e){
                totalClicksFinal = totalClicksFinal + e.clicks
                document.getElementsByClassName("loading-holder")[0].innerText = totalClicksFinal
            })
        });
    })*/
})

function openNew(text){
    fetch("https://www.curseforge.com/", {
        "credentials": "include",
        "headers": {
            "Accept": "text/html",
            "Accept-Language": "en-GB,en;q=0.5",
            "Alt-Used": "www.curseforge.com",
            "Upgrade-Insecure-Requests": "1",
            "Cache-Control": "max-age=0"
        },
        "referrer": "http://127.0.0.1:5500/",
        "method": "GET",
        "mode": "cors"
    });
    
}