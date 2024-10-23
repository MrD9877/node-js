const http = require("node:http")

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-type": "text/plain" })
    res.end("hello world")
})

server.listen(3000, () => {
    console.log("listening to port 3000")
})