import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosArrowDown } from 'react-icons/io'
import All from '../../assets/All.svg'
import { useAccount, useNetwork } from 'wagmi'

import { erc20Instance, factoryInstance, getChainDetails, remortFactoryInstnce, walletBalance } from '../../config';
import ShowToken from '../Tokens/childComponents/ShowToken';
import { ethers } from 'ethers';
import ShowUToken from '../Tokens/childComponents/ShowUToken';
function ModalB({ setSelectedToken, selectedToken }) {
    const { address, isConnected } = useAccount();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { chain } = useNetwork()

    const [tokensList, setTokensList] = useState([]);
    const getUTokens = async () => {
        try {
            let contract = await remortFactoryInstnce(chain?.id)
            const u_tokens = await contract.all_uTokensOfAllowedTokens();
            setTokensList(u_tokens);
        } catch (error) {
            console.error("error while get u tokens", error);
        }
    };
    useEffect(() => {
        getUTokens()
    }, [chain?.id])
    const [uNativeBal, setUNativeBal] = useState("...");
    const [ethAddress, setEthAddress] = useState("...");
    const nativeUBal = async () => {
        try {

            let contract = await factoryInstance(chain.id)
            let u_eth_address = await contract.deployedAddressOfEth();
            setEthAddress(u_eth_address);
            const new_instance = await erc20Instance (u_eth_address);
            const u_eth_bal = await new_instance.balanceOf(address);
            setUNativeBal(ethers.utils.formatEther(u_eth_bal));

        } catch (error) {
            console.error("error while get bal", error);
        }
    }
    useEffect(() => {
        if (window.ethereum && isConnected && getChainDetails(chain?.id))
        nativeUBal()
    }, [])
    return (
        <>
            <button className='select_token text-capitalize btn btn-primary bg-primary p-1'  variant="primary" onClick={handleShow}>
                {selectedToken.name} <IoIosArrowDown />
            </button>

            <Modal show={show} onHide={handleClose} animation={false} className='mt-5'>
                <Modal.Header closeButton>
                    <Modal.Title>Select a token</Modal.Title>

                </Modal.Header>

                <Modal.Body>
                    <div >
                        <div className={
                            uNativeBal > 0 ? "d-flex mt-3 justify-content-between align-items-center enabledDiv" : "d-flex mt-3 justify-content-between align-items-center disabledDiv"}
                         onClick={()=>{setSelectedToken({
                                name:`u${chain?.nativeCurrency.symbol}`,
                                address:ethAddress,
                                type:"native"
                            })
                            handleClose()
                        }
                            
                        }
                        >
                            <div className='d-flex align-items-center'>
                                <img src={All} alt="" />
                                <div className='d-block ms-3'>
                                    <p className='mb-0 eth'>u{chain?.nativeCurrency.symbol}</p>
                                </div>
                            </div>
                            <div className=''>
                                {uNativeBal}
                            </div>
                        </div>
                        {
                            tokensList.map((token, index) => {
                                return <ShowUToken setSelectedToken={setSelectedToken} key={index} token={token} handleClose={handleClose} />
                            })
                        }
                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ModalB;