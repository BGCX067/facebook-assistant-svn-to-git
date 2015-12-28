var geocoder;
var map;
var markers = [];
var capitals = [];
var citiesWeather = {};
var lastInfoWindow;
var lastInfoWindowClick;
var lastMarker;
var boundingBox;

function initialize() {
	// MAP
	var latlng = new google.maps.LatLng(46.95, 7.45);
	var options = {
		zoom : 6,
		center : latlng,
		mapTypeControl : false,
		mapTypeId : google.maps.MapTypeId.HYBRID
	};

	map = new google.maps.Map(document.getElementById("map_canvas"), options);

	// GEOCODER
	geocoder = new google.maps.Geocoder();
}

function placeCountry(country) {
	  $.each(markers, function() {
		  this.setMap(null);
	  });
	  markers = [];
	  
	// draw new
	geocoder.geocode({
		'address' : country
	}, function(results, status) {
		var ne = results[0].geometry.viewport.getNorthEast();
		var sw = results[0].geometry.viewport.getSouthWest();

		map.fitBounds(results[0].geometry.viewport);

		var boundingBoxPoints = [ ne,
				new google.maps.LatLng(ne.lat(), sw.lng()), sw,
				new google.maps.LatLng(sw.lat(), ne.lng()), ne ];
		
	});
}

function fadeOut(line, keepAround, fadeDuration){
    keepAround = keepAround || 1000;
    fadeDuration = fadeDuration || 500;

    setTimeout(function(){
        var startingOpacity = line.strokeOpacity,
            startTime = (new Date()).getTime();
                    
        function step(){
            var currentTime = (new Date()).getTime(),
                elapsed = currentTime - startTime,
                targetOpacity = startingOpacity - startingOpacity * (elapsed/fadeDuration);
                            
            line.setOptions({
                strokeOpacity: targetOpacity
            });
                       
            if(elapsed >= fadeDuration){
                line.setMap(null);
            } else {
                setTimeout(step, 30);
            }
        }
        setTimeout(step, 30);
    }, keepAround);
}

function createInfoWindowContent(city, data){
	r = "<div id='info_title'>"+city+"</div><br/>";
	r +="<div style='float:left; width:300px'> <div style='display:block; clear:left'>";
	var sky = "";
	
	if(data.SkyConditions != "null"){
		sky = data.SkyConditions;
	}
	
	image = "images/weather/small/";
	if(sky.indexOf("clear") != -1){
		image += "clear.png";
	}else if(sky.indexOf("cloud") != -1){
		image += "clouds.png";
	}else if(sky.indexOf("overcast") != -1){
		image += "overcast.png";
	}else if(sky.indexOf("rain") != -1){
		image += "showers.png";
	}else if(sky.indexOf("snow") != -1){
		image += "snow.png";
	}else if(sky.indexOf("storm") != -1){
		image += "storm.png";
	}else{
		image += "missing.png";
	}
	r += "<div style='float:left' jstcache='0'>" +
		 "<img src='"+image+"' /></div>";
	
	r += "<div style='float:left' jstcache='0'>";
	
	if(data.Temperature !="null" && data.Temperature != ""){
		r += "<div style='display:block; clear:left; font-size:large; font-weight:bold; padding-left: 15px;'>"+data.Temperature+"</div>";
	}
		
	r += "<div style='display:block; clear:left' jstcache='0'>";
	
	if(data.DewPoint != "null" && data.DewPoint != ""){
		r += "<div style='float:left; text-align:center; font-size:small; color:gray; padding-left: 15px;'>"+data.DewPoint+"</div> ";
	}
	r += "</div></div></div>";

	if (sky == "null" || sky == "") { sky = "unknown"; };
	r += "<div style='padding-top: 10px;display:block; color:gray; clear:left; font-size:small'>Sky: <b>"+sky+"</b></div>";
	
	if(data.RelativeHumidity != "null" && data.RelativeHumidity != ""){
		r += "<div style='display:block; clear:left; color:gray; font-size:small'>Humidity: "+data.RelativeHumidity+"</div>";
	}
	if(data.Wind != "null" && data.Wind != ""){
		r += "<div style='display:block; clear:left; color:gray; font-size:small'>Wind: "+data.Wind.replace(":0", "")+"</div> ";
	}
	
	
	r += "</div>";
	
	return r;
}

function placeCity(city,currentCountry) {

	geocoder.geocode({'address' : city+", "+currentCountry},function(results, status) {
		console.log(status);
		if (status == "ERROR" || status == "ZERO_RESULTS") {
			var html = "The city "+city+" could not be located on the map.";
			$( "#dialog" ).html(html).dialog({ title:'Error', buttons: { "Ok": function() { $(this).dialog("close"); } } });
			return;
		}
		var marker = new google.maps.Marker({
			map : map,
			position : results[0].geometry.location,
			title : city
		});
		markers.push(marker);
		latMarker = marker;
		var infowindow = new google.maps.InfoWindow({content : "", maxWidth:"500px"});
		infowindow.content = "<div align='center'><img src='images/ajax-loader.gif'/></div>";
		
		$.getJSON('JSONResponse.jsp', { req:"getWeather", city: marker.title, country: currentCountry}, function(data) {
			 if (!data.errors) {
				 infowindow.setContent(createInfoWindowContent(marker.title, data));			 
				 
			 } else {
				 var errs = data.errors.join(",<br>");
				 infowindow.setContent("<div width='150px'><p style='float:left;color:black'>"+errs+"</p><img style='float:right' src='images/meme/sad.jpeg' height='80px'/></div>");
			 }
		 });

		
		if (lastInfoWindow instanceof google.maps.InfoWindow) {
			lastInfoWindow.close();
		}
		
		lastInfoWindow = infowindow;
		infowindow.open(map, marker);
		
		google.maps.event.addListener(marker,'click',function() {
			if (lastInfoWindow instanceof google.maps.InfoWindow) {
				lastInfoWindow.close();
			}
			lastInfoWindow = infowindow;
			infowindow.open(map, marker);
			
		});
	});
}

function placeCapital(capital) {
	$.each(capitals, function() {
		this.setMap(null);
	});
	capitals = [];
	geocoder.geocode({'address' : capital},function(results, status) {
		console.log(status);
	
	  var image = new google.maps.MarkerImage('images/flag.png',
	      new google.maps.Size(20, 32),
	      new google.maps.Point(0,0),
	      new google.maps.Point(0, 32));
	  var shadow = new google.maps.MarkerImage('images/flag_shadow.png',
	      new google.maps.Size(37, 32),
	      new google.maps.Point(0,0),
	      new google.maps.Point(0, 32));
	  
	  var shape = {
	      coord: [1, 1, 1, 20, 18, 20, 18 , 1],
	      type: 'poly'
	  };
	  
	  var marker = new google.maps.Marker({
		  position:  results[0].geometry.location,
		  map: map,
		  shadow: shadow,
		  icon: image,
		  shape: shape,
		  title: capital
	  });
	  capitals.push(marker);
	});
}
