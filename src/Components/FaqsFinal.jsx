import React from 'react'
// import intro from '../../assets/intro.jpg'

import { AiOutlineCheck } from 'react-icons/ai'
// import '../style.css'

import Accordion from "react-bootstrap/Accordion";
const FaqsFinal = () => {


  return (
    <div className='container-fluid p-5 pt-0  text-white pb-3  mt-lg-0 mt-0 mb-lg-5 mb-0 pb-0 pb-lg-5 pb-0 '>
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
                  How do I connect to u369? 
                </Accordion.Header>
                <Accordion.Body> <p>You can connect your crypto wallet to u369 in a few simple steps. Please view the guides below for Mobile and Web browsers.
 <br />
 Mobile Browser (Under construction)
 </p>
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
                  Web Browser
                </Accordion.Header>
                <Accordion.Body>
                <p>(1) Once in u369.eth.limo.</p>
 <p>(2) Click on the connect button.</p>
 <p>(3)  Select one of the available wallets.</p>
 <p>(4) If your wallet is not listed select wallet Connect to choose from the supported wallets.</p>
 <p>(5) To connect with your selected wallet >> click on "Next" in your wallet.
</p>
<p>(6) For your wallet to interact with u369 smart contract >> click on "Connect" on your wallet.
</p>
<p>(7) Now you're connected. Some characters of your wallet address will display in the right upper corner of the u369 interface.
</p>
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
                  How do I protect my crypto assets with u369?
                </Accordion.Header>
                <Accordion.Body> <p>With a password + a Master Private Key (MPK). 
</p>
<p>Only with the password you are able to send txs using u369 protocol. 
</p>
<p>And only with the Master Private Key you can reset or change the password in case you forget or lose the password.
</p>
<p>u369 smart contract is blind to the Master Private Keys it generates; MPKs are encrypted and only the end-user generating the MPK has the visibility and direct access to the MPK.
</p>
<p>As a security precaution, the Master Private key is only presented in a non-readable format. 
</p>
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
                  This is how it works:
                </Accordion.Header>
                <Accordion.Body> <p>(A) Once connected to u369, and if connecting a wallet for the first time, to do any operation (Protect / Transfer / Claim) you will be provided with a one-time, randomly-generated and encrypted 32-charachters-string (i.e., a Master Private Key -MPK-). 
</p>
<p>(B) Save your Master Private Key (MPK) in a safe place (preferably offline).</p>
<p>(C) Once you have saved your Master Private Key, you can proceed to protect your digital assets: 
</p>
<p>(D) Check the box "I understand that u369 cannot recover this password for me".

</p>
<p>(E) Set password >> confirm password >> click on "Protect" >> and click "Confirm" in your wallet to sign the Tx.
</p>
<p>(G)  Once the Tx to set password is confirmed on-chain: Select the token and the amount you want to protect.

</p>
<p>(H) Input your password and click "Protect".</p>
<p>(I) Sign the Tx in your wallet to safeguard the native token in your wallet and receive the respective unhackable tokens (uTokens) at a 1:1 ratio.
</p>
<p>(J) Add the uToken to your wallet.
</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
      </div>
      <div className='row mt-0'>

        <div className='col-lg-3 col-sm-12'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={4}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (5)
                  Done! Now you are protecting the native token and have received unhackableTokens (uTokens) to, transact, use in DeFi and to use for claiming the safeguarded native token.
                </Accordion.Header>
                {/* <Accordion.Body>  used to fund public goods, to reward participants and to sustain u369.eth.
                  <p className='text-center'>✨</p>
                </Accordion.Body> */}
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
                  What are unhackableTokens (uTokens)?
                </Accordion.Header>
                <Accordion.Body>
                <p>uTokens are the 1:1 representation of your safeguarded native tokens.
</p>
<p>In essence, to protect your ETH or any supported token, you safeguard your native token(s) inside of u369 smart contract and u369 mints to your wallet a the correspondent unhackableToken (uToken). The uToken can only be moved/transferred by you/the rightful owner.
</p>
<p>Without the password or the Master Private Key, it is impossible to move your uTokens, even if a bad actor would have gained access to your wallet's private keys!!
</p></Accordion.Body>
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
                  What does the "u" in u369 and uTokens stands for?
                </Accordion.Header>
                <Accordion.Body>
                <p>
The "u" in u369 and in uTokens stands for “unstealable” / “unhackable”/ "uncommon".
</p>
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
                  How do I transfer uTokens?
                </Accordion.Header>
                <Accordion.Body>
                <p>To transfer uTokens: 
</p>
<p>(A) Connect to the u369 interface</p>
<p>(B) Click on "Transfer" </p>
<p>(C) Select the uToken and input the amount to transfer</p>
<p>(E) Input your password</p>
<p>(D) Sign the Tx in your wallet to send the uTokens. Done!
</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
      </div>

      <div className='row mt-0 pb-lg-0 pb-0'>


        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={8}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (9)
                  What happens if a person pays/sends me uTokens?
                </Accordion.Header>
                <Accordion.Body>
                <p>Any new recipient/owner of uTokens can transfer their uTokens by connecting to the u369 smart contract interface, without anyone’s permission, and by initiating the flow to receive their Master Private Key and set password:
</p>
<p>(1) Check the box "I understand that u369 cannot recover this password for me".</p>
<p>
(2) Set password >> confirm password >> click on"Protect" >> and click "Confirm" in your wallet to sign the Tx.
</p>
<p>(G)  Once the Tx to set password is confirmed on-chain: You are free to select the uToken and the amount you want to transfer.
</p>
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
                  Who can I claim the safeguarded native tokens?

                </Accordion.Header>
                <Accordion.Body>
                <p>Only uTokens can be burned to claim the native tokens. Only the minter or a new recipient of uTokens can claim the protected native tokens. 
</p>
<p>If you own uTokens and would need the protected native token(s) held inside u369 smart contract, here are the steps to claim the native token: 
</p>
<p>(A) Once connected to u369 >> click on the “Claim” button.
</p>
<p>(B) Input the amount of uTokens you will burn to claim the native tokens.
</p>
<p>(C) Input the password and sign the Tx in your wallet.
</p>
<p>(D) The uTokens are burned and automatically the contract releases the native tokens to your wallet.
</p>
<p>u369 does not charge a fee to withdraw/claim/release back to you a native token held inside the u369 contract, only the gas-network-fee shall be paid when using the claim function. 

</p>
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
                  How does u369 generate revenue to reward its users, fund public goods and self-sustain?
                </Accordion.Header>
                <Accordion.Body>
                <p>A benefaction-fee of 0.369% of the deposited (protected) amount is automatically collected by u369 smart contract. 
</p>
<p>Exegesis: If you protect 1.369 ETH: u369 smart contract automatically collects as a benefaction-fee 0.369% of the safeguarded amount and issues/mints to your wallet 1 uETH (it can be read as is "1 uETH" or as "1 unhackable ETH or 1 unstealable ETH").
</p>
<p>The protected native token (in our example 1 ETH) stays sfaeguarded inside the contract. Only controlled by you. And can only be claimed with the uTokens.
</p>
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
                  What is a benefaction fee?
                </Accordion.Header>
                <Accordion.Body>
                <p> It is a service-fee that is collected for the act of doing good and giving donations to contribute to public goods funding. 
</p>
<p>In total, 70% of all the service fee that charges u369 to make the safeguarded tokens unhackable, is used for the benefaction of the people: for the u369 end-users; to help advance and sustain open source projects, and for the positive social impact for the community and devs. 
</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
      </div>




      <div className='row mt-0  pb-lg-0 pb-0'>


<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={13}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (13)
          How are the u369 collected benefaction-fees distributed?
        </Accordion.Header>
        <Accordion.Body>
        <p>The 0.369% service-fee is distributed as follows:
</p>
<p>30% to reward u369 user-base. See reward's recipients here.</p>
<p>30% to fund public goods. This is:</p>
<p>Donating 10% to Protocol Guild</p>
<p>Donating 10% to Giveth</p>
<p>Donating 10% to Valley Dao
</p>
<p>See all public goods donations and tx details since u369 inception here.</p>
<p>10% to community & devs. See txs here</p>
<p>30% to sustain u369 itself</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={14}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (14)
          The funds are distributed manually, why?

        </Accordion.Header>
        <Accordion.Body>
        <p>For several reasons. In regards of the donations for public goods funding, here are some examples of considerations for sending the donations manually:
</p>
<p>
- What if the recipient loses the keys / the access to the funds sent to that wallet?
</p>
<p>- What if the wallet gets compromised / hacked?
</p>
<p>- What if the recipient stops their previous activity (perhaps being that the reason u369 was donating in the first place).
</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={15}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (15)
          On which networks is the u369 smart contract deployed?
        </Accordion.Header>
        <Accordion.Body>
        <p>
The u369 smart contract is deployed: 

</p>.
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={16}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (16)
          (i) On Ethereum
        </Accordion.Header>
        <Accordion.Body>
        <p>Ethereum is a network of computers all over the world that follow a set of rules called the Ethereum protocol. The Ethereum network acts as the foundation for communities, applications, organizations and digital assets that anyone can build and use.

</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
</div>


<div className='row mt-0  pb-lg-0 pb-0'>


<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={17}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (17)
          (ii) On Polygon
        </Accordion.Header>
        <Accordion.Body>
        <p>Polygon is a layer 2 (L2) scaling solution that allows anyone to create and exchange value, powered by zero-knowledge technology.</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={18}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (18)
          (iii) On Optimism

        </Accordion.Header>
        <Accordion.Body>
        <p>Optimism is a fast and stable L2 blockchain built as a minimal extension to existing Ethereum software, OP Mainnet's EVM-equivalent architecture helps Ethereum with scaling.
</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={19}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (19)
          (iv) On Arbitrum
        </Accordion.Header>
        <Accordion.Body>
        <p>Arbitrum is a suite of scaling solutions providing environments with high-throughput, low-cost smart contracts, backed by industry-leading proving technology rooted in Ethereum.

</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={20}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (20)
          (v) On Binance Smart Chain (BSC)
        </Accordion.Header>
        <Accordion.Body>
        <p>BSC is is a Layer 1 (L1) blockchain that allows anyone to deploy smart contracts and build dapps (decentralized applications) on top of.
</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
</div>


<div className='row mt-0  pb-lg-0 pb-0'>


<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={21}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (21)
          (vi) On Avalanche
        </Accordion.Header>
        <Accordion.Body>
        <p>Avalanche is a decentralized, open-source proof of stake blockchain with smart contract functionality. AVAX is the native cryptocurrency of the platform.
</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={22}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (22)
          (Vii) On Metis

        </Accordion.Header>
        <Accordion.Body>
        <p>Metis is an Ethereum Layer-2 scaling solution aiming to solve the blockchain trilemma: (1) Security. (2) Scalability, and (3) Decentralization.

</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={23}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (23)
          (Viii) On Base
        </Accordion.Header>
        <Accordion.Body>
        <p>Base is an Ethereum Layer 2 (L2) chain that offers a safe, low-cost, developer-friendly way to build on-chain. Base is an L2 built on OP Stack in collaboration with Optimism. 
</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={24}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (24)
          How to switch networks?
        </Accordion.Header>
        <Accordion.Body>
        <p>To protect and/or transfer your tokens on a different network, you must change the network first.
</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
</div>


<div className='row mt-0  pb-lg-0 pb-0'>


<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={25}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (25)
          To switch networks:
        </Accordion.Header>
        <Accordion.Body>
        <p>1) Select the network icon in the upper right hand of the screen (we will display a screenshot of the website there under every point).</p>
   <p>2) Select the network you would like to use.
</p>
<p>3) You should see the new network name. Now, you are ready to mint unhackable tokens (uTokens) - transfer and claim your unhackable tokens (uTokens) over that network!
</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={26}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (26)
          Basic knowledge:

        </Accordion.Header>
        {/* <Accordion.Body>
        <p>Metis is an Ethereum Layer-2 scaling solution aiming to solve the blockchain trilemma: (1) Security. (2) Scalability, and (3) Decentralization.

</p>
        </Accordion.Body> */}
      </Accordion.Item>
    </div>
  </Accordion>

</div>
<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={27}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (27)
          - What is a crypto wallet?
        </Accordion.Header>
        <Accordion.Body>
        <p>A crypto wallet is an interface that allows you to manage your cryptographic tokens. With a wallet you can store, send, and receive crypto tokens on the blockchain.
</p>
<p>Your wallet is a combination of a public and a private cryptographic key that are used together to access your crypto.</p>
   <p>A wallet can have as many public addresses as you desire.
</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={28}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (28)
          What is a public address?
        </Accordion.Header>
        <Accordion.Body>
        <p>A public address is the unique string of characters that you use to receive funds.
</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
</div>

<div className='row mt-0  pb-lg-0 pb-0'>


<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={29}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (29)
          What is a network/blockchain?
        </Accordion.Header>
        <Accordion.Body>
        <p>A blockchain is distributed ledger, often public and decentralized, consisting of records called blocks that are used to record transactions across many computers so that any involved block cannot be altered retroactively, without the alteration of all subsequent blocks.

</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={30}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (30)
          What are public goods?

        </Accordion.Header>
        <Accordion.Body>
        <p>In economics, a public good (also referred to as a social good or collective good)[1] is a good that is both non-excludable and non-rivalrous. Public goods are free to use and the end-users cannot be denied from accessing them.

Also, the use by one person neither prevents access of other people nor does it reduce availability to others. Therefore, the good can be used simultaneously by more than one person.
</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
<div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
  <Accordion className="accordion-bg">
    <div className="col-md-12">
      <Accordion.Item
        eventKey={31}
        className=" accordion-bg"
      >
        <Accordion.Header className=" accordion-bg">
          (31)
          What would be a recommended best security practice:
        </Accordion.Header>
        <Accordion.Body>
        <p>Not mandatory, but as a best security precaution, we advise to:</p>
<p>
(1) Copy the Master Private Key u369 provides (you -or anybody else- will not be able to see it on the interface).
</p>
<p>(2) Turn off the Wi-Fi or any internet connection for a moment. Of critical importance for this moment. Please do.
</p>
<p>(3) Paste the Master Private Key in a ephemeral-note* on your device (ephemeral because you will delete that note as per a further step indication).
</p>
<p>(4) To make sure your Master Private Key goes offline and someplace safe: Momentarily, and without misspelling, write down in a piece of paper the Master Private Key you pasted in the note (more on this at the end).
</p>
<p>(5) After you confirmed that the 32 characters are correct and match >> delete the Master Private Key from the note on your device.
</p>
<p>(6) Turn on the Wi-Fi.
</p>
<p>(7) Set and confirm password by confirming the Tx in your wallet.
</p>
<p>(9) Before sending any funds to the contract, try "Forgot password" >> turn-off the Wi-Fi again >> input the Master Private Key to set new password >> after the Master Private Key is input >> turn on the Wi-Fi >> if the "Reset password" segment appears your Master Private Key is correct!
</p>
<p>If you lose your password, only the Master Private Key can be used to reset the password; otherwise you will not be able to interact with the contract.</p>
   <p>(10) In point 4 we mentioned: "Momentarily, and without misspelling, write down in a piece of paper the Master Private Key" as a convenient way to have your Master Private Key written down offline; however, the best recommendation to store your Master Private Key (and your wallet's private keys as well) >> better than a piece of paper is a solid, stainless, acid-resistant, shockproof, and fireproof metal.
</p>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  </Accordion>

</div>
</div>
    </div>

  )
}

export default FaqsFinal