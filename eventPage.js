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

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
      chrome.tabs.sendMessage( tabId, {
        message: 'hello!',
        url: changeInfo.url
      })
    }
});