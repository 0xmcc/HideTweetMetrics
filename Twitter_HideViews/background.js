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


/**

function retrieveCity(city) {
  if (city in mem) {
    timezone = mem[city]
    appendTimeElementFromTZ(timezone)
    console.log('city found in memory')
  } 
  else {
    console.log('proceed as normal')
    console.log("CITY: " + city)

    var area = parseArea(city)
    var baseURL = createURLFromArea(area)

    console.log("VISITING: " + baseURL)
    fetch(baseURL)
    .then(data => {return data.json()})
    .then(function(res) {
      if (res.status == "OK") {
        const results = groupByTimeZones(res.zones)
        if (Object.keys(results).length == 1) {
          let key = Object.keys(results)[0]
          console.log("all cities in same timezone")
          return parseClockFromJSON(results[key][0])
        } else {
          console.log(res.zones)
          var label = `Search for "${area}" is too broad. Please use the button near the search bar`
          return appendTimeDIVToDOM(null, label)
        }
      } else if (res.status == "FAILED") {
        var label = `Timezone for "${area}" Not Found Please use the button near the search bar`
        console.log(label)
        return appendTimeDIVToDOM(null, label)
      }
    })
    .then(function(time) {
      if (time) {
        console.log("Time: " + time)
        appendTimeElement(time);
      }
    })
  }
}**/