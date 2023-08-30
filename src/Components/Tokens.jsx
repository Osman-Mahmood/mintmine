import React from 'react'
import Table from 'react-bootstrap/Table';
import { etherTokens } from '../tokenConfig';
import PairPrice from './PairPrice';

function Tokens() {
    return (
        <div className='container '>
            <div className='row'>
                <div className='col-lg-12'>
                    <h1 className='text-start'>
                        Top tokens on uniswap
                    </h1>
                    <Table className='mt-5 border rad text-light' >
                        <thead className='bor'>
                            <tr>
                                <th>#</th>
                                <th >Token Name</th>
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
                                        <td>{item.name}</td>
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