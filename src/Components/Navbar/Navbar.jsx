// import React, { useState, useEffect } from 'react';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { NavLink, Link } from 'react-router-dom';
// import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md"
// import logo from '../../assets/logo.png'
// // import logo1 from '../../assets/logo1.png'
// import '../style.css'
// import { FiSettings } from 'react-icons/fi'
// function NavbarMenu() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [theme, setTheme] = useState("");
//  // Initialize the state
// const [scrolled, setScrolled] = useState(true);  // changed from false to true
// useEffect(() => {
//   window.addEventListener('scroll', handleScroll);
//   return () => {
//     window.removeEventListener('scroll', handleScroll);
//   };
// }, []);
// const handleScroll = () => {
//     const offset = window.scrollY;
//     if (offset > 5) {
//         setScrolled(false);  // changed from true to false
//     } else {
//         setScrolled(true);  // changed from false to true
//     }
// };

// let navbarClasses = ['nav_bg'];
// if (scrolled) {
//   navbarClasses.push('transparent');
// } else {
//   navbarClasses.push('solid');
// }

//   const toggleThem = () => {
//     if (theme === "dark-theme") {
//       localStorage.setItem("theme", "light-theme");
//       setTheme("light-theme");
//     } else {
//       setTheme("dark-theme");
//       localStorage.setItem("theme", "dark-theme");
//     }
//   };
//   useEffect(() => {
//     if (localStorage.getItem("theme") == null) {
//       document.body.className = "dark-theme";
//       localStorage.setItem("theme", "dark-theme");
//       setTheme("dark-theme");
//     } else {
//       document.body.className = localStorage.getItem("theme");
//       setTheme(localStorage.getItem("theme"));
//     }
//   }, [theme]);

//   return (
//     <Navbar collapseOnSelect expand="lg" variant="dark" className={navbarClasses.join(' ')}>
//       <div className='container p-lg-0 p-2' style={{ flexDirection: "inherit" }}>
//         <Navbar.Brand className='text-dark fw-bold clr '>
//           <NavLink to="/" className="d-flex align-items-center"><img src={logo} className='img-fluid logo' /><p className='d-lg-none d-block text-white ms-1 mt-3'>u369</p></NavLink>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto px-0 text-start">
//             <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="/">u369</NavLink>
//             <NavDropdown className='text-white ms-lg-3 ms-0 new_clr' title="Operations" id="navbarScrollingDropdown" show={isOpen}
//               onMouseEnter={() => setIsOpen(true)}
//               onMouseLeave={() => setIsOpen(false)}>
//               <NavDropdown.Item>
//                 <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-white a_tag" to="select">Protect</NavLink>
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item>
//                 <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-white a_tag" to="transfer">Transfer</NavLink>
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item>
//                 <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-white a_tag" to="withdraw">Claim</NavLink>
//               </NavDropdown.Item>

//             </NavDropdown>




//             <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="tokens">Tokens</NavLink>

//             <NavLink className="ms-lg-3 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="reward">Rewards</NavLink>
//             <NavDropdown className='text-dark new_clr ms-lg-3 ms-0' title="More" id="navbarScrollingDropdown" >
//               <NavDropdown.Item><NavLink to="crypto" className="text-white a_tag">What is u369?</NavLink> </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item ><NavLink to="adres" className="text-white a_tag">How u369 works?</NavLink></NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item ><NavLink to="/" className="text-white a_tag"> Open source code</NavLink></NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item><NavLink to="selfserve" className="text-white a_tag">Self-serve</NavLink> </NavDropdown.Item>
//             </NavDropdown>

//           </Nav>
//           <Nav className='gap-lg-4 gap-3'>
//             <div className="form-check form-switch switch ms-lg-auto ms-0 p-0 d-none"
//               onClick={toggleThem}
//             >
//               {
//                 theme === "dark-theme" ? <span className='fs-4'><MdOutlineNightlight /></span> : <span className='text-light fs-4'><MdOutlineLightMode /></span>
//               }

//             </div>

//             <ConnectButton label="Connect" chainStatus="icon" accountStatus="address" showBalance={false} />
//           </Nav>
//         </Navbar.Collapse>
//       </div>
//     </Navbar>
//   );
// }

// export default NavbarMenu;

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";
import logo from '../../assets/logo.png';
import '../style.css';
import { FiSettings } from 'react-icons/fi';

function NavbarMenu() {
    // ... [rest of your useState, useEffect, and other functions]
    const [isOpen, setIsOpen] = useState(false);
    const [navExpanded, setNavExpanded] = useState(false); 
      const [theme, setTheme] = useState("");
     // Initialize the state
    const [scrolled, setScrolled] = useState(true);  // changed from false to true
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 5) {
            setScrolled(false);  // changed from true to false
        } else {
            setScrolled(true);  // changed from false to true
        }
    };
    
    let navbarClasses = ['nav_bg'];
    if (scrolled) {
      navbarClasses.push('transparent');
    } else {
      navbarClasses.push('solid');
    }
    
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
      const closeNavbar = () => {
        setIsOpen(false);
        setNavExpanded(false);  // Close the navbar when a NavLink is clicked
    };

    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" className={navbarClasses.join(' ')}  expanded={navExpanded}  // Control navbar's expanded state
        onToggle={setNavExpanded} >
            <div className='container p-lg-0 p-2' style={{ flexDirection: "inherit" }}>
               
                <Nav className='gap-lg-4 gap-3 d-lg-none d-block'>
                        <ConnectButton  label="Connect" chainStatus="icon" accountStatus="address" showBalance={false} />
                    </Nav>
                    <Navbar.Brand className='text-dark fw-bold clr '>
                    <NavLink to="/" className="d-flex align-items-center" onClick={closeNavbar}>
                        <img src={logo} className='img-fluid logo' /><p className='d-lg-none d-block text-white ms-1 mt-3'>u369</p>
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setNavExpanded(prev => !prev)}/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto px-0 text-start">
                        <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="/" onClick={closeNavbar}>u369</NavLink>
                        <NavDropdown className='text-white ms-lg-3 ms-0 new_clr' title="Operations" id="navbarScrollingDropdown" show={isOpen}
                            onMouseEnter={() => setIsOpen(true)}
                            onMouseLeave={() => setIsOpen(false)}>
                            <NavDropdown.Item>
                                <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-white a_tag" to="select" onClick={closeNavbar}>Protect</NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-white a_tag" to="transfer" onClick={closeNavbar}>Transfer</NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-white a_tag" to="withdraw" onClick={closeNavbar}>Claim</NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="tokens" onClick={closeNavbar}>Tokens</NavLink>
                        <NavLink className="ms-lg-3 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks" to="reward" onClick={closeNavbar}>Rewards</NavLink>
                        <NavDropdown className='text-dark new_clr ms-lg-3 ms-0' title="More" id="navbarScrollingDropdownMore">
                            <NavDropdown.Item>
                                <NavLink to="crypto" className="text-white a_tag" onClick={closeNavbar}>What is u369?</NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <NavLink to="adres" className="text-white a_tag" onClick={closeNavbar}>How u369 works?</NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <NavLink to="/" className="text-white a_tag" onClick={closeNavbar}>Open source code</NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <NavLink to="selfserve" className="text-white a_tag" onClick={closeNavbar}>Self-serve</NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className='gap-lg-4 gap-3 d-lg-block d-none'>
                        <div className="form-check form-switch switch ms-lg-auto ms-0 p-0 d-none"
                            onClick={toggleThem}>
                            {
                                theme === "dark-theme" ? <span className='fs-4'><MdOutlineNightlight /></span> : <span className='text-light fs-4'><MdOutlineLightMode /></span>
                            }
                        </div>
                        <ConnectButton  label="Connect" chainStatus="icon" accountStatus="address" showBalance={false} />
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default NavbarMenu;
