// global.toolbox is defined in a different script, sw-toolbox.js, which is part of the
// https://github.com/GoogleChrome/sw-toolbox project.
// That sw-toolbox.js script must be executed first, so it needs to be listed before this in the
// importScripts() call that the parent service worker makes.
(function(global) {
  'use strict';

  // See https://github.com/GoogleChrome/sw-toolbox/blob/6e8242dc328d1f1cfba624269653724b26fa94f1/README.md#toolboxroutergeturlpattern-handler-options
  // and https://github.com/GoogleChrome/sw-toolbox/blob/6e8242dc328d1f1cfba624269653724b26fa94f1/README.md#toolboxfastest
  // for more details on how this handler is defined and what the toolbox.fastest strategy does.
  // The route for any requests from the googleapis origin
  toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'googleapis',
      maxEntries: 10,
      maxAgeSeconds: 86400
    },
    origin: /\.googleapis\.com$/
  });

  // We want no more than 50 images in the cache. We check using a cache first strategy
  toolbox.router.get('/images/**/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'images-cache-v1',
      maxEntries: 50
    }
  });

  global.toolbox.router.get('/(.*)', global.toolbox.fastest, {
    origin: /\.(?:googleapis|gstatic|firebaseio|appspot)\.com$/
  });

  global.toolbox.router.get('/(.+)', global.toolbox.fastest, {
    origin: 'https://hacker-news.firebaseio.com'
  });

  global.toolbox.router.get('/(.+)', global.toolbox.fastest, {
    origin: 'https://s-usc1c-nss-136.firebaseio.com'
  });

  global.toolbox.router.get('/*', global.toolbox.fastest);
})(self);
