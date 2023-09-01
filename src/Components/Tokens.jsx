import React from 'react'
import Table from 'react-bootstrap/Table';
import { etherTokens } from '../tokenConfig';
import PairPrice from './PairPrice';
import All from '../assets/All.svg'
function Tokens() {
    return (
        <div className='container ' style={{height:'70vh'}}>
            <div className='row'>
                <div className='col-lg-12'>
                    <h3 className='text-start'>
                    Tokens available to protect
                    </h3>
                    <Table className='mt-5 border rad text-light' >
                        <thead className='bor'>
                            <tr>
                                <th>#</th>
                                <th></th>
                                <th className='text-start'>Token</th>
                                <th className='text-start'>Symbol</th>
                                <th>Price</th>

                                {/* <th>Change</th>
                                <th>Graph</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                etherTokens.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className='text-end'><img src={All} alt="" style={{width:'20px',height:'20px'}}/></td>
                                        <td className='text-start fw-bold'>{item.name}</td>
                                        <td className='text-start'>{item.symbol}</td>
                                        <td><PairPrice address={item.address} /></td>
                                    </tr>
                                })
                            }


                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Tokens