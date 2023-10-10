import React from 'react'
import { NavLink } from 'react-router-dom'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import Table from 'react-bootstrap/Table';
import Protect from './Modals/Protect';
import Transfer from './Modals/Transfer';
import Claim from './Modals/Claim';
const Dashboard = () => {
    return (
        <div className='container p-0'>
            <div className='row justify-content-center align-items-center p-3'>
                <h2 className='text-start ms-3'>Ethereum Network v1  v </h2>
                <div className='row gx-0 mt-3'>
                    <div className='col-lg-12 col-12 d-lg-flex d-block gap-3'>

                        <div className='col-lg-6 col-12 boxes mb-3  p-3 text-start'>
                            <h5>Tokens Protected</h5>
                            <p className='mb-2 mt-4 text-clr'>Nothing protected yet</p>
                        </div>
                        <div className='col-lg-6 col-12 boxes mb-3   p-3 text-start'>
                            <h5>Tokens protected</h5>
                            <p className='mb-2 mt-4 text-clr'>Nothing protected yet</p>

                        </div>
                    </div>
                </div>
                <div className='row gx-0 mt-3'>
                    <div className='col-lg-12 col-12 d-lg-flex d-block  gap-3'>

                        <div className='col-lg-6 mb-3 col-12 boxes  p-3 text-start'>
                            <div className='d-flex justify-content-between'>
                                <h5>Tokens to protect</h5>
                                <p className='text-clr'>- Hide</p>
                            </div>

                            <p className='mb-2 mt-1 p-2 alert'>  <HiOutlineInformationCircle className='fs-4 ms-3' /> Your Etherium wallet is empty. Purchase or transfer assets.</p>



                            <Table striped className="custom-table flex-wrap">
                                <thead>
                                    <tr>
                                        {/* <th>#</th> */}
                                        <th>Assets</th>
                                        <th>Wallet Balance</th>
                                        {/* <th>Username</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>hello</td>
                                        <td>Mark</td>
                                        <td><Protect /></td>
                                        <td><button className='bg-transparent px-3 p-1 text-white'>Details</button></td>
                                    </tr>
                                </tbody>
                            </Table>

                        </div>
                        <div className='col-lg-6 mb-3 col-12 boxes   p-3 text-start'>
                            <div className='d-flex justify-content-between'>
                                <h5>Unhackable Tokens (uTokens)</h5>
                                <p className='text-clr'>Hide -</p>
                            </div>

                            <p className='mb-2 mt-1 p-2 alert'>  <HiOutlineInformationCircle className='fs-4 ms-3' /> Lock native tokens in the contract to mint 1:1 unhackableTokens (uTokens)</p>

                            <div className='mt-5 d-lg-flex d-block justify-content-between align-items-center'>
                                <div className='d-flex gap-2 mt-3'>
                                    <p>logo</p>
                                    <p>eth</p>
                                </div>
                                <div className='gap-2'>
                                    <button className='bg-transparent text-clr p-1 mt-2'>
                                        Add to Wallet
                                    </button>
                                    <Transfer className="ms-2" />
                                </div>
                                <div className='gap-2 mt-lg-0 mt-2'>
                                    <button className='bg-transparent text-clr'>
                                        <Claim />
                                    </button>
                                    <button className='bg-transparent text-clr ms-4 px-3 p-1'>
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-white a_tag" to="/select" >Protect</NavLink>
       <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-white a_tag" to="/transfer" >Transfer</NavLink>
       <NavLink className="ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-white a_tag" to="/withdraw" >Claim</NavLink> */}
        </div>
    )
}

export default Dashboard
