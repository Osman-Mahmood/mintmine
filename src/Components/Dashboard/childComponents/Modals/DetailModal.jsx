import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { motion } from 'framer-motion';
import { HiOutlineInformationCircle } from 'react-icons/hi'
import TokenSymbol from "../TokenSymbol";
import { useNetwork } from "wagmi";
import { getChainExplorer } from "../../../../config";
import {BsArrowUpRight} from 'react-icons/bs'
const modalVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 }
};

export default function DetailModal({ tokenAddress, mintType }) {
    const { chain } = useNetwork();
    let { explorer, name, contractAddress } = getChainExplorer(chain?.id);
    console.log("explorer", explorer);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Button
                variant="primary"
                className="bg-transparent border_detail  px-3 ms-3 p-1 text-white font_size"
                onClick={handleShow}
            >
                Details
            </Button>
            <Modal show={show} onHide={handleClose} centered style={{ zIndex: 1000 }}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={modalVariants}
                >
<div className="border border-primary" style={{borderRadius:'15px'}}>
<Modal.Header className="p-3 px-3 pe-3" closeButton style={{ backgroundColor: 'transaprent', color: 'white' }}>
                        {/* <Modal.Title>Master Key</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body>
                        {
                            mintType === "token" ?
                                <p className='footer_font d-flex justify-content-center'>Protecting:  <TokenSymbol tokenAddress={tokenAddress} /></p>

                                :
                                <>
                                    <p className='footer_font d-flex justify-content-center'><span className="me-2">Protecting:</span> {""} <img  src={`./tokenlist/${chain?.nativeCurrency.symbol.toLowerCase()}.png`} alt="" width={20} className="" /> {chain?.nativeCurrency.symbol}</p>
                                </>
                        }

                        <p className='footer_font d-flex justify-content-center'>Network: {name}</p>
                        <div className="d-flex align-items-center flex-column">
                            <p className='footer_font align-items-center mb-3 d-flex  justify-content-center'>Contract address:


                            </p>
                            <a
                                className='footer_font ms-3'
                                href={`${explorer}/address/${contractAddress}`}
                                target="blank"
                                // style={{
                                //     maxWidth: '180px', // Set your desired maximum width
                                //     whiteSpace: 'nowrap',
                                //     overflow: 'hidden',
                                //     textOverflow: 'ellipsis',
                                //     display: 'inline-block', // Ensure it's treated as a block-level element
                                // }}
                            >
                                {contractAddress} <BsArrowUpRight />
                            </a>
                        </div>
                    </Modal.Body>
</div>
                   

                </motion.div>
            </Modal>
        </>
    );
}
