import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosArrowDown } from 'react-icons/io'
import { AiFillCheckCircle } from 'react-icons/ai'
import { AiOutlineArrowRight } from 'react-icons/ai'
import TokenSymbol from '../Dashboard/childComponents/TokenSymbol';
import { useNetwork } from 'wagmi';
function TransactionModal({ showTrx, setShowTrx, trxHash: { link, amount, address, trxType, mintType } }) {
  const handleClose = () => setShowTrx(false);
  const { chain } = useNetwork();
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
            <AiFillCheckCircle className='text-success fs-1 mb-3' />
            <h4>Success</h4>
            <div className='d-flex justify-content-center text-center align-items-center gap-2 mt-4 mb-3'>
              {
                trxType === "claim" && <>

                  <p className='fw-bold mb-0'>{Number(amount).toFixed(4)} {mintType === "token" ? <TokenSymbol tokenAddress={address} /> : `${chain?.nativeCurrency.symbol}`}  Claimed</p>
                </>
              }
              {
                trxType === "transfer" && <>
                  <p className='fw-bold mb-0'>{amount} {mintType === "token" ? <TokenSymbol tokenAddress={address} /> : `${chain?.nativeCurrency.symbol}`} Transfered</p>
                </>
              }
              {
                trxType === "mint" && <>
                  <p className='fw-bold mb-0'>{amount}{mintType === "token" ? <TokenSymbol tokenAddress={address} /> : `${chain?.nativeCurrency.symbol}`} (- 0.369% fee)</p>
                  <AiOutlineArrowRight />
                  <p className='fw-bold mb-0'>{(amount - (amount * 0.369) / 100)} u{mintType === "token" ? <TokenSymbol tokenAddress={address} /> : `${chain?.nativeCurrency.symbol}`}  minted</p>
                </>
              }

              <p></p>
              <p></p>
            </div>
          </div>

          <div className='mt-5'>
            {/* <img src="" alt="udai logo" /> */}
            {
              trxType === "claim" && <>
                <p className='fw-bold mb-0'> You received {amount} {mintType === "token" ? <TokenSymbol tokenAddress={address} /> : `${chain?.nativeCurrency.symbol}`} </p>
              </>
            }
            {
              trxType === "transfer" && <>
                <p className='fw-bold mb-0'>You transfered {amount} {mintType === "token" ? <TokenSymbol tokenAddress={address} /> : `${chain?.nativeCurrency.symbol}`} </p>
              </>
            }
            {
              trxType === "mint" && <>
                <p className='fw-bold mb-0'>You protected {(amount - (amount * 0.369) / 100)} u{mintType === "token" ? <TokenSymbol tokenAddress={address} /> : `${chain?.nativeCurrency.symbol}`} </p>
              </>
            }
            <p>Add to wallet to track your balance</p>
            <a style={{ color: "blue", fontWeight: "bold", textDecoration: "none", cursor: "pointer" }} href={link} target='blank'>Review tx details</a>
          </div>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default TransactionModal;