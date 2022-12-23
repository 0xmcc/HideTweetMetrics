
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	if(request.ping) { sendResponse({pong: true}); return; }
	console.log("started: " + started)
	// listen for messages sent from background.js
	//if (!started) {
		
		if ((request.status == "complete") && (request.message === 'success')) { 
				console.log("0. Message recieved, new url: " + request.url)
				url = request.url
				if (url) { 
            hideViews()
            hideComments()
						// var observer = new MutationObserver(callbackFunc)
            // if (observerTarget) {observer.observe(observerTarget, config)	} 
            // else { console.log(" NO OBSERVER")}
				}

		} 
		else {
			console.log('failed with message ' + request.message + "|| " + request.url)
			console.log(request)
		}


});




function hideTweetStats(nums) {
  const elementsToRemove = document.querySelectorAll('.r-n6v787');
  // Hide the selected elements
  if (!nums || nums.length == 0) {
    elementsToRemove.forEach(element => element.style.display = 'none');
    elementsToRemove.forEach(element => element.remove());
  } else {
      // Iterate over the selected elements and hide every third element
      for (let i = 0; i < elementsToHide.length; i++) {
        for (num in nums) {
          if (i % num === 0) {
            elementsToRemove[i].style.display = 'none';
            elementsToRemove[i].remove();
          }

        }
      }
  }
}


function hideViews() {
  hideTweetStats(0)
}
function hideComments() {
  hideTweetStats(1)
}
function hideRetweets() {
  hideTweetStats(2)
}
function hideLikes() {
  hideTweetStats(3)
}

// Add a scroll event listener to the window
window.addEventListener('scroll', function() {
  hideTweetStats()
});

// Add a load event listener to the window
window.addEventListener('load', function() {
  hideTweetStats()
});
// function addElement (target) { 
//   // create a new div element 
//   var br = document.createElement("br"); 
//   target.append(br)
//   var newDiv = document.createElement("div"); 
//   var newContent = document.createTextNode("Hi there and greetings!"); 
//   newDiv.appendChild(newContent);  
  
//   var currentDiv = document.getElementById("div1"); 
//   document.body.insertBefore(newDiv, currentDiv); 
// }
// var observerTarget = document.querySelector(".search-results__result-list")
// var config = { subtree: true, childList: true, attributes: false, characterData: true, characterDataOldValue: true }
// //var config = { characterData: false, attributes: false, childList: true, subtree: false };

