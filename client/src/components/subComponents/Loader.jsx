import React from "react";
import { Spinner } from "@material-tailwind/react";

function Loader() {
  return (
    <div className="w-full h-screen center ">
      <Spinner className="h-12 w-12" color="purple" />
    </div>
  );
}

export default Loader;
