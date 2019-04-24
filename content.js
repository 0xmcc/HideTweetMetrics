/**
This chrome utilizes the TimezoneDB API to look up timezones by city names
**/


var countryDict = {"afghanistan":"AF","aland islands":"AX","albania":"AL","algeria":"DZ","american samoa":"AS","andorra":"AD","angola":"AO","anguilla":"AI","antarctica":"AQ","antigua and barbuda":"AG","argentina":"AR","armenia":"AM","aruba":"AW","australia":"AU","austria":"AT","azerbaijan":"AZ","bahamas":"BS","bahrain":"BH","bangladesh":"BD","barbados":"BB","belarus":"BY","belgium":"BE","belize":"BZ","benin":"BJ","bermuda":"BM","bhutan":"BT","bolivia":"BO","bonaire, saint eustatius and saba":"BQ","bosnia and herzegovina":"BA","botswana":"BW","bouvet island":"BV","brazil":"BR","british indian ocean territory":"IO","british virgin islands":"VG","brunei":"BN","bulgaria":"BG","burkina faso":"BF","burundi":"BI","cambodia":"KH","cameroon":"CM","canada":"CA","cape verde":"CV","cayman islands":"KY","central african republic":"CF","chad":"TD","chile":"CL","china":"CN","christmas island":"CX","cocos islands":"CC","colombia":"CO","comoros":"KM","cook islands":"CK","costa rica":"CR","croatia":"HR","cuba":"CU","curaçao":"CW","cyprus":"CY","czech republic":"CZ","democratic republic of the congo":"CD","denmark":"DK","djibouti":"DJ","dominica":"DM","dominican republic":"DO","east timor":"TL","ecuador":"EC","egypt":"EG","el salvador":"SV","equatorial guinea":"GQ","eritrea":"ER","estonia":"EE","ethiopia":"ET","falkland islands":"FK","faroe islands":"FO","fiji":"FJ","finland":"FI","france":"FR","french guiana":"GF","french polynesia":"PF","french southern territories":"TF","gabon":"GA","gambia":"GM","georgia":"GE","germany":"DE","ghana":"GH","gibraltar":"GI","greece":"GR","greenland":"GL","grenada":"GD","guadeloupe":"GP","guam":"GU","guatemala":"GT","guernsey":"GG","guinea":"GN","guinea-bissau":"GW","guyana":"GY","haiti":"HT","heard island and mcdonald islands":"HM","honduras":"HN","hong kong":"HK","hungary":"HU","iceland":"IS","india":"IN","indonesia":"ID","iran":"IR","iraq":"IQ","ireland":"IE","isle of man":"IM","israel":"IL","italy":"IT","ivory coast":"CI","jamaica":"JM","japan":"JP","jersey":"JE","jordan":"JO","kazakhstan":"KZ","kenya":"KE","kiribati":"KI","kosovo":"XK","kuwait":"KW","kyrgyzstan":"KG","laos":"LA","latvia":"LV","lebanon":"LB","lesotho":"LS","liberia":"LR","libya":"LY","liechtenstein":"LI","lithuania":"LT","luxembourg":"LU","macao":"MO","macedonia":"MK","madagascar":"MG","malawi":"MW","malaysia":"MY","maldives":"MV","mali":"ML","malta":"MT","marshall islands":"MH","martinique":"MQ","mauritania":"MR","mauritius":"MU","mayotte":"YT","mexico":"MX","micronesia":"FM","moldova":"MD","monaco":"MC","mongolia":"MN","montenegro":"ME","montserrat":"MS","morocco":"MA","mozambique":"MZ","myanmar":"MM","namibia":"NA","nauru":"NR","nepal":"NP","netherlands":"NL","netherlands antilles":"AN","new caledonia":"NC","new zealand":"NZ","nicaragua":"NI","niger":"NE","nigeria":"NG","niue":"NU","norfolk island":"NF","north korea":"KP","northern mariana islands":"MP","norway":"NO","oman":"OM","pakistan":"PK","palau":"PW","palestinian territory":"PS","panama":"PA","papua new guinea":"PG","paraguay":"PY","peru":"PE","philippines":"PH","pitcairn":"PN","poland":"PL","portugal":"PT","puerto rico":"PR","qatar":"QA","republic of the congo":"CG","reunion":"RE","romania":"RO","russia":"RU","rwanda":"RW","saint barthélemy":"BL","saint helena":"SH","saint kitts and nevis":"KN","saint lucia":"LC","saint martin":"MF","saint pierre and miquelon":"PM","saint vincent and the grenadines":"VC","samoa":"WS","san marino":"SM","sao tome and principe":"ST","saudi arabia":"SA","senegal":"SN","serbia":"RS","serbia and montenegro":"CS","seychelles":"SC","sierra leone":"SL","singapore":"SG","sint maarten":"SX","slovakia":"SK","slovenia":"SI","solomon islands":"SB","somalia":"SO","south africa":"ZA","south georgia and the south sandwich islands":"GS","south korea":"KR","south sudan":"SS","spain":"ES","sri lanka":"LK","sudan":"SD","suriname":"SR","svalbard and jan mayen":"SJ","swaziland":"SZ","sweden":"SE","switzerland":"CH","syria":"SY","taiwan":"TW","tajikistan":"TJ","tanzania":"TZ","thailand":"TH","togo":"TG","tokelau":"TK","tonga":"TO","trinidad and tobago":"TT","tunisia":"TN","turkey":"TR","turkmenistan":"TM","turks and caicos islands":"TC","tuvalu":"TV","u.s. virgin islands":"VI","uganda":"UG","ukraine":"UA","united arab emirates":"AE","united kingdom":"GB","united states":"US","united states minor outlying islands":"UM","uruguay":"UY","uzbekistan":"UZ","vanuatu":"VU","vatican":"VA","venezuela":"VE","vietnam":"VN","wallis and futuna":"WF","western sahara":"EH","yemen":"YE","zambia":"ZM","zimbabwe":"ZW"}
var regionDict = {"alaska":"AK", "alabama":"AL","arkansas":"AR","arizona":"AZ","california":"CA","colorado":"CO","connecticut":"CT","washington, d.c.":"DC","delaware":"DE","florida":"FL","georgia":"GA","hawaii":"HI","iowa":"IA","idaho":"ID","illinois":"IL","indiana":"IN","kansas":"KS","kentucky":"KY","louisiana":"LA","massachusetts":"MA","maryland":"MD","maine":"ME","michigan":"MI","minnesota":"MN","missouri":"MO","mississippi":"MS","montana":"MT","north carolina":"NC","north dakota":"ND","nebraska":"NE","new hampshire":"NH","new jersey":"NJ","new mexico":"NM","nevada":"NV","new york":"NY","ohio":"OH","oklahoma":"OK","oregon":"OR","pennsylvania":"PA","rhode island":"RI","south carolina":"SC","south dakota":"SD","tennessee":"TN","texas":"TX","utah":"UT","virginia":"VA","vermont":"VT","washington":"WA","wisconsin":"WI","west virginia":"WV","wyoming":"WY"}
var city;
var mem;
var timezone;
const groupByTimeZones = array =>
  array.reduce((newDict, obj) => {
  	const time = new Date(obj["formatted"])
    const k = obj["zoneName"] + ", " + readableTimeString(time);
    const v = `${obj.cityName}, ${obj.regionName}`
    newDict[k] = (newDict[k] || []).concat([obj]);
    return newDict;
  }, {});
// Read it using the storage API
chrome.storage.sync.get('mem', function(data) {
	mem = data.mem || {}
	runScript()

})
chrome.runtime.onMessage.addListener(   function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'hello!') { runScript()	}
});

function runScript() {
	console.log(mem)
	$(document).ready(function() {
		$('html').animate({
	   		scrollTop: $(document).height()
		}, 
		function(){
			var topCity = $('.pv-top-card-section__location').text().trim().toLowerCase();
			var bottomCity = $('.pv-entity__location:first').children().last().text().toLowerCase();
			//city = selectCity(topCity, bottomCity)
			//retrieveCity(city)
			getCity([topCity,bottomCity], [])
		});
	});
}

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
}

function getCity(remaining, tried) {

	if (remaining.length > 0) {
		if (tried.length > 0) {
			console.log(`trying recursion with ${remaining[0]}`)
		}
		var city = remaining.shift()
		console.log("SEARCHING FOR " + city)
		if (city in mem) {
			console.log('city found in memory')
			timezone = mem[city]
			if (timezone) {
				return appendTimeElementFromTZ(timezone)
			} else {
				return getCity(remaining, tried.concat(city))
			}
		} 
		else {
			console.log('proceed as normal')
			console.log("CITY: " + city)

			//var area = parseArea(city)
			var baseURL = createURLFromArea(city)

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
						saveMem(city, null)
						return appendTimeElementFromError()
						//var label = `Your search was unable to yield any results. Please use the <img src="icon_128.png" /> button near the search bar`
						//return appendTimeDIVToDOM(null, label)
					}
				} else if (res.status == "FAILED") {
					return getCity(remaining, tried.concat(city))
			
				}
			})
			.then(function(time) {
				if (time) {
					console.log("Time: " + time)
					appendTimeElement(time);
				}
			})
		}
	} else {
	//	var label = `Your search was unable to yield any results. Please use the <img src="icon_128.png" /> button near the search bar`
//		console.log(label)
		return appendTimeElementFromError()
//		return appendTimeDIVToDOM(null, label)
	}
}

//searches for any spaces from the beginning of the string and from the end of string.
//If found then it is replaced by empty string ''.
function myTrim(x) {
  return x.replace(/^\s+|\s+$/gm,'');
}


function selectCity(opt1, opt2) {
	if (opt1.includes(',')) {
		return opt1
	} else {
		return opt2
	}
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
	console.log("AREA: " + loc)

	var regionID;
	var countryID;
	var cityID;
	if (loc.includes('/')) {
		const index = loc.indexOf('/');
		loc = loc.substring('0',index);
	}
	if (loc.includes(',')) {
		var arr = loc.split(',')
	 
		console.log("arr: " + arr)
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
		console.log("AREA: " + area)
		switch(area) {
			case "greater new york city":
				console.log("enters here")
				cityID = "New_York_City"
				regionID = "NY"
				countryID = "US"
				break;
			default:
				console.log('doesnt go in here')
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

function parseClockFromJSON(json) {
	const zone = json
	saveMem(city, zone.zoneName)
    console.log('sending message')
	chrome.runtime.sendMessage({row: [city, zone.zoneName]}, function(response) {
 	 console.log(response.farewell);
	});

	var time = zone.formatted
	time = new Date(time)
	return time
}
// Save it using the Chrome extension storage API.
function saveMem(key, value) {
	mem[key] = value
	chrome.storage.sync.set({'mem': mem}, function() {
    	console.log('Settings saved');
    });
}

function appendTimeElement(time) {
	//CONVERTS Mon Apr 22 2019 00:23:15 GMT-0400 (Eastern Daylight Time) INTO: "12:23 AM"
	var label = time.toLocaleTimeString().replace(/:\d{2}\s/,' ') 
	appendTimeDIVToDOM(time, label)
}

function appendTimeElementFromTZ(timezone) {

	var date = new Date()
	var str = date.toLocaleTimeString("en-US", {timeZone: timezone}).replace(/:\d{2}\s/,' ')
	var hours = parseInt(str.substr(0, str.indexOf(':')))
	if (str.includes("PM")) { hours += 12 }
	if (str.includes("12") && (str.includes("AM"))) { hours -= 12}
	appendTimeDIVToDOM(hours, str)

}

function appendTimeElementFromError() {
	$('#time').prev().remove()
	$('#time').remove()
	$('.pv-top-card-section__location').after(`<br /><div id='time'></div>`)
	var img = new Image();
	img.onload = function() {}
//	img.src = chrome.extension.getURL("icon_128.png"); 
	//img.src = chrome.extension.getURL("images/icon_128.png");
	var url = chrome.extension.getURL('images/icon_16.svg')
	img.alt = "chrome button"
	var label = 'Time not found. Click ' + 
					'<embed src="' + url + '" type="image/svg+xml" />' + 
						' near the search bar'
	$('#time').addClass('time-error') 
	$('#time').append(`<span id='timeLabelError'> ${label}</span>`); 

}
function appendTimeDIVToDOM(time, label="") {

	$('#time').prev().remove()
	$('#time').remove()
	$('.pv-top-card-section__location').after(`<br /><div id='time'></div>`)
	if (time) {
		var phone = new Image();
		phone.onload = function() {}
		if (time instanceof Date) {
			formatTimeID(time.getHours(), phone)
		} else if (typeof(time) == "number") {
			formatTimeID(time, phone)
		}
		$('#time').html(phone);
	}
 	else {
		$('#time').addClass('time-error') 
	}
	$('#time').append(`<span id='timeLabel'> ${label}</span>`); 
}

function formatTimeID(hours, phone) {
	if (hours < 9 || hours > 17) {
		$('#time').addClass('time-closed') 
		phone.src = chrome.extension.getURL("images/phone_icon_white.png"); 
	} 
	else { 
		$('#time').addClass('time-open') 
		phone.src = chrome.extension.getURL("images/phone_icon_black.png"); 
	}
}

