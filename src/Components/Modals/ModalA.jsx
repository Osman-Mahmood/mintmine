import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosArrowDown } from 'react-icons/io'
import All from '../../assets/All.svg'
import { useAccount, useNetwork } from 'wagmi'

import { getChainDetails, remortFactoryInstnce, walletBalance } from '../../config';
import ShowToken from '../Tokens/childComponents/ShowToken';
function ModalA({ setSelectedToken, selectedToken }) {
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
    let [walletBal, setWalletBal] = useState("...")
    
    const getBal = async () => {
        try {
            let ethBal = await walletBalance(address);
            setWalletBal(ethBal)
        } catch (error) {
            console.error("error while get bal", error);
        }
    }
    useEffect(() => {
        if (window.ethereum && isConnected && getChainDetails(chain?.id))
            getBal()
    }, [])
    return (
        <>
            <Button className='select_token text-capitalize' variant="primary" onClick={handleShow}>
                {selectedToken.name} <IoIosArrowDown />
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a token</Modal.Title>

                </Modal.Header>

                <Modal.Body>
                    <div >
                        <div className={
                            walletBal > 0 ? "d-flex mt-3 justify-content-between align-items-center enabledDiv" : "d-flex mt-3 justify-content-between align-items-center disabledDiv"}
                         onClick={()=>{setSelectedToken({
                                name:chain?.nativeCurrency.symbol,
                                address:"native",
                                type:"native",
                                showBalance:walletBal
                            })
                            handleClose()
                        }
                            
                        }
                        >
                            <div className='d-flex align-items-center'>
                                <img src={All} alt="" />
                                <div className='d-block ms-3'>
                                    <p className='mb-0 eth'>{chain?.nativeCurrency.symbol}</p>
                                </div>
                            </div>
                            <div className=''>
                                {walletBal}
                            </div>
                        </div>
                        {
                            tokensList.map((token, index) => {
                                return <ShowToken setSelectedToken={setSelectedToken} key={index} token={token} handleClose={handleClose} />
                            })
                        }
                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ModalA;