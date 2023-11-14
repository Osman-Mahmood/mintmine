import React from "react";
// import intro from '../../assets/intro.jpg'

import { AiOutlineCheck } from "react-icons/ai";
// import '../style.css'

import Accordion from "react-bootstrap/Accordion";
const FaqsFinal = () => {
  return (
    <div className="container-fluid p-5 pt-0  text-white pb-3  mt-lg-0 mt-0 mb-lg-5 mb-0 pb-0 pb-lg-5 pb-0 ">
      {/* <img className='w-100 img-fluid intro_img' src={intro} alt="" /> */}
      {/* <h1 className='text-white intro_text'>Distributed systems <br />
        & <br />
        Human Coordination
      </h1> */}
      <div className="row pt-lg-0 pt-0">
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={0} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (1) How do I connect to u369?
                </Accordion.Header>
                <Accordion.Body>
                  {" "}
                  <p>
                    {" "}
                    Connect your crypto wallet to u369 via Mobile or Web
                    browsers.
                    <ul>
                      <li>Via Mobile: Under construction.</li>
                      <li>Via Web browser:</li>
                      <li>Once in u369.eth.limo.</li>
                      <li>Select one of the available wallets.</li>
                      <li>
                        If your wallet is not listed select WalletConnect to
                        choose from the supported wallets.
                      </li>
                      <li>
                        To connect with your selected wallet >> click on "Next"
                        in your wallet.
                      </li>
                      <li>
                        For your wallet to interact with u369 smart contract >>
                        click on "Connect" on your wallet.
                      </li>
                      <li>
                        Now you're connected. Some characters of your wallet
                        address will display in the right upper corner of the
                        u369 interface.
                      </li>
                    </ul>
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={1} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (2) How do I protect my crypto-assets with u369?
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                  With a Concealed Master Key (CMK) randomly generated for you, plus <br /> (A) a Hardware Security Key (a physical second factor authentication); or <br /> (B) a strong password set by yourself, in case you do not own a Hardware Security Key.
                  </p>
                  <p>
                  Only after setting your Hardware Security Key, or after inputting the password you set, is when you are able to move uTokens with u369 protocol (Protect / Transfer / Claim).
                  </p>
                  <p>
                  Uniquely with the Concealed Master Key you can reset or change the Hardware Security Key or the password (in case you lose your Security Key or forget the password you did set).
                  </p>
                  <p>
                  A u369 Concealed Master Key is randomly generated, and only the end-user acquiring it has the visibility and direct access to it.
                  </p>
                  <p>
                  As a security precaution, the Concealed Master Key is only presented encrypted in a non-readable format.
                  </p>
                  {/* <p>(6) For your wallet to interact with u369 smart contract >> click on "Connect" on your wallet.
</p>
<p>(7) Now you're connected. Some characters of your wallet address will display in the right upper corner of the u369 interface.
</p> */}
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={2} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (3) Ok, but how does u369 really works?
                </Accordion.Header>
                <Accordion.Body>
                  {" "}
                  <p>
                  (A) If connecting a wallet for the first time to u369: Previoys to perfom any user operation (Protect / Transfer / Claim) you will be provided with the one-time, randomly-generated and encrypted 32-charachters-string (i.e., a Concealed Master Key -CMK-).
                  </p>
                  <p>
                  (B) Save your Concealed Master Key (CMK) in a safe place (preferably offline).
                  </p>
                  <p>
                  (C) Once you have saved your Concealed Master Key, you can proceed to protect your digital assets:
                  </p>
                  <p>
                  (D) Check the box "I understand that u369 cannot recover this password for me".
                  </p>
                  <p>
                  (E) Set your Hardware Security Key or your password >> confirm the respective Security Key or password >> click on "Protect" >> and click "Confirm" in your wallet to sign the on-chain Tx.
                  </p>
                  <p>
                  (F) Once the Tx to set the Hardware Security Key or your password is confirmed on-chain: Select the token and the amount you want to protect.
                  </p>
                  <p>
                  (H) Input your password or Security Key and click "Protect".
                  </p>
                  {/* <p>(G) Once the Tx to set password is confirmed on-chain: Select the token and the amount you want to protect.
                  </p> */}
                  <p>(I) Sign the Tx in your wallet to safeguard the native token(s) within u369 smart contract and receive in your wallet the respective unhackable tokens (uTokens) at a 1:1 ratio.
</p>
                  <p>
                  (K) Click "Add to wallet" button to track your uToken balance in your wallet.
                  </p>
                  <p>
                  Description: u369 Protocol is comprised of two smart contracts: uTokenFactory and uToken. 

                  </p>
                  <p>The main functionality is performed in uTokenFactory while uToken is an unique wrapped ERC20 token contract with extra features and conditions. 
</p>
                  <p>Whenever uTokenFactory would be deployed, a list of provided tokens is previously approved. Only the approved tokens can become protected and unhackableTokens (uTokens).</p>
                  <p>uTokenFactory smart contract deploys itself first and also automatically deploys a uToken against each approved and protected crypto-asset (As of this moment ETH, ERC20, and other coins/tokens from EVM chains. Unhackable NFTs coming soon.)</p>
                  <p>u369 smart contracts are immutable. The append-only exception is to add new tokens (e.g., ERC-20, NFTs). Once a token is added, it can’t be removed. All other functions of the smart-contract are non-upgradable."</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={3} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (4) What are uTokens?
                </Accordion.Header>
                <Accordion.Body>
                  {" "}
                  <p>
                    uTokens are the 1:1 representation of your safeguarded
                    native tokens.
                  </p>
                  <p>
                    In essence, to protect any supported crypto-asset, you
                    safeguard your native token(s) within u369 smart contract
                    and u369 mints to your wallet the correspondent
                    unhackableToken (uToken). The uToken can only be
                    moved/transferred by the rightful owner who received the
                    Concealed Master Key and did set a Security Key or a password in u369.
                  </p>
                  <p>
                    Without the password or the Concealed Master Key, it is
                    impossible to move your uTokens, even if a bad actor would
                    have gained access to your wallet's private keys!!
                  </p>
                  {/* <p>(D) Check the box "I understand that u369 cannot recover this password for me".

</p> */}
                  {/* <p>(E) Set password >> confirm password >> click on "Protect" >> and click "Confirm" in your wallet to sign the Tx.
</p>
<p>(G)  Once the Tx to set password is confirmed on-chain: Select the token and the amount you want to protect.

</p>
<p>(H) Input your password and click "Protect".</p>
<p>(I) Sign the Tx in your wallet to safeguard the native token in your wallet and receive the respective unhackable tokens (uTokens) at a 1:1 ratio.
</p>
<p>(J) Add the uToken to your wallet.
</p> */}
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
      </div>

      {/* second */}
      <div className="row pt-lg-0 pt-0">
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={4} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (5) What does the "u" in uTokens and u369 stands for?
                </Accordion.Header>
                <Accordion.Body>
                  {" "}
                  <p>
                    {" "}
                    The "u" in u369 and in uTokens stands for unstealable /
                    unhackable / uncommon.
                    {/* Via Web browser: */}
                    {/* <ul>
  <li>
Once in u369.eth.limo.

  </li>
  <li>
Select one of the available wallets.

  </li>
  <li>
If your wallet is not listed select WalletConnect to choose from the supported wallets.

  </li>
  <li>
To connect with your selected wallet >> click on "Next" in your wallet.

  </li>
  <li>
For your wallet to interact with u369 smart contract >> click on "Connect" on your wallet.

  </li>
  <li>
  Now you're connected. Some characters of your wallet address will display in the right upper corner of the u369 interface.

  </li>
</ul> */}
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={5} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (6) How do I transfer uTokens?
                </Accordion.Header>
                <Accordion.Body>
                  <p>To transfer uTokens:</p>
                  <p>(A) Connect to the u369 interface</p>
                  <p>(B) Click on "Transfer"</p>
                  <p>(C) Select the uToken and input the amount to transfer</p>
                  <p>(E) Input your Security Key or your password</p>
                  <p>
                  (D) Sign the Tx in your wallet to send the uTokens. Done!
                  </p>
                  <p>
                  Note: It is impossible to trasnsfer uTokens without inputting your Security Key, or your password.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={6} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (7) What happens if someone pays/sends me uTokens?
                </Accordion.Header>
                <Accordion.Body>
                  {" "}
                  <p>
                  Any new recipient of uTokens can transfer their uTokens by connecting to the u369 smart contract interface, without anyone’s permission, and by initiating the flow to receive their Concealed Master Key and set Security Key or password:
                  </p>
                  <p>
                    (A) Check the box "I understand that u369 cannot recover
                    this password for me".
                  </p>
                  <p>
                  (B) Set Security Key or password >> confirm the respective Security Key or password >> click on"Protect" >> and click "Confirm" in your wallet to sign the Tx.
                  </p>
                  <p>
                  (C) Once the Tx to set Security Key or password is confirmed on-chain: You are free to select the uToken and the amount you want to transfer.
                  </p>
                  {/* <p>(D) Check the box "I understand that u369 cannot recover this password for me".
</p>
<p>
(E) Set password >> confirm password >> click on "Protect" >> and click "Confirm" in your wallet to sign the on-chain Tx.
</p>
<p>(F) Once the Tx to set password is confirmed on-chain: Select the token and the amount you want to protect.
</p>
<p>(G) Once the Tx to set password is confirmed on-chain: Select the token and the amount you want to protect.
</p>
<p>(H) Input your password and click "Protect".
</p> */}
                  {/* <p>(I) Sign the Tx in your wallet to safeguard the native token within u369 smart contract and receive in your wallet the respective unhackable tokens (uTokens) at a 1:1 ratio.
</p>
<p>(K) Click "Add to wallet" button to track your uToken balance in your wallet.
</p> */}
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={7} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (8) Who can claim the safeguarded native tokens?
                </Accordion.Header>
                <Accordion.Body>
                  {" "}
                  <p>
                    Only by burning uTokens the native tokens can be claimed.
                    Only the minter or a new recipient of uTokens can claim the
                    protected native tokens.
                  </p>
                  <p>
                    If you own uTokens and would need the protected native
                    token(s) within the u369 smart contract, here are the steps
                    to claim the native token:
                  </p>
                  <p>
                    (A) Once connected to u369 >> click on the “Claim” button.
                  </p>
                  <p>
                    (B) Input the amount of uTokens you will burn to claim the
                    native tokens.
                  </p>
                  <p>(C) Input the Security Key or the password and sign the Tx in your wallet.</p>
                  <p>
                    (D) When the Tx is confirmed on-chain, the uTokens are
                    burned and automatically the contract releases the
                    correspondent native tokens to your wallet.
                  </p>
                  {/* <p>(H) Input your password and click "Protect".</p>
<p>(I) Sign the Tx in your wallet to safeguard the native token in your wallet and receive the respective unhackable tokens (uTokens) at a 1:1 ratio.
</p>
<p>(J) Add the uToken to your wallet.
</p> */}
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
      </div>

      {/* third */}

      <div className="row pt-lg-0 pt-0">
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={8} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (9) Is there a fee to claim?
                </Accordion.Header>
                <Accordion.Body>
                  {" "}
                  <p>
                    {" "}
                    No. u369 does not charge a fee to withdraw/claim/release
                    back to you a native token held within the u369 contract,
                    only the gas network-fee shall be paid to validators when
                    using the claim function.
                    {/* Via Web browser: */}
                    {/* <ul>
  <li>
Once in u369.eth.limo.

  </li>
  <li>
Select one of the available wallets.

  </li>
  <li>
If your wallet is not listed select WalletConnect to choose from the supported wallets.

  </li>
  <li>
To connect with your selected wallet >> click on "Next" in your wallet.

  </li>
  <li>
For your wallet to interact with u369 smart contract >> click on "Connect" on your wallet.

  </li>
  <li>
  Now you're connected. Some characters of your wallet address will display in the right upper corner of the u369 interface.

  </li>
</ul> */}
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={9} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (10) How does u369 generate revenue to rewards its users, fund
                  public goods and self-sustain?
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    A benefaction-fee of 0.369% of the protected amount is
                    automatically collected by u369 smart contract.
                  </p>
                  <p>
                    Exegesis: If you protect 1 ETH: u369 smart contract
                    automatically collects as a benefaction-fee 0.369% of the
                    safeguarded amount and mints the remaining to your wallet (1
                    ETH - 0.369% = 0.99631 uETH are minted to your wallet. The
                    name uETH can be read as is "uETH" or as "unhackable ETH or
                    "unstealable ETH").
                  </p>
                  <p>
                  The protected native token (in our example 1 ETH - 0.369% = 0.99631 ETH) stays sfaeguarded within u369 protocol. Only controlled by you. And can only be claimed/released from the u369 smart contract with the uTokens (i.e., by burning the uTokens).
                  </p>
                  {/* <p>(D) Sign the Tx in your wallet to send the uTokens. Done!
</p>
<p>Note: It is impossible to trasnsfer uTokens without inputting your password or without having the Concealed Master Key.
  </p> */}
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={10} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (11) What do you mean by benefaction-fee?
                </Accordion.Header>
                <Accordion.Body>
                  {" "}
                  <p>
                    It is a service-fee that is collected for the purpose of
                    doing good and giving donations to contribute to public
                    goods funding.
                  </p>
                  <p>
                    In total, 70% of all the service fee that charges u369 to
                    make the safeguarded tokens unhackable, is used for the
                    benefaction of the people:
                  </p>
                  <li className="m-0">30% for the u369 end-users.</li>
                  <li>30% for sustaining and help advance open source projects.</li>
                  <li>
                  10% for social and positive impact towards the community and devs.
                  </li>
                  {/* <p>(D) Check the box "I understand that u369 cannot recover this password for me".
</p>
<p>
(E) Set password >> confirm password >> click on "Protect" >> and click "Confirm" in your wallet to sign the on-chain Tx.
</p>
<p>(F) Once the Tx to set password is confirmed on-chain: Select the token and the amount you want to protect.
</p>
<p>(G) Once the Tx to set password is confirmed on-chain: Select the token and the amount you want to protect.
</p>
<p>(H) Input your password and click "Protect".
</p> */}
                  {/* <p>(I) Sign the Tx in your wallet to safeguard the native token within u369 smart contract and receive in your wallet the respective unhackable tokens (uTokens) at a 1:1 ratio.
</p>
<p>(K) Click "Add to wallet" button to track your uToken balance in your wallet.
</p> */}
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={11} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (12) How are the u369 benefaction fee distributed?
                </Accordion.Header>
                <Accordion.Body>
                  {" "}
                  <p>The 0.369% benefaction-fee is distributed as follows:</p>
                  <p>
                  30% to reward u369 user-base. See reward's recipients here.
                    <a
                      className="text-primary"
                      href="https://etherscan.io/address/0x4A058b1848d01455daedA203aCFaA11D2B133206"
                      target="blank"
                    >
                      here
                    </a>
                    .
                  </p>
                  <p>30% to fund public goods:</p>
                  <p>Donating 10% to Protocol Guild</p>
                  <p>Donating 10% to Giveth</p>
                  <p>Donating 10% to Valley Dao</p>
                  <p>
                  See all public goods donations and tx details since u369 inception {""}
                    <a
                      className="text-primary"
                      href="https://etherscan.io/address/0x7B95e28d8B4Dd51663b221Cd911d38694F90D196"
                      target="blank"
                    >
                      here
                    </a>
                    .
                  </p>
                  <p>
                    10% to community & devs. See txs{" "}
                    <a
                      className="text-primary"
                      href="https://etherscan.io/address/0xBeB63FCd4f767985eb535Cd5276103e538729E47"
                      target="blank"
                    >
                      here
                    </a>
                    .
                  </p>
                  <p>30% to sustain u369 itself.</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
      </div>
      {/* forth */}
      <div className="row pt-lg-0 pt-0">
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={12} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (13) Why the donations and the rewards are distributed
                  manuallly?
                </Accordion.Header>
                <Accordion.Body>
                  {" "}
                  <p>
                    For several reasons.
                    <p>
                    In regards of the donations for public goods funding, here are some of the considerations for sending the donations manually:

                    </p>
                    <p>
                    - What if the recipient loses the keys / the access to the funds sent to that wallet?
                    </p>
                    <p>- What if tha wallet gets compromised / hacked?
</p>
                    <p>
                    - What if the recipient stops their previous activity (perhaps being that the reason u369 was donating in the first place).

                    </p>
                    <p>
                    Amongst other reasons, as the ones explained above, distributing donations manually is the safest and best option.
                    </p>
                    <p>
                    In regards of distributing rewards to end-users manually: When testing, we idientified an exploit that can be carried on by end-users with bad intent.
                    </p>
                    <p>
                    Example: The prize-pool is $10,000 -- an end-user with $1,000 to protect (and also with bad intent) could do the protection of their $1,000 in sevaral txs (for ex 100 Tx of $10) just for the purpose of having 100 chances to win the $10,000 than if just they would send the $1,000 in one Tx thus having only one chance to win.
                    </p>
                    <p>
                    Distributing the funds to the randomly selected winners manually, helps to avoid the exploit as funds are failry distributed according to the amount of funds the end-user involved. No more and no less is rewarded, but only what can be proven as fair.
                    </p>
                    {/* Via Web browser: */}
                    {/* <ul>
  <li>
Once in u369.eth.limo.

  </li>
  <li>
Select one of the available wallets.

  </li>
  <li>
If your wallet is not listed select WalletConnect to choose from the supported wallets.

  </li>
  <li>
To connect with your selected wallet >> click on "Next" in your wallet.

  </li>
  <li>
For your wallet to interact with u369 smart contract >> click on "Connect" on your wallet.

  </li>
  <li>
  Now you're connected. Some characters of your wallet address will display in the right upper corner of the u369 interface.

  </li>
</ul> */}
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={13} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (14) On which networks is u369 deployed?
                </Accordion.Header>
                <Accordion.Body>
                  <p className="mb-0">On Ethereum: </p>
                  <p>
                    Ethereum is a network of computers all over the world that
                    follow a set of rules called the Ethereum protocol. The
                    Ethereum network acts as the foundation for communities,
                    applications, organizations and digital assets that anyone
                    can build and use.
                  </p>
                  <p className="mb-0">On Polygon:</p>
                  <p>
                    Polygon is a layer 2 (L2) scaling solution that allows
                    anyone to create and exchange value, powered by
                    zero-knowledge technology.
                  </p>
                  <p className="mb-0">On Optimism:</p>
                  <p>
                    Optimism is a fast and stable L2 blockchain built as a
                    minimal extension to existing Ethereum software, OP
                    Mainnet's EVM-equivalent architecture helps Ethereum with
                    scaling.
                  </p>
                  <p className="mb-0">On Arbitrum:</p>
                  <p>
                    Arbitrum is a suite of scaling solutions providing
                    environments with high-throughput, low-cost smart contracts,
                    backed by industry-leading proving technology rooted in
                    Ethereum.
                  </p>
                  <p className="mb-0">On Binance Smart Chain (BSC):</p>
                  <p>
                    BSC is is a Layer 1 (L1) blockchain that allows anyone to
                    deploy smart contracts and build dapps (decentralized
                    applications) on top of.
                  </p>
                  <p className="mb-0">On Avalnche:</p>
                  <p>
                    Avalanche is a decentralized, open-source proof of stake
                    blockchain with smart contract functionality. AVAX is the
                    native cryptocurrency of the platform.
                  </p>
                  <p className="mb-0">On Metis:</p>
                  <p>
                    Metis is an Ethereum Layer-2 scaling solution aiming to
                    solve the blockchain trilemma: (1) Security. (2)
                    Scalability, and (3) Decentralization.
                  </p>
                  <p className="mb-0">On Base:</p>
                  <p>
                    Base is an Ethereum Layer 2 (L2) chain that offers a safe,
                    low-cost, developer-friendly way to build on-chain. Base is
                    an L2 built on OP Stack in collaboration with Optimism.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={14} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (15) How do I switch networks?
                </Accordion.Header>
                <Accordion.Body>
                  {" "}
                  <p>
                    To protect, transfer or claim your tokens, you must first
                    select the network you wish to operate:
                  </p>
                  <p>
                    (A) Click on the network icon located in the upper right
                    side of the screen.
                  </p>
                  <p>(B) Select the network you would like to use.</p>
                  <p>
                    (C) You should see the new network name. Now, you are ready
                    to mint unhackable tokens (uTokens) - transfer and claim
                    your unhackable tokens (uTokens) over that network!
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={15} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (16) Basics
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="p-0">
                    <li>What is a crypto wallet?</li>
                    <p>
                      A crypto wallet is an interface that allows you to manage
                      your cryptographic tokens. A wallet helps to manage, send,
                      and receive crypto tokens on the blockchain.
                    </p>
                    <p>
                      {" "}
                      Your wallet is a combination of a public and a private
                      cryptographic key that are used together to access your
                      crypto.
                    </p>
                    <p>
                      A wallet can have as many public addresses as you desire.
                    </p>
                    <li>What is a public address?</li>
                    <p>
                      A public address is the unique string of characters that
                      you use to receive funds.
                    </p>
                    <li>What is a network/blockchain?</li>
                    <p>
                      A blockchain is distributed ledger, often public and
                      decentralized, consisting of records called blocks that
                      are used to record transactions across many computers so
                      that any involved block cannot be altered retroactively,
                      without the alteration of all subsequent blocks.
                    </p>
                    <li>What are public goods?</li>
                    <p>
                      In economics, a public good (also referred to as a social
                      good or collective good), is a good that is both
                      non-excludable and non-rivalrous. End-users cannot be
                      denied from accessing public goods. Also, the use by one
                      person neither prevents access of other people nor does it
                      reduce availability to others. Therefore, the good can be
                      used simultaneously by more than one person.
                    </p>
                    </ul>
                    {/* <li>Recommended best security practice:</li>
                    <p>
                      Not mandatory, but as a best security precaution, we
                      advise to:
                    </p>
                    <p>
                      (A) When the Concealed Master Key is presented without
                      being revelaed in plain text >> turn the Wi-Fi/internet
                      off.
                    </p>
                    <p>
                      (B) Copy the Concealed Master Key u369 provides (you -as
                      anybody else- will not be able to see it on the
                      interface).
                    </p>
                    <p>
                      (C) With the Wi-Fi or any internet connection OFF for a
                      moment. Paste the Concealed Master Key in a
                      ephemeral-note* on your device. (Ephemeral-note because
                      you should delete that note as per a further step
                      indication).
                    </p>
                    <p>
                      (D) To make sure your Concealed Master Key is saved
                      offline and someplace safe: Momentarily, and without
                      misspelling, write down in a piece of paper your Concealed
                      Master Key that you pasted in the ephemeral-note (more on
                      this at the end).
                    </p>
                    <p>
                      (E) After you confirmed that the 32 characters are correct
                      and match >> please delete the Concealed Master Key from
                      the ephemeral-note on your device.
                    </p>
                    <p>(F) Turn on the Wi-Fi.</p>
                    <p>
                      (G) Set and confirm password by confirming the Tx in your
                      wallet.
                    </p>
                    <p>
                      (H) Before sending any funds to the contract, try "Forgot
                      password" >> turn-off the Wi-Fi again >> input the
                      Concealed Master Key to set new password >> after the
                      Concealed Master Key has been input in the respective
                      field >> turn on the Wi-Fi >> if the "Reset password"
                      segment displays, that means your Concealed Master Key is
                      correct!
                    </p>
                    <p>
                      If you lose your password, only the Concealed Master Key
                      can be used to reset the password; otherwise you will not
                      be able to interact with the contract.
                    </p>
                    <p>
                      (I) In point 4 we mentioned: "Momentarily, and without
                      misspelling, write down in a piece of paper the Master
                      Private Key" as a convenient way to have your Master
                      Private Key written down offline; however, the best
                      recommendation to store your Master Key (and your wallet's
                      private keys as well) >> better than a piece of paper is a
                      solid, stainless, acid-resistant, shockproof, and
                      fireproof metal.
                    </p>
                    <p>Happy Crypto Days and Power to the People!!</p>
                  </ul>
                  <p>The 0.369% service-fee is distributed as follows:</p>
                  <p>
                    30% to reward u369 user-base. See reward's recipients here.
                  </p>
                  <p>30% to fund public goods. This is:</p>
                  <p>Donating 10% to Protocol Guild</p>
                  <p>Donating 10% to Giveth</p>
                  <p>Donating 10% to Valley Dao</p>
                  <p>
                    See all public goods donations and tx details since u369
                    inception here.
                  </p>
                  <p>10% to community & devs. See txs here</p>
                  <p>30% to sustain u369 itself.</p> */}
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={17} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (17) Which protocols/smart contracts can uTokens interact
                  with?
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="p-0">
                    <p>
                      For the initial main-network-deployments, utokens can
                      seamlessly interact with the following list of
                      protocols/smart contracts, more can always be added later
                      if the respective communities would allow/want to interact
                      with uTokens:
                    </p>
                    <p>Lending protocols and DEXs:</p>
                    <p>AAVE</p>
                    <p>Alchemix</p>
                    <p>Benqui</p>
                    <p>Compound</p>
                    <p>Euler</p>
                    <p>Liquity</p>
                    <p>Mai Finance</p>
                    <p>Venus</p>
                    <p>DEXs:</p>
                    <p>Uniswap</p>
                    <p>Kyberswap</p>
                    <p>dydX</p>
                    <p>1inch exchange</p>
                    <p>Airswap</p>
                    <p>Balancer</p>
                    <p>CowSwap</p>
                    <p>Dodo</p>
                    <p>IDEX</p>
                    <p>Matcha</p>
                    <p>Open Ocean</p>
                    <p>Orca</p>
                  </ul>
                  <p>PancakeSwap</p>
                  <p>ParaSwap</p>
                  <p>QuickSwap</p>
                  <p>Raydium</p>
                  <p>SushiSwap</p>
                  <p>Trader Joe</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={18} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (18) To whom does u369 gives credit to?
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    To Satoshi Nakamoto for the vision and for igniting this
                    peaceful-and-intellectual revolution.
                  </p>
                  <p>
                    To the Ethereum community and the crypto ecosystem at large.
                  </p>
                  <p>To all the Layer 2 scaling solutions.</p>
                  <p>
                    To Laser Ice for putting together the idea of u369 and
                    unhackableTokens.
                  </p>
                  <p>To the awesome developers who helped writing the code.</p>
                  <p>
                    To Kjpargeter via Freepik for the UI abstract dark
                    background with colorful waves.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={19} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (19) What is the Prize-Pool?
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                  The prize pool is a u369 address that programmatically receives 30% of all the collected benefaction-fees. Thus, when the protocol is used to protect crypto-assets, 30% percentage of all collected benefaction-fee are sent to the Prize Pool address to reward one u369 end-user every 369 hours.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={20} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (20) How does the u369 system selects the winner to receive
                  funds from the prize-pool?
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    The function get_currentWinner() is used in the smart
                    contract. This is the logic implemented:
                  </p>
                  <p>
                    (A) The system checks how many addresses protected ETH or
                    native ERC20 tokens and minted uTokens within a period from
                    0 to 369 hours.
                  </p>
                  <p>
                    (B) At the end of the 369 hours, if no address interacted
                    with the contract, the system returns a zero result,
                    otherwise the system randomly selects one winner-address
                    from all the addresses that interacted with the contract.
                  </p>
                  <p>
                    {" "}
                    To implement this the u369 system uses the following
                    formula:{" "}
                  </p>
                  <p>
                    "uint randomNumber =
                    uint(keccak256(abi.encodePacked(previousTimePeriod,
                    deployTime))) % depositorsLength;"
                  </p>
                  <p>
                    In simple words, the procedure is defined in the following
                    steps:
                  </p>
                  <p>
                    1. A keccak hash (hashing algorithm) is applied on the
                    previous time period and contract deploy time.
                  </p>
                  <p>2. Hash is converted to integer value.</p>
                  <p>
                    3. A modulus operation performs on the converted integer and
                    number of addresses in the last time period.
                  </p>
                  <p>
                    The this question "Why the donations and the rewards are
                    distributed manually?" would be in #15 and so on and so
                    forth.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={21} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (21) Which tokens can I protect with u369?
                </Accordion.Header>
                <Accordion.Body className="remove_mb">
                  <p>
                    ETH, ERC20 tokens and NFTs (protection for NFTs coming
                    soon). ETH and the 33 ERC20 tokens in the following list,
                    are supported since u369 launch and initial phase. More
                    tokens can always be added as per communities petitions:
                  </p>
                  <p>Ethereum (ETH)</p>
                  <p>Tether (USDT)</p>
                  <p>USDC (USDC) </p>
                  <p>Polygon Ecosystem Token (POL)</p>
                  <p>Wrapped BTC (WBTC)</p>
                  <p>Dai (DAI)</p>
                  <p>Shiba Inu (SHIB)</p>
                  <p>ChainLink (LINK)</p>
                  <p>Uniswap (UNI)</p>
                  <p>Aave (AAVE)</p>
                  <p>1Inch Network (1INCH)</p>
                  <p>Ethereum Name Services (ENS)</p>
                  <p>Maker (MKR)</p>
                  <p>Synthetix (SNX)</p>
                  <p>Lido Staked ETH (stETH)</p>
                  <p>Lido Wrapped Staked ETH (wstETH)</p>
                  <p>Optimism (OP)</p>
                  <p>ApeCoin (APE)</p>
                  <p>Avalanche (AVAX)</p>
                  <p>Rocket Pool (RPL)</p>
                  <p>Rocket Pool ETH (rETH)</p>
                  <p>Compound (COMP)</p>
                  <p>Gnosis (GNO)</p>
                  <p>Keeper Network (KEEP)</p>
                  <p>Keep3rV1 (KP3R)</p>
                  <p>Lido DAO (LDO)</p>
                  <p>Ocean Protocol (OCEAN)</p>
                  <p>Radicle (RAD)</p>
                  <p>Alchemix (ALCX)</p>
                  <p>Aragon (ANT)</p>
                  <p>Arbitrum (ARB)</p>
                  <p>Badger DAO (BADGER)</p>
                  <p>BitDAO (BIT)</p>
                  <p>GHO (GHO)</p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item eventKey={22} className=" accordion-bg">
                <Accordion.Header className=" accordion-bg">
                  (22) Recommended best security practice
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                  Not mandatory, but as a best security precaution, we advise to:
                  </p>
                  <p>
                  (A) When u369 presents the Concealed Master Key: turn the Wi-Fi/internet off.
                  </p>
                  <p>
                  (B) Copy the Master Key u369 provides (for security reasons it is presented encrypted/concealed and only once). And only you are the sole owner of the Concealed Master Key.
                  </p>
                  <p>
                    {" "}
                    (C) With the Wi-Fi or any internet connection OFF for a moment >> paste the Concealed Master Key in a ephemeral-note* on your device. Important: Ephemeral-note because you should delete that note from your device after the Master Key is saved offline as per further indication in step (I).
                  </p>
                  <p>
                  (D) To make sure your Concealed Master Key is saved offline and someplace safe: Momentarily, and without misspelling, write down in a piece of paper your Concealed Master Key that you pasted in the ephemeral-note (more on this in step (I) at the end).

                  </p>
                  <p>
                  (E) After you confirmed that the 32 characters are correct and match >> please delete the Concealed Master Key from the ephemeral-note on your device.
                  </p>
                  <p>(F) Turn on the Wi-Fi.</p>
                  <p>
                  (G) Set and confirm your Hadware Security Key or your password by confirming the Tx in your wallet.

                  </p>

<p>Note: In case of setting password, do not type your password, instead to protect your funds 100% do the following:</p>
<p>(i) Use a Password Manager to randomly generate and issue to yourself a concealed password of a minimum of 25 characters.</p>
<p>(ii) Paste the concealed generated password from the password manager on the "Set password" segment in u369 </p>
<p>(iii)  Add an extra password of your own to the password you pasted in point (ii) >> repeat the same on "Comfirm" password.
</p>
<p>Note: The extra step in point (iii) is to help protect your crypto-assets in case your Password Manager would be compromised.</p>

                  <p>
                    <p>That added password, you can store it off-line some place safe, and if  you ever forget/lose the manually added password or the one in the Password Manager, you can always reset it with your Master Key.</p>
                    (H) Before sending any funds to the u369 contract, try/click "Forgot password" >> turn-off the Wi-Fi again >> input/paste the Concealed Master Key to set new password >> after the Concealed Master Key is in the respective field >> turn on the Wi-Fi >> if the "Reset password" segment displays ("New password" and "Confirm Password") that means your Concealed Master Key is correct and you have sovereign over your money.
                  </p>
                  <p>
                  If you lose your password, only the Concealed Master Key can be used to reset the password; otherwise you will not be able to interact with u369 smart contract.
                  </p>
                  <p>
                  (I) In point D it is mentioned: "Momentarily, and without misspelling, write down in a piece of paper your Concealed Master Key" as a convenient way to have your Master Key written down offline; however, the best recommendation to store your Master Key (and your wallet's private keys as well) >> better than a piece of paper is a solid, stainless, acid-resistant, shockproof, and fireproof metal.
                  </p>
                  <p>Happy Crypto Days and Power to the People!!</p>
                  <p></p>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FaqsFinal;
