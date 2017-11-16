/*******************************
* Push API
*******************************/
// Push Permission
function pushPermission() {
    return new Promise(function(resolve, reject) {
        const permissionResult = Notification.requestPermission(function(result) {
            resolve(result);
        });
        subscribeUserToPush();
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
    });
}

// Unsubscribe to Push
function unsubscribeUserToPush() {
    hideNotificationBell();
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription().then(function(subscription) {
            return subscription.unsubscribe();
        }).then(function() {
            showNotificationBell();
        });
    });
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

// Check if user is online or not!
function isOnline () {
  var connectionStatus = document.getElementById('connectionStatus');

  if (navigator.onLine){
    connectionStatus.innerHTML = '';
  } else {
    connectionStatus.innerHTML = 'You are currently offline. Data you are viewing might be outdated/incomplete!';
  }
}
window.addEventListener('online', isOnline);
window.addEventListener('offline', isOnline);


// Hide Notification Bell if Push API or Sync API is not supported.
function showNotificationBell() {
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription().then(function(subscription) {
            var notificationIconContainer = document.getElementById('notificationIconContainer');
            if(subscription)
                notificationIconContainer.innerHTML = "<i onclick='unsubscribeUserToPush()' style='color: #000' class='settingIcons fa fa-bell-slash'>";
            else
                notificationIconContainer.innerHTML = "<i onclick='subscribeUserToPush()' style='color: #000' class='settingIcons fa fa-bell'>";
        });
    });
}


function hideNotificationBell() {
    var notificationIconContainer = document.getElementById('notificationIconContainer');
    notificationIconContainer.innerHTML = "<i style='color: #9F9F9F' class='settingIcons fa fa-bell-slash'></i>";
}

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
        document.getElementById('homeIconContainer').innerHTML = "<i style='margin-top: -5px;font-size: 30px;' onclick='navigator.serviceWorker.controller.postMessage(\"showDefferedPrompt\");' class='settingIcons fa fa-home'></i>";
    else
        hideHomeIcon();
}


function hideHomeIcon() {
    document.getElementById('homeIconContainer').innerHTML = "";
}
