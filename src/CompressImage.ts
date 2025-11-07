import fs from "fs";
import sharp from "sharp";

const image = fs.readFileSync("./public/testimage.png");
sharp(image)
  .resize(3200, 2400)
  .rotate(180)
  .toFile("./public/output.webp", (err, info) => {
    console.log(info);
  });
