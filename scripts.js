/**
 * Created by cdeguia on 6/4/16.
 */
var findGeoLoc = function () {
    var location = document.getElementById("Location");
    $.getJSON('http://ip-api.com/json', function(json) {
        var latitude = json.lat;
        var longitude = json.lon;
        getWeather(latitude, longitude);
    });
    /* Old code could be used with https servers
     if (!navigator.geolocation) {
     // geolocation is available
     location.innerHTML = "Location Not Avalable!!!";
     return;
     }

     function success(position) {
     location.style.display ='none';
     var latitude = position.coords.latitude;
     var longitude = position.coords.longitude;
     // var latlon = [latitude, longitude];
     //return latlon;
     getWeather(latitude, longitude);
     };

     function error(err) {
     location.innerHTML = "Could not get location :" + err.message;//;
     };


     location.innerHTML = "Locating...";

     window.navigator.geolocation.getCurrentPosition(success, error);
     */
}

var getWeather = function (lat, lon) {
    var genWeather;
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=4edcd13f0937d3fc27e5fdb6d41702a0')
        .done(displayWeather, getBackground);

}

var getBackground = function (json) {
    var output = document.getElementById("backimage");
    var sky = json.weather[0].main;
    var API_KEY = '2248864-763eb06a3ab860bf7a897c3fe';
    var URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(sky) + "&image_type=photo&category=nature";

    $.getJSON(URL, function(data) {
        if (parseInt(data.totalHits) > 0){
            output.style.background = 'url(' + data.hits[0].webformatURL + ')  no-repeat center center fixed';
            output.style.backgroundSize = 'cover';

        }
        else
            console.log('No hits');
    });

}

var displayWeather = function (json) {
    if( json.name ){ city.innerHTML = json.name; }else{ city.innerHTML = "Location not found"; }

    lat.textContent = json.coord.lat + '° ';
    lon.textContent = json.coord.lon + '° ';
    genweather.innerHTML = "<img class = 'icon' src = 'http://openweathermap.org/img/w/"+json.weather[0].icon+".png'/>"
    //genweather.textContent = json.weather[0].main;
    current.innerHTML = Math.round(json.main.temp) + '°F' ;
    min.textContent = Math.round(json.main.temp_min) + '°F';
    max.textContent = Math.round(json.main.temp_max) + '°F'; // +  JSON.stringify(json);
}

var FtoC = function (num) {
    function convert(str, p1, offset, num) {
        return (Math.round((p1 - 32) * 5/9)) + '°C';
    }
    var test = /(-?\d+(?:\.\d*)?)°F\b/g;
    return num.replace(test, convert);
}
var CtoF = function (num) {
    function convert(str, p1, offset, num) {
        return (Math.round((p1  * 9/5) + 32) + '°F');
    }
    var test = /(-?\d+(?:\.\d*)?)°C\b/g;
    return num.replace(test, convert);
}

function winResize() {
    document.getElementById('backimage').style.height = window.innerHeight + 'px';
}
winResize();

$(window).ready(function() {
    var loc = new findGeoLoc;
    getWeather(loc[0], loc[1]);

    $('#cf').on('click', function(){
        var tempCur = String(document.getElementById("current").textContent);
        var tempMin = String(document.getElementById("min").textContent);
        var tempMax = String(document.getElementById("max").textContent);

        if(tempCur.charAt(tempCur.length-1) == 'F'){
            document.getElementById("current").textContent = FtoC(tempCur);
            document.getElementById("min").textContent = FtoC(tempMin);
            document.getElementById("max").textContent = FtoC(tempMax);
        }else{
            document.getElementById("current").textContent = CtoF(tempCur);
            document.getElementById("min").textContent = CtoF(tempMin);
            document.getElementById("max").textContent = CtoF(tempMax);
        }
    });
});
