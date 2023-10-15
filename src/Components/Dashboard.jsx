import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineInformationCircle } from "react-icons/hi";
import Table from "react-bootstrap/Table";
import Protect from "./Modals/Protect";
import Transfer from "./Modals/Transfer";
import Claim from "./Modals/Claim";
import { Button } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Dashboard = () => {
  const [hideTable, setHideTable] = useState(true);
  const [hideTable2, setHideTable2] = useState(true);

  const handleHide = () => {
    setHideTable(!hideTable);
  };
  const handleHide2 = () => {
    setHideTable2(!hideTable2);
  };
  return (
    <div className="container p-0">
      <div className="row justify-content-center align-items-center p-3">

      <Navbar collapseOnSelect expand="lg">
      {/* <Navbar.Brand href="#home">MyBrand</Navbar.Brand> */}
      {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
      <Navbar.Collapse id="navbar-dark-example">
        <Nav>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Ethereum Network v1"
            menuVariant="dark"
            className="text-white ethe"
            style={{color:"white",fontSize:"25px"}}
          >
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>


        <div className="row gx-0 mt-3 d-flex">
          <div className="col-lg-12 col-12 d-lg-flex d-block gap-3">
            <div className="col-lg-6 col-12 boxes mb-3 d-flex flex-column  p-3 text-start">
              <h5>Tokens Protected</h5>
              <p className="mb-2 mt-4 text-clr">Nothing protected yet</p>
            </div>
            <div className="col-lg-6 col-12 boxes mb-3 d-flex flex-column   p-3 text-start">
              <h5>Tokens protected</h5>
              <p className="mb-2 mt-4 text-clr">Nothing protected yet</p>
            </div>
          </div>
        </div>
        <div className="row gx-0 mt-3">
          <div className="col-lg-12 col-12 d-lg-flex d-block gap-3">
            <div className="col-lg-6 mb-3 col-12 text-start">
              <div className="boxes p-3">
                <div className="d-flex boxes justify-content-between">
                  <h5>Tokens to protect</h5>
                  <p
                    className="text-clr"
                    onClick={handleHide2}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    {hideTable2 ? "hide" : "show"} -
                  </p>
                </div>

                <p className="mb-2 mt-1 p-2 alert">
                  {" "}
                  <HiOutlineInformationCircle className="fs-4" /> Your
                  Etherium wallet is empty. Purchase or transfer assets.
                </p>

                {hideTable2 && (
                  <>
                    <Table striped className="custom-table flex-wrap" responsive>
                      <thead>
                        <tr>
                          {/* <th>#</th> */}
                          <th>Assets</th>
                          <th>Wallet Balance</th>
                          {/* <th>Username</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>hello</td>
                          <td>Mark</td>
                          <td>
                            <Protect />
                          </td>
                          <td>
                            {" "}
                            <Button
                              variant="primary"
                              className="bg-transparent border px-3 ms-3 p-1 text-clr font_size"
                            >
                              Details
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </>
                )}
              </div>
            </div>
            <div className="col-lg-6 mb-3 col-12 text-start">
              <div className="boxes p-3">
                <div className="d-flex justify-content-between">
                  <h5>Unhackable Tokens (uTokens)</h5>
                  <p
                    className="text-clr"
                    onClick={handleHide}
                    style={{ cursor: "pointer" }}
                  >
                    {hideTable ? "hide" : "show"} -
                  </p>
                </div>

                <p className="mb-2 mt-1 p-2 alert">
                  {" "}
                  <HiOutlineInformationCircle className="fs-4" /> Lock
                  native tokens in the contract to mint 1:1 unhackableTokens
                  (uTokens)
                </p>
                {hideTable && (
                  <div className=" d-lg-flex d-block justify-content-between align-items-center">
                    <div className="d-flex gap-2 ">
                      <Table striped className="custom-table flex-wrap" responsive>
                        <thead>
                          <tr>
                            {/* <th>#</th> */}
                            <th>Assets</th>
                            <th>Available</th>
                            {/* <th>Username</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>logo ETH</td>
                            <td>Mark</td>
                            <td>
                              <Button
                                variant="primary"
                                className="font_size border bg-transparent px-2 p-1 text-clr "
                              >
                                Add to Wallet
                              </Button>
                            </td>
                            <td>
                              {" "}
                              <Transfer className="" />
                            </td>
                            <td>
                              {" "}
                              <Claim />
                            </td>

                            <td>
                              {" "}
                              <Button
                                variant="primary"
                                className="font_size border bg-transparent px-2 p-1 text-clr"
                              >
                                Details
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      {/* <p>logo</p>
        <p>eth</p> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-white a_tag" to="/select" >Protect</NavLink>
       <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-white a_tag" to="/transfer" >Transfer</NavLink>
       <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-white a_tag" to="/withdraw" >Claim</NavLink> */}
    </div>
  );
};

export default Dashboard;
