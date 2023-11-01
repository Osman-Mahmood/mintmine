import React, { useEffect, useState } from 'react'
import All from '../assets/All.svg'
import { erc20Instance, factoryInstance, getChainDetails, remortFactoryInstnce } from '../config';
import { useNetwork } from 'wagmi';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import Countdown from 'react-countdown';
import ShowSymbol from './Tokens/childComponents/ShowSymbol';
const Tokens = () => {

  const { chain } = useNetwork()

  let [winnerAddress, setWinnerAddress] = useState(null);
  const getWinnerAddress = async () => {
    try {
      const contract = await remortFactoryInstnce(chain?.id)
      let winnerAdd = await contract.get_currentWinner();
      setWinnerAddress(winnerAdd);
    } catch (error) {
      console.error("error while get winner address", error);
    }
  }
  const [winnerHistory, setWinnerHistory] = useState([])
  const getWinnerInvestHistory = async () => {
    try {
      const contract = await remortFactoryInstnce(chain?.id)
      const currentPeriod = await contract.get_PreviousPeriod();
      const winnerAdd = await contract.get_currentWinner();
      const investmentDetails = await contract.getInvestmentDetails_OfUser_ForPeriod(winnerAdd, currentPeriod);
      setWinnerHistory(investmentDetails)
    } catch (error) {
      console.error("error while get winner invest history", error);
    }
  }
  let [winnerTime, setWinnerTime] = useState(null);
  const getWinnerTime = async () => {
    try {
      setWinnerTime(null);
      let contract = await remortFactoryInstnce(chain?.id)
      let { startTime, endTime } =
        await contract.get_CurrentPeriod_StartAndEndTime();
      setWinnerTime(endTime.toNumber());
    } catch (error) {
      console.error("error while get winner time", error);
    }
  };
  useEffect(() => {
    getWinnerTime()
    getWinnerAddress()
    getWinnerInvestHistory()
  }, []);
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      getWinnerTime();
      getWinnerAddress()
      getWinnerInvestHistory()
    } else {
      return (
        <div className='d-flex justify-content-between mt-3'>
          <div className='text-center px-3'>
            <h1 className='time_box2 text-white p-lg-1 p-0'>
              {days}
            </h1> 
            <p className='text-white'>Days</p>
          </div>
          <div className='text-dark px-3'>
            <h1 className='time_box2 text-white p-lg-1 p-0'>
              {hours}
            </h1>
            <p className='text-white'>Hours</p>
          </div>
          <div className='text-center px-3'>
            <h1 className='time_box2 text-white p-lg-1 p-0'>
              {minutes}
            </h1>
            <p className='text-white'>Minutes</p>
          </div>
          <div className='text-center px-3'>
            <h1 className='time_box2 text-white p-lg-1 p-0'>
              {seconds}
            </h1>
            <p className='text-white'>Seconds</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className='container pt-5'>
      <div className='row time_box mt-3 border border-primary' style={{borderRadius:'15px'}}>
        <div className='col-lg-12 d-lg-flex d-block align-items-center gap-3 p-3 mb-0 mb-1'>
          <div className='col-lg-6 col-12 mb-lg-0 mb-5'>
            <h5 className='text-white text-start mt-1' style={{fontSize:'18px'}}>30% of collected-fees is to randomly reward one end-user.</h5>
          <h5 className='text-white text-start'>Every 369 hours the system posts a result.</h5>
            {/* <h5 className='text-dark text-start'>The winner is announced in this page and in our social media.</h5> */}

          </div>
          <div className='col-lg-6'>
            {winnerTime == null ? (
              // <Skeleton  />
              <div className='d-flex justify-content-between mt-1'>
                <div className='text-center px-3'>
                  <h1 className='time_box2 text-white p-lg-1 p-0'>
                    0
                  </h1>
                  <p className='text-white'>Days</p>
                </div>
                <div className='text-center px-3'>
                  <h1 className='time_box2 text-white p-lg-1 p-0'>
                    0
                  </h1>
                  <p className='text-white'>Hours</p>
                </div>
                <div className='text-center px-3'>
                  <h1 className='time_box2 text-white p-lg-1 p-0'>
                    0
                  </h1>
                  <p className='text-white'>Minutes</p>
                </div>
                <div className='text-center px-3'>
                  <h1 className='time_box2 text-white p-lg-1 p-0'>
                    0
                  </h1>
                  <p className='text-white'>Seconds</p>
                </div>
              </div>
            ) : (
              <Countdown
                date={Date.now() + (parseInt(winnerTime) * 1000 - Date.now())}
                renderer={renderer}
              />
            )}
          </div>
        </div>
      </div>
      <div className='row p-3 mt-5 mb-5 pb-4 rounded-lg time_box border border-primary' style={{borderRadius:'15px'}}>
        <div className='col-lg-12'>
          <h3 className='text-center text-white text-truncate' style={{fontSize:'23px'}}>Winner: {winnerAddress}</h3>
          <Table striped bordered hover >
            <thead>
              <tr>
                {/* <th className='text-dark'>#</th> */}
                <th className='text-white'>Prize Pool</th>
                <th className='text-white'>uTokens</th>
                {/* <th className='text-dark'>Time</th> */}
              </tr>
            </thead>
            <tbody>
              {
                winnerHistory?.map((item, index) => {
                  // console.log("");,''
                  return <tr>
                    {/* <td className='text-dark'>{index+1}</td> */}
                    <td  className='text-white justify-content-center d-flex text-center'> <ShowSymbol token={item.uTokenAddress} /></td>
                    <td className='text-white'>{ethers.utils.formatEther(item.amount)}</td>
                    {/* <td className='text-dark'>{Date.now()}</td> */}
                  </tr>
                })
              }


            </tbody>
          </Table>
<div>
 
</div>

        </div>
        
      </div>
      {/* <h1 className='text-start'>Information</h1> */}
      <p className='text-start boxes'><br />

<p className='fw-bold'>Reward system parameters:</p>  
<p>
(A) If the winner protected an amount equal or superior to the amount in the prize-pool, then the winner receives all the funds in the prize pool.

</p>

<p>- Example A: Prize pool = 1 ETH -- if the winner protected 1 ETH or more, then the winner is rewarded the 1 ETH held in the prize pool.</p>
<p>
(B) If the winner protected an amount inferior to the amount in the prize-pool, then the winner receives from the prize-pool, only the amount they protected.

</p>
<p>
- Example B: Prize Pool = 1 ETH -- if the winner protected 0.5 ETH, then the winner gets only 0.5 ETH from the 1 ETH held in the prize pool. The rest 0.5 ETH in the prize pool + any other funds collected by u369 benefaction-fee will remain in the prize pool for the next winner to be announced every 369 hours.

</p>
<p>
If nobody wins the full amount held in the prize pool after 3 consecutives rounds (1 round =369 hours) then the funds held in the prize pool can be gifted to the community by implementing a contest, a quiz, a give-away etc.

</p>

<p> 
<span className='fw-bold'>Rewards for public goods funding: </span> 

</p>
<p>
Every 369 hours (~15 days) + ~36 hours grace period; other 30% of u369 collected-fees are distributed as follows: 

</p>
<p className='mb-0'>
10% to Protocol Guild 


</p>
<p className='mb-0'>
10% to Giveth 

</p>
<p className='mb-0'>
10% to Valley Dao 

</p>
<p>
See all donations Tx details since u369 inception <a className='text-primary' href='https://etherscan.io/address/0x4a058b1848d01455daeda203acfaa11d2b133206' target='blank'>here</a>.

</p>


</p>
    </div>
  )
}

export default Tokens
