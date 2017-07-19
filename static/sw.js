---
---

{%- comment -%}
A super simple service worker that provides nothing but a cache fallback if the user is offline
See: https://github.com/jeremiak/jekyll-offline/blob/master/lib/sw.js
Offline Cookbook: https://jakearchibald.com/2014/offline-cookbook/#serving-suggestions-responding-to-requests
{%- endcomment -%}

var urls = [];
{%- for post in site.posts limit: 10 -%}
urls.push("{{ post.url }}");
{%- endfor -%}

{%- for page in site.pages -%}
{%- if page.url != "/feed.xml" and page.url != "/sw.js" -%}
urls.push("{{ page.url }}");
{%- endif -%}
{%- endfor -%}

{%- for image in site.static_files -%}
{%- if image.path contains "global" -%}
urls.push("{{ image.path }}");
{%- endif -%}
{%- endfor -%}

var CACHE_NAME = "offline";
var CACHE_URLS = new Set(urls.map(toAbsoluteUrl).map(function (url) { return url.href }));

function toAbsoluteUrl(relativeUrl) {
  return new URL(relativeUrl, self.location);
}
function getCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  })
}
self.addEventListener("install", function(event) {
  event.waitUntil(caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(Array.from(CACHE_URLS))
    })
    .then(self.skipWaiting())
  );
});
self.addEventListener("activate", function(event) {
  event.waitUntil(caches.open(CACHE_NAME)
    .then(function(cache) {
    return getCachedUrls(cache)
      .then(function (urls) {
        urls.map(function(url) {
          // Delete every URL from the cache that is not specified in the CACHE_URLS
          if (!CACHE_URLS.has(url)) {
            cache.delete(url);
          }
        })
      })
    })
    .then(self.clients.claim())
  );
});
self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
