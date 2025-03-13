# Node

## V8 Engine

To run JavaScript code, you need an engine to convert it to machine code before it can be executed. Chrome's V8 is one such open-source engine that allows embedding other code. This is where Node.js comes into the picture; it's a JavaScript runtime that enables you to use JavaScript code while providing the functionality of C++.

## Node Modules

```
function(exports,require,module,__filename,__dirname){
    module code here
}()
```

### module

```
module.exports = Calculator;
const Calculator = require("./calculator.js")
```

### exports

```
exports.language = "js"\
console.log(person.language)
```

## Buil-in Modules

### Path

```
const path = require("node:path")
const p = path.parse("calculator.js")
const p2 = path.format(p)
```

### Event

using extends and super event can be use in custom classes

```
const EventEmitter = require("node:events")
const emitter = new EventEmitter()
emitter.emit("defected product", a, b)
emtter.on("defected product",callback({a,b}))
```

### FS

```
const fs = require("node:fs")
```

for sycn

```
const data = fs.readFileSync("./dummytext.txt", "utf-8")
```

for async

```
fs.readFile("dummytext.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err)
    }
    console.log(data)
})
```

promise way

```
const fs = require("node:fs/promises")
```

```
fs.readFile("dummytext.txt", "utf-8")
    .then((data) => {
        console.log(data)
    })
    .catch((err) => {
        console.log(err)
    })
```

## Stream

A sequence of data being transfer from A-->B is called stream\
Works with data in chunks\
stream inherits from event emitter\
other modules such as fs use stream internally\

### Type of streams

**_Readable stream_**\
**_writeable stream_**\
**_Duplex stream_** (Both read and write)\
**_Transforms stream_**(modify as its writen and read)\
use fs, fs/promise not working\

```
const readableStream = fs.createReadStream("dummytext.txt", {
    encoding: "utf-8",
    //decide chunck size
     highWaterMark: 2,
})
const writeableStream = fs.createWriteStream("dummytext2.txt")

readableStream.on("data", (chunk) => {
    console.log(chunk)
    writeableStream.write(chunk)
})

```

## Pipe

```
const readableStream = fs.createReadStream("dummytext.txt", {
    encoding: "utf-8",
    //decide chunck size
     highWaterMark: 2,
})
const writeableStream = fs.createWriteStream("dummytext2.txt")
readableStream.pipe(writeableStream)
```

## HTTP

### Plain text

```
const http = require("node:http")

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-type": "text/plain" })
    res.end("hello world")
})

server.listen(3000, () => {
    console.log("listening to port 3000")
})
```

### Json

```
const http = require("node:http")

const profile = {
    name: "dhuruv",
    lastname: "bansal"
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-type": "application/json" })
    res.end(JSON.stringify(profile))
})

server.listen(3000, () => {
    console.log("listening to port 3000")
})
```

### Crypto

```
import crypto from "crypto";
export function hashPassword(password: string, salt: string) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (err, hash) => {
      if (err) reject(err);
      resolve(hash.toString("hex").normalize());
    });
  });
}

export function generateSalt() {
  return crypto.randomBytes(154).toString("hex").normalize();
}

```

### HTML

```
const http = require("node:http")
const fs = require("node:fs")

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-type": "text/html" })
    fs.createReadStream(__dirname + "/index.html").pipe(res)
})

server.listen(3000, () => {
    console.log("listening to port 3000")
})
```

For dinamic html

```
const http = require("node:http")
const fs = require("node:fs")

const profile = {
    name: "dhuruv",
    lastname: "bansal"
}

const server = http.createServer((req, res) => {
    const name = "shubham"
    res.writeHead(200, { "Content-type": "text/html" })
    let html = fs.readFileSync(__dirname + "/index.html", "utf-8")
    html = html.replace("{name}", name)
    res.end(html)
})

server.listen(3000, () => {
    console.log("listening to port 3000")
})
```

### Routing

```
const http = require("node:http")
const fs = require("node:fs")

const profile = {
    name: "dhuruv",
    lastname: "bansal"
}

const server = http.createServer((req, res) => {
    if (req.url === "/home") {
        res.writeHead(200, { "Content-type": "text/plain" })
        res.end("home")
    } else if (req.url === "/about") {
        res.writeHead(200, { "Content-type": "text/plain" })
        res.end("about")
    } else {
        res.writeHead(200, { "Content-type": "text/plain" })
        res.end("page not found")
    }
})

server.listen(3000, () => {
    console.log("listening to port 3000")
})
```

### BODY

```
const getBody = async (req: http.IncomingMessage): Promise<BodyType | false> => {
  const promise: Promise<BodyType | false> = new Promise((resolve, reject) => {
    req.on("data", (chunk) => {
      const data = chunk.toString(); // Convert Buffer to string
      const parsedBody = JSON.parse(data);
      try {
        const body = BodySchema.parse(parsedBody);
        resolve(body);
      } catch {
        reject(false);
      }
    });
  });
  return await promise;
};

```
