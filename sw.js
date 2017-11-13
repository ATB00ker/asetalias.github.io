//Latest CACHE_NAME
var CACHE_NAME = '[v0.1.4] ALiAS';


//Files to be Cached
var urlsToCache = [
    './',
    'https://fonts.googleapis.com/css?family=Pacifico|Quicksand|Dosis|Boogaloo',
    './index.html',
    './manifest.html',
    './assets/js/user/manifest.js',
    './assets/js/user/functions.js',
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


self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});


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


// Deffering Prompt to when user clicks the home button!
self.addEventListener('beforeinstallprompt', function(event) {
    event.preventDefault();
    insertEventInIndexedDB(event);
    return false;
});


//Insert Prompt event in indexedDB
function insertEventInIndexedDB(event) {
    var cursor = indexedDB.open("ALiAS", 1);
    cursor.onupgradeneeded = function() {
        var database = cursor.result;
        var serviceWorker = database.createObjectStore("serviceWorker", {keyPath: "id"});
    };
    cursor.onsuccess = function() {
        var database = cursor.result;
        var transaction = database.transaction("serviceWorker", "readwrite");
        var store = transaction.objectStore("serviceWorker");
        store.put({id: 1, deferredPrompt: event});
        transaction.oncomplete = function() {
            database.close();
        };
    }
}
