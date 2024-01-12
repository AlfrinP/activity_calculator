import React from "react";
import logout from "../assets/General/logout.png";
import christ from "../assets/General/christ.png";
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
      console.log(response.data.student);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="h-[100px] center w-full">
      <div className="justify-between max-w-7xl w-full center p-1">
        <img src={christ} alt="Logo" />
        <button className="center justify-end gap-1 p-3" onClick={handleLogout}>
          <img src={logout} alt="Logout Icon" />
          <div className="text-lg text-[#512B81] font-semibold">Logout</div>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
