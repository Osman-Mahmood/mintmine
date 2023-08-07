import React from 'react'
import ModalA from './ModalA'
import ModalB from './ModalB'
import ProtectModal from './ProtectModal'

const TokenSelect = () => {
  return (
    <div className='container mt-5 mb-5'>
        <div className='row justify-content-center'>
            <div className='col-lg-12 text-center justify-content-center d-flex'>
                <div className='col-lg-6 col-12 box'>
                   <h5 className='text-white pt-5 pb-5'>Reward</h5>
                   <div className='modalselect'>
                   <input type="text" name="" id="" className='token_inp p-4 w-75 mb-3' placeholder='0'/>
                   <ModalA className="modala"/>
                   </div>
                   <div className='modalselect'>
                   <input type="text" name="" id="" className='token_inp p-4 w-75 mb-3' placeholder='0'/>
                   <ModalB className="modala"/>
                   </div>
                   {/* <button className='w-75 protect pb-3'>
                    Protect 
                   </button> */}
                   <ProtectModal />
                </div>
            </div>
        </div>
    </div>
  )
}

export default TokenSelect
