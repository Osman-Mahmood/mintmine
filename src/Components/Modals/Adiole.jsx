import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { motion } from 'framer-motion';
import {HiOutlineInformationCircle} from 'react-icons/hi'

const modalVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 }
  };

export default function Adiole() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  
  return (
    <>
    <Button variant="primary" className='font_size bg-transparent text-clr p-0'
              
              onClick={handleShow}>
                <HiOutlineInformationCircle className="fs-5"/>
                {/* <p className="mb-0 text-primary p-0">"i"</p> */}
            </Button>
      <Modal show={show} onHide={handleClose} centered style={{ zIndex: 1000 }}>
      <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
            <div className="border border-primary" style={{borderRadius:'15px'}}>
            <Modal.Header className="p-3 px-3 pe-3" closeButton style={{backgroundColor:'transaprent',color:'white'}}>
          {/* <Modal.Title>Master Key</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          {/* <h3>Set Password</h3> */}
          <p className='footer_font text-center'>Supreme ownership and control of your digital property.</p>
        </Modal.Body>
            </div>

        
     
       </motion.div>
      </Modal>
    </>
  );
}
