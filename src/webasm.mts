const wasmCode = new Uint8Array([
  0x00,
  0x61,
  0x73,
  0x6d, // magic header
  0x01,
  0x00,
  0x00,
  0x00, // version
]);

const wasmModule = await WebAssembly.compile(wasmCode);
const wasmInstance = await WebAssembly.instantiate(wasmModule);

console.log(wasmModule);
console.log(wasmInstance);

console.log("Loaded Wasm successfully!");
