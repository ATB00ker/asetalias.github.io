/*******************************
* Push API
*******************************/
// Push Permission
function pushPermission() {
    return new Promise(function(resolve, reject) {
        const permissionResult = Notification.requestPermission(function(result) {
            resolve(result);
        }).then(function (result){
            if(result == 'granted')
                subscribeUserToPush();
            else
                Materialize.toast('Requires Permission to display Notification; Please go to browser settings for the same!', 4000);
        });
    })
}


// Subscribe to Push
function subscribeUserToPush() {
    hideNotificationBell();
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('BKNmZNhH7cszaNYeHKxwf7fnb56EW84vRCiWD4P_HkwQUcAC5lWGbJXac0IMIQKHq6zekdImGimQ49SFAWEmIc0')};
        return serviceWorkerRegistration.pushManager.subscribe(subscribeOptions);
    }).then(function(pushSubscription) {
        var formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScbQRYw3xAwnJ66-C3NJg0H7VKwnjskL1-WDTSiu0Xrr0P47A/formResponse?usp=pp_url&entry.1105693128="+JSON.stringify(pushSubscription)+"&submit=Submit";
        document.getElementById('formIframe').innerHTML = "<iframe class='hidden' src="+formUrl+"></iframe>";
        showNotificationBell();
        document.getElementById('notificationChannelEvents').setAttribute("checked","checked");
        document.getElementById('notificationChannelWebinars').setAttribute("checked","checked");
        document.getElementById('notificationChannelProjects').setAttribute("checked","checked");
        notificationChannelSubscription();
    });
}


// Unsubscribe to Push
function unsubscribeUserToPush() {
    hideNotificationBell();
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription().then(function(subscription) {
            if(subscription)
                return subscription.unsubscribe();
        }).then(function() {
            showNotificationBell();
        });
    });
}


// Hide Notification Bell if Push API or Sync API is not supported.
function showNotificationBell() {
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription().then(function(subscription) {
            var notificationIconContainer = document.getElementById('notificationIconContainer');
            if(subscription) {
                notificationIconContainer.innerHTML = "<i onclick='unsubscribeUserToPush()' style='color: #000' class='toggleIcons fa fa-toggle-on'> Notifications</i>";
                document.getElementById('notificationChannelEvents').removeAttribute("disabled");
                document.getElementById('notificationChannelWebinars').removeAttribute("disabled");
                document.getElementById('notificationChannelProjects').removeAttribute("disabled");
                var notificationChannelListItems = document.getElementsByClassName('notificationChannelListItem');
                for(var nodeElement = 0; nodeElement < notificationChannelListItems.length; nodeElement++) {
                    notificationChannelListItems[nodeElement].setAttribute("style","color: #000");
                }
            } else {
                notificationIconContainer.innerHTML = "<i onclick='pushPermission()' style='color: #000' class='toggleIcons fa fa-toggle-off'> Notifications</i>";
                document.getElementById('notificationChannelEvents').setAttribute("disabled","disabled");
                document.getElementById('notificationChannelWebinars').setAttribute("disabled","disabled");
                document.getElementById('notificationChannelProjects').setAttribute("disabled","disabled");
                var notificationChannelListItems = document.getElementsByClassName('notificationChannelListItem');
                for(var nodeElement = 0; nodeElement < notificationChannelListItems.length; nodeElement++) {
                    notificationChannelListItems[nodeElement].setAttribute("style","color: #9e9e9e");
                }
            }
        });
    });
}


function hideNotificationBell() {
    var notificationIconContainer = document.getElementById('notificationIconContainer');
    notificationIconContainer.innerHTML = "<i style='color: #9F9F9F' class='toggleIcons fa fa-toggle-off'> Notifications</i>";
    document.getElementById('notificationChannelEvents').setAttribute("disabled","disabled");
    document.getElementById('notificationChannelWebinars').setAttribute("disabled","disabled");
    document.getElementById('notificationChannelProjects').setAttribute("disabled","disabled");
    var notificationChannelListItems = document.getElementsByClassName('notificationChannelListItem');
    for(var nodeElement = 0; nodeElement < notificationChannelListItems.length; nodeElement++) {
        notificationChannelListItems[nodeElement].setAttribute("style","color: #9e9e9e");
    }
}


function notificationChannelSubscription() {
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        var channelSubscriptionList = {
            "nofificationSubscriptionList":true,
            "Events":document.getElementById("notificationChannelEvents").checked,
            "Webinars":document.getElementById("notificationChannelWebinars").checked,
            "Projects":document.getElementById("notificationChannelProjects").checked
        }
        var msgChannel = new MessageChannel();
        navigator.serviceWorker.controller.postMessage(JSON.stringify(channelSubscriptionList), [msgChannel.port2]);
    });
}


// Show channels Subscribed by user on page load!
getSubscribedChannels();
function getSubscribedChannels() {
    if(navigator.serviceWorker.controller) {
        return new Promise(function(resolve, reject) {
            var msgChannel = new MessageChannel();
            msgChannel.port1.onmessage = function(event) {
                if(event.data.error) {reject(event.data.error);}
                else{resolve(event.data);}
            };
            navigator.serviceWorker.controller.postMessage("SubscribedChannels", [msgChannel.port2]);
        }).then(function (response) {
            parsedResponse = JSON.parse(response);
            if(parsedResponse.nofificationSubscriptionList == true) {
                if(parsedResponse.Events == true)
                    document.getElementById('notificationChannelEvents').setAttribute("checked","checked");
                if(parsedResponse.Webinars == true)
                    document.getElementById('notificationChannelWebinars').setAttribute("checked","checked");
                if(parsedResponse.Projects == true)
                    document.getElementById('notificationChannelProjects').setAttribute("checked","checked");
            } else {unsubscribeUserToPush();}

        });
    }
}
/*******************************
* Web App API
*******************************/
// Show home icon if defferedPrompt contains event, else remove it!
function isHomePermitted() {
    if(navigator.serviceWorker.controller) {
        return new Promise(function(resolve, reject) {
            var msgChannel = new MessageChannel();
            msgChannel.port1.onmessage = function(event) {
                if(event.data.error) {reject(event.data.error);}
                else{resolve(event.data);}
            };
            navigator.serviceWorker.controller.postMessage("isHomePermitted", [msgChannel.port2]);
        }).then(message => showHomeIcon(message));
    }
}


function showHomeIcon(permissionStatus) {
    if (permissionStatus == 'Yes')
        document.getElementById('homeIconContainer').innerHTML = "<i style='margin-top: -5px;font-size: 30px;' onclick='navigator.serviceWorker.controller.postMessage(\"showDefferedPrompt\");' class='toggleIcons fa fa-home'></i>";
    else
        hideHomeIcon();
}


function hideHomeIcon() {
    document.getElementById('homeIconContainer').innerHTML = "";
}


/*******************************
* Helping Functions
*******************************/
//Convert url(Base64) to an array
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i)
        outputArray[i] = rawData.charCodeAt(i);
    return outputArray;
}
