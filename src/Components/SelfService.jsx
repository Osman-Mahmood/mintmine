import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Crypto from './Crypto';
import Tabs from 'react-bootstrap/Tabs';
import Col from 'react-bootstrap/Col';
// import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
// import Tab from 'react-bootstrap/Tab';
// import NavLink from 'react-bootstrap/esm/NavLink';
import { NavLink, Outlet } from 'react-router-dom';
// import SideNavbar from './SideNavbar';
const SelfService = () => {
  return (
    <>
      <div className='hright p-5'>
        <h1 className='text-white '>u369 self-serve</h1>
        <h1 className='text-white mt-5 pt-4'>Happy Crypto Days & Power to the people!</h1>
      </div>

      <div className='d-lg-flex d-block'>



        <div className='col-lg-4 col-12 bg-transparent text-light '>
          <h2 className='px-3'><strong>Subject matter:</strong> </h2>
          <Accordion className="bg-transparent">
            <Accordion.Item eventKey="0">
              <Accordion.Header className='text-white'><p className='text-white mb-0'>Crypto wallet</p></Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col sm={12}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>  <NavLink to="crypto" eventKey="first" className="text-white">What is a crypto wallet</NavLink>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={12}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <NavLink to="adres" className="text-white">What is a Public Address</NavLink>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={12}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <NavLink to="ueth" className="text-white">How to connect to u369</NavLink>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion className="custom-accordion">
            <Accordion.Item eventKey="1">
              <Accordion.Header className="text-white"><p className='text-white mb-0'>Network/blockchains</p></Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col sm={12}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <NavLink to="network" className="text-white">What is a network/blockchain</NavLink>

                      </Nav.Item>
                    </Nav>
                  </Col>

                  <Col sm={12}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <NavLink to="deploy" className="text-white">On which networks is the u369 smart
                          contract deployed?</NavLink>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <NavLink to="uethside" ><p className="side_menu text-light">u369</p></NavLink>
          <NavLink to="utoken" ><p className="side_menu text-light">uTokens</p></NavLink>
          <NavLink to="system" ><p className="side_menu text-light">Reward system</p></NavLink>
          <NavLink to="goods"><p className="side_menu text-light">Public goods</p></NavLink>
        </div>
        <div className='col-lg-8 col-12' id=''>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default SelfService;
