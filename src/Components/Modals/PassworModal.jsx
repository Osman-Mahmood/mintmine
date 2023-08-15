import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import BeatLoader from "react-spinners/BeatLoader";
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
        console.log("tx", tx);
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

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Master Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h3>Set Password</h3> */}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {/* <Form.Label>Phrase</Form.Label> */}
              <div className="d-flex">
                <Form.Control
                  className="w-75"
                  value={phrase}
                  readOnly
                  disabled
                  type="password"
                />
                <button
                  className="w-25 btn btn-light border rounded ms-1"
                  onClick={(e) => {
                    copyPhrase(e);
                  }}
                >
                  <FiCopy />
                </button>
              </div>

              <Form.Text className=" text-dark fw-bold list">
                <ul>
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
                    Your uTokens can only be moved after inputting your
                    password. If you forget your password and do not have the
                    Master Key, you won’t be able to interact with this smart
                    contract.
                  </li>
                </ul>
              </Form.Text>
              <div className="d-flex">
                <input type="checkbox" onChange={(e) => { setIsEnable(e.target.checked); }} />
                <label htmlFor="" className="ms-3 mt-3">
                  I understand that u369.eth cannot recover this password for me.
                </label>
              </div>



              {/* <LearnMore /> */}



            </Form.Group>
            {isEnable && <>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Set Password</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    className="w-75"
                    type={isSeePass ? "text" : "password"}
                    placeholder=""
                    onChange={(e) => {
                      setPass({ ...pass, password: e.target.value });
                    }}
                  />
                  <button
                    className="w-25 btn btn-light border rounded ms-1"
                    onClick={(e) => seePass(e)}
                  >
                    {isSeePass ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type={isSeeCPass ? "text" : "password"}
                    placeholder=""
                    className="w-75"
                    onChange={(e) => {
                      setPass({ ...pass, confirmPassword: e.target.value });
                    }}
                  />

                  <button
                    className="w-25 btn btn-light border rounded ms-1"
                    onClick={(e) => seeCPass(e)}
                  >
                    {isSeeCPass ? <AiFillEyeInvisible /> : <AiFillEye />}
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
          <Button variant="primary" onClick={savePssword}>
            {isLoading ? <BeatLoader color="#fff" /> : "Save Password"}
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>}
      </Modal>
    </>
  );
}
