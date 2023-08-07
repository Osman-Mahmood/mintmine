import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {IoIosArrowDown} from 'react-icons/io'
import All from '../../assets/All.svg'
function ModalB() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='select_token' variant="primary" onClick={handleShow}>
      uTokens <IoIosArrowDown />
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Select a token</Modal.Title>
          
        </Modal.Header>
      
        <Modal.Body>
        <input type="text" className='password p-2 w-100 text-dark' placeholder='Search name or paste'/>
       
       <div className='d-flex mt-3 justify-content-between'>
        <div className='d-flex align-items-center icon_style text-start'>
            <img src={All} alt="" className='icon_coin'/>
            <p className='mb-0 ms-1'>Eth</p>
        </div>
        <div className='d-flex align-items-center icon_style text-start'>
            <img src={All} alt="" className='icon_coin'/>
            <p className='mb-0 ms-1'>Eth</p>
        </div>
        <div className='d-flex align-items-center icon_style text-start'>
            <img src={All} alt="" className='icon_coin'/>
            <p className='mb-0 ms-1'>Eth</p>
        </div>
        <div className='d-flex align-items-center icon_style text-start'>
            <img src={All} alt="" className='icon_coin'/>
            <p className='mb-0 ms-1'>Eth</p>
        </div>
        
       </div>
       <div className='d-flex mt-3 justify-content-between'>
        <div className='d-flex align-items-center icon_style text-start'>
            <img src={All} alt="" className='icon_coin'/>
            <p className='mb-0 ms-1'>Eth</p>
        </div>
        <div className='d-flex align-items-center icon_style text-start'>
            <img src={All} alt="" className='icon_coin'/>
            <p className='mb-0 ms-1'>Eth</p>
        </div>
        <div className='d-flex align-items-center icon_style text-start'>
            <img src={All} alt="" className='icon_coin'/>
            <p className='mb-0 ms-1'>Eth</p>
        </div>
        <div className='d-flex align-items-center icon_style text-start'>
            <img src={All} alt="" className='icon_coin'/>
            <p className='mb-0 ms-1'>Eth</p>
        </div>
        
       </div>
       <hr className='mt-5 mb-5'/>

       <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
            <img src={All} alt="" />
            <div className='d-block ms-3'>
                <p className='mb-0 eth'>Ether</p>
                <p className='mb-0 eth_child'>Eth</p>
            </div>
        </div>
        <div className=''>
            0
        </div>
       </div>
       <div className='d-flex mt-3 justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
            <img src={All} alt="" />
            <div className='d-block ms-3'>
                <p className='mb-0 eth'>Ether</p>
                <p className='mb-0 eth_child'>Eth</p>
            </div>
        </div>
        <div className=''>
            0
        </div>
       </div>
       <div className='d-flex mt-3 justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
            <img src={All} alt="" />
            <div className='d-block ms-3'>
                <p className='mb-0 eth'>Ether</p>
                <p className='mb-0 eth_child'>Eth</p>
            </div>
        </div>
        <div className=''>
            0
        </div>
       </div>
       <div className='d-flex mt-3 justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
            <img src={All} alt="" />
            <div className='d-block ms-3'>
                <p className='mb-0 eth'>Ether</p>
                <p className='mb-0 eth_child'>Eth</p>
            </div>
        </div>
        <div className=''>
            0
        </div>
       </div>
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default ModalB;