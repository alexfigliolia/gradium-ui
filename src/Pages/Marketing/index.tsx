"use client";
import { Fragment, memo, useLayoutEffect } from "react";
import { useMount } from "@figliolia/react-hooks";
import {
  About,
  Banner,
  Footer,
  Header,
  MobileMenu,
  Routing,
  Solutions,
} from "Layouts/Marketing";
import { Preloader } from "Tools/Preloader";
import type { Propless } from "Types/React";
import "./styles.scss";

export default memo(
  function Marketing(_: Propless) {
    useLayoutEffect(() => {
      Routing.initialize();
      return () => {
        Routing.destroy();
      };
    }, []);

    useMount(() => {
      void Preloader.preloadAuthScreens();
    });

    return (
      <Fragment>
        <Header />
        <Banner />
        <main className="m-sections">
          <div>
            <About />
            <Solutions />
          </div>
        </main>
        <Footer />
        <MobileMenu />
      </Fragment>
    );
  },
  () => true,
);
