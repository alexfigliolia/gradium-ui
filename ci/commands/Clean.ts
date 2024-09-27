import { Builder } from "../build/Builder";

(async () => {
  await Builder.clean();
})().catch(console.log);
