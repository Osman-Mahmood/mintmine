/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from "../../StorageHook"
import { useAccount, useNetwork } from 'wagmi'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { MdOutlineAccountBalanceWallet } from "react-icons/md"
import { IoIosArrowDown } from 'react-icons/io'
import { erc20Instance, factoryInstance, getChainDetails, walletBalance } from '../../config'
import { Button } from 'react-bootstrap'
import RecoverPasswordModal from '../Modals/RecoverPasswordModal'
import { toast } from 'react-hot-toast'
import { ethers } from 'ethers'
import { BeatLoader } from 'react-spinners'
import { refreshBalance } from '../../store/refresh';
import { useDispatch, useSelector } from 'react-redux'
import TransactionModal from '../Modals/TransactionModal'
import Range from '../Range'
import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { motion, AnimatePresence } from "framer-motion";
import TokenSymbol from '../Dashboard/childComponents/TokenSymbol'
import UTokenSymbol from '../Dashboard/uChildComponents/UTokenSymbol'


const modalVariants = {
    open: {
        y: "0%",
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: "50%",
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

function Claim({ show, handleClose, mintType, tokenAddress }) {
    const dispatch = useDispatch();
    const { isReferesh } = useSelector((state) => state.refreshFunctions)
    let [selectedToken, setSelectedToken] = useState({
        name: "Select Token",
        address: null,
        type: "",
        showBalance: null
    })
    const [isSeePass, setIsSeePass] = useState(false);
    const [showTrx, setShowTrx] = useState(false)
    const [trxHash, setTrxHash] = useState({
        link: null,
        amount: null,
        address: null,
        trxType: null,
        mintType:null
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
                const new_instance = await erc20Instance(tokenAddress);
                const u_eth_bal = await new_instance.balanceOf(address);
                setShowBalance(ethers.utils.formatEther(u_eth_bal));
            } else if (mintType === "token") {
                const token = await erc20Instance(tokenAddress);
                let bal = await token.balanceOf(address);
                setShowBalance(ethers.utils.formatEther(bal))
            }
        } catch (error) {
            console.error("error while get bal", error);
        }
    }
    useEffect(() => {
        if (window.ethereum && isConnected && getChainDetails(chain?.id) && tokenAddress)
            getBal()
    }, [chain?.id, mintType, tokenAddress])
    let [percentValue, setPercentValue] = useState(0)

    const barAmount = (percent) => {
        setPercentValue(percent)
        setEtherAmount(((showBalance * percent) / 100).toString())
    }
    let [etherAmount, setEtherAmount] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [pass, setPass] = useState();
    const claimUTokens = async () => {
        try {

            if (etherAmount <= 0 || etherAmount == null || etherAmount === undefined || etherAmount === "") {
                toast.error("Enter amount please")
                return;
            }
            let contract = await factoryInstance(chain.id)
            if (pass === null || pass === undefined || pass === "") {
                toast.error("Enter Password please")
                return
            }
            const isCorrectPass = await contract.isPasswordCorrect(address, pass);
            if (!isCorrectPass) {
                toast.error("Enter correct password")
                return
            }
            if (mintType === "native") {
                const new_instance = await erc20Instance(tokenAddress);
                const u_eth_bal = await new_instance.balanceOf(address);
                if (ethers.utils.formatEther(u_eth_bal) < etherAmount) {
                    toast.error(`Insufficent u-${selectedToken.name} amount`);
                    return;
                }
                setIsLoading(true)
                let tx = await contract.withdraw(
                    pass, tokenAddress, ethers.utils.parseEther(etherAmount)
                )
                let receipt = await tx.wait();
                dispatch(refreshBalance(!isReferesh));
                let { explorer } = getChainDetails(chain.id)
                setTrxHash({
                    link: `${explorer}tx/${receipt.transactionHash}`,
                    amount: etherAmount,
                    address: tokenAddress,
                    trxType: "claim",
                    mintType:mintType
                });
                setShowTrx(true)
                toast.success(`u-${selectedToken.name} Claimed`)
                setEtherAmount(0)
                setIsLoading(false)
                getBal()
            } else if (mintType === "token") {
                const tokenInstance = await erc20Instance(tokenAddress);
                let bal = await tokenInstance.balanceOf(address);
                if (parseFloat(ethers.utils.formatEther(bal)) < parseFloat(etherAmount)) {
                    toast.error(`Insufficent u-${selectedToken.name} amount`);
                    return;
                }
                setIsLoading(true)
                let tx = await contract.withdraw(
                    pass, tokenAddress, ethers.utils.parseEther(etherAmount)
                )
                let receipt = await tx.wait();
                dispatch(refreshBalance(!isReferesh));
                let { explorer } = getChainDetails(chain.id)
                setTrxHash({
                    link: `${explorer}tx/${receipt.transactionHash}`,
                    amount: etherAmount,
                    address: tokenAddress,
                    trxType: "claim",
                    mintType:mintType
                });
                setShowTrx(true)
                toast.success(`u-${selectedToken.name} Claimed`)
                getBal()
                setEtherAmount(0)
                setIsLoading(false)
            }

        } catch (error) {
            setIsLoading(false);
            console.error("error while calim u tokens", error);
        }
    }

    const valueHandler = (value) => {
        if (parseFloat(value) >= parseFloat(showBalance)) {
            setEtherAmount(showBalance)
        } else {
            setEtherAmount(value)
        }
    }
    return (
        <>
            <AnimatePresence>
                {show && (
                    <Modal show={show} onHide={handleClose} animation={false} centered>

                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={modalVariants}
                        >

                            <Modal.Header closeButton>
                                {/* <Modal.Title>Modal heading</Modal.Title> */}
                            </Modal.Header>
                            <Modal.Body>
                                <>
                                    {
                                        <div className='container pt-1 mb-5'>
                                            <TransactionModal showTrx={showTrx} setShowTrx={setShowTrx} trxHash={trxHash} />
                                            <RecoverPasswordModal show={showRModal} handleClose={handleCloseRModal} />
                                            <div className='row justify-content-center'>
                                                <div className='col-lg-12 text-center justify-content-center d-flex p-0'>
                                                    <div className='col-lg-12 col-12 box'>
                                                        <div className="d-flex justify-content-between mx-4 mt-2">
                                                            <h5></h5>
                                                            <h5 className='color_close'>Withdraw</h5>
                                                            <Link to="/home">
                                                                <AiOutlineClose
                                                                    className="color_close text-end fs-3 d-none"
                                                                    style={{ cursor: "pointer" }}
                                                                // onClick={()=>setHideIcon(true)}
                                                                />
                                                            </Link>
                                                        </div>

                                                        <p className='text-end mb-0 text-wid lighttext'>
                                                            {
                                                                showBalance && `Balance: ${showBalance} Max`
                                                            }
                                                        </p>
                                                        <div className='modalselect w-100 d-flex justify-content-center'>
                                                            <div class=" wid rad border p-2" style={{ backgroundColor: "rgb(118, 168, 255)" }}>
                                                                <p className="form-label text-dark text-start"><strong>Receive</strong></p>
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
                                                            <button className='select_token border-0 outline-none  bg-primary  rad' variant="primary" >
                                                                {mintType === "token" ? <UTokenSymbol tokenAddress={tokenAddress} /> : `u${chain?.nativeCurrency.symbol}`}
                                                            </button>
                                                        </div>
                                                        <div className="w-100 d-lg-flex d-block justify-content-center align-items-center ">
                                                            <div className=" w-75 rad d-flex justify-content-center mx-auto" >
                                                                <Range percentValue={percentValue} barAmount={barAmount} isDisable={showBalance} />
                                                                <span className='ms-3 mt-1 lighttext' style={{ cursor: "pointer" }} onClick={() => barAmount(100)}>Max</span>
                                                                <span className='ms-2 mt-1 lighttext'>
                                                                    {showBalance && `${percentValue}%`}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className='w-100 d-flex justify-content-center mb-3'>
                                                            <div className="  wid p-2 rad" style={{ backgroundColor: "rgb(118, 168, 255)" }}>
                                                                <p className="form-label text-start text-dark"><strong>Password</strong></p>

                                                                <input type={isSeePass ? "text" : "password"} name="" id=""
                                                                    style={{ border: "none", outline: "none", backgroundColor: "#E8F0FE" }}
                                                                    className='p-2 token_inp w-100 text-dark' placeholder='0'
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


                                                        <Button className='wid protect rad mb-2 p-2' variant="primary"
                                                            disabled={!getChainDetails(chain?.id)}
                                                            onClick={claimUTokens}
                                                        >
                                                            {isLoading ? <BeatLoader color="#fff" /> : "Claim"}
                                                        </Button>
                                                        <div className='w-100 d-flex justify-content-center text-center p-3  mb-2 text-primary' style={{ marginTop: "-10px", cursor: "pointer" }}
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

export default Claim;