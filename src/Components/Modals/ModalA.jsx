import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosArrowDown } from 'react-icons/io'
import { AiOutlineSearch } from "react-icons/ai"
import All from '../../assets/All.svg'
import { useAccount, useNetwork } from 'wagmi'

import { factoryInstance, getChainDetails, remortFactoryInstnce, walletBalance } from '../../config';
import ShowToken from '../Tokens/childComponents/ShowToken';
import { Form, InputGroup } from 'react-bootstrap';
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
            console.log("filterToken", u_tokens);
            setTokensList(u_tokens);
        } catch (error) {
            console.error("error while get u tokens", error);
        }
    };
    const searchToken = async (searchElement) => {
        try {
            const contract = await remortFactoryInstnce(chain?.id);
            if (searchElement.length > 0) {
                const fetchingTokens = tokensList.map(async (token) => {
                    const symbol = await contract.get_CurrencyOfuToken(token);
                    return { token, symbol };
                });
                const fetchedTokens = await Promise.all(fetchingTokens);
                const result = fetchedTokens.filter(item => item.token.includes(searchElement) || item.symbol.includes(searchElement.toUpperCase()));
                setTokensList(result)
            } else {
                const u_tokens = await contract.all_uTokensOfAllowedTokens();
                setTokensList(u_tokens);
            }
           
        } catch (error) {
            console.error("Error searching tokens:", error);
        }
    };

    useEffect(() => {
        getUTokens()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chain?.id])
    let [walletBal, setWalletBal] = useState("...")
    const [ethAddress, setEthAddress] = useState("...");
    const getBal = async () => {
        try {
            let contract = await factoryInstance(chain.id)
            let u_eth_address = await contract.deployedAddressOfEth();
            setEthAddress(u_eth_address);
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
            <button className='select_token text-capitalize bg-transparent border rad' onClick={handleShow}>
                {selectedToken.name} <IoIosArrowDown />
            </button>

            <Modal show={show} onHide={handleClose} animation={false} className="rounded_icon pt-5" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-white">Select a token</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div >
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon2"><AiOutlineSearch /></InputGroup.Text>
                            <Form.Control
                                onChange={(e) => searchToken(e.target.value)}
                                placeholder="Token name/address"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                       {tokensList.length > 0 && <div className={
                            walletBal > 0 ? "d-flex mt-3 justify-content-between align-items-center text-white enabledDiv" : "d-flex mt-3 text-white justify-content-between align-items-center disabledDiv"}
                            onClick={() => {
                                setSelectedToken({
                                    name: chain?.nativeCurrency.symbol,
                                    address: ethAddress,
                                    type: "native",
                                    showBalance: walletBal
                                })
                                handleClose()
                            }

                            }
                        >
                            <div className='d-flex align-items-center'>
                                <img src={All} alt="" />
                                <div className='d-block ms-3'>
                                    <p className='mb-0 eth text-white'>{chain?.nativeCurrency.symbol}</p>
                                </div>
                            </div>
                            <div className='text-white'>
                                {walletBal}
                            </div>
                        </div>}
                        {
                            tokensList.map((token, index) => {
                                return <ShowToken className="text-white" setSelectedToken={setSelectedToken} key={index} token={token} handleClose={handleClose} />
                            })
                        }
                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ModalA;