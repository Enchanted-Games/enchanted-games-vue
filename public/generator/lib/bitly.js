var accessToken = "2f5fdeeca8223cc7367bc91770006b00657a226a";

function bitlyGroupId() {
    var headers = {"Authorization" : "Bearer "+accessToken};
    var params = {"headers" : headers};
    var fetchUrl = "https://api-ssl.bitly.com/v4/groups";
    var response = /*UrlFetchApp.*/fetch(fetchUrl, params);
    var group_guid = JSON.parse(response.getContentText()).groups[0].guid;
    Logger.log(group_guid)
    return group_guid
}

/*function bitlyStats(bitlink_id) {
    // bitlink_id should not be in the form bit.ly/xxxxxx
    // or something lik var bitlink_id = bitly_url.substring(8);
    var fetchUrl = "https://api-ssl.bitly.com/v4/bitlinks/bit.ly/"+bitlink_id+"/clicks";
    var headers = {
      "Authorization": "Bearer "+ accessToken,
      "Content-Type": "application/json",
    };
    var params = {
      "method" : "get",
      "headers" : headers,
    };
    var response = fetch(fetchUrl, params);
    console.log(response)
    //var clickCount = JSON.parse(response.getContentText()).total_clicks;
    //return clickCount;
}*/

function bitlyStats(bitlinka) {
    var bitlink = 'bit.ly/' + bitlinka; //  Please set your sample shortened URL here.
  
    console.log(bitlink)
    var fetchUrl = 'https://api-ssl.bitly.com/v4/bitlinks/' + bitlink + '/clicks';
    console.log(fetchUrl)
    var headers = {
      'Authorization': 'Bearer '+ accessToken,
    };
    var params = {
      'method' : 'get',
      'headers' : headers,
      'muteHttpExceptions' : true
    };
    var response = fetch(fetchUrl, params);
    console.log(response);
    var clickCount = JSON.parse(response.getContentText()).total_clicks;
    return clickCount;
  }

var totalClicksFinal = 0