import { default as Express, static as staticFiles } from "express";
import { existsSync } from "fs";
import { join } from "path";

const app = Express();
app.set("trust proxy", true);

const buildPath: string[] = [process.cwd()];
let N = 10;
while (N > 0) {
  N--;
  console.log("testing", join(...buildPath));
  if (
    existsSync(join(...buildPath, "build")) &&
    existsSync(join(...buildPath, "src"))
  ) {
    break;
  } else {
    buildPath.push("..");
  }
}

const buildDirectory = join(...buildPath, "build");

app.use((req, res, next) => {
  if (
    /(.ico|.js|.css|.jpg|.png|.map|.svg|.avif|.webp|.jpeg)$/i.test(req.path)
  ) {
    next();
  } else {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.sendFile(join(buildDirectory, "index.html"));
  }
});

app.use(staticFiles(buildDirectory));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server Running!");
});
