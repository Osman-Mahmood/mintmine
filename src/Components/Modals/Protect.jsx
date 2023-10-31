// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import TransactionModal from '../Modals/TransactionModal'
import { useAccount, useNetwork } from 'wagmi'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { erc20Instance, factoryInstance, getChainDetails, walletBalance } from '../../config'
import { Button } from 'react-bootstrap'
import RecoverPasswordModal from '../Modals/RecoverPasswordModal'
import { toast } from 'react-hot-toast'
import { ethers } from 'ethers'
import { BeatLoader } from 'react-spinners'
import Range from '../Range'
import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import TokenSymbol from '../Dashboard/childComponents/TokenSymbol';
import { useDispatch, useSelector } from 'react-redux';
import { refreshBalance } from '../../store/refresh';
import UTokenSymbol from '../Dashboard/uChildComponents/UTokenSymbol';
function Protect({ show, handleClose, mintType, tokenAddress }) {
  const dispatch = useDispatch();
  const { isReferesh } = useSelector((state) => state.refreshFunctions)
  const modalVariants = {
    hidden: { opacity: 0, y: '-50%' },
    visible: { opacity: 1, y: '0' },
    exit: { opacity: 0, y: '50%' }
  };
  let [selectedToken, setSelectedToken] = useState({
    name: "Select Token",
    address: null,
    type: "native",
    showBalance: null
  })
  const [isSeePass, setIsSeePass] = useState(false);
  const [showTrx, setShowTrx] = useState(false)
  const [trxHash, setTrxHash] = useState({
    link: null,
    amount: null,
    address: null,
    trxType: null,
    mintType: null
  })
  const [showRModal, setShowRModal] = useState(false);
  const handleCloseRModal = () => setShowRModal(false);
  const handleShowRModal = () => setShowRModal(true);
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount();

  const [showBalance, setShowBalance] = useState(null)
  const getBal = async () => {
    try {
      if (mintType === "native") {
        let ethBal = await walletBalance(address);
        setShowBalance(ethBal);
      } else if (mintType === "token") {
        const contract = await factoryInstance(chain.id)
        const alternateAddress = await contract.get_TokenAddressOfuToken(tokenAddress);
        const token = await erc20Instance(alternateAddress);
        let bal = await token.balanceOf(address);
        setShowBalance(ethers.utils.formatEther(bal))
      }
    } catch (error) {
      console.error("error while get bal", error);
    }
  }
  useEffect(() => {
    if (window.ethereum && isConnected && getChainDetails(chain?.id) && selectedToken.type)
      getBal()
  }, [chain?.id, selectedToken.address, selectedToken.type])
  let [etherAmount, setEtherAmount] = useState();
  let [percentValue, setPercentValue] = useState(0)
  const barAmount = (percent) => {
    setPercentValue(percent)
    setEtherAmount(((showBalance * percent) / 100).toString())
  }
  const [isLoading, setIsLoading] = useState(false);
  const [pass, setPass] = useState();
  const mintU_tokens = async () => {
    try {
      if (getChainDetails(chain.id)) {
        if (
          etherAmount <= 0 ||
          etherAmount == null ||
          etherAmount == undefined ||
          etherAmount == ""
        ) {
          toast.error("Enter amount please");
          return;
        }
        let ref = window.localStorage.getItem("refresh")
        let contract = await factoryInstance(chain.id)
        if (pass === null || pass === undefined || pass === "") {
          toast.error("Enter Password please");
          return;
        }
        const isCorrectPass = await contract.isPasswordCorrect(address, pass);
        if (!isCorrectPass) {
          toast.error("Enter correct password");
          return;
        }
        if (mintType === "native") {
          let ethBal = await walletBalance(address);
          if (ethBal < etherAmount) {
            toast.error(`Insufficent ${selectedToken.name} amount`);
            return;
          }
          setIsLoading(true);
          let ethAmount = ethers.utils.parseEther(etherAmount);
          const tx = await contract.deposit(pass, tokenAddress, ethAmount, {
            value: ethAmount,
            gasLimit: 1000000,
          });
          let receipt = await tx.wait();
          dispatch(refreshBalance(!isReferesh));
          let { explorer } = getChainDetails(chain.id)
          setTrxHash({
            link: `${explorer}tx/${receipt.transactionHash}`,
            amount: etherAmount,
            address: tokenAddress,
            trxType: "mint",
            mintType: mintType
          });
          setShowTrx(true)
          getBal()
          toast.success("U-token minted");
          setIsLoading(false);
        } else if (mintType === "token") {
          let erc_token_address = await contract.get_TokenAddressOfuToken(
            tokenAddress
          );
          const erc_20_instnace = await erc20Instance(erc_token_address)
          const bal = await erc_20_instnace.balanceOf(address);
          if (Number(ethers.utils.formatEther(bal)) < Number(etherAmount)) {
            toast.error(`Insufficient ${selectedToken.name} Tokens`);
            return;
          }
          setIsLoading(true);
          let { contractAddress } = getChainDetails(chain.id)
          let allowance = await erc_20_instnace.allowance(
            address,
            contractAddress
          );

          if (ethers.utils.formatEther(allowance) < etherAmount) {
            let tokenTx = await erc_20_instnace.approve(
              contractAddress,
              ethers.utils.parseEther(etherAmount),
              { gasLimit: 1000000 }
            );
            await tokenTx.wait();
          }
          let ethAmount = ethers.utils.parseEther(etherAmount);
          const tx = await contract.deposit(pass, tokenAddress, ethAmount, {
            value: "0",
            gasLimit: 1000000,
          });
          let receipt = await tx.wait();
          let { explorer } = getChainDetails(chain.id)
          dispatch(refreshBalance(!isReferesh));
          setTrxHash({
            link: `${explorer}tx/${receipt.transactionHash}`,
            amount: etherAmount,
            address: tokenAddress,
            trxType: "mint",
            mintType: mintType
          });
          setShowTrx(true)
          toast.success("U-token minted");
          setIsLoading(false);
          getBal()
        }
      } else {
        toast.error("Wrong Network");
      }
    } catch (error) {
      setIsLoading(false);
      const errorData = JSON.parse(JSON.stringify(error));
      console.error("error while calim u tokens", errorData);
      if (errorData.reason) {
        toast.error(errorData.reason);
        return
      }
      if (errorData.error.message && chain.id === 5) {
        toast.error(errorData.error.message);
      } else if (errorData.error.message && chain.id === 80001) {
        toast.error(errorData.data.message);
      }
    }
  };
  const valueHandler = (value) => {
    if (parseFloat(value) >= parseFloat(showBalance)) {
      setEtherAmount(showBalance)
    } else {
      setEtherAmount(value)
    }
  }
  const addToken = async () => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: selectedToken.address, // The address that the token is at.
            symbol: `u${selectedToken.name}`, // A ticker symbol or shorthand, up to 5 chars.
            decimals: 18,
          },
        },
      });

      if (wasAdded) {
        toast.success("Added successfully");
      } else {
        toast.error("Your loss!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>

      <Modal show={show} onHide={handleClose} centered style={{ zIndex: 999 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <Modal.Header closeButton>
            {/* <Modal.Title>Modal heading</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <>
              {
                <div className='container pt-0 mb-5 mt-0'>
                  <TransactionModal showTrx={showTrx} setShowTrx={setShowTrx} trxHash={trxHash} />
                  <RecoverPasswordModal show={showRModal} handleClose={handleCloseRModal} />
                  <div className='row justify-content-center'>
                    <div className='col-lg-12 text-center justify-content-center d-flex p-0'>
                      <div className='col-lg-12 col-12 box'>
                        <div className="d-flex justify-content-center mx-4 mt-2">
                          {/* {mintType === "token" ? <TokenSymbol tokenAddress={tokenAddress} /> : chain?.nativeCurrency.symbol  } */}

                          <h5 className='color_text text-center'>Protect </h5>
                          <div className='justify-content-end d-flex'>
                            <Link to="/home">
                              <AiOutlineClose
                                className="color_close text-end fs-3 d-none"
                                style={{ cursor: "pointer" }}
                              // onClick={()=>setHideIcon(true)}
                              />
                            </Link>

                          </div>


                        </div>
                        <p className='text-end mb-0 text-wid lighttext'>
                          {
                            showBalance && `Balance: ${showBalance} `
                          }
                        </p>
                        <div className='modalselect w-100 d-flex justify-content-center'>
                          <div className=" wid p-2" style={{ backgroundColor: "rgb(118, 168, 255)" }}>
                            <p className="form-label text-start text-dark"><strong>Send</strong></p>
                            <input type="number"
                              style={{ border: "none", outline: "none", boxShadow: "none", backgroundColor: "#E8F0FE" }}
                              placeholder='0'
                              value={etherAmount}
                              onChange={(e) => {
                                if (showBalance) {
                                  valueHandler(e.target.value);
                                } else {
                                  setEtherAmount(e.target.value);
                                }
                                setPercentValue(parseInt((e.target.value / showBalance) * 100))

                              }}
                              className="form-control  mb-1 text-dark" id="exampleInputEmail1" aria-describedby="emailHelp" />
                          </div>
                          <button className='select_token text-capitalize text-start  bg-primary add_wallet  rad' >
                            {mintType === "token" ? <TokenSymbol tokenAddress={tokenAddress} /> : chain?.nativeCurrency.symbol}
                          </button>
                        </div >

                        <div className="w-100 d-lg-flex d-block justify-content-center align-items-center ">
                          <div className=" w-75 rad d-flex justify-content-center mx-auto" >
                            <Range percentValue={percentValue} barAmount={barAmount} isDisable={showBalance} />
                            <span className='ms-3 mt-1 lighttext' style={{ cursor: "pointer" }} onClick={() => barAmount(100)}>Max</span>
                            <span className='ms-2 mt-1 lighttext'>
                              {showBalance && `${percentValue}%`}
                            </span>
                          </div>
                        </div>

                        <div className='bg_clr w-75 mx-auto rounded'>
                          <div className=' modalselect w-100 d-flex justify-content-center mb-0'>
                            <div className="radius_box w-100  p-2 pt-1" style={{ backgroundColor: "rgb(118, 168, 255)" }}>
                              <div className='d-flex justify-content-between align-items-center  pb-1'>
                                <p className="form-label text-dark text-start mb-0"><strong className=''>You Receive</strong></p>

                                <button disabled className='text-start  bg-primary add_wallet' >
                                  {mintType === "token" ? <UTokenSymbol tokenAddress={tokenAddress} /> : chain?.nativeCurrency.symbol}
                                </button>
                              </div>

                              <input type="number"
                                style={{ border: "none", outline: "none", backgroundColor: "#E8F0FE" }}
                                placeholder='0'
                                value={(etherAmount - (etherAmount * 0.369) / 100)}
                                disabled
                                className="form-control   mb-1 text-dark" />

                            </div>

                          </div>
                          <div className='w-100 d-flex justify-content-center mb-3 mt-n2'>
                            <div className="radius_box w-100 p-2" style={{ backgroundColor: "rgb(118, 168, 255)" }}>
                              <p className="form-label text-start text-dark"><strong>Password</strong></p>
                              <input type={isSeePass ? "text" : "password"} name="" id=""
                                style={{ border: "none", outline: "none", backgroundColor: "#E8F0FE" }}
                                className='token_inp w-100 p-2 text-dark' placeholder=''
                                onChange={(e) => setPass(e.target.value)}
                              />
                              <div
                                style={{ background: "rgba(225, 55, 190, 0.45)" }}
                                className='bg-primary text-light bor'
                                onClick={() => setIsSeePass(!isSeePass)}
                              >
                                {isSeePass ? <AiFillEyeInvisible /> : <AiFillEye />}
                              </div>
                            </div>
                          </div>
                        </div>



                        <Button className='wid protect rad mb-1 p-2 bg-primary'
                          // !isConnected && !getChainDetails(chain?.id) && 
                          disabled={!getChainDetails(chain?.id)}
                          onClick={mintU_tokens}
                        >
                          {isLoading ? <BeatLoader color="#fff" /> : "Protect"}
                        </Button>
                        <div className='w-100 d-flex rad justify-content-center text-center p-3  mb-2 text-primary' style={{ marginTop: "-10px", cursor: "pointer" }}
                          onClick={handleShowRModal}
                        >
                          <div className="wid rad box_forget p-2 ">
                            <strong>Forgot Password</strong>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </>
          </Modal.Body>
        </motion.div>
      </Modal>
    </>
  );
}

export default Protect;