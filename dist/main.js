"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const zod_1 = require("zod");
const hashPassword_1 = require("./utilty/hashPassword");
const BodySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
const getBody = async (req) => {
    const promise = new Promise((resolve, reject) => {
        req.on("data", (chunk) => {
            const data = chunk.toString(); // Convert Buffer to string
            const parsedBody = JSON.parse(data);
            try {
                const body = BodySchema.parse(parsedBody);
                resolve(body);
            }
            catch {
                reject(false);
            }
        });
    });
    return await promise;
};
const server = http_1.default.createServer(async (req, res) => {
    if (req.url === "/auth") {
        let body = await getBody(req);
        console.log({ body });
        if (!body) {
            res.writeHead(200, { "Content-type": "text/plain" });
            return res.end("about");
        }
        const { password, email } = body;
        const salt = (0, hashPassword_1.generateSalt)();
        const hashedPassword = await (0, hashPassword_1.hashPassword)(password, salt);
        console.log({ hashedPassword });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Data received", data: body }));
    }
    else if (req.url === "/about") {
        res.writeHead(200, { "Content-type": "text/plain" });
        res.end("about");
    }
    else {
        res.writeHead(200, { "Content-type": "text/plain" });
        res.end("page not found");
    }
});
server.listen(3000, () => {
    console.log("listening to port 3000 on node");
});
