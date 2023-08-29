import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
const Home = () => {
  return (
    <div className=' hright'>
      <div className='container-fluid'>
        <div className='row justify-content-center align-items-center text-start'>
          <div className='col-lg-3'>

          </div>
          <div className='col-lg-6 col-12 pt-lg-0 pt-0'>
            <h1 className='text-white mt-0 font'>Non-custodial & open-source✨</h1>
            <h1 className='text-white font'>Protecting your tokens ✨</h1>
            <h1 className='text-white font'>Funding public goods & rewarding you ✨</h1>
            {/* <button className='reward mt-4' onClick={()=>{ConnectButton()}}>Get Started</button> */}
           <div className='text-start justify-content-start mb-4'>
            <ConnectButton label='Get Started' className="text-start" chainStatus="icon" accountStatus="address" showBalance={false} />
            
           </div>
          </div>
          <div className='col-lg-3'>
            
            </div>
        </div>
      </div> 
    </div>
  )
}

export default Home
