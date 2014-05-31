// JavaScript Document

$(document).ready(init);

function init(){
    $.ajax({
        url: 'https://api.forecast.io/forecast/9f6007799ada2c01b863eb4073f1bc3e/45.3484,-75.7570', 
        data: 'units=ca',
        dataType: 'jsonp', 
        crossDomain: true,
  		xhrFields: { withCredentials: true }
    }).done( goodData ).fail( badData );
    
    $("head").append('<link rel="stylesheet" href="css/main.css">');
}

function goodData(data){
    //----- Currently -----//
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November",
                  "December"];
    var time = new Date((data.currently.time)*1000);
    var month = months[time.getMonth()];
    var date = time.getDate();
    var year = time.getFullYear();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var summary = data.currently.summary;
    var temperature = Math.round(data.currently.temperature) + "°C";
    var humidity = Math.round(data.currently.humidity*100) + "%";
    var windSpeed = Math.round(data.currently.windSpeed) + " kph";
    
    if( minute < 10 ){
        minute = "0" + time.getMinutes();
    }
    
    $("#date-today").html(month + " " + date + " " + year + ", " + hour + ":" + minute);
    $("#summary-today").html(summary);
    $("#temp-today").html(temperature);
    $("#humidity").html("Humidity: " + humidity);
    $("#wind-speed").html("Wind Speed: " + windSpeed);
    $(".weather-icon").addClass(data.currently.icon);
    
    //----- Hourly -----//
    for(var i=1; i<24; i++){
        var date = new Date((data.hourly.data[i].time)*1000).getHours() + ":00";
        var temp = Math.round(data.hourly.data[i].temperature) + "°C";
        var summ = data.hourly.data[i].summary;
        var icon = "<img src='img/" + data.hourly.data[i].icon + ".svg'>";
        var humm = Math.round(data.hourly.data[i].humidity*100) + "%";
        var ccover = Math.round(data.hourly.data[i].cloudCover*100) + "%";
        var wspeed = Math.round(data.hourly.data[i].windSpeed) + " kph";
        
        var html = "<ul class='content'>" +
                        "<li>" + date + "</li>" +
                        "<li>" + temp + "</li>" + 
                        "<li>" + summ + "</li>" +
                        "<li>" + icon + "</li>" +
                        "<li>" + humm + "</li>" +
                        "<li>" + ccover + "</li>" +
                        "<li>" + wspeed + "</li>" +
                   "</ul>";
        
        $(".hourly").append(html);
    }
}

function badData(err){
    alert("Fatal Error");
}