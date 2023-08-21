import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
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
          <NavLink to="/">Logo</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto px-0 text-start">
            <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="/">u369</NavLink>
            <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="select">protect</NavLink>
            <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="transfer">transfer</NavLink>
            <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="withdraw">withdraw</NavLink>
            <NavLink className="ms-lg-3 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="tokens">reward</NavLink>
            <NavDropdown className='text-dark clr_drop' title="more" id="navbarScrollingDropdown">
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
            <div className="form-check form-switch switch ms-lg-auto ms-0 p-0">
              <input
                className="form-check-input change ms-auto text-lg-end text-start light_mode"
                onClick={() => toggleThem()}
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
              />
              {
                theme === "dark-theme" ? <p className='mode_text2 text-dark'>Dark Mode</p> : <p className='mode_text'>Light Mode</p>
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