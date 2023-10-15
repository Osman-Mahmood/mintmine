// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from "react";
import ModalA from "../Modals/ModalA";
import PasswordModal from "../Modals/PassworModal";
import ProtectModal from "../Modals/ProtectModal";
import { useAccount, useNetwork } from "wagmi";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import {
  erc20Instance,
  factoryInstance,
  getChainDetails,
  walletBalance,
} from "../../config";
import { Button } from "react-bootstrap";
import RecoverPasswordModal from "../Modals/RecoverPasswordModal";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import { BeatLoader } from "react-spinners";
import ModalB from "../Modals/ModalB";
import TransactionModal from "../Modals/TransactionModal";
import Range from "../Range";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

const modalVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 }
};
function Transfer() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
  const [hideIcon, setHideIcon] = useState(false);
  let [selectedToken, setSelectedToken] = useState({
    name: "Select Token",
    address: null,
    type: "",
    showBalance: null,
  });
  const [isSeePass, setIsSeePass] = useState(false);
  const [show, setShow] = useState(false);
  const [showTrx, setShowTrx] = useState(false);
  const [trxHash, setTrxHash] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showRModal, setShowRModal] = useState(false);
  const handleCloseRModal = () => setShowRModal(false);
  const handleShowRModal = () => setShowRModal(true);
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const getDeatil = async () => {
    let contract = await factoryInstance(chain.id);
    let isPasswordSet = await contract.isPasswordSet(address);
    if (!isPasswordSet) handleShow();
  };
  // useEffect(() => {
  //   if (window.ethereum) {
  //     if (getChainDetails(chain?.id)) getDeatil();
  //   }
  // }, []);
  const [showBalance, setShowBalance] = useState(null);
  const getBal = async () => {
    try {
      if (selectedToken.type === "native") {
        let contract = await factoryInstance(chain.id);
        let u_eth_address = await contract.deployedAddressOfEth();
        const new_instance = await erc20Instance(u_eth_address);
        const u_eth_bal = await new_instance.balanceOf(address);
        setShowBalance(ethers.utils.formatEther(u_eth_bal));
      } else if (selectedToken.type === "token") {
        // const contract = await factoryInstance(chain?.id);
        // const alternateAddress = await contract.get_TokenAddressOfuToken(selectedToken.address);
        const token = await erc20Instance(selectedToken.address);
        let bal = await token.balanceOf(address);
        setShowBalance(ethers.utils.formatEther(bal));
      }
    } catch (error) {
      console.error("error while get bal", error);
    }
  };
  useEffect(() => {
    if (
      window.ethereum &&
      isConnected &&
      getChainDetails(chain?.id) &&
      selectedToken.type
    )
      getBal();
  }, [chain?.id, selectedToken.address, selectedToken.type]);
  let [percentValue, setPercentValue] = useState(0);
  console.log("percentValue", percentValue);
  const barAmount = (percent) => {
    setPercentValue(percent);
    setEtherAmount(((showBalance * percent) / 100).toString());
  };
  let [etherAmount, setEtherAmount] = useState();
  const [transferAddress, setTransferAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pass, setPass] = useState();
  const transferUTokens = async () => {
    try {
      if (
        etherAmount <= 0 ||
        etherAmount == null ||
        etherAmount == undefined ||
        etherAmount == ""
      ) {
        toast.error("Enter amount please");
        return;
      }
      if (
        transferAddress <= 0 ||
        transferAddress == null ||
        transferAddress == undefined ||
        transferAddress == ""
      ) {
        toast.error("Enter Transfer Address");
        return;
      }
      let contract = await factoryInstance(chain.id);
      let isPass = await contract.isPasswordSet(address);
      if (!isPass) {
        handleShow();
      }
      if (pass === null || pass === undefined || pass === "") {
        toast.error("Enter Password please");
        return;
      }
      const isCorrectPass = await contract.isPasswordCorrect(address, pass);
      if (!isCorrectPass) {
        toast.error("Enter correct password");
        return;
      }

      if (selectedToken.type == "native") {
        const etherAddress = await contract.deployedAddressOfEth();
        const new_instance = await erc20Instance(etherAddress);
        const u_eth_bal = await new_instance.balanceOf(address);
        if (ethers.utils.formatEther(u_eth_bal) < Number(etherAmount)) {
          toast.error(`Insufficent u-${selectedToken.name} amount`);
          return;
        }
        setIsLoading(true);
        let tx = await contract.transfer(
          pass,
          etherAddress,
          transferAddress,
          ethers.utils.parseEther(etherAmount)
        );
        let receipt = await tx.wait();
        let { explorer } = getChainDetails(chain.id);
        setTrxHash(`${explorer}/${receipt.transactionHash}`);
        setShowTrx(true);
        toast.success(`u-${selectedToken.name} transfered`);
        setEtherAmount(0);
        setIsLoading(false);
        getBal();
      } else if (selectedToken.type == "token") {
        const tokenInstance = await erc20Instance(selectedToken.address);
        let bal = await tokenInstance.balanceOf(address);
        if (ethers.utils.formatEther(bal) < etherAmount) {
          toast.error(`Insufficent u-${selectedToken.name} amount`);
          return;
        }
        setIsLoading(true);
        let tx = await contract.transfer(
          pass,
          selectedToken.address,
          transferAddress,
          ethers.utils.parseEther(etherAmount)
        );
        let receipt = await tx.wait();
        let { explorer } = getChainDetails(chain.id);
        setTrxHash(`${explorer}/${receipt.transactionHash}`);
        setShowTrx(true);
        toast.success("U-Token transfered");
        setEtherAmount(0);
        setIsLoading(false);
        getBal();
      }
    } catch (error) {
      setIsLoading(false);
      const errorData = JSON.parse(JSON.stringify(error));
      console.error("error while calim u tokens", errorData);
      if (errorData.reason) {
        toast.error(errorData.reason);
        return;
      }
      if (errorData.error.message && chain.id === 5) {
        toast.error(errorData.error.message);
      } else if (errorData.error.message && chain.id === 80001) {
        toast.error(errorData.data.message);
      }
    }
  };
  const addToken = async () => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: selectedToken.address, // The address that the token is at.
            symbol: selectedToken.name, // A ticker symbol or shorthand, up to 5 chars.
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
      console.log(error);
    }
  };
  const valueHandler = (value) => {
    if (parseFloat(value) >= parseFloat(showBalance)) {
      setEtherAmount(showBalance)
    } else {
      setEtherAmount(value)
    }
  }

  return (
    <>
      <Button variant="primary" className='font_size bg-transparent px-2 p-1 text-clr' onClick={handleShow}>
      Transfer
      </Button>
      <AnimatePresence>
        {show && (
      <Modal show={show} onHide={handleClose} style={{ zIndex: 999 }} keyboard={false}
      animation={false} centered>
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
        !hideIcon ? <div className="container pt-1 mb-5">
          <TransactionModal
            showTrx={showTrx}
            setShowTrx={setShowTrx}
            trxHash={trxHash}
          />
          <PasswordModal show={show} handleClose={handleClose} />
          <RecoverPasswordModal
            show={showRModal}
            handleClose={handleCloseRModal}
          />
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center justify-content-center d-flex p-0">
              <div className="col-lg-12 col-12 box">
                <div className="d-flex justify-content-between mx-4 mt-2">
                  <h5></h5>
                  <h5 className="color_close">Transfer</h5>
                  <Link to="/home">
                    <AiOutlineClose
                      className="color_close text-end fs-3 d-none"
                      style={{ cursor: "pointer" }}
                    // onClick={()=>setHideIcon(true)}
                    />
                  </Link>
                </div>

                <p className="text-end mb-0 text-wid lighttext">
                  {showBalance && `Balance: ${showBalance} Max`}
                </p>
                <div className="modalselect w-100 d-flex justify-content-center ">
                  <div
                    class="wid p-2 "
                    style={{ backgroundColor: "rgb(118 168 255)" }}
                  >
                    <p className="form-label text-start text-dark ">
                      <strong>Send</strong>
                    </p>
                    <input
                      type="number"
                      style={{
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        backgroundColor: "#E8F0FE"
                      }}
                      placeholder="0"
                      value={etherAmount}

                      onChange={(e) => {
                        if (showBalance) {
                          valueHandler(e.target.value);
                        } else {
                          setEtherAmount(e.target.value);
                        }
                        setPercentValue(
                          parseInt((e.target.value / showBalance) * 100)
                        );
                      }}
                      className="form-control  mb-1 text-dark"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>

                  <ModalB
                    className="modala"
                    setSelectedToken={setSelectedToken}
                    selectedToken={selectedToken}
                  />
                </div>
                <div className="w-100 d-lg-flex d-block justify-content-center align-items-center ">

                  {/* <button className="btn btn-primary add ms-lg-5 mt-2 ms-0 p-0">Add to Wallet</button> */}
                  <div className=" w-75 rad d-flex justify-content-center mx-auto" >
                    <Range percentValue={percentValue} barAmount={barAmount} isDisable={showBalance} />
                    <span className='ms-5 mt-1 lighttext'>
                      {showBalance && `${percentValue}%`}
                    </span>
                  </div>
                </div>
                <div className='bg_clr w-75 mx-auto rounded'>
                <div className=" w-100 d-flex justify-content-center mb-0">
                  <div
                    class="w-100  p-2"
                    style={{ backgroundColor: "rgb(118 168 255)" }}
                  >
                    <div className="d-flex justify-content-between">
                      <p className="form-label text-start text-dark ">
                        <strong>Address</strong>
                      </p>
                      {/* <button className="btn btn-primary add_wallet tex" style={{fontSize:'11px'}}>Add to Wallet</button> */}
                    </div>

                    <input
                      type="text"
                      style={{
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        backgroundColor: "#E8F0FE"
                      }}
                      placeholder=""
                      onChange={(e) => setTransferAddress(e.target.value)}
                      className="form-control  mb-1 text-dark"
                    />
                  </div>
                </div>

                <div className="w-100 d-flex justify-content-center mb-3 mt-0">
                  <div
                    className="p-2 w-100"
                    style={{ backgroundColor: "rgb(118 168 255)" }}
                  >
                    <p className="form-label text-start text-dark ">
                      <strong>Password</strong>
                    </p>
                    <input
                      type={isSeePass ? "text" : "password"}
                      name=""
                      id=""
                      style={{
                        border: "none",
                        outline: "none",
                        backgroundColor: "#E8F0FE",
                      }}
                      className="p-2 token_inp w-100 text-dark "
                      placeholder=""
                      onChange={(e) => setPass(e.target.value)}
                    />
                    <div
                      style={{ background: "rgba(225, 55, 190, 0.45)" }}
                      className="bg-primary text-light"
                      onClick={() => setIsSeePass(!isSeePass)}
                    >
                      {isSeePass ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                  </div>
                </div>
</div>
                <Button
                  className="wid protect mb-2 p-2 rad"
                  variant="primary"
                  // !isConnected && !getChainDetails(chain?.id) &&
                  disabled={
                    !isConnected ||
                    selectedToken.address == null ||
                    !getChainDetails(chain?.id)
                  }
                  onClick={transferUTokens}
                >
                  {isLoading ? <BeatLoader color="#fff" /> : "Transfer"}
                </Button>
                <div
                  className="w-100 rad d-flex justify-content-center text-center p-3  mb-2 text-primary"
                  style={{ marginTop: "-10px", cursor: "pointer" }}
                  onClick={handleShowRModal}
                >
                  <div className="wid box_forget p-2 rad">
                    <strong>Forgot Password</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          : <div className="" style={{ height: '100vh' }}>

          </div>
      }

    </>
        </Modal.Body>

        </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default Transfer;