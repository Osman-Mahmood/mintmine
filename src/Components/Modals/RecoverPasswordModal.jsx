import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import BeatLoader from "react-spinners/BeatLoader";

import toast from 'react-hot-toast';
import { useAccount,  useNetwork } from 'wagmi';

import { factoryInstance, getChainDetails } from '../../config';
export default function RecoverPasswordModal({ show, handleClose }) {
    const { address, isConnected } = useAccount();
    const { chain } = useNetwork()
    const [phrase, setPhrase] = useState("")
    const [isEnable, setIsEnable] = useState(false)
   
    const [pass, setPass] = useState({
        password: "",
        confirmPassword: ""
    })
    const [isShowMessage, setIsShowMessage] = useState(false)
    const [message, setIsMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const checkPhrase = async (value) => {
        try {
            if (getChainDetails(chain?.id)) {
                let contract = await factoryInstance(chain?.id)
                let isTrue = await contract.isRecoveryNumberCorrect(address, value)

                if (!isTrue) {
                    setIsMessage("Enter correct phrase")
                    setIsShowMessage(true)
                } else {
                    setPhrase(value)
                    setIsMessage("")
                    setIsShowMessage(false)
                    setIsEnable(true)
                }
            }
        } catch (error) {
            console.error("error while check phrase", error);
        }
    }
    const savePssword = async () => {
        try {
            let { password, confirmPassword } = pass;
            if (password === null || password === undefined || password === ""
                || confirmPassword === null || confirmPassword === undefined || confirmPassword === ""
            ) {
                setIsMessage("Password is mendatory")
                setIsShowMessage(true)
                return
            }
            if (password !== confirmPassword) {
                setIsMessage("Password does't match")
                setIsShowMessage(true)
                return
            }
            setIsMessage("")
            setIsShowMessage(false)
            let contract = await factoryInstance(chain?.id)
           
            setIsLoading(true)
            let tx = await contract.changePassword(phrase, password);
            await tx.wait()
            handleClose()
            setIsLoading(false)
            return
        } catch (error) {
            setIsLoading(false)
            console.error("error while save password", error);
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"

                //  style={{backgroundColor:"#000", opacity:"0.9"}}
                className='recover_modal'
            >
                <Modal.Header closeButton

                >
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    {/* <h3>Recover Password</h3> */}
                    <Form>
                        {!isEnable && <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Master Key</Form.Label>


                            <Form.Control type="password"
                                className='w-100'

                                disabled={!isConnected}
                                onChange={(e) => checkPhrase(e.target.value)}
                            />
                            {
                                isShowMessage && <Form.Text className='text-danger'>
                                    {message}
                                </Form.Text>
                            }


                        </Form.Group>}

                        {isEnable && <><Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password"
                                onChange={(e) => {
                                    setPass({ ...pass, password: e.target.value })
                                }}
                            />
                        </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password"
                                    onChange={(e) => {
                                        setPass({ ...pass, confirmPassword: e.target.value })
                                    }}
                                />
                                {
                                    isShowMessage && <Form.Text className='text-danger'>
                                        {message}
                                    </Form.Text>
                                }
                            </Form.Group> </>}
                    </Form>
                </Modal.Body>
                {isEnable && <Modal.Footer>
                    <Button variant="primary" onClick={savePssword}>
                        {isLoading ? <BeatLoader color="#fff" /> : "Update Password"}

                    </Button>
                    {/* <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button> */}
                </Modal.Footer>}
            </Modal>
        </>
    );
}

