import Navbar from "../Navbar";
import React from "react";

function Layout({ children }) {
  return (
    <div className="w-full center flex-col gap-1 p-2 ">
      <div className="h-20 relative center w-full px-[50px] md:px-[180px] max-w-screen-2xl">
        <Navbar />
      </div>
      <main className="max-w-screen-2xl">{children}</main>
    </div>
  );
}

export default Layout;
