import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  console.log(document.cookie);
  useEffect(() => {
    navigate(`/dashboard/${localStorage.getItem("role")}`);
  }, [localStorage.getItem("role")]);
  return <Outlet />;
}

export default Dashboard;
