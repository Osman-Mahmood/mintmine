import React from 'react'
import All from '../assets/All.svg'
const Tokens = () => {
  return (
    <div className='container pt-5'>
      <div className='row'>
        <div className='col-lg-12 d-lg-flex d-bloc gap-3 px-0'>
          <div className='col-lg-6 col-12 time_box justify-content-center'>
<h5 className='text-white text-center mt-3 mb-2'>Participant gets this reward</h5>
<div className='justify-content-center text-center mt-3' >

<button className='w-75 matic p-2 border-0'><img src={All} alt="" /> 10 MATIC</button>
<button className='protect w-75 mt-3 mb-4'>Claim</button>
</div>
          </div>
          <div className='col-lg-6 col-12 time_box'>
            <h5 className='text-white text-center mt-3 mb-2'>Time to claim</h5>
            <div className='d-flex justify-content-between mt-3'>
              <div className='text-center px-3'>
                <h1 className='time_box2 text-white p-3'>
                  24
                </h1>
                       <p className='text-white'>Days</p>
              </div>
              <div className='text-center px-3'>
                <h1 className='time_box2 text-white p-3'>
                  24
                </h1>
                       <p className='text-white'>Days</p>
              </div>
              <div className='text-center px-3'>
                <h1 className='time_box2 text-white p-3'>
                  24
                </h1>
                       <p className='text-white'>Days</p>
              </div>
              <div className='text-center px-3'>
                <h1 className='time_box2 text-white p-3'>
                  24
                </h1>
                       <p className='text-white'>Days</p>
              </div>
            </div>
            </div>
        </div>
      </div>
      <div className='row time_box mt-3'>
        <div className='col-lg-12 d-lg-flex d-block align-items-center gap-3'>
          <div className='col-lg-6 col-12'>
            <h5 className='text-white'>Every 369 hours a participant  is randomly selected.</h5>
          </div>
          <div className='col-lg-6'>
            <div className='d-flex justify-content-between mt-3'>
              <div className='text-center px-3'>
                <h1 className='time_box2 text-white p-3'>
                  24
                </h1>
                       <p className='text-white'>Days</p>
              </div>
              <div className='text-center px-3'>
                <h1 className='time_box2 text-white p-3'>
                  24
                </h1>
                       <p className='text-white'>Days</p>
              </div>
              <div className='text-center px-3'>
                <h1 className='time_box2 text-white p-3'>
                  24
                </h1>
                       <p className='text-white'>Days</p>
              </div>
              <div className='text-center px-3'>
                <h1 className='time_box2 text-white p-3'>
                  24
                </h1>
                       <p className='text-white'>Days</p>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Tokens
