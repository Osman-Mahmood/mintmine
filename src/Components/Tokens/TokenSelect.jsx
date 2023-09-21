import React, { useEffect, useState } from 'react'
import ModalA from '../Modals/ModalA'
import PasswordModal from '../Modals/PassworModal'
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

const TokenSelect = () => {
  const [hideIcon, setHideIcon] = useState(false);
  let [selectedToken, setSelectedToken] = useState({
    name: "Select Token",
    address: null,
    type: "native",
    showBalance: null
  })
  const [isSeePass, setIsSeePass] = useState(false);
  const [showTrx, setShowTrx] = useState(false)
  const [trxHash, setTrxHash] = useState(null)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showRModal, setShowRModal] = useState(false);
  const handleCloseRModal = () => setShowRModal(false);
  const handleShowRModal = () => setShowRModal(true);
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount();
  const getDeatil = async () => {
    let contract = await factoryInstance(chain.id);
    let isPasswordSet = await contract.isPasswordSet(address)
    if (!isPasswordSet)
      handleShow()
  }
  useEffect(() => {
    if (window.ethereum) {
      if (getChainDetails(chain?.id))
        getDeatil()
    }
  }, [])
  const [showBalance, setShowBalance] = useState(null)
  const getBal = async () => {
    try {
      if (selectedToken.type === "native") {
        let contract = await factoryInstance(chain.id)
        let u_eth_address = await contract.deployedAddressOfEth();
        let ethBal = await walletBalance(address);
        setShowBalance(ethBal);
        setSelectedToken({
          name: chain?.nativeCurrency.symbol,
          address: u_eth_address,
          type: "native",
      })
      } else if (selectedToken.type === "token") {
        const contract = await factoryInstance(chain?.id);
        const alternateAddress = await contract.get_TokenAddressOfuToken(selectedToken.address);
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
        let contract = await factoryInstance(chain.id)
        let isPass = await contract.isPasswordSet(address);
        if (!isPass) {
          handleShow();
          return
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
        if (selectedToken.type === "native") {
          let ethBal = await walletBalance(address);
          if (ethBal < etherAmount) {
            toast.error(`Insufficent ${selectedToken.name} amount`);
            return;
          }
          setIsLoading(true);
          const etherAddress = await contract.deployedAddressOfEth();

          let ethAmount = ethers.utils.parseEther(etherAmount);
          const tx = await contract.deposit(pass, etherAddress, ethAmount, {
            value: ethAmount,
            gasLimit: 1000000,
          });
          let receipt = await tx.wait();
          let { explorer } = getChainDetails(chain.id)
          setTrxHash(`${explorer}/${receipt.transactionHash}`);
          setShowTrx(true)
          getBal()
          toast.success("U-token minted");
          setIsLoading(false);
        } else if (selectedToken.type == "token") {
          let erc_token_address = await contract.get_TokenAddressOfuToken(
            selectedToken.address
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
          const tx = await contract.deposit(pass, selectedToken.address, ethAmount, {
            value: "0",
            gasLimit: 1000000,
          });
          console.log("tx", tx);
          let receipt = await tx.wait();
          let { explorer } = getChainDetails(chain.id)
          console.log("tx", explorer);
          setTrxHash(`${explorer}/${receipt.transactionHash}`);
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
      console.log(error);
    }
  };
  return (
    <>
      {
        !hideIcon ? <div className='container pt-0 mb-5 mt-0'>
          <TransactionModal showTrx={showTrx} setShowTrx={setShowTrx} trxHash={trxHash} />
          <PasswordModal show={show} handleClose={handleClose} />
          <RecoverPasswordModal show={showRModal} handleClose={handleCloseRModal} />
          <div className='row justify-content-center'>
            <div className='col-lg-12 text-center justify-content-center d-flex p-0'>
              <div className='col-lg-6 col-12 box'>
                <div className="d-flex justify-content-between mx-4 mt-2">
                  <h5></h5>
                  <h5 className='color_text text-center'>Protect</h5>
                  <div className='justify-content-end d-flex'>
                    <Link to="/home">
                      <AiOutlineClose
                        className="color_close text-end fs-3"
                        style={{ cursor: "pointer" }}
                      // onClick={()=>setHideIcon(true)}
                      />
                    </Link>

                  </div>


                </div>
                <p className='text-end mb-0 text-wid lighttext'>
                  {
                    showBalance && `Balance: ${showBalance} Max`
                  }
                </p>
                <div className='modalselect w-100 d-flex justify-content-center'>
                  <div className=" rad border wid p-2" style={{ backgroundColor: "rgb(118, 168, 255)" }}>
                    <p className="form-label text-start text-dark"><strong>Send</strong></p>
                    <input type="number"
                      style={{ border: "none", outline: "none", boxShadow: "none" }}
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
                  <ModalA className="modala" setSelectedToken={setSelectedToken} selectedToken={selectedToken} />
                </div >

                <div className="w-100 d-lg-flex d-block justify-content-center align-items-center ">

                  {/* <button className="btn btn-primary add ms-lg-5 mt-2 ms-0 p-0">Add to Wallet</button> */}
                  <div className=" w-75 rad d-flex justify-content-center mx-auto" >
                    <Range percentValue={percentValue} barAmount={barAmount} isDisable={showBalance} />
                  <span className='ms-5 mt-1 lighttext'>
                    {showBalance && `${percentValue}%`}
                  </span>
                  </div>
                </div>


                <div className=' modalselect w-100 d-flex justify-content-center mb-3'>
                  <div className=" wid rad border p-2 pt-1" style={{ backgroundColor: "rgb(118, 168, 255)" }}>
                    <div className='d-flex justify-content-between align-items-center  pb-1'>
                      <p className="form-label text-dark text-start mb-0"><strong className=''>You Receive</strong></p>
                      {

                        selectedToken.address &&

                        <>
                          <button className="btn btn-primary ms-0 m-0 fw-bold text-center add_wallet" style={{ fontSize: '11px' }}
                          onClick={addToken}
                          >Add to Wallet</button>
                          <button disabled className='text-start  bg-primary add_wallet' >
                            u{selectedToken.name}
                          </button>


                        </>
                      }
                    </div>

                    <input type="number"
                      style={{ border: "none", outline: "none", backgroundColor: "#E8F0FE" }}
                      placeholder='0'
                      value={selectedToken.name ? (etherAmount - (etherAmount * 0.369) / 100) : 0}
                      disabled
                      className="form-control   mb-1 text-dark" />

                  </div>

                </div>
                <div className='w-100 d-flex justify-content-center mb-3'>
                  <div className=" wid rad p-2" style={{ backgroundColor: "rgb(118, 168, 255)" }}>
                    <p className="form-label text-start text-dark"><strong>Password</strong></p>
                    <input type={isSeePass ? "text" : "password"} name="" id=""
                      style={{ border: "none", outline: "none", backgroundColor: "#E8F0FE" }}
                      className='token_inp w-100 text-dark' placeholder=''
                      onChange={(e) => setPass(e.target.value)}
                    />
                    <div
                      style={{ background: "rgba(225, 55, 190, 0.45)" }}
                      className='bg-primary text-light'
                      onClick={() => setIsSeePass(!isSeePass)}
                    >
                      {isSeePass ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                  </div>
                </div>


                <Button className='wid protect rad mb-1 p-2 bg-primary'
                  // !isConnected && !getChainDetails(chain?.id) && 
                  disabled={!isConnected || selectedToken.address == null || !getChainDetails(chain?.id)}
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
        </div> :
          <div className='' style={{ height: '100vh' }}>

          </div>
      }
    </>

  )
}

export default TokenSelect
