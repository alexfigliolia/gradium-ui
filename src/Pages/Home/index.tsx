import { memo } from "react";
import type { Propless } from "Types/React";

export default memo(
  function Home(_: Propless) {
    return <section className="home">Home!</section>;
  },
  () => true,
);
