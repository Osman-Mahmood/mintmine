import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosArrowDown } from 'react-icons/io'
function TransactionModal({ showTrx, setShowTrx, trxHash }) {

  const handleClose = () => setShowTrx(false);

  return (
    <>

      <Modal show={showTrx} onHide={handleClose} animation={false} size="md" centered
        backdrop="static"

      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-block'>
          "✅ Success! <a style={{ color: "blue", fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }} href={trxHash} target='blank'> View on block explorer"</a>
          </div>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default TransactionModal;