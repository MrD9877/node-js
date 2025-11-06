import { TextDecoder } from "util";

const url = new URLPattern("https://example.com/foo");
console.log(url.test("https://jj.com/foo?fred"));
console.log(url.exec("https://example.com/foo?fred"));

const emitter = new EventTarget();

emitter.addEventListener("event", (event) => {
  console.log((event as CustomEvent<string>).detail); // typed as string ✅
});

emitter.dispatchEvent(new CustomEvent("event", { detail: "hello" }));

const enc = new TextEncoder();
const encoded = enc.encode("hello");
console.log(encoded);

const encoded2 = new Uint8Array([104, 101, 104, 101]);
const decoded = new TextDecoder().decode(encoded2);
console.log(decoded);
