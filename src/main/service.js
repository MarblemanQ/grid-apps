const service_worker = navigator.serviceWorker;

import { version } from '../moto/license.js';

async function start_service_worker() {
    function debug() {
        console.log(`[${version}]`, ...arguments);
    }

    // install service worker
    debug('service worker registration');

    try {
        const reg = await navigator
            .serviceWorker
            .register(`/code/service.js?${version}`, { scope: "/" });
        if (reg.installing) {
            debug('service worker installing');
        } else if (reg.waiting) {
            debug('service worker waiting');
        } else if (reg.active) {
            debug('service worker active');
        } else {
            debug({ service_worker: reg });
        }

        if (service_worker.controller) {
            service_worker.controller.postMessage('ctrl message');
        }
    } catch (err) {
        debug('service worker registration failed', err);
    }
}

if (service_worker && self.enable_service) {
    start_service_worker();
}
