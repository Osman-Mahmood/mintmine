import React, { useEffect, useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { remortFactoryInstnce } from "../../config";
import TokenSymbol from "./childComponents/TokenSymbol";
import TokenBalance from "./childComponents/TokenBalance";
import NativeCoinDetail from "./childComponents/NativeCoinDetail";
import UNativeCoinDetail from "./uChildComponents/uNativeCoinDetail";
import UTokenBalance from "./uChildComponents/uTokenBalance";
import MintModal from "./childComponents/Modals/MintModal";
import TransferModal from "./uChildComponents/Modals/TransferModal";
import ClaimModal from "./uChildComponents/Modals/ClaimModal";
const Dashboard = () => {
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();
  const { address, isConnected } = useAccount();
  const [hideTable, setHideTable] = useState(true);
  const [hideTable2, setHideTable2] = useState(true);

  const handleHide = () => {
    setHideTable(!hideTable);
  };
  const handleHide2 = () => {
    setHideTable2(!hideTable2);
  };
  const [tokensLength, setTokenLength] = useState([])
  const getUTokens = async () => {
    try {
      let contract = await remortFactoryInstnce(chain?.id)
      const u_tokens = await contract.all_uTokensOfAllowedTokens();
      setTokenLength(u_tokens)
    } catch (error) {
      console.error("error while get u tokens", error);
    }
  };
  useEffect(() => {
    getUTokens();
    if (isConnected) {
      window.ethereum.on("accountsChanged", function (accounts) {
        window.location.reload(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);
  return (
    <div className="container p-0">
      <div className="row justify-content-center align-items-center p-3">

        <Navbar collapseOnSelect expand="lg">
          <Navbar.Collapse id="navbar-dark-example">
            <Nav>
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  // Note: If your app doesn't use authentication, you
                  // can remove all 'authenticationStatus' checks
                  const ready = mounted && authenticationStatus !== 'loading';
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                      authenticationStatus === 'authenticated');

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        'style': {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (connected) {
                          return (
                            <div style={{ display: 'flex', gap: 12 }}>
                              <NavDropdown
                                type="button"
                                id="nav-dropdown-dark-example"
                                title={chain.name}
                                menuVariant="dark"
                                className="text-white ethe"
                                style={{ color: "white", fontSize: "25px" }}
                              >
                                {
                                  chains.map((chainDetail) => {
                                    return <NavDropdown.Item
                                      key={chainDetail.id}
                                      disabled={chain.name === chainDetail.name}
                                      onClick={() => switchNetwork?.(chainDetail.id)}
                                    >
                                      {chainDetail.name}
                                      {isLoading && pendingChainId === chainDetail.id && ' (switching)'}
                                    </NavDropdown.Item>
                                  })
                                }
                              </NavDropdown>
                            </div>
                          );
                        }
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
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
                          <th>Assets</th>
                          <th>Wallet Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          isConnected && <NativeCoinDetail  />
                        }
                        {
                          tokensLength.map((tokenItem, index) => {
                            return <tr key={index}>
                              <td className="text-light"><TokenSymbol tokenAddress={tokenItem} /></td>
                              <td className="text-light"><TokenBalance tokenAddress={tokenItem}  /></td>
                              <td>
                                <MintModal tokenAddress={tokenItem} mintType="token"   />
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
                          })
                        }

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
                  <Table striped className="custom-table flex-wrap " responsive>
                    <thead>
                      <tr>
                        <th>Assets</th>
                        <th>Available</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        isConnected && <UNativeCoinDetail  />
                      }
                      {
                        tokensLength.map((tokenItem, index) => {
                          return <tr key={index}>
                            <td className="text-light">u<TokenSymbol tokenAddress={tokenItem} /></td>
                            <td className="text-light"><UTokenBalance tokenAddress={tokenItem}  /></td>
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
                              <TransferModal tokenAddress={tokenItem} mintType="token"   />
                            </td>
                            <td>
                              {" "}
                              <ClaimModal tokenAddress={tokenItem} mintType="token"   />
                            </td>
                            {/* <td>
                                {" "}
                                <Button
                                  variant="primary"
                                  className="font_size border bg-transparent px-2 p-1 text-clr"
                                >
                                  Details
                                </Button>
                              </td> */}
                          </tr>
                        })
                      }
                    </tbody>
                  </Table>
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
