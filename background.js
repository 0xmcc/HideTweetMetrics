chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (rxLookfor.test(changeInfo.url)) {
        chrome.tabs.sendMessage(tabId, 'url-update');
    }
});

console.log("testing")
function handleClientLoad() {
// Loads the client library and the auth2 library together for efficiency.
// Loading the auth2 library is optional here since `gapi.client.init` function will load
// it if not already loaded. Loading it upfront can save one network request.
gapi.load('client:auth2', initClient);
}

function initClient() {
	// Initialize the client with API key and People API, and initialize OAuth with an
	// OAuth 2.0 client ID and scopes (space delimited string) to request access.
	gapi.client.init({
	    apiKey: '0a708a169dc7a8f42ba7994d22931e53b9c92730',
	    clientId: '116154727220841949786',
	    scope: 'https://www.googleapis.com/auth/spreadsheets'
	}).then(function () {
	  // Listen for sign-in state changes.
	  gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

	  // Handle the initial sign-in state.
	  updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
	});
}


function appendValues() {
  	var params = {
      'spreadsheetId': '1Tb3m2oQYY2gateUbH-Pkv2QPZC0Db1x5REP6QeVhhME',
      'range': 'Sheet1!A1:D1',
      'valueInputOption': 'RAW',
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
}