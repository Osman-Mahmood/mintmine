import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import BeatLoader from "react-spinners/BeatLoader";
import { motion } from 'framer-motion';
import {
  useChainId,
  useNetwork,
} from "wagmi";
import { Contract, ethers } from "ethers";
import { IoWarningOutline } from "react-icons/io5";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";


// import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
// import LearnMore from "./LearnMoreModal";
import { factoryInstance, getChainDetails } from "../../config";
export default function PasswordModal({ show, handleClose, handleShow }) {
  // const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const chainId = useChainId();
  const { chain } = useNetwork()
  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < 64; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  };
  const [phrase, setPhrase] = useState(generateRandomString());
  let [isEnable, setIsEnable] = useState(false);
  const [isSeePass, setIsSeePass] = useState(false);
  const [isSeeCPass, setIsSeeCPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const seePass = (e) => {
    e.preventDefault();
    setIsSeePass(!isSeePass);
  };
  const seeCPass = (e) => {
    e.preventDefault();
    setIsSeeCPass(!isSeeCPass);
  };
  const copyPhrase = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(phrase);
    toast.success("copied");
  };
  const [pass, setPass] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [message, setIsMessage] = useState("");
  const savePssword = async () => {
    try {
      if (getChainDetails(chain?.id)) {
        let { password, confirmPassword } = pass;
        if (
          password === null ||
          password === undefined ||
          password === "" ||
          confirmPassword === null ||
          confirmPassword === undefined ||
          confirmPassword === ""
        ) {
          setIsMessage("Password is mendatory");
          setIsShowMessage(true);
          return;
        }
        if (password !== confirmPassword) {
          setIsMessage("Password doesn't match");
          setIsShowMessage(true);
          return;
        }
        setIsMessage("");
        let contract = await factoryInstance(chain.id)
        setIsLoading(true)
        const tx = await contract.setPasswordAndRecoveryNumber(
          password,
          phrase
        );
        let receipt = await tx.wait();
        handleClose();
        handleShow();
        setIsLoading(false)
        return;
      }
    } catch (error) {
      setIsLoading(false)
      console.error("error while save password", error);
    }
  };
  const modalVariants = {
    hidden: { opacity: 0, y: '-50%' },
    visible: { opacity: 1, y: '0' },
    exit: { opacity: 0, y: '50%' }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered style={{ zIndex: 1000 }}>
      <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >

        <Modal.Header className="p-0 px-3 pe-3" closeButton style={{backgroundColor:'transaprent',color:'white'}}>
          <Modal.Title>Master Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h3>Set Password</h3> */}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {/* <Form.Label>Phrase</Form.Label> */}
              <div className="d-flex gap-3">
                <Form.Control
                  className="w-75 text-dark"
                  value={phrase}
                  readOnly
                  disabled
                  type="password"
                  style={{height:'40px'}}
                />
                <button
                style={{borderRadius:"15px",height:'40px'}}
                  className="w-25  ms-1 btn btn-primary bg-transparent border border-primary"
                  
                  onClick={(e) => {
                    copyPhrase(e);
                  }}
                >
                  <FiCopy className="" style={{marginTop:'-10px'}}/>
                </button>
              </div>

              <Form.Text className="lighttext fw-bold list mb-0">
                <ul className=" mt-2 mb-0">
                  <li>
                    The above is your encrypted and randomly-generated Master
                    key. It's only presented once.
                  </li>
                  <li>
                    Before setting your password below, copy and save the Master Key
                    in a safe place. Only with the Master Key you can reset or
                    change your password.{" "}
                  </li>
                  <li>
                  Your unhackable tokens (uTokens) can only be moved after inputting your
                    password. If you forget your password and do not have the
                    Master Key, you won’t be able to interact with this smart
                    contract.
                  </li>
                </ul>
              </Form.Text>
              <div className="d-flex mt-0">
                <input type="checkbox" onChange={(e) => { setIsEnable(e.target.checked); }} />
                <label htmlFor="" className="ms-3">
                  I understand that u369 cannot recover this password for me.
                </label>
              </div>
            </Form.Group>
            {isEnable && <>
              <Form.Group className="mb-1" controlId="formBasicPassword">
                <Form.Label>Set Password</Form.Label>
                <div className="d-flex gap-3">
                  <Form.Control
                    className="w-75 text-dark"
                    type={isSeePass ? "text" : "password"}
                    placeholder=""
                    style={{height:'40px'}}
                    onChange={(e) => {
                      setPass({ ...pass, password: e.target.value });
                    }}
                  />
                  <button
                  style={{borderRadius:"15px",height:'40px'}}
                    className="w-25 btn btn-primary bg-transparent border border-primary  ms-1"
                    onClick={(e) => seePass(e)}
                  >
                    {isSeePass ? <AiFillEyeInvisible style={{marginTop:'-10px'}}/> : <AiFillEye style={{marginTop:'-10px'}}/>}
                  </button>
                </div>
              </Form.Group>

              <Form.Group className="mb-1" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <div className="d-flex gap-3">
                  <Form.Control
                    type={isSeeCPass ? "text" : "password"}
                    placeholder=""
                    style={{height:'40px'}}
                    className="w-75 p-0 text-dark"
                    onChange={(e) => {
                      setPass({ ...pass, confirmPassword: e.target.value });
                    }}
                  />

                  <button
                  style={{borderRadius:"15px",height:'40px'}}
                    className="w-25 btn btn-primary bg-transparent border border-primary  ms-1"
                    onClick={(e) => seeCPass(e)}
                  >
                    {isSeeCPass ? <AiFillEyeInvisible style={{marginTop:'-10px'}}/> : <AiFillEye style={{marginTop:'-10px'}}/>}
                  </button>
                </div>
                {isShowMessage && (
                  <Form.Text className="text-danger">{message}</Form.Text>
                )}
              </Form.Group>
            </>
            }
          </Form>
        </Modal.Body>
        {isEnable && <Modal.Footer>
          <button className="btn btn-primary bg-transparent border border-primary" style={{borderRadius:"15px"}} onClick={savePssword}>
            {isLoading ? <BeatLoader color="#fff" /> : "Protect"}
          </button>
          {/* <button className="btn btn-primary bg-primary" style={{borderRadius:"15px"}} onClick={handleClose}>
            Close
          </button> */}
        </Modal.Footer>}
       </motion.div>
      </Modal>
    </>
  );
}
