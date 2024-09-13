import express, { static as staticFiles } from "express";
import { existsSync } from "fs";
import path from "path";

const app = express();
app.set("trust proxy", true);

const buildPath: string[] = [process.cwd()];
let N = 10;
while (N > 0) {
  N--;
  console.log("testing", path.join(...buildPath));
  if (
    existsSync(path.join(...buildPath, "build")) &&
    existsSync(path.join(...buildPath, "src"))
  ) {
    break;
  } else {
    buildPath.push("..");
  }
}

const buildDirectory = path.join(...buildPath, "build");

app.use((req, res, next) => {
  if (
    /(.ico|.js|.css|.jpg|.png|.map|.svg|.avif|.webp|.jpeg)$/i.test(req.path)
  ) {
    next();
  } else {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.sendFile(path.join(buildDirectory, "index.html"));
  }
});

app.use(staticFiles(buildDirectory));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server Running!");
});
