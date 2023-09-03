import React from 'react'
// import intro from '../../assets/intro.jpg'

import { AiOutlineCheck } from 'react-icons/ai'
// import '../style.css'

import Accordion from "react-bootstrap/Accordion";
const Address = () => {


  return (
    <div className='container-fluid p-5  text-white pb-3  mt-lg-0 mt-0 mb-lg-5 mb-0 pb-0 pb-lg-5 pb-0 '>
      {/* <img className='w-100 img-fluid intro_img' src={intro} alt="" /> */}
      {/* <h1 className='text-white intro_text'>Distributed systems <br />
        & <br />
        Human Coordination
      </h1> */}
      <div className='row pt-lg-0 pt-0'>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={0}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (1)
                  Constantly, the u369.eth smart contract >>
                </Accordion.Header>
                <Accordion.Body>(i) protects your digital assets from being stolen <br /> (ii) reward its users and <br /> (iii) fund public goods
                  <p className='text-center'>✨</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={1}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (2)
                  When you connect your wallet for the first time >>
                </Accordion.Header>
                <Accordion.Body>
                  you are provided with a one-time, randomly-generated, and encrypted 32-charachters-string (i.e., a Master Key). <br />

                  As a security precaution, the Master key is only presented in a non-readable format. <br />
                  Copy your Master Key and save it someplace safe.

                  <p className='text-center'>✨</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={2}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (3)
                  Once you have saved your Master Key someplace safe >>
                </Accordion.Header>
                <Accordion.Body> you can proceed to protect your digital assets: (A) create a password, (B) confirm the password and (C) supply any amount of ETH, or any amount of ERC20 from this list:

                  When users hover the mouse over “this list” we will show like this (if we can it can be 6,  5,  4 or 3 tokens per line/row, whatever works on your end to make it look good on PC and on mobile)

                  (logo)ETH  (logo) wstETH  (logo)rETH  (logo)cbETH  (logo)WBTC  (logo) AAVE

                  (logo)UNI  (logo)MAKER  (logo)LINK  (logo)LDO  (logo)SNX  (logo)BAL

                  (logo)DAI  (logo)USDC  (logo)USDT  (logo)LUSD  (logo)GHO  (logo)CRV

                  <p className='text-center'>✨</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={3}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (4)
                  Upon depositing your native digital asset into the smart contract >>
                </Accordion.Header>
                <Accordion.Body> a benefaction-fee of 0.369% of the deposited amount will be automatically collected by u369.eth smart contract. The remaining amount stays hard-locked and controlled by you. <br />

                  At the moment of hard-locking your native asset, the smart contract automatically issues/mints a 1:1 wrapped version of the hard-locked token. <br />
                  Exegesis: If you hard-lock 1.369 ETH: The smart contract collects the 0.369% ETH as benefaction-fee and issues to your wallet 1 uETH (it can be read as is "1 uETH" or as "1 unstealable ETH")

                  <p className='text-center'>✨</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
      </div>
      <div className='row mt-3'>

        <div className='col-lg-3 col-sm-12'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={4}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (5)
                  The 0.369% collected by the smart contract is >>
                </Accordion.Header>
                <Accordion.Body>  used to fund public goods, to reward participants and to sustain u369.eth.
                  <p className='text-center'>✨</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-3 col-sm-12'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={5}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (6)
                  When wrapping ETH or ERC20, the smart contract >>
                </Accordion.Header>
                <Accordion.Body>
                  collects the 0.369% benefaction-fee from the supplied/hard-locked native token(s).
                  <p className='text-center'>✨</p></Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={6}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (7)
                  The benefaction-fee is distributed as follows >>
                </Accordion.Header>
                <Accordion.Body>
                  <br /><AiOutlineCheck style={{ color: "green" }} /> 30% to fund public goods <br />
                  Automatically: 10% sent to the protocolguild.eth -see Txs here-.<br />
                  Manually: 10% sent to Giveth. See Txs here. <br />
                  Manually: 10% sent to orgs promoting/distilling moral & civic values). See Txs here. <br />
                  <AiOutlineCheck style={{ color: "green" }} /> 30% to programmatically and automatically reward its user-base. See Tx here. <br />
                  <AiOutlineCheck style={{ color: "green" }} /> 10% for developers & educators. See Txs here.  <br />
                  <AiOutlineCheck style={{ color: "green" }} /> 30% to sustain u369.eth the public good itself. See Txs here.
                  <p className='text-center'>✨</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={7}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (8)
                  After wrapping the native tokens into uTokens >>
                </Accordion.Header>
                <Accordion.Body>
                  for example getting uETH if ETH is hard-locked or getting  uwstETH if wstETH is hard-locked, it becomes extremely difficult for any bad actor to steal the uTokens. <br />
                  To move/transfer your uTokens, the bad actor would also need to have your password or your unique authentication code (Master Key); without the password or the Master Key, it is impossible to move your uTokens<strong>, even if the bad actor has gained access to your wallet's private keys!!</strong>

                  <p className='text-center'>✨</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
      </div>

      <div className='row mt-3  pb-lg-5 pb-0'>


        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={8}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (9)
                  Only the rightful owners of uTokens can >>
                </Accordion.Header>
                <Accordion.Body>
                  transfer their uTokens to any 0x address. To transfer uTokens: (A) the owner comes to the u369.eth smart-contract interface, (B) clicks on "Transfer", (C) inputs the amount to transfer, (E) inputs their password, and(D) signs the Tx to send the uTokens. Done!
                  <p className='text-center'>✨</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={9}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (10)
                
 Any new owner/recipient of the uTokens can >>

                </Accordion.Header>
                <Accordion.Body>
                  also transfer their uTokens. A new owner/recipient of uTokens coming for the first time to the u369.eth smart contract interface, without anyone’s permission, can initiate the flow to receive their Master Key and set password (as previously explained in step 2). Once the password is set, they can transfer their uTokens.
                  <p className='text-center'>✨</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={10}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (11)
                  Only the minter or the new recipient of uTokens can >>
                </Accordion.Header>
                <Accordion.Body>
                  claim the protected native tokens. To redeem the hard-locked native tokens, the rightful owner in possession of the uTokens can: (A) Click on the “Claim” button, (B) input the amount of native tokens they want to unlock/claim, (C) input the password and sign the Tx, (D) the smart contract burns the respective amount of uTokens and automatically releases the native tokens to the correspondent owner of the 0x claiming address.
                  <p className='text-center'>✨</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={11}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (12)
                  Final remarks and important notes<br/> >>
                </Accordion.Header>
                <Accordion.Body>
                Important Note: The Master Key provided in the beginning is the unique authentication code to reset/change the password you created. PLEASE DO NOT LOSE YOUR MASTER KEY, otherwise, if you ever lose the password you created >> your funds will be stuck forever in the smart contract as no one can recover that password nor the Master Key for you.

Not mandatory, but a recommended security best practice:

• (1) Same as you’re supposed to do with your Private Keys when you keep high amount of value in cryptographic assets >> store your Master Key offline; (2) if possible use a password manager to store the password created to interact with u369.eth

• Once you have copied your Master Key: (A) turn off your internet connection, (B) temporarily, paste your Master Key on a note in your device, (C) momentarily, write the Master Key in a piece of paper (i.e., offline) –without any misspelling and save it someplace safe, (D) double check that all is a match, (E) once confirmed that all matches 100%, and is written offline >> delete the Master Key from the note on your device, turn on your internet connection again and go back to u369.eth to continue to set your password.

• You can always test that your Master Key works as intended even before depositing any funds into the smart contract. (1) Just click the protect or transfer button and set password by signing an on-chain Tx; (2) click on forgot password and when the segment to input your Master Key shows up >> input your Master Key >> if the "change password" flow shows up, that means your Master key is working as intended. You can then feel free and 100% confident to interact with the u369.eth smart contract without the possibility of getting hacked by a malicious actor and without the distress of having the funds locked indefinitely inside the smart contract.

• To store your Master key (and your private keys as well) >> better than a piece of paper is a solid, stainless, acid-resistant, shockproof, and fireproof metal.
                  <p className='text-center'>✨</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
      </div>



    </div>

  )
}

export default Address