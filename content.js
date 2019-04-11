/**
This chrome utilizes the TimezoneDB API to look up timezones by city names
**/


//var countryDict = { "Afghanistan": "AF","Aland Islands": "AX","Albania": "AL","Algeria": "DZ","American Samoa": "AS","Andorra": "AD","Angola": "AO","Anguilla": "AI","Antarctica": "AQ","Antigua and Barbuda": "AG","Argentina": "AR","Armenia": "AM","Aruba": "AW","Australia": "AU","Austria": "AT","Azerbaijan": "AZ","Bahamas": "BS","Bahrain": "BH","Bangladesh": "BD","Barbados": "BB","Belarus": "BY","Belgium": "BE","Belize": "BZ","Benin": "BJ","Bermuda": "BM","Bhutan": "BT","Bolivia": "BO","Bonaire, Saint Eustatius and Saba": "BQ","Bosnia and Herzegovina": "BA","Botswana": "BW","Bouvet Island": "BV","Brazil": "BR","British Indian Ocean Territory": "IO","British Virgin Islands": "VG","Brunei": "BN","Bulgaria": "BG","Burkina Faso": "BF","Burundi": "BI","Cambodia": "KH","Cameroon": "CM","Canada": "CA","Cape Verde": "CV","Cayman Islands": "KY","Central African Republic": "CF","Chad": "TD","Chile": "CL","China": "CN","Christmas Island": "CX","Cocos Islands": "CC","Colombia": "CO","Comoros": "KM","Cook Islands": "CK","Costa Rica": "CR","Croatia": "HR","Cuba": "CU","Curaçao": "CW","Cyprus": "CY","Czech Republic": "CZ","Democratic Republic of the Congo": "CD","Denmark": "DK","Djibouti": "DJ","Dominica": "DM","Dominican Republic": "DO","East Timor": "TL","Ecuador": "EC","Egypt": "EG","El Salvador": "SV","Equatorial Guinea": "GQ","Eritrea": "ER","Estonia": "EE","Ethiopia": "ET","Falkland Islands": "FK","Faroe Islands": "FO","Fiji": "FJ","Finland": "FI","France": "FR","French Guiana": "GF","French Polynesia": "PF","French Southern Territories": "TF","Gabon": "GA","Gambia": "GM","Georgia": "GE","Germany": "DE","Ghana": "GH","Gibraltar": "GI","Greece": "GR","Greenland": "GL","Grenada": "GD","Guadeloupe": "GP","Guam": "GU","Guatemala": "GT","Guernsey": "GG","Guinea": "GN","Guinea-Bissau": "GW","Guyana": "GY","Haiti": "HT","Heard Island and McDonald Islands": "HM","Honduras": "HN","Hong Kong": "HK","Hungary": "HU","Iceland": "IS","India": "IN","Indonesia": "ID","Iran": "IR","Iraq": "IQ","Ireland": "IE","Isle of Man": "IM","Israel": "IL","Italy": "IT","Ivory Coast": "CI","Jamaica": "JM","Japan": "JP","Jersey": "JE","Jordan": "JO","Kazakhstan": "KZ","Kenya": "KE","Kiribati": "KI","Kosovo": "XK","Kuwait": "KW","Kyrgyzstan": "KG","Laos": "LA","Latvia": "LV","Lebanon": "LB","Lesotho": "LS","Liberia": "LR","Libya": "LY","Liechtenstein": "LI","Lithuania": "LT","Luxembourg": "LU","Macao": "MO","Macedonia": "MK","Madagascar": "MG","Malawi": "MW","Malaysia": "MY","Maldives": "MV","Mali": "ML","Malta": "MT","Marshall Islands": "MH","Martinique": "MQ","Mauritania": "MR","Mauritius": "MU","Mayotte": "YT","Mexico": "MX","Micronesia": "FM","Moldova": "MD","Monaco": "MC","Mongolia": "MN","Montenegro": "ME","Montserrat": "MS","Morocco": "MA","Mozambique": "MZ","Myanmar": "MM","Namibia": "NA","Nauru": "NR","Nepal": "NP","Netherlands": "NL","Netherlands Antilles": "AN","New Caledonia": "NC","New Zealand": "NZ","Nicaragua": "NI","Niger": "NE","Nigeria": "NG","Niue": "NU","Norfolk Island": "NF","North Korea": "KP","Northern Mariana Islands": "MP","Norway": "NO","Oman": "OM","Pakistan": "PK","Palau": "PW","Palestinian Territory": "PS","Panama": "PA","Papua New Guinea": "PG","Paraguay": "PY","Peru": "PE","Philippines": "PH","Pitcairn": "PN","Poland": "PL","Portugal": "PT","Puerto Rico": "PR","Qatar": "QA","Republic of the Congo": "CG","Reunion": "RE","Romania": "RO","Russia": "RU","Rwanda": "RW","Saint Barthélemy": "BL","Saint Helena": "SH","Saint Kitts and Nevis": "KN","Saint Lucia": "LC","Saint Martin": "MF","Saint Pierre and Miquelon": "PM","Saint Vincent and the Grenadines": "VC","Samoa": "WS","San Marino": "SM","Sao Tome and Principe": "ST","Saudi Arabia": "SA","Senegal": "SN","Serbia": "RS","Serbia and Montenegro": "CS","Seychelles": "SC","Sierra Leone": "SL","Singapore": "SG","Sint Maarten": "SX","Slovakia": "SK","Slovenia": "SI","Solomon Islands": "SB","Somalia": "SO","South Africa": "ZA","South Georgia and the South Sandwich Islands": "GS","South Korea": "KR","South Sudan": "SS","Spain": "ES","Sri Lanka": "LK","Sudan": "SD","Suriname": "SR","Svalbard and Jan Mayen": "SJ","Swaziland": "SZ","Sweden": "SE","Switzerland": "CH","Syria": "SY","Taiwan": "TW","Tajikistan": "TJ","Tanzania": "TZ","Thailand": "TH","Togo": "TG","Tokelau": "TK","Tonga": "TO","Trinidad and Tobago": "TT","Tunisia": "TN","Turkey": "TR","Turkmenistan": "TM","Turks and Caicos Islands": "TC","Tuvalu": "TV","U.S. Virgin Islands": "VI","Uganda": "UG","Ukraine": "UA","United Arab Emirates": "AE","United Kingdom": "GB","United States": "US","United States Minor Outlying Islands": "UM","Uruguay": "UY","Uzbekistan": "UZ","Vanuatu": "VU","Vatican": "VA","Venezuela": "VE","Vietnam": "VN","Wallis and Futuna": "WF","Western Sahara": "EH","Yemen": "YE","Zambia": "ZM","Zimbabwe": "ZW"}

//var countryDict = { "afghanistan":"AF","aland islands":"AX","albania":"AL","algeria":"DZ","american samoa":"AS","andorra":"AD","angola":"AO","anguilla":"AI","antarctica":"AQ","antigua and barbuda":"AG","argentina":"AR","armenia":"AM","aruba":"AW","australia":"AU","austria":"AT","azerbaijan":"AZ","bahamas":"BS","bahrain":"BH","bangladesh":"BD","barbados":"BB","belarus":"BY","belgium":"BE","belize":"BZ","benin":"BJ","bermuda":"BM","bhutan":"BT","bolivia":"BO","bonaire, saint eustatius and saba":"BQ","bosnia and herzegovina":"BA","botswana":"BW","bouvet island":"BV","brazil":"BR","british indian ocean territory":"IO","british virgin islands":"VG","brunei":"BN","bulgaria":"BG","burkina faso":"BF","burundi":"BI","cambodia":"KH","cameroon":"CM","canada":"CA","cape verde":"CV","cayman islands":"KY","central african republic":"CF","chad":"TD","chile":"CL","china":"CN","christmas island":"CX","cocos islands":"CC","colombia":"CO","comoros":"KM","cook islands":"CK","costa rica":"CR","croatia":"HR","cuba":"CU","curaçao":"CW","cyprus":"CY","czech republic":"CZ","democratic republic of the congo":"CD","denmark":"DK","djibouti":"DJ","dominica":"DM","dominican republic":"DO","east timor":"TL","ecuador":"EC","egypt":"EG","el salvador":"SV","equatorial guinea":"GQ","eritrea":"ER","estonia":"EE","ethiopia":"ET","falkland islands":"FK","faroe islands":"FO","fiji":"FJ","finland":"FI","france":"FR","french guiana":"GF","french polynesia":"PF","french southern territories":"TF","gabon":"GA","gambia":"GM","georgia":"GE","germany":"DE","ghana":"GH","gibraltar":"GI","greece":"GR","greenland":"GL","grenada":"GD","guadeloupe":"GP","guam":"GU","guatemala":"GT","guernsey":"GG","guinea":"GN","guinea-bissau":"GW","guyana":"GY","haiti":"HT","heard island and mcdonald islands":"HM","honduras":"HN","hong kong":"HK","hungary":"HU","iceland":"IS","india":"IN","indonesia":"ID","iran":"IR","iraq":"IQ","ireland":"IE","isle of man":"IM","israel":"IL","italy":"IT","ivory coast":"CI","jamaica":"JM","japan":"JP","jersey":"JE","jordan":"JO","kazakhstan":"KZ","kenya":"KE","kiribati":"KI","kosovo":"XK","kuwait":"KW","kyrgyzstan":"KG","laos":"LA","latvia":"LV","lebanon":"LB","lesotho":"LS","liberia":"LR","libya":"LY","liechtenstein":"LI","lithuania":"LT","luxembourg":"LU","macao":"MO","macedonia":"MK","madagascar":"MG","malawi":"MW","malaysia":"MY","maldives":"MV","mali":"ML","malta":"MT","marshall islands":"MH","martinique":"MQ","mauritania":"MR","mauritius":"MU","mayotte":"YT","mexico":"MX","micronesia":"FM","moldova":"MD","monaco":"MC","mongolia":"MN","montenegro":"ME","montserrat":"MS","morocco":"MA","mozambique":"MZ","myanmar":"MM","namibia":"NA","nauru":"NR","nepal":"NP","netherlands":"NL","netherlands antilles":"AN","new caledonia":"NC","new zealand":"NZ","nicaragua":"NI","niger":"NE","nigeria":"NG","niue":"NU","norfolk island":"NF","north korea":"KP","northern mariana islands":"MP","norway":"NO","oman":"OM","pakistan":"PK","palau":"PW","palestinian territory":"PS","panama":"PA","papua new guinea":"PG","paraguay":"PY","peru":"PE","philippines":"PH","pitcairn":"PN","poland":"PL","portugal":"PT","puerto rico":"PR","qatar":"QA","republic of the congo":"CG","reunion":"RE","romania":"RO","russia":"RU","rwanda":"RW","saint barthélemy":"BL","saint helena":"SH","saint kitts and nevis":"KN","saint lucia":"LC","saint martin":"MF","saint pierre and miquelon":"PM","saint vincent and the grenadines":"VC","samoa":"WS","san marino":"SM","sao tome and principe":"ST","saudi arabia":"SA","senegal":"SN","serbia":"RS","serbia and montenegro":"CS","seychelles":"SC","sierra leone":"SL","singapore":"SG","sint maarten":"SX","slovakia":"SK","slovenia":"SI","solomon islands":"SB","somalia":"SO","south africa":"ZA","south georgia and the south sandwich islands":"GS","south korea":"KR","south sudan":"SS","spain":"ES","sri lanka":"LK","sudan":"SD","suriname":"SR","svalbard and jan mayen":"SJ","swaziland":"SZ","sweden":"SE","switzerland":"CH","syria":"SY","taiwan":"TW","tajikistan":"TJ","tanzania":"TZ","thailand":"TH","togo":"TG","tokelau":"TK","tonga":"TO","trinidad and tobago":"TT","tunisia":"TN","turkey":"TR","turkmenistan":"TM","turks and caicos islands":"TC","tuvalu":"TV","u.s. virgin islands":"VI","uganda":"UG","ukraine":"UA","united arab emirates":"AE","united kingdom":"GB","united states":"US","united states minor outlying islands":"UM","uruguay":"UY","uzbekistan":"UZ","vanuatu":"VU","vatican":"VA","venezuela":"VE","vietnam":"VN","wallis and futuna":"WF","western sahara":"EH","yemen":"YE","zambia":"ZM","zimbabwe":"ZW"}
//var regionDict = {"Alaska":"AK","Alabama":"AL","Arkansas":"AR","Arizona":"AZ","California":"CA","Colorado":"CO","Connecticut":"CT","Washington, D.C.":"DC","Delaware":"DE","Florida":"FL","Georgia":"GA","Hawaii":"HI","Iowa":"IA","Idaho":"ID","Illinois":"IL","Indiana":"IN","Kansas":"KS","Kentucky":"KY","Louisiana":"LA","Massachusetts":"MA","Maryland":"MD","Maine":"ME","Michigan":"MI","Minnesota":"MN","Missouri":"MO","Mississippi":"MS","Montana":"MT","North Carolina":"NC","North Dakota":"ND","Nebraska":"NE","New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM","Nevada":"NV","New York":"NY","Ohio":"OH","Oklahoma":"OK","Oregon":"OR","Pennsylvania":"PA","Rhode Island":"RI","South Carolina":"SC","South Dakota":"SD","Tennessee":"TN","Texas":"TX","Utah":"UT","Virginia":"VA","Vermont":"VT","Washington":"WA","Wisconsin":"WI","West Virginia":"WV","Wyoming":"WY"}
///var city = $('.pv-top-card-section__location').text().trim().toLowerCase();

var memory = {}
runScript()
chrome.runtime.onMessage.addListener(   function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'hello!') { runScript()	}
});

function runScript() {
	$(document).ready(function() {

	$('html').animate({
   		scrollTop: $(document).height()
	}, function(){
		var city = getCityFromLinkedIn()
		var baseURL = createURL(city)

		//console.log("VISITING: " + baseURL)
		fetch(baseURL)
		.then(data => {return data.json()})
		.then(function(res) {
			if (res.status == "OK") {
				if (res.zones.length == 1) { return parseClockFromJSON(res.zones[0])}
			}
		})
		.then(function(time) {
			console.log("Time: " + time)
			appendTimeElement(time);
		})
	});
});
}
function myTrim(x) {
  return x.replace(/^\s+|\s+$/gm,'');
}


function getCityFromLinkedIn() {
	var city = $('.pv-entity__location:first').children().last().text().toLowerCase()
	city = myTrim(city)
	console.log(`True: ${city == "greater new york city area"}`)
	if (city.endsWith("area")) {
		city = city.replace(" area", '');
	}	
	if (city.includes('/')) {
		const index = city.indexOf('/');
		city = city.substring('0',index);
	}
	return city;
}

function createURL(city) {
	console.log("CITY: " + city)

	var countryDict = {"afghanistan":"AF","aland islands":"AX","albania":"AL","algeria":"DZ","american samoa":"AS","andorra":"AD","angola":"AO","anguilla":"AI","antarctica":"AQ","antigua and barbuda":"AG","argentina":"AR","armenia":"AM","aruba":"AW","australia":"AU","austria":"AT","azerbaijan":"AZ","bahamas":"BS","bahrain":"BH","bangladesh":"BD","barbados":"BB","belarus":"BY","belgium":"BE","belize":"BZ","benin":"BJ","bermuda":"BM","bhutan":"BT","bolivia":"BO","bonaire, saint eustatius and saba":"BQ","bosnia and herzegovina":"BA","botswana":"BW","bouvet island":"BV","brazil":"BR","british indian ocean territory":"IO","british virgin islands":"VG","brunei":"BN","bulgaria":"BG","burkina faso":"BF","burundi":"BI","cambodia":"KH","cameroon":"CM","canada":"CA","cape verde":"CV","cayman islands":"KY","central african republic":"CF","chad":"TD","chile":"CL","china":"CN","christmas island":"CX","cocos islands":"CC","colombia":"CO","comoros":"KM","cook islands":"CK","costa rica":"CR","croatia":"HR","cuba":"CU","curaçao":"CW","cyprus":"CY","czech republic":"CZ","democratic republic of the congo":"CD","denmark":"DK","djibouti":"DJ","dominica":"DM","dominican republic":"DO","east timor":"TL","ecuador":"EC","egypt":"EG","el salvador":"SV","equatorial guinea":"GQ","eritrea":"ER","estonia":"EE","ethiopia":"ET","falkland islands":"FK","faroe islands":"FO","fiji":"FJ","finland":"FI","france":"FR","french guiana":"GF","french polynesia":"PF","french southern territories":"TF","gabon":"GA","gambia":"GM","georgia":"GE","germany":"DE","ghana":"GH","gibraltar":"GI","greece":"GR","greenland":"GL","grenada":"GD","guadeloupe":"GP","guam":"GU","guatemala":"GT","guernsey":"GG","guinea":"GN","guinea-bissau":"GW","guyana":"GY","haiti":"HT","heard island and mcdonald islands":"HM","honduras":"HN","hong kong":"HK","hungary":"HU","iceland":"IS","india":"IN","indonesia":"ID","iran":"IR","iraq":"IQ","ireland":"IE","isle of man":"IM","israel":"IL","italy":"IT","ivory coast":"CI","jamaica":"JM","japan":"JP","jersey":"JE","jordan":"JO","kazakhstan":"KZ","kenya":"KE","kiribati":"KI","kosovo":"XK","kuwait":"KW","kyrgyzstan":"KG","laos":"LA","latvia":"LV","lebanon":"LB","lesotho":"LS","liberia":"LR","libya":"LY","liechtenstein":"LI","lithuania":"LT","luxembourg":"LU","macao":"MO","macedonia":"MK","madagascar":"MG","malawi":"MW","malaysia":"MY","maldives":"MV","mali":"ML","malta":"MT","marshall islands":"MH","martinique":"MQ","mauritania":"MR","mauritius":"MU","mayotte":"YT","mexico":"MX","micronesia":"FM","moldova":"MD","monaco":"MC","mongolia":"MN","montenegro":"ME","montserrat":"MS","morocco":"MA","mozambique":"MZ","myanmar":"MM","namibia":"NA","nauru":"NR","nepal":"NP","netherlands":"NL","netherlands antilles":"AN","new caledonia":"NC","new zealand":"NZ","nicaragua":"NI","niger":"NE","nigeria":"NG","niue":"NU","norfolk island":"NF","north korea":"KP","northern mariana islands":"MP","norway":"NO","oman":"OM","pakistan":"PK","palau":"PW","palestinian territory":"PS","panama":"PA","papua new guinea":"PG","paraguay":"PY","peru":"PE","philippines":"PH","pitcairn":"PN","poland":"PL","portugal":"PT","puerto rico":"PR","qatar":"QA","republic of the congo":"CG","reunion":"RE","romania":"RO","russia":"RU","rwanda":"RW","saint barthélemy":"BL","saint helena":"SH","saint kitts and nevis":"KN","saint lucia":"LC","saint martin":"MF","saint pierre and miquelon":"PM","saint vincent and the grenadines":"VC","samoa":"WS","san marino":"SM","sao tome and principe":"ST","saudi arabia":"SA","senegal":"SN","serbia":"RS","serbia and montenegro":"CS","seychelles":"SC","sierra leone":"SL","singapore":"SG","sint maarten":"SX","slovakia":"SK","slovenia":"SI","solomon islands":"SB","somalia":"SO","south africa":"ZA","south georgia and the south sandwich islands":"GS","south korea":"KR","south sudan":"SS","spain":"ES","sri lanka":"LK","sudan":"SD","suriname":"SR","svalbard and jan mayen":"SJ","swaziland":"SZ","sweden":"SE","switzerland":"CH","syria":"SY","taiwan":"TW","tajikistan":"TJ","tanzania":"TZ","thailand":"TH","togo":"TG","tokelau":"TK","tonga":"TO","trinidad and tobago":"TT","tunisia":"TN","turkey":"TR","turkmenistan":"TM","turks and caicos islands":"TC","tuvalu":"TV","u.s. virgin islands":"VI","uganda":"UG","ukraine":"UA","united arab emirates":"AE","united kingdom":"GB","united states":"US","united states minor outlying islands":"UM","uruguay":"UY","uzbekistan":"UZ","vanuatu":"VU","vatican":"VA","venezuela":"VE","vietnam":"VN","wallis and futuna":"WF","western sahara":"EH","yemen":"YE","zambia":"ZM","zimbabwe":"ZW"}
	var regionDict = {"Alaska":"AK","Alabama":"AL","Arkansas":"AR","Arizona":"AZ","California":"CA","Colorado":"CO","Connecticut":"CT","Washington, D.C.":"DC","Delaware":"DE","Florida":"FL","Georgia":"GA","Hawaii":"HI","Iowa":"IA","Idaho":"ID","Illinois":"IL","Indiana":"IN","Kansas":"KS","Kentucky":"KY","Louisiana":"LA","Massachusetts":"MA","Maryland":"MD","Maine":"ME","Michigan":"MI","Minnesota":"MN","Missouri":"MO","Mississippi":"MS","Montana":"MT","North Carolina":"NC","North Dakota":"ND","Nebraska":"NE","New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM","Nevada":"NV","New York":"NY","Ohio":"OH","Oklahoma":"OK","Oregon":"OR","Pennsylvania":"PA","Rhode Island":"RI","South Carolina":"SC","South Dakota":"SD","Tennessee":"TN","Texas":"TX","Utah":"UT","Virginia":"VA","Vermont":"VT","Washington":"WA","Wisconsin":"WI","West Virginia":"WV","Wyoming":"WY"}

	var regionID;
	var countryID;
	var cityID;
	if (city.includes(',')) {
		var arr = city.split(',')
		console.log("arr: " + arr)
		var former = arr[0]
		cityID = former.replace(/ /g, '_');

		var latter = myTrim(arr[1])
		
		
		if (!(latter.includes(' '))) {
			console.log(`${latter} + ${countryDict[latter.trim()]}`)
			if (latter in regionDict) {
				console.log("United states country")
				regionID = regionDict[latter]
				countryID = "US"
			} else if (latter in countryDict){
				console.log('other country')
				regionID = null
				countryID = countryDict[latter]
			} else {
				console.log('third country')
			}
		} else {
			//MARK: TO-IMPLEMENT
			regionID = null
			countryID = "US"
		}

	} else {
		switch(city) {
			case "greater new york city":
				console.log("enters here")
				cityID = "New_York_City"
				regionID = "NY"
				countryID = "US"
				break;
			default:
				console.log('doesnt go in here')
				cityID = city.replace(/ /g, '_');
				regionID = null
				countryID = "US"
				break;
		}
	}


	const Url = "https://vip.timezonedb.com/v2.1/get-time-zone?key=QYININQB0JTL&format=json&by=city&city=City+of+Buffalo&country=${countryID}"
	var baseURL = `https://vip.timezonedb.com/v2.1/get-time-zone?key=QYININQB0JTL&format=json&by=city&city=${cityID}`

	if (regionID != null) { baseURL += `&region=${regionID}` };


	baseURL += `&country=${countryID}`
	return baseURL
}

function parseClockFromJSON(json) {
	const zone = json
	var time = zone.formatted
	time = new Date(time)
	return time
}

function appendTimeElement(time) {
	$('#time').remove()
	$('.pv-top-card-section__location').after(`<br /><div id='time'></div>`)
	var phone = new Image();
	phone.onload = function() {}
	if (time.getHours() < 9 || time.getHours() > 17) {
		$('#time').addClass('time-closed') 
		phone.src = chrome.extension.getURL("images/phone_icon_white.png"); 
	} 
	else { 
		$('#time').addClass('time-open') 
		phone.src = chrome.extension.getURL("images/phone_icon_black.png"); 
	}
	$('#time').html(phone);
	$('#time').append(`<span id='timeLabel'> ${time.toLocaleTimeString()}</span>`); 
	
}


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
