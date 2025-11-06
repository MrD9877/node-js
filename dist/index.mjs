// crypto.mjs
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import fs from "fs";
import { pipeline } from "stream";
import Zlib from "zlib";
import { Transform } from "node:stream";
const hasher256 = createHash("sha256");
hasher256.setEncoding("hex");
hasher256.write(await readFile("package.json"));
hasher256.end();
const fileHash256 = hasher256.read();
console.log(fileHash256);
const hasher1 = createHash("sha1");
hasher1.setEncoding("hex");
hasher1.write(await readFile("package.json"));
hasher1.end();
const fileHash1 = hasher1.read();
console.log(fileHash1);
// const stream = fs.createReadStream("bigfile.txt");
// stream.on("data", (chunk) => {
//   console.log(chunk.toString());
// });
// stream.on("end", () => {
//   console.log("end");
// });
const transformChunks = new Transform({
    transform(chunk, encoding, callback) {
        const buff = Buffer.from(chunk);
        const hasher = createHash("sha1").setEncoding("hex");
        hasher.write(buff);
        hasher.end();
        const change = Buffer.from(` new change id:${Math.random() * 10000}`);
        const newChunkData = Buffer.from(hasher.read());
        const newChunk = Buffer.concat([newChunkData, change]);
        this.push(newChunk); // pass the chunk along unchanged
        callback();
    },
});
const logChunks = new Transform({
    transform(chunk, encoding, callback) {
        const buff = Buffer.from(chunk);
        console.log("start here ", buff.toString(), "end here");
        this.push(chunk); // pass the chunk along unchanged
        callback();
    },
});
pipeline(fs.createReadStream("bigfile.txt"), transformChunks, logChunks, Zlib.createGzip(), fs.createWriteStream("archive.gz"), (err) => {
    if (err) {
        console.log("Archive failed", err);
    }
    else {
        console.log("Archive succeeded");
    }
});
