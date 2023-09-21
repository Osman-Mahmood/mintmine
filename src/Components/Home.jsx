import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
const Home = () => {
  return (
    <div className='margin_top'>
      <div className='container p-0 mb-5 pb-5'>
        <div className='row justify-content-center align-items-center text-start'>
        
          <div className='col-lg-12 col-12 pt-lg-2 p-4 p-lg-0 ms-0 mb-5 pb-5   pt-0'>
          <h1 className='text-white mt-0 font'>This is an immutable smart contract<span className='d-none'>✨</span></h1>

            <h1 className='text-white mt-0 font'>Non-custodial & open-source<span className='d-none'>✨</span></h1>
            <h1 className='text-white font'>Protecting your tokens <span className='d-none'>✨</span></h1>
            <h1 className='text-white font'>Funding public goods & rewarding you <span className=' d-none'>✨</span></h1>
            {/* <button className='reward mt-4' onClick={()=>{ConnectButton()}}>Get Started</button> */}
           {/* <div className='text-center justify-content-center mb-4'>
            <ConnectButton label='Get Started' className="text-center" chainStatus="icon" accountStatus="address" showBalance={false} />
            
           </div> */}
          </div>
         
        </div>
      </div> 
    </div>
  )
}

export default Home
