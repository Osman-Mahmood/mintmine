import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosArrowDown } from 'react-icons/io'
import { AiFillCheckCircle } from 'react-icons/ai'
import { AiOutlineArrowDown } from 'react-icons/ai'
import TokenSymbol from '../Dashboard/childComponents/TokenSymbol';
import {BsArrowUpRight} from 'react-icons/bs'
import { useNetwork } from 'wagmi';
import AddtoWallet from '../Dashboard/uChildComponents/AddtoWallet'
import UTokenSymbol from '../Dashboard/uChildComponents/UTokenSymbol';
function TransactionModal({ showTrx, setShowTrx, trxHash: { link, amount, address, trxType, mintType } }) {
  const handleClose = () => setShowTrx(false);
  const { chain } = useNetwork();
  return (
    <>

      <Modal show={showTrx} onHide={handleClose} animation={false} size="md" centered
        backdrop="static" className="custom-modal"

      >
        <Modal.Header closeButton style={{zIndex:"11111",position:'relative'}}>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body centered align="center" className='' style={{marginTop:"-50px"}}>
          <div className='d-block'>
            <AiFillCheckCircle className='text-success fs-1 mb-3 mt-n4' />
            <h4 className=''>Success</h4>
            <div className='d-block justify-content-center text-center align-items-center gap-2 mt-4 mb-3'>
              {
                trxType === "claim" && <>

                  <p className='fw-bold mb-0 me-0'>{Number(amount).toFixed(4)} {mintType === "token" ? <TokenSymbol tokenAddress={address} /> : `${chain?.nativeCurrency.symbol}`}  Claimed</p>
                </>
              }
              {
                trxType === "transfer" && <>
                  <p className='fw-bold mb-0 me-0'>{Number(amount).toFixed(4)} {mintType === "token" ? <TokenSymbol tokenAddress={address} /> : `${chain?.nativeCurrency.symbol}`} Transfered</p>
                </>
              }
              {
                trxType === "mint" && <>
                  <p className='fw-bold mb-0 me-0 m-0'>{Number(amount).toFixed(4)} {mintType === "token" ? <TokenSymbol tokenAddress={address} className="me-0"/> : `${chain?.nativeCurrency.symbol}`} (-0.369% benefaction fee)</p>
                  <AiOutlineArrowDown className="mt-1"/>
                  <p className='fw-bold mb-0'>Protected {Number(amount - (amount * 0.369) / 100).toFixed(4)} {mintType === "token" ? <TokenSymbol tokenAddress={address} /> : `${chain?.nativeCurrency.symbol}`}</p>
                </>
              }

          
            </div>
          </div>

          <div className='mt-3'>
            {/* <img src="" alt="udai logo" /> */}
            {
              trxType === "claim" && <>
                <p className='fw-bold mb-2'> You received {Number(amount).toFixed(4)} {mintType === "token" ? <TokenSymbol tokenAddress={address} /> : `${chain?.nativeCurrency.symbol}`} </p>
              </>
            }
            {
              trxType === "transfer" && <>
                <p className='fw-bold mb-2'>You transfered {Number(amount).toFixed(4)} {mintType === "token" ? <TokenSymbol tokenAddress={address} /> : `${chain?.nativeCurrency.symbol}`} </p>
              </>
            }
            {
              trxType === "mint" && <>
                <p className='fw-bold mb-2'>{Number(amount - (amount * 0.369) / 100).toFixed(4)} {mintType === "token" ? <UTokenSymbol tokenAddress={address} /> : `u${chain?.nativeCurrency.symbol}`} minted </p>
              </>
            }
              {/* <AddtoWallet tokenAddress={address}/> */}
         
            <br />
            <a style={{ color: "white", fontWeight: "bold", textDecoration: "none", cursor: "pointer" }} href={link} target='blank' className="mt-3 d-flex justify-content-center align-items-center">Review tx details {""} <BsArrowUpRight className="ms-1"/></a>
          </div>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default TransactionModal;