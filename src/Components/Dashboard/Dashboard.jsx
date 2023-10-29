import React, { useEffect, useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { erc20Instance, remortFactoryInstnce, walletBalance } from "../../config";
import TokenSymbol from "./childComponents/TokenSymbol";
import TokenBalance from "./childComponents/TokenBalance";
import NativeCoinDetail from "./childComponents/NativeCoinDetail";
import UNativeCoinDetail from "./uChildComponents/uNativeCoinDetail";
import UTokenBalance from "./uChildComponents/uTokenBalance";
import MintModal from "./childComponents/Modals/MintModal";
import TransferModal from "./uChildComponents/Modals/TransferModal";
import ClaimModal from "./uChildComponents/Modals/ClaimModal";
import { ethers } from "ethers";
import AddtoWallet from "./uChildComponents/AddtoWallet";
import { useSelector } from "react-redux";

import UTokenSymbol from "./uChildComponents/UTokenSymbol";
const Dashboard = () => {
  const { isReferesh } = useSelector((state) => state.refreshFunctions)
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();
  const { address, isConnected } = useAccount();
  const [hideTable, setHideTable] = useState(true);
  const [hideTable2, setHideTable2] = useState(true);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Protect', value: '1' },
    { name: 'uTokens', value: '2' },
    // { name: 'Radio', value: '3' },
  ];

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


  const [uProtectedTokens, setUProtectedTokens] = useState({
    bal: [],
    symbols: []
  })
  const [isProtectToken, setIsProtectToken] = useState(false)
  const getUProtectedTokens = async () => {
    try {
      let all_tokens = []
      let contract = await remortFactoryInstnce(chain?.id)
      const u_tokens = await contract.all_uTokensOfAllowedTokens();
      let symbolePromisseArr = [];
      let balPromiseArr = []
      let tokenInstancePromise = []
      all_tokens = [...u_tokens];

      let u_eth_address = await contract.deployedAddressOfEth();
      all_tokens.push(u_eth_address)

      for (let index = 0; index < all_tokens.length; index++) {
        tokenInstancePromise.push(erc20Instance(all_tokens[index]))
      }
      tokenInstancePromise = await Promise.all(tokenInstancePromise);

      for (let index = 0; index < tokenInstancePromise.length; index++) {
        balPromiseArr.push(tokenInstancePromise[index].balanceOf(address));
        symbolePromisseArr.push(tokenInstancePromise[index].symbol())
      }
      symbolePromisseArr = await Promise.all(symbolePromisseArr);

      balPromiseArr = await Promise.all(balPromiseArr);

      setUProtectedTokens({ symbols: symbolePromisseArr, bal: balPromiseArr })
      let findProtectBal = balPromiseArr.find((item) => {
        if (ethers.utils.formatEther(item) > 0) {
          return ethers.utils.formatEther(item)
        }
      })
      if (findProtectBal !== undefined) {
        setIsProtectToken(true)
        
      }
    } catch (error) {
      console.error("error while get protected tokens", error);
    }
  }
  const [isBalInWallet, setIsBalInWallet] = useState(false)
  const getTokenBal = async () => {
    try {
      let ethBal = await walletBalance(address);
      if (ethBal > 0) {
        setIsBalInWallet(true)
      } else {
        let contract = await remortFactoryInstnce(chain?.id)
        const u_tokens = await contract.all_uTokensOfAllowedTokens();
        let altAddresses = [];

        for (let index = 0; index < u_tokens.length; index++) {

          altAddresses.push(contract.get_TokenAddressOfuToken(u_tokens[index]));
        }
        altAddresses = await Promise.all(altAddresses);

        let tInstancePromisearr = []
        for (let index = 0; index < altAddresses.length; index++) {
          tInstancePromisearr.push(erc20Instance(altAddresses[index]))
        }
        tInstancePromisearr = await Promise.all(tInstancePromisearr)
        let balPromseArr = []
        for (let index = 0; index < tInstancePromisearr.length; index++) {
          balPromseArr.push(tInstancePromisearr[index].balanceOf(address));
        }
        balPromseArr = await Promise.all(balPromseArr)
        const findBal = balPromseArr.find((item) => {
          if (ethers.utils.formatEther(item) > 0) {
            console.log("item", ethers.utils.formatEther(item));
            return ethers.utils.formatEther(item)
          }
        })
        if (findBal !== undefined) {
          setIsBalInWallet(true)
        }

      }

    } catch (error) {
      console.error("error while get token bal", error);
    }
  }
  useEffect(() => {
    getUTokens();
    if (isConnected) {
      getUProtectedTokens()
      getTokenBal()
      window.ethereum.on("accountsChanged", function (accounts) {
        window.location.reload(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isReferesh]);
  return (
    <div className="container p-0">
      <div className="row justify-content-center align-items-center p-3">
        <ButtonGroup className="mobile-only-buttons">
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? 'outline-success' : 'outline-danger'}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => {
                setRadioValue(e.currentTarget.value)
              }
              }
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
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
                                    console.log("chainDetail", chainDetail);
                                    return <NavDropdown.Item
                                      style={{ color: "#7e7f8a" }}
                                      key={chainDetail.id}
                                      disabled={chain.name === chainDetail.name}
                                      onClick={() => switchNetwork?.(chainDetail.id)}

                                    >
                                      <img src={`./tokenlist/${chainDetail.nativeCurrency.symbol.toLowerCase()}.png`} alt="" width={20} className="me-2" /> {chainDetail.name}
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


        <div className="row gx-0 mt-3 d-lg-flex d-none">
          <div className="col-lg-12 col-12 d-lg-flex d-block gap-3">
            <div className="col-lg-6 col-12 boxes border border-primary mb-3 d-flex flex-column  p-3 text-start">
              <h5>Protected</h5>
              {isProtectToken ? <Table striped className="custom-table flex-wrap" responsive>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    uProtectedTokens.bal.map((tokenItem, index) => {
                      if (ethers.utils.formatEther(tokenItem) > 0) {
                        let str = uProtectedTokens.symbols[index].toLowerCase();
                        str = str.replace("u", "");
                        return tokenItem > 0 && <tr key={index}>
                          <td className="text-light"><img src={`./tokenlist/${str}.png`} alt="" width={20} className="me-2" />{str.toUpperCase()} {""} <span className="ms-4 text-primary">{Number(ethers.utils.formatEther(tokenItem)).toFixed(4)}</span></td>
                          <td className="text-light"></td>
                        </tr>
                      }
                    })
                  }

                </tbody>
              </Table>
                :
                <p className="mb-2 mt-4 text-clr">Nothing protected yet</p>
              }
            </div>
            <div className="col-lg-6 col-12 boxes mb-3 border border-primary d-flex flex-column   p-3 text-start">
              <h5>uTokens</h5>
              {isProtectToken ? <Table striped className="custom-table flex-wrap" responsive>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    uProtectedTokens.bal.map((tokenItem, index) => {
                      if (ethers.utils.formatEther(tokenItem) > 0) {
                        let str = uProtectedTokens.symbols[index].toLowerCase();
                        str = str.replace("u", "");
                        return tokenItem > 0 && <tr key={index}>
                          <td className="text-light"><img src={`./tokenlist/${str}.png`} alt="" width={20} className="me-2" />{uProtectedTokens.symbols[index]} {""} <span className="ms-4 text-primary">{Number(ethers.utils.formatEther(tokenItem)).toFixed(4)}</span></td>
                          <td className="text-light"></td>
                        </tr>
                      }
                    })
                  }

                </tbody>
              </Table>
                :
                <p className="mb-2 mt-4 text-clr">Nothing protected yet</p>
              }
            </div>
          </div>
        </div>
        <div className="row gx-0 mt-3 pc-only-cards">
          <div className="col-lg-12 col-12 d-lg-flex d-block gap-3">
            <div className="col-lg-6 mb-3 col-12 text-start">
              <div className="boxes p-3 border border-primary">
                <div className="d-flex boxes justify-content-between">
                  <h5>Tokens to protect</h5>
                  <p
                    className="text-clr"
                    onClick={handleHide2}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    {hideTable2 ? "hide -" : "show +"}
                  </p>
                </div>

                <p className="mb-2 mt-1 p-2 ">
                  {" "}
                  <HiOutlineInformationCircle className="fs-4" />
                  {
                    isBalInWallet ? "Transfer supported asset(s) to your wallet and click Protect" :
                      "Your Etherium wallet is empty. Purchase or transfer assets."
                  }
                  {/* Transfer supported asset(s) to your wallet and click "Protect */}

                </p>

                {hideTable2 && (
                  <>
                    <Table striped className="custom-table flex-wrap mb-2" responsive>
                      <thead>
                        <tr>
                          <th>Assets</th>
                          <th>Wallet Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          isConnected && <NativeCoinDetail />
                        }
                        {
                          tokensLength.map((tokenItem, index) => {
                            return <tr key={index}>
                              <td className="text-light"><TokenSymbol tokenAddress={tokenItem} /></td>
                              <td className="text-light"><TokenBalance tokenAddress={tokenItem} /></td>
                              <td>
                                <MintModal tokenAddress={tokenItem} mintType="token" />
                              </td>
                              <td>
                                {" "}
                                <Button
                                  variant="primary"
                                  className="bg-transparent border_detail px-3 ms-3 p-1 text-clr font_size"
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
              <div className="boxes p-3 border border-primary">
                <div className="d-flex justify-content-between" >
                  <h5>unhackableTokens</h5>
                  <p
                    className="text-clr"
                    onClick={handleHide}
                    style={{ cursor: "pointer" }}
                  >
                    {hideTable ? "hide -" : "show +"}
                  </p>
                </div>

                {/* <p className="mb-2 mt-1 p-2 ">
                  {" "}
                  Lock
                  native tokens in the contract to mint 1:1 unhackableTokens
                  (uTokens)
                </p> */}
                {hideTable && (
                  <Table striped className="custom-table flex-wrap mt-5" responsive>
                    <thead>
                      <tr>
                        <th>Assets</th>
                        <th>Available</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {
                        isConnected && <UNativeCoinDetail />
                      }
                      {
                        tokensLength.map((tokenItem, index) => {
                          return <tr key={index}>
                            <td className="text-light"><UTokenSymbol tokenAddress={tokenItem} /></td>
                            <td className="text-light"><UTokenBalance tokenAddress={tokenItem} /></td>
                            <td>
                              <AddtoWallet tokenAddress={tokenItem} />
                            </td>
                            <td>
                              {" "}
                              <TransferModal tokenAddress={tokenItem} mintType="token" />
                            </td>
                            <td>
                              {" "}
                              <ClaimModal tokenAddress={tokenItem} mintType="token" />
                            </td>
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
        {/* mobile view */}
        <div className="row gx-0 mt-3 mobile-only-cards">
          <div className="col-lg-12 col-12 d-lg-flex d-block gap-3">
            {radioValue === "1" &&
              <>
                <div className="col-lg-6 col-12 boxes mb-3 d-flex flex-column  p-3 text-start">
                  <h5>Protected</h5>
                  {uProtectedTokens.symbols.length > 0 ? <Table striped className="custom-table flex-wrap" responsive>
                    <thead>
                      <tr>
                        <th>Assets</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        uProtectedTokens.bal.map((tokenItem, index) => {
                          if (ethers.utils.formatEther(tokenItem) > 0) {
                            let str = uProtectedTokens.symbols[index].toLowerCase();
                            str = str.replace("u", "");
                            return tokenItem > 0 && <tr key={index}>
                              <td className="text-light"><img src={`./tokenlist/${str}.png`} alt="" width={20} className="me-2" />{str.toUpperCase()}</td>
                              <td className="text-light">{Number(ethers.utils.formatEther(tokenItem)).toFixed(4)}</td>
                            </tr>
                          }
                        })
                      }

                    </tbody>
                  </Table>
                    :
                    <p className="mb-2 mt-4 text-clr">Nothing protected yet</p>
                  }
                </div>
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
                        {hideTable2 ? "hide -" : "show +"}
                      </p>
                    </div>

                    <p className="mb-2 mt-1 p-2 ">
                      {" "}
                      <HiOutlineInformationCircle className="fs-4" />

                      Your
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
                              isConnected && <NativeCoinDetail />
                            }
                            {
                              tokensLength.map((tokenItem, index) => {
                                return <tr key={index}>
                                  <td className="text-light"><TokenSymbol tokenAddress={tokenItem} /></td>
                                  <td className="text-light"><TokenBalance tokenAddress={tokenItem} /></td>
                                  <td>
                                    <MintModal tokenAddress={tokenItem} mintType="token" />
                                  </td>
                                  <td>
                                    {" "}
                                    <Button
                                      variant="primary"
                                      className="bg-transparent border_detail  px-3 ms-3 p-1 text-clr font_size"
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
              </>
            }
            {radioValue === "2" &&
              <>
                <div className="col-lg-6 col-12 boxes mb-3 d-flex flex-column   p-3 text-start">
                  <h5>uTokens</h5>
                  {uProtectedTokens.symbols.length > 0 ? <Table striped className="custom-table flex-wrap" responsive>
                    <thead>
                      <tr>
                        <th>Assets</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        uProtectedTokens.bal.map((tokenItem, index) => {
                          if (ethers.utils.formatEther(tokenItem) > 0) {
                            let str = uProtectedTokens.symbols[index].toLowerCase();
                            str = str.replace("u", "");
                            return tokenItem > 0 && <tr key={index}>
                              <td className="text-light"><img src={`./tokenlist/${str}.png`} alt="" width={20} className="me-2" />{uProtectedTokens.symbols[index]}</td>
                              <td className="text-light">{Number(ethers.utils.formatEther(tokenItem)).toFixed(4)}</td>
                            </tr>
                          }
                        })
                      }

                    </tbody>
                  </Table>
                    :
                    <p className="mb-2 mt-4 text-clr">Nothing protected yet</p>
                  }
                </div>
                <div className="col-lg-6 mb-3 col-12 text-start">
                  <div className="boxes p-3">
                    <div className="d-flex justify-content-between">
                      <h5>unhackableTokens</h5>
                      <p
                        className="text-clr"
                        onClick={handleHide}
                        style={{ cursor: "pointer" }}
                      >
                        {hideTable ? "hide -" : "show +"}
                      </p>
                    </div>
                    <p className="mb-2 mt-1 p-2 ">
                      {" "}Lock
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
                            isConnected && <UNativeCoinDetail />
                          }
                          {
                            tokensLength.map((tokenItem, index) => {
                              return <tr key={index}>
                                <td className="text-light">u<TokenSymbol tokenAddress={tokenItem} /></td>
                                <td className="text-light"><UTokenBalance tokenAddress={tokenItem} /></td>
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
                                  <TransferModal tokenAddress={tokenItem} mintType="token" />
                                </td>
                                <td>
                                  {" "}
                                  <ClaimModal tokenAddress={tokenItem} mintType="token" />
                                </td>
                              </tr>
                            })
                          }
                        </tbody>
                      </Table>
                    )}
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </div >
  );
};

export default Dashboard;
