"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const sharedBufffer = new SharedArrayBuffer(4);
const sharedArray = new Int32Array(sharedBufffer);
console.log({ sharedArray: sharedArray[0] });
function createWorker() {
    const worker = new worker_threads_1.Worker("./dist/utilty/worker.js", { workerData: sharedBufffer });
    worker.on("message", (msg) => {
        const sharedArray = new Int32Array(sharedBufffer);
        console.log(Atomics.load(sharedArray, 0));
    });
}
createWorker();
createWorker();
createWorker();
// worker.postMessage(5);
// console.log("Worker has been sent a message.");
