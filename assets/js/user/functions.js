function metaData() {
    var metaDataList = [];
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","https://docs.google.com/spreadsheets/d/1q4CHyNi7gOkNkA1BeX5afx97I-pBHtZ-7EjwHJ_iX8Q/htmlview", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = new DOMParser().parseFromString(this.responseText, "text/html");
            var metaDataList = response.evaluate("//div[@id='sheets-viewport']/div[@id='0']//table[@class='waffle']/tbody/tr/td/text()",response,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            /*******************************************
            Generating Response list for upcomingEvents
            *******************************************/
             var eventsCollection =  response.evaluate("//div[@id='sheets-viewport']/div[@id='2028578058']//table[@class='waffle']/tbody/tr/td//text()",response,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
             // Skip the first 10 entries and start the iteration.
             var snapIternation = 10;
             var eventsList = new Array();
             for(outerCounter=0;outerCounter < parseInt(metaDataList.snapshotItem(1).nodeValue); outerCounter++) {
                 eventsList[outerCounter] = new Array();
                 for(innerCounter=0;innerCounter<=9;innerCounter++)
                    eventsList[outerCounter][innerCounter] = eventsCollection.snapshotItem(snapIternation++).nodeValue;
             }
            /*******************************************
            Generating Response list for Webinars
            *******************************************/
            var webinarsCollection =  response.evaluate("//div[@id='sheets-viewport']/div[@id='90094189']//table[@class='waffle']/tbody/tr/td//text()",response,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            // Skip the first 10 entries and start the iteration.
            snapIternation = 10;
            var webinarsList = new Array();
            for(outerCounter=0;outerCounter < parseInt(metaDataList.snapshotItem(3).nodeValue); outerCounter++) {
                webinarsList[outerCounter] = new Array();
                for(innerCounter=0;innerCounter<=9;innerCounter++)
                   webinarsList[outerCounter][innerCounter] = webinarsCollection.snapshotItem(snapIternation++).nodeValue;
            }
            /*******************************************
            Generating Response list for team
            *******************************************/
            var teamCollection =  response.evaluate("//div[@id='sheets-viewport']/div[@id='1682513732']//table[@class='waffle']/tbody/tr/td//text()",response,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            // Skip the first 11 entries and start the iteration.
            snapIternation = 11;
            var teamList = new Array();
            for(outerCounter=0;outerCounter < parseInt(metaDataList.snapshotItem(5).nodeValue); outerCounter++) {
                teamList[outerCounter] = new Array();
                for(innerCounter=0;innerCounter<=10;innerCounter++)
                   teamList[outerCounter][innerCounter] = teamCollection.snapshotItem(snapIternation++).nodeValue;
            }
            /*******************************************
            Generating Response list for eventPhotos
            *******************************************/
            var photosCollection = response.evaluate("//div[@id='sheets-viewport']/div[@id='1468184677']//table[@class='waffle']/tbody/tr/td//text()",response,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            // Skip the first 11 entries and start the iteration.
            snapIternation = 4;
            var albumList = new Array();
            for(outerCounter=0;outerCounter < parseInt(metaDataList.snapshotItem(7).nodeValue); outerCounter++) {
                albumList[outerCounter] = new Array();
                for(innerCounter=0;innerCounter<=3;innerCounter++)
                   albumList[outerCounter][innerCounter] = photosCollection.snapshotItem(snapIternation++).nodeValue;
            }
            /*******************************************
            Calling Functions for generating the html
            *******************************************/
            upcomingEvents(parseInt(metaDataList.snapshotItem(1).nodeValue),eventsList);
            previousWebinars(parseInt(metaDataList.snapshotItem(3).nodeValue),webinarsList);
            team(parseInt(metaDataList.snapshotItem(5).nodeValue),teamList);
            eventPhotos(parseInt(metaDataList.snapshotItem(7).nodeValue), albumList);
        }
    };
}

function upcomingEvents(numberOfEvents,eventsList) {
    if(numberOfEvents!=-1) {
        var eventsListContainer = document.getElementById('eventsListContainer');
        eventsListContainer.innerHTML = '';
        for (x in eventsList){
                var html = '<div class="col-xs-3 eventBox col-centered text-center"><div class="row"><img class="eventThumb" alt="Poster" src="'+eventsList[x][0]+'"></div><div class="row eventTitle"><div class="col-lg-12 text-center"><h2>'+eventsList[x][1]+'</h2></div></div><div class="row eventInfo"><div class="col-xs-7 eventDesc"><div class="row eventDescInfo"><div class="col-lg-12"><p class="eventDescInfoContainer">'+eventsList[x][2]+'</p></div></div></div><div class="col-xs-5 eventTiming text-left"><div class="date"><i class="fa fa-calendar icon"></i><span><strong>'+eventsList[x][3]+'</strong></span></div><div class="startTimimg"><i class="fa fa-clock-o icon"></i><span><strong>'+eventsList[x][4]+'</strong></span></div><div class="endTimimg"><i class="fa fa-clock-o icon"></i><span><strong>'+eventsList[x][5]+'</strong></span></div><div class="eventLocation"><i class="fa fa-map-marker icon"></i><span><strong>'+eventsList[x][6];
            if(eventsList[x][7] == 0)
                html += '</strong></span></div><div class="eventOD"><i class="fa fa-thumbs-down icon text-danger"></i><span><strong>OD</strong></span></div></div></div>';
            else
                html += '</strong></span></div><div class="eventOD"><i class="fa fa-thumbs-up icon btn-success"></i><span><strong>OD</strong></span></div></div></div>';
                html += '<div class="row eventCTA"><div class="col-xs-12 text-center"><a href="'+eventsList[x][8]+'" target="_blank"><button class="event-buttons">'+eventsList[x][9]+'</button></a></div></div></div>';
            eventsListContainer.innerHTML += html ;
        }
    }
}

function previousWebinars(numberOfWebinars, webinarsList) {
    if(numberOfWebinars!=-1) {
        var webinarsListContainer = document.getElementById('webinarsListContainer');
        webinarsListContainer.innerHTML = '';
        for (x in webinarsList){
            var html = '<div class="item"><div class=" col-lg-3 youtubeBox col-centered text-center"><div class="row youtubeVideoContainer"><img src="'+webinarsList[x][0]+'"/><a href="'+webinarsList[x][1]+'" target="_blank"><div class="video-overlay hover-opacity background-overlay background-overlay-20"><i class="fa fa-play fa-4x text-danger absolute-center play-icon" aria-hidden="true"></i></div></a></div><div class="row youtubeInfoContainer"><div class="row youtubeVideoTitleContainer"><div class="col-lg-12"><h2 class="youtubeVideoTitletext-small"><a href="'+webinarsList[x][1]+'" target="_blank">'+webinarsList[x][2]+'</a></h2></div></div><div class="row youtubeVideoDescContainer"><div class="col-lg-12"><p class="youtubeVideoDesc">'+webinarsList[x][3]+'<br><strong>Speakers:</strong><br><a class="linkStyles" href = "'+webinarsList[x][5]+'">'+webinarsList[x][4]+'</a>';
            if(webinarsList[x][6] != -1)
                html += '<br><a class="linkStyles" href = "'+webinarsList[x][7]+'">'+webinarsList[x][6]+'</a>';
            if(webinarsList[x][8] != -1)
                html += '<br><a class="linkStyles" href = "'+webinarsList[x][9]+'">'+webinarsList[x][8]+'</a>';
            html += '</p></div></div></div></div></div>';
            webinarsListContainer.innerHTML += html;
        }
        initWebinarOwl();
    }
}

function team(memberNumber, teamList) {
    if(memberNumber!=-1) {
        var teamListContainer = document.getElementById('teamListContainer');
        teamListContainer.innerHTML = '';
        for (x in teamList){
            if(document.body.clientWidth < 665)
                var html = '<div class="col-lg-2 teamBox col-centered"><div class="row teamPhotoContainer"><img src="'+teamList[x][0]+'" alt="'+teamList[x][1]+'" title="'+teamList[x][1]+'" height="250px" width="250px"></div><div class="row bottom-border bottom-border-success bottom-border-40 teamInfoContainer text-left"><div class="col-xs-12 teamName no-padding">'+teamList[x][1]+'</div><div class="col-xs-12 teamDesignation no-padding">'+teamList[x][2]+'</div></div><div class="row teamSocial">';
            else
                var html = '<div class="col-lg-2 teamBox col-centered"><div class="row teamPhotoContainer  horizon-center hover-opacity hover-opacity-80"><img src="'+teamList[x][0]+'" alt="'+teamList[x][1]+'" title="'+teamList[x][1]+'" height="250px" width="250px"></div><div class="row bottom-border bottom-border-success bottom-border-40 teamInfoContainer text-left"><div class="col-xs-12 teamName no-padding">'+teamList[x][1]+'</div><div class="col-xs-12 teamDesignation no-padding">'+teamList[x][2]+'</div></div><div class="row teamSocial">';
            if(teamList[x][3] != -1)
            html += '<div class="col-xs-2 no-padding"><a href="'+teamList[x][3]+'" target="_blank" title="Github"><span class="fa-stack fa-lg pull-left hover-opacity"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-github fa-stack-1x"></i></span></a></div>';
            if(teamList[x][4] != -1)
            html += '<div class="col-xs-2 no-padding"><a href="'+teamList[x][4]+'" target="_blank" title="Mail"><span class="fa-stack fa-lg pull-left hover-opacity"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-envelope fa-stack-1x"></i></span></a></div>';
            if(teamList[x][5] != -1)
            html += '<div class="col-xs-2 no-padding"><a href="'+teamList[x][5]+'" target="_blank" title="Telegram"><span class="fa-stack fa-lg pull-left hover-opacity"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-telegram fa-stack-1x"></i></span></a></div>';
            if(teamList[x][6] != -1)
            html += '<div class="col-xs-2 no-padding"><a href="'+teamList[x][6]+'" target="_blank" title="LinkedIn"><span class="fa-stack fa-lg pull-left hover-opacity"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-linkedin fa-stack-1x"></i></span></a></div>';
            if(teamList[x][7] != -1)
            html += '<div class="col-xs-2 no-padding"><a href="'+teamList[x][7]+'" target="_blank" title="Facebook"><span class="fa-stack fa-lg pull-left hover-opacity"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-facebook fa-stack-1x"></i></span></a></div>';
            if(teamList[x][8] != -1)
            html += '<div class="col-xs-2 no-padding"><a href="'+teamList[x][8]+'" target="_blank" title="Twitter"><span class="fa-stack fa-lg pull-left hover-opacity"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-twitter fa-stack-1x"></i></span></a></div>';
            if(teamList[x][9] != -1)
            html += '<div class="col-xs-2 no-padding"><a href="'+teamList[x][9]+'" target="_blank" title="Instagram"><span class="fa-stack fa-lg pull-left hover-opacity"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-instagram fa-stack-1x"></i></span></a></div>';
            if(teamList[x][10] != -1)
            html += '<div class="col-xs-2 no-padding"><a href="'+teamList[x][10]+'" target="_blank" title="Website"><span class="fa-stack fa-lg pull-left hover-opacity"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-link fa-stack-1x"></i></span></a></div>';
            html += '</div></div>';
            teamListContainer.innerHTML += html;
        }
        if(document.body.clientWidth < 665)
            initTeamOwl();
    }
}

function eventPhotos(numberOfAlbums, albumList) {
    if(numberOfAlbums!=-1) {
        var eventPhotosContainer = document.getElementById('eventPhotosContainer');
        albumList = albumList.reverse();
        eventPhotosContainer.innerHTML = '';
        for (x in albumList) {
            var html = '<div class="picsBox col-centered"><a href="'+albumList[x][0]+'" target="_blank"><div class="row"><div class="coverpics"><img src="'+albumList[x][1]+'"></div></div><div class="row"><div class="picsText">'+albumList[x][2]+'</div></div><div class="row"><div class="picsDate">'+albumList[x][3]+'</div></div></a></div>';
            eventPhotosContainer.innerHTML += html;
        }
        initAlbumOwl();
    }
}
