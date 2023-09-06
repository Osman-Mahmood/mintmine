import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosArrowDown } from 'react-icons/io'
import {AiFillCheckCircle} from 'react-icons/ai'
import {AiOutlineArrowRight} from 'react-icons/ai'
function TransactionModal({ showTrx, setShowTrx, trxHash }) {

  const handleClose = () => setShowTrx(false);

  return (
    <>

      <Modal show={showTrx} onHide={handleClose} animation={false} size="md" centered
        backdrop="static" className="custom-modal"

      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body centered align="center">
          <div className='d-block'>
            <AiFillCheckCircle className='text-success fs-1 mb-3'/>
      <h4>Success</h4>    
      <div className='d-flex justify-content-center text-center align-items-center gap-2 mt-4 mb-3'>
      <p className='fw-bold mb-0'>10.0 DAI</p>
  <AiOutlineArrowRight />
      <p className='fw-bold mb-0'>0.00053 ETH</p>
      </div>
          </div>
         
          <div className='mt-5'>
          <a style={{ color: "blue", fontWeight: "bold", textDecoration: "none", cursor: "pointer" }} href={trxHash} target='blank'> View on block explorer</a>
          </div>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default TransactionModal;