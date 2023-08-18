import React, { useEffect, useState } from 'react'
import ModalA from '../Modals/ModalA'
import PasswordModal from '../Modals/PassworModal'
import ProtectModal from '../Modals/ProtectModal'
import { useAccount, useNetwork } from 'wagmi'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { erc20Instance, factoryInstance, getChainDetails, walletBalance } from '../../config'
import { Button } from 'react-bootstrap'
import RecoverPasswordModal from '../Modals/RecoverPasswordModal'
import { toast } from 'react-hot-toast'
import { ethers } from 'ethers'
import { BeatLoader } from 'react-spinners'
import ModalB from '../Modals/ModalB'

const WithdrawToken = () => {
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
    const maxAmount = (percent) => {
        setEtherAmount((showBalance * percent) / 100)
    }
    let [etherAmount, setEtherAmount] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [pass, setPass] = useState();
    const claimUTokens = async () => {
        try {

            if (etherAmount <= 0 || etherAmount == null || etherAmount == undefined || etherAmount == "") {
                toast.error("Enter amount please")
                return;
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
                if (ethers.utils.formatEther(u_eth_bal) < etherAmount) {
                    toast.error(`Insufficent u-${selectedToken.name} amount`);
                    return;
                }
                setIsLoading(true)
                let tx = await contract.withdraw(
                    pass, etherAddress, ethers.utils.parseEther(etherAmount)
                )
                await tx.wait();
                toast.success(`u-${selectedToken.name} Claimed`)
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
                let tx = await contract.withdraw(
                    pass, selectedToken.address, ethers.utils.parseEther(etherAmount)
                )
                await tx.wait();
                toast.success(`u-${selectedToken.name} Claimed`)
                getBal()
                setEtherAmount(0)
                setIsLoading(false)
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
        <div className='container mt-5 mb-5'>
            <PasswordModal show={show} handleClose={handleClose} />
            <RecoverPasswordModal show={showRModal} handleClose={handleCloseRModal} />
            <div className='row justify-content-center'>
                <div className='col-lg-12 text-center justify-content-center d-flex'>
                    <div className='col-lg-6 col-12 box'>
                        <h5 className='text-white pt-5 pb-5'>Withdraw</h5>
                        <p className='text-end mb-0 text-wid'>
                            {
                                showBalance && `Avbl ${selectedToken.name}: ${showBalance}`
                            }
                        </p>
                        <div className='modalselect'>
                            <input type="number" name="" id="" className='token_inp p-4 w-75 mb-3 text-dark'
                            value={etherAmount}
                                autocomplete="new-password"
                                placeholder='amount'
                                onChange={(e) => setEtherAmount(e.target.value)}
                            />
                            <ModalB className="modala" setSelectedToken={setSelectedToken} selectedToken={selectedToken} />
                        </div>
                        <div className='btn_small justify-content-end text-wid mb-2  align-items-center text-end'>
                            <button disabled={!showBalance} onClick={() => maxAmount(25)} >25%</button>
                            <button disabled={!showBalance} onClick={() => maxAmount(50)}>50%</button>
                            <button disabled={!showBalance} onClick={() => maxAmount(75)}>75%</button>
                            <button disabled={!showBalance} onClick={() => maxAmount(100)}>max</button>
                        </div>
                        <div className='modalselect'>
                            <input type={isSeePass ? "text" : "password"} name="" id="" className='token_inp p-4 w-75 mb-3'
                                autocomplete="new-password"
                                placeholder='password'
                                onChange={(e) => setPass(e.target.value)}
                            />
                            {/* <ModalB className="modala" /> */}
                            <Button className='select_token' variant="primary"
                                onClick={() => setIsSeePass(!isSeePass)}
                            >
                                {isSeePass ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </Button>
                        </div>
                        <div className='col-10 text-end ms-4 mb-2 text-primary' style={{ marginTop: "-10px", cursor: "pointer" }}
                            onClick={handleShowRModal}
                        >
                            Forgot Password
                        </div>

                        <Button className='w-75 protect mb-5 pb-3' variant="primary"
                            // !isConnected && !getChainDetails(chain?.id) && 
                            disabled={!isConnected || selectedToken.address == null || !getChainDetails(chain?.id)}
                            onClick={claimUTokens}
                        >
                            {isLoading ? <BeatLoader color="#fff" /> : "Claim"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WithdrawToken
