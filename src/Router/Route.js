import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer";
import { useEffect } from "react";
export default function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location);
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [location.pathname,navigate]);
  return (
    <>
      <div id="navbar">
        <Navbar />
      </div>

      <div id="detail">
        <Outlet />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </>
  );
}
