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