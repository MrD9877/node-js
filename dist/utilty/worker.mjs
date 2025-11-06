import { parentPort, workerData } from "worker_threads";
const sharedInt = new Int32Array(workerData);
function addInsharedArrary() {
    for (let i = 0; i < 1000000; i++) {
        Atomics.add(sharedInt, 0, 1);
    }
}
addInsharedArrary();
parentPort?.postMessage("done");
