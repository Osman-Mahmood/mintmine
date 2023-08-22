import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md"
import logo from '../../assets/logo.png'
// import logo1 from '../../assets/logo1.png'
import '../style.css'
import { FiSettings } from 'react-icons/fi'
function NavbarMenu() {
  const [theme, setTheme] = useState("");
  const toggleThem = () => {
    if (theme === "dark-theme") {
      localStorage.setItem("theme", "light-theme");
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
      localStorage.setItem("theme", "dark-theme");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("theme") == null) {
      document.body.className = "dark-theme";
      localStorage.setItem("theme", "dark-theme");
      setTheme("dark-theme");
    } else {
      document.body.className = localStorage.getItem("theme");
      setTheme(localStorage.getItem("theme"));
    }
  }, [theme]);
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className='nav_bg'>
      <div className='container p-lg-0 p-2' style={{ flexDirection: "inherit" }}>
        <Navbar.Brand className='text-dark fw-bold clr'>
          <NavLink to="/"><img src={logo} className='img-fluid logo'/></NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto px-0 text-start">
            <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="/">u369</NavLink>
            <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="select">Protecting</NavLink>
            <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="transfer">Transfer</NavLink>
            <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="withdraw">Withdraw</NavLink>
            <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="tokens">Tokens</NavLink>
            <NavLink className="ms-lg-3 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="reward">Rewards</NavLink>
            <NavDropdown className='text-dark clr_drop ms-3' title="More" id="navbarScrollingDropdown">
              <NavDropdown.Item><NavLink to="transfer">What is u369?</NavLink> </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item ><NavLink to="withdraw">How u369 works?</NavLink></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Open source code</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item><NavLink to="selfserve">Self-serve</NavLink> </NavDropdown.Item>
            </NavDropdown>

          </Nav>
          <Nav className='gap-lg-4 gap-3'>
            <div className="form-check form-switch switch ms-lg-auto ms-0 p-0" 
            onClick={toggleThem}
            >
              {
                theme === "dark-theme" ? <span className='fs-4'><MdOutlineNightlight /></span>  : <span className='text-light fs-4'><MdOutlineLightMode /></span>
              }

            </div>

            <ConnectButton chainStatus="icon" accountStatus="address" showBalance={false} />
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavbarMenu;