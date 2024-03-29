import React from "react";
import logout from "../assets/icons/log-out.svg";
import christ from "../assets/General/logocce.png";
import log from "../assets/General/lo.svg"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "./Util";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from "@material-tailwind/react";

function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await axios.post(
        `${baseURL}logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
      <div className="justify-between w-full center p-1">
        <img src={christ} alt="Logo" className="w-28" />
        <Button className="center gap-1" onClick={handleLogout} variant="text">
          <img src={logout} alt="Logout Icon" className="w-7 h-7" />
          <div className="text-lg text-[#512B81] font-semibold">Logout</div>
        </Button>
      </div>
  );
}

export default Navbar;
