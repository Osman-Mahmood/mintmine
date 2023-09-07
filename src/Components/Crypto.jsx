import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'

import Accordion from "react-bootstrap/Accordion";
const Crypto = () => {

  return (
    <div className='container pt-lg-0 pt-2 mt-lg-0 mt-0 pb-5 pb-lg-5 pt-lg-0 pt-0 pb-0 pb-lg-5 eth_intro'>
      <div className='row pb-5 pb-lg-5 pt-lg-5 pt-0 mt-lg-5 mt-0 mb-lg-5 mb-0'>
        <div className='col-lg-6 mb-5'>
   
          <Accordion className="border-0">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={0}
                className=""
              >
                <Accordion.Header className="" >
                         u369.eth is a public goods funding tool >>
                </Accordion.Header>
                <Accordion.Body className="border-none" style={{borderLeft: "none"}}>
                 born with purpose and determination to enhance the safety of the cryptographic digital assets, by implementing a non-upgradeable smart contract to provide you with an extra layer of protection.
  
                  u369.eth smart contract is immutable. The <b>append-only exception</b> is exclusively to add new tokens. Once a token is added, it can’t be deleted. Tokens and uTokens can be switched back and forth, at will and without permission.
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-6 mt-3 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={0}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                          A self-sustained and self-organizing distributed system >>
                </Accordion.Header>
                <Accordion.Body className="border-none" style={{borderLeft: "none"}}>
                  An open-source smart contract.<br />
                  A non-custodial protocol that aims to make the cryptographic digital assets hacker-proof.<br />
                  The U in uTokens stands for “unstealable”, “unhackable”.<br />
                  <br />
                  <b>Giving away the smart contract’s fees as follows:</b> <br />
                  <AiOutlineCheck className='me-1' style={{ color: "green" }} /><b>30% to fund public goods (10% to the protocolguild.eth; 10% to giveth; 10% to orgs promoting and 10% to Valley Dao/distilling moral & civic values)</b>  <br />
                  <AiOutlineCheck className='me-1' style={{ color: "green" }} /><b>30% to reward its user-base</b><br />
                  <AiOutlineCheck className='me-1' style={{ color: "green" }} /><b>10% for developers & communtiy</b><br />
                  <AiOutlineCheck className='me-1' style={{ color: "green" }} /><b>30% to sustain u369 itself</b></Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>


      </div>

    </div>
  )
}

export default Crypto