import React from 'react'
import {MdEmail} from 'react-icons/md'
import {AiOutlineTwitter,AiOutlineGithub, AiOutlineInstagram} from 'react-icons/ai'
import {FaTelegramPlane} from 'react-icons/fa'
const Footer = () => {
  return (
    <div className='bg_footer'>
   <div className='container'>
        <div className='row text-center'>
            <div className='col-lg-12 mt-5'>
            <p className='footer_font'>Ascribing meaningful-safety to your cryptographic assets <br /> &  <br /> contributing to the sustainable expansion of the ecosystem.</p>
            <div className='d-flex justify-content-center text-center gap-2 mb-3'>
              <a href="mailto:u369eth@protonmail.com"><MdEmail className='icon' /> </a>
              <a href="https://www.instagram.com/u369.eth/" target='blank' > < AiOutlineInstagram className='icon'  /></a>
               <a href="https://twitter.com/u369eth" target='blank'><AiOutlineTwitter  className='icon'/></a>
               <a href="https://t.me/+eXB5_gt3wvtlOGE5" target='blank'><FaTelegramPlane className='icon'/></a>
               <a href="https://github.com/u369eth" target='blank'><AiOutlineGithub className='icon'/></a> 
                
            </div>
            </div>
        </div>
      
    </div>
    </div>
 
  )
}

export default Footer
