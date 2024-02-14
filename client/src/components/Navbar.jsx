import React from "react";
import logout from "../assets/General/logout.png";
import christ from "../assets/General/logocce.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "./Util";

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
      navigate("/login");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
      <div className="justify-between w-full center p-1">
        <img src={christ} alt="Logo" className="w-28" />
        <button className="center w-fit gap-1" onClick={handleLogout}>
          <img src={logout} alt="Logout Icon" className="w-10 h-10" />
          <div className="text-lg text-[#512B81] font-semibold">Logout</div>
        </button>
      </div>
  );
}

export default Navbar;
