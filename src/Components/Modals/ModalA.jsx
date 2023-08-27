import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosArrowDown } from 'react-icons/io'
import { AiOutlineSearch } from "react-icons/ai"
import All from '../../assets/All.svg'
import { useAccount, useNetwork } from 'wagmi'

import { getChainDetails, remortFactoryInstnce, walletBalance } from '../../config';
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
            console.log("filterToken", searchElement.toUpperCase());

            const contract = await remortFactoryInstnce(chain?.id);

            const fetchingTokens = tokensList.map(async (token) => {
                const symbol = await contract.get_CurrencyOfuToken(token);
                return { token, symbol };
            });

            const fetchedTokens = await Promise.all(fetchingTokens);

            const result = fetchedTokens.filter(item => item.token.includes(searchElement) || item.symbol.includes(searchElement.toUpperCase()));
            setTokensList(result)
            console.log("filterToken", result);
        } catch (error) {
            console.error("Error searching tokens:", error);
        }
    };

    // const searchToekn = (searchElement) => {
    //     console.log("filterToken", searchElement.toUpperCase());
    //     let filterToken = tokensList.filter(async (token) => {
    //         const contract = await remortFactoryInstnce(chain?.id);
    //         const symbol = await contract.get_CurrencyOfuToken(token);
    //         console.log("filterToken", symbol);
    //         return token.includes(searchElement) || symbol.includes(searchElement.toUpperCase())
    //     })
    //     console.log("filterToken", filterToken);
    // }
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
            <button className='select_token text-capitalize bg-primary ' onClick={handleShow}>
                {selectedToken.name} <IoIosArrowDown />
            </button>

            <Modal show={show} onHide={handleClose} animation={false} className="rounded_icon">
                <Modal.Header closeButton>
                    <Modal.Title>Select a token</Modal.Title>

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
                        <div className={
                            walletBal > 0 ? "d-flex mt-3 justify-content-between align-items-center enabledDiv" : "d-flex mt-3 justify-content-between align-items-center disabledDiv"}
                            onClick={() => {
                                setSelectedToken({
                                    name: chain?.nativeCurrency.symbol,
                                    address: "native",
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