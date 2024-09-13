import { Compiler } from "../production/Compiler";

(async () => {
  await Compiler.build();
})().catch(console.log);
