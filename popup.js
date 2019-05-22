var countryDict = {"afghanistan":"AF","aland islands":"AX","albania":"AL","algeria":"DZ","american samoa":"AS","andorra":"AD","angola":"AO","anguilla":"AI","antarctica":"AQ","antigua and barbuda":"AG","argentina":"AR","armenia":"AM","aruba":"AW","australia":"AU","austria":"AT","azerbaijan":"AZ","bahamas":"BS","bahrain":"BH","bangladesh":"BD","barbados":"BB","belarus":"BY","belgium":"BE","belize":"BZ","benin":"BJ","bermuda":"BM","bhutan":"BT","bolivia":"BO","bonaire, saint eustatius and saba":"BQ","bosnia and herzegovina":"BA","botswana":"BW","bouvet island":"BV","brazil":"BR","british indian ocean territory":"IO","british virgin islands":"VG","brunei":"BN","bulgaria":"BG","burkina faso":"BF","burundi":"BI","cambodia":"KH","cameroon":"CM","canada":"CA","cape verde":"CV","cayman islands":"KY","central african republic":"CF","chad":"TD","chile":"CL","china":"CN","christmas island":"CX","cocos islands":"CC","colombia":"CO","comoros":"KM","cook islands":"CK","costa rica":"CR","croatia":"HR","cuba":"CU","curaçao":"CW","cyprus":"CY","czech republic":"CZ","democratic republic of the congo":"CD","denmark":"DK","djibouti":"DJ","dominica":"DM","dominican republic":"DO","east timor":"TL","ecuador":"EC","egypt":"EG","el salvador":"SV","equatorial guinea":"GQ","eritrea":"ER","estonia":"EE","ethiopia":"ET","falkland islands":"FK","faroe islands":"FO","fiji":"FJ","finland":"FI","france":"FR","french guiana":"GF","french polynesia":"PF","french southern territories":"TF","gabon":"GA","gambia":"GM","georgia":"GE","germany":"DE","ghana":"GH","gibraltar":"GI","greece":"GR","greenland":"GL","grenada":"GD","guadeloupe":"GP","guam":"GU","guatemala":"GT","guernsey":"GG","guinea":"GN","guinea-bissau":"GW","guyana":"GY","haiti":"HT","heard island and mcdonald islands":"HM","honduras":"HN","hong kong":"HK","hungary":"HU","iceland":"IS","india":"IN","indonesia":"ID","iran":"IR","iraq":"IQ","ireland":"IE","isle of man":"IM","israel":"IL","italy":"IT","ivory coast":"CI","jamaica":"JM","japan":"JP","jersey":"JE","jordan":"JO","kazakhstan":"KZ","kenya":"KE","kiribati":"KI","kosovo":"XK","kuwait":"KW","kyrgyzstan":"KG","laos":"LA","latvia":"LV","lebanon":"LB","lesotho":"LS","liberia":"LR","libya":"LY","liechtenstein":"LI","lithuania":"LT","luxembourg":"LU","macao":"MO","macedonia":"MK","madagascar":"MG","malawi":"MW","malaysia":"MY","maldives":"MV","mali":"ML","malta":"MT","marshall islands":"MH","martinique":"MQ","mauritania":"MR","mauritius":"MU","mayotte":"YT","mexico":"MX","micronesia":"FM","moldova":"MD","monaco":"MC","mongolia":"MN","montenegro":"ME","montserrat":"MS","morocco":"MA","mozambique":"MZ","myanmar":"MM","namibia":"NA","nauru":"NR","nepal":"NP","netherlands":"NL","netherlands antilles":"AN","new caledonia":"NC","new zealand":"NZ","nicaragua":"NI","niger":"NE","nigeria":"NG","niue":"NU","norfolk island":"NF","north korea":"KP","northern mariana islands":"MP","norway":"NO","oman":"OM","pakistan":"PK","palau":"PW","palestinian territory":"PS","panama":"PA","papua new guinea":"PG","paraguay":"PY","peru":"PE","philippines":"PH","pitcairn":"PN","poland":"PL","portugal":"PT","puerto rico":"PR","qatar":"QA","republic of the congo":"CG","reunion":"RE","romania":"RO","russia":"RU","rwanda":"RW","saint barthélemy":"BL","saint helena":"SH","saint kitts and nevis":"KN","saint lucia":"LC","saint martin":"MF","saint pierre and miquelon":"PM","saint vincent and the grenadines":"VC","samoa":"WS","san marino":"SM","sao tome and principe":"ST","saudi arabia":"SA","senegal":"SN","serbia":"RS","serbia and montenegro":"CS","seychelles":"SC","sierra leone":"SL","singapore":"SG","sint maarten":"SX","slovakia":"SK","slovenia":"SI","solomon islands":"SB","somalia":"SO","south africa":"ZA","south georgia and the south sandwich islands":"GS","south korea":"KR","south sudan":"SS","spain":"ES","sri lanka":"LK","sudan":"SD","suriname":"SR","svalbard and jan mayen":"SJ","swaziland":"SZ","sweden":"SE","switzerland":"CH","syria":"SY","taiwan":"TW","tajikistan":"TJ","tanzania":"TZ","thailand":"TH","togo":"TG","tokelau":"TK","tonga":"TO","trinidad and tobago":"TT","tunisia":"TN","turkey":"TR","turkmenistan":"TM","turks and caicos islands":"TC","tuvalu":"TV","u.s. virgin islands":"VI","uganda":"UG","ukraine":"UA","united arab emirates":"AE","united kingdom":"GB","united states":"US","united states minor outlying islands":"UM","uruguay":"UY","uzbekistan":"UZ","vanuatu":"VU","vatican":"VA","venezuela":"VE","vietnam":"VN","wallis and futuna":"WF","western sahara":"EH","yemen":"YE","zambia":"ZM","zimbabwe":"ZW"}
var keys = Object.keys(countryDict)
var regionDict = {"alaska":"AK", "alabama":"AL","arkansas":"AR","arizona":"AZ","california":"CA","colorado":"CO","connecticut":"CT","washington, d.c.":"DC","delaware":"DE","florida":"FL","georgia":"GA","hawaii":"HI","iowa":"IA","idaho":"ID","illinois":"IL","indiana":"IN","kansas":"KS","kentucky":"KY","louisiana":"LA","massachusetts":"MA","maryland":"MD","maine":"ME","michigan":"MI","minnesota":"MN","missouri":"MO","mississippi":"MS","montana":"MT","north carolina":"NC","north dakota":"ND","nebraska":"NE","new hampshire":"NH","new jersey":"NJ","new mexico":"NM","nevada":"NV","new york":"NY","ohio":"OH","oklahoma":"OK","oregon":"OR","pennsylvania":"PA","rhode island":"RI","south carolina":"SC","south dakota":"SD","tennessee":"TN","texas":"TX","utah":"UT","virginia":"VA","vermont":"VT","washington":"WA","wisconsin":"WI","west virginia":"WV","wyoming":"WY"}
var regionKeys = Object.keys(regionDict)

var loading = false
var prevURL = ""
const groupByTZ = array =>
  array.reduce((newDict, obj) => {
  	const time = new Date(obj["formatted"])
    const k = obj["abbreviation"] + ", " + readableTimeString(time);
    const v = `${obj.cityName}, ${obj.regionName}`
    newDict[k] = (newDict[k] || []).concat([v]);
    return newDict;
  }, {});


$(document).ready(function() {
	//$('#region').prop('disabled', true);
	//$('#region-group').css('display', "none");

	var selectBox = document.getElementById('country')
	if (selectBox) {
		keys.forEach( option =>
		 	selectBox.options.add(new Option(option, countryDict[option], false)));
	}
	$('select option[value="US"]').attr("selected",true);


	selectBox = document.getElementById('region')
	if (selectBox) {
		regionKeys.forEach( option =>
			selectBox.options.add(new Option(option, regionDict[option], false)));
	}
	

	$('#country').change(function(){
        if ($(this).find("option:selected").text() == "united states") {
        	$('#region').prop('disabled', false);
        	$('#region-group').css('display', "");

        } else {
        	$('#region').prop('disabled', true);
			$('#region-group').css('display', "none");

        }
    });

	$("#form").on('submit', function(e) {
		e.preventDefault(); // prevent form from submitting
		$("#warning").remove()	

		var data = $("#form :input").serializeArray();
		console.log(data)
		var cityID2;
		var regionID2;
		var countryID2;
		data.forEach(item => {
			switch(item.name) {
				case "city_name": cityID2 = trimData(item.value)
				case "region_name": regionID2 = item.value
				case "country_name": countryID2 = item.value
				default: break;
			}
		})
		console.log("City: " + cityID2 + ` Region: ${regionID2} Country: ${countryID2}`)
		var baseURL = createURL(cityID2, regionID2, countryID2)				


		// Prohibit double clicks with loading boolean
		if (!loading && baseURL != prevURL) {
			$('input').prop('disabled', true);

			loading = true
			prevURL = baseURL
			console.log("CLICKED")
			$("#wrapper").remove()	
			$("#timezones").remove()
			$("#form").after("<div id='wrapper'> </div>")
			console.log("visiting: " + baseURL)

			fetch(baseURL)
			.then(data => {return data.json()})
			.then(function(res) {
				if (res.status == "OK") {
					const results = groupByTZ(res.zones)
					if (Object.keys(results).length == 1) {
						return parseClockFromJSON2(res.zones[0])
					} else {
						console.log(results)
						var count = 0
						$("#wrapper").append(`<br/><p id="results-count"> We narrowed your search to <span class="bold">${Object.keys(results).length}</span> timezones</p>`)
						$("#wrapper").append(`<div id="timezones"> </div>`)

						for (var key in results) { 
							var time = key.split(',')[1]
							count += 1
							$("#timezones").append(`
								<div class="timezone" id="timezone-${count}">
									<p class="timezone-header"> TIMEZONE ${count}: <span class="bold">${time}</span></p>
									<div class="cities">
									<ul id="group-${count}"></ul> 
									</div>
								</div>`)
							results[key].forEach( 
								function(city) {
									$(`#group-${count}`).append(`
										<li class="city">${city}</li>
									`)
								}
							)
							
						}
						findTallestGroup()
					}
				} else if (res.status == "FAILED") {
					$("#wrapper").append(`<br /><span id="single-result" class="bold"> Sorry, no results found. Please make sure you typed your search correctly. </span`)
					return 
				}
			})
			.then(function(time) {
				if (time) {
					console.log("Time: " + time)
				}
				loading = false
				$('input').prop('disabled', false);


			})
		}
		else {
			$("#submit").after('<span id="warning">You just requested this search!</span>')
		}

 	});
})

function trimData(x) {
  return x.replace(/^\s+|\s+$/gm,'');
}

function createURL(city, region, country) {

	var cityID = city.replace(/\s+/g, '_').toLowerCase();

	var baseURL = `https://vip.timezonedb.com/v2.1/get-time-zone?key=QYININQB0JTL&format=json&by=city&city=${cityID}`
	if (region != null) { baseURL += `&region=${region}` };
	baseURL += `&country=${country}`
	//baseURL = `https://vip.timezonedb.com/v2.1/get-time-zone?key=QYININQB0JTL&format=json&by=city&city=boston&country=US`

	return baseURL
}
function parseClockFromJSON2(json) {
	console.log(json)
	const zone = json  
	var time = zone.formatted
	time = new Date(time)
	$("#wrapper").append(`<br /><span id="single-result" class="bold"> ${readableTimeString(time)} </span`)
	console.log("TIMEE: " + readableTimeString(time))
	return time
}

function readableTimeString(time) {
	//CONVERTS Mon Apr 22 2019 00:23:15 GMT-0400 (Eastern Daylight Time) INTO: "12:23 AM"
	return time.toLocaleTimeString().replace(/:\d{2}\s/,' ') 
}

function findTallestGroup() {
	var maxHeight = -1;
	  $('.cities').each(function() {
	    maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
	 });

	 $('.cities').each(function() {
	   $(this).height(maxHeight);
	 });
}

