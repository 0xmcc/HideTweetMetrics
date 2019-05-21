/**
This chrome utilizes the TimezoneDB API to look up timezones by city names
**/

var salesNavTopCity = $('.profile-position__company-location').text().trim().toLowerCase();
var salesNavBottomCity = $('.profile-position__company-location').text().trim().toLowerCase();


var one = $('.pv-top-card-section__location').text().trim().toLowerCase();
var two = $('.pv-entity__location:first').children().last().text().trim().toLowerCase();

const OPEN_HOUR = 9
const CLOSE_HOUR = 17
var countryDict = {"afghanistan":"AF","aland islands":"AX","albania":"AL","algeria":"DZ","american samoa":"AS","andorra":"AD","angola":"AO","anguilla":"AI","antarctica":"AQ","antigua and barbuda":"AG","argentina":"AR","armenia":"AM","aruba":"AW","australia":"AU","austria":"AT","azerbaijan":"AZ","bahamas":"BS","bahrain":"BH","bangladesh":"BD","barbados":"BB","belarus":"BY","belgium":"BE","belize":"BZ","benin":"BJ","bermuda":"BM","bhutan":"BT","bolivia":"BO","bonaire, saint eustatius and saba":"BQ","bosnia and herzegovina":"BA","botswana":"BW","bouvet island":"BV","brazil":"BR","british indian ocean territory":"IO","british virgin islands":"VG","brunei":"BN","bulgaria":"BG","burkina faso":"BF","burundi":"BI","cambodia":"KH","cameroon":"CM","canada":"CA","cape verde":"CV","cayman islands":"KY","central african republic":"CF","chad":"TD","chile":"CL","china":"CN","christmas island":"CX","cocos islands":"CC","colombia":"CO","comoros":"KM","cook islands":"CK","costa rica":"CR","croatia":"HR","cuba":"CU","curaçao":"CW","cyprus":"CY","czech republic":"CZ","democratic republic of the congo":"CD","denmark":"DK","djibouti":"DJ","dominica":"DM","dominican republic":"DO","east timor":"TL","ecuador":"EC","egypt":"EG","el salvador":"SV","equatorial guinea":"GQ","eritrea":"ER","estonia":"EE","ethiopia":"ET","falkland islands":"FK","faroe islands":"FO","fiji":"FJ","finland":"FI","france":"FR","french guiana":"GF","french polynesia":"PF","french southern territories":"TF","gabon":"GA","gambia":"GM","georgia":"GE","germany":"DE","ghana":"GH","gibraltar":"GI","greece":"GR","greenland":"GL","grenada":"GD","guadeloupe":"GP","guam":"GU","guatemala":"GT","guernsey":"GG","guinea":"GN","guinea-bissau":"GW","guyana":"GY","haiti":"HT","heard island and mcdonald islands":"HM","honduras":"HN","hong kong":"HK","hungary":"HU","iceland":"IS","india":"IN","indonesia":"ID","iran":"IR","iraq":"IQ","ireland":"IE","isle of man":"IM","israel":"IL","italy":"IT","ivory coast":"CI","jamaica":"JM","japan":"JP","jersey":"JE","jordan":"JO","kazakhstan":"KZ","kenya":"KE","kiribati":"KI","kosovo":"XK","kuwait":"KW","kyrgyzstan":"KG","laos":"LA","latvia":"LV","lebanon":"LB","lesotho":"LS","liberia":"LR","libya":"LY","liechtenstein":"LI","lithuania":"LT","luxembourg":"LU","macao":"MO","macedonia":"MK","madagascar":"MG","malawi":"MW","malaysia":"MY","maldives":"MV","mali":"ML","malta":"MT","marshall islands":"MH","martinique":"MQ","mauritania":"MR","mauritius":"MU","mayotte":"YT","mexico":"MX","micronesia":"FM","moldova":"MD","monaco":"MC","mongolia":"MN","montenegro":"ME","montserrat":"MS","morocco":"MA","mozambique":"MZ","myanmar":"MM","namibia":"NA","nauru":"NR","nepal":"NP","netherlands":"NL","netherlands antilles":"AN","new caledonia":"NC","new zealand":"NZ","nicaragua":"NI","niger":"NE","nigeria":"NG","niue":"NU","norfolk island":"NF","north korea":"KP","northern mariana islands":"MP","norway":"NO","oman":"OM","pakistan":"PK","palau":"PW","palestinian territory":"PS","panama":"PA","papua new guinea":"PG","paraguay":"PY","peru":"PE","philippines":"PH","pitcairn":"PN","poland":"PL","portugal":"PT","puerto rico":"PR","qatar":"QA","republic of the congo":"CG","reunion":"RE","romania":"RO","russia":"RU","rwanda":"RW","saint barthélemy":"BL","saint helena":"SH","saint kitts and nevis":"KN","saint lucia":"LC","saint martin":"MF","saint pierre and miquelon":"PM","saint vincent and the grenadines":"VC","samoa":"WS","san marino":"SM","sao tome and principe":"ST","saudi arabia":"SA","senegal":"SN","serbia":"RS","serbia and montenegro":"CS","seychelles":"SC","sierra leone":"SL","singapore":"SG","sint maarten":"SX","slovakia":"SK","slovenia":"SI","solomon islands":"SB","somalia":"SO","south africa":"ZA","south georgia and the south sandwich islands":"GS","south korea":"KR","south sudan":"SS","spain":"ES","sri lanka":"LK","sudan":"SD","suriname":"SR","svalbard and jan mayen":"SJ","swaziland":"SZ","sweden":"SE","switzerland":"CH","syria":"SY","taiwan":"TW","tajikistan":"TJ","tanzania":"TZ","thailand":"TH","togo":"TG","tokelau":"TK","tonga":"TO","trinidad and tobago":"TT","tunisia":"TN","turkey":"TR","turkmenistan":"TM","turks and caicos islands":"TC","tuvalu":"TV","u.s. virgin islands":"VI","uganda":"UG","ukraine":"UA","united arab emirates":"AE","united kingdom":"GB","united states":"US","united states minor outlying islands":"UM","uruguay":"UY","uzbekistan":"UZ","vanuatu":"VU","vatican":"VA","venezuela":"VE","vietnam":"VN","wallis and futuna":"WF","western sahara":"EH","yemen":"YE","zambia":"ZM","zimbabwe":"ZW"}
var regionDict = {"alaska":"AK", "alabama":"AL","arkansas":"AR","arizona":"AZ","california":"CA","colorado":"CO","connecticut":"CT","washington, d.c.":"DC","delaware":"DE","florida":"FL","georgia":"GA","hawaii":"HI","iowa":"IA","idaho":"ID","illinois":"IL","indiana":"IN","kansas":"KS","kentucky":"KY","louisiana":"LA","massachusetts":"MA","maryland":"MD","maine":"ME","michigan":"MI","minnesota":"MN","missouri":"MO","mississippi":"MS","montana":"MT","north carolina":"NC","north dakota":"ND","nebraska":"NE","new hampshire":"NH","new jersey":"NJ","new mexico":"NM","nevada":"NV","new york":"NY","ohio":"OH","oklahoma":"OK","oregon":"OR","pennsylvania":"PA","rhode island":"RI","south carolina":"SC","south dakota":"SD","tennessee":"TN","texas":"TX","utah":"UT","virginia":"VA","vermont":"VT","washington":"WA","wisconsin":"WI","west virginia":"WV","wyoming":"WY"}
var city;
var mem;
var timezone;
var url;
var started = false;
var customDiv = $('.time')
//const validURLs = ["linkedin.com/sales/people", "linkedin.com/sales/search/people/list/employees-for-account/", "linkedin.com/in/"]
// Read it using the storage API
/**
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.ping) { sendResponse({pong: true}); return; }
	if (request.url) {
		console.log("Running script")
		retrieveMem()
		findCitiesOnPage(request.url)  
	} else {
		console.log("No url")
	}

});**/
var groupByTimeZones2 = array =>
	  array.reduce((newDict, obj) => {
	  	const time = new Date(obj["formatted"])
	    const k = obj["zoneName"] + ", " + readableTimeString2(time);
	    const v = `${obj.cityName}, ${obj.regionName}`
	    newDict[k] = (newDict[k] || []).concat([obj]);
	    return newDict;
	  }, {});
function readableTimeString2(time) {
	//CONVERTS Mon Apr 22 2019 00:23:15 GMT-0400 (Eastern Daylight Time) INTO: "12:23 AM"
	return time.toLocaleTimeString().replace(/:\d{2}\s/,' ') 
}
function retrieveMem() {
	chrome.storage.sync.get('mem', function(data) {
		mem = data.mem || {}
		console.log("memory loaded.")
		console.log(mem)
	})
}







//THIS FUNCTION'S PURPOSE IS TO RETRIEVE THE LIST OF CITIES ON THE WEBPAGE 
//FROM EITHER A PROFILE OR A LIST OF PROFILES
function findCitiesOnPage(url) {
	if (url) {
		var cities = new Set()
		if (url.includes("linkedin.com/sales/search/people/list/employees-for-account/")) {
			console.log("We are on a Sales Nav List of Employees")
			var listItems = $(".search-results__result-list li");
			people.each(function() {
				var person = $(this);
				var city = person.find('.result-lockup__misc-item').text().trim().toLowerCase();
				cities.add(city)
			})
		} else if (url.includes("linkedin.com/sales/people")) {
			console.log("We are on a Sales Nav Profile")
			var topCity = $('.profile-topcard__location-data').text().trim().toLowerCase();
			var bottomCity = $('.profile-experience__position-list li:first .profile-position__company-location').contents().filter(function() {
				return this.nodeType === 3;
			});
			bottomCity = bottomCity.text().trim().toLowerCase();
			cities.add(topCity)
			cities.add(bottomCity)
		} else if (url.includes("linkedin.com/in")) {
			console.log("We are probably on a LinkedIn Profile")
			var topCity = $('.pv-top-card-section__location').text().trim().toLowerCase();
			var bottomCity = $('.pv-entity__location:first').children().last().text().trim().toLowerCase();
			cities.add(topCity)
			cities.add(bottomCity)
		} 

		return cities

	} else {
		console.log("no url given")
	}

}

function startProcess(url) {
	$('body').animate({
   		scrollTop: $(document).height()
	}).promise().then(function(){
		started = true
		console.log("STARTED")

		//Step 1: Find the cities on the webpage  
		var cities_set = findCitiesOnPage(url)
		//Step 2: Fetch Timezone
		fetchTZ(Array.from(cities_set)).then(function(timezone) {
			//Wait for Timezone to be retrieved
			//Step 3: Convert Timezone to Data
			const data = getDataFromTimezone(timezone)
			//Step 4: Append DIV With Data

			const insertionPoint = getInsertionPoint()
			insertDivInPage(insertionPoint)

			if (data != null) {
				appendDataToDiv(data)
			} else {
				appendErrorMSGToDiv()
			}
			started = false
			console.log("FINISHED")
		})
	});
	

}

async function fetchTZ(cities) {
	console.log("CITIES LENGTH: " + cities.length)
	if (cities.length == 0) { return null }
	try {
		var cities = cities
		var city = cities.shift()
		// MEMOIZE RESULTS
		if (city in mem) { 
			if (mem[city] == "Unknown") { return fetchTZ(cities) }
			return mem[city] 
		} 
		 
		var baseURL = createURLFromArea(city)
		const response = await fetch(baseURL);
		const res = await response.json();
		if (res.status == "OK") {
			const results = groupByTimeZones2(res.zones)
			if (Object.keys(results).length == 1) {
				let key = Object.keys(results)[0]
				let json = results[key][0]
				console.log(`All results have same timezone`)
				saveMem(city, json.zoneName) // STORE RESULTS
				return json.zoneName
			} else {
				console.log("Multiple timezones returned. Returning null")
				saveMem(city, "Unknown") // STORE RESULTS
				return null
			}
		} 
		else if (res.status == "FAILED") {
			console.log("Invalid city input, trying next available city" )
			return fetchTZ(cities)
		}
	} catch (err) {
   		console.log('fetch failed', err);
   		return null
	}
	 
}




function getDataFromTimezone(timezone) {
	if (timezone == null) { return null }
	var date = new Date()
	var str = date.toLocaleTimeString("en-US", {timeZone: timezone}).replace(/:\d{2}\s/,' ')
	var hours = parseInt(str.substr(0, str.indexOf(':')))
	if (str.includes("PM")) { hours += 12 }
	if (str.includes("12") && (str.includes("AM"))) { hours -= 12}
	return {hours: hours, label: str }
	//appendTimeDIVToDOM(hours, str)

}
//searches for any spaces from the beginning of the string and from the end of string.
//If found then it is replaced by empty string ''.
function myTrim(x) {
  return x.replace(/^\s+|\s+$/gm,'');
}


function parseArea(area) {
	console.log("parseArea for: " + area)
	area = myTrim(area)
	if (area.endsWith("area")) {
		area = area.replace(" area", '');
	} else if (area.startsWith("greater")) {
		area = area.replace("greater ", '');
	} else if (area.endsWith("city")) {
		console.log(area + " enters here!! for trimming")
		area = area.replace(" city", '')
	}
	return area
}

function createURLFromArea(loc) {
	//console.log("OLD AREA: " + loc)

	var regionID;
	var countryID;
	var cityID;
	if (loc.includes('/')) {
		const index = loc.indexOf('/');
		loc = loc.substring('0',index);
	}
	if (loc.includes(',')) {
		var arr = loc.split(',')
	 
		//console.log("arr: " + arr)
		var former = parseArea(arr[0])
		cityID = former.replace(/ /g, '_');

		var latter = parseArea(myTrim(arr[1]))
		if (latter in regionDict) {
			regionID = regionDict[latter]
			countryID = "US"
		} else if (latter in countryDict){
			regionID = null
			countryID = countryDict[latter]
		} else {
			console.log(`${latter} not found`)
			chrome.runtime.sendMessage({row: [latter, "not found"]}, function(response) {
 				console.log(response.farewell);
			});
		}

	} else {
		var area = parseArea(loc)
		//console.log("AREA: " + area)
		switch(area) {
			case "greater new york city":
				//console.log("enters here")
				cityID = "New_York_City"
				regionID = "NY"
				countryID = "US"
				break;
			default:
				//console.log('doesnt go in here')
				cityID = loc.replace(/ /g, '_');
				regionID = null
				countryID = "US"
				break;
		}
	}


	const Url = "https://vip.timezonedb.com/v2.1/get-time-zone?key=QYININQB0JTL&format=json&by=city&city=City+of+Buffalo&country=${countryID}"
	var baseURL = `https://vip.timezonedb.com/v2.1/get-time-zone?key=QYININQB0JTL&format=json&by=city&city=${cityID}`
	if (regionID != null) { baseURL += `&region=${regionID}` };

	baseURL += `&country=${countryID}`
	//baseURL = `https://vip.timezonedb.com/v2.1/get-time-zone?key=QYININQB0JTL&format=json&by=city&city=boston&country=US`

	return baseURL
}


// Save it using the Chrome extension storage API.
function saveMem(key, value) {
	mem[key] = value
	chrome.storage.sync.set({'mem': mem}, function() {
    	console.log('Settings saved');
    });
    console.log(`${value} stored in ${key}`)
    console.log(mem)
}



function getInsertionPoint() {
	var insertionPoint = $('.pv-top-card-section__location')
	if (url.includes("linkedin.com/sales/people")) {
		insertionPoint = $('.profile-topcard__connections-data')
	} 
	return insertionPoint

}

function removeTimeDiv() {
	$('.time').prev().remove()
	$('.time').remove()
}
function insertDivInPage(insertionPoint) {
	console.log("inserting div called")
	removeTimeDiv()
	removeTimeDiv()
	removeTimeDiv()

	insertionPoint.after(`<br /><div class='time'></div>`)
}

function appendDataToDiv(data) {
	if (data == null) { return; }
	const hours = data.hours
	const label = data.label


	setDivColor(hours)
	setDivImage(hours)
	setDivLabel(label)
	started = false
}


function appendErrorMSGToDiv() {
	var src = chrome.extension.getURL('images/icon_16.png')
	var label = 'Time not found. Click ' + 
					'<img src="' + src + '" alt="browser button">'  + 
						' near the search bar'
	$('.time').addClass('time-error') 
	$('.time').append(`<span class='timeLabelError'> ${label}</span>`); 
}





function getHours(input) {
	if (input instanceof Date) {
		return input.getHours()
	} else if (typeof(input) == "number") {
		return input
	}
}
function setDivColor(hours) {
	if (hours < OPEN_HOUR || hours > CLOSE_HOUR) {
		$('.time').addClass('time-closed') 
	} 
	else { 
		$('.time').addClass('time-open') 
	}
}

function setDivImage(hours) {
	var img = new Image();
	img.onload = function() {}
	if (hours < OPEN_HOUR || hours > CLOSE_HOUR) {
		img.src = chrome.extension.getURL("images/phone_icon_white.png"); 
	} 
	else { 
		img.src = chrome.extension.getURL("images/phone_icon_black.png"); 
	}
	$('.time').prepend(img);

}

function setDivLabel(label) {
	$('.time').append(`<span class='timeLabel'> ${label}</span>`); 
	
}

retrieveMem()

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	if(request.ping) { console.log('hi'); sendResponse({pong: true}); return; }
	console.log(started)
	// listen for messages sent from background.js
	if (!started) {
		if (request.message === 'hello') { 
			console.log("message recieved")
			$(document).ready(function() {
				removeTimeDiv()	

				url = request.url
				startProcess(url)
			});
		} 
		else {
			console.log('failed with message ' + request.message + "|| " + request.url)
		}
	}



});

//runScript()
/**
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.ping) { sendResponse({pong: true}); return; }

	findCitiesOnPage(request.url)  
});**/



//DEPRECATED
function appendTimeElement(time) {
	//CONVERTS Mon Apr 22 2019 00:23:15 GMT-0400 (Eastern Daylight Time) INTO: "12:23 AM"
	var label = time.toLocaleTimeString().replace(/:\d{2}\s/,' ') 
	appendTimeDIVToDOM(time, label)
}
//DEPRECATED
function getTimezoneFromJSON(json) {
	saveMem(city, json.zoneName)
   	return json.zoneName
	
}

//DEPRECATED
function appendTimeElementFromError() {
	var insertionPoint = $('.pv-top-card-section__location')
	insertDivInPage(insertionPoint)
	var img = new Image();
	img.onload = function() {}
	//img.src = chrome.extension.getURL("icon_128.png"); 
	//img.src = chrome.extension.getURL("images/icon_128.png");
	var url2 = chrome.extension.getURL('images/icon_16.png')
	img.src = url2
	img.alt = "chrome button"
	var label = 'Time not found. Click ' + 
					'<img src="' + url2 + '"' + 
						' near the search bar'
	$('.time').addClass('time-error') 
	$('.time').append(`<span class='timeLabelError'> ${label}</span>`); 
}

//DEPRECATED

function formatTimeID(hours, phone) {
	if (hours < OPEN_HOUR || hours > CLOSE_HOUR) {
		$('.time').addClass('time-closed') 
		phone.src = chrome.extension.getURL("images/phone_icon_white.png"); 
	} 
	else { 
		$('.time').addClass('time-open') 
		phone.src = chrome.extension.getURL("images/phone_icon_black.png"); 
	}
}

//DEPRECATED

function appendTimeElementFromTZ(timezone) {

	var date = new Date()
	var str = date.toLocaleTimeString("en-US", {timeZone: timezone}).replace(/:\d{2}\s/,' ')
	var hours = parseInt(str.substr(0, str.indexOf(':')))
	if (str.includes("PM")) { hours += 12 }
	if (str.includes("12") && (str.includes("AM"))) { hours -= 12}
	console.log(`hours: ${hours} || str: ${str}`)
	appendTimeDIVToDOM(hours, str)

}

//DEPRECATED

function selectCity(opt1, opt2) {
	if (opt1.includes(',')) {
		return opt1
	} else {
		return opt2
	}
}

//EXPERIMENTAL -- FINISH CODING
function appendTime() {
	$('.time').prev().remove()
	$('.time').remove()
	if (request.url.startsWith("https://linkedin.com/sales/people")) {
		var topCity = $('.profile-topcard__location-data').text().trim().toLowerCase();
	} else if (request.url.startsWith("https://linkedin.com/sales/search/people/list/employees-for-account/")) {
		var listItems = $(".search-results__result-list li");
		people.each(function() {
			var person = $(this);
			var city = person.find('.result-lockup__misc-item')
		})
	} else {
		var location = $('.pv-top-card-section__location')

	}

	started = false
}