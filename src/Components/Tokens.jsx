import React from 'react'
import Table from 'react-bootstrap/Table';
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
                                <th>Change</th>
                                <th>Graph</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>@fat</td>
                            </tr>
                            {/* <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Tokens