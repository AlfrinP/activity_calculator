import Navbar from "../Navbar";
import React from "react";

function Layout({ children }) {
  return (
    <div className="w-full center flex-col gap-1 p-2 ">
      <div className="h-20 relative center w-full px-[50px] md:px-[100px] max-w-screen-2xl">
        <Navbar />
      </div>
      <main className="max-w-screen-2xl w-full height gap-5 flex-col center px-[50px] md:px-[100px]">{children}</main>
    </div>
  );
}

export default Layout;
