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
    }).then(function() {
        showNotificationBell();
    });
}


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

var deferredPrompt;
function showHome(eventContainer) {
    var notificationIconContainer = document.getElementById('homeIconContainer');
    notificationIconContainer.innerHTML = "<i style='margin-top: -5px;font-size: 30px;' onclick='initDefferedPrompt()' class='settingIcons fa fa-home'></i>";
    deferredPrompt = eventContainer;
}

function hideHome() {
    var notificationIconContainer = document.getElementById('homeIconContainer');
    notificationIconContainer.innerHTML = "";
}

// Adding Web Application to Home Screen Prompt.
function initDefferedPrompt() {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choiceResult) {
        console.log(choiceResult.outcome);
        if(choiceResult.outcome == 'dismissed')
        console.log('User cancelled home screen install');
        else
        console.log('User added to home screen');
    });
}

/*******************************
* IndexedDB API
*******************************/
//indexedDB declarations.
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var cursor = indexedDB.open("ALiAS", 1);
cursor.onupgradeneeded = function() {
    var database = cursor.result;
    var serviceWorker = database.createObjectStore("serviceWorker", {keyPath: "id"});
};
cursor.onsuccess = function(key) {
    var database = cursor.result;
    var transaction = database.transaction("serviceWorker", "readwrite");
    var store = transaction.objectStore("serviceWorker");
    var response = store.get(1);
    return response.onsuccess = function() {
        if(response.result) {
             showHome(response.result.deferredPrompt);
        }
    };
    transaction.oncomplete = function() {
        database.close();
    };
}
