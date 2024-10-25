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