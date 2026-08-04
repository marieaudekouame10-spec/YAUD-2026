const CACHE_NAME = "yoane-marie-aude-v1";


const FILES_TO_CACHE = [

    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/guests.json"

];




// Installation

self.addEventListener(
"install",
event => {


event.waitUntil(

caches.open(CACHE_NAME)

.then(cache => {

return cache.addAll(FILES_TO_CACHE);

})

);


});






// Utilisation du cache

self.addEventListener(
"fetch",
event => {


event.respondWith(

caches.match(event.request)

.then(response => {


return response || fetch(event.request);


})

);


});
