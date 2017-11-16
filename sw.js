//Latest CACHE_NAME
var CACHE_NAME = '[v0.1.4] ALiAS';


//Files to be Cached
var urlsToCache = [
    'https://atb00ker.github.io/asetalias.github.io/',
    'https://fonts.googleapis.com/css?family=Pacifico|Quicksand|Dosis|Boogaloo',
    'https://atb00ker.github.io/asetalias.github.io/index.html',
    'https://atb00ker.github.io/asetalias.github.io/manifest.html',
    'https://atb00ker.github.io/asetalias.github.io/assets/js/user/manifest.js',
    'https://atb00ker.github.io/asetalias.github.io/assets/js/user/functions.js',
    'https://atb00ker.github.io/asetalias.github.io/assets/js/jquery-3.2.1.min.js',
    'https://atb00ker.github.io/asetalias.github.io/assets/js/materialize.min.js',
    'https://atb00ker.github.io/asetalias.github.io/assets/js/owl.carousel.min.js',
    'https://atb00ker.github.io/asetalias.github.io/assets/js/scrollreveal.min.js',
    'https://atb00ker.github.io/asetalias.github.io/assets/css/owl.carousel.min.css',
    'https://atb00ker.github.io/asetalias.github.io/assets/css/owl.theme.green.min.css',
    'https://atb00ker.github.io/asetalias.github.io/assets/css/materialize.min.css',
    'https://atb00ker.github.io/asetalias.github.io/assets/css/bootstrap.min.css',
    'https://atb00ker.github.io/asetalias.github.io/assets/css/user/main.css',
    'https://atb00ker.github.io/asetalias.github.io/assets/css/user/fonts.css',
    'https://atb00ker.github.io/asetalias.github.io/assets/css/user/manifest.css',
    'https://atb00ker.github.io/asetalias.github.io/assets/css/font-awesome.min.css',
    'https://atb00ker.github.io/asetalias.github.io/assets/images/events/default.webp',
    'https://atb00ker.github.io/asetalias.github.io/assets/images/ALiAS.webp',
    'https://atb00ker.github.io/asetalias.github.io/assets/images/Exposure.webp',
    'https://atb00ker.github.io/asetalias.github.io/assets/images/favicon.webp',
    'https://atb00ker.github.io/asetalias.github.io/assets/images/github-fork.webp',
    'https://atb00ker.github.io/asetalias.github.io/assets/images/home_bg.webp',
    'https://atb00ker.github.io/asetalias.github.io/assets/images/intro_bg-m.webp',
    'https://atb00ker.github.io/asetalias.github.io/assets/images/intro_bg.webp',
    'https://atb00ker.github.io/asetalias.github.io/assets/images/team_bg.webp',
    'https://atb00ker.github.io/asetalias.github.io/assets/images/webinarDefault.webp'
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


//Called Everytime a push notication is received!
self.addEventListener('push', function(event) {
    const title = event.data.json().title;
    const options = {
         body: event.data.json().body,
         badge: event.data.json().badge,
         icon: event.data.json().icon
    };
    const notificationPromise = self.registration.showNotification(title, options);
    event.waitUntil(notificationPromise);
});


self.addEventListener('message', function(event){
    if (event.data == 'isHomePermitted') {
        if(deferredPrompt == null)
            event.ports[0].postMessage("No");
        else
            event.ports[0].postMessage("Yes");
    } else if (event.data == 'showDefferedPrompt') {
        showDefferedPrompt();
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
