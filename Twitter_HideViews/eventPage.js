
// Background


$(window).on('load', function() {
  console.log("STARTING SHIT")
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    //if (changeInfo.status === "complete") {
      var url = changeInfo.url || tab.url
      console.log("URL: " + isValidURL(url))
      if (isValidURL(url)) {
        if (changeInfo.status == "complete") {
         ensureSendMessage(tabId, { message: 'success', url: url, status: changeInfo.status})
        }
      }
      else {
        ensureSendMessage(tabId, { message: 'fail'})
      }
    });
  });
  $(window).on('scroll', function() {
    console.log("STARTING SHIT")
      chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      //if (changeInfo.status === "complete") {
        var url = changeInfo.url || tab.url
        console.log("URL: " + isValidURL(url))
        if (isValidURL(url)) {
          if (changeInfo.status == "complete") {
           ensureSendMessage(tabId, { message: 'success', url: url, status: changeInfo.status})
          }
        }
        else {
          ensureSendMessage(tabId, { message: 'fail'})
        }
      });
    });

  
function ensureSendMessage(tabId, message, callback){
  chrome.tabs.sendMessage(tabId, {ping: true}, function(response){
    if(response && response.pong) { // Content script ready
      chrome.tabs.sendMessage(tabId, message, callback);
    } else { // No listener on the other end
      chrome.tabs.executeScript(tabId, {file: "jquery-3.3.1.min.js"}, function(){

        chrome.tabs.executeScript(tabId, {file: "content.js"}, function(){
          if(chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            throw Error("Unable to inject script into tab " + tabId);
          }
          // OK, now it's injected and ready
          chrome.tabs.sendMessage(tabId, message, callback);
        });
      });
    }
  });
}
function isValidURL(url){
  console.log('isValidURL', url)
  if (url == null) { return false }
  return (url.includes("twitter.com"))
}



