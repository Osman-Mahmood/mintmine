import React from 'react'
import Table from 'react-bootstrap/Table';
import { etherTokens } from '../tokenConfig';
import PairPrice from './PairPrice';
import All from '../assets/All.svg'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
function Tokens() {
    const { isConnected } = useAccount();
    return (
        <div className='container p-2 mb-5 pb-5 mt-5 p-5'>
            <div className='row gx-0 align-items-center'>
                <div className='col-lg-12'>
                    {/* <div className='d-lg-flex d-block align-items-center'>
                        <div className='col-lg-6 col-12'>
                        <h4 className='text-lg-start text-center '>
                    Tokens to protect
                    </h4>
                   {
                    isConnected && <ConnectButton  className="text-start" label="Connect"  showBalance={false} />
                   } 
                        </div>
                 <div className='col-lg-6 col-12 mb-lg-0 mb-5'>
                 <h4 className=''>
                    Your token not on this list?
                    </h4>
                    <h4 className=''>
                    Reach out and it will be added.
                    </h4>
                 </div>
                   
                    </div> */}
                    
                    {/* <Table className='mt-2 border rad text-light p-3 rounded mb-lg-5 mb-0' >
                        <thead className='bor'>
                            <tr>
                                <th className='d-lg-block d-none'>#</th>
                                <th></th>
                                <th className='text-start'>Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                etherTokens.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='d-lg-block d-none'>{index + 1}</td>
                                        <td className='text-end'><img src={All} alt="" style={{width:'20px',height:'20px'}}/></td>
                                        <td className='text-start fw-bold mb-0'>{item.name} <span className='ms-3 fw-normal' style={{fontSize:'14px'}}> <br className='d-lg-none d-block'/> {item.symbol}</span> </td>
                                    
                                        <td><PairPrice address={item.address} /></td>
                                    </tr>
                                })
                            }


                        </tbody>
                    </Table> */}
                    <h5>Security & Audits</h5>
                    <p>The u369 smart contract is designed with safety in mind and the links below <br /> can attest due diligence to assure the highest security standards:</p>
                    <h5 className='mb-5 pb-5'>V1 Audits (coming soon).</h5>
                </div>
            </div>
        </div>
    )
}

export default Tokens