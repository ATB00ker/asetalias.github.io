metaData();
function metaData() {
    var metaDataList = [];
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","https://sheets.googleapis.com/v4/spreadsheets/1q4CHyNi7gOkNkA1BeX5afx97I-pBHtZ-7EjwHJ_iX8Q/values/Meta!B1:B2?majorDimension=COLUMNS&key=AIzaSyBKHdcIxNSs4MahPzPepO99YGilHD5wgKs", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var metaDataList = JSON.parse(this.responseText);
            upcomingEvents(metaDataList.values[0][0]);
            previousWebinars(metaDataList.values[0][1]);
        } else {
            upcomingEvents(-1);
            previousWebinars(-1);
        }
    };
}
function upcomingEvents(numberOfEvents) {
    var eventsListContainer = document.getElementById('eventsListContainer');
    var eventsList = [];
    var xhttp = new XMLHttpRequest();
    if(numberOfEvents!=-1) {
        xhttp.open("GET",'https://sheets.googleapis.com/v4/spreadsheets/1q4CHyNi7gOkNkA1BeX5afx97I-pBHtZ-7EjwHJ_iX8Q/values/Events!A2:J'+(++numberOfEvents)+'?key=AIzaSyBKHdcIxNSs4MahPzPepO99YGilHD5wgKs', true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var eventsList = JSON.parse(this.responseText);
                eventsListContainer.innerHTML = '';
                for (x in eventsList.values){
                    var html = '<div class="col-xs-3 eventBox col-centered text-center"><div class="row"><img class="eventThumb" alt="Poster" src="'+eventsList.values[x][0]+'"></div><div class="row eventTitle"><div class="col-lg-12 text-center"><h2>'+eventsList.values[x][1]+'</h2></div></div><div class="row eventInfo"><div class="col-xs-7 eventDesc"><div class="row eventDescInfo"><div class="col-lg-12"><p class="eventDescInfoContainer">'+eventsList.values[x][2]+'</p></div></div></div><div class="col-xs-5 eventTiming text-left"><div class="date"><i class="fa fa-calendar icon"></i><span><strong>'+eventsList.values[x][3]+'</strong></span></div><div class="startTimimg"><i class="fa fa-clock-o icon"></i><span><strong>'+eventsList.values[x][4]+'</strong></span></div><div class="endTimimg"><i class="fa fa-clock-o icon"></i><span><strong>'+eventsList.values[x][5]+'</strong></span></div><div class="eventLocation"><i class="fa fa-map-marker icon"></i><span><strong>'+eventsList.values[x][6];
                    if(eventsList.values[x][7] == 0)
                    html += '</strong></span></div><div class="eventOD"><i class="fa fa-thumbs-down icon text-danger"></i><span><strong>OD</strong></span></div></div></div>';
                    else
                    html += '</strong></span></div><div class="eventOD"><i class="fa fa-thumbs-up icon btn-success"></i><span><strong>OD</strong></span></div></div></div>';
                    html += '<div class="row eventCTA"><div class="col-xs-12 text-center"><a href="'+eventsList.values[x][8]+'" target="_blank"><button class="event-buttons">'+eventsList.values[x][9]+'</button></a></div></div></div>';
                    eventsListContainer.innerHTML += html ;
                }
            }
        };
    }
}
function previousWebinars(numberOfWebinars) {
    var webinarsListContainer = document.getElementById('webinarsListContainer');
    var webinarsList = [];
    var xhttp = new XMLHttpRequest();
    if(numberOfWebinars!=-1) {
        xhttp.open("GET",'https://sheets.googleapis.com/v4/spreadsheets/1q4CHyNi7gOkNkA1BeX5afx97I-pBHtZ-7EjwHJ_iX8Q/values/Webinars!A2:J'+(++numberOfWebinars)+'?key=AIzaSyBKHdcIxNSs4MahPzPepO99YGilHD5wgKs', true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var webinarsList = JSON.parse(this.responseText);
                webinarsListContainer.innerHTML = '';
                for (x in webinarsList.values){
                    var html = '<div class="item"><div class=" col-lg-3 youtubeBox col-centered text-center"><div class="row youtubeVideoContainer"><img src="'+webinarsList.values[x][0]+'"/><a href="'+webinarsList.values[x][1]+'" target="_blank"><div class="video-overlay hover-opacity background-overlay background-overlay-20"><i class="fa fa-play fa-4x text-danger absolute-center play-icon"></i></div></a></div><div class="row youtubeInfoContainer"><div class="row youtubeVideoTitleContainer"><div class="col-lg-12"><h2 class="youtubeVideoTitletext-small"><a href="'+webinarsList.values[x][1]+'" target="_blank">'+webinarsList.values[x][2]+'</a></h2></div></div><div class="row youtubeVideoDescContainer"><div class="col-lg-12"><p class="youtubeVideoDesc">'+webinarsList.values[x][3]+'<br><strong>Speakers:</strong><br><a class="linkStyles" href = "'+webinarsList.values[x][5]+'">'+webinarsList.values[x][4]+'</a>';
                    if(webinarsList.values[x][6] != null)
                        html += '<br><a class="linkStyles" href = "'+webinarsList.values[x][7]+'">'+webinarsList.values[x][6]+'</a>';
                    if(webinarsList.values[x][8] != null)
                        html += '<br><a class="linkStyles" href = "'+webinarsList.values[x][9]+'">'+webinarsList.values[x][8]+'</a>';
                    html += '</p></div></div></div></div></div>';
                    webinarsListContainer.innerHTML += html;
                }
                initWebinarOwl();
            }
        };
    }
}
