import React from 'react'
import {MdEmail} from 'react-icons/md'
import {AiOutlineTwitter,AiOutlineGithub} from 'react-icons/ai'
import {FaTelegramPlane} from 'react-icons/fa'
const Footer = () => {
  return (
    <div className='bg_footer'>
   <div className='container'>
        <div className='row text-center'>
            <div className='col-lg-12 mt-5'>
            <p className='footer_font'>Ascribing meaningful-safety to your cryptographic assets <br /> &  <br /> contributing to the sustainable expansion of the ecosystem.</p>
            <div className='d-flex justify-content-center text-center gap-2 mb-3'>
                <MdEmail className='icon'/>
                <AiOutlineTwitter className='icon'/>
                <FaTelegramPlane className='icon'/>
                <AiOutlineGithub className='icon'/>
            </div>
            </div>
        </div>
      
    </div>
    </div>
 
  )
}

export default Footer
