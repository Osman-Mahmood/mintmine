import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useAccount, useNetwork } from 'wagmi';
import { factoryInstance } from '../../../../config';
import PasswordModal from '../../../Modals/PassworModal';
import Transfer from '../../../Modals/Transfer';

function TransferModal({ tokenAddress, mintType, setRefresh, refresh }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const { address, isConnected } = useAccount();
    const { chain } = useNetwork();
    const checkPassword = async () => {
        try {

            let contract = await factoryInstance(chain.id)
            let isPass = await contract.isPasswordSet(address);
            if (!isPass) {
                handleShow1();
            } else {
                handleShow();
            }
        } catch (error) {

        }
    };
    return (
        <>
            <Button variant="primary" className='font_size border bg-transparent px-3 p-1 text-clr'
                onClick={checkPassword} disabled={!isConnected}
            >
                Transfer
            </Button>
            <PasswordModal handleShow={handleShow} show={show1} handleClose={handleClose1} />
            <Transfer show={show} handleClose={handleClose} mintType={mintType} tokenAddress={tokenAddress} setRefresh={setRefresh} refresh={refresh} />
        </>
    )
}

export default TransferModal
