//Latest CACHE_NAME
var CACHE_NAME = '[v0.1.5] ALiAS';


//Files to be Cached
var urlsToCache = [
    'https://fonts.googleapis.com/css?family=Pacifico|Quicksand|Dosis|Boogaloo',
    './index.html',
    './manifest.html',
    './assets/js/user/manifest.js',
    './assets/js/user/functions.js',
    './assets/js/user/swHelper.js',
    './assets/js/jquery-3.2.1.min.js',
    './assets/js/materialize.min.js',
    './assets/js/owl.carousel.min.js',
    './assets/js/scrollreveal.min.js',
    './assets/css/owl.carousel.min.css',
    './assets/css/owl.theme.green.min.css',
    './assets/css/materialize.min.css',
    './assets/css/bootstrap.min.css',
    './assets/css/user/main.css',
    './assets/css/user/fonts.css',
    './assets/css/user/manifest.css',
    './assets/css/font-awesome.min.css',
    './assets/images/events/default.webp',
    './assets/images/ALiAS.webp',
    './assets/images/Exposure.webp',
    './assets/images/favicon.webp',
    './assets/images/github-fork.webp',
    './assets/images/home_bg.webp',
    './assets/images/intro_bg-m.webp',
    './assets/images/intro_bg.webp',
    './assets/images/team_bg.webp',
    './assets/images/webinarDefault.webp'
];


// Perform install steps
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlsToCache);
    }).catch(function(Error) {
        console.log(urlsToCache);
    })
  );
});

// Activation is done Everytime a page loads!
self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] Activated');
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing Obselete Cache: ', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});


//Called Everytime a resource is needed!
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});


var notificationSubscriptionList;
//Called Everytime a push notication is received!
self.addEventListener('push', function(event) {
    // Check if channel is permitted by User
    const notificationChannel = event.data.json().channel;
    var showNotification;
    if (notificationSubscriptionList[notificationChannel] == true) {
        const title = event.data.json().title;
        const options = {
             body: event.data.json().body,
             badge: event.data.json().badge,
             icon: event.data.json().icon
        };
        const notificationPromise = self.registration.showNotification(title, options);
        event.waitUntil(notificationPromise);
    }
});


self.addEventListener('message', function(event){
    if (event.data == 'isHomePermitted') {
        if(deferredPrompt == null)
            event.ports[0].postMessage("No");
        else
            event.ports[0].postMessage("Yes");
    } else if (event.data == 'showDefferedPrompt') {
        showDefferedPrompt();
    } else if (event.data == 'SubscribedChannels') {
        if(notificationSubscriptionList == null)
            event.ports[0].postMessage(JSON.stringify({"nofificationSubscriptionList": false}));
        else
            event.ports[0].postMessage(JSON.stringify(notificationSubscriptionList));
    } else if (isJSONObject(event.data) == true) {
        if (JSON.parse(event.data)["nofificationSubscriptionList"] == true)
            notificationSubscriptionList = JSON.parse(event.data);
    }
});


var deferredPrompt;
// Deffering Prompt to when user clicks the home button!
self.addEventListener('beforeinstallprompt', function(event) {
    deferredPrompt = event;
    event.preventDefault();
    insertEventInIndexedDB();
    return false;
});


// Adding Web Application to Home Screen Prompt.
function showDefferedPrompt() {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choiceResult) {
        console.log(choiceResult.outcome);
        if(choiceResult.outcome == 'dismissed')
            console.log('User cancelled home screen install');
        else
            defferedPrompt = null;
    });
}

// Helping functions
function isJSONObject(message) {
    try {
        JSON.parse(message);
        return true;
    }
    catch(e) {
        return false;
    }
}
