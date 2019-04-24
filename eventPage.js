/**var contextMenuItem = {
	"id": "hide Element",
	"title":  "Hide Element",
	"contexts": ["selection"]
};
 
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData) {
	if (clickData.menuItemId == "hide Element" && clickData.selectionText) {
		console.log("success");
		//console.log(clickData.parentMenuItemId);
	}
});**/

/**var rxLookfor = /^https?:\/\/(www\.)?linkedin\.(com|\w\w(\.\w\w)?)\/.*?[?#&]q=/;
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (rxLookfor.test(changeInfo.url)) {
        chrome.tabs.sendMessage(tabId, 'url-update');
    }
});**/
var ci = chrome.identity;

$(document).ready(function () { $("#getAuth").click(function () { getAuth(); });

function getAuth() {
    var access_token;
    var retry = true;
    getToken();
    function getToken() {
        ci.getAuthToken({ interactive: true }, function(token) {
            if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError);
                return;
            }
            access_token = token;
        });
    }

}
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
      chrome.tabs.sendMessage( tabId, {
        message: 'hello!',
        url: changeInfo.url
      })
    }
});
var row;
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.row != undefined) {
      row = request.row
      sendResponse({farewell: "successfully recieved"});
      gapi.load('client', initClient);

    //  init(request.row)
    }
  });


function initClient() {
  // Initialize the client with API key and People API, and initialize OAuth with an
  // OAuth 2.0 client ID and scopes (space delimited string) to request access.
  gapi.client.init({
      apiKey: 'AIzaSyBQEunsfDN962Rdf7BUjgUbDtP3SaemHmo',
     // client_id: '731789194835-tqf53tni0q3iurke9ea96b9425c3vhim.apps.googleusercontent.com',
      client_id: '731789194835-rgdnht4uv51ptimkor48gug901gv8c9r.apps.googleusercontent.com', //test ID CHANGE BEFORE PUBLISH
      scope: 'https://www.googleapis.com/auth/spreadsheets'
  }).then(function() {
      var params = {
        'spreadsheetId': '1Tb3m2oQYY2gateUbH-Pkv2QPZC0Db1x5REP6QeVhhME',
        'range': 'Sheet1!A1:B1',
        'valueInputOption': 'RAW',
        'insertDataOption': 'INSERT_ROWS'
      }

      var valueRangeBody = {"values": [row]}
      // Make an API call to the Sheets API, and append a city
      var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody)
      request.then(function(response) {
          console.log('Successful: ' + response);
      }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
      });
  })
}
/**
function appendValues(arr) {
    var params = {
      'spreadsheetId': '1Tb3m2oQYY2gateUbH-Pkv2QPZC0Db1x5REP6QeVhhME',
      'range': 'Sheet1!A1:B1',
      'valueInputOption': 'RAW',
      'insertDataOption': 'INSERT_ROWS'
    }

    var valueRangeBody = {"values": [arr]}
    // Make an API call to the Sheets API, and append a city
      gapi.client.init({
      apiKey: 'AIzaSyBQEunsfDN962Rdf7BUjgUbDtP3SaemHmo',
      scope: 'https://www.googleapis.com/auth/spreadsheets'
  }) gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
    request.then(function(response) {
      console.log('Successful: ' + response);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
}**/
/**
const jwtClient = new google.auth.JWT(
       privatekey.client_email,
       null,
       privatekey.private_key,
       ['https://www.googleapis.com/auth/spreadsheets']);
//authenticate request
jwtClient.authorize(function (err, tokens) {
 if (err) {
   console.log(err);
   return;
 } else {
   console.log("Successfully connected!");
 }
});
 function updateSigninStatus(isSignedIn) {
        // When signin status changes, this function is called.
        // If the signin status is changed to signedIn, we make an API call.
        if (isSignedIn) {
          appendValues(["bitchbitch"]);
        }
      }


function appendValues(arr) {
    var params = {
      'spreadsheetId': '1Tb3m2oQYY2gateUbH-Pkv2QPZC0Db1x5REP6QeVhhME',
      'range': 'Sheet1!A1:D1',
      'valueInputOption': 'RAW',
      'insertDataOption': 'INSERT_ROWS'
    }
    
    var valueRangeBody = {"values": [arr]}
    // Make an API call to the Sheets API, and append a city
    var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
    request.then(function(response) {
      console.log('Successful');
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
}
function getValues() {
    var params = {
      'spreadsheetId': '1Tb3m2oQYY2gateUbH-Pkv2QPZC0Db1x5REP6QeVhhME',
      'range': 'Sheet1!A1:D1',
      'majorDimension': 'ROWS',
      'insertDataOption': 'INSERT_ROWS'
    }
    
    var valueRangeBody = {"values": []}
    // Make an API call to the Sheets API, and append a city
    var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
    request.then(function(response) {
      console.log('Successful');
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
}**/