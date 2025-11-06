"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const sharedInt = new Int32Array(worker_threads_1.workerData);
function addInsharedArrary() {
    for (let i = 0; i < 1000000; i++) {
        Atomics.add(sharedInt, 0, 1);
    }
}
addInsharedArrary();
worker_threads_1.parentPort?.postMessage("done");
