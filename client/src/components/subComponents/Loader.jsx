import React from "react";
import logo from "../../assets/General/logocce.png";

function Loader() {
  return (
    <div className="w-full h-full bg-white">
      <div className="flex justify-center items-center h-screen">
        <div className="h-[200px] w-[450px] rounded-lg flex justify-center items-center animation-pulse">
          <img src={logo} className="w-full h-full" />
        </div>
      </div>
      Loader
    </div>
  );
}

export default Loader;
