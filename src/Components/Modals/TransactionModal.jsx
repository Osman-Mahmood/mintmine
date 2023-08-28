import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {IoIosArrowDown} from 'react-icons/io'
function TransactionModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='w-75 protect mb-5 pb-3' variant="primary" onClick={handleShow}>
      Protect
      </Button>

      <Modal show={show} onHide={handleClose} animation={false} size="md">
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='d-block'>
            <input type="text" className='password p-3 w-100 text-dark' placeholder='Enter your password'/>
                  <button className='protect w-100 mt-3 mb-3'>Submit</button>
            </div>
                 
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default TransactionModal;