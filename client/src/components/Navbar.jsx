import React from "react";
import logout from "../assets/General/logout.png";
import christ from "../assets/General/christ.png";

function Navbar() {
  return (
    <div className="h-[100px] center w-full">
      <div className="justify-between max-w-7xl w-full center p-1">
        <img src={christ} />
        <button className="center justify-end gap-1 p-3">
          <img src={logout} />
          <div className="text-lg text-[#512B81] font-semibold">Logout</div>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
