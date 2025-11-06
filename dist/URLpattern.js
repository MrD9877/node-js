"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const url = new URLPattern("https://example.com/foo");
console.log(url.test("https://jj.com/foo?fred"));
console.log(url.exec("https://example.com/foo?fred"));
const emitter = new EventTarget();
emitter.addEventListener("event", (event) => {
    console.log(event.detail); // typed as string ✅
});
emitter.dispatchEvent(new CustomEvent("event", { detail: "hello" }));
const enc = new TextEncoder();
const encoded = enc.encode("hello");
console.log(encoded);
const encoded2 = new Uint8Array([104, 101, 104, 101]);
const decoded = new util_1.TextDecoder().decode(encoded2);
console.log(decoded);
