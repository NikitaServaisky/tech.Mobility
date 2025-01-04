import React from "react";
import { Outlet } from "react-router-dom";
import AsideCpmponent from "../Components/Aside/asideComponent";

function Root() {
  return (
    <>
      <AsideCpmponent />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
