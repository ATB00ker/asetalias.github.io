metaData();
function metaData() {
    var metaDataList = [];
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","https://sheets.googleapis.com/v4/spreadsheets/1q4CHyNi7gOkNkA1BeX5afx97I-pBHtZ-7EjwHJ_iX8Q/values/Meta!B1:B4?majorDimension=COLUMNS&key=AIzaSyBKHdcIxNSs4MahPzPepO99YGilHD5wgKs", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var metaDataList = JSON.parse(this.responseText);
            upcomingEvents(metaDataList.values[0][0]);
            previousWebinars(metaDataList.values[0][1]);
            team(metaDataList.values[0][2]);
            eventPhotos(metaDataList.values[0][3]);
        } else {
            upcomingEvents(-1);
            previousWebinars(-1);
            team(-1);
            eventPhotos(-1);
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
                    var html = '<div class="item"><div class=" col-lg-3 youtubeBox col-centered text-center"><div class="row youtubeVideoContainer"><img src="'+webinarsList.values[x][0]+'"/><a href="'+webinarsList.values[x][1]+'" target="_blank"><div class="video-overlay hover-opacity background-overlay background-overlay-20"><i class="fa fa-play fa-4x text-danger absolute-center play-icon" aria-hidden="true"></i></div></a></div><div class="row youtubeInfoContainer"><div class="row youtubeVideoTitleContainer"><div class="col-lg-12"><h2 class="youtubeVideoTitletext-small"><a href="'+webinarsList.values[x][1]+'" target="_blank">'+webinarsList.values[x][2]+'</a></h2></div></div><div class="row youtubeVideoDescContainer"><div class="col-lg-12"><p class="youtubeVideoDesc">'+webinarsList.values[x][3]+'<br><strong>Speakers:</strong><br><a class="linkStyles" href = "'+webinarsList.values[x][5]+'">'+webinarsList.values[x][4]+'</a>';
                    if(webinarsList.values[x][6] != -1)
                        html += '<br><a class="linkStyles" href = "'+webinarsList.values[x][7]+'">'+webinarsList.values[x][6]+'</a>';
                    if(webinarsList.values[x][8] != -1)
                        html += '<br><a class="linkStyles" href = "'+webinarsList.values[x][9]+'">'+webinarsList.values[x][8]+'</a>';
                    html += '</p></div></div></div></div></div>';
                    webinarsListContainer.innerHTML += html;
                }
                initWebinarOwl();
            }
        };
    }
}

function team(memberNumber) {
    var teamListContainer = document.getElementById('teamListContainer');
    var teamList = [];
    var xhttp = new XMLHttpRequest();
    if(memberNumber!=-1) {
        xhttp.open("GET",'https://sheets.googleapis.com/v4/spreadsheets/1q4CHyNi7gOkNkA1BeX5afx97I-pBHtZ-7EjwHJ_iX8Q/values/Team!A2:K'+(++memberNumber)+'?key=AIzaSyBKHdcIxNSs4MahPzPepO99YGilHD5wgKs', true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var teamList = JSON.parse(this.responseText);
                teamListContainer.innerHTML = '';
                for (x in teamList.values){
                    if(document.body.clientWidth < 665)
                        var html = '<div class="col-lg-2 teamBox col-centered"><div class="row teamPhotoContainer"><img src="'+teamList.values[x][0]+'" alt="'+teamList.values[x][1]+'" title="'+teamList.values[x][1]+'" height="250px" width="250px"></div><div class="row bottom-border bottom-border-success bottom-border-40 teamInfoContainer text-left"><div class="col-xs-12 teamName no-padding">'+teamList.values[x][1]+'</div><div class="col-xs-12 teamDesignation no-padding">'+teamList.values[x][2]+'</div></div><div class="row teamSocial">';
                    else
                        var html = '<div class="col-lg-2 teamBox col-centered"><div class="row teamPhotoContainer  horizon-center hover-opacity hover-opacity-80"><img src="'+teamList.values[x][0]+'" alt="'+teamList.values[x][1]+'" title="'+teamList.values[x][1]+'" height="250px" width="250px"></div><div class="row bottom-border bottom-border-success bottom-border-40 teamInfoContainer text-left"><div class="col-xs-12 teamName no-padding">'+teamList.values[x][1]+'</div><div class="col-xs-12 teamDesignation no-padding">'+teamList.values[x][2]+'</div></div><div class="row teamSocial">';
                    if(teamList.values[x][3] != -1)
                    html += '<div class="col-xs-2 no-padding"><a href="'+teamList.values[x][3]+'" target="_blank" title="Github"><span class="fa-stack fa-lg pull-left hover-opacity"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-github fa-stack-1x"></i></span></a></div>';
                    if(teamList.values[x][4] != -1)
                    html += '<div class="col-xs-2 no-padding"><a href="'+teamList.values[x][4]+'" target="_blank" title="Mail"><span class="fa-stack fa-lg pull-left hover-opacity"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-envelope fa-stack-1x"></i></span></a></div>';
                    if(teamList.values[x][5] != -1)
                    html += '<div class="col-xs-2 no-padding"><a href="'+teamList.values[x][5]+'" target="_blank" title="Telegram"><span class="fa-stack fa-lg pull-left hover-opacity"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-telegram fa-stack-1x"></i></span></a></div>';
                    if(teamList.values[x][6] != -1)
                    html += '<div class="col-xs-2 no-padding"><a href="'+teamList.values[x][6]+'" target="_blank" title="LinkedIn"><span class="fa-stack fa-lg pull-left hover-opacity"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-linkedin fa-stack-1x"></i></span></a></div>';
                    if(teamList.values[x][7] != -1)
                    html += '<div class="col-xs-2 no-padding"><a href="'+teamList.values[x][7]+'" target="_blank" title="Facebook"><span class="fa-stack fa-lg pull-left hover-opacity"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-facebook fa-stack-1x"></i></span></a></div>';
                    if(teamList.values[x][8] != -1)
                    html += '<div class="col-xs-2 no-padding"><a href="'+teamList.values[x][8]+'" target="_blank" title="Twitter"><span class="fa-stack fa-lg pull-left hover-opacity"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-twitter fa-stack-1x"></i></span></a></div>';
                    if(teamList.values[x][9] != -1)
                    html += '<div class="col-xs-2 no-padding"><a href="'+teamList.values[x][9]+'" target="_blank" title="Instagram"><span class="fa-stack fa-lg pull-left hover-opacity"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-instagram fa-stack-1x"></i></span></a></div>';
                    if(teamList.values[x][10] != -1)
                    html += '<div class="col-xs-2 no-padding"><a href="'+teamList.values[x][10]+'" target="_blank" title="Website"><span class="fa-stack fa-lg pull-left hover-opacity"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-link fa-stack-1x"></i></span></a></div>';
                    html += '</div></div>';
                    teamListContainer.innerHTML += html;
                }
                if(document.body.clientWidth < 665)
                    initTeamOwl();
            }
        };
    }
}

function eventPhotos(numberOfAlbums) {
    var eventPhotosContainer = document.getElementById('eventPhotosContainer');
    var albumList = [];
    var xhttp = new XMLHttpRequest();
    if(numberOfAlbums!=-1) {
        xhttp.open("GET",'https://sheets.googleapis.com/v4/spreadsheets/1q4CHyNi7gOkNkA1BeX5afx97I-pBHtZ-7EjwHJ_iX8Q/values/Albums!A2:D'+(++numberOfAlbums)+'?key=AIzaSyBKHdcIxNSs4MahPzPepO99YGilHD5wgKs', true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var albumList = JSON.parse(this.responseText);
                albumList = albumList.values.reverse();
                eventPhotosContainer.innerHTML = '';
                for (x in albumList) {
                    var html = '<div class="picsBox col-centered"><a href="'+albumList[x][0]+'" target="_blank"><div class="row"><div class="coverpics"><img src="'+albumList[x][1]+'"></div></div><div class="row"><div class="picsText">'+albumList[x][2]+'</div></div><div class="row"><div class="picsDate">'+albumList[x][3]+'</div></div></a></div>';
                    eventPhotosContainer.innerHTML += html;
                }
                initAlbumOwl();
            }
        };
    }
}
