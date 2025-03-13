import http from "http";
import { TypeOf, z } from "zod";
import { generateSalt, hashPassword } from "./utilty/hashPassword";

const BodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type BodyType = z.infer<typeof BodySchema>;

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

const server = http.createServer(async (req, res) => {
  if (req.url === "/auth") {
    let body = await getBody(req);

    console.log({ body });
    if (!body) {
      res.writeHead(200, { "Content-type": "text/plain" });
      return res.end("about");
    }
    const { password, email } = body;
    const salt = generateSalt();
    const hashedPassword = await hashPassword(password, salt);
    console.log({ hashedPassword });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Data received", data: body }));
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("about");
  } else {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("page not found");
  }
});

server.listen(3000, () => {
  console.log("listening to port 3000 on node");
});
