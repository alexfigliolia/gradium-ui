import { Bundler } from "../bundling";

(async () => {
  await Bundler.run();
})().catch(console.log);
