import React, { useEffect, useState } from 'react'
import ModalA from '../Modals/ModalA'
import PasswordModal from '../Modals/PassworModal'
import ProtectModal from '../Modals/ProtectModal'
import { useAccount, useNetwork } from 'wagmi'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { MdOutlineAccountBalanceWallet } from "react-icons/md"
import { erc20Instance, factoryInstance, getChainDetails, walletBalance } from '../../config'
import { Button } from 'react-bootstrap'
import RecoverPasswordModal from '../Modals/RecoverPasswordModal'
import { toast } from 'react-hot-toast'
import { ethers } from 'ethers'
import { BeatLoader } from 'react-spinners'

const TokenSelect = () => {
  let [selectedToken, setSelectedToken] = useState({
    name: "Select Token",
    address: null,
    type: "",
    showBalance: null
  })
  const [isSeePass, setIsSeePass] = useState(false);
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
        let ethBal = await walletBalance(address);
        setShowBalance(ethBal);
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
          await tx.wait();
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
          let receipt = await tx.wait();
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
  return (
    <div className='container pt-5 mb-5'>
      <PasswordModal show={show} handleClose={handleClose} />
      <RecoverPasswordModal show={showRModal} handleClose={handleCloseRModal} />
      <div className='row justify-content-center'>
        <div className='col-lg-12 text-center justify-content-center d-flex'>
          <div className='col-lg-6 col-12 box'>
            <h5 className='text-white pt-5 pb-5'>Protecting</h5>
            <p className='text-end mb-0 text-wid'>
              {
                showBalance && `Available ${selectedToken.name}: ${showBalance}`
              }
            </p>
            <div className='modalselect w-100 d-flex justify-content-center'>
              <div class=" w-75 rounded" style={{ backgroundColor: "#E8F0FE" }}>
                <p className="form-label text-start ms-3 p-2">Send</p>
                <input type="number"
                  style={{ border: "none", outline: "none", boxShadow: "none" }}
                  placeholder='amount'
                  value={etherAmount}
                  onChange={(e) => setEtherAmount(e.target.value)}
                  className="form-control p-3  mb-1 text-dark" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <ModalA className="modala" setSelectedToken={setSelectedToken} selectedToken={selectedToken} />
            </div >
            <div className='w-100 d-flex justify-content-center align-items-center mb-3'>
              <div className='w-75 d-flex'>
                <div className='w-25 fs-4 text-primary'>
                  <MdOutlineAccountBalanceWallet />
                </div>
                <div class=" w-75 rounded mt-2" >
                  <input type="range" min="0" max="100"
                    className="form-range" id="customRange"
                    onChange={(e) => barAmount(e.target.value)}
                    value={percentValue}
                  />
                </div>
                <div className='w-25 mt-2'>
                  {selectedToken.showBalance && `${percentValue}%`}
                </div>
              </div>
            </div>

            <div className=' w-100 d-flex justify-content-center mb-3'>
              <div class=" w-75 rounded" style={{ backgroundColor: "#E8F0FE" }}>
                <p className="form-label text-start ms-3 p-2">Receive</p>
                <input type="number"
                  style={{ border: "none", outline: "none", backgroundColor: "#E8F0FE" }}
                  placeholder='amount'
                  value={selectedToken.name ? (etherAmount - (etherAmount * 0.369) / 100) : 0}
                  disabled
                  className="form-control p-3   mb-1 text-dark" />
              </div>
            </div>
            <div className='w-100 d-flex justify-content-center mb-3'>
              <div className=" w-75 rounded " style={{ backgroundColor: "#E8F0FE" }}>
                <p className="form-label text-start ms-3 p-2">Password</p>
                <input type={isSeePass ? "text" : "password"} name="" id=""
                  style={{ border: "none", outline: "none", backgroundColor: "#E8F0FE" }}
                  className='token_inp w-100 p-3 text-dark' placeholder='0'
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
            <div className='col-10 text-end ms-4 mb-2 text-primary' style={{ marginTop: "-10px", cursor: "pointer" }}
              onClick={handleShowRModal}
            >
              Forgot Password
            </div>

            <Button className='w-75 protect mb-5 pb-3 bg-primary'
              // !isConnected && !getChainDetails(chain?.id) && 
              disabled={!isConnected || selectedToken.address == null || !getChainDetails(chain?.id)}
              onClick={mintU_tokens}
            >
              {isLoading ? <BeatLoader color="#fff" /> : "Protect"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenSelect
