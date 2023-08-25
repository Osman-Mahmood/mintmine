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
import ModalB from '../Modals/ModalB'

const TransferToken = () => {
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
                let contract = await factoryInstance(chain.id)
                let u_eth_address = await contract.deployedAddressOfEth();
                const new_instance = await erc20Instance(u_eth_address);
                const u_eth_bal = await new_instance.balanceOf(address);
                setShowBalance(ethers.utils.formatEther(u_eth_bal));
            } else if (selectedToken.type === "token") {
                // const contract = await factoryInstance(chain?.id);
                // const alternateAddress = await contract.get_TokenAddressOfuToken(selectedToken.address);
                const token = await erc20Instance(selectedToken.address);
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
    let [percentValue, setPercentValue] = useState(0)
    const barAmount = (percent) => {
        setPercentValue(percent)
        setEtherAmount(((showBalance * percent) / 100).toString())
    }
    let [etherAmount, setEtherAmount] = useState();
    const [transferAddress, setTransferAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pass, setPass] = useState();
    const transferUTokens = async () => {
        try {
            if (etherAmount <= 0 || etherAmount == null || etherAmount == undefined || etherAmount == "") {
                toast.error("Enter amount please")
                return
            }
            if (transferAddress <= 0 || transferAddress == null || transferAddress == undefined || transferAddress == "") {
                toast.error("Enter Transfer Address")
                return
            }
            let contract = await factoryInstance(chain.id)
            let isPass = await contract.isPasswordSet(address);
            if (!isPass) {
                handleShow()
            }
            if (pass === null || pass === undefined || pass === "") {
                toast.error("Enter Password please")
                return
            }
            const isCorrectPass = await contract.isPasswordCorrect(address, pass);
            if (!isCorrectPass) {
                toast.error("Enter correct password")
                return
            }

            if (selectedToken.type == "native") {
                const etherAddress = await contract.deployedAddressOfEth()
                const new_instance = await erc20Instance(etherAddress);
                const u_eth_bal = await new_instance.balanceOf(address);
                if (ethers.utils.formatEther(u_eth_bal) < Number(etherAmount)) {
                    toast.error(`Insufficent u-${selectedToken.name} amount`);
                    return;
                }
                setIsLoading(true)
                let tx = await contract.transfer(
                    pass, etherAddress, transferAddress, ethers.utils.parseEther(etherAmount)
                )
                await tx.wait();
                toast.success(`u-${selectedToken.name} transfered`)
                setEtherAmount(0)
                setIsLoading(false)
                getBal()
            } else if (selectedToken.type == "token") {
                const tokenInstance = await erc20Instance(selectedToken.address);
                let bal = await tokenInstance.balanceOf(address);
                if (ethers.utils.formatEther(bal) < etherAmount) {
                    toast.error(`Insufficent u-${selectedToken.name} amount`);
                    return;
                }
                setIsLoading(true)
                let tx = await contract.transfer(
                    pass, selectedToken.address, transferAddress, ethers.utils.parseEther(etherAmount)
                )
                await tx.wait();
                toast.success("U-Token transfered")
                setEtherAmount(0)
                setIsLoading(false)
                getBal()
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
    }
    return (
        <div className='container pt-5 mb-5'>
            <PasswordModal show={show} handleClose={handleClose} />
            <RecoverPasswordModal show={showRModal} handleClose={handleCloseRModal} />
            <div className='row justify-content-center'>
                <div className='col-lg-12 text-center justify-content-center d-flex'>
                    <div className='col-lg-6 col-12 box'>
                        <h5 className='text-dark pt-5 pb-5'>Transfer</h5>
                        <p className='text-end mb-0 text-wid'>
                            {
                                showBalance && `Available ${selectedToken.name}: ${showBalance}`
                            }
                        </p>
                        <div className='modalselect w-100 d-flex justify-content-center mb-3'>
                            <div class=" w-75 rounded border" style={{ backgroundColor: "rgb(232, 240, 254)" }}>
                                <p className="form-label text-start text-dark ms-2 p-2"><strong>Transfer</strong></p>
                                <input type="number"
                                    style={{ border: "none", outline: "none", boxShadow: "none" }}
                                    placeholder='amount'
                                    value={etherAmount}
                                    onChange={(e) => setEtherAmount(e.target.value)}
                                    className="form-control p-3  mb-1 text-dark" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>

                            <ModalB className="modala" setSelectedToken={setSelectedToken} selectedToken={selectedToken} />
                        </div>
                        <div className='w-100 d-flex justify-content-center align-items-center mb-3'>
                            <div className='w-75 d-flex'>
                                <div className='w-25 fs-4 text-primary'>
                                    <MdOutlineAccountBalanceWallet />
                                </div>
                                <div class=" w-75 rounded mt-2 "  >
                                    <input type="range" min="0" max="100"
                                        className="form-range" id="customRange"
                                        onChange={(e) => barAmount(e.target.value)}
                                        value={percentValue}
                                    />
                                </div>
                                <div className='w-25 mt-2'>
                                    {showBalance && `${percentValue}%`}
                                </div>
                            </div>
                        </div>
                        <div className=' w-100 d-flex justify-content-center mb-3'>
                            <div class=" w-75 rounded border" style={{backgroundColor:"rgb(232, 240, 254)"}}>
                                <p className="form-label text-start ms-2 p-2 text-dark "><strong>Address</strong></p>
                                <input type="text"
                                    style={{ border: "none", outline: "none", boxShadow: "none" }}
                                    placeholder='recipient address '
                                    onChange={(e) => setTransferAddress(e.target.value)}
                                    className="form-control p-3   mb-1 text-dark" />
                            </div>
                        </div>

                        <div className='w-100 d-flex justify-content-center mb-3'>
                            <div className=" w-75 rounded " style={{ backgroundColor: "#E8F0FE" }}>
                                <p className="form-label text-start ms-2 p-2 text-dark "><strong>Password</strong></p>
                                <input type={isSeePass ? "text" : "password"} name="" id=""
                                    style={{ border: "none", outline: "none", backgroundColor: "#E8F0FE" }}
                                    className='token_inp w-100 p-3 text-dark ' placeholder='0'
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

                        <Button className='w-75 protect mb-5 pb-3' variant="primary"
                            // !isConnected && !getChainDetails(chain?.id) && 
                            disabled={!isConnected || selectedToken.address == null || !getChainDetails(chain?.id)}
                            onClick={transferUTokens}
                        >
                            {isLoading ? <BeatLoader color="#fff" /> : "Transfer"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransferToken
