/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

import { a as pwaUtils } from "workbox-recipes";
import {_private, registerRoute, PrecacheController} from "workbox-precaching";
import { a as navigationRoute } from "workbox-routing";
import { a as networkFirst } from "workbox-strategies";

const precacheController = new PrecacheController();

self.addEventListener("install", (event) => {
  precacheController.install(event);
});

self.addEventListener("activate", (event) => {
  precacheController.activate(event);
});

precacheController.setCacheNamePrefix("pwa-cache-v1");
precacheController.precache(self.__WB_MANIFEST);

// Warm the cache with essential pages
pwaUtils.warmStrategyCache({
    urls: ["/offline", "/"],
    strategy: new networkFirst.NetworkFirst(),
});

// Register a navigation route for offline fallback
navigationRoute.NavigationRoute(
    pwaUtils.createHandlerBoundToURL('/offline'), {
    denylist: [/^\/_/, /\/[^/]+\.[^/]+$/]
});
